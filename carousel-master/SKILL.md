---
name: carousel-master
description: >
  Orchestrates the full TikTok carousel generation pipeline for the paramedic
  pharmacology account. Selects a drug×template combo via carousel_next.js,
  validates against carousel_usage_log.json, then runs four subskills in
  sequence: carousel-data, carousel-script, carousel-design, carousel-export.
  Always emails run data on exit (success or failure). Trigger this skill when
  the message is "run carousel pipeline", "create a new carousel", or
  "approve carousel" / "done with [combo_hash]" (to finalize a completed run).
  This skill is the only entry point for carousel generation — never run the
  subskills directly.
---

# Carousel Master — Pipeline Orchestrator

You are running an automated pipeline that generates one TikTok carousel per run.
Follow every step below in exact order. Do not skip steps. Do not improvise.

---

## File Locations

### Pipeline config (in this skill folder)

| File | Path | Purpose |
|------|------|---------|
| Combo selector | `skills/carousel-master/references/carousel_next.js` | Node script that picks the next drug×template combo. |
| Combo list | `skills/carousel-master/references/carousel_combos.json` | Pre-generated array of all valid drug×template combos. Regenerate when drugs are added or removed. |

### External reference data (owned by subskills)

| File | Location | Used by |
|------|----------|---------|
| Drug data (`drugs.js`) | App GitHub repo (raw URL) | `carousel-data` |
| Global rules (`carousel_global_rules.md`) | `skills/carousel-script/references/` | `carousel-script` (loaded every run) |
| Template files (`carousel_template_[1-5].md`) | `skills/carousel-script/references/` | `carousel-script` (load only the one matching `selection.template`) |

### Writable pipeline state

All writable files live under `/data/.openclaw/workspace/carousel-pipeline/`.

| File | Path | Purpose |
|------|------|---------|
| State file | `carousel-pipeline/carousel_pipeline_state.json` | Current run progress. Created fresh each run, deleted only after Sailor approves the final output. |
| Usage log | `carousel-pipeline/carousel_usage_log.json` | Permanent ledger of every completed combo. Never delete. |

### Transient run data (`current-run/`)

Intermediate outputs from each step are stored in `carousel-pipeline/current-run/`:

| File | Written by | Purpose |
|------|------------|---------|
| `drug_data.json` | `carousel-data` (step 1) | Extracted drug object for this run |
| `carousel_script.md` | `carousel-script` (step 2) | Full slide-by-slide carousel text |
| `slides/slide_01.jpg`, etc. | `carousel-design` (step 3) | Finished JPEG slides |

**Cleanup rules:**
- `current-run/` is NOT deleted automatically on success. It persists until Sailor explicitly approves the exported carousel.
- On failure, `current-run/` is always kept — it contains the data needed to resume.
- Only delete `current-run/` (and `carousel_pipeline_state.json`) after Sailor has reviewed the final output and confirmed approval.
- This allows re-running individual steps or making edits without regenerating everything from scratch.

---

## Resume Check

Before doing anything else, check if `carousel_pipeline_state.json` exists.

- **If it exists and has incomplete steps:** A previous run was interrupted. Resume directly at Phase 3 (Step Loop). Do not re-run combo selection.
- **If it exists and all steps are complete:** This is a stale file from a run that failed to clean up. Delete it and proceed to Phase 1.
- **If it does not exist:** Proceed to Phase 1.

---

## Phase 1 — Combo Selection

Run the combo selector script:

```
node /data/.openclaw/workspace/skills/carousel-master/references/carousel_next.js
```

Parse the JSON output from stdout. It will contain:

```json
{
  "template": "3",
  "key": "ketamine",
  "combo_hash": "ketamine::3"
}
```

Hold these values. Do not write the state file yet.

---

## Phase 2 — Duplicate Check

Read `carousel_usage_log.json`. Search for an entry matching the `combo_hash` from Phase 1.

- **If the combo_hash exists in the usage log:** This combo has already been completed. This should not happen — it means the selector script has a bug or stale data. **Go to Failure Exit immediately** with error: `"Duplicate combo: [combo_hash] already exists in carousel_usage_log.json"`.
- **If the combo_hash does NOT exist:** Proceed.

Write the state file to `carousel_pipeline_state.json`:

```json
{
  "run_id": "<current ISO 8601 timestamp>",
  "selection": {
    "template": "<template value from script>",
    "key": "<key value from script>",
    "combo_hash": "<combo_hash value from script>"
  },
  "steps": [
    { "id": 1, "subskill": "carousel-data",   "status": "pending" },
    { "id": 2, "subskill": "carousel-script",  "status": "pending" },
    { "id": 3, "subskill": "carousel-design",  "status": "pending" },
    { "id": 4, "subskill": "carousel-export",  "status": "pending" }
  ],
  "error_log": null
}
```

---

## Phase 3 — Step Loop

Find the first step in the `steps` array where `status` is NOT `"complete"`. That is the current step.

Execute the subskill matching that step's `subskill` field by name:

| Step | Subskill | What it does |
|------|----------|--------------|
| 1 | `carousel-data` | Fetches `drugs.js` from the app GitHub repo. Extracts the full drug object matching `selection.key`. Writes the extracted object to a working file for the next step. |
| 2 | `carousel-script` | Reads the extracted drug data from step 1. From its own references folder, always reads `carousel_global_rules.md` (voice, formatting, slide rules) and reads the specific template file `carousel_template_[selection.template].md` (e.g., `carousel_template_3.md` for template 3). Writes the full carousel text in markdown format, slide-by-slide, following both the global rules and the template instructions. |
| 3 | `carousel-design` | Takes the carousel markdown script from step 2 and produces designed slides as individual HTML files at 1080×1920, then converts each to JPEG. |
| 4 | `carousel-export` | Emails the completed JPEG carousel slides plus run metadata to the configured email address. |

After each subskill completes successfully:

1. Set that step's `status` to `"complete"`.
2. Write the updated state file to disk immediately.
3. Move to the next step.

If a subskill fails:

1. Set that step's `status` to `"error"`.
2. Write the error details to `error_log` in the state file.
3. **Go to Failure Exit immediately.** Do NOT proceed to the next step.

Repeat until all steps show `status: "complete"`, then proceed to Success Exit.

---

## Success Exit

All four steps completed successfully.

1. Email the following to the configured address:
   - Subject: `Carousel complete: [combo_hash]`
   - Body: Full contents of `carousel_pipeline_state.json` (all steps showing complete)
   - Attachments: The finished JPEG carousel slides from `current-run/slides/`
2. Notify Sailor the carousel is ready for review.
3. **STOP.** Do NOT write to `carousel_usage_log.json`. Do NOT delete any files. The run is not finalized until Sailor explicitly approves it in Phase 5.

Sailor may request changes — if so, re-run only the affected step(s) using data still in `current-run/`, update the state file, and re-export.

---

## Phase 5 — Approval & Cleanup

This phase runs ONLY when Sailor sends an explicit approval. Trigger phrases:
- `"approve carousel"`
- `"done with [combo_hash]"` (e.g. "done with epinephrine::2")

**Before executing:** Verify that `carousel_pipeline_state.json` exists and all four steps show `status: "complete"`. If not, inform Sailor the run is not in a completable state and STOP.

1. Write the `combo_hash` and current timestamp to `carousel_usage_log.json`:
   ```json
   { "[combo_hash]": { "last_used": "<ISO 8601 timestamp>" } }
   ```
2. Delete `carousel_pipeline_state.json`.
3. Delete the entire `current-run/` folder and its contents.
4. Confirm to Sailor: `"✅ [combo_hash] finalized and logged. current-run cleaned up."`

**Rules:**
- NEVER run Phase 5 without an explicit approval phrase from Sailor.
- NEVER write to `carousel_usage_log.json` outside of Phase 5.
- NEVER delete `current-run/` outside of Phase 5.
- If in doubt whether Sailor intended to approve, ASK. Do not infer.

---

## Failure Exit

Something went wrong. The pipeline stops here.

1. Write the error to `error_log` in the state file (if not already written). Use the exact error message from the table below when the failure matches a known condition.
2. Write the updated state file to disk.
3. Email the following to the configured address:
   - Subject: `Carousel failed: [combo_hash or "no selection"]`
   - Body: Full contents of `carousel_pipeline_state.json` including `error_log`
   - No carousel attachments.
4. Do NOT delete `carousel_pipeline_state.json`. It must persist for debugging.
5. Do NOT write to `carousel_usage_log.json`. The combo is not used.
6. STOP.

### Error Reference

| Phase | Condition | Error message |
|-------|-----------|---------------|
| 1 | `carousel_next.js` not found at expected path | `SELECTION_SCRIPT_MISSING: carousel_next.js not found at skills/carousel-master/references/carousel_next.js` |
| 1 | `carousel_next.js` exits with non-zero code or returns invalid JSON | `SELECTION_SCRIPT_ERROR: carousel_next.js failed — [stderr or description of invalid output]` |
| 1 | Script output missing required fields (`template`, `key`, or `combo_hash`) | `SELECTION_MALFORMED: carousel_next.js output missing required field(s): [list missing fields]` |
| 2 | `combo_hash` already exists in `carousel_usage_log.json` | `DUPLICATE_COMBO: [combo_hash] already exists in carousel_usage_log.json` |
| 2 | `carousel_usage_log.json` not found or unreadable | `USAGE_LOG_MISSING: carousel_usage_log.json not found or unreadable at workspace/carousel-pipeline/` |
| 2 | `carousel_usage_log.json` contains malformed JSON | `USAGE_LOG_MALFORMED: carousel_usage_log.json is not valid JSON` |
| 3 | Subskill not found by name | `SUBSKILL_NOT_FOUND: [subskill name] could not be located in the skills directory` |
| 3 (step 1) | `drugs.js` not fetchable from GitHub (network error, 404, etc.) | `DATA_FETCH_FAILED: Could not fetch drugs.js from GitHub — [HTTP status or error]` |
| 3 (step 1) | Drug object for `selection.key` not found in `drugs.js` | `DRUG_NOT_FOUND: No drug with id "[selection.key]" exists in drugs.js` |
| 3 (step 2) | `carousel_global_rules.md` not found in `carousel-script/references/` | `REFERENCE_MISSING: carousel_global_rules.md not found in carousel-script/references/` |
| 3 (step 2) | Template file not found (e.g., `carousel_template_5.md`) | `REFERENCE_MISSING: carousel_template_[selection.template].md not found in carousel-script/references/` |
| 3 (step 3) | HTML-to-JPEG conversion fails | `DESIGN_EXPORT_FAILED: Slide conversion failed — [error detail]` |
| 3 (step 4) | Email send fails | `EMAIL_FAILED: Could not send carousel email — [error detail]` |
| 3 (any) | Subskill produces no output or expected output file is missing after completion | `STEP_OUTPUT_MISSING: [subskill name] completed but expected output file not found` |
| Any | State file cannot be written to disk (permissions, disk full, etc.) | `STATE_WRITE_FAILED: Could not write carousel_pipeline_state.json — [error detail]` |

---

## Rules

- NEVER skip a step.
- NEVER run a step out of order.
- NEVER proceed past a failed step.
- NEVER write to `carousel_usage_log.json` unless all four steps completed successfully.
- NEVER delete `carousel_pipeline_state.json` on failure.
- ALWAYS write the state file to disk after changing any step status.
- ALWAYS send an email on exit, whether success or failure.

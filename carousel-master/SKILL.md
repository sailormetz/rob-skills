---
name: carousel-master
description: >
  Orchestrates the full TikTok carousel generation pipeline for the paramedic
  pharmacology account. Runs carousel-init for setup, then three subskills in
  sequence: carousel-script, carousel-design, carousel-export.
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
| Drug data (`drugs.js`) | Local clone at `cards/data/drugs.js` (pulled fresh by carousel-init) | `carousel-init` |
| Global rules (`global_rules.md`) | `skills/carousel-script/references/` | `carousel-script` (loaded every run) |
| Template files (`template_[1-5].md`) | `skills/carousel-script/references/` | `carousel-script` (load only the one matching `selection.template`) |

### Writable pipeline state

All writable files live under `/data/.openclaw/workspace/carousel-pipeline/`.

| File | Path | Purpose |
|------|------|---------|
| State file | `carousel-pipeline/carousel_pipeline_state.json` | Current run progress. Created by carousel-init, deleted only after Sailor approves. |
| Working data | `carousel-pipeline/carousel_working_data.json` | Extracted drug object for this run. Written by carousel-init. |
| Usage log | `carousel-pipeline/carousel_usage_log.json` | Permanent ledger of every completed combo. Never delete. |

### Transient run data (`current-run/`)

Intermediate outputs from each step are stored in `carousel-pipeline/current-run/`:

| File | Written by | Purpose |
|------|------------|---------|
| `carousel_script.md` | `carousel-script` (step 1) | Full slide-by-slide carousel text |
| `slides/slide_01.jpg`, etc. | `carousel-design` (step 2) | Finished JPEG slides |

**Cleanup rules:**
- `current-run/` is NOT deleted automatically on success. It persists until Sailor explicitly approves.
- On failure, `current-run/` is always kept for debugging.
- Only delete `current-run/`, `carousel_working_data.json`, and `carousel_pipeline_state.json` after Sailor approves in Phase 4.

---

## Resume Check

Before doing anything else, check if `carousel_pipeline_state.json` exists.

- **If it exists and has incomplete steps:** A previous run was interrupted. Resume directly at Phase 2 (Step Loop). Do not re-run init.
- **If it exists and all steps are complete:** This is a stale file from a run that needs approval. Inform Sailor and STOP.
- **If it does not exist:** Proceed to Phase 1.

---

## Phase 1 — Init

Run the `carousel-init` skill. It handles:
- Combo selection (via `carousel_next.js`)
- Duplicate check against `carousel_usage_log.json`
- `git pull --rebase` on the drug cards repo
- Drug object extraction to `carousel_working_data.json`
- Pipeline state file creation

If carousel-init reports any error, go to Failure Exit immediately.

---

## Phase 2 — Step Loop

Find the first step in the `steps` array where `status` is NOT `"complete"`. That is the current step.

Execute the subskill matching that step's `subskill` field:

| Step | Subskill | What it does |
|------|----------|--------------|
| 1 | `carousel-script` | Reads `carousel_working_data.json`. From its own references folder, reads `global_rules.md` and the specific `template_[selection.template].md`. Writes the full carousel text slide-by-slide to `current-run/carousel_script.md`. |
| 2 | `carousel-design` | Takes the carousel script from step 1 and produces designed slides as individual HTML files at 1080×1920, then converts each to JPEG via Puppeteer. Writes to `current-run/slides/`. |
| 3 | `carousel-export` | Emails the completed JPEG carousel slides plus run metadata to the configured email address. |

After each subskill completes successfully:

1. Set that step's `status` to `"complete"`.
2. Write the updated state file to disk immediately.
3. Move to the next step.

If a subskill fails:

1. Set that step's `status` to `"error"`.
2. Write the error details to `error_log` in the state file.
3. Go to Failure Exit immediately. Do NOT proceed to the next step.

Repeat until all steps show `status: "complete"`, then proceed to Success Exit.

---

## Success Exit

All three steps completed successfully.

1. Email the following:
   - Subject: `Carousel complete: [combo_hash]`
   - Body: Full contents of `carousel_pipeline_state.json`
   - Attachments: The finished JPEG carousel slides from `current-run/slides/`
2. Notify Sailor the carousel is ready for review.
3. **STOP.** Do NOT write to `carousel_usage_log.json`. Do NOT delete any files. The run is not finalized until Sailor approves in Phase 4.

Sailor may request changes — if so, re-run only the affected step(s) using data still in `current-run/`, update the state file, and re-export.

---

## Phase 4 — Approval & Cleanup

This phase runs ONLY when Sailor sends an explicit approval. Trigger phrases:
- `"approve carousel"`
- `"done with [combo_hash]"` (e.g. "done with epinephrine::2")

**Before executing:** Verify that `carousel_pipeline_state.json` exists and all three steps show `status: "complete"`. If not, inform Sailor the run is not in a completable state and STOP.

1. Write the `combo_hash` and current timestamp to `carousel_usage_log.json`:
   ```json
   { "[combo_hash]": { "last_used": "<ISO 8601 timestamp>" } }
   ```
2. Delete `carousel_pipeline_state.json`.
3. Delete `carousel_working_data.json`.
4. Delete the entire `current-run/` folder and its contents.
5. Confirm to Sailor: `"✅ [combo_hash] finalized and logged. current-run cleaned up."`

**Rules:**
- NEVER run Phase 4 without an explicit approval phrase from Sailor.
- NEVER write to `carousel_usage_log.json` outside of Phase 4.
- NEVER delete `current-run/` outside of Phase 4.
- If in doubt whether Sailor intended to approve, ASK. Do not infer.

---

## Failure Exit

Something went wrong. The pipeline stops here.

1. Write the error to `error_log` in the state file (if not already written).
2. Write the updated state file to disk.
3. Email the following:
   - Subject: `Carousel failed: [combo_hash or "no selection"]`
   - Body: Full contents of `carousel_pipeline_state.json` including `error_log`
   - No carousel attachments.
4. Do NOT delete `carousel_pipeline_state.json`. It must persist for debugging.
5. Do NOT write to `carousel_usage_log.json`. The combo is not used.
6. STOP.

### Error Reference

| Phase | Condition | Error message |
|-------|-----------|---------------|
| 1 | carousel-init fails (any reason) | Use the specific error reported by carousel-init |
| 2 | Subskill not found by name | `SUBSKILL_NOT_FOUND: [subskill name] could not be located in the skills directory` |
| 2 (step 1) | `global_rules.md` not found | `REFERENCE_MISSING: global_rules.md not found in carousel-script/references/` |
| 2 (step 1) | Template file not found | `REFERENCE_MISSING: template_[selection.template].md not found in carousel-script/references/` |
| 2 (step 2) | HTML-to-JPEG conversion fails | `DESIGN_EXPORT_FAILED: Slide conversion failed — [error detail]` |
| 2 (step 3) | Email send fails | `EMAIL_FAILED: Could not send carousel email — [error detail]` |
| 2 (any) | Expected output file missing after step completion | `STEP_OUTPUT_MISSING: [subskill name] completed but expected output file not found` |
| Any | State file cannot be written | `STATE_WRITE_FAILED: Could not write carousel_pipeline_state.json — [error detail]` |

---

## Rules

- NEVER skip a step.
- NEVER run a step out of order.
- NEVER proceed past a failed step.
- NEVER write to `carousel_usage_log.json` unless all steps completed and Sailor approved.
- NEVER delete `carousel_pipeline_state.json` on failure.
- ALWAYS write the state file to disk after changing any step status.
- ALWAYS send an email on exit, whether success or failure.

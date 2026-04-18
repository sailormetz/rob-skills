---
name: carousel-master
description: >
  Orchestrates the full TikTok carousel generation pipeline for the paramedic
  pharmacology account. Runs carousel-init for setup, then three subskills in
  sequence: carousel-script, carousel-design, carousel-export.
  Supports multiple concurrent runs — each lives in its own folder keyed by combo_hash.
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

### Pipeline config (owned by carousel-init)

| File | Path | Purpose |
|------|------|---------|
| Combo selector | `skills/carousel-init/references/carousel_next.js` | Node script that picks the next drug×template combo. |
| Combo list | `skills/carousel-init/references/carousel_combos.json` | Pre-generated array of all valid drug×template combos. Regenerate when drugs are added or removed. |

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
| Usage log | `carousel-pipeline/carousel_usage_log.json` | Permanent ledger of every completed combo. Never delete. |

### Run data (`runs/{combo_hash}/`)

Each run gets its own folder at `carousel-pipeline/runs/{combo_hash}/`. Multiple runs can coexist — each pending approval independently.

| File | Written by | Purpose |
|------|------------|---------|
| `carousel_pipeline_state.json` | `carousel-init` | Run progress tracking |
| `carousel_working_data.json` | `carousel-init` | Extracted drug object |
| `carousel_script.md` | `carousel-script` (step 1) | Full slide-by-slide carousel text |
| `slides/slide_01.jpg`, etc. | `carousel-design` (step 2) | Finished JPEG slides |

**Cleanup rules:**
- Run folders are NOT deleted automatically on success. They persist until Sailor explicitly approves.
- On failure, the run folder is always kept for debugging.
- Only delete a run folder after Sailor approves it in Phase 4.

---

## Pipeline State File Structure

Each run folder contains a `carousel_pipeline_state.json` with this structure:

```json
{
  "run_id": "2026-04-15T18:30:00.000Z",
  "selection": {
    "template": "3",
    "key": "ketamine",
    "combo_hash": "ketamine::3"
  },
  "steps": [
    { "id": 1, "subskill": "carousel-script",  "status": "pending" },
    { "id": 2, "subskill": "carousel-design",  "status": "pending" },
    { "id": 3, "subskill": "carousel-export",  "status": "pending" }
  ],
  "error_log": null
}
```

**Status values per step:**
- `"pending"` — not yet started
- `"complete"` — finished successfully
- `"error"` — failed (details in `error_log`)

**How to read run state:**
- **In progress:** at least one step is `"pending"` or `"error"`, and at least one is `"complete"` — the run was interrupted or failed mid-pipeline
- **Not started:** all steps are `"pending"` — init ran but no subskills executed yet
- **Complete (pending approval):** all steps are `"complete"` — waiting for Sailor to approve
- **Failed:** any step is `"error"` — check `error_log` for details

---

## Resume Check

Before doing anything else, scan `carousel-pipeline/runs/` for any existing run folders. For each, read its `carousel_pipeline_state.json` and categorize it:

- **Interrupted** — has at least one `"complete"` step and at least one `"pending"` step, no `"error"`. Was cut off mid-pipeline.
- **Failed** — has a step with `"error"`. Known failure, needs debugging.
- **Complete** — all steps `"complete"`. Pending Sailor's approval.

Then report a summary to Sailor before proceeding:

1. **Interrupted runs:** Resume automatically. Load that run's `combo_hash`, tell Sailor you're picking it back up, and jump to Phase 2 (Step Loop). Do not re-run init.
2. **Failed runs:** Remind Sailor they exist and need attention (e.g. "heads up — `ketamine::3` failed and is still sitting in runs/"). Do not offer to resume. Skip them.
3. **Complete runs:** Remind Sailor they're pending approval (e.g. "`epinephrine::1` is done and waiting for your approval").

If an interrupted run was found and resumed, do not start a new run. Otherwise, proceed to Phase 1.

If no run folders exist, skip the summary and go straight to Phase 1.

---

## Phase 1 — Init

Run the `carousel-init` skill. It handles:
- Combo selection (via `carousel_next.js`)
- Duplicate check against `carousel_usage_log.json` and existing run folders
- `git pull --rebase` on the drug cards repo
- Drug object extraction to `runs/{combo_hash}/carousel_working_data.json`
- Pipeline state file creation at `runs/{combo_hash}/carousel_pipeline_state.json`

If carousel-init reports any error, go to Failure Exit immediately.

After init completes, hold the `combo_hash` — it identifies this run's folder for all subsequent phases.

---

## Phase 2 — Step Loop

Read `runs/{combo_hash}/carousel_pipeline_state.json`. Find the first step where `status` is NOT `"complete"`. That is the current step.

Execute the subskill matching that step's `subskill` field:

| Step | Subskill | What it does |
|------|----------|--------------|
| 1 | `carousel-script` | Reads `runs/{combo_hash}/carousel_working_data.json`. From its own references folder, reads `global_rules.md` and the specific `template_[selection.template].md`. Writes the full carousel text slide-by-slide to `runs/{combo_hash}/carousel_script.md`. |
| 2 | `carousel-design` | Takes the carousel script from step 1 and produces designed slides as individual HTML files at 1080×1920, then converts each to JPEG via Puppeteer. Writes to `runs/{combo_hash}/slides/`. |
| 3 | `carousel-export` | Emails the completed JPEG carousel slides plus run metadata to the configured email address. |

After each subskill completes successfully:

1. Set that step's `status` to `"complete"`.
2. Write the updated state file to disk immediately at `runs/{combo_hash}/carousel_pipeline_state.json`.
3. Move to the next step.

If a subskill fails:

1. Set that step's `status` to `"error"`.
2. Write a plain description of what went wrong to `error_log` in the state file.
3. Go to Failure Exit immediately. Do NOT proceed to the next step.

Repeat until all steps show `status: "complete"`, then proceed to Success Exit.

---

## Success Exit

All three steps completed successfully.

1. Email the following to Sailor:
   - Subject: `Carousel complete: [combo_hash]`
   - Body: Full contents of `runs/{combo_hash}/carousel_pipeline_state.json`
   - Attachments: The finished JPEG carousel slides from `runs/{combo_hash}/slides/`
2. Message Sailor on Telegram: `[combo_hash]` is done and ready for review.
3. **STOP.** Do NOT write to `carousel_usage_log.json`. Do NOT delete any files. The run is not finalized until Sailor approves in Phase 4.

Sailor may request changes — if so, re-run only the affected step(s) using data still in `runs/{combo_hash}/`, update the state file, and re-export.

---

## Phase 4 — Approval & Cleanup

This phase runs ONLY when Sailor sends an explicit approval. Trigger phrases:
- `"approve carousel [combo_hash]"` (e.g. "approve carousel epinephrine::2")
- `"done with [combo_hash]"` (e.g. "done with epinephrine::2")

The `combo_hash` is **required** — it identifies which run to finalize. If Sailor says "approve carousel" without specifying a combo_hash:
- If only one run is pending approval, use that one but confirm with Sailor first.
- If multiple runs are pending, list them and ask which one to approve.

**Before executing:** Verify that `runs/{combo_hash}/carousel_pipeline_state.json` exists and all three steps show `status: "complete"`. If not, inform Sailor the run is not in a completable state and STOP.

1. Write the `combo_hash` and current timestamp to `carousel_usage_log.json`:
   ```json
   { "[combo_hash]": { "last_used": "<ISO 8601 timestamp>" } }
   ```
2. Move the entire `runs/{combo_hash}/` folder to `carousel-pipeline/finished_runs/{combo_hash}/`. Create `finished_runs/` if it doesn't exist.
3. Confirm to Sailor: `"✅ [combo_hash] finalized and archived to finished_runs/."`
4. Push the workspace to GitHub to save the updated `carousel_usage_log.json` and the archived run — run: `cd /data/.openclaw/workspace && git add -A && git commit -m "approve [combo_hash]" && git push`

**Rules:**
- NEVER run Phase 4 without an explicit approval phrase from Sailor.
- NEVER write to `carousel_usage_log.json` outside of Phase 4.
- NEVER delete or move a run folder outside of Phase 4.
- If in doubt whether Sailor intended to approve, ASK. Do not infer.

---

## Failure Exit

Something went wrong. The pipeline stops here.

1. Write a plain description of the error to `error_log` in the state file (if not already written). Describe what failed, where, and why — no error codes, just what happened.
2. Write the updated state file to disk at `runs/{combo_hash}/carousel_pipeline_state.json`.
3. Message Sailor on Telegram with the full `carousel_pipeline_state.json` contents so he can read the error. No email on failure.
4. Do NOT delete the run folder. It must persist for debugging.
5. Do NOT write to `carousel_usage_log.json`. The combo is not used.
6. STOP.

---

## Rules

- NEVER skip a step.
- NEVER run a step out of order.
- NEVER proceed past a failed step.
- NEVER write to `carousel_usage_log.json` unless all steps completed and Sailor approved.
- NEVER delete a run folder on failure.
- ALWAYS write the state file to disk after changing any step status.
- ALWAYS notify Sailor on exit — email + Telegram ping on success, Telegram only on failure.
- Each run is isolated in its own folder — never cross-contaminate data between runs.

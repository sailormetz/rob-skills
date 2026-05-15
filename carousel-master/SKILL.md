---
name: carousel-master
description: >
  Orchestrates the full TikTok carousel generation pipeline for the paramedic
  pharmacology account. Selects a topic from carousel_topics.json, then runs
  subskills in sequence: carousel-script, carousel-script-verification,
  carousel-char-count, carousel-design, carousel-export.
  Each run lives in its own folder keyed by topic ID.
  Trigger this skill when the message is "run carousel pipeline", "create a new
  carousel", or "approve carousel" / "done with [topic_id]" (to finalize a
  completed run). This skill is the only entry point for carousel generation —
  never run the subskills directly.
---

# Carousel Master — Pipeline Orchestrator

You are running a pipeline that generates one TikTok carousel per run.
Follow every step below in exact order. Do not skip steps. Do not improvise.

---

## File Locations

### Topic list (source of truth)

| File | Path | Purpose |
|------|------|---------|
| Topics | `carousel-pipeline/carousel_topics.json` | Array of editorial topic pitches. Each has an `id`, `drug`, `pitch`, `status`, `added`, `completed`. |

### External reference data (owned by subskills)

| File | Location | Used by |
|------|----------|---------|
| Drug data (`drugs.js`) | Local clone at `cards/data/drugs.js` (pulled fresh during init) | `carousel-init` |
| Global rules (`global_rules.md`) | `skills/carousel-script/references/` | `carousel-script` (loaded every run) |

### Writable pipeline state

All writable files live under `/data/.openclaw/workspace/carousel-pipeline/`.

| File | Path | Purpose |
|------|------|---------|
| Topics | `carousel-pipeline/carousel_topics.json` | Updated on approval — `status` set to `done`, `completed` timestamped. |
| Finished runs | `carousel-pipeline/finished_runs/{topic_id}/` | Approved run archives. All assets preserved after approval. |

### Run data (`runs/{topic_id}/`)

Each run gets its own folder at `carousel-pipeline/runs/{topic_id}/`. Multiple runs can coexist — each pending approval independently.

| File | Written by | Purpose |
|------|------------|---------|
| `carousel_pipeline_state.json` | `carousel-init` | Run progress tracking |
| `carousel_working_data.json` | `carousel-init` | Extracted drug object |
| `carousel_script.md` | `carousel-script` (step 1) | Full slide-by-slide carousel text |

| `slides/slide_01.jpg`, etc. | `carousel-design` (step 2) | Finished JPEG slides |

**Cleanup rules:**
- Run folders persist in `runs/` until Sailor explicitly approves.
- On approval, the run folder is moved to `finished_runs/{topic_id}/` — never deleted.
- On failure, the run folder stays in `runs/` for debugging.
- Do not touch `finished_runs/` outside of Phase 4.

---

## Pipeline State File Structure

Each run folder contains a `carousel_pipeline_state.json`:

```json
{
  "run_id": "2026-05-05T01:00:00.000Z",
  "selection": {
    "topic_id": "fentanyl-contraindications",
    "drug": "fentanyl",
    "pitch": "The reasons you don't give fentanyl and how to spot them."
  },
  "steps": [
    { "id": 1, "subskill": "carousel-script",  "status": "pending" },
    { "id": 2, "subskill": "carousel-design",  "status": "pending" },
    { "id": 3, "subskill": "carousel-export",  "status": "pending" }
  ],
  "error_log": null
}
```

**Status values per step:** `"pending"` | `"complete"` | `"error"`

**How to read run state:**
- **In progress:** mix of `"complete"` and `"pending"`, no `"error"` — interrupted mid-pipeline
- **Not started:** all `"pending"` — init ran but no subskills executed
- **Complete (pending approval):** all `"complete"` — waiting for Sailor
- **Failed:** any step is `"error"` — check `error_log`

---

## Resume Check

Before doing anything else, scan `carousel-pipeline/runs/` for existing run folders. For each, read its `carousel_pipeline_state.json` and categorize:

- **Interrupted** — at least one `"complete"` step and at least one `"pending"`, no `"error"`. Resume automatically — jump to Phase 2.
- **Failed** — has a step with `"error"`. Remind Sailor it needs attention. Skip it.
- **Complete** — all steps `"complete"`. Remind Sailor it's pending approval.

If an interrupted run was found and resumed, do not start a new run. Otherwise proceed to Phase 1.

If no run folders exist, skip straight to Phase 1.

---

## Phase 1 — Init

Run the `carousel-init` skill. It handles:

1. Read `carousel-pipeline/carousel_topics.json`.
2. Find the first topic where `status` is `"idea"`. If none exist, tell Sailor the topic queue is empty and STOP.
3. Validate the topic's `drug` field matches a key in the drug data. If not, set that topic's status to `"error"` in the topics file and try the next `"idea"` topic.
4. `git pull --rebase` on the drug cards repo to get fresh data.
5. Extract the drug object to `runs/{topic_id}/carousel_working_data.json`.
6. Create the pipeline state file at `runs/{topic_id}/carousel_pipeline_state.json`.
7. Set the topic's status to `"draft"` in `carousel_topics.json`.

If init reports any error, go to Failure Exit.

After init completes, hold the `topic_id` — it identifies this run's folder for all subsequent phases.

---

## Phase 2 — Script

Run the `carousel-script` subskill:
- Reads `runs/{topic_id}/carousel_working_data.json` and the topic's `pitch` from the state file.
- Loads `global_rules.md` from its references.
- Writes the carousel script to `runs/{topic_id}/carousel_script.md`.
- The pitch guides the angle — no rigid template.

On success, immediately run the `carousel-script-verification` subskill:
- Extracts all major clinical claims from the script.
- Queries each against NASEMSO/AHA/StatPearls/DailyMed via web search.
- Auto-corrects confirmed errors. Flags ambiguous claims.
- Returns a summary of any corrections made.

On script success + verification complete: run the `carousel-char-count` subskill.

**Char count enforcement** (`carousel-char-count`):
- Programmatically counts characters per slide (markup stripped, whitespace normalized).
- Any slide over 400 characters is rewritten with minimum edits to fit under the limit.
- Re-counts to verify. Up to 3 trim cycles before flagging for manual review.
- Returns a summary of what was trimmed (if anything).

On char count pass (all slides ≤ 400): set step 1 status to `"complete"`, write state file to disk.
On script failure: set step 1 to `"error"`, write `error_log`, go to Failure Exit.
On verification failure (Perplexity unreachable, etc.): proceed to char count and checkpoint but include a warning that verification could not complete.

### Script Checkpoint

After the script is written, verified, and char-count enforced, **STOP and wait for Sailor.** Send the full script text to Sailor on Telegram — just the script, no preamble or summary (unless verification made corrections, in which case note what changed). Wait for one of:

- **Edits** — Sailor sends changes. Apply them to `carousel_script.md`, then wait again.
- **Approval** — Sailor says the script is good (e.g. "looks good", "approved", "go"). Proceed to Phase 3.

Do NOT proceed to design until Sailor explicitly approves the script.

---

## Phase 3 — Design

Run the `carousel-design` subskill:
- Takes the approved script and produces designed slides as individual HTML files at 1080×1920.
- Screenshots each to JPEG via Puppeteer.
- Writes to `runs/{topic_id}/slides/`.

On success: set step 2 status to `"complete"`, write state file.
On failure: set step 2 to `"error"`, write `error_log`, go to Failure Exit.

### Design Checkpoint

After slides are rendered, **STOP and wait for Sailor.** Email the slides to Sailor (via carousel-export), then send a short Telegram message: `Carousel emailed for {topic_id}.` Wait for one of:

- **Edits** — Sailor wants changes to the script or design. Make the changes, re-render if needed, then wait again.
- **Approval** — Sailor approves the slides (e.g. "looks good", "approved", "ship it"). Proceed to Phase 4.

Do NOT proceed to export until Sailor explicitly approves the slides.

---

## Phase 4 — Export

Run the `carousel-export` subskill:
- Emails the final JPEG slides plus run metadata to Sailor.

On success: set step 3 status to `"complete"`, write state file, proceed to Success Exit.
On failure: set step 3 to `"error"`, write `error_log`, go to Failure Exit.

---

## Success Exit

All three steps completed. The slides have already been approved at the Design Checkpoint.

1. Update `carousel_topics.json`: set the topic's `status` to `"done"` and `completed` to the current ISO 8601 timestamp.
2. Move the entire `runs/{topic_id}/` folder to `carousel-pipeline/finished_runs/{topic_id}/`. Create `finished_runs/` if needed.
3. Confirm to Sailor: `"✅ {topic_id} finalized and archived."`
4. Push workspace to GitHub: `cd /data/.openclaw/workspace && git add -A && git commit -m "finalize {topic_id}" && git push`

---

## Failure Exit

Something went wrong. The pipeline stops here.

1. Write a plain description of the error to `error_log` in the state file (if not already written).
2. Write the updated state file to disk.
3. Message Sailor on Telegram with the full state file contents.
4. Do NOT delete the run folder.
5. Do NOT update the topic status to `"done"`.
6. STOP.

---

## Sailor Communication Rules

**Keep notifications minimal. Sailor does NOT want verbose updates during the pipeline.**

| When | What to send (Telegram) |
|------|------------------------|
| Pipeline starts | `Running carousel pipeline for {topic_id}.` |
| Script Checkpoint | Send the full script text — nothing else |
| Design Checkpoint (after email) | `Carousel emailed for {topic_id}.` |
| Failure | Error summary only |

**Always use `message(action=send, channel=telegram, target=8531672710)` explicitly for all Telegram notifications.** Never rely on inbound message context — this pipeline runs in isolated cron sessions with no active chat context.

**Do NOT send:** progress updates between steps, verification summaries (unless corrections were made), step completion notices, or any other chatter. Three messages total for a clean run: start, script, emailed.

---

## Rules

- NEVER skip a step or run steps out of order.
- NEVER proceed past a failed step.
- NEVER proceed from script to design without Sailor's approval.
- NEVER proceed from design to export without Sailor's approval.
- NEVER set a topic to `"done"` unless all steps completed and both checkpoints passed.
- NEVER delete a run folder on failure.
- ALWAYS write the state file to disk after changing any step status.
- ALWAYS notify Sailor on exit — Telegram on failure, confirmation on success.
- Each run is isolated in its own folder — never cross-contaminate data between runs.

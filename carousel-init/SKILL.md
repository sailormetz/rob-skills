---
name: carousel-init
description: "Handles all pipeline preparation for a carousel run: selects the next drug×template combo, validates against the usage log, pulls the latest drug data, extracts the drug object, and writes the pipeline state file into a run folder keyed by combo_hash. Called only by carousel-master — never trigger directly."
version: "1.1.0"
author: rob
tags: [carousel, pipeline, init]
---

# Carousel Init — Pipeline Preparation

You are setting up a new carousel run. This skill handles everything before creative work begins: combo selection, duplicate checking, drug data extraction, and pipeline state file creation.

All run files are written to `carousel-pipeline/runs/{combo_hash}/` — one folder per run.

---

## Step 1 — Combo Selection

Run the combo selector:

```
node /data/.openclaw/workspace/skills/carousel-init/references/carousel_next.js
```

Parse the JSON output from stdout:

```json
{
  "template": "3",
  "key": "ketamine",
  "combo_hash": "ketamine::3"
}
```

**If the script fails** (non-zero exit, invalid JSON, missing fields), stop and report the error to carousel-master. Do not proceed.

---

## Step 2 — Duplicate Check

Read `carousel-pipeline/carousel_usage_log.json`. If the file doesn't exist, treat as empty (first run).

- **If `combo_hash` exists in the log:** Stop. Report error: `DUPLICATE_COMBO: [combo_hash] already exists in carousel_usage_log.json`
- **If not found:** Proceed.

Also check if `carousel-pipeline/runs/{combo_hash}/` already exists:
- **If it exists:** A run for this combo is already in progress (pending approval or incomplete). Stop. Report error: `RUN_FOLDER_EXISTS: runs/{combo_hash}/ already exists — previous run may be pending approval or incomplete`
- **If it doesn't exist:** Proceed.

---

## Step 3 — Pull Drug Data

```
cd /data/.openclaw/workspace/cards && git pull --rebase
```

If the pull fails, stop and report the error. Do not proceed with stale data.

---

## Step 4 — Create Run Folder & Extract Drug Object

Create the run folder:
```
mkdir -p /data/.openclaw/workspace/carousel-pipeline/runs/{combo_hash}
```

Read `cards/data/drugs.js`. Find the drug object where `id` matches `selection.key`.

- **If found:** Write the raw drug object to `carousel-pipeline/runs/{combo_hash}/carousel_working_data.json`
- **If not found:** Stop. Report error: `DRUG_NOT_FOUND: No drug with id "[selection.key]" exists in drugs.js`

Write the object exactly as it exists — no transformations.

---

## Step 5 — Write Pipeline State

Create `carousel-pipeline/runs/{combo_hash}/carousel_pipeline_state.json`:

```json
{
  "run_id": "<ISO 8601 timestamp>",
  "selection": {
    "template": "<template>",
    "key": "<key>",
    "combo_hash": "<combo_hash>"
  },
  "steps": [
    { "id": 1, "subskill": "carousel-script",  "status": "pending" },
    { "id": 2, "subskill": "carousel-design",  "status": "pending" },
    { "id": 3, "subskill": "carousel-export",  "status": "pending" }
  ],
  "error_log": null
}
```

Note: init work is not tracked as a step — the state file only tracks the three subskills that run after init.

---

## Step 6 — Confirm

Report back to carousel-master:
- Combo selected: `[combo_hash]`
- Drug data extracted: `[drug genericName]`
- Run folder created: `runs/{combo_hash}/`
- Pipeline state written
- Ready for carousel-script

---

## Rules
- Do not proceed past any failed step
- Do not modify drug data — write it exactly as found
- Do not write to `carousel_usage_log.json` — that's Phase 4 in carousel-master
- Do not trigger any downstream subskills — carousel-master handles sequencing
- Do not touch other run folders — each run is isolated

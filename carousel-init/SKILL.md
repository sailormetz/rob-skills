---
name: carousel-init
description: "Handles pipeline preparation for a carousel run: selects the next topic from carousel_topics.json, validates it, pulls fresh drug data, extracts the drug object, and writes the pipeline state file into a run folder keyed by topic_id. Called only by carousel-master — never trigger directly."
version: "2.0.0"
author: rob
tags: [carousel, pipeline, init]
---

# Carousel Init — Pipeline Preparation

You are setting up a new carousel run. This skill handles everything before creative work begins: topic selection, drug data extraction, and pipeline state file creation.

All run files are written to `carousel-pipeline/runs/{topic_id}/` — one folder per run.

---

## Step 1 — Topic Selection

Read `carousel-pipeline/carousel_topics.json`.

Find the first topic where `status` is `"idea"`. If no topics have status `"idea"`, stop and tell carousel-master the topic queue is empty.

Hold the topic's `id`, `drug`, and `pitch` — these drive the rest of init.

---

## Step 2 — Validate

Check that a run folder doesn't already exist for this topic:

- **If `carousel-pipeline/runs/{topic_id}/` exists:** A run is already in progress or pending approval. Stop. Tell carousel-master.
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
mkdir -p /data/.openclaw/workspace/carousel-pipeline/runs/{topic_id}
```

Read `cards/data/drugs.js`. Find the drug object where `id` matches the topic's `drug` field.

- **If found:** Write the raw drug object to `carousel-pipeline/runs/{topic_id}/carousel_working_data.json`
- **If not found:** Stop. Tell carousel-master the drug id wasn't found in drugs.js.

Write the object exactly as it exists — no transformations.

---

## Step 5 — Write Pipeline State

Create `carousel-pipeline/runs/{topic_id}/carousel_pipeline_state.json`:

```json
{
  "run_id": "<ISO 8601 timestamp>",
  "selection": {
    "topic_id": "<id>",
    "drug": "<drug>",
    "pitch": "<pitch>"
  },
  "steps": [
    { "id": 1, "subskill": "carousel-script",  "status": "pending" },
    { "id": 2, "subskill": "carousel-design",  "status": "pending" },
    { "id": 3, "subskill": "carousel-export",  "status": "pending" }
  ],
  "error_log": null
}
```

---

## Step 6 — Update Topic Status

In `carousel-pipeline/carousel_topics.json`, set the selected topic's `status` to `"draft"`.

---

## Step 7 — Confirm

Report back to carousel-master:
- Topic selected: `{topic_id}`
- Drug: `{drug}`
- Pitch: `{pitch}`
- Run folder created: `runs/{topic_id}/`
- Pipeline state written
- Ready for carousel-script

---

## Rules
- Do not proceed past any failed step
- Do not modify drug data — write it exactly as found
- Do not set a topic to `"done"` — that's Phase 4 in carousel-master
- Do not trigger any downstream subskills — carousel-master handles sequencing
- Do not touch other run folders — each run is isolated

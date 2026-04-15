---
name: carousel-data
description: "Extracts a single drug object from the local drugs.js for the carousel pipeline. Pulls latest from GitHub first, finds the drug matching selection.key from the pipeline state, and writes the raw drug object to carousel_working_data.json. Called only by carousel-master — never trigger directly."
version: "1.0.0"
author: rob
tags: [carousel, drug-data, pipeline]
---

# Carousel Data — Drug Extraction

Single-purpose step: get the drug data for the current carousel run.

## Workflow

1. Pull latest drug data:
   ```
   cd /data/.openclaw/workspace/cards && git pull --rebase
   ```
2. Read `carousel-pipeline/carousel_pipeline_state.json` → get `selection.key`
3. Read `cards/data/drugs.js` → find the drug object where `id` matches `selection.key`
4. Write the drug object as JSON to `carousel-pipeline/carousel_working_data.json`
5. Confirm the file exists and contains a valid drug object

## Rules
- If `git pull` fails, report the error and stop
- If the drug id isn't found in drugs.js, report the error and stop — do not guess or substitute
- Write the raw drug object exactly as it exists in drugs.js — no transformations, no field additions
- Do not proceed to the next pipeline phase — carousel-master handles sequencing

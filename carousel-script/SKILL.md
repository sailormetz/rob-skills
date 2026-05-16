---
name: carousel-script
description: "Writes the slide-by-slide carousel script for a single topic. Supports drug and shift-story types. Loads global rules plus per-type voice and structure references, then produces the full script from the pitch or opener. Called only by carousel-master — never trigger directly."
version: "3.0.0"
author: rob
tags: [carousel, script, content, pipeline]
---

# Carousel Script — Slide Writing

You are writing one carousel. Read all reference files before writing anything.

---

## Inputs

Follow this order — each step depends on the previous one.

**Step 1 — Read the pipeline state:**
`carousel-pipeline/runs/{topic_id}/carousel_pipeline_state.json`

This is the source of truth for the run. Pull `selection.topic_id`, `selection.type`, and the content inputs (`selection.pitch` for drug type; `selection.opener` + `selection.lesson` for shift-story type). You now know the `topic_id` and `type` — use them in every path below.

**Step 2 — Read the working data:**
`carousel-pipeline/runs/{topic_id}/carousel_working_data.json`

For drug type: the full drug object (doses, indications, contraindications, etc.).
For shift-story type: the opener and lesson in structured form.

**Step 3 — Load the reference files:**
- `skills/carousel-script/references/global_rules.md` — universal rules for all carousels
- `skills/carousel-script/references/{type}/voice.md` — voice, tone, and CTA for this type
- `skills/carousel-script/references/{type}/structure.md` — slide format, labels, limits, and hook rules for this type

Do not begin writing until all five files are read.

---

## Planning

Before writing, plan the carousel. The loaded `structure.md` for this type defines what planning looks like — follow it.

---

## Writing

Follow the structure, voice, and formatting rules from the loaded reference files. The pitch or opener defines the angle — don't drift into a generic overview.

---

## Output

Write the finished script to `carousel-pipeline/runs/{topic_id}/carousel_script.md`.

---

## Rules

- Read all five reference files before writing.
- The pitch/opener guides everything. Don't ignore it.
- Don't pad to hit a slide count. Short is fine.
- Don't repeat information across slides — each slide adds something new.
- Don't invent clinical information. Source from drug data, NASEMSO, AHA, StatPearls, or DailyMed.
- If drug data is insufficient for the pitch, report back to carousel-master instead of forcing it.

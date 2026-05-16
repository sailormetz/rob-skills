---
name: carousel-script
description: "Writes the slide-by-slide carousel script for a single topic. Reads the drug data and the topic pitch from the run folder, loads global rules, and produces the full carousel text as a markdown file. The pitch defines the angle — there are no rigid templates. Called only by carousel-master — never trigger directly."
version: "3.0.0"
author: rob
tags: [carousel, script, content, pipeline]
---

# Carousel Script — Slide Writing

You are writing one carousel. Read all reference files before writing anything.

---

## Inputs

Read these files before writing:

1. `carousel-pipeline/runs/{topic_id}/carousel_pipeline_state.json` — get `selection.topic_id`, `selection.type`, and the pitch/opener/lesson
2. `carousel-pipeline/runs/{topic_id}/carousel_working_data.json` — drug object (drug type) or opener+lesson (shift-story type)
3. `skills/carousel-script/references/global_rules.md` — universal rules for all carousels
4. `skills/carousel-script/references/{type}/voice.md` — voice, tone, and CTA for this carousel type
5. `skills/carousel-script/references/{type}/structure.md` — slide format, labels, limits, and hook rules for this type

Where `{type}` is `selection.type` from the pipeline state (`drug` or `shift-story`).

---

## Planning (do this before writing any slides)

Answer these three questions:

1. **What's the through-line?** One sentence: what does the viewer understand at the end that they didn't at the start?
2. **What's the context bridge?** What minimum setup does the reader need before the dive?
3. **What's the arc?** Map the progression from hook → context → dive → synthesis → CTA. Each slide earns its place.

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

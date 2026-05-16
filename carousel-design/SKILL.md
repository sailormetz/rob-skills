---
name: carousel-design
description: "Renders a tagged carousel script into designed JPEG slides at 1080×1350. Reads the script from the run folder, loads the type-specific design guide, builds an HTML layout, and screenshots each slide via Puppeteer. Called only by carousel-master — never trigger directly."
version: "3.0.0"
author: rob
tags: [carousel, design, rendering]
---

# Carousel Design — Slide Renderer

Takes a completed carousel script and renders it into final JPEG slides.

---

## Inputs

**Step 1 — Read the pipeline state:**
`carousel-pipeline/runs/{topic_id}/carousel_pipeline_state.json`

Pull `selection.topic_id` and `selection.type`. Use these in every path below.

**Step 2 — Load the type guide:**
`skills/carousel-design/references/{type}/guide.md`

The guide defines everything for this type: inputs, HTML structure, layout rules, slide classification, and rendering workflow. Follow it exactly.

Do not begin building HTML until the guide is loaded.

---

## Output

- `carousel-pipeline/runs/{topic_id}/carousel_render.html`
- `carousel-pipeline/runs/{topic_id}/slides/slide_01.jpg` through `slide_NN.jpg`

---

## Rules

- Never render without a completed script. Fail immediately if `carousel_script.md` is missing or empty.
- Do not modify the script. Render only what's written.
- Do not write to `carousel_pipeline_state.json` — carousel-master owns that.
- Slide filenames are zero-padded two digits: `slide_01.jpg`, not `slide_1.jpg`.

---
name: carousel-design
description: "Renders a tagged carousel script into designed JPEG slides at 1080×1920 for TikTok. Reads the script from the run folder, builds an HTML layout using the established design system, screenshots each slide via Puppeteer, and writes JPEGs to runs/{combo_hash}/slides/. Called only by carousel-master — never trigger directly."
version: "1.0.0"
author: rob
tags: [carousel, design, rendering, tiktok]
---

# carousel-design

Takes a completed carousel script and renders it into final JPEG slides using the established visual design system.

## Use this skill when

Called by `carousel-master` at Step 2. Never triggered directly.

---

## Inputs

Read from `carousel-pipeline/runs/{combo_hash}/`:

| File | Used for |
|------|----------|
| `carousel_pipeline_state.json` | `selection.template` (1–5) and `selection.key` (drug key) |
| `carousel_working_data.json` | `drug.genericName` — displayed on the hook slide |
| `carousel_script.md` | Full tagged slide script |

---

## Output

- `carousel-pipeline/runs/{combo_hash}/carousel_render.html` — assembled HTML page
- `carousel-pipeline/runs/{combo_hash}/slides/slide_01.jpg` through `slide_NN.jpg` — one JPEG per slide, 1080×1920

---

## Workflow

### 1. Read inputs

Load all three input files. Extract:
- `template` number (1–5) → look up eyebrow label in `references/template_eyebrows.md`
- `drug.genericName` from `carousel_working_data.json`
- Full script text from `carousel_script.md`

If `carousel_script.md` is missing or empty, fail immediately.

### 2. Parse the script

Split the script on slide markers (`[1]`, `[2]`, etc.). For each slide, extract:

| Element | Source | Notes |
|---------|--------|-------|
| `sectionLabel` | `<sectionLabel>...</sectionLabel>` | Present on all body slides |
| `topicName` | `<topicName>...</topicName>` | Optional — named subject header |
| `teaser` | `*...*` on its own line | Last line of body slides |
| body lines | All remaining non-tag lines | Rendered as `.line` paragraphs |

Convert inline color tags throughout all text:
```
[blue: text]     → <span class="c-blue">text</span>
[amber: text]    → <span class="c-amber">text</span>
[green: text]    → <span class="c-green">text</span>
[coral: text]    → <span class="c-coral">text</span>
[lavender: text] → <span class="c-lavender">text</span>
```

### 3. Classify each slide

| Condition | Layout |
|-----------|--------|
| Slide 1 | Hook |
| Last slide | CTA |
| `sectionLabel` = `Recap` | Recap |
| All others | Standard body |

### 4. Build the HTML

Construct a single HTML page with all slides using the design system from `references/design_mockup.html`. That file is the canonical reference for all CSS values, font choices, spacing, and class names — match it exactly.

**Auto-generated on every slide (no script input needed):**
- Progress bar — N pill segments across the top; prior slides dim blue, current slide bright blue
- Footer — "ROB THE PARAMEDIC" in small spaced caps at the bottom
- Slide counter fed to the progress bar JS

---

**Hook slide** (slide 1):
```html
<div class="slide">
  <div class="hook-wrap">
    <div class="hook-eyebrow"><!-- template eyebrow label --></div>
    <h1 class="hook-title"><!-- drug.genericName --></h1>
    <p class="hook-sub"><!-- hook line --></p>
    <p class="hook-teaser teaser"><!-- teaser (if present) --></p>
  </div>
  <div class="footer">ROB THE PARAMEDIC</div>
</div>
```

---

**Standard body slide:**
```html
<div class="slide">
  <div class="frame">
    <div class="top-row">
      <h2 class="slide-title subtle"><!-- sectionLabel --></h2>
      <div class="counter">N / TOTAL</div>
    </div>
    <div class="body">
      <!-- topicName (if present): -->
      <h3 class="dose-name"><!-- topicName --></h3>
      <!-- body lines: -->
      <p class="line"><!-- line text --></p>
      <!-- teaser: -->
      <p class="teaser"><!-- teaser text --></p>
    </div>
  </div>
  <div class="footer">ROB THE PARAMEDIC</div>
</div>
```

---

**Recap slide** (`sectionLabel` = Recap):
```html
<div class="slide">
  <div class="frame">
    <div class="top-row">
      <h2 class="slide-title subtle">Recap</h2>
      <div class="counter">N / TOTAL</div>
    </div>
    <div class="body">
      <!-- topicName (e.g. "The essentials.") if present: -->
      <h3 class="dose-name"><!-- topicName --></h3>
      <div class="recap-list">
        <!-- one recap-item per labeled line: -->
        <div class="recap-item">
          <div class="label c-[color]"><!-- label text --></div>
          <div class="desc"><!-- description text --></div>
        </div>
      </div>
      <p class="teaser"><!-- teaser --></p>
    </div>
  </div>
  <div class="footer">ROB THE PARAMEDIC</div>
</div>
```

Recap lines in the script are formatted as `[color: Label] — description`. Split on ` — ` to get label and desc. The color class on `.label` comes from the color tag.

---

**CTA slide** (last slide):
```html
<div class="slide">
  <div class="cta-wrap">
    <p class="cta-eyebrow"><!-- optional eyebrow --></p>
    <h2 class="cta-line1"><!-- save prompt --></h2>
    <p class="cta-line2"><!-- app reference line --><br>
      <span class="cta-link">Link in bio</span>
    </p>
  </div>
  <div class="footer">ROB THE PARAMEDIC</div>
</div>
```

---

### 5. Write the HTML

Use the `write` tool to save the assembled page to:
```
carousel-pipeline/runs/{combo_hash}/carousel_render.html
```
Include the full CSS copied from `references/design_mockup.html` and the progress bar JS in the same file.

### 6. Screenshot via Puppeteer

The screenshot script cannot be called with flags directly — the shell blocks complex invocations. Instead, write a small throwaway wrapper script with the paths hardcoded:

```js
// write to: carousel-pipeline/runs/{combo_hash}/render.js
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const htmlPath = path.resolve('carousel-pipeline/runs/{combo_hash}/carousel_render.html');
const outDir   = path.resolve('carousel-pipeline/runs/{combo_hash}/slides');

// ... (copy body from references/screenshot.js)
```

Then run it from the workspace root:
```
node carousel-pipeline/runs/{combo_hash}/render.js
```

The `slides/` directory is created automatically by the script. Each `.slide` element is captured at 1080×1920 and saved as `slide_01.jpg`, `slide_02.jpg`, etc.

### 7. Verify output

Confirm the `slides/` directory exists and contains the expected number of JPEGs — one per slide in the script. If the count doesn't match or the directory is missing, log the error and fail.

---

## Design Reference

`references/design_mockup.html` — full rendered epinephrine T1 carousel. Every CSS variable, font, color, spacing rule, and layout class is defined here. This is the visual source of truth. When in doubt, open it.

`references/template_eyebrows.md` — maps template number to hook eyebrow label.

`references/screenshot.js` — Puppeteer script that renders each slide to JPEG.

---

## Rules

- Never generate slides without a completed script. If `carousel_script.md` is missing or empty, fail immediately with a clear error.
- The design mockup is the visual anchor. Do not invent new CSS or deviate from established class names and layout patterns.
- Do not modify the script. Render only what's written.
- Do not write to `carousel_pipeline_state.json` or `carousel_usage_log.json` — carousel-master owns those.
- Slide filenames are zero-padded two digits: `slide_01.jpg`, not `slide_1.jpg`.
- The progress bar and footer are always rendered — never omit them.

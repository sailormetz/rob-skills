# Drug Carousel Design Guide

Everything needed to render a drug carousel script into finished JPEG slides. Load this file in full before building any HTML.

---

## Inputs

Read from `carousel-pipeline/runs/{topic_id}/`:

| File | Used for |
|------|----------|
| `carousel_pipeline_state.json` | `selection.topic_id`, `selection.drug`, `selection.pitch` |
| `carousel_working_data.json` | `drug.genericName` — displayed on the hook slide |
| `carousel_script.md` | Full tagged slide script |

---

## Output

- `carousel-pipeline/runs/{topic_id}/carousel_render.html` — assembled HTML page
- `carousel-pipeline/runs/{topic_id}/slides/slide_01.jpg` through `slide_NN.jpg` — one JPEG per slide, 1080×1350

---

## Workflow

### 1. Read inputs

Load all three input files. Extract:
- `topic_id` from `carousel_pipeline_state.json`
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

Construct a single HTML page with all slides using the design system from `references/drug/design_mockup.html`. That file is the canonical reference for all CSS values, font choices, spacing, and class names — match it exactly.

**Auto-generated on every slide (no script input needed):**
- Progress bar — N pill segments across the top; prior slides dim blue, current slide bright blue
- Footer — "ROB THE PARAMEDIC" in small spaced caps at the bottom

---

**Hook slide** (slide 1):
```html
<div class="slide">
  <div class="hook-wrap">
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
      <h3 class="dose-name"><!-- topicName if present --></h3>
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
    <p class="line"><!-- engagement question --></p>
    <p class="line"><!-- resource hint --></p>
  </div>
  <div class="footer">ROB THE PARAMEDIC</div>
</div>
```

---

### 5. Write the HTML

Save the assembled page to:
```
carousel-pipeline/runs/{topic_id}/carousel_render.html
```

Include the full CSS from `references/drug/design_mockup.html` and the progress bar JS in the same file.

### 6. Screenshot via Puppeteer

Write a throwaway wrapper script with paths hardcoded:

```js
// write to: carousel-pipeline/runs/{topic_id}/render.js
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const htmlPath = path.resolve('carousel-pipeline/runs/{topic_id}/carousel_render.html');
const outDir   = path.resolve('carousel-pipeline/runs/{topic_id}/slides');

// ... (copy body from references/drug/screenshot.js)
```

Then run from the workspace root:
```
node carousel-pipeline/runs/{topic_id}/render.js
```

Each `.slide` element is captured at 1080×1350 and saved as `slide_01.jpg`, `slide_02.jpg`, etc.

### 7. Verify output

Confirm `slides/` exists and contains the expected number of JPEGs — one per slide. If the count doesn't match or the directory is missing, log the error and fail.

---

## Design Reference Files

- `references/drug/design_mockup.html` — canonical visual reference. All CSS variables, fonts, colors, spacing, and class names are defined here. Match it exactly.
- `references/drug/screenshot.js` — Puppeteer script that renders each slide to JPEG.

---

## Rules

- Never generate slides without a completed script. If `carousel_script.md` is missing or empty, fail immediately.
- The design mockup is the visual anchor. Do not invent new CSS or deviate from established class names.
- Do not modify the script. Render only what's written.
- Do not write to `carousel_pipeline_state.json` — carousel-master owns that.
- Slide filenames are zero-padded two digits: `slide_01.jpg`, not `slide_1.jpg`.
- Progress bar and footer are always rendered — never omit them.
- No hook eyebrow — the hook statement drives the frame. Do not add an eyebrow element to slide 1.

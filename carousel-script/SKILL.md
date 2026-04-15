---
name: carousel-script
description: "Writes the slide-by-slide carousel script for a single drug×template combo. Reads the drug data and the assigned template + global rules from references, then produces the full carousel text as a markdown file. Called only by carousel-master — never trigger directly."
version: "1.0.0"
author: rob
tags: [carousel, script, content, pipeline]
---

# Carousel Script — Slide Writing

You are writing one carousel's worth of slide text. Your inputs are a drug object and a template. Your output is a finished script following the template structure and global rules exactly.

---

## Inputs

All inputs come from the current run folder at `carousel-pipeline/runs/{combo_hash}/`.

1. **Pipeline state** — read `carousel_pipeline_state.json` to get `selection.template` and `selection.key`
2. **Drug data** — read `carousel_working_data.json` (the full drug object for this run)
3. **Global rules** — read `skills/carousel-script/references/global_rules.md` (applies to every carousel)
4. **Template** — read `skills/carousel-script/references/template_{selection.template}.md` (the specific template for this run)

Read all four before writing anything.

---

## Writing the Script

Follow the template's slide structure exactly — it defines the number of slides, what each slide covers, and the content rules per slide.

Follow the global rules exactly — they define voice, tone, abbreviations, word limits, hook rules, CTA rules, slide formatting, and clinical accuracy standards.

The drug object is your source data. Pull names, classes, MOA, indications, doses, contraindications, and precautions from it. Do not invent clinical information that isn't in the drug data or supported by NASEMSO, AHA, StatPearls, or DailyMed.

---

## Output

Write the finished script to `carousel-pipeline/runs/{combo_hash}/carousel_script.md`.

Format: numbered slide sequence exactly as specified in the global rules:

```
[1] <hook text>
[2] <HEADLINE>
 <supporting text line 1>
 <supporting text line 2>
[3] <HEADLINE>
 <supporting text line 1>
...
[N] <CTA text>
```

---

## Rules
- Do not deviate from the template structure — each slide has a defined role
- Do not exceed 40 words per body slide, 15 words for the hook, 20 words for the CTA
- Do not add slides beyond what the template calls for — short carousels are valid
- Do not pad with filler to hit a slide count
- Do not include dosing info in Template 3 (mechanism-only)
- Do not repeat information across slides — each slide adds something new
- One emoji max per carousel, hook or CTA only
- Every body slide needs a 2–6 word ALL CAPS headline
- If the drug data is insufficient for the assigned template (e.g., no contraindications for Template 2), report back to carousel-master instead of forcing it

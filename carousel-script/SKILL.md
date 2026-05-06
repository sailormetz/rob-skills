---
name: carousel-script
description: "Writes the slide-by-slide carousel script for a single topic. Reads the drug data and the topic pitch from the run folder, loads global rules, and produces the full carousel text as a markdown file. The pitch defines the angle — there are no rigid templates. Called only by carousel-master — never trigger directly."
version: "2.0.0"
author: rob
tags: [carousel, script, content, pipeline]
---

# Carousel Script — Slide Writing

You are writing one carousel. Your inputs are a drug object and a topic pitch. Your output is a finished script that follows the global rules and serves the pitch.

---

## Inputs

All inputs come from the current run folder at `carousel-pipeline/runs/{topic_id}/`.

1. **Pipeline state** — read `carousel_pipeline_state.json` to get `selection.topic_id`, `selection.drug`, and `selection.pitch`
2. **Drug data** — read `carousel_working_data.json` (the full drug object for this run)
3. **Global rules** — read `skills/carousel-script/references/global_rules.md`

Read all three before writing anything.

---

## How to Use the Pitch

The pitch is a 1-2 sentence editorial brief that tells you:
- What angle to take
- What the reader should walk away understanding

It is NOT a slide-by-slide template. You decide the structure, slide count, and flow based on what the pitch needs. The pitch tells you the destination; you plan the route.

**Example pitch:** "The reasons you don't give fentanyl and how to spot them."

From that, you'd plan: hook teasing contraindications → brief identity/context slide → walk through each major contraindication with clinical reasoning → synthesis → CTA. Maybe 6 slides, maybe 8. Depends on how many contraindications matter and how much explanation each needs.

---

## Planning the Carousel

Before writing any slides, answer these three questions:

1. **What's the through-line?** One sentence: what does the viewer understand by the end that they didn't at the start?
2. **What's the identity bridge?** The reader may not know this drug. What's the minimum context they need before the dive? (Usually 1 slide: name, class, what it's for.)
3. **What's the arc?** Map the slide progression from hook → context → dive → synthesis → CTA. Each slide should earn its place.

---

## Slide Flow

Every carousel follows this general shape, but the number of slides and depth flexes per topic:

### Hook (Slide 1)
Teases the angle. Makes the reader want to swipe. Must contain the drug name. Max 15 words. Can carry a teaser.

### Identity / Context (Slide 2, sometimes 2-3)
Grounds the reader. What is this drug? What class? What's it used for? Write for someone who may have never heard of it. This is not filler — it's the anchor that makes the rest of the carousel land.

How much context depends on the drug and the pitch:
- Well-known drug (epinephrine, naloxone) → 1 slide, brief
- Obscure drug (pralidoxime, etomidate) → 1-2 slides, more thorough
- If the pitch angle connects directly to the drug's identity (e.g. "why this drug exists"), the context slide can blend into the dive

### The Dive (variable slides)
This is the meat — the angle the pitch describes. Could be contraindications, mechanism, clinical pearls, comparisons, a specific scenario. Structure it however serves the content best:

- **Multiple named items** (contraindications, indications, adverse effects) → one item per slide with `<topicName>`, or group related items
- **Sequential/causal chain** (mechanism, what happens after you push it) → one step per slide, each building on the last
- **Single deep concept** (why a drug exists, how it compares to another) → narrative slides that build an argument

Every dive slide gets a `<sectionLabel>` and a teaser. Use `<topicName>` when the slide is clearly about one named thing.

### Synthesis (1 slide, before CTA)
Ties the dive back to something the reader cares about. Connects the angle to clinical practice. "This is why it matters" or "this is what to do with this information."

Not a recap of bullet points — a closing thought that lands the through-line.

### CTA (final slide)
Engagement question + subtle resource hint. Plain text, no color tags. Rotate the engagement line per carousel. Use standard options from global rules.

---

## Output

Write the finished script to `carousel-pipeline/runs/{topic_id}/carousel_script.md`.

Use the numbered slide format specified in global rules.

---

## Rules
- The pitch guides the angle. Do not ignore it or drift into a generic drug overview.
- Follow global rules for voice, tone, color tags, teasers, lead lines, no throat-clearing, abbreviations, and clinical accuracy.
- Do not exceed 5 sentences per body slide. If a slide needs more, split it.
- Hook: max 15 words. CTA: exactly 2 lines (engagement + resource hint), no color tags.
- Do not pad with filler to hit a slide count. Short carousels (5-6 slides) are valid.
- Do not repeat information across slides — each slide adds something new.
- One emoji max per carousel, hook or CTA only.
- If the drug data is insufficient for the pitch (e.g., pitch is about contraindications but the drug has none), report back to carousel-master instead of forcing it.
- Do not invent clinical information. Source from the drug data, NASEMSO, AHA, StatPearls, or DailyMed.

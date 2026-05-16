# Drug Carousel — Structure & Format

---

## Slide Labels

Every body slide gets a `<sectionLabel>` in the top-left. Required, no exceptions.

**Valid values:** `Mechanism`, `Dose`, `Dosing`, `Contraindications`, `Cautions`, `Clinical Pearl`, `Clinical Context`, `Recap`, `Indications`, `Adverse Effects`, `Post-Administration`, `Identity`, `Precautions`, `Synthesis`

**`<topicName>`** — large header beneath the section label. Use when a slide covers one specific named thing from a set (one indication, one contraindication, etc.). Don't use on continuous narrative slides or when the lead line carries it.

```
[4]  <sectionLabel>Dose</sectionLabel>
     <topicName>Cardiac Arrest</topicName>
     1 mg IV/IO (1:10,000) every 3–5 min.
```

---

## Teasers

Every body slide ends with an italicized teaser pointing forward. CTA never gets one. Hook can carry one.

Calibrate to the transition: dramatic reveals get pointed teasers, routine handoffs get quiet ones.

**Teaser spectrum:**
- *"Next up..."*
- *"But there's a catch..."*
- *"Anaphylaxis is a different situation entirely..."*
- *"The reason it works for both comes down to how it hits the body..."*

Format: `*Like this.*` — own line, bottom of slide, after all body content.

---

## Recap Slides

Use when 3+ named items were covered — scannable summary before CTA. Format: `[color: Category] — key takeaway` per line. Don't use on narrative chains or when only 1-2 items were covered.

```
[N]  <sectionLabel>Recap</sectionLabel>
     [color: Category] — brief summary
     [color: Category] — brief summary
     *One more slide...*
```

---

## Hook Rules

Two parts: **frame** (statement naming drug + angle) and **question** (makes reader test themselves, hints at specific content). Under 25 words total.

- Must contain drug name. Specific to the angle.
- Question creates a knowledge gap — reader tries to answer, realizes they're not sure.
- Concrete questions beat vague ones: "Do you know the four major reasons to use it?" > "How well do you know this drug?"
- Don't start with "Did you know," "Here's why," or "Let me explain."
- Don't oversell.

**Examples:**
```
[1]  [amber: Epinephrine] - one drug, more jobs than anything else on the ambulance.
     *Do you know the four major reasons to use it?*

[1]  [amber: Fentanyl] - safe when used right, dangerous when it's not.
     *Can you name the three situations where it becomes dangerous?*

[1]  [amber: Adenosine] - six seconds of nothing, then a reset.
     *Do you know what actually happens when you push it?*
```

---

## Slide Limits

- **Body text: 60 words max per slide.** Count body lines only — exclude sectionLabel, topicName, and teaser.
- Hook: max 25 words total.
- CTA: max 20 words.
- Carousel length: as long as content requires. Short (5-6 slides) is valid.

---

## Slide Format

```
[1]  <hook frame>
     *<question or teaser>*

[2]  <sectionLabel>Identity</sectionLabel>
     Lead line. Supporting lines.
     *<teaser>*

[3]  <sectionLabel>Dose</sectionLabel>
     <topicName>Cardiac Arrest</topicName>
     Lead line. Supporting lines.
     *<teaser>*

[N]  <sectionLabel>Recap</sectionLabel>
     [color: Item] — takeaway
     *One more slide...*

[N]  CTA line 1
     CTA line 2
```

---

## Auto-Generated (don't write these)

Progress bar, footer ("ROB THE PARAMEDIC"), hook/CTA layout — all handled by the design layer.

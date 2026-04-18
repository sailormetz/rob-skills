# Carousel Global Rules

These rules apply to every slide of every carousel regardless of template.

---

## Audience

- Primary audience: paramedic students studying for the NREMT and college pharmacology courses.
- Secondary audience: working paramedics refreshing knowledge.
- Assume paramedic-level baseline knowledge. Do not define standard clinical terms (e.g., fasciculations, bronchospasm, hemodynamically, tachycardia, SVR). The audience knows these words.

---

## The Core Principle: Tell a Story

A carousel is not a flashcard set. It is a narrative — told in slides.

The viewer should feel like they're being walked through something, not flipping through a reference sheet. Every slide picks up where the last one left off. The information builds. By the end, the viewer has been led somewhere — they understand something they didn't before, or understand it better.

**The template tells you what to cover. Your job is to connect it.**

Every template has a scope — contraindications, mechanism, indications, post-administration. Whatever the scope, the content inside it should still have a natural progression. Start from the most foundational idea and move toward the most specific. Establish context before making claims. Give the reader a reason to care before giving them the detail.

**Before writing, ask: what is the through-line of this carousel?** What is the one thing the viewer should walk away understanding? Every slide should serve that through-line. If a slide doesn't move the narrative forward, cut it or reframe it.

Narrative doesn't require breadth. A carousel entirely about contraindications can still tell a story — why this drug creates these risks, how each contraindication connects back to the drug's mechanism, which ones are most dangerous and why. That's a story. A list of bullet points is not.

---

## Voice and Tone

- Write the way a sharp colleague explains something — not a textbook, not a lecture, not a bullet list.
- Every sentence should sound natural if spoken out loud. If it reads like a PowerPoint slide, rewrite it.
- Use complete sentences. Not cryptic shorthand. Not noun-only fragments.
- Be direct and confident. No hedging, no "you might want to consider." State the information.
- Do not talk down to the audience. No "did you know?" phrasing. No "fun fact." No exclamation-heavy enthusiasm.
- Do not over-explain. If a point is already clear from context, don't restate it. Move forward. This includes pharmacokinetic details (onset, duration) already established on the context or overview slide — don't repeat them on post-admin or indication slides unless the timing is clinically actionable on that specific slide.
- One emoji maximum per carousel, and only on the hook or CTA slide. Never in body slides.

### Em Dashes

Use em dashes sparingly and deliberately. They are for emphasis, not sentence construction.

**Acceptable:** A hook that uses a dash for dramatic weight — "Epinephrine — the drug that does three jobs at once."
**Not acceptable:** Using dashes as the default way to connect clauses — "It binds α-1 receptors — which causes vasoconstriction — bringing BP back up."

When a dash appears in a body slide, it should feel intentional, not habitual. If you can replace it with a period or a comma without losing anything, do that.

---

## Slide Structure: Lead Line First

Every body slide starts with a **lead line** — a complete, punchy sentence that can stand alone. Supporting lines expand on it.

Do not open slides with an ALL CAPS headline. That format turns the carousel into a reference sheet. Write the most important thought first, then build from it.

**Wrong:**
```
MECHANISM OF ACTION
Binds mu-opioid receptors. Reduces pain perception.
Onset 3–5 min IV.
```

**Right:**
```
It works by binding mu-opioid receptors in the brain and spinal cord.
That's what blocks the pain signal — same mechanism as morphine.
Onset is 3–5 minutes IV.
```

The first version is a label and bullets. The second is a sentence that leads somewhere.

---

## Slide Labels and Topic Headers

Every body slide (everything except hook and CTA) has two positional elements the script can specify:

**`<sectionLabel>`** — a subtle uppercase label in the top-left corner naming the slide's role or section. The design layer renders this small and dim. Always provide one on body slides.

Common values: `Mechanism`, `Dose`, `Contraindications`, `Cautions`, `Clinical Pearl`, `Recap`, `Indications`, `Adverse Effects`, `Post-Administration`, `Identity`

**`<topicName>`** — a large prominent header beneath the section label, used when a slide has one specific named subject (an indication, a contraindication, a drug being compared, etc.). Optional — only use when the slide is clearly about one named thing.

```
[4]  <sectionLabel>Dose</sectionLabel>
     <topicName>Cardiac Arrest</topicName>
     1 mg IV/IO (1:10,000) every 3–5 min.
     Push fast and flush with 20 mL NS after each dose to move it centrally.
     *Anaphylaxis is a different situation entirely...*
```

**Use `<sectionLabel>` on every body slide.** It orients the reader instantly.

**Use `<topicName>` when:**
- Multiple indications each get their own slide
- Multiple contraindications each get their own slide
- Multiple adverse effects each get their own slide
- Any repeating structure where each slide covers one named item from a set

**Do not use `<topicName>` when:**
- The slide is a continuous narrative — a header would interrupt rather than orient
- The slide has 1–2 lines of content — the lead line carries it on its own

---

## Recap Slides

When a carousel covers multiple distinct items (contraindications, adverse effects, indications, mechanism targets), add a recap slide before the CTA to give the viewer a scannable summary of everything covered.

**Format:**
```
[N]  <sectionLabel>Recap</sectionLabel>
     [color: Category] — brief summary of what was covered
     [color: Category] — brief summary
     [color: Category] — brief summary
     *One more slide...*
```

Each line is a colored label followed by a dash and the key takeaway — dose, mechanism, caveat, whatever matters most for that category. Match the color to the content type (green for indications, coral for contraindications, blue for mechanism, etc.). No framing sentence needed. No pills.

**Use a recap slide when:**
- The carousel has 3+ distinct named items
- The viewer would benefit from seeing all items in one place after walking through them one by one

**Do not use a recap slide when:**
- The carousel is a continuous narrative chain (e.g., step-by-step mechanism in Template 3)
- The carousel only covers 1–2 items — a recap would just repeat the whole carousel
- The content is already self-summarizing

The recap slide goes immediately before the CTA. The CTA is always the final slide.

---

## Narrative Continuity

Each slide should pick up where the previous one left off. The transition doesn't have to be explicit, but the reader should feel the flow rather than a hard reset.

Think of it as a conversation. You finish one thought, then move naturally to the next. You're not starting a new chapter with every slide.

**Example — identity slide followed by mechanism slide:**

Slide 2 (Identity): *"Also called Adrenalin and EpiPen. It's a sympathomimetic, catecholamine, and vasopressor — it mimics your body's own stress response. First-line for both anaphylaxis and cardiac arrest."*
Teaser: *"The reason it works for both comes down to which receptors it hits..."*

Slide 3 (Mechanism): *"It hits three receptors at once, and each one does something different. α-1 causes vasoconstriction, which brings BP back up. β-1 increases HR and contractility. β-2 relaxes the airways."*

That's a story. Each slide sets up the next.

### Teasers

Every body slide ends with a teaser. The reader needs a reason to swipe on every single slide — not just where the transition is dramatic.

A teaser is a short italicized line — one sentence or a fragment — that creates a reason to keep going. It doesn't have to be a cliffhanger. A quiet handoff is fine. The only requirement is that it points forward.

**The teaser rule:**
- Every body slide gets one — no exceptions.
- The recap slide gets one: something like *"One more slide..."* or *"Let's wrap it up..."*
- The CTA slide never gets a teaser — it's the end.
- The hook slide can carry a teaser (see Hook Rules).

**Calibrate to the transition, not to a formula.** A dramatic reveal gets a dramatic teaser. A routine handoff gets a quiet one. Both are valid — what's not valid is skipping it entirely.

**Teaser spectrum — from quiet to pointed:**
- *"Next up..."*
- *"But there's a catch..."*
- *"Let's recap..."*
- *"One more thing..."*
- *"Anaphylaxis is a different situation entirely..."*
- *"The concentration is where people get into trouble..."*
- *"The reason it works for both comes down to how it hits the body..."*

Format teasers using asterisks: `*Like this.*` — one line, at the bottom of the slide, after all body content and any `<topicName>` or `<sectionLabel>` tags. No separate tag needed. Asterisks are the teaser syntax.

---

## Inline Emphasis and Color Coding

The design layer applies color to specific words. The script signals what gets highlighted using bracket tags. The design skill reads these and renders the correct color.

**Tagging format:** `[color: word or phrase]`
Example: `It's a [blue: sympathomimetic], [blue: catecholamine], and [blue: vasopressor].`

### Color Definitions

These match the drug cards app palette exactly.

| Tag | Color | Hex | Use for |
|-----|-------|-----|---------|
| `[blue: ...]` | Blue | `#5e9be8` | Drug class terms, mechanism words, receptor names, technical concepts. The default highlight when no more specific category applies. |
| `[amber: ...]` | Amber | `#daa040` | Trade and brand names. Also used for warnings, precautions, and key clinical actions — things the medic needs to actively do (e.g. "Monitor RR and etCO₂", "Have naloxone drawn", "Push slowly"). Flexible — can serve as a second general highlight alongside blue when content warrants it. |
| `[green: ...]` | Green | `#52d693` | Indications and clinical uses. Any named condition the drug is used to treat. |
| `[coral: ...]` | Coral | `#e86363` | Contraindications. Named contraindications and situations to avoid. Not for general caution language. |
| `[lavender: ...]` | Lavender | `#7c6ddd` | Adverse effects and side effects. Named adverse outcomes the drug can cause. |

### Rules

- Apply color based on what the information is. The type of content determines the color — not what looks balanced visually.
- Green, coral, and lavender are strictly codified. Use them only for their defined category. Do not cross-apply them.
- Blue and amber are more discretionary. Both can flex when the content doesn't map cleanly to a strict category. When in doubt, default to blue.
- Only highlight what genuinely earns it. Not every sentence needs emphasis. Over-highlighting kills the effect.
- Every slide must have at least one color tag. If the content is straightforward and nothing screams for emphasis, tag the single most important word or phrase in amber or blue. A slide where every third word is colored is not.
- Doses and routes are never tagged. The design layer renders doses in large display type automatically.
- Teasers are never highlighted.

---

## Tag Reference

Every tag in the script system. Untagged lines are treated as plain body text by default — you do not need to wrap ordinary prose in anything.

| Tag | Format | Purpose |
|-----|--------|---------|
| `<sectionLabel>Name</sectionLabel>` | XML-style | Top-left slide label (e.g. "Dose", "Mechanism", "Cautions"). Required on every body slide. |
| `<topicName>Name</topicName>` | XML-style | Large prominent subject header beneath the section label. Use when a slide has one specific named topic (an indication, a contraindication, etc.). Optional. |
| `[blue: ...]` | Bracket | Inline color: drug classes, receptors, mechanism terms, technical concepts. |
| `[amber: ...]` | Bracket | Inline color: trade/brand names, warnings, precautions, key clinical actions. |
| `[green: ...]` | Bracket | Inline color: indications and clinical uses. |
| `[coral: ...]` | Bracket | Inline color: contraindications. |
| `[lavender: ...]` | Bracket | Inline color: adverse effects and side effects. |
| `*text*` | Asterisks | Teaser line. Always the last line of the slide. Never on CTA. |

Plain body text (no tag) is the default. Only use tags when the design layer needs to treat something differently.

---

## Slide Word Count

- Body slides: aim for 3–5 sentences. If a slide needs more than 5 sentences to make its point, split it into two slides.
- Hook slide (slide 1): maximum 15 words.
- CTA slide (final slide): maximum 20 words.
- The test: can you read the slide out loud comfortably in one breath? If not, it's probably too long.

---

## Slide Count

- A carousel should be exactly as long as the content requires and no longer.
- Do not pad slides with filler to reach a target length.
- Short carousels (4–6 slides) are valid. A tight 5-slide carousel with strong narrative outperforms a padded 8-slide carousel with weak filler.
- The slide ranges in each template are upper bounds, not targets.

---

## Auto-Generated Elements

These appear on every slide automatically. The script author does not write them.

- **Progress bar** — a row of N pill-shaped segments across the top of every slide. Completed segments are dim blue; the active segment is bright blue. Generated from slide count.
- **Footer** — "ROB THE PARAMEDIC" in small caps at the bottom of every slide.
- **Hook layout** — the hook slide has its own fixed structure (eyebrow label, large drug name, hook line, optional teaser). Write the content; the design layer handles the layout.
- **CTA layout** — same as hook: fixed structure, write the content only.

---

## Slide Numbering Format

Output each carousel as a numbered slide sequence. Teasers appear as italic lines at the bottom of their slide.

**Hook slide:**
```
[1]  <hook line>
     *<teaser>*
```

**Plain body slide:**
```
[2]  <sectionLabel>Identity</sectionLabel>
     Lead line goes here.
     Supporting lines.
     *<teaser>*
```

**Body slide with named topic:**
```
[3]  <sectionLabel>Dose</sectionLabel>
     <topicName>Cardiac Arrest</topicName>
     Lead line goes here.
     Supporting lines.
     *<teaser>*
```

**Recap slide (when applicable — goes before CTA):**
```
[N]  <sectionLabel>Recap</sectionLabel>
     [blue: Mechanism] — key fact
     [green: Indication] — key dose
     [coral: Contraindications] — key caveat
     *One more slide...*
```

**CTA slide (always last):**
```
[N]  <CTA line 1>
     <CTA line 2>
```

Example — plain body slide with color tags and teaser:
```
[2]  <sectionLabel>Identity</sectionLabel>
     Also called [amber: Adrenalin], or [amber: EpiPen].
     It's a [blue: sympathomimetic], [blue: catecholamine], and [blue: vasopressor]. It mimics your body's natural stress response.
     It's the first-line drug for both [green: anaphylaxis] and [green: cardiac arrest].
     *The reason it works for both comes down to how it hits the body...*
```

Example — slide with topic header, color tags, and teaser:
```
[4]  <sectionLabel>Dose</sectionLabel>
     <topicName>Cardiac Arrest</topicName>
     1 mg IV/IO (1:10,000) every 3–5 min.
     Push fast and flush with 20 mL NS after each dose to move it centrally.
     *Anaphylaxis is a different situation entirely...*
```

---

## Hook Rules

The hook is slide 1. It determines whether anyone sees the rest of the carousel.

- Maximum 15 words for the hook line itself.
- Must be specific to the drug or topic. Generic hooks are not acceptable.
- Must contain the drug name (for single-drug templates) or the scenario/class name (for multi-drug templates).
- Provoke slightly — make the viewer feel like they might not know this as well as they thought, or that there's something worth knowing here. Not sensationalized, not clickbait. Just a quiet challenge or a genuine tease.
- A good hook creates a knowledge gap or a stakes frame. The viewer either doesn't know something and wants to, or realizes something matters and keeps reading.
- Questions work when they're genuine and slightly pointed — not rhetorical softballs. "How well do you really know this drug?" works. "Did you know epinephrine has three receptors?" does not.
- Do not start with "Did you know," "Here's why," or "Let me explain."
- Do not oversell. "The most important drug in EMS" or "You NEED to know this" is overdone. Confidence is quiet.

**The hook can carry a teaser.** If the hook line sets up a question or a frame, a teaser can deliver the first hint of the answer — just enough to make the viewer swipe. Keep it short and specific, not vague.

**Hook + teaser example:**
```
[1]  Epinephrine — how well do you really know this drug?
     *It does three jobs at once. Here's all of them...*
```

**Hook formulas that work:**
- `[Drug] — how well do you really know this drug?`
- `[Drug] — [the one specific thing that makes it worth understanding].`
- `[Drug]: everything on one card.`
- `If [Drug] is on your next test, save this.`

---

## CTA Rules

The CTA is the closing line of the story — brief, practical, direct.

- Lead with a save prompt tied to a practical use.
- Follow with one line referencing the app.
- Do not use "Drop a comment," "Tag a friend," or engagement-bait CTAs.
- Maximum 2 lines total.

**Standard options — rotate between these:**

```
Save this for your next exam.
All 70 drugs, one app.
Link in bio.
```
```
Save this for your next shift.
Full doses, MOA, and contraindications for every drug.
Link in bio.
```
```
Save this to your study deck.
The complete drug reference is in the bio.
Link in bio.
```

Vary the save prompt to match context. The app reference line stays consistent.

---

## Abbreviations

**Always abbreviate:**
- BP, HR, RR, SpO₂, etCO₂
- K+, Na+, Ca²+, Mg²+
- IV, IO, IM, IN, SQ, SL, PO, PR, ET
- SVR, CO, MAP
- NS, LR
- HTN, ACS, MI, CHF, COPD, SVT, V-fib, V-tach, A-fib
- RSI, ROSC, ACLS, PALS
- MH, MH hx
- q (in dosing context), hx, pedi

**Never abbreviate:**
- Drug names. Always write the full generic name.
- Receptor names on first use (α-1, β-1, β-2, muscarinic are standard notation, not abbreviations).
- Clinical concepts being explained on that slide — write them out.

---

## Clinical Accuracy

- All drug information must come from the provided drug data or from NASEMSO, AHA ACLS/PALS, StatPearls, or DailyMed.
- Do not invent clinical pearls. If it's not grounded in established prehospital pharmacology, leave it out.
- Do not include hospital-level concerns, dosing, or monitoring outside paramedic scope.
- When referencing a dose: always include amount, route, and repeat interval if applicable. Include concentration if clinically significant for that drug.

# Carousel Global Rules

These rules apply to every slide of every carousel regardless of template.

---

## Audience

- Primary audience: paramedic students studying for the NREMT and college pharmacology courses.
- Secondary audience: working paramedics refreshing knowledge.
- Assume paramedic-level baseline knowledge. Do not define standard clinical terms (e.g., fasciculations, bronchospasm, hemodynamically, tachycardia, SVR). The audience knows these words.

---

## The Core Principle: Tell a Story

A carousel is not a flashcard set. It is a story about one drug, told in slides.

The viewer should feel like they're being walked through something, not flipping through a reference sheet. Every slide picks up where the last one left off. The information builds. By the end, the viewer understands the drug as a whole — not as a collection of disconnected facts.

**Before writing, ask: what is the story of this drug?** What makes it interesting, specific, or worth knowing? That answer shapes everything — the hook, the order of slides, the tone. The template tells you what topics to cover. You decide how to connect them into a coherent arc.

A good carousel has a beginning (here's what this drug is and why it matters), a middle (here's how it works and when you use it), and an end (here's what to watch for, and what to remember). The CTA is the closing line.

---

## Voice and Tone

- Write the way a sharp colleague explains something — not a textbook, not a lecture, not a bullet list.
- Every sentence should sound natural if spoken out loud. If it reads like a PowerPoint slide, rewrite it.
- Use complete sentences. Not cryptic shorthand. Not noun-only fragments.
- Be direct and confident. No hedging, no "you might want to consider." State the information.
- Do not talk down to the audience. No "did you know?" phrasing. No "fun fact." No exclamation-heavy enthusiasm.
- Do not over-explain. If a point is already clear from context, don't restate it. Move forward.
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

## Narrative Continuity

Each slide should pick up where the previous one left off. The transition doesn't have to be explicit, but the reader should feel the flow rather than a hard reset.

Think of it as a conversation. You finish one thought, then move naturally to the next. You're not starting a new chapter with every slide.

**Example — identity slide followed by mechanism slide:**

Slide 2: *"It's a sympathomimetic, catecholamine, and vasopressor. It mimics your body's natural stress response. It's the first-line drug for both anaphylaxis and cardiac arrest."*

Slide 3: *"The reason it works for both comes down to which receptors it hits..."*

That's a story. Each slide sets up the next.

### Teasers

End body slides with a brief teaser when the next slide naturally follows from it. A teaser is a short italicized line — one sentence or a fragment — that creates curiosity about what's coming.

Teasers should feel like the natural next thing you'd say in a conversation, not a forced cliffhanger. Use them where the transition earns it. Not every slide needs one — the last body slide before the CTA never gets a teaser.

**Examples:**
- *"The reason it works for both comes down to how it hits the body..."*
- *"Anaphylaxis is a different situation entirely..."*
- *"Just don't make these mistakes..."*
- *"One more thing that trips people up every time..."*

Format teasers in the script as italic text on their own line at the bottom of the slide.

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
| `[amber: ...]` | Amber | `#daa040` | Trade and brand names. Also used for warnings and precautions that don't rise to the level of a named contraindication. Flexible — can serve as a second general highlight alongside blue when content warrants it. |
| `[green: ...]` | Green | `#52d693` | Indications and clinical uses. Any named condition the drug is used to treat. |
| `[coral: ...]` | Coral | `#e86363` | Contraindications. Named contraindications and situations to avoid. Not for general caution language. |
| `[lavender: ...]` | Lavender | `#7c6ddd` | Adverse effects and side effects. Named adverse outcomes the drug can cause. |

### Rules

- Apply color based on what the information is. The type of content determines the color — not what looks balanced visually.
- Green, coral, and lavender are strictly codified. Use them only for their defined category. Do not cross-apply them.
- Blue and amber are more discretionary. Both can flex when the content doesn't map cleanly to a strict category. When in doubt, default to blue.
- Only highlight what genuinely earns it. Not every sentence needs emphasis. Over-highlighting kills the effect.
- A slide with no highlights is fine. A slide where every third word is colored is not.
- Doses and routes are never tagged. The design layer renders doses in large display type automatically.
- Teasers are never highlighted.

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

## Slide Numbering Format

Output each carousel as a numbered slide sequence. Teasers appear as italic lines at the bottom of their slide.

```
[1]  <hook text>

[2]  <lead line>
     <supporting lines>
     *<teaser>*

[3]  <lead line>
     <supporting lines>
     *<teaser>*

...

[N]  <CTA line 1>
     <CTA line 2>
```

Example with emphasis tags and teaser:

```
[2]  Also called [amber: Adrenalin], or [amber: EpiPen].
     It's a [blue: sympathomimetic], [blue: catecholamine], and [blue: vasopressor]. It mimics your body's natural stress response.
     It's the first-line drug for both [green: anaphylaxis] and [green: cardiac arrest].
     *The reason it works for both comes down to how it hits the body...*
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
All 70 drugs, one app → link in bio.
```
```
Save this for your next shift.
Full doses, MOA, and contraindications for every drug → link in bio.
```
```
Save this to your study deck.
The complete drug reference is in the bio.
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

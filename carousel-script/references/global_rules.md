# Carousel Global Rules

These rules apply to every slide of every carousel.

---

## Audience

- Primary audience: paramedic students studying for the NREMT and college pharmacology courses.
- Secondary audience: working paramedics refreshing knowledge.
- Assume paramedic-level baseline knowledge. Do not define standard clinical terms (e.g., fasciculations, bronchospasm, hemodynamically, tachycardia, SVR). The audience knows these words.

---

## The Core Principle: Tell a Story

A carousel is not a flashcard set. It is a narrative — told in slides.

The viewer should feel like they're being walked through something, not flipping through a reference sheet. Every slide picks up where the last one left off. The information builds. By the end, the viewer has been led somewhere — they understand something they didn't before, or understand it better.

**The pitch tells you the angle. Your job is to build a narrative around it.**

Each carousel has a pitch — a 1-2 sentence editorial brief that defines the angle. The pitch is not a slide-by-slide blueprint. It tells you what the viewer should walk away understanding. You decide how to get there.

**Before writing, ask: what is the through-line of this carousel?** What is the one thing the viewer should walk away understanding? Every slide should serve that through-line. If a slide doesn't move the narrative forward, cut it or reframe it.

Start from the most foundational idea and move toward the most specific. Establish context before making claims. Give the reader a reason to care before giving them the detail.

Narrative doesn't require breadth. A carousel entirely about contraindications can still tell a story — why this drug creates these risks, how each contraindication connects back to the drug's mechanism, which ones are most dangerous and why. That's a story. A list of bullet points is not.

---

## Carousel Structure

Every carousel follows this general shape. The number of slides and depth of each section flexes based on the topic.

### 1. Hook (Slide 1)
Teases the angle. The reader should feel a knowledge gap or a stakes frame — something worth swiping for. Must contain the drug name. Max 15 words.

### 2. Identity / Context (usually Slide 2)
Grounds the reader. What is this drug? What class? What's it used for? Write for someone encountering this drug for the first time.

This is not brief filler — it's the anchor that makes the rest of the carousel make sense. A medic who doesn't know this drug should walk away from this slide knowing what it is and why it exists.

Depth depends on the drug:
- Common drugs (epinephrine, naloxone) → 1 slide, concise
- Uncommon drugs (pralidoxime, etomidate) → 1-2 slides, more grounding

### 3. The Dive (variable number of slides)
The core content — whatever the pitch is about. Structure it however serves the material:

- **Named items** (contraindications, indications, adverse effects) → one per slide or group related items. Use `<topicName>` for each.
- **Causal chain** (mechanism, post-administration timeline) → one step per slide, each building on the last.
- **Argument or comparison** → narrative slides building toward a conclusion.

### 4. Synthesis (1 slide, before CTA)
Connects the dive back to clinical practice. Not a recap — a closing thought that lands the through-line. "This is why it matters" or "this is what to do with this knowledge."

### 5. CTA (final slide)
Save prompt + app reference. Standard options listed below.

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

### No Throat-Clearing

The lead line must be the most direct statement possible. Open with what the drug IS, what it DOES, or what the medic needs to know — not a roundabout setup, not a contextual warm-up, not "Let's talk about..." framing.

**Wrong:** "When it comes to treating bradycardia, there's one drug that stands out."
**Right:** "Atropine is the first-line drug for symptomatic bradycardia."

**Wrong:** "This next receptor is where things get interesting."
**Right:** "β-2 activation relaxes bronchial smooth muscle — that's the airway effect."

State the thing, then explain it. Every slide. No exceptions.

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
- The carousel is a continuous narrative chain (e.g., step-by-step mechanism walkthrough)
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
- **Color the key word or phrase — not the surrounding context.** Two patterns:
  - *Named clinical entity:* color the word itself — `[coral: Bradycardia]`, `[green: Anaphylaxis]`, `[lavender: normeperidine]`. The explanatory text around it stays uncolored.
  - *Clinical action or monitoring instruction:* color the phrase the medic needs to act on — `[amber: Monitor RR and etCO₂]`, `[amber: Titrate to respiratory effort]`, `[amber: Push slowly]`. Don't color the full sentence.
- When in doubt: isolate the single biggest idea on that line and color just that.
- Every slide must have at least one color tag. If the content is straightforward and nothing screams for emphasis, tag the single most important word or phrase in amber or blue. A slide where every third word is colored is not.
- Doses and routes are never tagged. The design layer renders doses in large display type automatically.
- Teasers are never highlighted.

### Inline Italic Emphasis

Use `*text*` within a body line for secondary emphasis — points that deserve attention but don’t warrant a color tag.

```
[lavender: Bradycardia] can occur, especially with *rapid push*.
```

**Rules:**
- Maximum 1–2 inline italics per slide. No minimum.
- Italics are for the second tier — supporting details, qualifiers, consequences, or pointed bottom-line statements.
- Do not italicize the primary key word or phrase — that gets a color tag.
- Do not italicize full sentences. Keep it to a word or short phrase.
- Teasers at the bottom of slides are separate — they are always italic as a block, not inline.

**Distinguish from teasers in the script:** Inline emphasis appears `*mid-sentence*`. A teaser is `*on its own line at the bottom of the slide*` and gets the teaser class in HTML (`<em class="teaser">`).

**In HTML:** Inline italic emphasis renders as a plain `<em>` tag within the `.line` paragraph. It is not the `.teaser` class.

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
| `*text*` (end of slide) | Asterisks | Teaser line. Always the last line of the slide, on its own line. Never on CTA. Renders as `.teaser` class. |
| `*text*` (mid-sentence) | Asterisks | Inline italic emphasis. Secondary emphasis within a body line. Max 1–2 per slide, no minimum. Renders as `<em>` within `.line`. |

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
- Slide count should match what the content needs. Do not pad to hit a number.

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

### Structure

The hook has two parts:
1. **The frame** — a statement that names the drug and sets up the angle. Concrete and specific to what the carousel covers.
2. **The question** — a direct question that makes the reader test themselves. It should hint at the specific content they're about to learn (a number, a scenario, a risk).

Both parts together should stay under 25 words total. The question can serve as the teaser line or stand on its own.

### Rules

- Must contain the drug name.
- Must be specific to the drug and the carousel's angle. Generic hooks are not acceptable.
- **Use a question to create a knowledge gap.** The reader should instinctively try to answer it — and realize they're not sure. That's the swipe motivation.
- Make the question concrete. Hint at what's coming: a specific number of items, a specific scenario, a specific risk. "Do you know the four major reasons to use it?" works because it tells the reader exactly what they'll learn and challenges them to recall.
- Do not start with "Did you know," "Here's why," or "Let me explain."
- Do not oversell. "The most important drug in EMS" or "You NEED to know this" is overdone. Confidence is quiet.
- Do not use vague rhetorical questions. "How well do you really know this drug?" is too generic. "Can you name the three situations where it becomes dangerous?" is specific.

**Hook examples:**
```
[1]  [amber: Epinephrine] — one drug, more jobs than anything else on the ambulance.
     *Do you know the four major reasons to use it?*
```
```
[1]  [amber: Fentanyl] — safe when used right, dangerous when it's not.
     *Can you name the three situations where it becomes dangerous?*
```
```
[1]  [amber: Adenosine] — six seconds of nothing, then a reset.
     *Do you know what actually happens when you push it?*
```
```
[1]  [amber: Amiodarone] vs [amber: Lidocaine] — both treat V-fib.
     *Do you know when to reach for one over the other?*
```

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
All EMS drugs, one app.
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

## Worked Example: Fentanyl Contraindications

**Pitch:** "The reasons you don't give fentanyl and how to spot them."

**Planning:**
1. **Through-line:** Fentanyl has specific danger zones — a medic needs to recognize them before pushing the drug.
2. **Identity bridge:** Well-known drug, 1 slide — synthetic opioid, mu-agonist, 100x morphine potency.
3. **Arc:** Hook → identity → respiratory depression → chest wall rigidity → head injury → synthesis → CTA

```
[1]  [amber: Fentanyl] — safe when used right, dangerous when it's not.
     *Can you name the three situations where it becomes dangerous?*

[2]  <sectionLabel>Identity</sectionLabel>
     Fentanyl is a synthetic [blue: opioid analgesic] that works by activating [blue: mu-opioid receptors] in the brain and spinal cord.
     It's roughly 100 times more potent than morphine by weight — always dosed in *micrograms*, never milligrams.
     Fast onset, short duration, and no histamine release. That makes it more hemodynamically stable than morphine, which is why it's the go-to for [green: acute pain] and [green: procedural sedation] in the field.
     *But that potency comes with specific risks...*

[3]  <sectionLabel>Contraindications</sectionLabel>
     <topicName>Respiratory Depression</topicName>
     Fentanyl is a [blue: mu-agonist]. Mu receptors suppress respiratory drive. If the patient is already hypoventilating, fentanyl will push them further.
     [coral: Do not give fentanyl to a patient with respiratory depression] unless you have ventilatory support in place and are prepared to manage the airway.
     [amber: Have naloxone drawn before you push it.] The risk goes up with any concurrent CNS depressant — alcohol, benzos, other opioids.
     *Respiratory depression is the expected risk. The next one catches people off guard...*

[4]  <sectionLabel>Adverse Effects</sectionLabel>
     <topicName>Chest Wall Rigidity</topicName>
     Push fentanyl too fast IV and the chest wall can lock up. The intercostal muscles go rigid. The patient can't breathe and *you can't ventilate them* with a BVM.
     This is not a theoretical risk — it happens with rapid push or high doses.
     [amber: Treat with naloxone or neuromuscular blockade.] Prevention is simpler: push slowly over 1-2 minutes.
     *There's one more situation where fentanyl gets complicated...*

[5]  <sectionLabel>Precautions</sectionLabel>
     <topicName>Head Injury</topicName>
     Opioids can raise ICP and mask neurologic findings. In a head injury patient, fentanyl makes your neuro exam less reliable.
     This isn't an absolute contraindication — pain itself raises ICP too. But [amber: use the lowest effective dose] and reassess frequently.
     The goal is pain control without losing your ability to track mental status changes.
     *Here's the bottom line...*

[6]  <sectionLabel>Synthesis</sectionLabel>
     These aren't reasons to fear fentanyl. It's still one of the safest analgesics in the kit when used correctly.
     They're reasons to slow down and think before you push it. Know the respiratory status. Push slowly. [amber: Have naloxone ready.] And in head injuries, dose conservatively and watch the neuro exam.
     *Save this one...*

[7]  Save this for your next shift.
     Full doses, MOA, and contraindications for every drug.
     Link in bio.
```

**Why this works:**
- Hook names the drug, frames the angle, and uses a concrete question ("three situations") to create a knowledge gap. The reader tries to answer and realizes they want to check.
- Identity slide grounds the reader in 4 sentences: class, potency, why it's preferred. Someone who's never heard of fentanyl can follow the rest.
- Each dive slide is one named topic with a `<sectionLabel>` and `<topicName>`. Lead line states the point directly (no throat-clearing). Color tags match content type: coral for the contraindication, amber for clinical actions, blue for mechanism terms, green for indications.
- Teasers hand off naturally — each one points to the next specific topic, not a vague "but wait."
- Synthesis doesn't recap — it reframes. "These aren't reasons to fear fentanyl" is a closing thought, not a bullet list.
- 7 slides total. No padding.

---

## Worked Example: Epinephrine Versatility

**Pitch:** "Epinephrine does everything — and that's what makes it confusing. One drug, different doses, different concentrations, different routes."

**Planning:**
1. **Through-line:** Epi shows up in completely different scenarios looking like a completely different drug each time. Understanding the three receptors explains why.
2. **Identity bridge:** 1 slide — the three-receptor profile IS the identity. That's what makes it versatile.
3. **Arc:** Hook → receptors → cardiac arrest → anaphylaxis → push dose → croup/bronchospasm → synthesis → CTA

```
[1]  [amber: Epinephrine] — one drug, more jobs than anything else on the ambulance.
     *Do you know the four major reasons to use it?*

[2]  <sectionLabel>Identity</sectionLabel>
     Epinephrine is a [blue: sympathomimetic] and [blue: catecholamine] — it mimics your body's own adrenaline response.
     What makes it so versatile is that it hits three receptors at once. [blue: Alpha-1] causes vasoconstriction. [blue: Beta-1] increases HR and contractility. [blue: Beta-2] relaxes the airways.
     Most drugs do one thing. Epi does three. That's why it shows up in [green: cardiac arrest], [green: anaphylaxis], [green: shock], and [green: croup] — and looks like a different drug each time.
     *Start with the one where the dose is highest and the stakes are biggest...*

[3]  <sectionLabel>Indications</sectionLabel>
     <topicName>Cardiac Arrest</topicName>
     1 mg IV/IO every 3-5 min. Concentration: 1:10,000.
     In arrest, you're pushing epi for [blue: alpha-1] vasoconstriction. It tightens the peripheral vasculature, which raises coronary perfusion pressure between compressions. That's what gives defibrillation a better chance of working.
     Push fast and flush with 20 mL NS to move it centrally.
     *Anaphylaxis uses the same drug — but almost nothing else is the same...*

[4]  <sectionLabel>Indications</sectionLabel>
     <topicName>Anaphylaxis</topicName>
     0.3 mg IM in the anterolateral thigh. Concentration: 1:1,000.
     Here all three receptors matter. Alpha-1 reverses the vasodilation crashing the BP. Beta-1 supports the heart. Beta-2 opens the airways.
     [amber: IM, not IV.] IV push epinephrine in a patient with a pulse risks *fatal arrhythmia*. The IM route gives a controlled absorption that the situation needs.
     *But what about the patient who's hypotensive and still has a pulse?*

[5]  <sectionLabel>Indications</sectionLabel>
     <topicName>Push Dose Epi</topicName>
     10-20 mcg IV every 2-5 min. You're mixing this yourself — dilute 1:10,000 down to 10 mcg/mL.
     This is for the patient who is [green: hemodynamically unstable] but not in arrest. Too sick for a drip setup, not dead enough for 1 mg.
     Small, controlled boluses of alpha-1 and beta-1 to bridge until you get a presssor hanging or the patient declares one direction or the other.
     *There's one more use where epi doesn't even go into a vein...*

[6]  <sectionLabel>Indications</sectionLabel>
     <topicName>Croup & Bronchospasm</topicName>
     5 mg nebulized. Still 1:1,000 concentration, but now it's inhaled.
     This is pure [blue: beta-2] territory. The drug lands directly on the airway smooth muscle and relaxes it. Stridor improves within minutes.
     Different route, different dose, different clinical target — same drug.
     *Here's how to keep all of this straight...*

[7]  <sectionLabel>Synthesis</sectionLabel>
     The reason epi is confusing is that the indication changes everything about how you give it. The concentration, the route, the dose, and even which receptor you're targeting all shift.
     The shortcut: [amber: Arrest = 1 mg IV push]. [amber: Anaphylaxis = 0.3 mg IM]. [amber: Push dose = 10-20 mcg IV]. [amber: Croup = 5 mg neb]. Match the scenario to the route and the rest follows.
     *Save this one...*

[8]  Save this for your next exam.
     All 70 drugs, one app.
     Link in bio.
```

**Why this works:**
- Hook names the drug, frames the angle (versatility), and uses a numbered question ("four major reasons") that makes the reader count in their head. Concrete tease of what's coming.
- Identity slide explains WHY epi is versatile (three receptors) instead of just listing uses. The receptor profile is the identity.
- Each indication slide names one scenario with `<topicName>`, leads with the dose/route/concentration, then explains which receptor is doing the work. The reader connects the receptor to the clinical goal.
- Push dose epi gets its own slide — it's a distinct use case students often don't learn until clinical rotations.
- Teasers create natural bridges: "Anaphylaxis uses the same drug — but almost nothing else is the same" is a specific handoff, not a generic "but wait."
- Synthesis gives a cheat sheet: scenario = route. One line per indication. Scannable and memorable.
- 8 slides. Each one earns its place — four distinct indications, each with different dosing, justify the length.

---

## Worked Example: Midazolam for Seizures

**Pitch:** "Midazolam for seizures — how it stops a seizure, the dosing by route, and what to watch for after."

**Planning:**
1. **Through-line:** Midazolam stops seizures by quieting neurons via GABA. Get it on board fast, then watch the airway.
2. **Identity bridge:** 1 slide — benzo, GABA enhancer, multiple uses but seizures are the focus.
3. **Arc:** Hook → identity → why timing matters → IM dosing → IN and IV → post-seizure risks → synthesis → CTA

```
[1]  [amber: Midazolam] for seizures — the go-to benzo in the field.
     *Do you know how it stops a seizure and what to watch for after?*

[2]  <sectionLabel>Identity</sectionLabel>
     Midazolam is a [blue: benzodiazepine] — also called [amber: Versed].
     It works by enhancing [blue: GABA] at the [blue: GABA-A receptor]. More chloride flows into the neuron, the neuron quiets down, and the uncontrolled firing that drives a seizure stops.
     Used for [green: seizures], [green: agitation], and [green: procedural sedation] — but seizure management is where it earns its reputation in the field.
     *Here's why speed matters...*

[3]  <sectionLabel>Clinical Context</sectionLabel>
     <topicName>Why Timing Matters</topicName>
     A seizure that runs beyond 5 minutes is [green: status epilepticus]. The longer it continues, the harder it becomes to stop — and the more neuronal damage accumulates.
     The goal is to get midazolam on board fast. Not after you establish access. Not after a full assessment. The drug goes in as soon as you confirm the patient is seizing.
     *The dosing is weight-based and route-dependent...*

[4]  <sectionLabel>Dosing</sectionLabel>
     <topicName>IM</topicName>
     0.2 mg/kg IM, max 10 mg. Onset 5-10 min.
     Draw it up, anterolateral thigh, done. No IV needed, no delay. This is the fastest way to get the drug working when you arrive on scene.
     *There are two other routes worth knowing...*

[5]  <sectionLabel>Dosing</sectionLabel>
     <topicName>IN and IV</topicName>
     IN is 0.2 mg/kg, max 10 mg, onset 3-5 min. [amber: Split the dose between both nares] — full volume in one nostril causes runoff and cuts absorption. Use the 5 mg/mL concentration.
     IV is 0.1 mg/kg, max 4 mg, onset 1-3 min. Fastest onset, but requires access you may not have on a seizing patient.
     *Once the seizure breaks, your job changes...*

[6]  <sectionLabel>Precautions</sectionLabel>
     <topicName>After the Seizure Stops</topicName>
     A postictal patient already has depressed respiratory drive. Now you've added a [blue: GABA enhancer] on top of that.
     [lavender: Respiratory depression and apnea] are the primary risks. Alcohol or opioids on board make it worse.
     [amber: Monitor RR and SpO₂ continuously.] Have BVM and suction ready. In elderly patients, *cut the dose in half* — they're significantly more sensitive.
     *Here's the bottom line...*

[7]  <sectionLabel>Synthesis</sectionLabel>
     Midazolam stops seizures by calming the neurons that are firing out of control. Get it on board fast — IM if you don't have access, IN or IV if you do.
     Once the seizure breaks, shift your focus to the airway. The benzo is still working even after the seizure isn't.
     *Save this one...*

[8]  Save this for your next shift.
     Full doses, MOA, and contraindications for every drug.
     Link in bio.
```

**Why this works:**
- Straight-up single-indication deep dive. No comparisons to other benzos, no route selection debates. Just: here's the drug, here's how it works for seizures, here's the dosing, here's what to watch for.
- Identity slide mentions other uses but immediately narrows focus to seizures. The reader knows the scope.
- "Why Timing Matters" slide earns its place — it's not padding, it's the clinical reasoning that explains why the dosing routes are presented in priority order.
- IM gets its own slide because it's the field default. IN and IV share a slide because they're secondary options.
- Post-seizure precautions slide is the clinical pearl — the thing students don't think about until it happens. Postictal + benzo = airway risk.
- 8 slides. Each one teaches one thing. No overlap.

---

## Clinical Accuracy

- All drug information must come from the provided drug data or from NASEMSO, AHA ACLS/PALS, StatPearls, or DailyMed.
- Do not invent clinical pearls. If it's not grounded in established prehospital pharmacology, leave it out.
- Do not include hospital-level concerns, dosing, or monitoring outside paramedic scope.
- When referencing a dose: always include amount, route, and repeat interval if applicable. Include concentration if clinically significant for that drug.

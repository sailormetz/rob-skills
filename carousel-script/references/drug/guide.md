# Drug Carousel Guide

Everything needed to write a drug carousel: how it sounds, how it's formatted, and worked examples. Load this file in full before writing any slides.

---

## Voice

Write like a sharp colleague explaining — not a textbook, lecture, or bullet list. Complete sentences that sound natural spoken aloud. If it reads like a PowerPoint slide, rewrite it.

- Direct and confident. No hedging ("you might want to consider"). State the information.
- Don't talk down ("did you know?", "fun fact!"). Don't over-explain.
- Don't repeat pharmacokinetic details already established on an earlier slide unless clinically actionable here.
- One emoji max per carousel (hook or CTA only).
- **Em dashes:** sparingly, for emphasis only. Not for chaining clauses. If a period or comma works, use that.

---

## Inline Emphasis and Color Coding

The design layer applies color to specific words and phrases. Signal highlights using bracket tags.

**Tagging format:** `[color: word or phrase]`

| Tag | Hex | What to tag |
|-----|-----|-------------|
| `[blue: ...]` | `#5e9be8` | **How the drug works.** Mechanism phrases, receptor names, drug classes, physiological concepts. Default when no stricter category applies. |
| `[amber: ...]` | `#daa040` | **What the medic needs to recognize or do.** Trade/brand names and clinical directives. |
| `[green: ...]` | `#52d693` | **What the drug treats.** Named indications and clinical uses only. |
| `[coral: ...]` | `#e86363` | **When not to give it.** Named contraindications — specific conditions or situations. |
| `[lavender: ...]` | `#7c6ddd` | **What the drug can cause.** Clinically significant adverse effects worth remembering. |

**Examples:**
```
Adenosine works by [blue: slowing conduction through the AV node].
Also known as [amber: Lopressor]. [amber: Hold if HR is below 60.]
The go-to for [green: symptomatic bradycardia] in the field.
[coral: Hypersensitivity to sulfas] is an absolute contraindication.
Watch for [lavender: bronchospasm] in patients with reactive airway disease.
```

**Rules:**
- Tag the complete meaningful unit, not individual words in isolation.
- Every slide needs ≥1 color tag.
- Don't over-highlight — if every third word is colored, it loses effect.
- Doses and routes are never tagged (design layer handles them).
- Teasers are never tagged.

### Inline Italics

`*text*` mid-sentence = secondary emphasis (qualifiers, consequences, pointed statements). Max 1-2 per slide. Don't italicize the primary key phrase (that gets color) or full sentences.

```
[lavender: Bradycardia] can occur, especially with *rapid push*.
```

---

## Planning

Before writing any slides, answer these three questions:

1. **What's the through-line?** One sentence: what does the viewer understand at the end that they didn't at the start?
2. **What's the context bridge?** What minimum drug context does the reader need before the dive? (Usually 1 slide: name, class, what it's for. More for obscure drugs.)
3. **What's the arc?** Map the progression from hook → identity → dive → synthesis → CTA. Each slide earns its place.

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

---

## CTA Format

Two lines, plain text, no color tags. Engagement question first, resource hint second.

**Line 1 — Engagement (rotate one per carousel):**
```
Which drug should I break down next? Drop it in the comments.
What's the drug that trips you up the most? Tell me in the comments.
Did I miss anything? Call it out in the comments.
```

**Line 2 — Resource hint (always the same):**
```
I've broken down every drug in EMS just like this. Link in bio.
```

No "save this," no app name, no sales language.

---

## Worked Example: Fentanyl Contraindications

**Pitch:** "The reasons you don't give fentanyl and how to spot them."

**Planning:**
1. **Through-line:** Fentanyl has specific danger zones — a medic needs to recognize them before pushing the drug.
2. **Context bridge:** Well-known drug, 1 slide — synthetic opioid, mu-agonist, 100x morphine potency.
3. **Arc:** Hook → identity → respiratory depression → chest wall rigidity → head injury → synthesis → CTA

```
[1]  [amber: Fentanyl] - safe when used right, dangerous when it's not.
     *Can you name the three situations where it becomes dangerous?*

[2]  <sectionLabel>Identity</sectionLabel>
     Fentanyl is a synthetic [blue: opioid analgesic] that works by [blue: activating mu-opioid receptors in the brain and spinal cord].
     It's roughly 100 times more potent than morphine by weight - always dosed in *micrograms*, never milligrams.
     Fast onset, short duration, and [blue: no histamine release]. That makes it more hemodynamically stable than morphine, which is why it's the go-to for [green: acute pain] and [green: procedural sedation] in the field.
     *But that potency comes with specific risks...*

[3]  <sectionLabel>Contraindications</sectionLabel>
     <topicName>Respiratory Depression</topicName>
     Fentanyl is a [blue: mu-agonist] - [blue: mu receptors suppress respiratory drive]. If the patient is already hypoventilating, fentanyl will push them further.
     Do not give fentanyl to a patient with [coral: respiratory depression] unless you have ventilatory support in place and are prepared to manage the airway.
     [amber: Have naloxone drawn before you push it.] The risk goes up with any concurrent [coral: CNS depressant] - alcohol, benzos, other opioids.
     *Respiratory depression is the expected risk. The next one catches people off guard...*

[4]  <sectionLabel>Adverse Effects</sectionLabel>
     <topicName>Chest Wall Rigidity</topicName>
     Push fentanyl too fast IV and [lavender: chest wall rigidity] sets in. The intercostal muscles go rigid. The patient can't breathe and *you can't ventilate them* with a BVM.
     This is not a theoretical risk - it happens with rapid push or high doses.
     [amber: Treat with naloxone or neuromuscular blockade.] Prevention is simpler: [amber: push slowly over 1-2 minutes].
     *There's one more situation where fentanyl gets complicated...*

[5]  <sectionLabel>Precautions</sectionLabel>
     <topicName>Head Injury</topicName>
     Opioids can [blue: raise ICP and mask neurologic findings]. In a [coral: head injury] patient, fentanyl makes your neuro exam less reliable.
     This isn't an absolute contraindication - pain itself raises ICP too. But [amber: use the lowest effective dose] and reassess frequently.
     The goal is pain control without losing your ability to [amber: track mental status changes].
     *Here's the bottom line...*

[6]  <sectionLabel>Synthesis</sectionLabel>
     These aren't reasons to fear fentanyl. It's still one of the safest analgesics in the kit when used correctly.
     They're reasons to slow down and think before you push it. Know the respiratory status. Push slowly. [amber: Have naloxone ready.] And in head injuries, dose conservatively and watch the neuro exam.
     *Save this one...*

[7]  Which drug should I break down next? Drop it in the comments.
     I've broken down every drug in EMS just like this. Link in bio.
```

**Why this works:**
- Hook names the drug, frames the angle, and uses a concrete question ("three situations") to create a knowledge gap.
- Identity slide grounds the reader in 4 sentences: class, potency, why it's preferred.
- Each dive slide is one named topic with `<sectionLabel>` and `<topicName>`. Lead line states the point directly. Color tags match content type.
- Teasers hand off to the next specific topic, not a vague "but wait."
- Synthesis reframes rather than recaps: "These aren't reasons to fear fentanyl" is a closing thought, not a bullet list.
- 7 slides, no padding.

---

## Worked Example: Epinephrine Versatility

**Pitch:** "Epinephrine does everything - and that's what makes it confusing. One drug, different doses, different concentrations, different routes."

**Planning:**
1. **Through-line:** Epi shows up in completely different scenarios looking like a completely different drug each time. Understanding the three receptors explains why.
2. **Context bridge:** 1 slide — the three-receptor profile IS the identity.
3. **Arc:** Hook → receptors → cardiac arrest → anaphylaxis → push dose → croup/bronchospasm → synthesis → CTA

```
[1]  [amber: Epinephrine] - one drug, more jobs than anything else on the ambulance.
     *Do you know the four major reasons to use it?*

[2]  <sectionLabel>Identity</sectionLabel>
     Epinephrine is a [blue: sympathomimetic] and [blue: catecholamine] — your body's own adrenaline response, in a vial.
     It hits three receptors at once. [blue: Alpha-1] vasoconstricts. [blue: Beta-1] increases HR and contractility. [blue: Beta-2] relaxes the airways.
     That's why it shows up in [green: cardiac arrest], [green: anaphylaxis], [green: shock], and [green: croup] — and looks like a different drug each time.
     *Start with the one where the stakes are biggest...*

[3]  <sectionLabel>Indications</sectionLabel>
     <topicName>Cardiac Arrest</topicName>
     1 mg IV/IO every 3-5 min. Concentration: 1:10,000.
     You're pushing for [blue: alpha-1 vasoconstriction] — tightening peripheral vasculature to raise [blue: coronary perfusion pressure] between compressions. That's what gives defibrillation a better shot.
     [amber: Push fast], flush with 20 mL NS.
     *Anaphylaxis uses the same drug — but almost nothing else is the same...*

[4]  <sectionLabel>Indications</sectionLabel>
     <topicName>Anaphylaxis</topicName>
     0.3 mg IM in the anterolateral thigh. Concentration: 1:1,000.
     All three receptors matter here. [blue: Alpha-1] reverses vasodilation. [blue: Beta-1] supports the heart. [blue: Beta-2] opens the airways.
     [amber: IM, not IV.] IV push in a patient with a pulse risks *fatal arrhythmia*.
     *But what about the patient who's hypotensive and still has a pulse?*

[5]  <sectionLabel>Indications</sectionLabel>
     <topicName>Push Dose Epi</topicName>
     10-20 mcg IV every 2-5 min. Dilute 1:10,000 down to 10 mcg/mL.
     For the patient who is [blue: hemodynamically unstable] but not in arrest. Too sick for a drip setup, not dead enough for 1 mg.
     Small boluses of [blue: alpha-1] and [blue: beta-1] to bridge until you get a pressor hanging.
     *There's one more use where epi doesn't even go into a vein...*

[6]  <sectionLabel>Indications</sectionLabel>
     <topicName>Croup & Bronchospasm</topicName>
     5 mg nebulized. Still 1:1,000 concentration, but now it's inhaled.
     This is pure [blue: beta-2] territory. The drug lands directly on [blue: airway smooth muscle] and relaxes it. Stridor improves within minutes.
     Different route, different dose, different clinical target - same drug.
     *Here's how to keep all of this straight...*

[7]  <sectionLabel>Synthesis</sectionLabel>
     The indication changes everything — concentration, route, dose, and which receptor you're targeting all shift.
     The shortcut: [amber: Arrest = 1 mg IV push]. [amber: Anaphylaxis = 0.3 mg IM]. [amber: Push dose = 10-20 mcg IV]. [amber: Croup = 5 mg neb]. Match the scenario to the route and the rest follows.
     *Save this one...*

[8]  What's the drug that trips you up the most? Tell me in the comments.
     I've broken down every drug in EMS just like this. Link in bio.
```

**Why this works:**
- Identity slide explains WHY epi is versatile (three receptors) instead of just listing uses. The receptor profile is the identity.
- Each indication slide names one scenario, leads with dose/route/concentration, then explains which receptor is doing the work.
- Push dose epi gets its own slide — it's a distinct use case students often miss.
- Teasers create specific bridges, not generic handoffs.
- Synthesis gives a cheat sheet: scenario = route. One line per indication. Scannable.
- 8 slides. Four distinct indications with different dosing justify the length.

---

## Worked Example: Midazolam for Seizures

**Pitch:** "Midazolam for seizures - how it stops a seizure, the dosing by route, and what to watch for after."

**Planning:**
1. **Through-line:** Midazolam stops seizures by quieting neurons via GABA. Get it on board fast, then watch the airway.
2. **Context bridge:** 1 slide — benzo, GABA enhancer, multiple uses but seizures are the focus.
3. **Arc:** Hook → identity → why timing matters → IM dosing → IN and IV → post-seizure risks → synthesis → CTA

```
[1]  [amber: Midazolam] for seizures - the go-to benzo in the field.
     *Do you know how it stops a seizure and what to watch for after?*

[2]  <sectionLabel>Identity</sectionLabel>
     Midazolam is a [blue: benzodiazepine] — also called [amber: Versed].
     It enhances [blue: GABA] at the [blue: GABA-A receptor]. More chloride into the neuron, the neuron quiets down, and the uncontrolled firing that drives a seizure stops.
     Used for [green: seizures], [green: agitation], and [green: procedural sedation] — but seizures are where it earns its reputation in the field.
     *Here's why speed matters...*

[3]  <sectionLabel>Clinical Context</sectionLabel>
     <topicName>Why Timing Matters</topicName>
     A seizure beyond 5 minutes is [green: status epilepticus]. The longer it runs, the harder it is to stop — and the more [lavender: neuronal damage] accumulates.
     [amber: Get midazolam on board fast.] Not after access. Not after a full assessment. As soon as you confirm the patient is seizing.
     *The dosing is weight-based and route-dependent...*

[4]  <sectionLabel>Dosing</sectionLabel>
     <topicName>IM</topicName>
     0.2 mg/kg IM, max 10 mg. Onset 5-10 min.
     [amber: Anterolateral thigh], done. No IV needed, no delay — fastest way to get the drug working on arrival.
     *There are two other routes worth knowing...*

[5]  <sectionLabel>Dosing</sectionLabel>
     <topicName>IN and IV</topicName>
     IN: 0.2 mg/kg, max 10 mg, onset 3-5 min. [amber: Split between both nares] — full volume in one nostril causes runoff. Use the [amber: 5 mg/mL] concentration.
     IV: 0.1 mg/kg, max 4 mg, onset 1-3 min. [blue: Fastest onset], but requires access you may not have on a seizing patient.
     *Once the seizure breaks, your job changes...*

[6]  <sectionLabel>Precautions</sectionLabel>
     <topicName>After the Seizure Stops</topicName>
     A postictal patient already has a depressed respiratory drive. [amber: Versed] on board could make this worse.
     [lavender: Respiratory depression and apnea] are the primary risks. Alcohol or opioids on board make it worse.
     [amber: Monitor RR and SpO2 continuously.] Have BVM and suction ready. Elderly patients — *cut the dose in half*.
     *Here's the bottom line...*

[7]  <sectionLabel>Synthesis</sectionLabel>
     Midazolam stops seizures by quieting neurons firing out of control. [amber: Get it on board fast] — IM if you don't have access, IN or IV if you do.
     Once the seizure breaks, [amber: shift to the airway]. The benzo is still working even after the seizure isn't.
     *Save this one...*

[8]  Did I miss anything? Call it out in the comments.
     I've broken down every drug in EMS just like this. Link in bio.
```

**Why this works:**
- "Why Timing Matters" slide earns its place — it's the clinical reasoning that explains why dosing routes are presented in priority order.
- IM gets its own slide because it's the field default. IN and IV share a slide as secondary options.
- Post-seizure precautions slide is the clinical pearl — postictal + benzo = airway risk.
- 8 slides. Each teaches one thing. No overlap.

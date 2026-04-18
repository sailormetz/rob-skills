# Template 4: After You Push It

## Objective

A single-drug post-administration awareness deep dive. Covers what to expect, what can go wrong, and what to actively monitor after giving the drug. This includes adverse effects, drug interactions, special population concerns, and practical monitoring actions. The goal is to prepare the student for the window between "I gave the drug" and "the drug is doing what I wanted" — and to recognize when it's doing something you didn't want.

This template is distinct from Template 2 (When NOT to Give). Template 2 covers reasons to withhold a drug *before* administration — contraindications. This template assumes the drug has already been given. The question is no longer "should I give it?" but "what am I watching for now that I have?"

## Eligible Drugs

All drugs in the dataset.

## Slide Structure

| Slide | Role | Content Rules |
|-------|------|---------------|
| 1 | Hook | Drug name + post-administration framing. Max 15 words. See global_rules for hook and teaser guidance. |
| 2 | Context | What the drug is and what you gave it for. One or two lines. Anchors everything that follows to the intended use. Use `[blue: ...]` for class terms and `[green: ...]` for the indication you gave it for. |
| 3–6 | Post-administration concerns | Each slide covers one thing that can happen after giving the drug. Use `<sectionLabel>After Administration</sectionLabel>` and `<topicName>` naming the concern. Start with a lead line that names or frames the concern. Follow with why it happens and what to do about it. Use `[lavender: ...]` for adverse effects, `[amber: ...]` for warnings. **If the drug has 3+ concerns:** One per slide. **If the drug has 1–2 concerns:** Go deeper across multiple slides without `<topicName>` — just `<sectionLabel>After Administration</sectionLabel>` and narrative flow. |
| 7 | Recap | Labeled summary of concerns covered. Use `<sectionLabel>Recap</sectionLabel>`. One `[lavender: ...]` or `[amber: ...]` line per concern — label and key action. |
| 7 | Bottom line | Quick-reference version: what to monitor, how often, and what crosses the line from expected to dangerous. 1–3 lines. Practical enough to use on scene. |
| Last | CTA | Save + app reference. Use one of the standard CTA options from global_rules. |

**Total slides:** 5–8

## Hook Formulas

- `You gave [Drug]. Here's what to watch.`
- `[Drug] — what to expect after administration.`
- `The job isn't done when you push [Drug].`
- `Pushed [Drug]? Here's what comes next.`

## What Counts as a Post-Administration Concern

A post-administration concern is anything the medic needs to be aware of, watch for, or act on after the drug has been given. This includes:

- **Adverse effects** — unintended pharmacological effects. Include a brief mechanistic rationale for why it happens. Use `[lavender: ...]` for named adverse effects.
- **Drug interactions** — specific drugs or drug classes that change the risk profile. Name the interacting drug or class. "Watch for interactions" is not acceptable. "PDE inhibitors within 24–48 hrs cause profound hypotension with nitro" is acceptable. Use `[amber: ...]` for interacting drug names.
- **Special populations** — patient groups where the drug behaves differently or carries extra risk post-administration (elderly, renal impairment, pediatric, pregnancy).
- **Expected but alarming effects** — things that look like complications but are actually the drug working (adenosine causing brief asystole, ketamine causing emergence reactions). The student needs to know these are expected so they don't panic or intervene unnecessarily.
- **Monitoring actions** — specific vitals, signs, or timelines to watch. Must be concrete: what to check, how often, and what threshold triggers action.

## Rules

- Every concern slide must include both the *what* and the *so what*. State what happens and what the medic does about it. "Hypotension" alone is incomplete. "Hypotension — check BP after each dose, hold if systolic drops below 90" is complete.
- Order concerns from most clinically dangerous to least.
- If a concern is the primary reason one drug gets chosen over another in the same class, say so explicitly.
- Do not repeat contraindications from Template 2. If a point is a reason to withhold the drug entirely, it belongs in Template 2. If it's something to manage or monitor after the drug is already on board, it belongs here.
- The bottom line slide must be practical enough to use on scene. Facts and thresholds, not summary prose.

## Example: Morphine

```
[1]  You gave morphine. Here's what to watch.
     *It doesn't just hit pain receptors...*

[2]  You gave it for [green: pain management] — and it will work.
     But morphine is a [blue: mu-opioid agonist] with downstream effects beyond analgesia.
     *The big ones are cardiovascular and respiratory...*

[3]  <sectionLabel>After Administration</sectionLabel>
     <topicName>Hypotension</topicName>
     The most common adverse effect to manage.
     Morphine causes histamine release, which vasodilates — BP can drop, especially if the patient is volume-depleted.
     Check BP after each dose. This is the primary reason fentanyl gets picked instead in many protocols.
     *Next up — the one that can sneak up on you...*

[4]  <sectionLabel>After Administration</sectionLabel>
     <topicName>Respiratory Depression</topicName>
     The risk you can't ignore.
     Morphine suppresses the brainstem's respiratory drive, and it builds gradually — slower onset than fentanyl means it can creep up on you.
     Monitor RR and etCO₂ continuously. Have naloxone drawn and ready.
     *One more...*

[5]  <sectionLabel>After Administration</sectionLabel>
     <topicName>Nausea & Vomiting</topicName>
     Common and predictable — opioids stimulate the chemoreceptor trigger zone.
     Some protocols pair morphine with an antiemetic upfront. Position the patient to protect the airway if vomiting occurs.
     *Let's recap...*

[6]  <sectionLabel>Recap</sectionLabel>
     [lavender: Hypotension] — check BP after each dose; primary reason fentanyl gets chosen instead
     [lavender: Respiratory Depression] — monitor RR and etCO₂ continuously; naloxone drawn and ready
     [lavender: Nausea & Vomiting] — position airway; consider antiemetic
     *Bottom line...*

[7]  BP after every dose. RR and SpO₂ continuously.
     If RR drops below 12 or SpO₂ trends down despite O₂, you're watching respiratory depression develop.
     Naloxone drawn and ready. That's the bottom line.
     *Save this one...*

[8]  Save this for your next shift.
     Full doses, MOA, and contraindications for every drug.
     Link in bio.
```

## Example: Nitroglycerin

```
[1]  You gave nitro. Here's what comes next.
     *One thing matters more than anything else...*

[2]  You gave it for [green: chest pain] or [green: acute CHF] — it works by vasodilation.
     Fast onset, fast drop in preload. That's the mechanism and the risk.
     *Most of what you're watching for traces back to that drop in preload...*

[3]  <sectionLabel>After Administration</sectionLabel>
     <topicName>Hypotension</topicName>
     BP can fall quickly, especially after repeat doses or in a volume-depleted patient.
     Check BP before every dose. Hold if systolic drops below 90.
     *There's one specific patient population where this gets much worse...*

[4]  <sectionLabel>After Administration</sectionLabel>
     <topicName>Right-Sided MI</topicName>
     The right ventricle is preload-dependent — take away preload with nitro and BP can crash.
     If you haven't confirmed it's not a right-sided infarction, check leads before giving.
     If it's already on board and BP is dropping, treat aggressively.
     *And one drug interaction that can be life-threatening...*

[5]  <sectionLabel>After Administration</sectionLabel>
     <topicName>PDE Inhibitors</topicName>
     [amber: Sildenafil], [amber: tadalafil], or similar drugs in the last 24–48 hours — combined with nitro, the result is profound, potentially life-threatening hypotension.
     Ask before the first dose. If you find out after, prepare for aggressive fluid resuscitation.
     *Let's recap...*

[6]  <sectionLabel>Recap</sectionLabel>
     [lavender: Hypotension] — check BP before every dose; hold if systolic below 90
     [amber: Right-Sided MI] — preload-dependent RV; confirm before giving
     [amber: PDE Inhibitors] — sildenafil/tadalafil within 24–48 hrs; profound hypotension risk
     *Bottom line...*

[7]  BP before every dose. Ask about PDE inhibitors before the first.
     [lavender: Headache] is expected — it's the vasodilation — warn the patient so they don't think it's worsening.
     Everything else traces back to hypotension.
     *Save this one...*

[8]  Save this for your next chest pain call.
     All 70 drugs, one app.
     Link in bio.
```

## Example: Ondansetron (short carousel — limited concerns)

```
[1]  You gave ondansetron. One thing matters most.

[2]  It's a [blue: 5-HT3 antagonist] — blocks serotonin at the chemoreceptor trigger zone.
     Generally well-tolerated, but there's one risk that scales with dose.

[3]  [lavender: QT prolongation] is dose-dependent.
     Higher doses and repeat dosing extend the QT interval.
     Use caution if the patient is on other QT-prolonging drugs. Contraindicated in congenital long QT.
     Monitor rhythm if giving repeat doses or if the patient has known QT risk factors.
     *So what does that mean practically...*

[4]  BP and rhythm. That's the monitor.
     Single dose in a healthy patient — low risk. Repeat dosing in a cardiac patient — think before you give it again.
     *Save this one...*

[5]  Save this for your next clinical rotation.
     The complete drug reference is in the bio.
     Link in bio.
```

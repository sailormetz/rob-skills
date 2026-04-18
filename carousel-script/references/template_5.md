# Template 5: Why You Give It

## Objective

A single-drug indications and dosing deep dive. The opposite of Template 2 — instead of reasons to hold the drug, this covers every reason you reach for it. Each indication gets the pharmacological rationale (why this drug for this problem) and the key dosing information. The goal is to connect the drug's mechanism to the patient's pathophysiology for each use case, with enough dosing detail that the student can act on it.

## Eligible Drugs

All drugs in the dataset.

## Slide Structure

| Slide | Role | Content Rules |
|-------|------|---------------|
| 1 | Hook | Drug name + indications framing. Max 15 words. See global_rules for hook and teaser guidance. |
| 2 | Context | What the drug is, its class, and a one-line summary. Ground the student before diving into specific indications. Use `[blue: ...]` for class terms. |
| 3–7 | Indications | **If the drug has 3+ indications:** One per slide. Use `<sectionLabel>Indications</sectionLabel>` and `<topicName>` naming the indication. Start with a lead line naming the indication and why this drug. Follow with dose, route, and any critical administration detail. Use `[green: ...]` for indication names. **If the drug has 1–2 indications:** Go deeper across 2–3 slides per indication without `<topicName>` — just `<sectionLabel>Indications</sectionLabel>` and narrative flow. |
| 8 | Recap | Labeled summary of all indications covered. Use `<sectionLabel>Recap</sectionLabel>`. One `[green: ...]` line per indication — label and key dose. |
| Last | CTA | Save + app reference. Use one of the standard CTA options from global_rules. |

**Total slides:** 5–9

## Hook Formulas

- `[Drug] — every reason you reach for it.`
- `[Drug]: [X] indications, [X] doses. Know them all.`
- `When do you give [Drug]? More often than you think.`
- `[Drug] — what it treats and how to dose it.`

## Rules

- Every indication slide must include a pharmacological rationale — not just "epinephrine for anaphylaxis" but "epinephrine for anaphylaxis because α-1 vasoconstriction restores BP and β-2 bronchodilation opens the airway."
- Every indication slide must include dosing. At minimum: amount, route. Include concentration/formulation when clinically significant. Include repeat interval when applicable.
- If a drug has more than 4 indications, pick the 3–4 most commonly tested or most clinically significant.
- If adult and pediatric dosing differ meaningfully, include both. If pedi dosing is simply weight-based with no other differences, one line is enough.
- Order indications from most common or most critical to least.
- Do not repeat the drug's full mechanism on every slide. State the shared mechanism once in the context slide, then each indication slide only explains how that mechanism applies to this specific condition.
- If two indications use the same dose, combine them on one slide. Do not pad with redundant slides.

## Example: Epinephrine

```
[1]  Epinephrine — every reason you reach for it.
     *Four indications. One drug. Here's all of them...*

[2]  It's a [blue: sympathomimetic] and [blue: catecholamine] — hits [blue: α-1], [blue: β-1], and [blue: β-2] simultaneously.
     Vasoconstriction, cardiac stimulation, bronchodilation: all three at once.
     Which receptor matters most depends on why you're giving it.
     *Start with the most critical use...*

[3]  <sectionLabel>Indications</sectionLabel>
     <topicName>Cardiac Arrest</topicName>
     [blue: β-1] stimulation raises coronary perfusion pressure between compressions — improving the odds of successful defibrillation.
     1 mg IV/IO (1:10,000) every 3–5 min. Push fast and flush with 20 mL NS.
     *The anaphylaxis dose is completely different...*

[4]  <sectionLabel>Indications</sectionLabel>
     <topicName>Anaphylaxis</topicName>
     [blue: α-1] restores BP. [blue: β-2] opens the airway. Both are in crisis during anaphylaxis.
     0.3–0.5 mg IM (1:1,000) into the anterolateral thigh. Repeat every 5–15 min if no improvement.
     IM is the correct route in a patient with a pulse — IV push carries a high risk of fatal arrhythmia.
     *Two more uses — these come up less often but still get tested...*

[5]  <sectionLabel>Indications</sectionLabel>
     <topicName>Vasopressor Infusion</topicName>
     For refractory shock, [blue: α-1] vasoconstriction maintains MAP when other pressors have failed.
     0.05–0.3 mcg/kg/min IV, titrated to MAP ≥65 mmHg.
     *Last one...*

[6]  <sectionLabel>Indications</sectionLabel>
     <topicName>Croup / Bronchospasm</topicName>
     The [blue: α-agonist] effect reduces subglottic edema when given nebulized.
     5 mg nebulized (5 mL of 1:1,000). May repeat in 20 min if needed.
     *Let's recap...*

[7]  <sectionLabel>Recap</sectionLabel>
     [green: Cardiac Arrest] — 1 mg IV/IO (1:10,000) every 3–5 min
     [green: Anaphylaxis] — 0.3–0.5 mg IM (1:1,000) into the anterolateral thigh
     [green: Vasopressor Infusion] — 0.05–0.3 mcg/kg/min IV, titrate to MAP ≥65
     [green: Croup / Bronchospasm] — 5 mg nebulized (1:1,000), repeat in 20 min if needed
     *One more slide...*

[8]  Save this for your next exam.
     All 70 drugs, one app.
     Link in bio.
```

## Example: Ondansetron (short carousel — limited indications)

```
[1]  Ondansetron — simple drug. Know the dose.

[2]  It's a [blue: 5-HT3 antagonist] — blocks serotonin at the chemoreceptor trigger zone, which is what triggers emesis.
     One indication. Straightforward mechanism. The details are in the dose.

[3]  For [green: nausea and vomiting], ondansetron blocks the serotonin signal before it triggers the vomiting reflex.
     4 mg IV or ODT. Can repeat once in 15 min.
     Pedi (6 mo–12 yrs): 0.1 mg/kg IV, max 4 mg.
     *But there's a nuance on repeat dosing...*

[4]  The nuance is the QT risk.
     Repeat dosing prolongs the QT interval in a dose-dependent way.
     Use caution in patients on other QT-prolonging drugs. Contraindicated in congenital long QT.
     *Save this one...*

[5]  Save this for your next clinical rotation.
     The complete drug reference is in the bio.
     Link in bio.
```

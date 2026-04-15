# Template 1: Drug Breakdown

## Objective

A complete single-drug overview compressed into one carousel. Covers identity, mechanism, key indications with doses, contraindications, and one clinical pearl. This is the broadest template — it touches every major aspect of the drug at a surface level.

## Eligible Drugs

All drugs in the dataset.

## Slide Structure

| Slide | Role | Content Rules |
|-------|------|---------------|
| 1 | Hook | Drug name + a hook that frames the value of knowing this drug. Max 15 words. |
| 2 | Identity | Generic name, trade name(s), pharmacological class(es). One-sentence summary of what the drug does in plain language. Source fields: `genericName`, `tradeNames`, `classes`, `summary`. |
| 3 | Mechanism | Simplified MOA. For multi-target drugs: list each receptor/target with its action and clinical result. For single-target drugs: explain the mechanism in 2–3 lines. Source field: `moa[].target`. Pick the 1–3 most clinically relevant targets. Do not list every target if the drug has many. |
| 4–5 | Indications | Top 2–3 indications, each with the most testable dose/route. If doses differ significantly between indications, use one slide per indication. If doses are similar, combine onto one slide. Source fields: `indications[].name`, `indications[].doses`. |
| 6 | Contraindications | Top 2–4 contraindications, one line each. Include a brief rationale connecting the contraindication to the drug's mechanism. Source field: `contraindications`. |
| 7 | Pearl | One high-yield clinical detail: a common mistake, a test-day trap, a field tip, or a critical nuance. This must be specific to this drug — not generic advice. |
| 8 | CTA | Save + follow prompt. |

**Total slides:** 7–9

## Hook Formulas

- `[Drug] — do you actually know this drug?`
- `Everything you need to know about [Drug] in 60 seconds`
- `[Drug]: the study card 💊`
- `If [Drug] is on your next test, save this`

## Rules

- This template is wide, not deep. Each section gets 1–2 slides maximum. Do not go deep on any single aspect — that is what templates 2–9 are for.
- The pearl slide must not repeat information from earlier slides. It must add something new.
- If the drug has more than 3 indications, pick the 2–3 most commonly tested or most clinically significant. Do not try to cover all indications.
- If the drug has more than 4 contraindications, pick the 3–4 most critical. Do not list all of them.

## Example: Epinephrine

```
[1]  Epinephrine — do you actually know this drug?
[2]  Adrenalin / EpiPen
     Sympathomimetic · Catecholamine · Vasopressor
     First-line for anaphylaxis and cardiac arrest.
[3]  HOW IT WORKS
     It hits three receptors at once.
     α-1: vasoconstriction, brings BP back up.
     β-1: increases HR and contractility.
     β-2: relaxes the airways.
[4]  CARDIAC ARREST
     1 mg IV/IO every 3–5 min.
     Use the 1:10,000 concentration.
     Push fast, flush with 20 mL NS.
[5]  ANAPHYLAXIS
     0.3–0.5 mg IM, 1:1,000 concentration.
     Anterolateral thigh.
     Repeat every 5–15 min if no improvement.
[6]  DON'T GIVE WHEN
     Coronary insufficiency — epi increases myocardial
     O₂ demand, which can worsen ischemia.
     Same concern with uncontrolled HTN.
     No absolute contraindications in cardiac arrest.
[7]  THE PEARL
     1:10,000 is for IV push in arrest.
     1:1,000 is for IM in anaphylaxis.
     One is ten times stronger than the other.
     Know which is which.
[8]  Save this → build your drug study deck 💊
     Follow for the next breakdown
```

# Template 1: Drug Breakdown

## Objective

A complete single-drug overview compressed into one carousel. Covers identity, mechanism, key indications with doses, contraindications, and one clinical pearl. This is the broadest template — it touches every major aspect of the drug at a surface level.

## Eligible Drugs

All drugs in the dataset.

## Slide Structure

| Slide | Role | Content Rules |
|-------|------|---------------|
| 1 | Hook | Drug name + hook that frames the value of knowing this drug. Max 15 words. Lead with the drug name. See global_rules for hook and teaser guidance. |
| 2 | Identity | Generic name, trade name(s), pharmacological class(es). One-sentence summary of what the drug does in plain language. Use `[amber: ...]` for trade names, `[blue: ...]` for drug classes. Source fields: `genericName`, `tradeNames`, `classes`, `summary`. |
| 3 | Mechanism | Simplified MOA. For multi-target drugs: explain each relevant receptor, its action, and the clinical result. For single-target drugs: cover the mechanism in 2–3 lines. Source field: `moa[].target`. Pick the 1–3 most clinically relevant targets. Use `[blue: ...]` for receptor names and mechanism terms. |
| 4–5 | Indications | Top 2–3 indications, each with the most testable dose/route. If doses differ significantly between indications, use one slide per indication. If doses are similar, combine onto one slide. Use `[green: ...]` for indication names. Use `<subtleHeader>` to name each indication when indications get separate slides. Source fields: `indications[].name`, `indications[].doses`. |
| 6 | Contraindications | Top 2–4 contraindications, one per line. Include a brief rationale connecting each to the drug's mechanism. Use `[coral: ...]` for named contraindications. If the contraindications are distinct enough to warrant separate slides (Template 2 territory), use `<subtleHeader>` per contraindication. Source field: `contraindications`. |
| 7 | Pearl | One high-yield clinical detail: a common mistake, a test-day trap, a field tip, or a critical nuance. Must be specific to this drug. Use `[amber: ...]` for warnings or `[lavender: ...]` for named adverse effects if relevant. |
| 8 | CTA | Save + app reference. Use one of the standard CTA options from global_rules. |

**Total slides:** 7–9

## Hook Formulas

Align with the hook guidance in global_rules. Preferred formulas for this template:

- `[Drug] — how well do you really know this drug?`
- `[Drug] — [the one specific thing that makes it worth understanding].`
- `[Drug]: everything on one card.`
- `If [Drug] is on your next test, save this.`

Do not use: "do you actually know this drug?" (too vague), "Everything you need to know in 60 seconds" (overused), or "[Drug]: the study card 💊" (emoji misuse — body slide rule).

## Rules

- This template is wide, not deep. Each section gets 1–2 slides maximum. Do not go deep on any single aspect — that is what templates 2–9 are for.
- The pearl slide must not repeat information from earlier slides. It must add something new.
- If the drug has more than 3 indications, pick the 2–3 most commonly tested or most clinically significant. Do not try to cover all indications.
- If the drug has more than 4 contraindications, pick the 3–4 most critical. Do not list all of them.

## Example: Epinephrine

```
[1]  Epinephrine — how well do you really know this drug?
     *It does three jobs at once. Here's all of them...*

[2]  Also called [amber: Adrenalin] and [amber: EpiPen].
     It's a [blue: sympathomimetic], [blue: catecholamine], and [blue: vasopressor] — it mimics your body's own stress response.
     First-line for both [green: anaphylaxis] and [green: cardiac arrest].
     *The reason it works for both comes down to which receptors it hits...*

[3]  It hits three receptors at once, and each one does something different.
     [blue: α-1] causes vasoconstriction, which brings BP back up.
     [blue: β-1] increases HR and contractility.
     [blue: β-2] relaxes the airways.
     *Which receptor matters most depends on why you're giving it...*

[4]  <subtleHeader>Cardiac Arrest</subtleHeader>
     <text>1 mg IV/IO (1:10,000) every 3–5 min.</text>
     <text>Push fast and flush with 20 mL NS after each dose to move it centrally.</text>
     *Anaphylaxis is a different situation entirely...*

[5]  <subtleHeader>Anaphylaxis</subtleHeader>
     <text>0.3–0.5 mg IM (1:1,000) into the anterolateral thigh.</text>
     <text>That's ten times more concentrated than the arrest dose — the concentration matters as much as the dose.</text>
     <text>Repeat every 5–15 min if there's no improvement.</text>
     *There are a couple of situations where you need to think twice before giving it...*

[6]  The main concern is the cardiovascular load it creates.
     [coral: Coronary insufficiency] is a relative contraindication — epi increases myocardial O₂ demand, which can worsen ischemia.
     [coral: Uncontrolled HTN] carries the same concern.
     There are no absolute contraindications in cardiac arrest.
     *One more thing — and it trips people up every time...*

[7]  The concentration mix-up is one of the most common errors with this drug.
     1:10,000 is for IV push in arrest. 1:1,000 is for IM in anaphylaxis.
     Getting them reversed means a tenfold dosing error.
     Know which is which before you reach for it.
     *Let's recap...*

[8]  <subtleHeader>Recap</subtleHeader>
     <text>Epinephrine — the essentials:</text>
     <pill>Sympathomimetic · Catecholamine · Vasopressor</pill>
     <pill>Cardiac Arrest: 1 mg IV/IO (1:10,000)</pill>
     <pill>Anaphylaxis: 0.3–0.5 mg IM (1:1,000)</pill>
     <pill>Relative CI: Coronary Insufficiency, Uncontrolled HTN</pill>
     *One more slide...*

[9]  Save this for your next exam.
     All 70 drugs, one app → link in bio.
```

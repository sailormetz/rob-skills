# Template 2: When NOT to Give

## Objective

A single-drug contraindication deep dive. Every reason to hold the drug, each explored with enough depth that the student understands *why* it is contraindicated — not just that it is.

## Eligible Drugs

All drugs in the dataset.

## Slide Structure

| Slide | Role | Content Rules |
|-------|------|---------------|
| 1 | Hook | Drug name + danger/stakes framing. Max 15 words. See global_rules for hook and teaser guidance. |
| 2 | Context | What the drug is and what it does, in one or two lines. The contraindications need this context to make sense. Use `[blue: ...]` for drug class terms. |
| 3–7 | Contraindications | **If the drug has 3+ contraindications:** One per slide. Use `<sectionLabel>Contraindications</sectionLabel>` and `<topicName>` to name each one. Start with a lead line framing the contraindication. Follow with rationale connecting the drug's pharmacology to why this condition makes it dangerous. Use `[coral: ...]` for named contraindications. **If the drug has 1–2 contraindications:** Go deeper across multiple slides: what it is, why the pharmacology makes it dangerous, what happens if you give it anyway. |
| 8 | Recap | Labeled summary of all contraindications covered. Use `<sectionLabel>Recap</sectionLabel>`. One `[coral: ...]` line per contraindication — label and key reason. |
| Last | CTA | Save + app reference. Use one of the standard CTA options from global_rules. |

**Total slides:** 5–9

## Hook Formulas

- `[Drug] — [X] reasons to hold it.`
- `Before you push [Drug], check these.`
- `[Drug]: know when not to give it.`
- `[Drug] can hurt your patient. Here's when.`

Do not use: "Stop." as an opener (too dramatic), or parenthetical asides like "(this is the part they test)."

## Rules

- Every contraindication slide must include a rationale. Do not just list the contraindication as a bare fact. Explain *why* — connect it to the drug's mechanism or the patient's physiology.
- If a drug has no absolute contraindications (e.g., epinephrine in cardiac arrest), state that explicitly and focus on relative contraindications and use-caution scenarios.
- Order contraindications from most dangerous / most commonly tested to least.
- If multiple contraindications share the same underlying mechanism, it is acceptable to explain the mechanism once and reference it in subsequent slides. Do not repeat the full explanation.

## Example: Succinylcholine

```
[1]  Succinylcholine — know when to hold it.
     *Some of these mistakes are fatal...*

[2]  It's a [blue: depolarizing neuromuscular blocker] — fastest onset of anything you'll use for [green: RSI].
     But that depolarization is exactly what makes it dangerous in the wrong patient.
     *The risks all trace back to one mechanism...*

[3]  Every dose causes a transient [blue: potassium shift] out of muscle cells.
     In a healthy patient, that's manageable — but if K+ is already elevated, that bump can push them into [lavender: cardiac arrest].
     Several conditions amplify that release dramatically.
     *Here's the first one...*

[4]  <sectionLabel>Contraindications</sectionLabel>
     <topicName>Hyperkalemia</topicName>
     [coral: Hyperkalemia] is the primary contraindication — and it's not always obvious you're dealing with it.
     Any patient with known or suspected elevated K+ is at risk from that potassium shift.
     *Burns and crush injuries take this further...*

[5]  <sectionLabel>Contraindications</sectionLabel>
     <topicName>Burns / Crush Injuries</topicName>
     Major tissue damage upregulates [blue: acetylcholine receptors] along the muscle membrane.
     Succinylcholine hits all of them at once — the K+ release becomes massive.
     [coral: Major burns] and [coral: crush injuries >48 hrs] are absolute contraindications for this reason.
     *Neuromuscular disease follows the same pattern...*

[6]  <sectionLabel>Contraindications</sectionLabel>
     <topicName>Neuromuscular Disease</topicName>
     [coral: Muscular dystrophy] and [coral: denervation injuries] — spinal cord injury, prolonged immobility — carry the same receptor upregulation risk.
     The mechanism is identical to burns. The outcome can be the same.
     *Two more — and one of them is a classic board question...*

[7]  <sectionLabel>Contraindications</sectionLabel>
     <topicName>Malignant Hyperthermia</topicName>
     [coral: Personal or family history of malignant hyperthermia] is an absolute contraindication.
     Succinylcholine is a known trigger — it can initiate the cascade even without prior personal exposure.
     Classic board question. Know it cold.
     *Last one...*

[8]  <sectionLabel>Contraindications</sectionLabel>
     <topicName>Penetrating Eye Injury</topicName>
     [coral: Penetrating eye injury] is the last one.
     The fasciculations succinylcholine causes raise intraocular pressure, which can worsen a globe rupture.
     Use a non-depolarizing agent if you have one available.
     *Let's put them all together...*

[9]  <sectionLabel>Recap</sectionLabel>
     [coral: Hyperkalemia] — K+ shift can push an already-elevated patient into arrest
     [coral: Burns / Crush >48 hrs] — receptor upregulation causes massive K+ release
     [coral: Neuromuscular Disease] — same mechanism as burns
     [coral: Malignant Hyperthermia Hx] — known trigger, absolute contraindication
     [coral: Penetrating Eye Injury] — fasciculations raise intraocular pressure
     *One more slide...*

[10] Save this for your next exam.
     All 70 drugs, one app → link in bio.
```

## Example: Naloxone (short carousel — single contraindication, explored in depth)

```
[1]  [amber: Naloxone] — almost no reason to hold it.
     *Almost.*

[2]  <sectionLabel>Contraindications</sectionLabel>
     It's a [blue: competitive opioid antagonist] — displaces opioids from [blue: mu receptors] and takes their place without activating them.
     There is only one true absolute contraindication: [coral: known hypersensitivity] to naloxone.
     *But the real risk isn't a contraindication. It's technique.*

[3]  <sectionLabel>Cautions</sectionLabel>
     Push it too fast or at too high a dose and you precipitate [lavender: acute opioid withdrawal].
     That means combativeness, vomiting, and in severe cases, pulmonary edema.
     This isn't a contraindication — it's a dosing and technique issue. But it's what actually hurts people.
     *So what does that mean in practice...*

[4]  <sectionLabel>Cautions</sectionLabel>
     [amber: Titrate to respiratory effort], not consciousness.
     The goal is adequate breathing — not a wide-awake patient in full withdrawal.
     Start low, go slow, and monitor continuously after administration.
     *Save this one...*

[5]  Save this for your next shift.
     Full doses, MOA, and contraindications for every drug → link in bio.
```

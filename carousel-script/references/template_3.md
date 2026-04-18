# Template 3: How It Works

## Objective

A mechanism-focused deep dive for a single drug. Explains *how* the drug produces its clinical effects by walking through its receptor targets, actions, and downstream results. The goal is understanding, not memorization.

## Eligible Drugs

All drugs in the dataset.

## Slide Structure

| Slide | Role | Content Rules |
|-------|------|---------------|
| 1 | Hook | Drug name + framing around understanding the mechanism. Max 15 words. See global_rules for hook and teaser guidance. |
| 2 | Context | Drug name, class, and what it is used for. Brief — just enough to ground the mechanism explanation. Use `[blue: ...]` for class terms and `[green: ...]` for indications. |
| 3–6 | Mechanism | **Two approaches — choose based on the drug:** **Multi-target drugs** (2+ MOA targets): One receptor/target per slide. Use `<sectionLabel>Mechanism</sectionLabel>` and `<topicName>` naming the receptor range or target. Start with a lead line naming the receptor and its action. Follow with the clinical result. Use `[blue: ...]` for receptor names and mechanism terms. **Single-target or sequential-mechanism drugs**: One step per slide. Walk through the mechanism as a causal chain. Use `<sectionLabel>Mechanism</sectionLabel>` throughout, no `<topicName>` needed. Each slide is one link in the chain — what the drug binds → what that does → what the patient experiences. |
| 7 | Synthesis | Connect the mechanism back to clinical use. "This is why it works for [indication]" or "This is also why [adverse effect] happens." Ties mechanism to something the student already cares about. |
| 8 | CTA | Save + app reference. Use one of the standard CTA options from global_rules. |

**Total slides:** 5–8

## Hook Formulas

- `[Drug] — understand it, not just memorize it.`
- `[Drug] hits [X] receptors. Here's what each one does.`
- `The pharmacology behind [Drug], simplified.`
- `Why does [Drug] work? It's the receptor profile.`

## Rules

- For multi-target drugs, only include clinically relevant targets. If a drug has a minor action on a receptor that does not produce meaningful clinical effects at therapeutic doses, omit it.
- For single-target drugs, the step-by-step approach must follow a logical causal sequence. Each slide should flow from the previous one.
- The synthesis slide is mandatory. The mechanism must be tied back to a clinical outcome the student cares about.
- Do not include dosing information in this template. The focus is purely on mechanism.

## Example: Dopamine (multi-target, dose-dependent approach)

```
[1]  Dopamine — the drug that changes what it does based on how much you give.
     *Same drug, three completely different receptor profiles...*

[2]  It's a [blue: catecholamine] and [blue: sympathomimetic] — one of the few drugs where the dose changes which receptors you're hitting entirely.
     Used for [green: shock] and [green: symptomatic bradycardia].
     *Start at the bottom of the dose range...*

[3]  <sectionLabel>Mechanism</sectionLabel>
     <topicName>Low Dose — D1 Receptors</topicName>
     At low doses, dopamine primarily activates [blue: D1 dopaminergic receptors] in the renal and mesenteric vasculature.
     This causes vasodilation in those beds, which was historically called "renal-dose dopamine."
     That theory has been debunked — there is no proven renal protection at low doses. This range is no longer clinically targeted.
     *As the dose climbs, you hit a different receptor entirely...*

[4]  <sectionLabel>Mechanism</sectionLabel>
     <topicName>Mid Dose — Beta-1 Receptors</topicName>
     In the mid range, [blue: β-1 adrenergic receptors] dominate — this is the inotropic range.
     HR goes up. Contractility increases. Cardiac output improves.
     This is the range used for cardiogenic shock and symptomatic bradycardia when atropine has failed.
     *Push the dose higher and you activate a third receptor...*

[5]  <sectionLabel>Mechanism</sectionLabel>
     <topicName>High Dose — Alpha-1 Receptors</topicName>
     At high doses, [blue: α-1 adrenergic receptors] take over and cause peripheral vasoconstriction.
     SVR rises, BP rises — but so does the afterload the heart has to pump against.
     At very high doses, α-1 vasoconstriction can actually override the dopaminergic dilation and reduce renal perfusion.
     *Here's what that means clinically...*

[6]  Understanding the dose-receptor relationship explains why dopamine is now third-line for shock.
     The tachyarrhythmia risk is real at every range — and norepinephrine and epinephrine produce more predictable effects without the dose-dependent receptor shifting.
     When you do use it, titrate to MAP ≥65 mmHg and watch the rhythm continuously.
     *Save this one...*

[7]  Save this to your study deck.
     The complete drug reference is in the bio.
```

## Example: Naloxone (step-by-step approach)

```
[1]  Naloxone — understand it, not just memorize it.
     *The whole drug makes sense once you see how the binding works...*

[2]  It's a [blue: competitive opioid antagonist], used to reverse [green: opioid overdose].
     One mechanism. One target. Clean drug to understand.
     *Start with what opioids are doing in the first place...*

[3]  Opioids bind [blue: mu receptors] in the brain and brainstem.
     That's what suppresses the respiratory drive — the mechanism behind the overdose.
     Naloxone's job is to get there first.
     *It can, because its binding affinity is higher...*

[4]  Naloxone has a higher affinity for mu receptors than most opioids do.
     It displaces the opioid from the receptor and takes its place.
     But it doesn't activate the receptor — it just occupies it.
     *That's the key difference: binding without activation.*

[5]  With the mu receptor blocked and unactivated, the opioid effects reverse.
     Respiratory drive returns. Level of consciousness improves. Pupils dilate.
     The patient wakes up because the signal was cut off at the receptor level.
     *But there's a catch...*

[6]  There's one catch: naloxone's half-life is shorter than most opioids.
     When it wears off, the opioid is still in circulation and can rebind.
     Re-sedation is a real risk — that's why you monitor after administration and may need to redose.
     *And that's exactly why technique matters...*

[7]  This is also why technique matters.
     Too much naloxone too fast displaces everything at once and precipitates acute withdrawal.
     The goal is to restore respiratory effort — not flip a switch and cause a crisis.
     *Save this one...*

[8]  Save this to your study deck.
     The complete drug reference is in the bio.
```

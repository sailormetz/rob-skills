---
name: carousel-script-verification
description: "Verifies clinical accuracy of a carousel script against authoritative EMS sources using web search. Extracts major clinical claims (doses, routes, mechanisms, contraindications), queries each against NASEMSO/AHA/StatPearls, corrects confirmed errors, and logs all changes. Runs after carousel-script, before the Script Checkpoint. Called only by carousel-master — never trigger directly."
version: "1.0.0"
author: rob
tags: [carousel, verification, clinical, accuracy]
---

# carousel-script-verification

Checks the generated carousel script for major clinical inaccuracies before Sailor reviews it. Catches errors like wrong preferred route, wrong dose range, incorrect mechanism claims, or false contraindications.

**Scope:** Major factual errors only. Not phrasing, style, or brand names. If it could hurt a patient or fail a student on their NREMT, it needs to be right.

---

## Authorized Sources (in priority order)

1. **NASEMSO 2022 Model EMS Clinical Guidelines** — primary for doses, routes, EMS protocols
2. **AHA ACLS/PALS guidelines** — cardiac arrest, arrhythmia, resuscitation
3. **StatPearls (NCBI)** — mechanism, pharmacology, clinical context
4. **DailyMed (FDA labeling)** — concentrations, contraindications, adverse effects

---

## Inputs

Read from `carousel-pipeline/runs/{topic_id}/`:
- `carousel_script.md` — the script to verify
- `carousel_pipeline_state.json` — for `selection.drug` and `selection.pitch`

---

## Workflow

### 1. Extract claims

Read the full script. Pull out every major clinical claim — anything that is checkable as true/false:

- **Doses** — amount, unit, max dose (e.g. "0.2 mg/kg IM, max 10 mg")
- **Routes** — specifically the *preferred* route for the clinical scenario (e.g. "IM is first-line for field seizures")
- **Concentrations** — (e.g. "1:10,000 for arrest, 1:1,000 for anaphylaxis")
- **Onset / repeat intervals** — (e.g. "onset 5–10 min", "repeat every 3–5 min")
- **Mechanism statements** — receptor-level claims (e.g. "blocks GABA-A receptor" — that would be wrong; it enhances it)
- **Contraindications** — named conditions or drug interactions stated as contraindications
- **Comparisons** — claims that compare this drug to another (e.g. "100x more potent than morphine")

Ignore: teaser lines, engagement questions, resource hints, stylistic framing.

### 2. Query per claim category

Do not query every claim individually — batch by category. Run one query per category that's present:

| Category | Query format |
|----------|-------------|
| Doses + routes | `"{drug} dose route {indication} NASEMSO EMS paramedic guidelines"` |
| Mechanism | `"{drug} mechanism of action receptor pharmacology StatPearls"` |
| Contraindications | `"{drug} contraindications EMS paramedic"` |
| Concentrations | `"{drug} concentration {indication} paramedic"` |
| Comparisons | `"{drug} vs {comparison drug} potency dose"` |

Use the `web_search` tool. Include source names in the query to bias toward authoritative results.

### 3. Evaluate each claim

For each claim, determine:

- **Confirmed correct** — source agrees. No action.
- **Confirmed wrong** — source clearly contradicts. Flag and correct.
- **Ambiguous / protocol-dependent** — sources vary by system or region. Flag but do not auto-correct — note it for Sailor.

**The standard for "confirmed wrong":** The claim contradicts what NASEMSO, AHA, StatPearls, or DailyMed say, and there is no reasonable protocol variation that would explain the discrepancy.

**Examples of confirmed wrong:**
- Script says IN is the preferred route for seizures; NASEMSO says IM is first-line
- Script says adenosine dose is 12 mg first dose; AHA says 6 mg
- Script says succinylcholine is safe in burn patients; sources say it causes dangerous hyperkalemia

**Examples of ambiguous (do not auto-correct):**
- Dose range differs slightly between NASEMSO and AHA
- A contraindication is relative in some systems and absolute in others

### 4. Correct confirmed errors

For each confirmed wrong claim:
1. Rewrite the affected line(s) in `carousel_script.md` with the correct information
2. Keep the voice and sentence structure as close to the original as possible — only change what's factually wrong
3. Log the correction: `{ claim, original, corrected, source }`

### 5. Report to carousel-master

Return a summary of what was corrected. Carousel-master includes this in the Script Checkpoint message to Sailor.

- If corrections were made: list each one (what changed and why)
- If nothing was corrected: `"✅ Script verified — no issues found."`

---

## Rules

- Verify every script, even simple ones. One wrong route can fail a student.
- Auto-correct confirmed errors and ambiguous claims using best available evidence. Use your judgment.
- Do not change voice, tone, or phrasing beyond what the factual correction requires.
- Do not write to `carousel_pipeline_state.json` — carousel-master owns that.
- If Perplexity returns no useful results for a query, research it through other available means rather than leaving it unchecked.

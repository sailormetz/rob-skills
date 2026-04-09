---
name: drug-card-entry
description: "Processes EMS drug card PDFs into structured JS data entries and pushes them to the drug-cards GitHub repo. Use when Sailor sends one or more drug card PDFs. Triggers on: PDF attachments that look like drug cards, phrases like 'process this card', 'add this drug', 'next card'."
---

# Drug Card Entry

## Use this skill when
- Sailor sends a PDF drug card (single or batch)
- Sailor says "next card", "process this", or similar

## Workflow

For each card:

1. **Extract** — Use `pdf` tool. Pull all fields verbatim: name, trade name, class, MOA, indications, CIs, doses (adult + peds), onset, duration, adverse effects, precautions.

2. **Verify** — Cross-reference against NASEMSO guidelines first, then web search for anything NASEMSO doesn't cover.
   - **Primary source:** `references/NASEMSO-pharmacology-reference.md` — grep by drug name. Check doses in Treatment and Interventions sections, CIs in Medications appendix, MOA in Pharmacologic Action field.
   - **Secondary:** Web search (StatPearls, UpToDate, AHA guidelines) only for gaps NASEMSO doesn't address.
   - **Always check:** dose accuracy (especially peds — 10x errors happen), missing CIs, MOA specificity, onset/duration.

3. **Flag** — Apply EMS lens (see Rules). Log anything that needs noting.

4. **Propose** — Show the complete JS entry + a short flags list. Wait for approval.

5. **Write + Push** — On approval: append to `data/drugs.js`, prepend to `data/review-notes.txt`, commit, `git pull --rebase`, push.

**Batches:** Extract + verify all cards first. Present all proposals together. Single approval → write + push all.

## Output format

**Do NOT send raw JSON to Sailor.** Just present a summary of changes per drug:

For each drug, list:
1. Drug name + trade name
2. Only the flags — what you changed, corrected, added, or removed vs the source card

Example:
> **NALOXONE (Narcan)**
> - ➕ Added titrate-to-breathing guidance
> - ➕ Narrowed adult starting dose from 0.4–4 mg → 0.4–2 mg
> - ✅ Peds dosing accurate

If a drug had zero changes, just say "✅ Card accurate — no changes needed."

Flags format:
- ✅ Card accurate — no changes
- ⚠️ Peds dose corrected: 0.2 mg/kg → 0.02 mg/kg (source: StatPearls)
- ➕ Added sulfite allergy to hypersensitivity CI (EMS-relevant, missing from card)

## Rules

**EMS lens — flag and add only if a medic in the field needs it:**
- Dose errors (especially peds) → always correct + flag
- Missing CI a medic would encounter → add + flag
- Inaccurate onset/duration → correct + flag
- Relative vs absolute CI when evidence supports distinction → downgrade + flag

**Do not add:**
- Hospital-level detail irrelevant prehospital
- Rare drug interactions a medic would never encounter
- Anything that clutters without helping field decisions

**Push rules:**
- Never push without explicit approval from Sailor
- Always `git pull --rebase` before pushing
- Commit message: `Add <genericName> (<TradeName>)`
- Always include both `data/drugs.js` and `data/review-notes.txt` in every commit

## Repo
- Local: `/data/.openclaw/workspace/cards/`
- Remote: `https://github.com/sailormetz/drug-cards.git`
- Drug data: `data/drugs.js` — append to `const DRUGS = [...]` array
- Review notes: `data/review-notes.txt` — prepend new entries below the header line
- **Schema (source of truth):** `data/schema.md` in the GitHub repo — local copy at `references/schema.md` is for quick reference only; if they diverge, GitHub wins
- **NASEMSO reference:** `references/NASEMSO-pharmacology-reference.md` — curated pharmacology extraction from NASEMSO 2022 v3.0 guidelines. Primary verification source for EMS dosing, indications, and CIs.

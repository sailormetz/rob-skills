---
name: home-meds-research
description: "Researches one home medication per day and appends it to the home_meds.js dataset. Triggered by cron message 'home-meds-research-daily'. Uses the home-meds schema and approved sources (DailyMed, StatPearls). Logs completed drugs to avoid repeats."
version: "1.0.0"
author: rob
tags: [home-meds, research, cron, drug-cards]
---

# home-meds-research

Researches one home medication per cron run and appends it to the dataset.

## Files

- **Drug list:** `references/drug-list.txt` (canonical order, 86 drugs)
- **Schema:** `references/schema.md`
- **Output:** `/data/.openclaw/workspace/home-meds/home_meds.js`
- **Progress:** `/data/.openclaw/workspace/home-meds/progress.json`

## Trigger

Cron message: `home-meds-research-daily`

## Workflow

### 1. Load progress
Read `progress.json`. Get the `completed` array (list of `id` strings already done).

### 2. Find next drug
Read `references/drug-list.txt`. Parse the numbered list. For each drug in order, derive its `id` (lowercase, hyphenated generic name — e.g. "Metoprolol" → `"metoprolol"`, "Valproic Acid" → `"valproic-acid"`, "Hydrocodone/Acetaminophen" → `"hydrocodone-acetaminophen"`).

Find the first drug whose `id` is not in `completed`. That is the target drug for this run.

If all 86 drugs are complete, send a Telegram message to `8531672710`: "🎉 All 86 home meds researched and logged. Dataset is complete." Then stop.

### 3. Research the drug
Use `web_search` to gather data from the approved sources in this order:

1. **DailyMed** — search `"[generic name] site:dailymed.nlm.nih.gov"` for MOA, drug class, adverse effects, indications
2. **StatPearls** — search `"[generic name] StatPearls paramedic EMS clinical"` for clinical context and EMS-relevant considerations
3. Supplement with general search if needed: `"[generic name] EMS paramedic considerations overdose"`

You are writing for a paramedic audience. Focus on prehospital relevance.

### 4. Build the entry
Construct the JS object strictly following the schema in `references/schema.md`.

Key rules:
- `id`: lowercase, hyphenated generic name
- `summary`: 2–4 sentences covering what it is, what patients take it for, how it affects physiology, and the main EMS flag. This is the most important field — write it well.
- `tradeNames`: include all major brand names from the drug list entry + any others found in research
- `category`: use only the enums defined in the schema
- `classes`: use only the preferred spellings defined in the schema
- `moa[].brief`: one clear sentence on mechanism, written for someone who knows pharmacology
- `patientIndications`: simple string array, condition names only
- `considerations`: HTML strings using `hl` highlight spans. Include adverse effects + EMS precautions. Include overdose only when clinically significant (TCAs, digoxin, insulin, lithium, beta blockers, CCBs, opioids — yes; lisinopril, statins — no).
- `source`: `"DailyMed"`, `"StatPearls"`, or `"Mixed"`

### 5. Append to output file
Read `/data/.openclaw/workspace/home-meds/home_meds.js`.

The file has the format:
```js
const home_meds = [
  { ... },
  { ... },
];
```

Insert the new entry before the closing `];`. Maintain clean formatting — 2-space indentation, entries separated by commas.

Write the updated file.

### 6. Update progress
Read `progress.json`. Add the drug's `id` to `completed`, increment `totalCompleted`, set `lastRun` to today's date (YYYY-MM-DD). Write the file.

### 7. Commit and push
Commit the updated `home_meds.js` and `progress.json` to the workspace repo:

```bash
cd /data/.openclaw/workspace && git add home-meds/home_meds.js home-meds/progress.json && git commit -m "data: [generic-name] — home med #[totalCompleted]/86" && git push
```

### 8. Notify
Send a Telegram message to `8531672710`:

```
✅ Home med researched: [Generic Name] ([Trade Names])
[totalCompleted]/86 complete
```

Then reply NO_REPLY.

## Rules

- Never research a drug that is already in `completed` — always check first
- Never overwrite `home_meds.js` from scratch — always read, modify, write
- If web search returns insufficient data, use what you have and note `source: "Mixed"`
- Follow the schema exactly — no extra fields, no missing required fields
- Keep `considerations` entries brief and clinically focused — 1–2 sentences each
- Do not include dosing information anywhere in the entry

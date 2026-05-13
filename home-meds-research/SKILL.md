---
name: home-meds-research
description: "Researches one home medication per cron run and appends it to the home_meds.js dataset. Triggered by cron message 'home-meds-research-daily'. Uses the home-meds schema and approved sources (DailyMed, StatPearls). Logs completed drugs to avoid repeats."
version: "2.0.0"
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

If all drugs are complete, send a Telegram message to `8531672710`: "🎉 All home meds researched and logged. Dataset is complete." Then stop.

### 3. Research the drug
Use `web_search` to gather data from the approved sources. Research must cover **every field** in the schema — not just a subset.

**Sources (in priority order):**
1. **DailyMed** — search `"[generic name] site:dailymed.nlm.nih.gov"` for drug class, indications, adverse effects, overdose/toxicity
2. **StatPearls** — search `"[generic name] StatPearls"` for clinical context, comorbidities, common co-prescriptions, EMS-relevant precautions
3. Supplement with general search as needed: `"[generic name] prehospital EMS considerations"`, `"[generic name] common drug interactions"`, `"[generic name] overdose toxidrome"`

**What you're researching (maps to schema fields):**
- Drug class and pharmacological classification → `classes`, `category`
- What conditions it treats → `indications`
- What conditions patients on this drug typically also have → `comorbidities`
- What other drugs patients on this drug are commonly also taking → `polypharmacy`
- Signs and symptoms of overdose/toxicity (if clinically relevant) → `overdoseToxicity`
- Prehospital risks, drug interactions with EMS meds, vital sign effects, clinical red flags → `precautions`
- Overall prehospital significance → `summary`

Do not guess or fill fields from general knowledge alone — verify against sources.

### 4. Build the entry
Construct the JS object strictly following the schema in `references/schema.md`.

Key rules:
- `id`: lowercase, hyphenated generic name
- `genericName`: proper-case generic name
- `tradeNames`: include all major brand names
- `category`: use only the enums defined in the schema
- `classes`: use only snake_case keys from `data/drug_classes.js` (e.g. `"beta_blocker"`, `"ace_inhibitor"`)
- `sources`: array of sources actually used (e.g. `["DailyMed", "StatPearls"]`)
- `indications`: max 5, short condition labels (1–4 words)
- `comorbidities`: max 5, short medical terms
- `polypharmacy`: max 5, single drug name or class with examples format
- `overdoseToxicity`: max 5, findings only (no treatments). Use `null` if overdose is not a realistic field scenario.
- `precautions`: max 5, HTML strings with highlight spans. Risks only (no treatments or action items). Flag interactions with prehospital drugs. Use `<span class="hl hl--ci">` for dangerous effects, `<span class="hl hl--drug">` for drug names, `<span class="hl hl--warn">` for warnings. 1–2 highlights per entry max.
- `summary`: 2–4 sentences of prehospital rapid-recall prose

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
```bash
cd /data/.openclaw/workspace && git add home-meds/home_meds.js home-meds/progress.json && git commit -m "data: [generic-name] — home med #[totalCompleted]/86" && git push
```

### 8. Notify and email
**Two outputs only — nothing else:**

**a) Telegram message** to `8531672710` — short status line:
```
[Generic Name] complete, [totalCompleted]/86 done
```

**b) Email** to `sailormetz@gmail.com` — attach the full JS object for the new entry as the email body (code-formatted). Subject: `Home Med — [Generic Name]`.

Then reply NO_REPLY.

## Rules

- Never research a drug that is already in `completed` — always check first
- Never overwrite `home_meds.js` from scratch — always read, modify, write
- If web search returns insufficient data, use what you have and note the sources actually used
- Follow the schema exactly — no extra fields, no missing required fields
- Do not include dosing information anywhere in the entry
- Never say "one of the most common home medications" or any variant. This is a dataset of common home meds — that framing is redundant by definition.
- **Comms rule: exactly 2 outputs per run.** (1) One short Telegram message at the end: "[drug] complete, X/Y done". (2) One email with the JSON data. No other Telegram messages, no verbose updates, no progress chatter. Explicit and non-negotiable.

# Home Medications Schema v2

Full reference for home medication entries.

**Source of truth.** This file defines the contract between data and front-end for the home medications dataset.

**Purpose:** This dataset is not about drugs paramedics administer. It is a field reference for drugs paramedics *encounter* — on a patient's med list, in a pill bottle at the scene, or as a contributing factor to the call. The goal is fast recognition and clinical context, not dosing instructions.

---

## EMS Scope

Every field is filtered through one lens: **a paramedic on a scene, looking at a patient's home medication list.**

**Include:**
- What the drug is and what condition it treats
- What comorbidities and other medications to expect
- Overdose/toxicity findings when clinically relevant
- Precautions relevant to prehospital care

**Exclude:**
- Dosing, routes, onset, duration — the medic is not administering this drug
- Mechanism of action details
- In-hospital monitoring parameters, titration protocols, or discharge instructions
- Rare adverse effects with no prehospital relevance

> **When in doubt:** Would a paramedic need to know this while managing a call where the patient takes this drug? If no — leave it out.

---

## Data Sources

Every entry is verified against authoritative sources before being committed. Use in this order:

1. **DailyMed** (dailymed.nlm.nih.gov) — FDA official drug labeling. Primary source for adverse effects and drug class.
2. **StatPearls** (statpearls.com) — peer-reviewed, continuously updated. Good for clinical context and EMS-relevant considerations.
3. **Lexicomp / Epocrates** — drug interactions, renal/hepatic considerations, adverse effect profiles.
4. **UpToDate** — when deeper clinical context is needed.

---

## Writing Style

All text in this dataset is written for a paramedic audience. Follow these rules:

- **Clinical and direct.** State what the drug does, what matters, and why. No editorializing, no hype words, no figurative language.
- **Concrete over vague.** Don't write "may cause cardiovascular effects" — write "causes hypotension and bradycardia."
- **Plain pharmacology.** Assume the reader knows basic A&P and pharmacology (receptors, drug classes, vital sign implications). Don't define terms like "vasodilation" or "antagonist."
- **One idea per statement.** Each array entry should make one point.
- **No dosing information anywhere.** The medic is not administering these drugs.

---

## JS Object Template

```js
{
  id: "",                  // lowercase, hyphenated generic name — must be unique
  genericName: "",            // proper-case generic name
  tradeNames: [],           // brand names
  category: [],            // clinical groupings for filtering (see Category Enums)
  classes: [],             // pharmacological class keys (snake_case, from drug_classes.js)
  sources: [],             // data sources used (see Source Values)
  indications: [],         // max 5 — why patients are prescribed this drug
  comorbidities: [],       // max 5 — conditions the patient likely also has
  polypharmacy: [],        // max 5 — other drugs the patient is likely also taking
  overdoseToxicity: [],    // max 5 — signs/symptoms of toxicity (null if not clinically relevant)
  precautions: [],         // max 5 — clinical risks and cautions for prehospital care
  summary: ""              // 2–4 sentences — prehospital rapid-recall prose
}
```

---

## Field Reference

### `id`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |
| **Unique** | Yes — no two entries may share an id |

Lowercase, hyphenated generic name. This is the primary key for the dataset.

**Do:**
- `"lisinopril"`, `"metoprolol"`, `"warfarin"`, `"valproic-acid"`
- `"hydrocodone-acetaminophen"` — combination drugs use hyphenated generic names
- `"insulin-glargine"` — specific insulin formulations include the type

**Don't:**
- `"Lisinopril"` — no capitals
- `"metoprolol_succinate"` — no underscores, and omit salt forms unless needed to distinguish entries

---

### `genericName`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |

The generic name only. No brand names, no extra descriptors.

**Example:** `"Carvedilol"`, `"Lisinopril"`, `"Valproic Acid"`

---

### `tradeNames`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes (use `[]` if none) |

All common brand names for this drug, including extended-release or combination formulations where the base drug is the same. Medics frequently encounter brand names on bottles — this field maps an unfamiliar label back to a known drug.

**Examples:**
- `["Coreg", "Coreg CR"]`
- `["Lopressor", "Toprol-XL"]`
- `["Norco", "Vicodin"]`

---

### `category`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes |
| **Min length** | 1 |

Array of clinical groupings for front-end filtering. A drug appears under every category it belongs to.

Categories describe **what type of condition the patient is being treated for** — not pharmacological class.

#### Category Enums

| Value | Definition |
|-------|------------|
| `"Cardiovascular"` | Blood pressure, heart rate, heart failure, angina, or cardiac rhythm. |
| `"Anticoagulation"` | Clotting reduction or platelet aggregation. Separate from Cardiovascular because primary EMS implication is bleeding risk. |
| `"Pulmonary"` | Chronic respiratory conditions — inhalers, bronchodilators, inhaled corticosteroids. |
| `"Endocrine"` | Hormonal or metabolic conditions — insulin, oral hypoglycemics, thyroid agents. |
| `"Neurological"` | Chronic neurological conditions — anticonvulsants, antiparkinsonian agents. |
| `"Psychiatric"` | Mental health — antidepressants, antipsychotics, mood stabilizers, anxiolytics, sedative-hypnotics. |
| `"Pain & Anti-inflammatory"` | Chronic pain, inflammation, musculoskeletal — opioids, NSAIDs, muscle relaxants. |
| `"GI"` | Gastrointestinal — PPIs, H2 blockers, antiemetics. |

**Rule:** Include every category that applies. List the most EMS-relevant category first.

---

### `classes`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes |
| **Min length** | 1 |

Array of snake_case class keys referencing the centralized `DRUG_CLASSES` lookup in `data/drug_classes.js`. Always use keys from that file. If a new class is needed, add it to `drug_classes.js` first.

**Key format:** All lowercase, words separated by underscores (e.g. `"calcium_channel_blocker"`, `"beta2_agonist"`). The front-end resolves display names via `DRUG_CLASSES[key]`.

**Examples:**
- `["beta_blocker", "antihypertensive", "antiarrhythmic"]`
- `["ace_inhibitor", "antihypertensive"]`
- `["ssri", "antidepressant"]`
- `["opioid_analgesic", "analgesic"]`

---

### `sources`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes |

Array of data sources used for this entry.

#### Source Values

| Value | When to use |
|-------|-------------|
| `"DailyMed"` | FDA official drug labeling |
| `"StatPearls"` | StatPearls |
| `"Lexicomp"` | Lexicomp / Epocrates |
| `"UpToDate"` | UpToDate |

**Example:** `["DailyMed", "StatPearls"]`

---

### `indications`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes |
| **Max length** | 5 |

The medical conditions this drug is prescribed to treat or prevent. Each entry should be a short condition label — not a sentence. 1–4 words. Use parentheticals for specificity where needed.

**Good:** `"Heart failure (HFrEF)"`, `"Hypertension"`, `"Post-MI LV dysfunction"`

**Bad:** `"Used to treat high blood pressure and reduce cardiac workload"`

---

### `comorbidities`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes (use `[]` if none) |
| **Max length** | 5 |

Medical conditions commonly seen alongside this medication — conditions the patient likely also has, based on the typical population prescribed this drug. Short medical terms only, 1–4 words per entry.

**Good:** `"Coronary artery disease"`, `"Type 2 diabetes"`, `"COPD / asthma"`

**Bad:** `"Patients often have underlying lung disease due to smoking history"`

---

### `polypharmacy`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes (use `[]` if none) |
| **Max length** | 5 |

Other medications this patient is commonly also taking. Every entry must follow one of exactly two formats:

- **Single drug:** the generic drug name only — use when the drug is specific enough to stand alone
- **Class with examples:** the class name followed by the most common examples in parentheses — use when the class is the meaningful unit

No sentences. No explanations.

**Good — single drug:** `"Digoxin"`

**Good — class with examples:** `"ACE Inhibitors (lisinopril, enalapril, ramipril)"`

**Bad:** `"Patients are often on a diuretic to manage fluid retention"`

**Bad:** `"Furosemide (a loop diuretic)"`

---

### `overdoseToxicity`

| | |
|---|---|
| **Type** | `string[]` or `null` |
| **Required** | No — use `null` if overdose is not a realistic field scenario |
| **Max length** | 5 |

Signs and symptoms of acute toxicity or supratherapeutic dosing. Each entry is a brief clinical finding — a short noun phrase, optionally with a tight qualifier. **No treatments, no mechanisms, no explanatory clauses.**

Only populate this field for drugs where overdose/toxicity is something a medic might actually encounter in the field. Use `null` for drugs where OD is essentially a non-issue.

**Good:** `"Severe bradycardia, including high-degree AV block"`, `"Hypotension, often refractory"`

**Bad:** `"Hypotension — worsened by concurrent alpha-1 blockade, more severe than typical beta blocker OD"`

---

### `precautions`

| | |
|---|---|
| **Type** | `string[]` (HTML strings) |
| **Required** | Yes (use `[]` if none) |
| **Max length** | 5 |

The most important clinical precautions a paramedic must be aware of for this drug. Each entry is an HTML string capturing one high-level precaution as a brief, concrete statement. **Focus on the risk or concern itself — do not include treatments, interventions, or management steps. No action items.**

**Good:** `'<span class="hl hl--drug">Atropine</span> is largely ineffective for carvedilol-induced <span class="hl hl--ci">bradycardia</span>.'`

**Good:** `'Compensatory <span class="hl hl--warn">tachycardia is blunted</span> — a normal HR does not rule out shock.'`

**Bad:** `"If the patient is bradycardic, atropine will not work — move to transcutaneous pacing and glucagon early."`

#### HTML Highlight Spans

Use inline `<span>` tags with highlight classes to visually emphasize key clinical terms. These are rendered by the front-end with colored text.

| CSS Class | Color | Use for |
|-----------|-------|--------|
| `hl hl--general` | Blue | General information, neutral emphasis |
| `hl hl--drug` | Amber | Drug names, trade names |
| `hl hl--indication` | Green | Indications, desired therapeutic effects |
| `hl hl--ci` | Red | Contraindications, dangerous effects, toxicity |
| `hl hl--warn` | Orange | Warnings, precautions, risk factors |
| `hl hl--moa` | Cyan | Mechanism of action concepts |

**Syntax:** `<span class="hl hl--ci">hypotension</span>`

**Rules:**
- Use highlights to draw the eye to the clinically critical term — not to decorate every noun.
- One to two highlights per entry is typical. Don't over-highlight.
- The highlight should be on the key clinical term itself (the adverse effect, the drug name, the condition), not on filler words.

#### Priority order

1. Life-threatening drug interactions (flag prehospital drugs explicitly)
2. Vital sign effects this drug causes or masks
3. Adverse events and clinical red flags
4. General cautions relevant to prehospital care that don't fit the above

#### Prehospital drug interactions

Flag any interactions with these commonly paramedic-administered drugs: epinephrine, atropine, adenosine, amiodarone, lidocaine, dopamine, norepinephrine, nitroglycerin, aspirin, dextrose, naloxone, fentanyl, morphine, ketamine, midazolam, ondansetron, glucagon, calcium gluconate.

---

### `summary`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |

2–4 sentences combining prehospital relevance and key paramedic takeaways. This should read as rapid-recall prose — clinically precise, practically focused. Cover what this drug signals about the patient, what it changes about your assessment, and the highest-stakes concern on scene.

---

## Validation Rules

```js
function validateHomeMed(entry) {
  const validCategories = [
    "Cardiovascular", "Anticoagulation", "Pulmonary", "Endocrine",
    "Neurological", "Psychiatric", "Pain & Anti-inflammatory", "GI"
  ];
  const validSources = ["DailyMed", "StatPearls", "Lexicomp", "UpToDate"];

  // id: required, lowercase, hyphenated
  if (!entry.id || entry.id !== entry.id.toLowerCase()) error(`Invalid id: "${entry.id}"`);

  // genericName: required
  if (!entry.genericName) error(`Missing genericName for ${entry.id}`);

  // tradeNames: must be array
  if (!Array.isArray(entry.tradeNames)) error(`tradeNames must be array for ${entry.id}`);

  // category: non-empty array of valid enums
  if (!Array.isArray(entry.category) || entry.category.length === 0) error(`category must be non-empty array for ${entry.id}`);
  entry.category.forEach(c => { if (!validCategories.includes(c)) error(`Invalid category "${c}" for ${entry.id}`); });

  // classes: non-empty array
  if (!Array.isArray(entry.classes) || entry.classes.length === 0) error(`classes must be non-empty array for ${entry.id}`);

  // sources: non-empty array of valid values
  if (!Array.isArray(entry.sources) || entry.sources.length === 0) error(`sources must be non-empty array for ${entry.id}`);
  entry.sources.forEach(s => { if (!validSources.includes(s)) error(`Invalid source "${s}" for ${entry.id}`); });

  // indications: non-empty array, max 5
  if (!Array.isArray(entry.indications) || entry.indications.length === 0) error(`indications must be non-empty array for ${entry.id}`);
  if (entry.indications.length > 5) error(`indications exceeds 5-entry max for ${entry.id}`);

  // comorbidities: array, max 5
  if (!Array.isArray(entry.comorbidities)) error(`comorbidities must be array for ${entry.id}`);
  if (entry.comorbidities.length > 5) error(`comorbidities exceeds 5-entry max for ${entry.id}`);

  // polypharmacy: array, max 5
  if (!Array.isArray(entry.polypharmacy)) error(`polypharmacy must be array for ${entry.id}`);
  if (entry.polypharmacy.length > 5) error(`polypharmacy exceeds 5-entry max for ${entry.id}`);

  // overdoseToxicity: null or array max 5
  if (entry.overdoseToxicity !== null) {
    if (!Array.isArray(entry.overdoseToxicity)) error(`overdoseToxicity must be array or null for ${entry.id}`);
    if (entry.overdoseToxicity.length > 5) error(`overdoseToxicity exceeds 5-entry max for ${entry.id}`);
  }

  // precautions: array, max 5
  if (!Array.isArray(entry.precautions)) error(`precautions must be array for ${entry.id}`);
  if (entry.precautions.length > 5) error(`precautions exceeds 5-entry max for ${entry.id}`);

  // summary: required
  if (!entry.summary) error(`Missing summary for ${entry.id}`);
}
```

---

## Full Entry Example — Carvedilol

```js
{
  id: "carvedilol",
  genericName: "Carvedilol",
  tradeNames: ["Coreg", "Coreg CR"],
  category: ["Cardiovascular"],
  classes: ["beta_blocker", "alpha1_antagonist", "antihypertensive"],
  sources: ["DailyMed", "StatPearls"],
  indications: ["Heart failure (HFrEF)", "Hypertension", "Post-MI LV dysfunction"],
  comorbidities: ["Coronary artery disease", "Type 2 diabetes", "Chronic kidney disease", "Atrial fibrillation"],
  polypharmacy: ["ACE Inhibitors (lisinopril, enalapril)", "Loop diuretics (furosemide)", "Statins (atorvastatin)", "Aspirin", "Digoxin"],
  overdoseToxicity: ["Severe bradycardia, including high-degree AV block", "Hypotension, often refractory", "Bronchospasm", "Hypoglycemia (masked symptoms)", "Altered mental status progressing to seizures"],
  precautions: [
    '<span class="hl hl--drug">Atropine</span> is largely ineffective for carvedilol-induced <span class="hl hl--ci">bradycardia</span>.',
    'Compensatory <span class="hl hl--warn">tachycardia is blunted</span> — a normal HR does not rule out shock.',
    '<span class="hl hl--drug">Epinephrine</span> response is diminished — standard doses may not restore BP or HR in <span class="hl hl--ci">anaphylaxis</span>.',
    'Non-selective beta blockade can trigger <span class="hl hl--ci">bronchospasm</span> in COPD/asthma patients.',
    'Abrupt discontinuation risks <span class="hl hl--ci">rebound hypertension</span> and acute coronary syndrome.'
  ],
  summary: "Carvedilol is a combined alpha-beta blocker used in patients with significant cardiac disease — heart failure, post-MI, and hypertension. Its presence on a med list signals a patient with limited cardiac reserve who cannot compensate for hemodynamic stress. Expect blunted heart rate responses across the board: shock, hypoglycemia, and anaphylaxis will all present atypically. Standard prehospital interventions (atropine, epinephrine) have reduced efficacy."
}
```

---

## Quick-Reference Cheat Sheet

```
{
  id                    // lowercase, hyphenated — unique key
  genericName              // proper-case generic name
  tradeNames[]           // brand names found on bottles
  category[]            // clinical grouping enums (8 values)
  classes[]             // pharmacological class keys (snake_case, from drug_classes.js)
  sources[]             // ["DailyMed", "StatPearls", "Lexicomp", "UpToDate"]
  indications[]         // max 5 — why patients take it (short labels)
  comorbidities[]       // max 5 — conditions patient likely also has
  polypharmacy[]        // max 5 — other drugs patient is likely also taking
  overdoseToxicity[]    // max 5 or null — toxicity findings only
  precautions[]         // max 5 — risks and cautions, no treatments
  summary               // 2–4 sentences — prehospital rapid-recall prose
}
```

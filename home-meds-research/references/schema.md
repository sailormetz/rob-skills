# Home Medications Schema

Full reference for home medication entries in `home-meds/home_meds.js`.

**Source of truth.** This file defines the contract between data and front-end for the home medications dataset.

**Purpose:** This dataset is not about drugs paramedics administer. It is a field reference for drugs paramedics *encounter* — on a patient's med list, in a pill bottle at the scene, or as a contributing factor to the call. The goal is fast recognition and clinical context, not dosing instructions.

---

## EMS Scope

Every field is filtered through one lens: **a paramedic on a scene, looking at a patient's home medication list.**

**Include:**
- What the drug is and what condition it treats
- How it works (enough to understand what it's doing to the patient's physiology)
- Adverse effects and precautions relevant to EMS encounters
- Overdose considerations when clinically significant (e.g., antidepressants, insulin, digoxin)

**Exclude:**
- Dosing, routes, onset, duration — the medic is not administering this drug
- In-hospital monitoring parameters, titration protocols, or discharge instructions
- Rare adverse effects with no prehospital relevance

> **When in doubt:** Would a paramedic need to know this while managing a call where the patient takes this drug? If no — leave it out.

---

## Data Sources

Every entry is verified against authoritative sources before being committed. Use in this order:

1. **DailyMed** (dailymed.nlm.nih.gov) — FDA official drug labeling. Primary source for MOA, adverse effects, and drug class.
2. **StatPearls** (statpearls.com) — peer-reviewed, continuously updated. Good for clinical context and EMS-relevant considerations.
3. **Lexicomp / Epocrates** — drug interactions, renal/hepatic considerations, adverse effect profiles.
4. **UpToDate** — when deeper clinical context is needed.

---

## Writing Style

All text in this dataset is written for a paramedic audience. Follow these rules:

- **Clinical and direct.** State what the drug does, what matters, and why. No editorializing, no hype words, no figurative language.
- **Concrete over vague.** Don't write "may cause cardiovascular effects" — write "causes hypotension and bradycardia."
- **Plain pharmacology.** Assume the reader knows basic A&P and pharmacology (receptors, drug classes, vital sign implications). Don't define terms like "vasodilation" or "antagonist." But do connect mechanism to clinical effect when the link isn't obvious.
- **One idea per statement.** Don't chain sentences with semicolons or dashes. Each bullet or array entry should make one point.
- **No dosing information anywhere.** The medic is not administering these drugs. Dose-related language (mg amounts, titration, tapering) does not belong in any field.

---

## JS Object Template

```js
{
  id: "lisinopril",              // lowercase, hyphenated generic name — must be unique
  summary: "",                   // 1–2 sentences: what it is + why patients take it (see Summary section)
  genericName: "",               // Proper-case generic name as it appears on labeling
  tradeNames: [],                // Array of trade name strings — critical, medics read bottle labels
  category: [],                  // Clinical groupings for filtering (see Category Enums)
  classes: [],                   // Pharmacological classes (see Classes section)
  source: "",                    // Primary data source (see Source Values)
  moa: [],                       // Mechanism of action (see MOA section)
  patientIndications: [],        // Why patients are prescribed this drug — simple string array
  considerations: []             // Adverse effects, EMS precautions, overdose if relevant — HTML strings
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

### `summary`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |

A quick-recognition field. 1–2 sentences: what the drug is (class) and what patients take it for. No mechanism (that belongs in `moa`). No EMS flags or adverse effects (that belongs in `considerations`). No HTML. Plain text only.

The summary should match the style of the EMS drug summaries — concise and direct.

**Do:**
- `"An ACE inhibitor used for hypertension, heart failure, and diabetic nephropathy. One of the most commonly prescribed blood pressure medications."`
- `"A cardioselective beta-1 blocker used for hypertension, angina, heart failure, and rate control in atrial fibrillation."`
- `"An atypical antipsychotic used for schizophrenia, bipolar disorder, and as an off-label sleep aid. Very commonly seen on home med lists."`

**Don't:**
- Mechanism in the summary: `"Blocks the conversion of angiotensin I to angiotensin II..."` — that's what `moa` is for
- EMS flags in the summary: `"Expect hypotension in the field..."` — that's what `considerations` is for
- Vague clinical language: `"May cause cardiovascular effects."`
- Dosing information

---

### `genericName`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |

Proper-case generic name as it appears on drug labeling.

**Do:**
- `"Lisinopril"`, `"Metoprolol"`, `"Valproic Acid"`, `"Hydrocodone/Acetaminophen"`

---

### `tradeNames`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes (use `[]` if none) |

Array of trade name strings. One entry per distinct brand. Medics frequently encounter brand names on bottles — this field is what allows them to map an unfamiliar label back to a known drug.

**Do:**
- `["Zestril", "Prinivil"]`
- `["Lopressor", "Toprol-XL"]`
- `["Coumadin", "Jantoven"]`
- `["Norco", "Vicodin"]` — combination drugs list all major brand names
- `[]` — if no widely recognized brand names exist

---

### `category`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes |
| **Min length** | 1 |

Array of clinical groupings for front-end filtering. A drug appears under every category it belongs to.

Categories describe **what type of condition the patient is being treated for** — not pharmacological class. Pharmacological class belongs in `classes`.

#### Category Enums

| Value | Definition |
|-------|------------|
| `"Cardiovascular"` | Drugs used to manage blood pressure, heart rate, heart failure, angina, or cardiac rhythm in the outpatient setting. Includes ACE inhibitors, ARBs, beta blockers, calcium channel blockers, nitrates, and cardiac glycosides. |
| `"Anticoagulation"` | Drugs that reduce clotting or platelet aggregation. Includes warfarin, DOACs (apixaban, rivaroxaban), and antiplatelets (clopidogrel, aspirin when used for cardiovascular prevention). Kept separate from Cardiovascular because the primary EMS implication is bleeding risk and reversal awareness. |
| `"Pulmonary"` | Drugs used to manage chronic respiratory conditions. Includes maintenance inhalers, bronchodilators, inhaled corticosteroids, and leukotriene modifiers for asthma and COPD. |
| `"Endocrine"` | Drugs that manage hormonal or metabolic conditions. Includes insulin, oral hypoglycemics, thyroid agents, and chronic corticosteroids. |
| `"Neurological"` | Drugs used to manage chronic neurological conditions. Includes anticonvulsants, antiparkinsonian agents, and migraine prophylaxis. |
| `"Psychiatric"` | Drugs used to manage mental health conditions. Includes antidepressants (SSRIs, SNRIs, TCAs, MAOIs), antipsychotics, mood stabilizers, anxiolytics, and sedative-hypnotics. Kept as its own category because overdose is the dominant EMS concern for this class. |
| `"Pain & Anti-inflammatory"` | Drugs used for chronic pain, inflammation, or musculoskeletal conditions. Includes home opioids, NSAIDs, muscle relaxants, and disease-modifying agents when used for pain. |
| `"GI"` | Drugs used to manage gastrointestinal conditions. Includes PPIs, H2 blockers, antiemetics, laxatives, and antidiarrheals when relevant to EMS context. |

**Rule:** Include every category that applies. List the most EMS-relevant category first.

**Examples:**
- **Metoprolol:** `["Cardiovascular"]`
- **Warfarin:** `["Anticoagulation", "Cardiovascular"]`
- **Aspirin (home dose for ACS prevention):** `["Anticoagulation", "Cardiovascular"]`
- **Amitriptyline:** `["Psychiatric", "Pain & Anti-inflammatory"]` — used for both depression and neuropathic pain
- **Prednisone:** `["Endocrine", "Pulmonary"]` — chronic steroid use

---

### `classes`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes |
| **Min length** | 1 |

Array of pharmacological class strings. These are the drug's formal classifications — not its clinical use category (that's `category`).

Use the preferred spellings below. Add new values only when none of the existing ones fit.

#### Preferred Class Spellings

```
ACE Inhibitor              Alpha-1 Antagonist         Antiarrhythmic
Anticoagulant              Anticonvulsant             Antidepressant
Antihistamine              Antihypertensive           Antiplatelet
Antipsychotic              Antipyretic                ARB
Atypical Antipsychotic     Benzodiazepine             Beta Blocker
Beta-2 Agonist             Biguanide                  Bronchodilator
Calcium Channel Blocker    Cardiac Glycoside          Cholinesterase Inhibitor
Corticosteroid             Direct Oral Anticoagulant (DOAC)
Direct Thrombin Inhibitor  Factor Xa Inhibitor        GLP-1 Agonist
H2 Blocker                 Hormone                    Hypnotic
Insulin                    LABA                       LAMA
Leukotriene Modifier       Loop Diuretic              MAOI
Mood Stabilizer            Muscle Relaxant            Nitrate
NSAID                      Opioid Analgesic           Potassium-Sparing Diuretic
Proton Pump Inhibitor      Sedative                   SGLT2 Inhibitor
SNRI                       SSRI                       Statin
Sulfonylurea               TCA                        Thiazide Diuretic
Thyroid Agent              Vasodilator                Vitamin K Antagonist
```

**Examples:**
- **Lisinopril:** `["ACE Inhibitor", "Antihypertensive"]`
- **Metoprolol:** `["Beta Blocker", "Antihypertensive", "Antiarrhythmic"]`
- **Amlodipine:** `["Calcium Channel Blocker", "Antihypertensive"]`
- **Warfarin:** `["Anticoagulant", "Vitamin K Antagonist"]`
- **Sertraline:** `["Antidepressant", "SSRI"]`
- **Amitriptyline:** `["Antidepressant", "TCA"]`

---

### `source`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |

Primary data source for this entry. Gives credibility and audit trail.

#### Source Values

| Value | When to use |
|-------|-------------|
| `"DailyMed"` | Primary source is FDA official drug labeling |
| `"StatPearls"` | Primary source is StatPearls |
| `"Mixed"` | Compiled from multiple sources |

---

### `moa`

| | |
|---|---|
| **Type** | `Array<MOAEntry>` |
| **Required** | Yes |
| **Min length** | 1 |

Array of mechanism-of-action entries. Each entry describes one mechanism by which the drug produces its clinical effects. Uses the same MOA structure as the EMS drug schema for front-end compatibility.

#### MOA Entry Object

```js
{
  brief: "",      // Required — HTML string rendered as body text on the card
  target: {       // Required — structured data rendered as scannable elements
    name: "",     // What the drug binds to / acts on
    action: "",   // How it acts on the target (see Action Enum)
    result: "",   // Clinical effect — rendered bold green, most prominent element
    system: ""    // Biological system (see System Enum)
  }
}
```

#### Front-End Rendering (how it displays on the card)

Each MOA entry renders top-to-bottom:
1. **Target name** — highlighted mono-font tag (color-coded by system) + **action badge** — uppercase label next to it (e.g. "BLOCKS", "INHIBITS")
2. **Result** — bold green text, 15px, font-weight 700. The most visually prominent line.
3. **Brief** — smaller body text (14px, regular weight). The prose explanation.

#### `brief`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |

One to two sentences tying the mechanism together in prose. This renders as supporting body text below the target and result. Written for a reader who understands pharmacology — don't define basic terms.

**Style rules:**
- Clinical and direct. State the mechanism plainly, connect it to the patient outcome.
- No figurative language. No hype words.
- HTML is allowed but rarely needed — the target/result structure already provides visual emphasis.

#### `target`

| | |
|---|---|
| **Type** | `object` |
| **Required** | Yes |

Structured metadata about what the drug acts on and what happens.

##### `target.name`
What the drug binds to or acts on. Free text.
- `"Beta-1 adrenergic receptors"`, `"Angiotensin-converting enzyme (ACE)"`, `"HMG-CoA reductase"`, `"COX-1 & COX-2"`, `"Mu-opioid receptors"`

##### `target.action`
How the drug acts on the target. Use the Action Enum below.

##### `target.result`
The clinical effect for the patient. This is the most visually prominent text on the card (bold green). Keep it short and scannable — use ↓/↑ arrows for physiological changes.
- `"↓ HR, ↓ contractility, ↓ BP"`, `"↓ Vasoconstriction, ↓ aldosterone, ↓ preload/afterload"`, `"Bronchodilation"`

##### `target.system`
Biological system classification. Use the System Enum below.

#### Action Enum

| Value | Meaning | Example |
|-------|---------|--------|
| `"agonist"` | Activates the receptor | Albuterol → β-2 |
| `"antagonist"` | Blocks by competing for the receptor | Losartan → AT1 |
| `"blocker"` | Blocks an ion channel or transporter | Amlodipine → Ca²⁺ channels |
| `"enhancer"` | Potentiates existing activity | Gabapentin → GABA (indirect) |
| `"inhibitor"` | Inhibits an enzyme | Lisinopril → ACE |
| `"stimulator"` | Triggers a biological process | Semaglutide → GLP-1 |
| `"stabilizer"` | Stabilizes cell membranes | Phenytoin → Na⁺ channels |
| `"donor"` | Provides a substrate | Levothyroxine → T4 |
| `"modulator"` | Modulates receptor/channel activity without simple on/off | Lithium → multiple second messengers |

#### System Enum

| Value | Covers |
|-------|--------|
| `"adrenergic"` | α and β receptors — metoprolol, carvedilol, clonidine, tamsulosin |
| `"cholinergic"` | Muscarinic / nicotinic receptors — ipratropium, donepezil |
| `"opioid"` | μ, κ, δ receptors — hydrocodone, oxycodone, tramadol |
| `"GABAergic"` | GABA-A receptors — alprazolam, clonazepam, zolpidem, gabapentin |
| `"serotonergic"` | 5-HT receptors — SSRIs, SNRIs, trazodone |
| `"dopaminergic"` | D1/D2 receptors — aripiprazole, haloperidol, quetiapine |
| `"glutamatergic"` | NMDA receptors — memantine |
| `"ion-channel"` | Na⁺/K⁺/Ca²⁺ channels — amlodipine, diltiazem, phenytoin |
| `"enzymatic"` | COX, PDE, HMG-CoA reductase, ACE, etc. — aspirin, statins, lisinopril, omeprazole |
| `"metabolic"` | Glucose / glycogen / thyroid pathways — insulin, metformin, levothyroxine |
| `"inflammatory"` | Glucocorticoid receptors — prednisone |
| `"coagulation"` | Clotting cascade — warfarin, apixaban, clopidogrel |
| `"histaminergic"` | H1/H2 receptors — diphenhydramine, cetirizine, loratadine |
| `"hormonal"` | Hormone receptors — oral contraceptives, testosterone |
| `"purinergic"` | Adenosine / uric acid pathways — allopurinol, colchicine |
| `"other"` | Mechanisms that don't fit above — hydroxychloroquine, methotrexate |

#### When to use multiple MOA entries

For most home meds, **a single MOA entry is sufficient.** Use multiple entries only when the drug acts through genuinely distinct mechanisms that produce different clinical effects.

```js
// Single mechanism — most drugs
moa: [
  {
    brief: "Inhibits HMG-CoA reductase, the rate-limiting enzyme in cholesterol synthesis, reducing hepatic cholesterol production and increasing LDL receptor expression.",
    target: {
      name: "HMG-CoA reductase",
      action: "inhibitor",
      result: "↓ Hepatic cholesterol synthesis, ↑ LDL receptor expression",
      system: "enzymatic"
    }
  }
]

// Multiple mechanisms — carvedilol (alpha + beta blocker)
moa: [
  {
    brief: "Blocks alpha-1 adrenergic receptors, causing vasodilation and reducing peripheral vascular resistance.",
    target: {
      name: "Alpha-1 adrenergic receptors",
      action: "antagonist",
      result: "Vasodilation, ↓ SVR",
      system: "adrenergic"
    }
  },
  {
    brief: "Non-selectively blocks beta-1 and beta-2 adrenergic receptors, slowing heart rate and reducing myocardial contractility.",
    target: {
      name: "Beta-1 & Beta-2 adrenergic receptors",
      action: "antagonist",
      result: "↓ HR, ↓ contractility",
      system: "adrenergic"
    }
  }
]
```

---

### `patientIndications`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes |
| **Min length** | 1 |

Simple string array listing why patients are prescribed this drug. Condition names only — no dose structures, no routes, no clinical detail.

This tells the medic what the patient's underlying medical history likely includes when they see this drug on a med list.

**Do:**
- `["Hypertension", "Heart failure", "Diabetic nephropathy", "Post-MI"]`
- `["Atrial fibrillation", "DVT prophylaxis", "Mechanical heart valve"]`
- `["Type 2 diabetes"]`
- `["Depression", "Generalized anxiety disorder", "OCD", "PTSD"]`

**Don't:**
- Clinical notes or caveats — keep it to condition names only
- Dosing information
- `["Used for hypertension and heart failure"]` — not a label, just list the conditions

**Style:** Capitalize each word. Use the condition name a paramedic would recognize.

---

### `considerations`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | Yes (use `[]` if none) |
| **Max length** | 5 |

Array of HTML strings. **Maximum 5 entries.** These are the 5 most important things a medic needs to know about this drug on a call. This is where adverse effects, EMS precautions, and overdose information live — merged into one field because the distinction between "adverse effect" and "precaution" doesn't hold up well in the prehospital context.

Prioritize ruthlessly. If a drug has 10 possible considerations, pick the 5 that are most likely to matter on a prehospital call. The goal is signal, not completeness.

#### What belongs here

- Adverse effects with prehospital relevance (hypotension, bradycardia, hypoglycemia, sedation, bleeding)
- Drug-class precautions a medic should know on a call
- Overdose findings and EMS relevance — **only include when the drug has significant overdose concern** (TCAs, digoxin, insulin, lithium, beta blockers, CCBs, opioids) or when overdose produces a recognizable prehospital toxidrome. Skip it for drugs where overdose is uncommon or non-specific (lisinopril, statins, PPIs).
- Narrow therapeutic index warnings

#### What doesn't belong here

- Chronic monitoring parameters (INR levels, renal function labs, therapeutic drug levels)
- In-hospital treatment beyond EMS scope
- Rare adverse effects with no prehospital significance
- Dosing information

#### Style rules

- **One idea per entry.** Each string is one clinically actionable statement — one to two sentences max.
- **Be specific.** Don't say "cardiac effects" — say "bradycardia and hypotension."
- **Connect to the call.** Don't just name the adverse effect — explain why it matters in the field when non-obvious.
- **Overdose entries** should describe what the medic would see (presentation/toxidrome) and any prehospital-relevant management. Don't detail in-hospital protocols.

#### HTML Highlight Spans

Use inline `<span>` tags with highlight classes to visually emphasize key clinical terms. These are rendered by the front-end with colored text.

| CSS Class | Color | Use for |
|-----------|-------|---------|
| `hl hl--general` | Blue | General information, neutral emphasis |
| `hl hl--drug` | Amber | Drug names, trade names |
| `hl hl--indication` | Green | Indications, desired therapeutic effects |
| `hl hl--ci` | Red | Contraindications, dangerous effects, toxicity |
| `hl hl--warn` | Orange | Warnings, precautions, risk factors |
| `hl hl--moa` | Cyan | Mechanism of action concepts |

**Syntax:** `<span class="hl hl--ci">hypotension</span>`

**Rules:**
- Use highlights to draw the eye to the clinically critical term — not to decorate every noun.
- One to two highlights per consideration entry is typical. Don't over-highlight.
- The highlight should be on the key clinical term itself (the adverse effect, the drug name, the condition), not on filler words.

**Do:**
```js
'Can cause significant <span class="hl hl--ci">hypotension</span>, especially in volume-depleted patients or those on multiple antihypertensives.'
```

**Don't:**
```js
'<span class="hl hl--general">Can cause</span> <span class="hl hl--ci">significant hypotension</span>, <span class="hl hl--warn">especially</span> in volume-depleted patients.'
// Too many highlights — cluttered and distracting
```

#### Examples

```js
// Lisinopril — no overdose section (uncommon, non-specific)
considerations: [
  'Can cause significant <span class="hl hl--ci">hypotension</span>, especially in volume-depleted patients or those on multiple antihypertensives — a dry, hot patient on lisinopril is at high risk.',
  '<span class="hl hl--ci">Angioedema</span> is a rare but life-threatening adverse effect — rapid swelling of the lips, tongue, or airway. Manage as an airway emergency. More common in Black patients.',
  'A persistent dry cough is the most common adverse effect — patients often report it. Not dangerous, but important for history-taking.',
  'Does not cause reflex tachycardia — heart rate will not reliably compensate for hypotension.'
]

// Metoprolol — 5 entries max, overdose included (beta blocker OD is a known prehospital emergency)
considerations: [
  'Causes <span class="hl hl--ci">bradycardia</span> and <span class="hl hl--ci">hypotension</span> — worsened by calcium channel blockers, digoxin, or clonidine.',
  'Masks <span class="hl hl--warn">tachycardia</span> in hypoglycemia, hypovolemia, and anaphylaxis — a normal heart rate does not mean stable.',
  'Patients may be <span class="hl hl--warn">unresponsive to standard epi doses</span> during anaphylaxis.',
  'Abrupt discontinuation causes <span class="hl hl--ci">rebound hypertension</span> and can precipitate angina or MI.',
  '<span class="hl hl--ci">Overdose</span>: severe bradycardia, hypotension, heart block. Prehospital: atropine, glucagon, calcium, transcutaneous pacing.'
]
```

---

## Validation Rules

```js
function validateHomeMed(entry) {
  // Rule 1: id is required, lowercase, hyphenated
  if (!entry.id || entry.id !== entry.id.toLowerCase()) {
    error(`Invalid id: "${entry.id}"`);
  }

  // Rule 2: summary is required
  if (!entry.summary) error(`Missing summary for ${entry.id}`);

  // Rule 3: genericName is required
  if (!entry.genericName) error(`Missing genericName for ${entry.id}`);

  // Rule 4: tradeNames must be an array
  if (!Array.isArray(entry.tradeNames)) error(`tradeNames must be array for ${entry.id}`);

  // Rule 5: category must be non-empty array of valid enums
  const validCategories = [
    "Cardiovascular", "Anticoagulation", "Pulmonary", "Endocrine",
    "Neurological", "Psychiatric", "Pain & Anti-inflammatory", "GI"
  ];
  if (!Array.isArray(entry.category) || entry.category.length === 0) {
    error(`category must be non-empty array for ${entry.id}`);
  }
  entry.category.forEach(c => {
    if (!validCategories.includes(c)) error(`Invalid category "${c}" for ${entry.id}`);
  });

  // Rule 6: classes must be non-empty array
  if (!Array.isArray(entry.classes) || entry.classes.length === 0) {
    error(`classes must be non-empty array for ${entry.id}`);
  }

  // Rule 7: source must be a valid value
  const validSources = ["DailyMed", "StatPearls", "Mixed"];
  if (!validSources.includes(entry.source)) {
    error(`Invalid source "${entry.source}" for ${entry.id}`);
  }

  // Rule 8: moa must be non-empty array, each entry must have brief + target
  if (!Array.isArray(entry.moa) || entry.moa.length === 0) {
    error(`moa must be non-empty array for ${entry.id}`);
  }
  entry.moa.forEach((m, i) => {
    if (!m.brief) error(`moa entry ${i} missing brief for ${entry.id}`);
    if (!m.target) error(`moa entry ${i} missing target for ${entry.id}`);
    if (m.target) {
      if (!m.target.name) error(`moa entry ${i} target missing name for ${entry.id}`);
      if (!m.target.action) error(`moa entry ${i} target missing action for ${entry.id}`);
      if (!m.target.result) error(`moa entry ${i} target missing result for ${entry.id}`);
      if (!m.target.system) error(`moa entry ${i} target missing system for ${entry.id}`);
    }
  });

  // Rule 9: patientIndications must be non-empty array of strings
  if (!Array.isArray(entry.patientIndications) || entry.patientIndications.length === 0) {
    error(`patientIndications must be non-empty array for ${entry.id}`);
  }

  // Rule 10: considerations must be an array, max 5 entries
  if (!Array.isArray(entry.considerations)) {
    error(`considerations must be array for ${entry.id}`);
  }
  if (entry.considerations.length > 5) {
    error(`considerations exceeds 5-entry max for ${entry.id}`);
  }
}
```

---

## Full Entry Example — Lisinopril

```js
{
  id: "lisinopril",
  summary: "An ACE inhibitor used for hypertension, heart failure, and diabetic nephropathy. One of the most commonly prescribed blood pressure medications.",
  genericName: "Lisinopril",
  tradeNames: ["Zestril", "Prinivil"],
  category: ["Cardiovascular"],
  classes: ["ACE Inhibitor", "Antihypertensive"],
  source: "DailyMed",
  moa: [
    {
      brief: "Inhibits ACE, blocking the conversion of angiotensin I to angiotensin II — reducing vasoconstriction and aldosterone release, which lowers blood pressure and decreases cardiac preload and afterload.",
      target: {
        name: "Angiotensin-converting enzyme (ACE)",
        action: "inhibitor",
        result: "↓ Vasoconstriction, ↓ aldosterone, ↓ preload/afterload",
        system: "enzymatic"
      }
    }
  ],
  patientIndications: ["Hypertension", "Heart failure", "Diabetic nephropathy", "Post-MI"],
  considerations: [
    'Can cause significant <span class="hl hl--ci">hypotension</span>, especially in volume-depleted patients or those on multiple antihypertensives.',
    '<span class="hl hl--ci">Angioedema</span> is a rare but life-threatening adverse effect — rapid swelling of the lips, tongue, or airway. Manage as an airway emergency.',
    'A persistent dry cough is the most common adverse effect — not dangerous, but useful for history-taking.',
    'Does not cause reflex tachycardia — heart rate will not reliably compensate for hypotension.',
    'Hyperkalemia risk, especially in renal impairment or when combined with potassium-sparing diuretics.'
  ]
}
```

---

## Quick-Reference Cheat Sheet

```
{
  id                    // lowercase, hyphenated — unique key
  summary               // 1–2 sentences — what it is + why patients take it (plain text, no HTML)
  genericName           // proper-case generic name
  tradeNames[]          // brand names found on bottles
  category[]            // clinical grouping enums (8 values — see Category Enums)
  classes[]             // pharmacological classes (see Preferred Class Spellings)
  source                // "DailyMed" | "StatPearls" | "Mixed"
  moa[]                 // { brief, target: { name, action, result, system } }
  patientIndications[]  // why patients take it — condition name strings
  considerations[]      // HTML strings — max 5, the most important things a medic needs to know
}
```

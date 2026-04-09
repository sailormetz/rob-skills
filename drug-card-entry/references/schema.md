# Drug Object Schema

Full reference for `data/drugs.js` entries.

**Source of truth.** This file defines the contract between data and front-end.

## EMS Scope

Every field is filtered through one lens: **a paramedic on a prehospital call**.

**Include:**
- Indications a paramedic would treat in the field
- Single-encounter prehospital doses only — no multi-day regimens, no drips requiring lab monitoring
- Adverse effects observable within the prehospital window
- CIs and precautions clinically relevant to the field

**Exclude:**
- Hospital maintenance dosing or discharge prescriptions
- Indications specific to ICU, OR, or inpatient care
- Dosing that requires real-time lab values to titrate safely

> **When in doubt:** Would a paramedic give this, at this dose, for this reason, on a call? If no — leave it out.

---

## Data Sources

Every drug entry is verified against authoritative sources before being committed. Use sources in this order:

**1. Primary (always check first)**
- **NASEMSO EMS Pharmacology Reference** (`references/NASEMSO-pharmacology-reference.md`) — the curated prehospital pharmacology reference derived from NASEMSO 2022 v3.0. Check here first for indications, doses, CIs, and MOA.

**2. Secondary (fill gaps NASEMSO doesn't cover)**
- **AHA ACLS/PALS Guidelines** — gold standard for cardiac arrest, arrhythmia, and resuscitation dosing. Most recent major update 2020, focused updates 2023 and 2025.
- **StatPearls** (statpearls.com) — peer-reviewed, continuously updated. Good general clinical reference.
- **DailyMed** (dailymed.nlm.nih.gov) — FDA official drug labeling. Best source for adverse effects, exact formulations, pregnancy warnings, and pharmacokinetics.
- **NAEMSP Position Statements** — high-quality, peer-reviewed papers on specific prehospital topics (ketamine for agitation, prehospital blood products, etc.).
- **ITLS / PHTLS textbooks** — trauma-related pharmacology context. Less granular on dosing.
- **Lexicomp / Epocrates** — excellent for onset/duration, drug interactions, and renal/hepatic dosing adjustments.

**Rule:** NASEMSO pharmacology reference is always checked first. All other sources are secondary and may be consulted in any order to fill gaps.

---

## JS Object Template

```js
{
  id: "generic-name",             // lowercase, hyphenated
  summary: "",                    // One-liner: what it is + when you reach for it
  genericName: "",
  tradeNames: [],                 // Array of trade name strings
  category: [],                   // Clinical categories — array (see Category Enums)
  classes: [],                    // Pharmacological classes
  source: "",                     // Primary data source (see Source Values)
  moa: [],                        // Array of MOA entries (see MOA section below)

  indications: [                  // Array of indication objects (see Indications section)
    { name: "" },
    { name: "", sameDoseAs: "" }    // Optional — points to another indication's dosing
  ],
  contraindications: [
    { text: "" },
    { text: "", relative: true }
  ],
  doses: [
    {
      population: "Adult",        // Enum (see Population Enums)
      // qualifier: "",           // Optional — age/weight split (e.g. "<65 yrs", ">10 kg"). Omit if not needed.
      // indication: "",          // Optional — must match an indications[].name value. Omit if drug has single indication.
      // formulation: "",         // Optional — vial/concentration. Omit if drug has single concentration.
      onset: "",                  // Time to clinical effect (see Onset/Duration below)
      duration: "",               // Duration of clinical effect (see Onset/Duration below)
      routes: [
        {
          via: ["IV", "IO"],
          amount: "5 mg",
          // repeat: "",          // Optional — omit if not repeatable
          // maxDose: "",         // Optional — omit if no ceiling
          notes: []               // Route-specific admin notes
        }
      ],
      notes: []                   // General notes for this population/indication combo
    }
  ],
  adverseEffects: [],            // Array of plain text strings — no HTML
  precautions: []                // Array of HTML strings — rendered as list items
}
```

---

## Field Reference

### `id`
Lowercase, hyphenated generic name. Must be unique.
- ✅ `"epinephrine"`, `"calcium-chloride"`, `"lactated-ringers"`

### `summary`
One to two sentences. What it is + when a paramedic reaches for it. No HTML. Clinical and direct: states what the drug is and why you reach for it without editorializing or overselling. No figurative language, no hype words.

Examples:
- **Fentanyl:** `"A synthetic opioid analgesic used for severe pain and procedural sedation. Roughly 100 times more potent than morphine by weight."`
- **Flumazenil:** `"A benzodiazepine antagonist used to reverse benzo-induced sedation and respiratory depression. Short duration means resedation is common."`
- **Glucagon:** `"A hormone that raises blood glucose in hypoglycemia when IV access is not available. Also used as an antidote for beta-blocker and calcium channel blocker overdose."`
- **Droperidol:** `"An antipsychotic and antiemetic used for acute agitation and nausea. Carries an FDA black box warning for QT prolongation and fatal dysrhythmias."`
- **Hydralazine:** `"A direct arteriolar vasodilator used for hypertensive emergencies and acute heart failure. Causes reflex tachycardia, often paired with a beta-blocker."`

### `genericName`
Proper-case generic name as it appears on the drug label.

### `tradeNames`
Array of trade name strings. One entry per distinct brand.
- ✅ `["Adrenalin", "EpiPen"]`
- ✅ `["Proventil", "Ventolin", "ProAir"]`
- ✅ `["Narcan"]` — single-brand drugs still use an array
- If no trade name exists: `[]`

### `category`
Array of clinical groupings for front-end filtering. A drug appears under every category it belongs to.

Design rule: Categories describe *clinical scenarios on a call* — not pharmacological classes. If a category name also appears in classes, it belongs in classes only.

#### Category Enums

| Value | Definition |
|-------|------------|
| `"Airway & Respiratory"` | Drugs used to open, maintain, or protect the airway, or treat respiratory distress. Includes bronchodilators, supplemental oxygen, nebulized agents, and neuromuscular blockers used for intubation. |
| `"Allergic & Immune"` | Drugs used to treat allergic reactions and immune-mediated responses short of anaphylaxis. Includes H1 and H2 blockers and corticosteroids given for allergic indications. Does not include epinephrine for anaphylaxis (that's Resuscitation). |
| `"Cardiovascular"` | Drugs used to manage heart rate, rhythm, blood pressure, or cardiac output in patients with a pulse. Includes antiarrhythmics, rate controllers, vasopressors outside of arrest, antihypertensives, nitrates, antiplatelet agents, inotropes, and diuretics. |
| `"Endocrine & Metabolic"` | Drugs that correct metabolic derangements in the field. Includes glucose replacement, electrolyte correction, cofactors like thiamine, and acid-base agents like sodium bicarbonate when given for a metabolic indication. |
| `"IV Fluids"` | Crystalloid and colloid solutions administered for volume resuscitation, medication dilution, or maintenance access. |
| `"Nausea & Vomiting"` | Drugs given primarily to treat or prevent nausea and vomiting in the field. A drug belongs here when nausea/vomiting is the clinical reason it's being administered — not when antiemesis is a secondary pharmacological property. |
| `"Neurological"` | Drugs used to manage seizures, acute psychosis, or behavioral emergencies. Includes anticonvulsants and antipsychotics when used for a neurological or behavioral indication. Does not include the same drugs when used purely for procedural sedation (that's Sedation & Anesthesia). |
| `"OB/GYN"` | Drugs used in obstetric and gynecological emergencies. Includes tocolytics, uterotonics, and eclampsia management. A drug belongs here when the clinical indication is pregnancy- or delivery-specific. |
| `"Pain Management"` | Drugs administered to treat pain in the prehospital setting. Includes opioids, non-opioids, dissociatives, and local anesthetics when the clinical reason is analgesia. |
| `"Resuscitation"` | Drugs used during cardiac arrest or in the immediate post-ROSC period. A drug belongs here when it's being given as part of ACLS/PALS arrest algorithms or post-arrest stabilization — not simply because it can support blood pressure. |
| `"Sedation & Anesthesia"` | Drugs used for procedural sedation, RSI induction, or neuromuscular blockade. Includes induction agents, dissociatives, benzodiazepines, and paralytics when the clinical reason is facilitating a procedure — not seizure control or behavioral management. |
| `"Toxicology"` | Drugs used to treat poisoning, overdose, or toxic exposure. Includes specific antidotes, reversal agents, and decontamination agents. A drug belongs here when the indication is reversing or counteracting a toxin. |
| `"Trauma & Hemorrhage"` | Drugs used to control bleeding or support hemostasis in trauma. Includes antifibrinolytics, procoagulant reversal agents, and topical/nasal vasoconstrictors given for hemorrhage control. |

**Rule:** Include every category that applies. List the primary use first. Front-end filters with `drug.category.includes(filter)`.

**Note:** `category` is a coarse clinical filter maintained by the author — it is NOT derived from `indications[].name`. Categories group drugs by *call type* (e.g. "Cardiovascular"), while indications list specific conditions (e.g. "Cardiac Arrest"). They will overlap conceptually but are maintained independently.

Examples:
- **Epinephrine:** `["Resuscitation", "Cardiovascular", "Airway & Respiratory"]`
- **Amiodarone:** `["Cardiovascular", "Resuscitation"]`
- **Magnesium Sulfate:** `["Cardiovascular", "OB/GYN", "Airway & Respiratory"]`
- **Ketamine:** `["Pain Management", "Neurological", "Sedation & Anesthesia"]`
- **Naloxone:** `["Toxicology"]` — single-category drugs still use an array
- **Ondansetron:** `["Nausea & Vomiting"]`
- **Tranexamic Acid:** `["Trauma & Hemorrhage"]`
- **Droperidol:** `["Neurological", "Nausea & Vomiting", "Sedation & Anesthesia"]`

### `classes`
Array of pharmacological class strings. These are the drug's formal classifications, not its use category.

Examples:
- **Epinephrine:** `["Sympathomimetic", "Catecholamine", "Vasopressor"]`
- **Diltiazem:** `["Class IV Antiarrhythmic", "Calcium Channel Blocker"]`
- **Naloxone:** `["Opioid Antagonist", "Antidote"]`
- **Albuterol:** `["Bronchodilator", "Beta-2 Agonist", "Sympathomimetic"]`
- **Magnesium Sulfate:** `["Electrolyte", "Anticonvulsant", "Antiarrhythmic", "Bronchodilator"]`
- **Aspirin:** `["NSAID", "Antiplatelet"]`
- **Atropine:** `["Anticholinergic", "Vagolytic"]`
- **Ketamine:** `["Dissociative Anesthetic", "Analgesic", "Sedative"]`
- **Droperidol:** `["Antipsychotic", "Antiemetic", "Butyrophenone"]`

**Not an enum** — add new values when none of the existing ones fit. But use these preferred spellings for consistency across the dataset:

```
Adsorbent                    Alkalinizing Agent       Alpha-1 Agonist
Alpha-1 Antagonist           Analgesic
Anticholinergic            Anticoagulant            Anticonvulsant
Antidiuretic               Antidote                 Antiemetic
Antifibrinolytic           Antihistamine            Antihypertensive
Antiplatelet               Antipsychotic            Antipyretic
Benzodiazepine             Benzodiazepine Antagonist  Beta-1 Agonist
Beta-2 Agonist
Beta Blocker               Bronchodilator           Butyrophenone
Calcium Channel Blocker    Carbohydrate             Catecholamine
Chronotrope                Class Ia Antiarrhythmic  Class Ib Antiarrhythmic
Class II Antiarrhythmic    Class III Antiarrhythmic Class IV Antiarrhythmic
Class V Antiarrhythmic     Corticosteroid           Crystalloid
Cyanide Antagonist         Dissociative Anesthetic  Dromotrope
Electrolyte                Hemostatic               Hormone
Hypnotic                   Induction Agent          Inotrope
Local Anesthetic           Loop Diuretic            Medical Gas
Nitrate
NSAID                      Opioid Analgesic         Opioid Antagonist
Osmotic Diuretic           Paralytic                Phenothiazine
Potassium Channel Blocker  Sedative                 Sodium Channel Blocker
Sympathomimetic            Tocolytic                Uterotonic
Vagolytic                  Vasodilator              Vasopressor
Vitamin
```

### `source`
Primary data source for this entry. Gives credibility and audit trail.

#### Source Values

| Value | When to use |
|-------|-------------|
| `"NASEMSO 2022 v3.0"` | Data sourced from NASEMSO pharmacology reference |
| `"AHA 2020/2023"` | Data sourced from AHA ACLS/PALS guidelines |
| `"StatPearls"` | Supplemental data from StatPearls |
| `"DailyMed"` | Data from FDA official drug labeling |
| `"NAEMSP"` | Data from NAEMSP position statement |
| `"Mixed"` | Core from NASEMSO, supplemented by other sources |

---

## Indications

Array of indication objects. This is the **single source of truth** — every `doses[].indication` value must be an exact match to an `indications[].name` on the same drug.

### Indication Object

```js
{
  name: "",          // Required — the clinical condition
  sameDoseAs: ""     // Optional — points to another indication's name that shares identical dosing
}
```

### `name` — the clinical condition
Required. Short clinical label. This string appears:
- On the card's indications list (always)
- As a dose tab label (only if a dose entry references it)

**Ordering:** List the most common or life-threatening EMS use first. Array order determines tab order on the front end.

### `sameDoseAs` — shared dosing pointer (optional)
When present, tells the student: "this condition uses the same dose as [that other indication]." The value must exactly match another `indications[].name` on the same drug that has at least one dose entry.

**When to use:** The drug is indicated for a condition, but the dose is identical to another condition's dose. Instead of duplicating dose entries with the same numbers, point to the existing one.

**When NOT to use:** If the dose differs at all (different amount, different route, different max) — create a separate dose entry instead.

### Relationship to `doses[].indication`

```
indications[].name     →  the COMPLETE clinical list (displayed on card)
doses[].indication     →  the SUBSET that has unique dosing (drives tabs)
sameDoseAs             →  links an indication without unique dosing to one that has it
```

Not every indication needs a dose tab. A drug can be indicated for 5 conditions but only have 3 dose groupings. The indications without dose entries should use `sameDoseAs` to point to the one they share dosing with.

### Rules

0. If a drug has **multiple indications**, its dose entries **must** use the `indication` field — otherwise the front end can't build tabs
1. Every `doses[].indication` value **must** be an exact member of the drug's `indications[].name` list
2. Every `sameDoseAs` value **must** match an `indications[].name` that has at least one dose entry
3. Indications without `sameDoseAs` and without any matching dose entry are **validation errors** — the data is incomplete
4. An indication with its own dose entries should **never** have `sameDoseAs` — pick one or the other

### Validation

```js
function validateIndications(drug) {
  const names = drug.indications.map(i => i.name);
  const doseInds = new Set(drug.doses.map(d => d.indication).filter(Boolean));

  // Rule 0: multi-indication drugs must use indication on dose entries
  if (drug.indications.length > 1 && !drug.doses.some(d => d.indication)) {
    error(`Drug has ${drug.indications.length} indications but no dose entries use indication field`);
  }

  // Rule 1: every dose tab must match an indication name
  drug.doses.forEach(d => {
    if (d.indication && !names.includes(d.indication)) {
      error(`"${d.indication}" in doses but not in indications[]`);
    }
  });

  // Rule 2: every sameDoseAs must point to a name with dose entries
  drug.indications.forEach(ind => {
    if (ind.sameDoseAs && !doseInds.has(ind.sameDoseAs)) {
      error(`${ind.name} sameDoseAs "${ind.sameDoseAs}" has no dose tab`);
    }
  });

  // Rule 3: every indication must be accounted for
  drug.indications.forEach(ind => {
    if (!ind.sameDoseAs && doseInds.size > 0 && !doseInds.has(ind.name)) {
      error(`${ind.name} has no dose tab and no sameDoseAs — data incomplete`);
    }
  });

  // Rule 4: sameDoseAs must not coexist with own dose entries
  drug.indications.forEach(ind => {
    if (ind.sameDoseAs && doseInds.has(ind.name)) {
      error(`${ind.name} has both dose entries and sameDoseAs — pick one`);
    }
  });
}
```

### Front-end rendering

```js
// Card indications list
drug.indications.forEach(ind => {
  renderIndicationRow(ind.name);
  if (ind.sameDoseAs) {
    renderSharedDoseNote(ind.sameDoseAs);  // e.g. "→ see Hypoglycemia dosing"
  }
});
```

### Examples

**Glucagon — 4 indications, 2 dose groupings:**
```js
indications: [
  { name: "Hypoglycemia" },
  { name: "CCB/BB Overdose" },
  { name: "Insulin Overdose", sameDoseAs: "Hypoglycemia" },
  { name: "Esophageal Obstruction", sameDoseAs: "Hypoglycemia" }
],
// Only "Hypoglycemia" and "CCB/BB Overdose" appear as dose tabs.
// Card shows all 4 indications. Insulin OD and Esophageal Obstruction
// display "→ Hypoglycemia dosing" on the indications list.
doses: [
  { indication: "Hypoglycemia", population: "Adult", ... },
  { indication: "Hypoglycemia", population: "Pediatric", ... },
  { indication: "CCB/BB Overdose", population: "Adult", ... },
  { indication: "CCB/BB Overdose", population: "Pediatric", ... }
]
```

**Epinephrine — 5 indications, 4 dose groupings:**
```js
indications: [
  { name: "Anaphylaxis" },
  { name: "Cardiac Arrest" },
  { name: "Shock" },
  { name: "Croup / Bronchospasm" },
  { name: "Severe Allergic Reaction", sameDoseAs: "Anaphylaxis" }
],
// "Severe Allergic Reaction" shares anaphylaxis dosing — no separate tab.
// 4 tabs: Anaphylaxis | Cardiac Arrest | Shock | Croup / Bronchospasm
doses: [
  { indication: "Anaphylaxis", population: "Adult", ... },
  { indication: "Anaphylaxis", population: "Pediatric", ... },
  { indication: "Cardiac Arrest", population: "Adult", ... },
  { indication: "Cardiac Arrest", population: "Pediatric", ... },
  { indication: "Shock", population: "Adult", ... },
  { indication: "Shock", population: "Pediatric", ... },
  { indication: "Croup / Bronchospasm", population: "Adult", ... }
]
```

**Ondansetron — 1 indication, no tabs needed:**
```js
indications: [
  { name: "Nausea & Vomiting" }
],
// Single indication, no sameDoseAs, no dose tabs.
// doses[] entries have no indication field — they apply to everything.
doses: [
  { population: "Adult", onset: "...", duration: "...", routes: [...] },
  { population: "Pediatric", onset: "...", duration: "...", routes: [...] }
]
```

**Midazolam — 3 indications, all with different doses:**
```js
indications: [
  { name: "Seizures" },
  { name: "Agitation" },
  { name: "Sedation" }
],
// No sameDoseAs — all three have unique dosing.
// 3 tabs: Seizures | Agitation | Sedation
doses: [
  { indication: "Seizures", population: "Adult", ... },
  { indication: "Seizures", population: "Pediatric", ... },
  { indication: "Agitation", population: "Adult", ... },
  { indication: "Agitation", population: "Pediatric", ... },
  { indication: "Sedation", population: "Adult", ... },
  { indication: "Sedation", population: "Geriatric", ... }
]
```

---

## Dose Structure

### `doses` — top-level array
Each object = one population + onset/duration + optional qualifier + optional indication + routes.

### `doses[].population` — WHO gets this dose

#### Population Enums

| Value | Description |
|-------|-------------|
| `"Adult"` | Standard adult |
| `"Pediatric"` | Standard pediatric |
| `"Geriatric"` | Geriatric (typically ≥65) |
| `"Neonatal"` | Neonatal / newborn |

**Rule:** Only use these four values. Age/weight splits go in `qualifier`.

### `doses[].qualifier` — optional refinement
Free text string for age or weight splits. Only present when the population needs subdivision.

- ✅ `qualifier: "<65 yrs"`
- ✅ `qualifier: ">10 kg"`
- ✅ `qualifier: "≤10 kg"`
- ✅ `qualifier: "6–12 yrs"`
- ✅ `qualifier: "≥20 kg"`
- ❌ Don't bake qualifiers into population: `"Pediatric (>10 kg)"` → use `population: "Pediatric", qualifier: ">10 kg"`

### `doses[].indication` — WHAT FOR (optional)
Only present when the drug has different doses for different conditions. The value **must** be an exact match to one of the drug's `indications[].name` values — the top-level `indications` array is the single source of truth. No freestyling.

```js
// Given this indications array:
indications: [
  { name: "Seizures" },
  { name: "Agitation" }
],

// ✅ Good — values match indications[].name exactly
{ population: "Adult",     indication: "Seizures",  routes: [...] }
{ population: "Adult",     indication: "Agitation",  routes: [...] }
{ population: "Pediatric", indication: "Seizures",  routes: [...] }
{ population: "Pediatric", indication: "Agitation",  routes: [...] }

// ❌ Bad — "Behavioral Emergency" is not in indications[].name
{ population: "Adult",     indication: "Behavioral Emergency",  routes: [...] }

// ❌ Bad — peds entry has no indication, won't land under any tab
{ population: "Pediatric", routes: [...] }
```

**Rule:** If no `indication` field on any entry, the dose applies to ALL indications for that population.

**Consistency rule:** If ANY dose entry on a drug has `indication`, then ALL entries on that drug must have it. Orphaned entries without `indication` won't appear under any pathology tab.

**Membership rule:** Every `doses[].indication` string must appear in the drug's `indications[].name` list. See the Indications section above for full validation logic.

**When NOT to use:** If the dose is identical across all the drug's indications, omit `indication` entirely. No tabs will render. Don't create redundant tabs that show the same numbers — it looks like a bug.

**Front-end behavior:**
- 0 unique indications in doses → no tabs, flat dose list
- 2+ unique indications in doses → pathology tabs; each tab shows all populations for that indication

### `doses[].formulation` — WHICH vial or concentration (optional)
Only needed when a single drug comes in multiple concentrations that determine clinical use. Currently applies to epinephrine and dextrose.

```js
// Epinephrine
{ formulation: "1 mg/mL (1:1,000)",    indication: "Anaphylaxis",    ... }
{ formulation: "0.1 mg/mL (1:10,000)", indication: "Cardiac Arrest", ... }

// Dextrose
{ formulation: "D50W (50%)",  population: "Adult",     ... }
{ formulation: "D25W (25%)",  population: "Pediatric", qualifier: ">8 yrs", ... }
{ formulation: "D10W (10%)",  population: "Pediatric", ... }
```

**Front-end behavior:** Rendered as an inline badge on each dose row. This is safety information — NOT a tab dimension. Tabs are driven by `indication` only.

**When NOT to use:** If the drug comes in a single concentration (most drugs), omit entirely. Don't use empty strings.

Free text — include both the concentration and the common name.

### `doses[].onset` — time to clinical effect
Required. Free text string. Scoped to this population + indication combo.

When all routes in the entry share the same onset, use a flat string. When routes differ, separate with semicolons and include the route in parentheses.

- ✅ `"3–5 min"` — single value, all routes share it
- ✅ `"Immediate"` — IV/IO
- ✅ `"1–3 min (IV); 10–20 min (IM)"` — semicolons when routes differ

### `doses[].duration` — duration of clinical effect
Required. Same format as `onset`.

- ✅ `"5–15 min"`
- ✅ `"4–6 hrs"`
- ✅ `"Duration of infusion"` — for continuous drips
- ✅ `"15–30 min (IV); 1–2 hrs (IM)"` — semicolons when routes differ

**Semicolon format:** `"value (ROUTE); value (ROUTE)"`. Always include the route label in parentheses after each value when using semicolons.

### `doses[].routes` — array of route objects

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `via` | `string[]` | Yes | Array of route enums |
| `amount` | `string` | Yes | Number + unit ONLY |
| `repeat` | `string` | No | Re-dose interval and instructions |
| `maxDose` | `string` | No | Ceiling for this route/encounter |
| `notes` | `string[]` | Yes | Route-specific admin notes |

#### `amount` rules
✅ `"5 mg"`, `"0.2 mg/kg"`, `"2.5 mg in 3 mL NS"`, `"1–2 L"`, `"5–10 mcg/min"`
❌ `"5 mg slow push"` → admin instruction belongs in `notes`
❌ `"5 mg, may repeat"` → repeat info belongs in `repeat`
❌ `"Not recommended in EMS"` → omit the dose entry entirely

#### `repeat` examples
- `"q3–5 min"`
- `"q5–15 min PRN"`
- `"May repeat once after 15 min"`
- `"Repeat q5–10 min until secretions dry"`
- `"Single dose"` (when emphasizing no repeat)

#### `maxDose` examples
- `"3 mg total"`
- `"10 mg/dose"`
- `"300 mcg total"`
- `"3 mg/kg cumulative"`
- `"15 mg/kg/day"`

**Rule:** If there's no repeat or ceiling, omit the field entirely. Don't use empty strings.

### `doses[].notes` — general notes (array)
Notes that apply to ALL routes for this population/indication combo.

### Omitting populations — the "not available" rule
If a drug is not used for a population in EMS, **do not create a dose entry**. The front-end should display "Not indicated in prehospital setting" when no entry exists for a population.

### Front-end rendering logic

```js
function renderDoses(drug, container) {
  // 1. Derive tabs from unique indications in the data
  const indications = [...new Set(
    drug.doses.map(d => d.indication).filter(Boolean)
  )];

  // 2. Tabs only appear when multiple indications exist
  if (indications.length > 1) {
    renderTabs(indications, container);
  }

  // 3. Filter doses by active tab (or show all if no tabs)
  const activeInd = indications[activeTabIndex] || null;
  const filtered = activeInd
    ? drug.doses.filter(d => d.indication === activeInd)
    : drug.doses;

  // 4. Group by population within the active indication
  const byPop = groupBy(filtered, d => d.population);

  Object.entries(byPop).forEach(([pop, entries]) => {
    renderPopulationHeader(pop, container);

    entries.forEach(entry => {
      renderOnsetDuration(entry.onset, entry.duration, container);

      entry.routes.forEach(route => {
        // formulation renders as inline badge if present
        renderDoseRow(route, entry.formulation, container);
      });
    });
  });
}

// 5. When navigating from indications list, resolve sameDoseAs
function handleIndicationTap(ind, indications, setActiveTab) {
  const target = ind.sameDoseAs || ind.name;
  setActiveTab(target);
}
```

---

## Route Enums

| Enum | Meaning |
|------|---------|
| `IV` | Intravenous push/bolus |
| `IO` | Intraosseous |
| `IM` | Intramuscular |
| `IN` | Intranasal |
| `SQ` | Subcutaneous |
| `SL` | Sublingual |
| `PO` | Oral |
| `PR` | Rectal |
| `BUC` | Buccal |
| `ET` | Endotracheal |
| `NEB` | Nebulized |
| `NGT` | Nasogastric tube |
| `IV drip` | Continuous IV infusion |
| `Inhaled` | Demand valve / mask |
| `Topical` | Applied to skin/wound |

---

## MOA Structure

Every drug has `moa: [...]` — an array of MOA entry objects.

The renderer checks `moa[0].tier` to decide layout:
- **`tier` exists** → dose-tiered layout (dopamine)
- **No `tier`, length > 1** → simultaneous multi-target layout (epinephrine, glucagon)
- **No `tier`, length = 1** → plain prose (fentanyl, naloxone, most drugs)

### MOA Entry Object

```js
{
  brief: "",      // Required — HTML string for card display (rendered via innerHTML).
                  // Clinical and direct: states the mechanism plainly, then connects it to patient
                  // outcome where it adds value without editorializing or over-explaining.
                  // Written for someone who already knows the basics; does not define terms or
                  // justify itself. Target data (receptor names, actions) can appear when used
                  // conversationally — e.g. "Potentiates and directly activates the GABA-A
                  // receptor" — but should not mechanically restate the target object verbatim.
                  // One to three sentences, verbosity is fine when the mechanism warrants it.
                  // No figurative language.
  tier: "",       // Optional — only for dose-dependent drugs (see TIER enum)
  label: "",      // Optional — pairs with tier, free text (e.g. "Renal", "Cardiac")
  target: {       // Required — queryable metadata
    name: "",     // What the drug binds to / acts on
    action: "",   // How it acts on the target (see ACTION enum)
    result: "",   // Clinical effect for the patient
    system: "",   // Biological system (see SYSTEM enum)
    dose: ""      // Optional — only for dose-dependent drugs (e.g. "2–5 mcg/kg/min")
                  // NOTE: This is a DISPLAY LABEL for the MOA card only. The doses[] array
                  // is the source of truth for actual dosing. These may overlap but are maintained independently.
  }
}
```

### Action Enum

| Value | Meaning | Example |
|-------|---------|---------|
| `"agonist"` | Activates the receptor | Epinephrine → β-1 |
| `"antagonist"` | Blocks by competing for the receptor | Naloxone → μ-opioid |
| `"blocker"` | Blocks an ion channel or transporter | Amiodarone → K⁺ channels |
| `"enhancer"` | Potentiates existing activity | Midazolam → GABA-A |
| `"inhibitor"` | Inhibits an enzyme | Aspirin → COX |
| `"stimulator"` | Triggers a biological process | Glucagon → glycogenolysis |
| `"relaxant"` | Relaxes smooth muscle | Glucagon → GI smooth muscle |
| `"adsorbent"` | Physical binding | Activated charcoal → toxins |
| `"donor"` | Provides a substrate | Dextrose → glucose |
| `"stabilizer"` | Stabilizes cell membranes | Calcium chloride → cardiac membranes |

### System Enum

| Value | Covers |
|-------|--------|
| `"adrenergic"` | α and β receptors — epi, dopamine, dobutamine, albuterol, labetalol, metoprolol |
| `"cholinergic"` | Muscarinic / nicotinic receptors — atropine, ipratropium |
| `"opioid"` | μ, κ, δ receptors — fentanyl, morphine, hydromorphone, naloxone |
| `"GABAergic"` | GABA-A receptors — midazolam, diazepam, lorazepam, flumazenil, etomidate |
| `"serotonergic"` | 5-HT receptors — ondansetron |
| `"dopaminergic"` | D1/D2 receptors — haloperidol, droperidol |
| `"glutamatergic"` | NMDA receptors — ketamine, nitrous oxide |
| `"ion-channel"` | Na⁺/K⁺/Ca²⁺ channels — amiodarone, lidocaine, diltiazem, nicardipine, magnesium |
| `"enzymatic"` | COX, PDE, other enzymes — aspirin, ketorolac, acetaminophen, nitroglycerin |
| `"metabolic"` | Glucose / glycogen pathways — dextrose, glucagon, oral glucose |
| `"inflammatory"` | Glucocorticoid receptors — methylprednisolone, dexamethasone |
| `"coagulation"` | Clotting cascade — heparin, aspirin (antiplatelet) |
| `"histaminergic"` | H1/H2 receptors — diphenhydramine, famotidine |
| `"other"` | Physical / chemical mechanisms — activated charcoal, hydroxocobalamin, sodium bicarb, mannitol |

### Tier Enum

| Value | Description |
|-------|-------------|
| `"Low"` | Lowest dose range |
| `"Mod"` | Moderate dose range |
| `"High"` | Highest dose range |

### MOA Examples

**Simple — single mechanism (most drugs):**
```js
moa: [
  {
    brief: 'Suppresses pain signal transmission in the CNS by inhibiting neurotransmitter release. Produces potent analgesia and sedation with a rapid onset.',
    target: {
      name: "μ-opioid receptors",
      action: "agonist",
      result: "Potent analgesia & sedation",
      system: "opioid"
    }
  }
]
```

**Multi-receptor, simultaneous (epinephrine):**
```js
moa: [
  {
    brief: 'Causes widespread vasoconstriction and a rapid rise in systemic vascular resistance. This is what restores blood pressure in anaphylaxis.',
    target: { name: "α-1 receptors", action: "agonist", result: "Vasoconstriction, ↑ SVR", system: "adrenergic" }
  },
  {
    brief: 'Increases heart rate and myocardial contractility. In cardiac arrest, this raises coronary perfusion pressure between compressions and improves the likelihood of successful defibrillation.',
    target: { name: "β-1 receptors", action: "agonist", result: "↑ HR & contractility", system: "adrenergic" }
  },
  {
    brief: 'Relaxes bronchial smooth muscle, reversing bronchoconstriction. In anaphylaxis, this works faster and more reliably than any inhaled bronchodilator.',
    target: { name: "β-2 receptors", action: "agonist", result: "Bronchodilation", system: "adrenergic" }
  }
]
```

**Dose-dependent tiers (dopamine):**
```js
moa: [
  {
    tier: "Low", label: "Renal",
    brief: 'Dilates renal and splanchnic vessels, increasing blood flow to the kidneys.',
    target: { name: "D1 receptors", action: "agonist", result: "↑ renal blood flow", system: "dopaminergic", dose: "2–5 mcg/kg/min" }
  },
  {
    tier: "Mod", label: "Cardiac",
    brief: 'Increases heart rate and contractility, raising cardiac output.',
    target: { name: "β-1 receptors", action: "agonist", result: "↑ cardiac output", system: "adrenergic", dose: "5–10 mcg/kg/min" }
  },
  {
    tier: "High", label: "Vasopressor",
    brief: 'Causes widespread vasoconstriction, increasing systemic vascular resistance and blood pressure.',
    target: { name: "α-1 receptors", action: "agonist", result: "↑ SVR, ↑ BP", system: "adrenergic", dose: ">10 mcg/kg/min" }
  }
]
```

**Multi-pathway, different clinical uses (glucagon):**
```js
moa: [
  {
    brief: 'Triggers glycogen breakdown in the liver, releasing glucose into the bloodstream within minutes. Requires adequate hepatic glycogen stores to be effective.',
    target: { name: "Hepatic glycogen stores", action: "stimulator", result: "Rapid ↑ blood glucose", system: "metabolic" }
  },
  {
    brief: 'Increases cardiac contractility and heart rate by bypassing the beta-receptor entirely. This is what makes glucagon useful in beta-blocker overdose — the drug works even when those receptors are blocked.',
    target: { name: "Adenylyl cyclase (cardiac)", action: "stimulator", result: "Positive inotropy & chronotropy", system: "adrenergic" }
  },
  {
    brief: 'Relaxes lower esophageal sphincter tone, which can allow an impacted foreign body to pass. Effect is temporary and inconsistent.',
    target: { name: "GI smooth muscle", action: "relaxant", result: "Relieves esophageal obstruction", system: "other" }
  }
]
```

**Physical mechanism (activated charcoal):**
```js
moa: [
  {
    brief: 'Adsorbs toxins and drugs within the GI tract, preventing them from being absorbed into the bloodstream. Does not bind iron, lithium, potassium, ethanol, caustics, or hydrocarbons.',
    target: { name: "Toxins / drugs in GI lumen", action: "adsorbent", result: "Prevents systemic absorption", system: "other" }
  }
]
```

---

## Safety Fields — Why Three Different Shapes

The drug object has three fields that all relate to "warnings," each with a different data shape. This is intentional:

| Field | Shape | Why |
|-------|-------|-----|
| `contraindications` | `[{ text, relative? }]` | Needs the `relative` boolean for absolute vs. relative distinction — quiz and display logic depend on it |
| `precautions` | `["html strings"]` | Needs HTML for inline emphasis (`hl--danger`, `hl--warn`) — these are displayed as formatted list items |
| `adverseEffects` | `["plain strings"]` | Plain text is sufficient — these are simple labels rendered as a flat list, no formatting needed |

Do not normalize these into a single shape. The different structures serve different rendering and querying needs.

---

## Contraindications

```js
contraindications: [
  { text: "Hypersensitivity" },
  { text: "Decompensated Heart Failure", relative: true }
]
```

- `text` — the contraindication statement
- `relative` — set to `true` for relative/controversial CIs. Omit (or `false`) for absolute CIs.

---

## Precautions

Array of HTML strings. Each string = one discrete precaution, rendered as a list item.

```js
precautions: [
  'Use caution in <span class="hl hl--warn">elderly</span> — increased sensitivity to hypotension.',
  '<span class="hl hl--danger">Do not mix with sodium bicarbonate</span> — forms insoluble precipitate.',
  'Have <strong>naloxone</strong> immediately available when administering opioids.',
  'Masks hypoglycemia symptoms (tachycardia, tremor) in diabetic patients — monitor BGL.'
]
```

**Rules:**
- One concern per string — don't combine multiple warnings
- Use HTML spans for emphasis (same classes as MOA)
- Order by severity: critical warnings first, clinical pearls last
- Keep each string concise — aim for 1–2 sentences max

---

## HTML Span Classes

| Class | Use | Color |
|-------|-----|-------|
| `hl hl--alpha` | Alpha receptor or vasoconstrictive effect | Red |
| `hl hl--beta` | Beta receptor or cardiac/vasodilatory effect | Blue |
| `hl hl--danger` | Critical warning, black box, life-threatening | Red |
| `hl hl--warn` | Caution, use carefully | Yellow/orange |
| `moa-arrow` | → arrow between MOA steps | Muted |

---

## Worked Example: Epinephrine

```js
{
  id: "epinephrine",
  summary: "The first-line drug for anaphylaxis and cardiac arrest. A sympathomimetic that reverses bronchoconstriction, vasodilation, and cardiovascular collapse.",
  genericName: "Epinephrine",
  tradeNames: ["Adrenalin", "EpiPen"],
  category: ["Resuscitation", "Cardiovascular", "Airway & Respiratory"],
  classes: ["Sympathomimetic", "Catecholamine", "Vasopressor"],
  source: "NASEMSO 2022 v3.0",
  moa: [
    {
      brief: 'Causes widespread vasoconstriction and a rapid rise in systemic vascular resistance. This is what restores blood pressure in anaphylaxis.',
      target: { name: "α-1 receptors", action: "agonist", result: "Vasoconstriction, ↑ SVR", system: "adrenergic" }
    },
    {
      brief: 'Increases heart rate and myocardial contractility. In cardiac arrest, this raises coronary perfusion pressure between compressions and improves the likelihood of successful defibrillation.',
      target: { name: "β-1 receptors", action: "agonist", result: "↑ HR & contractility", system: "adrenergic" }
    },
    {
      brief: 'Relaxes bronchial smooth muscle, reversing bronchoconstriction. In anaphylaxis, this works faster and more reliably than any inhaled bronchodilator.',
      target: { name: "β-2 receptors", action: "agonist", result: "Bronchodilation", system: "adrenergic" }
    }
  ],
  indications: [
    { name: "Anaphylaxis" },
    { name: "Cardiac Arrest" },
    { name: "Shock" },
    { name: "Croup / Bronchospasm" },
    { name: "Severe Allergic Reaction", sameDoseAs: "Anaphylaxis" }
  ],
  contraindications: [
    { text: "Hypersensitivity" },
    { text: "Coronary insufficiency", relative: true },
    { text: "Uncontrolled hypertension", relative: true }
  ],
  doses: [
    {
      population: "Adult",
      indication: "Anaphylaxis",
      formulation: "1 mg/mL (1:1,000)",
      onset: "3–5 min",
      duration: "5–15 min",
      routes: [
        {
          via: ["IM"],
          amount: "0.3 mg",
          repeat: "q5–15 min PRN",
          notes: ["Anterolateral thigh"]
        }
      ],
      notes: []
    },
    {
      population: "Adult",
      indication: "Cardiac Arrest",
      formulation: "0.1 mg/mL (1:10,000)",
      onset: "Immediate",
      duration: "5–10 min",
      routes: [
        {
          via: ["IV", "IO"],
          amount: "1 mg",
          repeat: "q3–5 min",
          notes: ["Rapid push + flush"]
        }
      ],
      notes: ["Prioritize early administration for non-shockable rhythms"]
    },
    {
      population: "Adult",
      indication: "Shock",
      formulation: "0.1 mg/mL (1:10,000)",
      onset: "Immediate",
      duration: "Duration of infusion",
      routes: [
        {
          via: ["IV drip"],
          amount: "0.05–0.3 mcg/kg/min",
          notes: ["Titrate to MAP ≥65 mmHg"]
        }
      ],
      notes: []
    },
    {
      population: "Pediatric",
      qualifier: "<25 kg",
      indication: "Anaphylaxis",
      formulation: "1 mg/mL (1:1,000)",
      onset: "3–5 min",
      duration: "5–15 min",
      routes: [
        {
          via: ["IM"],
          amount: "0.15 mg",
          repeat: "q5–15 min PRN",
          notes: ["Anterolateral thigh"]
        }
      ],
      notes: []
    },
    {
      population: "Pediatric",
      indication: "Cardiac Arrest",
      formulation: "0.1 mg/mL (1:10,000)",
      onset: "Immediate",
      duration: "5–10 min",
      routes: [
        {
          via: ["IV", "IO"],
          amount: "0.01 mg/kg",
          maxDose: "1 mg/dose",
          repeat: "q3–5 min",
          notes: []
        }
      ],
      notes: []
    },
    {
      population: "Pediatric",
      indication: "Shock",
      formulation: "0.1 mg/mL (1:10,000)",
      onset: "Immediate",
      duration: "Duration of infusion",
      routes: [
        {
          via: ["IV drip"],
          amount: "0.05–0.3 mcg/kg/min",
          notes: ["Titrate to physiologic targets"]
        }
      ],
      notes: []
    },
    {
      population: "Adult",
      indication: "Croup / Bronchospasm",
      formulation: "1 mg/mL (1:1,000)",
      onset: "1–5 min",
      duration: "1–2 hrs",
      routes: [
        {
          via: ["NEB"],
          amount: "5 mg (5 mL)",
          repeat: "May repeat in 20 min",
          notes: []
        }
      ],
      notes: []
    }
    // NOTE: Nebulized epi dose is the same for all ages (5 mg).
    // A Pediatric entry with the same numbers could be added for completeness
    // so the tab doesn't appear to be missing peds data. Alternatively, use
    // population: "All Ages" if a fifth population value is added later.
  ],
  adverseEffects: [
    "Tachycardia",
    "Hypertension",
    "Dysrhythmias",
    "Anxiety / Tremor",
    "Pallor / Headache",
    "Angina"
  ],
  precautions: [
    'Use caution in <span class="hl hl--warn">elderly</span>, known <span class="hl hl--warn">cardiac disease</span>, <span class="hl hl--warn">hypertension</span>, and <span class="hl hl--warn">diabetes</span>.',
    'May precipitate angina or MI in susceptible patients.',
    '<span class="hl hl--danger">No contraindications in anaphylaxis or cardiac arrest</span> — benefits always outweigh risks.',
    'IM is the correct route for anaphylaxis — IV push epinephrine in a patient with a pulse risks fatal arrhythmia.'
  ]
}
```

---

## review-notes.txt Format

Prepend new entries at top of file, below the header block:

```
DRUG NAME (Trade Name)
- ⚠️ Issue description (source if applicable)
- ➕ Added: field/info (reason)
- ✅ Verified against NASEMSO — no changes needed
```

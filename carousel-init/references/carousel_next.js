#!/usr/bin/env node

// carousel_next.js
// Selects the next carousel combo (drug × template) for the pipeline.
// Reads carousel_combos.json and carousel_usage_log.json.
// Outputs a single JSON object to stdout.
//
// Usage: node carousel_next.js [--usage-log <path>]

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMBOS_PATH = resolve(__dirname, 'carousel_combos.json');
const SOFT_EXCLUDE_WINDOW = 3; // Avoid same drug or template within last N runs

// Usage log path — default to workspace location, overridable via --usage-log
let usageLogPath = resolve('/data/.openclaw/workspace/carousel-pipeline/carousel_usage_log.json');
const flagIndex = process.argv.indexOf('--usage-log');
if (flagIndex !== -1 && process.argv[flagIndex + 1]) {
  usageLogPath = resolve(process.argv[flagIndex + 1]);
}

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

let combos;
try {
  combos = JSON.parse(readFileSync(COMBOS_PATH, 'utf8'));
} catch (err) {
  console.error(JSON.stringify({ error: `COMBOS_LOAD_FAILED: ${err.message}` }));
  process.exit(1);
}

let usageLog = {};
try {
  usageLog = JSON.parse(readFileSync(usageLogPath, 'utf8'));
} catch {
  // File doesn't exist yet — first run. Treat as empty.
  usageLog = {};
}

// ---------------------------------------------------------------------------
// Step 1: Eliminate completed combos
// ---------------------------------------------------------------------------

const unused = combos.filter(c => !usageLog[c.combo_hash]);

if (unused.length === 0) {
  console.error(JSON.stringify({ error: 'ALL_COMBOS_USED: Every combo in carousel_combos.json has been completed.' }));
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Step 2: Identify recent drugs and templates (soft exclusion)
// ---------------------------------------------------------------------------

const recentEntries = Object.entries(usageLog)
  .sort(([, a], [, b]) => new Date(b.last_used) - new Date(a.last_used))
  .slice(0, SOFT_EXCLUDE_WINDOW);

const recentDrugs = new Set(recentEntries.map(([hash]) => hash.split('::')[0]));
const recentTemplates = new Set(recentEntries.map(([hash]) => hash.split('::')[1]));

// ---------------------------------------------------------------------------
// Step 3: Split into preferred and fallback
// ---------------------------------------------------------------------------

const preferred = unused.filter(
  c => !recentDrugs.has(c.key) && !recentTemplates.has(c.template)
);

const pool = preferred.length > 0 ? preferred : unused;

// ---------------------------------------------------------------------------
// Step 4: Random pick
// ---------------------------------------------------------------------------

const selected = pool[Math.floor(Math.random() * pool.length)];

console.log(JSON.stringify(selected));

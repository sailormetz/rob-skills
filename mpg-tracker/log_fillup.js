/**
 * log_fillup.js
 * Logs a fuel fill-up to mpg.json and updates summary fields.
 *
 * Usage: write input.json with { odometer, gallons, date (optional) }
 * then run: node log_fillup.js
 *
 * Input file: skills/mpg-tracker/input.json
 * Data file:  mpg.json (workspace root)
 */

const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.resolve(__dirname, 'input.json');
const DATA_PATH  = path.resolve(__dirname, '../../mpg.json');

// --- Read input ---
if (!fs.existsSync(INPUT_PATH)) {
  console.error('Missing input.json. Write { "odometer": 12345, "gallons": 14.2 } to skills/mpg-tracker/input.json first.');
  process.exit(1);
}

const input = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf8'));
const odometer = Math.round(Number(input.odometer));
const gallons  = parseFloat(Number(input.gallons).toFixed(3));
const date     = input.date || new Date().toISOString().slice(0, 10);

if (!odometer || !gallons) {
  console.error('input.json must have "odometer" and "gallons" fields.');
  process.exit(1);
}

// --- Read or initialize data file ---
let data;
if (fs.existsSync(DATA_PATH)) {
  data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
} else {
  data = {
    vehicle: '2010 Toyota Tacoma',
    entries: [],
    summary: {
      total_entries: 0,
      avg_mpg: null,
      best_mpg: null,
      worst_mpg: null,
      total_miles_tracked: 0,
      total_gallons: 0
    }
  };
}

// --- Calculate ---
const entries      = data.entries;
const lastEntry    = entries.length > 0 ? entries[entries.length - 1] : null;
const tank_miles   = lastEntry ? odometer - lastEntry.odometer : null;
const mpg          = tank_miles !== null ? parseFloat((tank_miles / gallons).toFixed(1)) : null;
const id           = entries.length + 1;

const newEntry = { id, date, odometer, tank_miles, gallons, mpg };
entries.push(newEntry);

// --- Update summary ---
const entriesWithMpg = entries.filter(e => e.mpg !== null);
const allMpg         = entriesWithMpg.map(e => e.mpg);

data.summary = {
  total_entries:        entries.length,
  avg_mpg:              allMpg.length > 0 ? parseFloat((allMpg.reduce((a, b) => a + b, 0) / allMpg.length).toFixed(1)) : null,
  best_mpg:             allMpg.length > 0 ? Math.max(...allMpg) : null,
  worst_mpg:            allMpg.length > 0 ? Math.min(...allMpg) : null,
  total_miles_tracked:  entriesWithMpg.reduce((a, e) => a + e.tank_miles, 0),
  total_gallons:        parseFloat(entries.reduce((a, e) => a + e.gallons, 0).toFixed(3))
};

// --- Write ---
fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// --- Output ---
if (mpg === null) {
  console.log(`⛽ Baseline set at ${odometer.toLocaleString()} miles. Send odometer + gallons next fill-up to start tracking.`);
} else {
  console.log(`⛽ ${tank_miles} miles on ${gallons} gal → ${mpg} MPG`);
  console.log(`Average across ${entriesWithMpg.length} fill-ups: ${data.summary.avg_mpg} MPG`);
  console.log(`Best: ${data.summary.best_mpg} | Worst: ${data.summary.worst_mpg}`);
}

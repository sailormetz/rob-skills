---
name: mpg-tracker
description: "Tracks fuel economy for Sailor's 2010 Toyota Tacoma. Triggers when Sailor sends a fill-up with odometer reading and gallons pumped. Calculate MPG, log the entry, and report MPG + running average. Trigger phrases: 'filled up', 'fill up', 'gas: [odometer] [gallons]', or any message that includes an odometer reading and gallons in the same message."
version: "1.0.0"
author: rob
tags: [mpg, fuel, tacoma, tracker]
---

# mpg-tracker

Logs fuel fill-ups, calculates MPG, and tracks running average for the 2010 Toyota Tacoma.

## Data File

All data lives at `mpg.json` in the workspace root. Structure:

```json
{
  "vehicle": "2010 Toyota Tacoma",
  "entries": [
    {
      "date": "YYYY-MM-DD",
      "odometer": 87342,
      "gallons": 14.2,
      "miles_driven": 312,
      "mpg": 21.97
    }
  ]
}
```

If the file doesn't exist yet, create it with an empty `entries` array on first use.

## Workflow

1. **Parse the input** — extract odometer reading and gallons from the message.

2. **Read `mpg.json`** — get the last entry's odometer to calculate miles driven. If no prior entries exist, record this fill-up as the baseline (no MPG calculated — need two fill-ups to get a number).

3. **Calculate:**
   - `miles_driven = current_odometer - last_odometer`
   - `mpg = miles_driven / gallons` (round to 2 decimal places)
   - `running_average = sum of all mpg values / number of entries with mpg`

4. **Append the new entry** to `mpg.json` and save.

5. **Reply** with:
   - This fill-up MPG
   - Running average across all fill-ups
   - Total entries logged

## Reply Format

```
⛽ [miles_driven] miles on [gallons] gal → [mpg] MPG
Average across [N] fill-ups: [running_avg] MPG
```

If it's the first fill-up (baseline):
```
⛽ Baseline set at [odometer] miles. Send odometer + gallons next fill-up to start tracking.
```

## Rules

- Never overwrite existing entries — always append.
- If input is ambiguous (e.g. only one number provided), ask which is odometer and which is gallons.
- Round MPG to 2 decimal places.
- Store odometer as a whole number, gallons as a float.

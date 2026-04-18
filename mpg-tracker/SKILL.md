---
name: mpg-tracker
description: "Tracks fuel economy for Sailor's 2010 Toyota Tacoma. Triggers when Sailor sends a fill-up with odometer reading and gallons pumped. Log the entry and report MPG + running average. Trigger phrases: 'filled up', 'fill up', 'gas: [odometer] [gallons]', or any message that includes an odometer reading and gallons."
version: "1.0.0"
author: rob
tags: [mpg, fuel, tacoma, tracker]
---

# mpg-tracker

Logs fuel fill-ups and calculates MPG for the 2010 Toyota Tacoma.

## Data File

`mpg.json` in the workspace root. Structure:

```json
{
  "vehicle": "2010 Toyota Tacoma",
  "entries": [
    {
      "id": 1,
      "date": "2026-04-18",
      "odometer": 87342,
      "tank_miles": 312,
      "gallons": 14.2,
      "mpg": 21.97
    }
  ],
  "summary": {
    "total_entries": 1,
    "avg_mpg": 21.97,
    "best_mpg": 21.97,
    "worst_mpg": 21.97,
    "total_miles_tracked": 312,
    "total_gallons": 14.2
  }
}
```

## Workflow

1. Parse odometer and gallons from Sailor's message.

2. Write `skills/mpg-tracker/input.json`:
   ```json
   { "odometer": 87342, "gallons": 14.2 }
   ```

3. Run the script:
   ```
   node /data/.openclaw/workspace/skills/mpg-tracker/log_fillup.js
   ```

4. Report the script's output back to Sailor.

5. Commit the workspace to save the updated `mpg.json`.

## Rules

- Always run the script — never calculate or write manually.
- If the message is ambiguous (only one number), ask which is odometer and which is gallons.
- After logging, commit: `cd /data/.openclaw/workspace && git add mpg.json && git commit -m "mpg: log fill-up [date]" && git push`

---
name: pushup-tracker
description: Tracks daily pushup progress toward a 100/day goal. Triggers when Sailor sends a message matching P[number] (e.g. P10, P25, P100) to log a set of pushups. Also triggers on rest day declarations like "resting" or "rest day" to mark the day as a rest day. Logs all data to pushups.json in the workspace.
---

# Pushup Tracker

## Data File

All data lives at `/data/.openclaw/workspace/pushups.json`.

Structure:
```json
{
  "setGoal": 13,
  "2026-04-14": {
    "total": 45,
    "entries": [10, 25, 10],
    "rest": false
  }
}
```

- `setGoal` — current per-set rep target. Persists across days. Change via "set goal [N]" or "goal [N]".

## Logging Sets (P[number] or P[n1], [n2], [n3]...)

When Sailor sends a message starting with `P` followed by one or more numbers (case-insensitive):

- Single set: `P13`
- Multiple sets: `P13, 13, 12` or `P13,13,12` or `P13 13 12`

Parse all numbers from the message. The `P` prefix applies to the whole message, not just the first number.

1. Read `pushups.json` (create it as `{}` if it doesn't exist)
2. Get today's date in `YYYY-MM-DD` format (CT timezone — use system date)
3. Add all parsed numbers to `entries[]` and update `total` accordingly
4. Write the file back
5. Reply: `✅ +[sum] = [total]/100, Goal: [setGoal]`
   - If total >= 100: `✅ +[sum] = [total]/100, Goal: [setGoal] 💪`

## Changing Set Goal

When Sailor says "set goal [N]", "goal [N]", or similar:

1. Read `pushups.json`
2. Update `setGoal` to the new number
3. Write the file back
4. Reply: `✅ Set goal updated to [N]`

## Evening Cron Message

The cron job at 7pm CT sends exactly ONE message to Sailor. No other messages, no status confirmations, no summaries.

- Normal day (total < 100): `[total]/100 pushups done today. [100-total] more to go.`
- Hit goal (total >= 100): `[total]/100 pushups done today. Goal hit ✅`
- Rest day (rest=true): `Rest day — back at it tomorrow 💪`
- No entry for today: `No pushups logged today. 100 to go.`

Send the message and reply NO_REPLY. Do not send any additional messages.

## Logging a Rest Day

When Sailor says "resting", "rest day", "taking a rest", or similar:

1. Read `pushups.json` (create if needed)
2. Set today's entry to `{ "total": 0, "entries": [], "rest": true }`
3. Write the file back
4. Reply: `✅ Rest day logged. Back at it tomorrow.`

## Rules

- Never overwrite existing entries — always append to `entries[]` and add to `total`
- If a rest day is already logged and Sailor logs pushups, clear the rest flag and add normally
- Today's date is always CT (America/Chicago) — use `date` shell command or system date
- Keep responses short — one line acknowledgement only

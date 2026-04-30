---
name: tiktok-warmup
description: "Manages the 21-day TikTok account warmup schedule for Rob the Paramedic. Sends daily task reminders, tracks completion, and shows progress. Triggers on: 'tiktok-warmup-daily-reminder' (cron), 'day done', 'day X done', 'completed day X', 'tiktok status', 'tiktok progress', 'what's today's tiktok task', 'pre-day done', 'pre-day item done'."
version: "1.0.0"
author: rob
tags: [tiktok, marketing, schedule, warmup]
---

# tiktok-warmup

Manages Sailor's 21-day TikTok warmup schedule for the Rob the Paramedic account.

## Files

- **State:** `/data/.openclaw/workspace/tiktok-warmup/state.json`
- **Schedule:** `/data/.openclaw/workspace/tiktok-warmup/draft-schedule.md`

## State Schema

```json
{
  "startDate": "YYYY-MM-DD",
  "currentDay": 1,
  "completed": {
    "1": true,
    "2": false
  },
  "preDay": {
    "username": true,
    "profilePhoto": false,
    "bio": true,
    "businessAccount": false,
    "bioLink": false,
    "followTargets": false
  }
}
```

- `currentDay`: the active day (1–21). Only advances when Sailor marks it complete.
- `completed`: keyed by day number (string). `true` = done.
- `preDay`: tracks the pre-day profile setup checklist items.

## Trigger: Daily Cron Reminder (`tiktok-warmup-daily-reminder`)

1. Read `state.json`.
2. Check if `currentDay` is complete (i.e., `completed[currentDay]` is true). If so, show Day currentDay+1 tasks.
3. Read `draft-schedule.md` and extract the section for the current day.
4. Determine the phase:
   - Days 1–4: Trust Establishment (no posting)
   - Days 5–7: First Posts (1/day)
   - Days 8–10: Ramp-Up (1/day)
   - Days 11–14: Ramp-Up (1–2/day)
   - Days 15–21: Full Velocity (2–3/day)
5. Send a Telegram message to Sailor (target: `8531672710`) with:
   - Day number and phase name
   - Morning / Afternoon / Evening task summary (bullet points, keep brief)
   - Daily totals
   - Reminder to reply "day X done" when finished
6. Reply NO_REPLY after sending.

**Format:**
```
📱 TikTok — Day [N] of 21
[Phase Name]

🌅 Morning
1. [task]
2. [task]

☀️ Afternoon
1. [task]
2. [task]

🌙 Evening
1. [task]
2. [task]

📊 Totals: ~X likes · ~X follows · ~X comments[· X post]

Reply "day [N] done" when finished ✅
```

## Trigger: Mark Day Complete

Trigger phrases: "day done", "day X done", "completed day X", "done with day X"

1. Read `state.json`.
2. Parse the day number from the message (default to `currentDay` if just "day done").
3. Set `completed[dayNumber]` = true.
4. If `dayNumber` === `currentDay` and `currentDay` < 21, increment `currentDay` by 1.
5. Write `state.json`.
6. Reply with completion confirmation + preview of next day's phase.

**Format:**
```
✅ Day [N] done! Great work.

Up next — Day [N+1]: [phase name]. I'll remind you tomorrow morning.
```

If Day 21 is completed:
```
🎉 21-day warmup complete! You should be in Pool 2 by now.

Ongoing cadence: 3–5 posts/week, Tue–Thu 1–5 PM CT peak. Keep engaging daily.
```

## Trigger: Pre-Day Item Complete

Trigger phrases: "pre-day [item] done", "finished [item]", e.g. "pre-day profile photo done"

Items: `username`, `profilePhoto`, `bio`, `businessAccount`, `bioLink`, `followTargets`

1. Match the item from the message (fuzzy — "profile photo" → `profilePhoto`, "business account" → `businessAccount`, etc.).
2. Set `preDay[item]` = true in state.json.
3. Write state.json.
4. Show updated pre-day checklist.

## Trigger: Status Check

Trigger phrases: "tiktok status", "tiktok progress", "where am I on tiktok", "what's today's tiktok task"

1. Read `state.json`.
2. Show:
   - Pre-day checklist (checked/unchecked)
   - Days completed so far (e.g., "Days 1–5 ✅")
   - Current day and phase
   - Days remaining

**Format:**
```
📊 TikTok Warmup — Day [N]/21

Pre-Day Setup:
✅ Username
⬜ Profile photo
✅ Bio
⬜ Business account
⬜ Bio link
⬜ Follow targets identified

Progress: Days [X] complete, [Y] remaining
Current: Day [N] — [Phase Name]
```

## Rules

- Never auto-advance `currentDay` without Sailor confirming completion.
- If Sailor skips a day, hold at the current day — don't jump ahead based on date math.
- Keep reminders brief — bullets only, no paragraphs.
- Always send via Telegram (`message` tool, target `8531672710`).
- After any `message` send, reply NO_REPLY.

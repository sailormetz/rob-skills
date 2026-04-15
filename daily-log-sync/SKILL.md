---
name: daily-log-sync
description: "Writes meaningful session activity to today's daily memory log and auto-commits the workspace to GitHub. Triggered by heartbeats and the HEARTBEAT.md directive. Also scans session-memory snapshots (YYYY-MM-DD-*.md) created on /new for important context."
version: "1.0.0"
author: rob
tags: [memory, logging, heartbeat, github]
---

# daily-log-sync

Writes meaningful activity from the current session to today's daily log, then commits and pushes the workspace to GitHub.

## Use this skill when
- A heartbeat fires and HEARTBEAT.md says to run this skill
- Sailor asks to sync or write the daily log manually

## Workflow

### 1. Get today's date
Use the session_status tool or system prompt current time to determine today's date in CT (America/Chicago). Format: `YYYY-MM-DD`.

### 2. Read existing daily log
Read `memory/YYYY-MM-DD.md` (today's date). Note the last entry — you'll only write things that happened *after* it.

### 3. Check session-memory snapshots
List files in `memory/` matching `YYYY-MM-DD-*.md` (today's date prefix). Read any that exist — these are session transcripts saved on `/new`. Scan for important events: decisions made, things built, tools configured, corrections, context shifts. Don't copy transcripts verbatim — extract the meaningful bits only.

### 4. Review current conversation history
Look at the live conversation in this session. Identify anything meaningful since the last log entry: decisions, things built, problems solved, context worth keeping for future-me. Skip routine back-and-forth.

### 5. Write to daily log
If there's anything new, append to `memory/YYYY-MM-DD.md`:
- Section header with time range if helpful (e.g. `## Session — Afternoon`)
- Bullet points only — no paragraphs
- Focus on: what changed, what was decided, what was built, what to remember
- Skip: pleasantries, routine questions, things already captured in existing log entries

If nothing new has happened since the last entry, skip writing.

### 6. Auto-commit to GitHub
Run:
```
cd /data/.openclaw/workspace && git add -A && git diff --cached --quiet || git commit -m "heartbeat: auto-sync $(date +'%Y-%m-%d %H:%M CT')" && git push
```
Only commits if there are actual changes. Silent if nothing changed.

## Rules
- Never duplicate entries already in the log
- Never write "I checked and there's nothing new" to the log — just skip it
- Keep entries brief — future-me needs facts, not narrative
- Session snapshots are supplementary — prioritize live conversation context over snapshot content
- Do not message Sailor about this — it runs silently
- **Log the 80%, skip the minutiae.** Only log things that move projects forward or change direction: progress on builds, decisions, config changes, new skills/tools set up. One-off questions, casual inquiries, and small tangents with no follow-up thread don't need to be logged. The point is high-level continuity — where are we on the things that matter.

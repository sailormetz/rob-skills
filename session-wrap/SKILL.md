---
name: session-wrap
description: End-of-session memory capture. Use when Sailor says he's starting a new session, about to use /new, or asks you to wrap up. Writes key events to today's daily log and curates MEMORY.md so nothing is lost across the context reset. Triggers on phrases like "new session", "start fresh", "wrap up", "/new", "about to reset", "save before we restart".
---

# Session Wrap

Run this before any context reset to preserve important information.

## Workflow

1. **Write daily log** — Open `memory/YYYY-MM-DD.md` (today's date). Append a timestamped block covering:
   - Decisions made this session
   - Files created or changed (with commit hashes if applicable)
   - Anything Sailor explicitly asked you to remember
   - Open todos or next steps

2. **Curate MEMORY.md** — Review what was logged and ask:
   - Is there anything here that belongs in long-term memory?
   - Are there outdated entries in MEMORY.md that should be updated or removed?
   - Update MEMORY.md accordingly. Keep it under 150 lines.

3. **Confirm** — Reply with a one-line summary: what was logged and whether MEMORY.md was updated.

## Rules

- Never skip the daily log write — even if the session was short
- Don't dump raw conversation into the log — distill what matters
- MEMORY.md is curated long-term memory, not a session transcript
- Keep each daily log entry concise — bullet points over paragraphs

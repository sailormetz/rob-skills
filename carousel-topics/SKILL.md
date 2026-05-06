---
name: carousel-topics
description: "Generates 5 new carousel topic pitches for the Rob the Paramedic TikTok account. Reads topic guidelines, evaluates available drugs, checks for duplicates against existing topics, and sends proposals to Sailor for approval. Triggers on: 'create carousel topics', 'brainstorm topics', 'generate topics', 'new carousel ideas', 'more topic ideas'."
---

# carousel-topics

Generates 5 new carousel topic pitches and proposes them for approval.

## Workflow

### 1. Load context

Read these three files before generating anything:

- `skills/carousel-topics/references/topic_guidelines.md` — rules for what makes a good pitch
- `carousel-pipeline/carousel_topics.json` — all existing topics (every status)
- `cards/data/drugs.js` — scan for available drug IDs (grep for `id:` lines)

### 2. Generate 5 topics

Each topic needs:
- `id` — slug format (e.g. `adenosine-six-second-pause`)
- `drug` — must match an `id` in drugs.js exactly
- `pitch` — 1-2 sentences per the guidelines

Mix angle types across the batch. Don't generate 5 deep dives or 5 contraindication topics.

### 3. Deduplicate

Compare each proposed topic against ALL existing topics in `carousel_topics.json` (including `done`, `draft`, `idea`, `error` — every status). Check for:

- **Same drug + same angle** — reject. E.g. if "fentanyl-contraindications" exists, don't propose "fentanyl-when-not-to-give."
- **Same drug + overlapping content** — reject. E.g. if "epinephrine-versatility" covers all four indications, don't propose "epinephrine-cardiac-arrest" (it's a subset).
- **Same angle on a different drug is fine.** "Atropine contraindications" and "fentanyl contraindications" are different topics.

If a proposed topic is too similar, replace it and re-check. The final list must have exactly 5 unique, non-overlapping topics.

### 4. Propose to Sailor

Send the 5 topics to Sailor on Telegram. Format:

```
📋 5 new carousel topics:

1. [drug] — "pitch"
2. [drug] — "pitch"
3. [drug] — "pitch"
4. [drug] — "pitch"
5. [drug] — "pitch"

Approve all, or tell me which to cut/change.
```

### 5. Wait for approval

- **Full approval** — add all 5 to `carousel_topics.json` with `status: "idea"`, `added: today's date`, `completed: null`.
- **Partial approval** — add only the approved ones.
- **Edits** — apply changes, then re-propose the edited topics.
- **Full rejection** — generate 5 new ones (return to step 2).

### 6. Confirm

After adding to the topics file, confirm: "✅ Added N topics to the queue. X total ideas pending."

## Rules

- Always generate exactly 5 topics per run.
- Always check against existing topics before proposing.
- Never add topics without Sailor's approval.
- Never modify existing topics — only append new ones.
- Drug ID must match drugs.js exactly (e.g. `morphine-sulfate`, not `morphine`).

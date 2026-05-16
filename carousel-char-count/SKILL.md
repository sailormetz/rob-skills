---
name: carousel-char-count
description: "Counts characters per slide in a carousel script and trims any slide exceeding the type's char limit (400 for drug, 200 for shift-story). Reads the limit from selection.type in the pipeline state and passes it to the counting script. Over-limit slides are rewritten with minimum edits, then re-counted to verify. Called only by carousel-master — never trigger directly."
version: "1.0.0"
author: rob
tags: [carousel, validation, char-count, trimming]
---

# carousel-char-count

Enforces a per-type character limit on carousel scripts (400 for drug, 200 for shift-story). Reads the limit from `selection.type` in the pipeline state, counts characters programmatically after stripping all markup, then uses LLM rewriting to trim any slide that exceeds the limit.

## Use this skill when

Called by `carousel-master` after `carousel-script-verification` and before the Script Checkpoint. Never triggered directly.

---

## Inputs

Read from `carousel-pipeline/runs/{topic_id}/`:

| File | Used for |
|------|----------|
| `carousel_pipeline_state.json` | Get `selection.type` to determine the char limit |
| `carousel_script.md` | The script to validate and potentially trim |

The counting script lives at `skills/carousel-char-count/references/count_chars.py`.

## Char Limits by Type

| Type | Limit |
|------|-------|
| `drug` | 400 |
| `shift-story` | 200 |

Read `selection.type` from the pipeline state, look up the limit above, and pass it to the counting script.

---

## Character Counting Rules

Characters are counted **after stripping all markup**:
- `<sectionLabel>...</sectionLabel>` — removed entirely (tag + content)
- `<topicName>...</topicName>` — tags removed, inner text kept (counts toward limit)
- `[color: text]` color tags — brackets and color label removed, inner text kept
- `*bold*` / `*italic*` — asterisks removed, inner text kept
- Any HTML tags (`<span>`, `<em>`, etc.) — removed entirely
- Whitespace is normalized (runs collapsed to single space, leading/trailing stripped)
- The resulting plain text character count (letters, spaces, punctuation) is the number that matters

---

## Workflow

### 1. Run the counting script

```bash
python3 skills/carousel-char-count/references/count_chars.py carousel-pipeline/runs/{topic_id}/carousel_script.md {char_limit}
```

The script outputs a JSON array:
```json
[
  { "slide": 1, "chars": 112, "over": 0 },
  { "slide": 2, "chars": 430, "over": 30 },
  { "slide": 3, "chars": 389, "over": 0 }
]
```

- Exit code `0` = all slides pass. Skip to step 4.
- Exit code `1` = at least one slide over limit. Continue to step 2.

### 2. Rewrite over-limit slides

For each slide where `over > 0`:

1. Read the original slide text from `carousel_script.md` (everything between its `[N]` marker and the next marker or end of file).
2. Rewrite the slide text to fit under 400 characters (as counted by the stripping rules above). Follow these constraints:
   - **Minimum trim only** — change as few words as possible. Tighten phrasing, cut filler, shorten sentences. Do not restructure the slide or change its meaning.
   - **Preserve all color tags** — every `[color: text]` tag must remain. You may shorten the text inside a color tag but never remove a color tag entirely.
   - **Preserve the teaser** — the italic teaser line (last line, wrapped in `*...*`) should not be cut unless absolutely necessary, and even then only shortened, never removed.
   - **Preserve clinical accuracy** — do not change drug names, doses, routes, mechanisms, or contraindications. Cut descriptive/connecting words, not clinical content.
   - **Keep the same slide structure** — same number of paragraphs (roughly), same section/topic tags.

3. Replace the original slide text in `carousel_script.md` with the trimmed version using the `edit` tool.

### 3. Re-count to verify

Run the counting script again:

```bash
python3 skills/carousel-char-count/references/count_chars.py carousel-pipeline/runs/{topic_id}/carousel_script.md {char_limit}
```

- Exit code `0` = all slides now pass. Continue to step 4.
- Exit code `1` = a slide is still over. Repeat step 2 for the remaining over-limit slides. Maximum 3 total attempts — if slides still exceed after 3 rounds, log a warning and proceed (Sailor will catch it at the checkpoint).

### 4. Report results

Return a brief summary to carousel-master:

- If all slides passed on the first count: `"Char count: all slides under {char_limit}."`
- If trimming was needed: `"Char count: trimmed slide(s) [N, N] to fit under {char_limit}. Verified."`
- If trimming failed after 3 attempts: `"Char count: slide(s) [N] still over {char_limit} after 3 trim attempts. Manual review needed."`

Do not message Sailor directly — carousel-master handles all communication.

---

## Rules

- Never modify slides that are already under 400 characters.
- Never remove color tags. Shortening text inside a tag is fine; deleting the tag is not.
- Never change clinical facts (doses, drug names, mechanisms, contraindications).
- Never restructure slides (merge paragraphs, reorder content, add new lines).
- Never write to `carousel_pipeline_state.json` — carousel-master owns that.
- The counting script is the single source of truth for character counts. Do not estimate or count manually.
- Maximum 3 trim-and-verify cycles. After that, flag it and move on.

---
name: carousel-export
description: "Emails the finished JPEG carousel slides to Sailor and sends a Telegram ping. Final step in the carousel pipeline. Reads slides from runs/{topic_id}/slides/, attaches them to an email with the pipeline state as the body, and notifies via Telegram. Called only by carousel-master — never trigger directly."
version: "2.0.0"
author: rob
tags: [carousel, export, email, telegram]
---

# carousel-export

Delivers the finished carousel to Sailor. Emails all JPEG slides with the pipeline state summary, then sends a Telegram ping.

## Use this skill when

Called by `carousel-master` at Step 3. Never triggered directly.

---

## Inputs

Read from `carousel-pipeline/runs/{topic_id}/`:

| File | Used for |
|------|----------|
| `carousel_pipeline_state.json` | Email body — confirms what ran and the topic |
| `slides/slide_01.jpg` … `slide_NN.jpg` | Email attachments |

The `topic_id` comes from carousel-master's run context.

---

## Workflow

### 1. Verify slides exist

List files in `runs/{topic_id}/slides/`. Confirm at least one JPEG is present. If the slides directory is missing or empty, fail immediately — do not send a partial email.

### 2. Zip the slides

Create a zip file containing all JPEGs from `runs/{topic_id}/slides/`:

```bash
cd runs/{topic_id}/slides && zip -j /tmp/{topic_id}-slides.zip *.jpg
```

The zip file is the single email attachment — do not attach individual JPEGs.

### 3. Send email

- **From:** robtheparamedic@gmail.com
- **To:** sailormetz@gmail.com
- **Subject:** `Carousel - {topic_id} - {version}` where version is a whole number (1, 2, 3…) tracking how many times this topic has been exported. Read `export_version` from `carousel_pipeline_state.json` — if the field is missing, treat it as version 1. After a successful email send, increment `export_version` in the state file (this is the one exception to the "don't write state" rule).
- **Body:** `{topic_id}` carousel slides attached.
- **Attachments:** Single zip file (`{topic_id}-slides.zip`)

Use himalaya MML format. Attach the zip using `<#part filename=/tmp/{topic_id}-slides.zip name={topic_id}-slides.zip><#/part>`.

### 4. Send Telegram ping

Send a short message to Sailor on Telegram:

> `{topic_id}` is done and ready for review.

Use the `message` tool with `action=send`, `channel=telegram`, `target=8531672710`.

---

## Rules

- Never send email if slides directory is missing or empty. Fail first.
- Always zip slides into a single file before attaching — never attach individual JPEGs.
- Do not write to `carousel_pipeline_state.json` — carousel-master owns that — **except** for `export_version`, which this skill increments after each successful email.
- Do not delete any files — carousel-master handles cleanup after Sailor approves.
- If the email send fails, log the error and fail the step. Do not send Telegram without a successful email.

---
name: carousel-export
description: "Emails the finished JPEG carousel slides to Sailor and sends a Telegram ping. Final step in the carousel pipeline. Reads slides from runs/{combo_hash}/slides/, attaches them to an email with the pipeline state as the body, and notifies via Telegram. Called only by carousel-master — never trigger directly."
version: "1.0.0"
author: rob
tags: [carousel, export, email, telegram]
---

# carousel-export

Delivers the finished carousel to Sailor. Emails all JPEG slides with the pipeline state summary, then sends a Telegram ping.

## Use this skill when

Called by `carousel-master` at Step 3. Never triggered directly.

---

## Inputs

Read from `carousel-pipeline/runs/{combo_hash}/`:

| File | Used for |
|------|----------|
| `carousel_pipeline_state.json` | Email body — confirms what ran and the combo |
| `slides/slide_01.jpg` … `slide_NN.jpg` | Email attachments |

The `combo_hash` comes from carousel-master's run context.

---

## Workflow

### 1. Verify slides exist

List files in `runs/{combo_hash}/slides/`. Confirm at least one JPEG is present. If the slides directory is missing or empty, fail immediately — do not send a partial email.

### 2. Send email

- **From:** robtheparamedic@gmail.com
- **To:** sailormetz@gmail.com
- **Subject:** `Carousel complete: {combo_hash}`
- **Body:** Full JSON contents of `carousel_pipeline_state.json`
- **Attachments:** All JPEGs from `runs/{combo_hash}/slides/`, in slide order

Use himalaya MML format. Attach each file using `<#part filename=/full/path/to/slide_NN.jpg name=slide_NN.jpg><#/part>`.

### 3. Send Telegram ping

Send a short message to Sailor on Telegram:

> `{combo_hash}` is done and ready for review.

Use the `message` tool with `action=send`, `channel=telegram`, `target=8531672710`.

---

## Rules

- Never send email if slides directory is missing or empty. Fail first.
- Attach slides in order (slide_01 through slide_NN). Do not skip or reorder.
- Do not write to `carousel_pipeline_state.json` or `carousel_usage_log.json` — carousel-master owns those.
- Do not delete any files — carousel-master handles cleanup after Sailor approves.
- If the email send fails, log the error and fail the step. Do not send Telegram without a successful email.

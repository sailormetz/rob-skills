# Carousel Design Spec — Rob the Paramedic

Design language pulled directly from the drug cards web app (`cards/style.css`). Carousels should feel like a screenshot from the app — same palette, same fonts, same DNA.

---

## Canvas

- **Dimensions:** 1080 × 1920px (portrait, 9:16 TikTok/Reels)
- **Format:** JPEG, 95% quality
- **Background:** `hsl(45, 2%, 5%)` — near-black with a warm undertone (matches `--bg`)

---

## Color Palette

Pull directly from the app's CSS variables:

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `hsl(45, 2%, 5%)` | Slide background |
| `--surface` | `hsl(45, 2%, 12%)` | Card/panel backgrounds |
| `--surface-2` | `hsl(45, 2%, 16%)` | Nested surfaces, meta cells |
| `--border` | `hsl(45, 2%, 24%)` | Dividers, borders |
| `--text` | `hsl(45, 4%, 93%)` | Primary body text |
| `--text-mut` | `hsl(45, 2%, 60%)` | Secondary/muted text |
| `--text-faint` | `hsl(45, 2%, 36%)` | Labels, captions |
| `--green` | `#52d693` | Positive, go, indications |
| `--red` | `#e86363` | Danger, contraindications |
| `--blue` | `#5e9be8` | Accent, links, active states |
| `--orange` | `#daa040` | Warnings, precautions |
| `--cyan` | `#4dc4b0` | Tertiary accent |
| `--lilac` | `#7c6ddd` | Adverse effects |

**Accent color for carousels:** `--blue` (`#5e9be8`) — use for section labels, highlights, and the slide counter dot/bar.

---

## Typography

Fonts match the app exactly. Load via Google Fonts in the HTML template.

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@700&family=IBM+Plex+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Size (approx) |
|------|------|--------|---------------|
| Drug name / slide title | IBM Plex Sans | 800 | 72–88px |
| ALL CAPS headline | IBM Plex Sans | 700 | 48–56px, letter-spacing: 0.08em |
| Body text | IBM Plex Sans | 400 | 38–44px |
| Dose amounts | Barlow Semi Condensed | 700 | 80–96px |
| Code / monospace labels | JetBrains Mono | 400–600 | 32–38px |
| Labels / metadata | IBM Plex Sans | 500–600, uppercase | 26–32px, letter-spacing: 0.10em |

**Line height:** 1.4–1.5 for body text. 1.0–1.1 for large display text.
**Anti-aliasing:** Always `-webkit-font-smoothing: antialiased`.

---

## Slide Layout

Each slide is a full 1080×1920 HTML page rendered to JPEG.

### Common structure (all slides):

```
┌─────────────────────────────┐
│  [SLIDE COUNTER]  top-right │  ← small, muted — e.g. "3 / 7"
│                             │
│                             │
│   [CONTENT AREA]            │  ← vertically centered
│                             │
│                             │
│  [BRAND FOOTER]  bottom     │  ← "Rob the Paramedic" wordmark
└─────────────────────────────┘
```

- **Padding:** 80px horizontal, 100px top/bottom (safe area for TikTok UI chrome)
- **Slide counter:** top-right, 28px, `--text-faint`, `IBM Plex Sans 500`, format: `N / TOTAL`
- **Brand footer:** bottom-center, 24px, `--text-faint`, `IBM Plex Sans 500 uppercase`, letter-spacing: 0.12em — text: `ROB THE PARAMEDIC`

---

## Slide Types

### Slide 1 — Hook (Cover)

The first slide is the scroll-stopper. Big, centered, bold.

```
┌─────────────────────────────┐
│                        1/7  │
│                             │
│                             │
│   [DRUG NAME]               │  ← 80–88px, weight 800, --text
│   [hook text]               │  ← 40–44px, weight 400, --text-mut
│                             │
│                             │
│   ROB THE PARAMEDIC         │
└─────────────────────────────┘
```

- Drug name: all caps or title case, top of content block
- Hook text: 1–2 lines, positioned below drug name, slightly muted
- Optional: thin accent bar (`--blue`, 4px wide, full-width) at top of slide

### Slide 2–N — Body Slides

Information slides. Surface-card aesthetic with a section label and content.

```
┌─────────────────────────────┐
│                        N/7  │
│                             │
│  ┌───────────────────────┐  │
│  │ SECTION LABEL         │  │  ← --text-faint, uppercase, 28px
│  │───────────────────────│  │
│  │                       │  │
│  │  [content]            │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│   ROB THE PARAMEDIC         │
└─────────────────────────────┘
```

- Card background: `--surface` with 16px border-radius
- Section label: uppercase, `--blue` or context-colored (see Color Palette), letter-spacing: 0.12em
- Body text: 38–44px, `--text`, line-height 1.5
- Dose amounts: use Barlow Semi Condensed 700, 80–96px, `--text` — prominent display

### Last Slide — CTA

Clean, centered, minimal. Drives to the app.

```
┌─────────────────────────────┐
│                        7/7  │
│                             │
│                             │
│   [CTA text]                │  ← 44px, weight 500, --text
│                             │
│   [optional emoji]          │
│                             │
│   link in bio               │  ← 32px, --text-faint
│   ──────────────────        │
│   ROB THE PARAMEDIC         │
└─────────────────────────────┘
```

---

## Color Coding by Section Type

Match the app's section label colors:

| Section | Color |
|---------|-------|
| Drug class / general | `--blue` (`#5e9be8`) |
| Indications | `--green` (`#52d693`) |
| Contraindications | `--red` (`#e86363`) |
| Warnings / Precautions | `--orange` (`#daa040`) |
| Adverse effects | `--lilac` (`#7c6ddd`) |
| Mechanism of action | `--cyan` (`#4dc4b0`) |
| Dose | `--green` (`#52d693`) |

---

## Pills & Tags

For inline categorization (drug class, routes, etc.), use pill styles from the app:

```css
/* Example — blue pill */
background: rgba(94, 155, 232, 0.12);
border: 1px solid rgba(94, 155, 232, 0.3);
color: #5e9be8;
border-radius: 999px;
padding: 6px 20px;
font-size: 28px;
font-weight: 500;
```

Scale up sizes since we're at 1080px canvas width — app pill sizes × ~2.

---

## What NOT to Do

- No white backgrounds — this is a dark-mode-only product
- No gradients unless a very subtle `hsla(45, 20%, 60%, 0.06)` top-fade (as used in `.card-header`)
- No drop shadows heavier than `rgba(0,0,0,0.8)` at 24px blur
- No fonts outside the three approved families
- No color values outside the palette — don't invent new accents
- Don't crowd the slide — leave breathing room, center content vertically
- Don't put more than ~40 words on a body slide (enforced by carousel-script)

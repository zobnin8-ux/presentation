# GRC → US · Pitch Presentation (Next.js)

Split‑panel, one‑page deck that explains the **US contour** for GRC: context → system → plan → discussion.

- **Live deck (Vercel):** see the deployments for this repo
- **Source of truth for copy:** `lib/content.ts`
- **Internal hub (Obsidian):** `GRC → US — полный хаб Obsidian.md` (do not share with client)

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## What is in this repo

This repo is the **pitch deck** (not the US production site).

- **Pitch deck repo:** this repository (`D:\Repair`)
- **US site (separate repo):** `zobnin8-ux/grc` (local: `D:\ArtemSite`)

## Structure

- `app/page.tsx` — renders `PresentationShell`
- `components/PresentationShell.tsx` — split navigation + section routing
- `components/sections/*` — main sections (00–06)
- `components/panels/*` — right-side panels
- `lib/content.ts` — **all copy**, modules, plan stages, CTA questions, demo data

## Viewing (important)

- **Desktop or tablet landscape only.** The deck is a fixed split-panel layout (sidebar + content), not a mobile site.
- When sharing the link, ask recipients to open it **from a computer** (or a tablet turned sideways).

## Section 05 · Plan (4 stages)

Timeline copy lives in `lib/content.ts` → `planOverview` + `planStages`.

| Stage | Duration | Focus |
|-------|----------|--------|
| 1 | 6–10 weeks | Foundation: site → CRM → emergency SMS → AI Estimator bridge; phone 24/7 in a second wave |
| 2 | 6–8 weeks | Cases, SEO, direct outreach |
| 3 | 4–6 weeks | Client portal MVP (after stable intake + CRM) |
| 4 | 8–10 weeks | Site docs, turnaround radar, reports, object memory, internal ops layer |

**Headline on deck:** ~6 months · footnote: full working contour up to ~8 months.  
**Per-stage durations:** weeks only (no fractional months in the UI).

## Editing content (most common)

### Update copy

Edit `lib/content.ts`:

- `sectionHeaders` — headers/callouts per section
- `pains` — section 03 cards
- `systemModules` — section 04 module cards
- `planStages` — section 05 timeline content
- `ctaQuestions` — section 06 questions

### Architecture slide (image)

The clickable architecture preview in section 04 opens:

- `public/architecture-us-contour.png`

To replace it:

1. Put the new PNG in the project root (any name).
2. Copy it over `public/architecture-us-contour.png`
3. Commit + push.

### Client personal account (Client Portal) demo

Section 04 contains a clickable demo **“Личный кабинет клиента”** (3 screens in a modal).

- UI: `components/sections/ClientPortalDemoModal.tsx`
- Demo data: `lib/content.ts` → `clientPortalDemo`
- Copy block (Portal v1 card): `lib/content.ts` → `clientPortalUnit`

MVP rule we present in the pitch:

- UI shows **scope + next step** (no price)
- price/quote goes as **PDF** in Documents

## Favicon (tab icon)

Custom tech icon lives in:

- `app/icon.svg`

## Build

```bash
npm run build
```

## Notes

- This is a presentation artifact; keep client-facing wording consistent (no vendor CRM names, no WhatsApp mentions).
- The repo contains internal docs; do not publish internal markdown externally.

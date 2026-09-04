# Portfolio Rebuild — Project Log

Record of the Next.js portfolio rebuild. Written to be handed to Claude as
project context.

**Date:** 2026-09-03
**Location:** `C:\Users\bmich\OneDrive\Desktop\brandon-portfolio-next`
**Source (read-only):** `C:\Users\bmich\OneDrive\Desktop\brandon-portfolio`

---

## 1. What this is

A ground-up rebuild of Brandon's vanilla HTML/CSS/JS portfolio in Next.js.
Not a migration — a separate project that reuses the original's assets and
copy. The original folder was never modified and is still deployable.

## 2. Decisions made

| Decision | Choice |
|---|---|
| Relationship to old site | Completely separate project; old folder is read-only source |
| Design | Faithful port — same dark/coral identity, not a redesign |
| Signature effects | Keep all four (lanyard, preloader, fan-out expand, scroll videos) |
| Styling | CSS Modules, **not** Tailwind — the design is a port of a 3,900-line hand-written stylesheet |
| Projects | Five, Biddle-Shaw first |
| Biddle-Shaw assets | Captured from the live site (no local files existed) |

Two of these changed later — see §7.

## 3. Stack

Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules ·
GSAP 3 + ScrollTrigger via `@gsap/react` · Lenis · lucide-react

## 4. What was built

**Structure**
- `app/layout.tsx` — next/font, metadata, JSON-LD, Lenis wrapper
- `app/page.tsx` — homepage composition
- `app/globals.css` — design tokens ported from `style.css`
- `app/work/[slug]/page.tsx` — one template for all five case studies
  (replaced four near-identical 240-line HTML files)
- `lib/projects.ts` — project data
- `lib/caseStudies.ts` — case-study copy, extracted programmatically from the
  original HTML pages
- `components/` — one component + one `.module.css` each

**Effects ported**
- Lanyard: drag physics, damped pendulum, string tension, ambient wind gusts
- SVG name draw-then-fill
- Falling-text CTA hover
- Staggered menu: prelayers, numbered items, robot mascot on hover
- Click-to-expand fan-out (desktop + mobile variants)
- Background videos: play/pause on scroll; RDR2 scroll-scrubbed
- Tilt cards with 3D mouse tracking
- Scroll reveals (one `<Reveal>` component replaced ~22 repeated calls)

**Five projects:** Biddle-Shaw Insurance, RDR2, Bearded Threads, DJ Big Cali,
CocoCoin.

## 5. Biddle-Shaw (the new project)

Real client site — independent insurance brokerage, San Francisco.
`https://biddle-shaw-nextjs.vercel.app/`. No local files existed, so assets
were captured from the live site with headless Chrome:

- Hero screenshot (main card)
- Three tilt-card stills: Service Architecture, Conversion Path, Trust Signals
- A 28-second seamless-loop background video built from a scroll recording

Case study is live at `/work/biddle-shaw` with everything the live site
supports. Three sections carry `todo` prompts (see §8).

## 6. Assets

Copied from the original, then optimized:

| | Before | After |
|---|---|---|
| Images | 19 MB (PNG/JPG) | 1.2 MB (WebP) |
| Video | 14 MB | ~9.7 MB (H.264, re-encoded) |

RDR2's video is deliberately larger (3.9 MB) because it is all-intra — see §7.

## 7. Bugs found and fixed

1. **All five project cards invisible.** `SmoothScroll` killed every
   ScrollTrigger in a route-change effect that also ran on mount. Now skips the
   first render (`components/SmoothScroll.tsx:63`); `useGSAP` handles its own
   cleanup.
   *Evidence:* verified empirically — all five cards measured `opacity: 0` with
   the starting transform applied, then `opacity: 1, transform: none` after the
   fix. The proposed mechanism (React runs child effects before parent effects,
   so the parent wiped triggers the children had just registered) is documented
   React behaviour and is consistent with the observation, but was not isolated
   experimentally.
2. **Menu panel never slid in.** The panel parks off-screen via CSS
   `translateX(100%)`. GSAP read that as `x`, so animating `xPercent` to 0
   moved nothing. Fixed by restating the offset in GSAP's own transform model.
3. **lucide-react v1 dropped brand icons.** LinkedIn and GitHub are now inline
   SVG in `components/BrandIcons.tsx`.
4. **lottie-react v3 API change.** `animationData` → `src`. (Later removed
   entirely.)
5. **RDR2 video appeared stuck.** Scrubbing seeks `currentTime`, and seeks can
   only land on keyframes. Verified with ffprobe:
   - **Original source file: 2 keyframes / 188 frames.** Scrubbing would have
     been janky on the old vanilla site too — this was a pre-existing problem,
     not purely self-inflicted.
   - The `-crf 28 -preset slow` re-encode made it worse: **1 keyframe**.
   - Now re-encoded all-intra (`-g 1`): **188 keyframes / 188 frames**, i.e.
     every frame seekable. Cost: 224 KB → 3.9 MB, unavoidable for scrubbing.

   Also moved the trigger registration inside the GSAP context (it was leaking)
   and retimed the range to `top 80% → bottom 20%` so the clip plays while the
   section holds the screen. This is the first version where the effect
   actually works properly.
6. **Stale dev server.** A `next start` process survived `pkill` and served a
   stale build, causing a JS chunk to 500 and the page to never hydrate.
   Diagnosed as environment, not code.

## 8. Change rounds (Brandon's feedback)

**Round 1**
- Skills grid was 4-on-top + 1-orphan at a different size → now 5 across, equal
  size. Cause: `auto-fit, minmax(260px, 1fr)`. Same fix for "My Process".
  Both step down 5 → 3 → 2 → 1 without orphaning.
- Biddle-Shaw background video too bright → brightness is now per-project
  (`bgBrightness` in `lib/projects.ts`, default `0.4`; Biddle-Shaw `0.16`).
- Built the Biddle-Shaw case study page.

**Round 2**
- **Removed the preloader entirely** — Lottie, percentage counter, scramble
  text, and the curtain/blinds reveal. Brandon's call: it was decoration only.
  Deleted the `Intro` context that gated the hero on it and uninstalled
  `lottie-react`. Hero now animates immediately (~5s to settle, was ~9s).
  Hero elements' pre-animation state moved into CSS with reduced-motion and
  `<noscript>` fallbacks, since the curtain no longer hides first paint.
- Centred the "View My Work" CTA.
- Removed the glitch/blink effect on the hero subtitle.
- Fixed the RDR2 video (see §7.5).

This means two original decisions were reversed: the preloader is gone, and
only three of the four signature effects remain.

## 9. Open items

- **Biddle-Shaw case study needs Brandon's copy.** Three sections carry a
  `todo: string[]` field that renders as a visible amber "Needs your input"
  block, so placeholders cannot ship by accident:
  - *The Objective* — role, how the engagement came about, client's ask, timeline
  - *Build & Stack* — constraints, what was supplied vs. written by Brandon
  - *Results & Takeaways* — measurable outcomes, what he'd do differently

  Write answers into that section's `paragraphs` in `lib/caseStudies.ts`, then
  delete its `todo` field.
- **Git initialized 2026-09-03.** Initial commit `0ba3665` on branch `master`,
  68 files, working tree clean. `node_modules` and `.next` correctly ignored.
  Branch is `master`, not `main` — rename if you want the modern default.
  No remote configured; not yet deployed.
- Contact form posts to Web3Forms with a public access key. Works as-is; could
  move to a Server Action.

## 10. Running it

There is no `index.html` — Next.js compiles on request, so a server must run:

```bash
npm run dev      # http://localhost:3000 — day-to-day, hot reloads
npm run build
npm start        # production build
```

Content lives in `lib/projects.ts` and `lib/caseStudies.ts`. Edit those, not
components. Full detail in `README.md`.

---

## 11. Verification status

Checked on 2026-09-03 by running the commands, not from recollection:

| Claim | Method | Result |
|---|---|---|
| No git repo (at time of audit) | `git status`, `ls -d .git` | Confirmed none; repo since created, commit `0ba3665` |
| RDR2 now all-intra | `ffprobe` keyframe count | 188 / 188 frames |
| RDR2 original was poor | `ffprobe` on untouched source | 2 keyframes — see §7.5 correction |
| Fix 1 in code | `SmoothScroll.tsx:63` | `firstRender` guard present |
| Fix 2 in code | `StaggeredMenu.tsx:46` | `{ xPercent: 100, x: 0 }` present |
| Fix 3 in code | `BrandIcons.tsx` | Both icons exported; lucide imports cleaned |
| Fix 4 in code | `package.json`, `node_modules` | `lottie-react` absent |
| 3 of 4 effects remain | grep per effect | lanyard / fan-out / scroll videos present; preloader deleted |

**Not independently verified:** the React effect-ordering *explanation* for bug
1. The symptom and the fix are measured; the mechanism is documented React
behaviour consistent with the observation, but was not isolated in a test.

The "four signature effects" are the options Brandon chose from earlier in the
build: lanyard drag physics, preloader sequence, click-to-expand fan-out, and
scroll-linked project videos. Removing the preloader leaves three.

# UI kits and library elements: vetted shortlist (Scout, checked 2026-10-10)

Saved by Biscuit from Scout's report. Gzip sizes are estimates, not measurements. Re-measure in the production build.

## Decision
Scout found that none of the big kits can be installed whole: the site has no React or Tailwind, the inner-page JS budget is about 40 kB gzipped, and kits like shadcn, DaisyUI, Flowbite and Preline ship classes (`.btn`, `.card`, `.input`) that would collide with `src/styles/system/components.css`.

**What we do instead (Gurashish asked for the top 5 popular kits):** adopt their best *elements*, rebuilt as our own CSS and small vanilla JS, with each element's source kit and license named in code comments and in the QA log. The five kits we draw from:

| Kit | Popularity (GitHub stars, 2026-10-10) | License | What we take |
|---|---|---|---|
| Magic UI | n/a here (very widely used) | MIT | blur fade, bento grid, scroll progress, shimmer button, border beam (one pass), dot-grid pattern |
| React Bits | n/a here (very widely used) | MIT + Commons Clause (fine to ship in our own site; do not sell, sublicense or redistribute a port) | magnetic button (Magnet), spotlight card (already built as `.card-spot`) |
| shadcn/ui and Origin UI | 125.3k (shadcn) | MIT / AGPL for coss root | accordion pattern, built with native `<details name>` |
| Basecoat | 4.4k | MIT | copy-in JS behaviours only if a native element can't do it (tabs, dialog); never its CSS |
| Open Props | 5.5k | MIT | copy easing and shadow values into our tokens; don't add the package |

Plus GSAP's free plugins (confirmed free for commercial use at gsap.com/pricing): SplitText, DrawSVG, Flip, loaded only on pages that need them.

## Build these (top 8, Scout's order)
1. **Blur fade** on `.reveal` (cards, section headings), CSS only, `animation-timeline: view()` with a settled fallback.
2. **Bento grid** for the "what you get" blocks on For students and For counselors, about 25 lines of CSS.
3. **Native accordion** (`<details name>`) for FAQ blocks on inner pages and guides.
4. **Scroll progress bar** on guide articles, CSS `animation-timeline: scroll()`.
5. **One-pass shimmer or border sweep** on `.btn-primary` and the featured card, hover and focus only (the originals loop; ours must not).
6. **Dot-grid backdrop** for hero or section backgrounds, static radial-gradient (no glow pulse).
7. **Magnetic CTA** on the hero primary button only, offset 8 px or less, off on touch and reduced motion.
8. **GSAP Flip** for a guide category filter, only if a filter is added; SplitText only on the legacy pages that already load GSAP.

Already built, reuse: `.card-spot` (spotlight), `.card-tilt`, `.reveal`, `.rise`, the step stack, scroll-driven wall, form validation.

## Skip (with reasons)
- Text reveal: base text sits at 30% opacity, fails the "all text readable" rule.
- Marquee: loops, and there are no real partner logos.
- Animated list: fakes notification feeds (fake product UI).
- Hero video dialog: no focus trap in the original; use native `<dialog>` when there is a real video.
- Number ticker: only for real counts (for example the number of published guides) and with a reduced-motion guard.
- ScrambleText (gibberish hurts trust), ScrollSmoother (hijacks scroll, conflicts with Lenis and sticky), MorphSVG, MotionPath, Inertia, Observer, CustomEase (no use case or already covered).
- shadcn/ui, DaisyUI, Flowbite, Preline, HeroUI, Radix, Ark UI, Zag.js, Franken UI, Origin/coss: React or Tailwind required, or license unclear.
- Aceternity UI: license permits end-product use, but its showcase pieces mostly loop or are purely decorative.

## Not verified
Gzip sizes (estimated); reduced-motion behaviour of the originals; Basecoat JS size and keyboard quality; the Preline Fair Use terms; Zag vanilla adapter; coss `/ui` license.

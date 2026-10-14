# D2Excel home page motion brief (final, 2026-10-09)

## Answer
The home page is already technically sound but is mostly ambient CSS plus one scrub. The best lift for "modern, high-tech" is, in order: split-text hero, a cursor-reactive spotlight on cards, a tiny WebGL/CSS mesh gradient in the hero, a pinned scroll story on the home page itself, velocity marquee, and SVG draw. Nearly all of it runs on GSAP and Lenis that you already ship. Confidence: medium-high on feasibility (GSAP licensing verified at source; sizes are my estimates, measure with the build). Medium on "what Linear/Vercel/Raycast do": I did not inspect their code, the technique names below are the common public patterns for that look (inference).

## Hard rules for Forge (apply to every effect)
- Text is in the HTML and visible by default. Any hidden start state is written under `html.motion` only (existing fail-open plumbing: Layout.astro head script, 3s timeout).
- Reduced motion: no JS effect starts (main.ts already gates on `.motion`); CSS block already zeroes animation/transition. Static end state must look finished.
- Looping effects carry class `amb` or check `html[data-paused]` (WCAG 2.2.2 Pause button).
- Animate transform and opacity only. No layout properties, no animated blur filters on large areas.
- Do not touch the LCP element (hero h1/lede). Split-text must not delay first paint: split after fonts ready, and the headline must be visible at first paint (animate from a small offset with opacity starting at 1 for the LCP line, or only animate non-LCP text).
- Pointer effects: `(hover: hover) and (pointer: fine)` only. Touch gets the static state.
- Dynamic-import every new plugin, only on the home page, after idle.

## Facts verified
- GSAP is 100% free including commercial use; SplitText, MorphSVG, DrawSVG, ScrambleText, Flip, Draggable, Inertia, MotionPath, ScrollSmoother, Observer all listed free: https://gsap.com/pricing/ (checked 2026-10-09). License effective Apr 30 2025: https://gsap.com/standard-license/. Only restriction is building a competing no-code animation builder, not relevant.
- GSAP 3.13 release post says the bonus plugins were added to the public npm package; SplitText was rewritten, "50% smaller", and auto-adds `aria-label` on the parent and `aria-hidden` on generated pieces: https://gsap.com/blog/3-13/. Still unconfirmed locally for 3.15: run `ls node_modules/gsap/SplitText.js node_modules/gsap/DrawSVGPlugin.js node_modules/gsap/Flip.js` before building. (jsDelivr file listing did not load.)
- Spotlight-card and gradient-border patterns are well documented as a 1px padded rim plus a pointer-tracked radial gradient, with reduced-motion handling in some libs: https://cruip.com/how-to-create-a-spotlight-card-hover-effect-with-tailwind-css/ , https://v3.magicui.design/docs/components/magic-card
- Flowing WebGL gradient write-up (Alex Harri, reposted May 2025): https://phaser.io/news/2025/05/a-flowing-webgl-gradient-deconstructed . Codrops covers OGL (small WebGL lib) tutorials: https://tympanus.net/codrops/tag/scroll . Codrops Nov 2025 GSAP 3D scroll piece uses Three.js, so skip it: https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/
- Gap: I did not open Awwwards, the GSAP showcase, Linear, Vercel, Stripe or Raycast pages directly (search returned nothing specific). Forge or Gurashish should eyeball linear.app, vercel.com, raycast.com, stripe.com for taste reference.

## Current state (from source, previous run)
Astro 7, gsap 3.15, lenis 1.3. Hero has CSS glows, 64px grid, scan band, 3 orbit rings, GSAP word mask-rise intro, scroll drift. Topic strip is a scroll-driven (view()) translate, Chromium only, no velocity. Pinned how-it-works lives on /how-it-works/, NOT on home; home has a static 4-step row with CSS line draw. View Transitions are CSS cross-document. Wordmark is a placeholder; the real blue/red "D2E" oval is not in the repo. Reuse: `html.motion`, `amb`, `data-paused`, dynamic import in motion.ts. Fonts: Bricolage Grotesque and Instrument Sans, preloaded.

## Ranked effects (JS weights are gzip estimates for NEW code on top of existing gsap/ScrollTrigger)

1. Split-text headline reveal with scrubbed highlight (hero + section headings). Where: hero h1 words/chars rise with a blue-to-red sweep on the accent word; section h2s reveal by line on scroll. Why: kinetic type is the single most "award-level" signal and costs no assets. Build: GSAP SplitText (free, ~5-7 KB gz, est.), `mask: "lines"`, yPercent 100 to 0, stagger. Keep the LCP line visible at paint. Reduced motion: no split, plain text. Difficulty: easy-medium.

2. Cursor-reactive spotlight + gradient-border cards. Where: audience cards, guide cards, counselor/student value cards. Why: the Linear/Vercel/Raycast signature; reads "product" instantly. Build: CSS only: `--mx/--my` custom props set by one pointermove listener (rAF-throttled, ~0.4 KB), radial-gradient on a pseudo-element, 1px masked rim in blue-to-red. Opacity-only change. Reduced motion/touch: static soft rim, no tracking. Difficulty: easy.

3. Hero mesh-gradient shader (blue/red blobs, slow flow). Where: behind hero, replacing the two CSS glows. Why: the "alive" high-tech backdrop; uses brand colors. Build: single fullscreen triangle in raw WebGL, ~60 lines of GLSL, noise-blended 3-4 colors, render at 0.5 DPR, pause via IntersectionObserver and `data-paused`, no library (about 1.5 KB). OGL (~25-30 KB gz est.) is the fallback if raw WebGL is unwelcome; avoid Three.js. Load after idle so LCP is untouched; canvas gets the existing CSS glow as poster. Reduced motion / no WebGL: current CSS glows. Difficulty: medium.

4. Pinned home "how it works" scroll story. Where: replace the static 4-step row on home. Why: scroll storytelling is the core of product sites (Stripe, Linear); the student-counselor "match" SVG already exists on /how-it-works/ and can be reused as a compact version. Build: ScrollTrigger pin + scrub timeline, steps highlight in sequence, DrawSVG line (see 6), 0 KB new lib. Desktop only (matchMedia min-width 900); mobile keeps stacked steps. All four step texts remain in DOM and readable; scrub only changes emphasis (opacity 0.45 to 1 floor, never hidden). Reduced motion: static row. Difficulty: medium-hard.

5. Velocity-reactive marquee. Where: topic strip. Why: current strip only moves while scrolling and only in Chromium; velocity skew feels physical. Build: GSAP `horizontalLoop`-style ticker with `ScrollTrigger.getVelocity()` or Lenis velocity adjusting timeScale and a slight skewX (transform only), duplicate content with `aria-hidden` on the clone. ~1 KB. Works in all browsers. Reduced motion: static wrapped list (existing fallback). Difficulty: easy-medium.

6. SVG path draw on connectors and orbit. Where: steps connector, hero orbit rings stroke-in on load, section dividers. Why: precise, technical, cheap. Build: GSAP DrawSVG (free, ~2 KB est.) or CSS `stroke-dashoffset` with `pathLength=1` (0 KB). Prefer CSS where scroll-driven already works. Reduced motion: fully drawn. Difficulty: easy.

7. Magnetic buttons. Where: primary CTAs in hero and CtaBand. Why: tactile polish; signals craft. Build: pointermove within ~80px radius, `gsap.quickTo` x/y (max 8-10 px), inner label moves 40% as far. ~0.6 KB. Fine pointer only; keep focus ring and hit area stable. Reduced motion/touch: none. Difficulty: easy.

8. 3D card tilt with glare. Where: feature/audience cards, maybe a stacked "counselor profile" mock in hero. Why: depth without WebGL. Build: CSS `perspective` + rotateX/Y from pointer (same listener as #2), glare is an opacity layer. ~0.5 KB. Max 6 degrees. Fine pointer only. Difficulty: easy.

9. Constellation / network canvas. Where: counselor-matching section or CTA band: nodes (students, counselors) drift and link when close, with a few blue-red "match" pulses. Why: literally depicts a marketplace matching; strong brand story. Build: vanilla 2D canvas, ~40 nodes mobile / 80 desktop, ~1.5 KB, rAF paused off-screen and on `data-paused`, DPR capped at 1.5. Do not use tsparticles (50+ KB). Reduced motion: single static frame. Difficulty: medium.

10. Animated count-up stat band with ScrambleText labels. Where: a stats/trust row. Why: data-driven credibility. CAUTION: D2Excel is pre-launch; use only real, defensible numbers or non-numeric proof ("1:1", "50 states soon" only if true). Build: GSAP `snap` tween on textContent (0 KB new) and optional ScrambleText (free, ~2 KB). Final number is already in the HTML; animation starts from the real number minus a delta only under `.motion`. Reduced motion: static. Difficulty: easy.

11. Scroll-linked section color/lighting shift. Where: page background hue/spotlight moves from blue to red as user scrolls (CSS variable on body driven by ScrollTrigger or `animation-timeline: scroll()`). Why: ties to the logo's two colors and makes the page feel like one continuous scene. Build: animate one CSS custom property on a fixed gradient layer (opacity/transform only via two stacked layers cross-fading). ~0.3 KB. Reduced motion: static gradient. Difficulty: easy.

12. Flip-based filter/toggle on audience tabs. Where: a "For students / For counselors" switch that reflows cards. Why: demonstrates the two-sided marketplace and makes interaction feel smooth. Build: GSAP Flip (free, ~8 KB est.), dynamic import only on first interaction. Content stays in DOM for both states or switches via real buttons with aria-pressed. Reduced motion: instant swap. Difficulty: medium.

13. Film grain overlay. Where: hero and CTA band only. Why: removes the flat-gradient look and adds texture, the cheap "premium" tell. Build: tiny 128px tileable noise PNG/SVG feTurbulence data URI (~1-2 KB) at 4-6% opacity; static, or stepped background-position shift (transform on a pseudo-element) if animated. Not full-page (paint cost). Reduced motion: static. Difficulty: easy.

14. Parallax depth layers in hero (pointer + scroll). Where: orbit rings, grid, glows move at different depths on pointer move and scroll. Why: makes the existing orbit feel 3D; extends what exists. Build: `gsap.quickTo` on 3-4 layers, transform only, ~0.5 KB. Reduced motion/touch: static. Difficulty: easy.

15. Staggered card/section entrance via `ScrollTrigger.batch`. Where: all grids below the hero. Why: replaces uniform CSS `.reveal` with staggered, direction-aware entrances for rhythm. Build: `ScrollTrigger.batch`, y 24 to 0 and opacity under `.motion`. Keep existing CSS reveal as fallback where `animation-timeline` supported; do not stack both on one element. Reduced motion: visible. Difficulty: easy.

### Evaluated and deprioritized
- Lottie / Rive: skip for the home page. Lottie runtime is ~50-80 KB gz and Rive wasm is larger; all of this look is achievable with SVG + GSAP. Revisit only if a designer delivers a bespoke character animation.
- Full Three.js: too heavy for a 1.37s mobile LCP.
- MorphSVG: free and fine, but no obvious morph in the brand yet. Candidate later: the two circles morphing into the "D2E" oval once the real logo exists (that could be a great logo-reveal moment; needs the logo SVG).
- Flip as page transition: CSS View Transitions already do this natively.

## Suggested build order for Forge
Phase 1 (cheap, high impact): 1, 2, 5, 6, 7, 8, 13. Phase 2: 3, 4, 14, 15, 11. Phase 3 (needs content/decisions): 9, 10, 12. After each phase run chrome-devtools Lighthouse mobile and confirm LCP stays near 1.4s and total new JS is under ~15 KB gz (excluding the lazily loaded shader).

## Tools: what to install (run yourself; I installed nothing)
Already covered: gsap-skills, modern-web-guidance, impeccable, frontend-design, chrome-devtools MCP, Playwright. Nothing essential is missing. One optional add:

- Context7 MCP (Upstash): fetches current library docs (GSAP, Astro, OGL) into context so Forge doesn't use stale APIs. Verdict: Install with caution. Provenance (Upstash, widely used, listed in blog roundups of Claude Code web plugins) is from my background knowledge plus a secondary blog (https://lucaberton.com/blog/claude-code-plugins-better-websites/); I did NOT read its source. It sends library-name queries to Upstash's servers; it needs no credentials for basic use. Watch: no API keys pasted into it; remove if unused.
  - `claude mcp add context7 -- npx -y @upstash/context7-mcp`
  - Uninstall: `claude mcp remove context7`
  - Confirm the package name on https://github.com/upstash/context7 before running.
- Not recommended: any "animation generator" or Figma plugin for this task; no verified need, and each adds a data/credential surface.

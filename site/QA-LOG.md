# QA log

Regression guard for the site redesign. Every round compares against the baseline below; a page's Lighthouse, contrast or accessibility result may not drop without a written reason here.

Method for all numbers: production build served by `astro preview` on localhost, Lighthouse CLI 13.5.0 (mobile = Lighthouse default simulated throttling; desktop = `--preset=desktop`), headless Chrome. Raw JSON next to each section (`qa/*/raw/`). Screenshots with `playwright-cli` (run-code). JS sizes are gzipped transfer as served by the preview server.

## 1. Baseline, 2026-10-10 (before any redesign work)

All 16 pages, production build, `qa/baseline-2026-10-10/raw/*.json`.

| Page | Mobile perf | M a11y | M LCP s | M CLS | M TBT ms | Desktop perf | D a11y | D LCP s | Best practices (M/D) | JS kB (M) | Page kB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 404 | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 179 |
| about | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| for-counselors | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| for-students | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| guides | 99 | 98 | 2.0 | 0.00 | 0 | 100 | 98 | 0.4 | 100/100 | 45 | 180 |
| guides/ai-and-your-application | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| guides/how-to-choose-a-college-counselor | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| guides/paying-for-college | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| guides/sat-or-act | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| guides/uc-application | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| guides/what-a-major-is-worth | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| / (home) | 97 | 100 | 2.3 | 0.00 | 0 | 99 | 100 | 0.5 | 100/100 | 71 | 207 |
| how-it-works | 99 | 100 | 2.1 | 0.00 | 0 | 100 | 100 | 0.5 | 100/100 | 63 | 197 |
| join | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 180 |
| privacy | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 179 |
| terms | 99 | 100 | 2.0 | 0.00 | 0 | 100 | 100 | 0.4 | 100/100 | 45 | 179 |

- SEO is 69 on every page only because of the intentional demo `noindex`. Nothing else fails.
- Home: mobile perf 97, desktop 99, LCP 2.3 s, CLS 0, TBT 0, 207 kB page weight. Matches the numbers recorded earlier in `CLAUDE.md`.
- Guides hub accessibility is 98: heading order (the card `h3` follows the `h1` with no `h2`). Not fixed yet; the redesigned hub will fix it.
- JavaScript, gzipped: home about 70 kB (Lenis + motion 8 kB, GSAP 27, ScrollTrigger 17, home 8, logo reveal 10). Inner pages: about 8 kB on later pages of a session, about 45 kB on the first page of a session because the logo reveal (GSAP, 27 kB, plus intro 10 kB) loads. **That first-visit number is about 5 kB over the new inner-page budget of about 40 kB.** The redesign should lazy-load or slim the reveal (for example GSAP core only for the reveal, or a CSS-only reveal on inner pages).
- Screenshots (full page, 1440 and 390): `qa/baseline-2026-10-10/shots/home-1440.png`, `home-390.png`, `guides-hub-1440.png`, `guides-hub-390.png`, `article-uc-1440.png`, `article-uc-390.png`. Full-page captures draw the fixed header and skip link once at the scroll position, so they sit mid-page in the images; that is a capture artefact, not a layout bug. The 1024 and 768 captures from the plan were not taken in this run (only 1440 and 390 were asked for).

After the foundations work (system CSS, lab pages, fonts installed), production build, same method, `qa/after-system-2026-10-10/`:

| Page | Mobile perf | LCP s | CLS | Desktop perf | JS kB (M) |
|---|---|---|---|---|---|
| / (home) | 97 | 2.3 | 0.00 | 99 | 71 |
| /guides/ | 99 | 2.0 | 0.00 | 100 | 45 |
| /guides/uc-application/ | 99 | 2.0 | 0.00 | 100 | 45 |

No regression. The default production build contains no `/lab` route (see section 4).

## 2. Spikes, 2026-10-10

### Tilted guide wall inside a glowing oval ring (CSS 3D, transform-only)

Page: `/lab/wall/` (variants via `?v=a|b|c`). Component: `src/components/system/GuideWall.astro`, styles `src/styles/system/hero.css`.

Variants built and compared by screenshot:
- **a, halo (kept).** Ring behind, wall inside it, tiles fade only past the ring. Cleanest read; the ring is a complete, glowing oval echoing the logo.
- **b, portal (rejected).** Wall clipped to the oval. Clipped real card titles (violates readable text).
- **c, 3D ring in the wall's plane (rejected).** The ring was mostly lost behind the cards and looked weaker; not worth tuning.
Fixes found while iterating: the first composition put tiles under the headline (text unreadable), random depth made rows overlap (a near card covered the title above it), and the phone layout needed 2 columns, no mask and no per-card depth.

Cost, headless Chromium with software rendering (a real GPU should be better), cursor sweep of 90 moves plus a scroll through the hero:
| | Desktop 1440 | Phone 390 |
|---|---|---|
| Frames sampled / p50 / p95 / max | 276 / 16.7 / 16.8 / 16.8 ms | 79 / 16.7 / 16.7 / 16.8 ms |
| Layouts during interaction | 2 | 0 |
| Style recalcs (one per pointer frame) | 247, 30 ms in total | 0 |
| Script time | 12 ms over about 4.5 s | 1 ms |
| DOM nodes | 142 | 290 (page) |

Lighthouse on `/lab/wall/`: mobile 100 (LCP 1.8 s, CLS 0, TBT 0), desktop 100, accessibility 100. Page JS 2 kB gzipped (the whole system script, inlined). It was not tested on a real phone.

Decision: **adopt variant a with CSS 3D and vanilla JS.** Cost is negligible against the budget. Under reduced motion the wall renders finished and still; touch devices get scroll drift only.

### One React island

Test: `@astrojs/react` + `react` + `react-dom` installed inside `site/`, one `client:visible` spotlight and tilt tile (twice on a page), built, measured, then **fully removed** (`package.json` verified identical to its pre-test state).

| | Added JS (gzip) |
|---|---|
| react-dom client chunk | 65.7 kB |
| react runtime | 3.0 kB |
| the island itself | 0.6 kB |
| **Total for the first island** | **about 69 kB** |

Lighthouse on that test page: mobile 99, LCP 2.1 s, JS 69 kB. It would take the home page from about 70 kB to about 140 kB against an 80 kB budget, to deliver an effect that is about 20 lines of vanilla JS (the spotlight and tilt now in `system.ts`, 1.8 kB gzipped for everything).

Decision: **no React.** Port library effects to vanilla CSS and JS (GSAP only where a timeline or pin is needed). Revisit only for a component with real state that is expensive to write by hand, and only after the logo-reveal weight above is fixed.

### Optional 3D campus layer

Skipped, as instructed for this run. Not measured.

## 3. Design system verification, `/lab/system/`

Built with `npm run build:lab`, `qa/system-2026-10-10/raw/`. Lighthouse: mobile performance 100 (LCP 1.8 s, CLS 0, TBT 0), desktop 100, accessibility 100, best practices 100, SEO 66 (noindex on purpose), 146 kB page, 2 kB JS.

| Check | Method | Result |
|---|---|---|
| Text contrast, real rendered backgrounds | Collected every text run and its colour, hid the text, screenshotted the page in tiles, took the 2nd-percentile worst pixel under each run. 598 runs at 1440, 556 at 390 | Lowest real text ratio 4.92:1 (12 px mono on a red swatch). Everything meets 4.5:1 (3:1 for large text). The one run under 4.5 is the intentional 3:1 non-text sample (field border, 3.68:1), now drawn as a box rather than text |
| Token pair table | Computed at build time from `tokens.css` (26 pairs, dark, light, tiles) | All pass. Lowest text pair: muted on a navy card 6.72:1 |
| Visible focus | Tabbed through 139 (1440) and 140 (390) focus stops | 0 without an outline; 3 px ring, white on navy and blue on paper |
| Focus never hidden | Same walk, checked against nav pill and dock | None covered at 1440. First run found a textarea 10 px under the dock; a `focusin` re-centre handler was added. Remaining flags: the skip link (intentionally on top) and the 40rem contrast table's scroll frame, which is a tall scroller, not a control hidden by chrome |
| 44 px targets | 82 interactive elements per width | 0 below 44 px after fixing the breadcrumb `Home` link (38 px). Inline links inside paragraphs are 22 to 28 px tall; WCAG exempts inline text links, and they sit in 17 px body text |
| Reduced motion | `prefers-reduced-motion: reduce` | 0 running animations, 0 elements with an animation name or a transition time, notification and wall at opacity 1 |
| No JavaScript | Context with scripts off, 1440 and 390 | All content present (10,260 vs 10,268 characters of main text; the difference is the live Pacific clock chip, which is now hidden until JS shows it). Nav links stay visible and wrap in normal flow (a first run had the fixed pill covering the first line; fixed). Menu button hidden, errors not shown by default |
| No overlap | Pairwise text-run overlap, plus screenshots at 1440 and 390 | Only line boxes of tight headings (line height 0.98 to 1.1 with the serif accent) overlap, as expected; no glyph collisions in any screenshot. Wall excluded from the geometric test (tilted); checked by eye at both widths |
| Horizontal overflow | 320, 390, 768, 1024, 1440, 1920 | None at any width |
| Sticky and bottom navs | Dock link jumps, end of page | Anchors land 148 px below the nav bottom (216 vs 68). Dock hides over the footer; last text ends 104 px above the viewport bottom. A fixed pill necessarily sits over content while it scrolls past; nothing is ever unreachable |
| Detector | `impeccable detect` on the new CSS, components and lab pages | 0 blocking findings. 38 advisory notes about literal values outside the documented ramp (small fixed sizes and status colours), accepted |
| Guidelines review | `web-design-guidelines` rules (Vercel) applied by hand | Fixed: tap highlight colour, dock overscroll containment. Not applied: Title Case headings (the site uses sentence case throughout) |

## 4. Decisions made without a check-in (Gurashish asked for no check-ins)

- **Fonts:** Geist (headlines and text) + Instrument Serif italic (accent word) + Geist Mono (labels). Funnel Display and Hanken Grotesk were set side by side with Geist on the real headline and dropped (Funnel's look is a little livelier but it would be a fourth family, since Geist is still needed for body and mono pairs with it; Hanken was heavier at the same size). Newsreader was rejected for weight (130 kB per style).
- **Palette:** logo blue #0040c0 and red #e01020 kept; navy ramp (#050b24 base); warm paper ramp (#fbfaf6 base) with navy-tinted ink; red appears once per screen. Details in `DESIGN.md`.
- **Lab routes:** sources in `src/lab/`, injected by an Astro integration only in `astro dev` or with `npm run build:lab`. The normal production build has no `/lab` routes (verified: `dist/lab` absent, sitemap has 15 URLs, no references). Pages are `noindex` and the sitemap filters `/lab/`.
- **Packages added (inside `site/`):** `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`, `@fontsource/instrument-serif`. React was installed for the spike and removed.
- **Old pages untouched.** The old home still has the Pause motion button until the home round replaces it.

## 5. Home page v2, 2026-10-10 (Tier 1, step 1 of Phase C)

Built on `SystemLayout`: `src/pages/index.astro`, `src/styles/system/home.css`, `src/styles/system/intro.css`, `src/scripts/system.ts`. Raw Lighthouse JSON and sweeps: `qa/home-v2-2026-10-10/raw/`, screenshots (scroll sheets at 1440, 1024, 768, 390 and the story beats) in `qa/home-v2-2026-10-10/shots/`. Same method as section 1.

### Before and after (home)

| | Baseline (old home) | Home v2 |
|---|---|---|
| Mobile performance | 97 | 99 |
| Desktop performance | 99 | 100 |
| Mobile LCP (simulated throttle) | 2.3 s | 2.10 s |
| CLS | 0.00 | 0.00 |
| TBT mobile / desktop | 0 / 0 | 0 / 0 (a 16 ms run once) |
| Accessibility / best practices (M and D) | 100 / 100 | 100 / 100 |
| JavaScript, gzipped, first page of a session (includes logo reveal) | about 71 kB | 40.3 kB (system script 2.0 + intro 9.7 + gsap 27.1 + helper 0.9 + reveal glue) |
| JavaScript on later pages of a session | about 8 kB | 2.0 kB |
| Page weight | 207 kB | 184 kB |
| CSS (home, gzipped, render-blocking) | n/a | 11.4 kB |

Inner pages after the same run (old design, untouched apart from copy and pruned dead CSS): for-students, guides, uc-application, how-it-works all mobile 99 / desktop 100, LCP 1.96 to 2.11 s, CLS 0, a11y 100 (guides hub still 98, heading order; known), JS 45.7 kB first visit (63 kB how-it-works), same as baseline.

### Checks run on the production build (served by `astro preview`)

| Check | Method | Result |
|---|---|---|
| Text contrast on rendered pixels | Every text run's rect and colour collected, all text hidden, page screenshotted in 6000 px tiles, 2nd-percentile worst pixel under each run, WCAG ratio (4.5, or 3 for large). Widths 1920, 1440, 1024, 768, 390; about 200 runs each | 0 failures at every width. Lowest 5.25:1 ("From: D2Excel" mono label on the notification card's lightest gradient end), then 5.5:1 (white on the blue button). Back-card state (brightness 0.8 while the next step covers it) computed from the same samples: lowest 4.75:1 |
| Hand-drawn oval | Excluded from sampling (decoration); checked by eye in a 2x crop | The first sizing crossed ascenders and the line above; resized until it clears every glyph |
| Overflow | 320, 390, 768, 1024, 1440, 1920 | `scrollWidth` equals viewport at all six. The end-card ring is clipped inside its card |
| Console and network | Fresh session (logo reveal) and with the reveal skipped | 0 errors, 0 warnings, 0 failed or 4xx requests; also 0 console messages via `playwright-cli` |
| Looping motion | `document.getAnimations()` 3.5 and 6.5 s after load | 0 infinite animations, 0 running time-based animations after settling. Scroll-driven ones only |
| Reduced motion | `prefers-reduced-motion: reduce` (Playwright and `playwright-cli`) | 0 animations, no pin (0 sticky cards), oval fully drawn, notification and headline words at rest, 0 elements at opacity 0, curtain not shown |
| JavaScript off | Context with scripts disabled | h1, all six sections and the footer present (5,134 characters of main text), nav flows in the page (not floating over content), Pacific clock hidden, curtain hidden, menu button hidden. Below-the-fold tiles stay hidden until scrolled to when the browser supports view timelines (reveal is CSS) |
| Keyboard | Tab 80 stops forward, Shift+Tab 80 back, at 1440x900, 1280x640, 1024x768, 390x844; each stop checked with `elementFromPoint` and against the nav and dock | 0 stops covered or off screen except the skip link, which is meant to sit on the nav. Found and fixed: dock links stayed focusable while hidden (now `inert`); focus could land on a pinned step card hidden under a later card (a `focusin` handler scrolls to it) |
| Nav and dock vs text | Dock link jumps at 1440 and 390 | Every target heading lands 96 to 197 px below the nav and above the dock, and the active dock item matches. A fixed pill still passes over content while scrolling, as before |
| Story beats | Scroll to each beat at 1440x900, 1024x768, 1280x640 (pinned), 768x1024 and 390x844 (stacked) | One card per beat with only a sliver of the next; fifth card fully readable with the next section rising over it. Found and fixed: at 640 px tall the next section covered the end card's buttons (hold zone lengthened, overlap cut) |
| Logo reveal | Frames at 0.45 to 3.2 s | Plate, ring draw, wipe, flight to the nav's oval plate, curtain split, then the hero words and notification arrive. Done by about 3.3 s |

### Variants tried (and why)

- **Headline mark.** Oval around the phrase (kept: ties to the logo's oval, reads as hand-drawn); hand underline (quiet but carried less); marker highlight (looked like a button). Spike: `/lab/home-spikes/`.
- **Story stack.** A: stack-over with the previous card scaled and darkened (kept); B: previous card slides up and fades (rejected: ghosted text from two cards overlapped, so words collided); C: previous card rotates like a fan (rejected: rotated text, corners leave the column). Spike: `/lab/home-spikes/?s=a|b|c`.
- **Hero wall.** Kept the halo variant from the earlier spike. Inside it: 3x3 with labelled tiles overflowed the oval and the notification covered card text; final is 3x2 real cards plus a glyph-only row under the notification. Notification placement: over the lower left (covered text), then over the lower edge of the ring (kept).
- **Tablet.** Two columns at 1024 made the art 330 px wide and cramped; the hero is one column below 70rem.

### Decisions made without a check-in

- **No GSAP ScrollTrigger, no Lenis on the home page.** The pin is `position: sticky` and the easing is a CSS view timeline, so scroll is never trapped and there is no JS cost. The plan called for a ScrollTrigger pin; sticky does the same job.
- **The reveal's plate is now an oval** (matches the nav logo plate exactly, so the flight ends on it).
- **Guides got a `verified` field** (`2026-09`) because the brief says each source article carries "Last verified: September 2026". The six placeholder guide pages on the site still say they are placeholders; the date refers to the Drive source article.
- **Copy:** "Bay Area first" removed from the footer and the six older pages' copy and meta text (copy only, no layout change), per the California rule. The home page says California everywhere.
- **Dead code removed** after the home rewrite: `scripts/home.ts` (shader, marquee, old story timeline), the home branch of `motion.ts`, and the old home-only CSS (hero, strip, story, tiles, why, curve and lift). The Pause button stays on the older pages that still have looping backdrops.
- **Dock label** "How we check" shortened to "Facts" so all five items fit at 390 px.

### Facts used on the page (re-check each cycle)

UC application window Oct 1 to Nov 30, 2026; FAFSA opens by Oct 1, 2026; Cal Grant deadline Mar 2, 2027 (all from `website-brief.md` section 4.5, sourced to the Drive articles). "Last verified September 2026" is the brief's standard article line. The Decide panel's table (UC and CSU do not look at test scores; other colleges vary) is from the brief's summary of the SAT or ACT article, not from a table copied out of it. No Drive access in this run: Pioneer should confirm the three dates, the month, and that fragment against the articles.

## 6. Open items and where to resume

1. Done in section 7: guides hub and article template. Next in Phase C: For students, For counselors, How it works, About, Join, Footer, Privacy, Terms, 404 (all still on the older layout).
2. First-visit JS on the pages still on the older layout is about 45.7 kB; the redesigned layout (home, hub, articles) costs 39 to 40 kB on first visit and 2 to 3 kB after.
3. Older pages still use the older header, footer and styles, so moving from home to them changes the header look until their rounds.
4. Still unverified: real-device frame rates and phone scroll feel, Firefox and WebKit (`animation-timeline`, `mask-composite`, the sticky stack; where view timelines are unsupported the stack stays sticky but unscaled by design, not tested), cross-page View Transition mid-frames, the 3D campus layer, and a manual screen-reader pass (VoiceOver or NVDA).
5. The Pacific clock chip and the dated items are content that must be re-verified each cycle.
6. `lab/home-spikes` and `lab/wall` are private; they can be deleted once the choices above are no longer needed for reference.


## 7. Guides hub and article reader, 2026-10-10 (Tier 1, step 2 of Phase C)

Built on `SystemLayout`: `src/pages/guides/index.astro`, `src/pages/guides/[slug].astro`, `src/styles/system/guides.css`, `src/styles/system/article.css`, `src/plugins/guide-article.mjs`, `src/content.config.ts`. Raw Lighthouse JSON, sweep output and screenshots (four widths for the hub and all six articles, plus the three hub variants and the article head choice) are in `qa/guides-2026-10-10/` (`raw/`, `shots/`, `scripts/`, `*-final.txt`). Same method as section 1.

### Before and after

| | Baseline (old placeholder pages) | Hub and articles now |
|---|---|---|
| Hub mobile / desktop performance | 99 / 100 | 99 / 100 |
| Hub accessibility | 98 (heading order) | 100 |
| Article mobile / desktop performance (6 articles) | 99 / 100 (placeholders) | 98 / 99 |
| Article accessibility | 100 | 100 |
| LCP mobile (simulated) / desktop | 2.0 s / 0.4 s | 2.1 s / 0.4 s |
| CLS | 0.00 | 0.00 |
| TBT | 0 | 0 |
| JavaScript, first page of a session (includes logo reveal) | 45 kB | 38.9 kB (system script 2.1 + intro 9.5 + gsap 26.5 + helper 0.8) |
| JavaScript, later pages | 8 kB | 2.9 kB |
| Page weight (article / hub) | 180 kB | 183 to 188 kB / 181 kB |

Article performance is 98 rather than 99 on mobile with the same LCP (2.1 s) and CLS 0; the long articles carry more DOM. All stay above the 95 budget. Home was re-measured after the copy and wall edits: mobile 99, desktop 100, LCP 2.1 s, CLS 0 (unchanged).

### Checks run on the production build (served by `astro preview` on port 4390)

| Check | Method | Result |
|---|---|---|
| Internal notes never render | `grep -r` of `dist/` for `INTERNAL`, the two marker strings, `openMarkers`, `driveFileId`, "Drive file title" | 0 hits. The plugin drops comment nodes; the two comments in `choose-a-counselor` (one block, one inline in the Sources list) are gone |
| Text contrast on rendered pixels | Same method as section 5 (text hidden, page tiled, 2nd-percentile worst pixel under each run), 8 pages at 1920, 1440, 1024, 768 and 390 (40 combinations, 120 to 580 text runs each) | 0 failures. Lowest 5.25:1 (home notification label, unchanged); lowest on hub and articles 5.51:1 (white on the blue button), then 6.41:1 ("Under review" tag, 12 px). The hand-drawn oval on home is excluded as decoration, as before |
| Text faded by a mask | Geometric check: every text corner on the home wall against the mask's solid stop (the contrast method cannot see this) | **Found a real problem:** with the longer real titles the top-right wall card ("Do You Still Need the SAT or ACT?") sat in the fade zone and "Need" was half transparent, and one tile was cut by the wall box. Fixed (mask widened, dead override removed, plane scale 1.06 to 1). Worst text corner now 0.71 of the mask radius against a solid stop of 0.90, at 1920 down to 768; the phone wall has no mask |
| Characters per line | Rendered lines of long paragraphs counted with `Range.getClientRects()` | 69 at 1440, 68 at 1024, 69 at 768 (39 on a phone, set by the screen width) |
| Overflow | 320, 390, 768, 1024, 1440, 1920 on the hub, home and six articles, plus a search for any element past the right edge | `scrollWidth` equals the viewport everywhere. Tables restack on phones instead of scrolling |
| Console and network | Fresh session (logo reveal plays) at 1440 and 390 on all 8 pages | 0 errors, 0 warnings, 0 failed or 4xx requests |
| Reduced motion | `prefers-reduced-motion: reduce`, 1440 | 0 running animations, 0 hidden text elements, no curtain, on all 8 pages |
| JavaScript off | Context with scripts disabled | h1 and all text present on all 8 pages (articles 4,700 to 18,800 characters of main text), both contents lists present as plain links, curtain not shown, no overflow. The hub filter still works (see below) |
| Filter chips | Click "Funding" then "All" with and without JavaScript | 6 cards, then 1, then 6 in both cases; "Showing 1 of 6 guides" matches (CSS counters) |
| Keyboard | 140 Tab presses at 1440 and 390 on the hub and three articles; each stop checked with `elementFromPoint`, against the nav pill and for a visible ring (outline, a pseudo-element outline for stretched links, or a halo) | 0 stops covered, off screen or ring-less |
| 44 px targets | Interactive elements outside running text, 1440 and 390 | 0 under 44 px after widening the "Home" breadcrumb and the filter chips (they were 38 wide and 30 tall). The one reported item is a stretched card title whose click area is the whole card |
| Detector and guidelines | The impeccable design hook ran on every written file (0 findings); `web-design-guidelines` rules applied by hand (focus, targets, semantics, no horizontal scroll, labelled controls) | Fixed: chips and breadcrumb targets. Not applied: Title Case headings (sentence case throughout) |
| Print | Print media emulated on `college-money` | Chrome, nav, contents and cards removed, black on white, links spelled out in Sources |

### Variants tried (and why)

- **Hub header art.** Arc of three real cards inside the ring (kept: it ties to the logo's oval and reads as "guide cards" at once); a perspective shelf (rejected: a smaller copy of the home wall); a stepped ledger of wide strips (rejected: the clearest list, but the oval was lost). Screenshots: `shots/hub-variant-a-arc.png`, `-b-shelf.png`, `-c-ledger.png`. A fanned stack was dropped before building because overlapping cards would cover each other's titles.
- **Article head.** Light paper head with a faint oval glow (kept, matches "light, calm"); navy head with a seam into the paper (rejected: two moods in one page, and the long real titles looked heavy on navy). Screenshot: `shots/article-head-light-chosen.png`.
- **Tables on phones.** Each row becomes a card (kept: sentence-length cells stay readable); horizontal scroll inside a frame stays as the wide-screen safety net only.

### Decisions made without a check-in

- **Markdown processor.** Astro 7 defaults to the Sätteri processor, which ignores `markdown.rehypePlugins`. Installed `@astrojs/markdown-remark` (first-party, build time only, inside `site/`) and set `markdown.processor: unified({ rehypePlugins })`. The plugin only changes presentation; no guide word is edited. Typographic quotes (smart punctuation) are the one rendering difference from the raw file.
- **Old placeholders not deleted.** `how-to-choose-a-college-counselor.md`, `paying-for-college.md` and `what-a-major-is-worth.md` are excluded in `content.config.ts` (a deletion was blocked by the permission layer); old URLs redirect to the new slugs (`college-money`, `major-worth`, `choose-a-counselor`). They can be deleted by hand.
- **Order.** `GUIDE_ORDER` in `src/config.ts` (UC, money, SAT or ACT, majors, AI, counselor). The "Key dates inside" tag and the "Jump to the key dates" link come from a heading containing "dates" in the guide, not from hard-coded flags.
- **Reading time** is derived from the word count (220 words a minute), not stated by the docs.
- **Under review.** Two guides carry `status: needs-review` (college-money, choose-a-counselor): the tag on card and header, and a short note above the text.
- **Source links.** Where the front matter lists a bare domain (studentaid.gov, FairTest.org) the same words in the Sources list are linked to `https://` plus the domain. Nothing else is linked, because the other `url` fields are empty.
- **Home copy** (Pioneer's fact-check, applied): the "re-check each one" sentence, "built the same way" (lede now says each guide names its sources and when it was last checked) and "Key dates in a table" (now "Guides with deadlines list them in a table."), "expanding the counselor network now", "Coming soon" and "In development" (now "Planned" on all four places), the SAT or ACT caption and label. FAFSA: `studentaid.gov` could not be verified from this machine (WebFetch timed out three times; the site returns an empty app shell to curl), so the "Opens by Oct 1, 2026" claim is replaced by "Check studentaid.gov for the current FAFSA opening date" in both places. The home page no longer states any FAFSA date.

### Guide content to review (not changed)

- `college-money`: Quick answer and the dates table say a FAFSA test version "is already open now" and a "Now (Sept 2026)" row; today is 2026-10-10, so the wording is stale or about to be. Under review.
- `uc-application`: the key-dates table lists "Aug 1, 2026 ... You can start filling it out now" and "Oct 1, 2026 FAFSA and Dream Act open" as current or future; both dates have passed. The "FAFSA opens Oct 1" claim is also unverified.
- `major-worth`: "over 500,000 tech layoffs recently" and "more than 40% of recent grads ... jobs that don't require a degree" have no matching entry in Sources (Pioneer flagged the same two). The NY Fed unemployment figures are tied to "as of March 2026".
- `ai-and-your-application`: the Duke "stopped giving essays a numerical score" statement has no matching Sources entry (Pioneer flagged it); the school policy pages (Yale, Brown, Georgetown) change and the three source URLs are empty.
- `sat-or-act`: the "Optional for now" row (Princeton, Columbia) and the February 2026 UNC and CLT claim are policy-change sensitive (Pioneer flagged both); "about 325 colleges accept the CLT" has no per-figure source (my observation).
- `choose-a-counselor`: two open markers remain in the front matter (how D2Excel is paid; the CollegePlannerPro URL). The guide has no "Last verified" line of its own (the front matter date is used). It states caseload and pricing figures from third-party surveys (a self-selected survey, flagged as such in the text); the project rule against caseload numbers applies to D2Excel's own claims, so this needs Gurashish's call.
- All six: the sources have no URLs except two bare domains; students cannot click through to the official pages yet.
- Each category currently has exactly one guide, so each filter chip shows one card; the filter pays off once there are more guides.

### Not verified

- Real-device frame rates and phone scroll feel; Firefox and WebKit (the filter relies on `:has()`, the head glow on `mask-image`); a manual screen-reader pass (VoiceOver, NVDA); the print result in an actual print preview or PDF viewer (`pdftoppm` is not installed, so only media emulation was viewed); cross-page View Transition mid-frames.


## 8. Round 1 of the polish loop: For students and For counselors, 2026-10-10

Both pages moved from `Layout.astro` to the redesign, on a shared inner-page template: `src/layouts/InnerLayout.astro`, `src/styles/system/inner.css`, `src/scripts/inner.ts`, and `src/components/system/` `InnerHero`, `InnerSection`, `FeatureRow`, `LiveBoard`, `InnerAsk`. Raw Lighthouse JSON, sweep output, scripts and screenshots: `qa/round1-2026-10-10/` (`raw/`, `scripts/`, `*-final.txt`), final screenshots in `shots/round1/` (1440 and 390 full page, hero variants in `shots/round1/variants/`). Same method as section 1 (production build on `astro preview` port 4390, Lighthouse CLI 13.5.0).

### Numbers

| | For students | For counselors |
|---|---|---|
| Lighthouse mobile performance / accessibility | 98 / 100 | 98 to 99 / 100 |
| Lighthouse desktop performance / accessibility | 100 / 100 | 100 / 100 |
| LCP mobile (simulated) / desktop | 2.3 s / 0.5 s | 2.1 to 2.3 s / 0.5 s |
| CLS | 0 (8 of 8 desktop runs after the fix below) | 0 |
| TBT | 0 | 0 |
| JavaScript, first page of a session (includes logo reveal) | 39.5 kB gzipped | 39.5 kB |
| JavaScript, later visit (SplitText and DrawSVG on top of GSAP core) | 35.1 kB | 35.1 kB |
| Page weight | 185 kB | 184 kB |
| Lowest text contrast (rendered pixels, 6 widths 320 to 1920) | 5.51:1 (white on the blue button), 0 failures | 5.51:1, 0 failures |

Mobile performance is 98 to 99 (it was 99 before the bento tiles and blur fade; LCP 2.1 to 2.3 s against the 2.5 s budget).

### Checks run

| Check | Result |
|---|---|
| Overflow at 320, 390, 768, 1024, 1440, 1920 | none |
| Console and network, fresh session at 1440 and 390 | clean |
| Reduced motion | 0 running animations, 0 hidden text elements, no curtain |
| JavaScript off | h1 and all copy present (2,716 and 2,205 characters of main text), no curtain, no overflow, every section and diagram visible |
| Blocks below the first screen at scroll 0 (blur fade) | 10 and 11 `.rise` blocks, 0 with opacity or blur applied (fill is `forwards` only) |
| Keyboard, 140 Tab presses at 1440 and 390 | every stop visible, uncovered by nav or dock, ringed |
| 44 px targets | all at least 44 px at 1440 and 390 |
| Text under the nav or dock on first view | none at 1920x1080, 1440x900, 1024x768, 768x1024. At 390x844 and 320x640 the dock covers part of the hero art or a button until the first scroll (same as Home); focus re-centres it |
| Impeccable detector | advisories only: design-system literal sizes, the italic serif accent and mono eyebrows (both mandated by DESIGN.md and the brief), nested cards in the bento tiles |
| web-design-guidelines | applied by hand: semantics and heading order (h1, h2, h3), labelled and hidden decoration, focus, no `transition: all`, reduced motion, curly apostrophe fixed. Not applied: Title Case headings (sentence case throughout) |

### Findings worth keeping

- **CLS 0.135 from a scrollbar appearing (fixed).** The first paint can happen while only the hero has streamed in; with the hero exactly one viewport tall the page had no scrollbar, then the rest arrived and a classic scrollbar moved the whole layout 7 px. Reproduced in 2 of 3 Lighthouse desktop runs from the trace (the shift rects were 75 to 68 px). Fix: `html { scrollbar-gutter: stable }` in `inner.css`. A second, smaller shift (0.026) came from an inline script in the middle of the hero copy, which let the browser paint a half-streamed hero; the script now sits before the section. Home and the hub did not show it, but they would be exposed to the same race.
- **Reveals that hide.** `.reveal` in `base.css` (used by Home) starts at opacity 0 with fill `both`, which is what leaves blocks blank in a beyond-viewport capture. `.rise` (inner pages) uses fill `forwards`, so a block that has not entered the viewport is untouched. Not changed on Home; worth a look in a later round.
- **Contrast at 320.** The Venn labels crossed the oval borders at 320 (3.0:1 and 1.3:1 in the pixel sampling); the ovals now stack on phones with the shared label on a chip.

### Variants tried (and why)

- **Students hero art.** A three-stop path climbing the ring: two real guide cards, then a dashed "Planned: Find a counselor" (kept: it says live now, planned next, and is a different structure from the hub's arc). A tilted now-and-next pair (rejected: a smaller copy of the hub's tilted cards and it repeated Home's dated item).
- **Counselors hero art.** A vertical bridge: families reading the guides today, the D2Excel oval, counselors as a dashed Planned card (kept). A horizontal bridge (rejected: sparse inside the ring, small type; screenshot not kept). Two overlapping ovals (rejected: three ovals competed and the labels collided).
- **Feature blocks.** Alternating rows with a centre rule and oval markers were built first (screenshots not kept), then replaced by a bento grid on the instruction to use the Magic UI bento. The alternating layout stays in the template (`.frows`) for How it works.
- **Art stage.** A bordered panel behind each diagram (rejected: nested cards, boxy), then a soft oval of light (kept).

### Decisions made without a check-in

- **Library elements** are listed with licenses in the code comments and the round report. The beam that travels the closing button on scroll was built and removed (a view timeline gives a 48 px window for a 48 px button, and the instruction named a hover and focus sweep instead).
- **SplitText and DrawSVG** run only on later visits (not the first page of a session): GSAP core is already loaded for the logo reveal, and the two plugins would take a first visit from 39.5 to about 45 kB against the 40 kB budget. On a later visit they add 32 kB (core 26.4, SplitText 3.2, DrawSVG 1.9) after the page has painted. Reduced motion and no-JS get the finished page.
- **FAQ accordion skipped.** Neither page has existing question-and-answer copy, and none may be invented.
- **Counselor copy kept as is:** "A background check. Families trust a marketplace more when the people on it have been checked." The rule against "vetted" is not broken by the word, but the sentence describes vetting; needs a call (listed in the round report).

### Not verified

- Real-device frame rates and phone feel; Firefox and WebKit (`animation-timeline`, `@property`-free but `:has()` and `scrollbar-gutter`, mask composite); a manual screen-reader pass (SplitText sets `aria-label` on the headline and hides the split words, not heard in VoiceOver or NVDA); the later-visit LCP on a throttled run (Lighthouse always starts a fresh session, so it measures the first-visit path; the later visit was only measured unthrottled on localhost).


## 9. Round 2 of the polish loop: How it works and About, plus four fixes, 2026-10-11

How it works and About moved onto the inner-page template (`InnerLayout`, `InnerHero`, `InnerSection`, `FeatureRow`, `InnerAsk`). Raw Lighthouse JSON, sweep output and scripts: `qa/round2-2026-10-11/` (`raw/`, `scripts/`, `*-final.txt`); screenshots in `shots/round2/` (before and after, variants in `shots/round2/variants/`). Same method as section 1 (production build on `astro preview` port 4390, Lighthouse CLI 13.5.0, one run per page and mode, plus three extra desktop runs on the two new pages).

### Numbers

| | Home | How it works | About | For students | For counselors |
|---|---|---|---|---|---|
| Lighthouse mobile performance / accessibility | 99 / 100 | 98 / 100 | 98 / 100 | 98 / 100 | 98 / 100 |
| Lighthouse desktop performance / accessibility | 100 / 100 | 100 / 100 (3 more runs: 100) | 100 / 100 (3 more runs: 100) | 100 / 100 | 100 / 100 |
| LCP mobile (simulated) / desktop | 2.1 s / 0.4 s | 2.3 s / 0.5 s | 2.3 s / 0.5 s | 2.1 s / 0.5 s | 2.3 s / 0.5 s |
| CLS, TBT | 0, 0 | 0, 0 | 0, 0 | 0, 0 | 0, 0 |
| JavaScript, first page of a session (gz) | 38.8 kB | 39.9 kB | 39.9 kB | 39.9 kB | 39.9 kB |
| JavaScript, later visit (gz) | 3.0 kB | 35.5 kB | 35.5 kB | 35.5 kB | 35.5 kB |
| Page weight | 184 kB | 186 kB | 186 kB | 186 kB | 186 kB |
| Lowest text contrast (rendered pixels, 320 to 1920) | 5.25:1, 0 failures | 5.51:1, 0 | 5.51:1, 0 | 5.51:1, 0 | 5.51:1, 0 |

Home did not regress (baseline mobile 99, desktop 100, LCP 2.1 s, CLS 0). Best practices 100 everywhere; SEO 69 everywhere because the demo build is `noindex` on purpose.

### Checks run

| Check | Result |
|---|---|
| Dock at rest (first view, text under a visible dock or the nav) at 1920, 1440, 1024, 768, 390, 320 on all five pages | none. The dock is away until the first scroll (`.js .nav-dock:not([data-on])`); after a scroll of 500 px it is on at every size |
| Dock with scripts off | static pill after the footer (`position: static`), covers nothing |
| Dock with reduced motion | same as with motion: away at rest, appears after the first scroll without a slide |
| Overflow at 320, 390, 768, 1024, 1440, 1920 | none, five pages |
| Console and network, fresh session at 1440 and 390 | clean, five pages |
| Reduced motion | 0 running animations, 0 hidden text elements, no curtain; both How it works lists are visible, one after the other, under "For students" and "For counselors" |
| JavaScript off | h1 and all copy present (How it works 1,624 characters, About 1,763), no curtain, no overflow, both lists visible |
| Keyboard, 140 Tab presses at 1440 and 390 | every stop visible, uncovered by the nav or the dock, ringed (five pages). Tabs: arrow keys, Home and End switch and move focus, `aria-selected` and roving `tabindex` follow, the hidden panel is `inert` |
| 44 px targets | all at least 44 px on the four inner pages. Home reports three: two stretched tile links (whole-tile click area) and one inline "Read the guide" link inside a sentence |
| Oval clearance at 1440 | For students "now" no longer touches "counselor" (about 13 px clear), For counselors "your kind" encloses its ascenders and descenders; Home measured by eye: clear |

### What changed

- **Dock** (`components.css`, `system.ts`): shown only after the first scroll (and hidden over the footer, as before). Before, it sat over the hero art at 390 and 320 until the first scroll.
- **Oval around the accent word** (`inner.css`, `home.css`): inner hero title line-height 1.06 to 1.16, scribble from `top -2%, height 120%` to `top -4%, height 108%` (it measured against the glyphs of "now", "your kind" and "right fit"); Home hero title line-height 1.1 to 1.16.
- **Repeated live and planned sections** (For students, For counselors): the `LiveBoard` section was removed on both; the tile labels stay. The two planned items that only the board carried (student accounts, a deadline planner) are one sentence in the "Help that fits you" tile; counselors' section lede now says nothing for counselors is live yet. Each page is one band shorter (about 650 px at 1440).
- **Home wall**: the third row (three glyph-only tiles; the white one showed only an icon and the ink one sat half behind the notification card) is gone. There are only six guides and all six are already on the wall, so there was no real content to give the tile. The wall is 3 by 2, lifted in the ring, and the notification card hangs over the ring's lower edge without touching a card.

### Variants tried (and why)

- **How it works steps.** Tabs (kept): a Students | Counselors switch over two grouped lists, live steps in a solid white card and planned steps in a dashed panel, so status is stated once per group and the page stays short. Sticky step index (rejected, `shots/round2/variants/hiw-b-sticky-index-1440.png`): four large cards with both sides' text, status repeated four times, left column mostly empty below the index, page about twice as tall; its one advantage (both sides visible at once) is what the no-JS and reduced-motion view gives anyway.
- **How it works hero art.** The four steps as a rising staircase in the ring, the two live ones solid and the two planned ones dashed (kept). The overlap diagram was not used in the hero because the instruction wants it drawn on scroll and three ovals had already competed in round 1.
- **The fit diagram.** Two thin circles and a soft overlap beside the steps, sticky on wide screens; the overlap outline is the one drawn stroke. Variant: a solid overlap outline (dropped: planned things are dashed everywhere else on the site).
- **About hero art.** The logo on its white oval plate in the ring (kept; no claims). A path of live and planned cards was dropped because it would have repeated "Where we are now".
- **About principles.** 7 and 5 columns (first try) left a tall empty tile; sized by content (5, 7, 7, 5) the pairs match in height.

### Decisions made without a check-in

- How it works has no bottom dock: a page of a hero, one band and the ask has nothing to jump between.
- The "Planned" and "Live today" per-step labels for How it works follow the instruction (Explore and Join live, Meet and Work together planned) and apply to both sides. For counselors, "Explore" ("Tell us about your practice and the students you work with best") has no dedicated form field yet, only the waitlist's role choice; the page does not say more than the old copy did.
- About has no team block and no placeholder box. The motto "Desire to Excel" was not used (not in the list of decisions). "Our principles" style headings ("What we hold ourselves to.", "Where we are now.") are labels, not sourced claims.
- `LiveBoard` stays in the template but no page uses it now.

### Not verified

- Real-device phone feel; Firefox and WebKit (`animation-timeline: view()` and `@property` for the drawn outline fall back to the finished stroke; `:has()` and `scrollbar-gutter` as in round 1); a manual screen-reader pass of the tabs (VoiceOver, NVDA); the later-visit LCP on a throttled run (Lighthouse starts a fresh session).


## 10. Round 3 of the polish loop: copy and SEO on the audience pages, and Join, 2026-10-11

Part B applied Beacon's claims and SEO review to For students, For counselors and How it works (About: JSON-LD, plain-language sign-up wording). Part A moved Join onto the inner-page template. Raw Lighthouse JSON, sweep output and scripts: `qa/round3-2026-10-11/` (`raw/`, `scripts/`, `*-final.txt`, `contrast-join-states.txt`); screenshots in `shots/round3/` (Join variants in `shots/round3/variants/`). Same method as section 1 (production build on `astro preview` port 4390, Lighthouse CLI 13.5.0, one run per page and mode).

### Numbers

| | Home | Join | For students | For counselors | How it works |
|---|---|---|---|---|---|
| Lighthouse mobile performance / accessibility | 99 / 100 | 98 / 100 | 98 / 100 | 98 / 100 | 98 / 100 |
| Lighthouse desktop performance / accessibility | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| LCP mobile (simulated) / desktop | 2.1 s / 0.4 s | 2.3 s / 0.5 s | 2.3 s / 0.5 s | 2.3 s / 0.4 s | 2.3 s / 0.5 s |
| CLS (mobile / desktop) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0.001 / 0 |
| JavaScript, first page of a session (gz) | 38.8 kB | 39.7 kB (38.8 chunks + 0.9 inline form script) | 39.9 kB | 39.9 kB | 39.9 kB |
| JavaScript, later visit (gz) | 3.0 kB | 3.9 kB | 35.5 kB | 35.5 kB | 35.5 kB |
| Page weight | 184 kB | 187 kB | 187 kB | 186 kB | 186 kB |
| Lowest text contrast (rendered pixels, 320 to 1920) | 5.25:1 | 5.51:1 | 5.51:1 | 5.51:1 | 5.51:1 |

Home did not regress (baseline mobile 99, desktop 100, LCP 2.1 s, CLS 0). Best practices 100 everywhere; SEO 69 everywhere because the demo build is `noindex` on purpose. About was not re-run in Lighthouse (only copy and JSON-LD changed): contrast, overflow, keyboard and console were re-run on it.

### Checks run

| Check | Result |
|---|---|
| Overflow at 320, 390, 768, 1024, 1440, 1920 | none, six pages |
| Console and network, fresh session at 1440 and 390 | clean, six pages (and through the whole Join flow: error, success, start over) |
| Reduced motion | 0 running animations, 0 hidden text elements, no curtain; Join success shows at once |
| JavaScript off | h1 and all copy present on all six pages; Join validates natively, then GET to `/join/?role=...#sent` shows "Thanks. This is a demo, so nothing was sent." (no name, email or message in the URL) |
| Contrast, rendered pixels | 0 failures on six pages at six widths; Join also in three states (student chosen, counselor chosen with errors showing, success) at 1440, 390, 320: lowest 5.51:1 (white on the blue button), errors 6.5:1 or better |
| Keyboard, 140 Tab presses at 1440 and 390 | every stop visible, uncovered, ringed on all six pages. Radio cards: arrow keys move and check, the ring is drawn on the card (3 px) |
| 44 px targets | all at least 44 px on the four inner pages and Join, apart from the 22 px checkbox whose label is the 44 px target. Home reports its three known items |
| Screen-reader names | every input, select, textarea, button and link has a name; the role group is a `fieldset` with the legend "I am a (required)"; errors are in `aria-live` paragraphs tied by `aria-describedby`. Not heard in a real screen reader |
| JSON-LD | Organization (with `logo`), WebPage and BreadcrumbList on five inner pages parse as JSON; noindex still on |
| Title and description lengths | titles 15 to 58 characters (plus " \| D2Excel"), descriptions 131 to 145 |

### What changed

- **Copy** (For students, For counselors, How it works): every "safer wording" row from Beacon's review, the two H1s and ledes, "Join the counselor waitlist", "Planned means not built yet." under the hero buttons (`note` on `InnerHero`), the one-sentence definition of an independent college counselor once per page, "Common App (the shared college application)" and "UC (University of California)" glossed at first use, "sign-up list" in prose and "waitlist" kept in button labels, a "marketplace" gloss on For counselors, links to the SAT or ACT and majors guides and to `/guides/choose-a-counselor/`, "Browse all 6 college guides" (count from the collection), links between the three pages (cards on How it works, notes in the closing asks).
- **SEO**: `pageLd` in `config.ts`, `InnerLayout` passes WebPage and BreadcrumbList for every inner page, Organization `logo`, unique H2 per page, new titles and descriptions.
- **Join** (`join.astro`, `join.css`, `join.ts`): see DESIGN.md. `InnerLayout` takes `inner={false}` so Join does not load `inner.ts`.
- **How it works tabs**: the panels no longer carry `tabindex=0` now that each holds a link (WAI-ARIA: only when the panel has no focusable content). It also stopped a taller-than-the-screen panel from being a focus stop at 390.

### Variants tried (and why)

- **Join layout.** Dark glow stage with a paper form card (kept: same family as the other inner pages, the card is the single focal point, the checklist reads as the "what happens next" Linear shows) against the whole page on paper (rejected: calm, but the card loses its edge and the page is a different mood from the pages it links to). Screenshots: `shots/round3/variants/join-a-dark-1440.png`, `join-b-paper-1440.png`.
- **Conditional fields.** CSS `:has()` (kept: works with scripts off, no JavaScript) against a script toggle.
- **No-script submit.** POST returned 404 on the static preview, so the fallback is a GET to `#sent`, and the personal fields carry no `name` so the URL holds nothing personal.

### Decisions made without a check-in

- **Join step still marked "Live today" on How it works.** The sign-up form is a demo and stores nothing, so "the sign-up list is open" is generous. Left as it was (round 2 instruction); needs a call.
- **Title tags**: How it works became "How D2Excel works for students and counselors" (Beacon gave titles only for the two audience pages); Join "Join the D2Excel sign-up list".
- **"Free to read today"** is used for the guides only; no bare "free".
- **Join H1** is new ("Say hello, and we will keep you posted."): "waitlist" is kept to button labels.
- **Inline text links** in sentences (the SAT or ACT and majors links, the notes in the closing asks) are shorter than 44 px. They are exempt as in-sentence links, as on Home. A padding trick to enlarge them made neighbouring links overlap in the keyboard check, so it was reverted.

### Not verified

- A real screen reader (VoiceOver, NVDA) on the form and its live regions; Firefox and WebKit (`:has()` for the role cards and conditional fields, container queries, `:user-invalid`); real-device phone feel; the later-visit LCP on a throttled run; the guides' own claims (the "each guide names its sources and when it was last checked" line on For students still needs the owner's confirmation before launch, since all six guides are draft or under review).


## 11. Round 4 (Home): logo reveal on every arrival, the logo's red, the big ring, the card orbit, supporting scroll motion, 2026-10-11

Home only. Shared files touched: `tokens.css` (red ramp, additive), `intro.css` and `SystemLayout.astro` (the reveal), `DESIGN.md`. Raw Lighthouse JSON, check output and scripts: `qa/round4-home-2026-10-11/` (`raw/`, `scripts/`, `*-final.txt`); screenshots in `shots/round4-home/` (orbit frames at 0, 25, 50, 75, 100 percent for 1440, 1024, 768 and 390, ring at four widths, reveal sheets, reduced-motion full pages, variants in `variants/`, regression pairs in `after/`). Production build on `astro preview` port 4390, Lighthouse CLI as in section 1. A first attempt at this brief left a half-finished spike in the files; this round started from them.

### Numbers

| | Before (section 9, 10) | After |
|---|---|---|
| Lighthouse mobile performance / accessibility / best practices | 99 / 100 / 100 | 99 / 100 / 100 (3 runs) |
| Lighthouse desktop performance | 100 | 100 (3 runs) |
| LCP mobile (simulated) / desktop | 2.1 s / 0.4 s | 2.1 s / 0.4 s |
| CLS, TBT | 0, 0 | 0, 0 (mobile and desktop); reveal run in a fresh context: CLS 0 |
| JavaScript, first visit (gz) | 38.8 kB | 38.8 kB (no script added) |
| JavaScript, arriving from another page of the site (gz) | 3.0 kB | 3.0 kB |
| Page weight | 184 kB | 187 kB (CSS and markup) |
| Lowest text contrast on Home, rendered pixels, 320 to 1920 | 5.25:1 | 5.25:1 ("From: D2Excel" on the blue card), 0 failures at six widths |
| Headline over the big ring (white and accent word) | n/a | 8.2:1 at worst (the word "next." at 1024), 10 to 13:1 elsewhere |
| Scrolling the orbit, 90 frames at 1440 and 390 | n/a | 8.3 ms median, 0 layouts, 0.9 ms style per frame, 1.2 ms script in total |

SEO stays 69 because the demo build is `noindex` on purpose.

### Checks run

| Check | Result |
|---|---|
| Reveal gate (fresh context) | plays on a direct load, a reload, a typed URL in the same tab, a new tab, a visit from another site; skipped for Home from Guides or For students by the logo link, the logo link on Home itself, and any link from another page; other pages keep once per session; reduced motion and JavaScript off: no curtain |
| Reveal in a fresh context at 1440 and 390 | settles at 2.16 s; last curtain frame vs the header logo: 0.0 to 0.2 px; CLS 0; after it: h1 not covered, every `.arrive` at opacity 1, no curtain, no `intro` class |
| Skip | key, click and tap all remove the curtain in about 0.3 s and stay on the page (at 1440 a tap used to land on the card under the curtain: the curtain was `inert`, so it was not hit-tested; fixed by dropping `inert`) |
| Failsafe | script blocked: the class is dropped at 3 s; curtain forced back on: hidden at 6 s |
| Orbit: all six cards, 1440, 1024, 768, 390 | every card moves at every width; opacity 1 to 0 over the range; all six `visibility: hidden` at the end (not clickable, not focusable); title or last-verified line covered by another card: 0 at rest and in motion at all four widths and 320 |
| Orbit: copy covered by a card | 0 at all widths at every step |
| Orbit: poke past the ring box | 0 px at 1024, 768, 390; 7 px at 1440 and 12 px at 320 in mid-turn (cards at half opacity); never past the viewport edge, the nav, the dock or the headline |
| Overflow at 320, 390, 768, 1024, 1440, 1920 | none, six pages (a 4% side offset of the story cards made 1024 scroll sideways by 14 px; fixed with `overflow-x: clip` on that section) |
| Console and network, fresh session at 1440 and 390 | clean, six pages |
| Reduced motion | 0 running animations, 0 hidden text, no curtain; six cards at rest, ring drawn, seam line drawn |
| JavaScript off | h1 and 5,451 characters of main text, no curtain, no overflow |
| Keyboard, 140 Tab presses at 1440 and 390 | Home 138 and 132 stops, all visible, uncovered, ringed; the other five pages unchanged |
| 44 px targets | Home reports its three known items (two stretched tile links and one in-sentence link), unchanged |
| Regression pairs against `shots/round4-home/before` (1440, full page) | Guides identical; For students 0 pixels differ by more than 8 levels; Join 37 of 2 million pixels (a caret or antialiasing); contrast on the other pages with the decorative scribble excluded as before: 5.51:1 minimum, 0 failures |
| Impeccable detector | files: 0 anti-patterns, 15 advisory notes (literal sizes and colours, mostly older); rendered page: the known advisories (italic serif accent, mono kickers, glow on the ring and the notification, nested cards in the story panels), none new |
| web-design-guidelines | applied by hand: reduced motion honoured for every new motion, no `transition: all`, only transform, opacity, `clip-path` and discrete `visibility` animated, decorative SVG `aria-hidden`, focus unchanged, hover states for the chips; Title Case not applied (sentence case throughout) |

### What changed

- **Logo reveal** (`SystemLayout.astro`, `intro.css`): Home passes `intro="arrival"`; the gate is the referrer and the navigation type (see DESIGN.md). Craft: a blue arc and a red arc leave the top of a larger ring and draw round it in opposite directions, the logo's own ring draws and the D2E wipes in, the arcs meet at the bottom and flare, the 2 pulses red (one pulse instead of two), then the Flip. The curtain is no longer `inert`.
- **Red** (`tokens.css`, `home.css`): the ramp (50 to 950) and four theme roles were in `tokens.css` from the first attempt; the sample is `#e41026` at its most common, token `#e01020` as the blue is rounded. Used for the ring's arc and ember, where the big ring starts, the dot before "Now" (a white pill in the notification card), the dock's active dot, the underline on a hovered question chip, the "Planned" dots, the seam line and the closing ask (red glow, Blush accent word, red dashed items). Blue stays every button and link.
- **Big ring** (`index.astro`, `home.css`): one hand-drawn ellipse behind the eyebrow, headline and lede, 150% by 160% of that block, tilted -11 degrees, 1.8px with a soft glow, red where it starts and blue where it meets the ring art, drawn once. The earlier draw animation was dead for a while in this round (`--k` was no longer set, so the shorthand was invalid); found by reading `getAnimations()` and fixed.
- **Orbit** (`home.css`): the six cards make a quarter turn round the ring (Gurashish's changes: one spin, then a half, then a quarter; 10% farther from the centre), fade as they go and are gone at the end of the range; phones show all six in two columns by three rows in a tall ring. The first version of the six slot rules used `:nth-child`, which the decorative `<i>` at the start of the wall plane shifted by one: the third column never got an angle, so two of six cards (the SAT or ACT guide and the counselor guide) never moved, and on phones the hide rule in `hero.css` removed the middle column instead.
- **Supporting motion**: story cards dealt in along a shallow arc, the three doors on an arc that settles flat, the red-to-blue seam line drawn by scroll. All CSS.
- **Minifier finding**: the build folds `animation` and `animation-timeline` into one shorthand that Chromium 145 drops, so the orbit, the story stack's ease-back (and `.fit` on How it works, and `.wall-col`) did nothing in the production build while working in dev. Home's are now longhands (`animation-name`, `-timeline`, ...); the other two are listed in the report.

### Variants tried (and why)

- **Ring behind the headline** (`variants/oval-abc-single-two-broken-1440.png`): one ellipse (kept), two overlapping tilted ellipses like the logo (the red one cut through the lede and the buttons, busier), one with a gap (read as a swoosh, not a ring). A first version around the accent word only was too small; one sized only a bit larger struck through the lede. The geometry was searched: 60,000 random ellipses scored by how much of their path crosses text boxes.
- **Orbit** (`variants/orbit-A-...`, `orbit-B-...`): a continuous orbit with the cards evenly spaced (kept) against cards sliding along the ring one after another (cards clumped and overlapped). Radius and shrink were tuned by the covered-text measurement, not by eye.
- **Supporting motion**: chosen the story deal, the doors and the seam line. Rejected: the notification card and the question chips fanning along an arc (they sit on the first screen under the signature, text-dense, and would compete or cover); the ring rotating with the cards counter-rotating (already is the orbit: the ring's gradient and ember turn with it).

### Decisions made without a check-in

- The orbit's range is 45% of a screen of scroll, with the art sticky on screens at least 70rem by 48rem so the whole turn is seen; the copy column has 38svh of room below it for that.
- The quarter turn ends with the ring empty (the six guides are listed in full in the next section). The notification card stays.
- Other pages keep the once-per-session reveal; only Home plays on every arrival. Pages not on `SystemLayout` (Privacy, Terms, 404) keep their older reveal.
- `GuideWall.astro` is unchanged; its decorative `<i>` is worked around with `:nth-of-type`.

### Not verified

- Firefox and WebKit (scroll timelines, registered properties and CSS trig fall back to the static wall; seam line to the finished line); real-device phone feel and frame rate; a screen reader on the Home (the six wall cards leave the accessibility tree once scrolled away; the same guides are listed below); the throttled LCP of a reload (Lighthouse always starts a fresh session, and the reveal plays in every run).
- The dev server on 4321 (restarted by Biscuit after it stopped) loads the page with no console errors or failed requests, and the reveal runs there. Before the restart it answered 504 "Outdated Optimize Dep" for `gsap/Flip`; I did not clear Vite's cache.

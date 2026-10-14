# Home page v2: plan (nothing built yet)

Written 2026-10-10 from Gurashish's feedback, Beacon's strategy input, Scout's research, and a review of seven inspiration sites (revised the same day). Plan only.

## 1. What changes

| Today | Change |
|---|---|
| "Pause motion" button | Remove from the home page (accessibility pattern in section 7). |
| Hero background: abstract orbiting dots | Replace with a tilted 3D wall of real guide cards inside a glowing oval ring (section 3). |
| Story section: orbit graphic on the right, filling bar | Replace with a sticky stack of step cards, one revealed per scroll beat, no bar or counter (section 5). |
| Few library elements | Use real library elements (section 4). |
| Plain sans headline | Editorial headline: bold sans mixed with a serif-italic accent word and a hand-drawn oval (section 3). |

## 2. Inspiration review: what we borrow and what we avoid

I opened all seven in a real browser. Most hide their libraries inside bundled code, so library names below are confirmed only where stated.

| Site | What I saw | Borrow for D2Excel | Avoid |
|---|---|---|---|
| **madebykota.com** (built in Framer) | Hero is a wall of site tiles in tilted 3D perspective with parallax, over a huge headline with a small inline image pill. Glassy pill nav. Big statement paragraph, huge numerals, "Scroll for more" side label, a local-time stamp, a percent preloader. | The tilted perspective wall, as a wall of our real guide cards. The inline pill inside the headline, using a guide thumbnail. Glassy pill nav. A "Bay Area, [local time] PT" stamp, which is true and reinforces the launch focus. | Its nav buttons overlap body text when scrolling. |
| **blink.capital** | A huge glowing iridescent ring on near-black, with a wide-spaced mono wordmark. A purple "notification" card ("FROM: team, NOW"). Horizontal chapters of colored cards. Bottom pill nav with active section. "SKIP" control. | The glowing ring, as a luminous oval that echoes the D2E logo's oval. A "FROM: D2Excel, NOW" notification card carrying a real dated item (for example the UC deadline). Colored step cards. Bottom pill nav. | Video-heavy build. The final section pattern of horizontal scroll can feel like an ending. |
| **fps.hu** | Editorial type: bold sans with serif-italic accent words, and a hand-drawn teal oval drawn around "Empathic". Flat illustrated colored tiles (magnifier, bulb, pencil). Playful sticker details. | Serif-italic accent word in the headline with a hand-drawn oval drawn by DrawSVG (ties to the logo oval). Flat illustrated icon tiles for guide categories. | Sticky nav collides with text; cookie banner covering content. |
| **nahiyan.codes** | Built with Astro (same stack as ours). Dithered or halftone canvas texture, monospace micro-labels, a floating bottom pill nav with an active highlight, a small background audio player. | A subtle dither or halftone texture on dark sections (light canvas). Monospace micro-labels for "Last verified" dates and source tags. Floating bottom pill nav. | Autoplay-style audio. |
| **chladni-plate-experiment.vercel.app** | Next.js, Lenis, one canvas, Web Audio. A seven-chapter story around a real physics experiment, with big numerals, serif display type, a "begin with sound or muted" gate, and its own pause control. | The idea of an interactive element that teaches something real, such as an application-season timeline built from real dates. Chapter-like pacing with big numerals. | A gate screen before content, and sound. Our logo reveal is the only intro. |
| **wassimnasr.com** | Hero is a full-bleed illustrated 3D-style character room (one canvas, one video) with an "ask me anything" chat box and suggestion chips. | An illustrated campus-like scene feel, and suggestion chips. | An AI chat box. We don't claim AI features, and it would make a promise we can't keep. Use plain chips that link to guides instead ("When is the UC deadline?"). |
| **karma-tracks.com** | Twice the browser timed out capturing it, which suggests a very heavy page. I couldn't evaluate its visuals. | Nothing; it's a warning. | Weight that makes the page hard to render. Our speed budget stays. |

Two overlap problems showed up on other sites (nav sitting on top of text), so our "all text visible" rule stays a hard test on the sticky and bottom navs.

## 3. The hero (revised)

**Concept:** a tilted 3D wall of real guide cards (real titles with a monospace "Last verified" label), set inside a glowing oval ring that echoes the logo. A campus or path scene is a second, optional layer behind it. On top: an editorial headline, bold sans with one serif-italic accent word (for example "the right counselor") circled by a hand-drawn oval that draws itself, plus a floating "FROM: D2Excel, NOW" card with a real dated item, and quick-start chips that link to the guides.

**Build route:**
- The tilted wall and ring are CSS 3D and gradients: zero library weight, accessible, and cheap.
- The campus layer is optional. If wanted, a small lazy-loaded Three.js scene (about 120 kB gzipped) or OGL (about 29 kB), loaded after the headline paints, pixel ratio capped at 1.5, skipped on weak phones and for reduced motion (static art instead). Round 0 measures and decides whether it earns its weight.
- `img2threejs` only for simple props if needed (unvetted scripts, token-heavy).
- Rejected: a globe (implies national reach), real landmarks or school logos (imply partnerships), an AI chat box.

## 4. Library elements to use

| Section | Element | Source |
|---|---|---|
| Hero headline | Split-text and blur-in effect, plus the hand-drawn oval | GSAP SplitText and DrawSVG (already in the stack), or React Bits |
| Role tiles | Spotlight and tilted cards | React Bits, Magic UI |
| Guides and "how we check facts" | Bento grid | Magic UI |
| Nav | Floating pill nav with hover or dock feel | Magic UI idea, built in vanilla |
| Step cards | Sticky stack idea | Aceternity (license unclear: borrow the idea only) |

These are React components and the site is Astro, so they'd run as React islands (`client:visible`). Round 0 spike: one island, measured. Islands only for what justifies the weight; otherwise port the effect to vanilla and GSAP. Read each element's source before adopting it. The optional shadcn MCP is Gurashish's call; the CLI inside the project folder is enough. React Bits is MIT plus Commons Clause (fine for a website). None of these libraries documents reduced-motion support, so we test each.

## 5. The story section (revised)

- A sticky stack of four colored step cards (Explore, Apply, Decide, Get help). Each scroll beat slides the next card up over the previous one, so you only ever see the step you've reached, with no bar, counter, or "1 of 4".
- Each card carries one real, date-stamped panel: Explore shows the real guide cards. Apply shows the UC window and FAFSA dates with a verified date. Decide shows a comparison-table fragment from a real guide. Get help is a dashed "In development" card, clearly labeled coming soon.
- A short fifth beat ("Where it goes from here is up to you") whose card scales and fades into the next section's heading, so it never reads as an ending.
- Built with one GSAP ScrollTrigger timeline (pin, scrub, snap per card). Phones: no pin, cards stack in normal flow. Keyboard and screen-reader users get the same content in normal order. The pin must never trap scrolling.
- Optional: an interactive application-season timeline from real dates (Chladni-style "teach something real" idea), only if the dates are verified and re-checked each cycle.

## 6. Other changes
- Role router: three distinct tiles (student, parent, counselor), each its own path.
- Guides lead with the deadline-driven ones (UC and financial aid), shown as flat illustrated tiles with a monospace "Last verified" label.
- "How we check facts": show a guide's anatomy (quick answer, sources, last verified).
- Floating bottom pill nav with active section, plus the glassy top pill nav, both with a solid-enough backing so they never hide text.
- A dither or halftone texture and monospace micro-labels on dark sections, if the weight stays small.
- Merge "coming soon" and the final CTA so the page ends on one ask.
- No audio, no gate screen, no autoplay video.

## 7. Removing "Pause motion" safely
WCAG 2.2.2 requires a pause control for content that starts automatically, lasts over 5 seconds, and runs next to other content. Without the button: (a) the hero ring, wall parallax, and scene respond to scroll and cursor only, or settle within about 5 seconds; (b) the marquee moves only while scrolling; (c) any shader or 3D scene freezes after its intro; (d) reduced motion gets everything static. First step: update the "Pause motion button works" hard rule in `site/CLAUDE.md`.

## 8. Claim guardrails
No globe, landmarks, or school logos. No "Accepted" ending. No AI chat or "AI-powered" wording. Countdowns and dates re-verified each cycle. "Coming soon" stays on Get help. No cursor tracking or analytics of minors without consent. No pricing. No invented stats (a count like "6 guides" is fine; caseload numbers are not). Bay Area first, then California.

## 9. The loop

**Round 0, setup (once).** Update the hard rule in `site/CLAUDE.md`. Spike one React island and the optional campus layer, measure each against the budget, and record the decisions (island or vanilla, with or without the 3D campus layer).

**Each round (R1 to R4 at most):**
1. **Direction** (Forge, with Beacon): load `frontend-toolbox`, `impeccable`, `design-taste-frontend`, `frontend-design`, and `DESIGN.reference.md`, and keep the inspiration table in section 2 open. Write the round's goal in one sentence.
2. **Build** (Forge): GSAP skills for the sticky stack, `modern-web-guidance` for CSS 3D and scroll-driven effects, library elements per section 4.
3. **Audit** (Forge): `web-design-guidelines`, the impeccable detector, `simplify`, and a code review of the diff.
4. **Verify** (Forge, then Biscuit independently): chrome-devtools screenshots at 1440, 1024, 768, 390; Lighthouse; performance trace; console; `playwright-cli` for reduced motion, no JavaScript, and Firefox and WebKit; measured text visibility and contrast, with a specific check that sticky and bottom navs never cover text.
5. **Critique panel:** Beacon checks claims and message, Pioneer checks facts against the Drive, Scout vets any new library or tool.
6. **Gate:** pass the exit checklist and stop, or the critique's top three fixes become the next round's goal.

**Exit checklist:**
- The hero reads as education within 3 seconds and has no unsupported claims.
- The story reveals one step at a time, with no bar or counter, and never feels finished early.
- Mobile Lighthouse performance 95 or higher, CLS 0, LCP at or below 2.5s on the throttled run.
- Contrast at least WCAG AA everywhere, with no clipped, hidden, or covered text.
- Reduced motion and no-JavaScript render a complete, readable page.
- No auto-running motion lasting over 5 seconds.
- Clean build, no dead code.

**Accountability:** every round's report lists the tools and skills actually used, with evidence (screenshot, number, or finding). A tool named here but unused must be explained.

**Cost control:** check in with Gurashish after Round 1 with screenshots before spending more. Maximum 4 rounds. Cheaper models for Beacon, Scout, and Pioneer's critique where possible.

## 10. Decisions needed from Gurashish
1. Hero: the tilted guide-card wall inside a glowing oval ring (recommended, light and truthful), with or without the optional 3D campus layer?
2. Story: sticky stack of colored step cards (recommended), or the single swapping panel from the first draft?
3. React islands for a few elements only if the speed test justifies it (recommended), or vanilla only?
4. Install the optional shadcn MCP, or use the CLI inside the project?
5. Check-in rhythm: after Round 1 (recommended), or let it run?

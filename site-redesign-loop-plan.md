# Full site redesign: loop plan (nothing built yet)

Written 2026-10-10. Goal: completely change how the D2Excel website looks and feels, across every page, to the level of a modern, high-end tech site with standout transitions and animation, while staying fast, readable, accessible, and truthful. This plan contains the home page plan (`home-v2-plan.md`) as one step, and that file stays the detailed spec for the home page.

## 1. Scope
Pages (16 built today): Home; For students; For counselors; How it works; Guides hub plus the article template (six guides); About; Join the waitlist; Privacy; Terms; 404. Shared parts: header and nav, footer, page transitions, logo reveal, buttons, cards, forms.

**Out of scope:** pricing and fees, deployment, domain or hosting changes, the real back-end (sign-in, matching), invented statistics or claims. Nothing is deployed or pushed.

## 2. Constraints carried forward (hard rules)
- All text readable at all times: contrast at WCAG AA or better, nothing clipped, hidden, or covered, including by sticky and floating navs.
- A real reduced-motion fallback and a no-JavaScript fallback on every page. No auto-running motion over 5 seconds, no Pause button needed because motion is scroll- or cursor-driven or settles.
- Speed budget: mobile Lighthouse performance 95 or higher, CLS 0, LCP 2.5s or better on the throttled run. JS budget: home at most about 80 kB gzipped, inner pages at most about 40 kB.
- Truthful content only, from the briefs and Drive. Bay Area first, then California. No "AI-powered", "vetted", counselor-review, or caseload claims, no guaranteed outcomes, no school logos or landmarks implying partnerships, no AI chat box, no audio, no gate screens.
- Guides are the product today, so the reading experience (long articles) must stay calm, legible, and fast.

## 3. Inputs and tools (use them, and prove it)
- **Design knowledge:** `frontend-toolbox` skill and its `references/technique-catalog.md`; `impeccable`, `design-taste-frontend`, `frontend-design`, `web-design-guidelines`; `D2EXCEL/DESIGN.reference.md` (Linear reference, craft and rhythm only).
- **Motion and CSS:** `gsap-skills` (core, timeline, scrolltrigger, performance, utils), `modern-web-guidance`, the Vercel view-transition principles.
- **Verification:** chrome-devtools tools (screenshots, Lighthouse, trace, console, network), `playwright-cli` (reduced motion, no-JS, Firefox and WebKit).
- **Library elements:** React Bits, Magic UI (as islands only where the spike justifies it), GSAP SplitText, DrawSVG, Flip; the shadcn CLI optional.
- **Content and facts:** `website-brief.md`, `pioneer-home-suggestions.md`, the six guides, Beacon's notes, the Drive via Pioneer.
- **Research and inspiration:** the seven-site review in `home-v2-plan.md` section 2, Scout's `web-build-tools-research.md` and `home-motion-research.md`.
- **Accountability:** every round's report lists the tools and skills actually used with evidence (screenshot, number, or finding). A tool named here but unused must be explained.

## 4. Who does what
| Role | Job |
|---|---|
| **Biscuit** (orchestrator) | Runs the loop, assigns work, never writes code. Independently re-verifies each round in the browser. Writes the checkpoint summaries. |
| **Forge** | All design and implementation, using its creative range and the technique catalog. Prototypes variants. Reports measured numbers. |
| **Beacon** | Message, information architecture, claims review, SEO and schema (searchfit-seo skills), copy sharpening. |
| **Pioneer** | Fact-checks every statement and date against the Drive; keeps the brief current. |
| **Scout** | Vets any new library or plugin before adoption; finds references or assets (and their licenses) when asked. |
| **Gurashish** | Picks the direction, approves checkpoints, supplies decisions and assets. |

Run at most two agents at once to protect the usage limit.

## 5. The loop

### Phase A, Round 0: foundations (once)
1. **Baseline snapshot:** Lighthouse mobile and desktop plus screenshots (1440, 1024, 768, 390) for every page, saved in `site/QA-LOG.md`. This is the regression guard.
2. **Rules:** update `site/CLAUDE.md` (remove the Pause button rule, add the budgets above).
3. **Tech spikes:** one React island; the optional 3D campus layer; the CSS 3D tilted wall. Measure each against the budget and record the decisions.
4. **Direction exploration (the big creative step):** Forge builds three distinct, clickable directions on a private `/lab` route, each with the hero and one inner-page section, so Gurashish compares real pages instead of descriptions:
   - **A: Luminous Oval.** Dark navy, glowing oval ring, glassy pills, monospace labels, tilted guide-card wall, high-tech feel (Blink and Kota inspired).
   - **B: Editorial Campus.** Warm light paper tone, serif-italic accents, hand-drawn strokes, flat illustrated tiles, playful and human (fps.hu inspired).
   - **C: Hybrid (recommended).** A dark glowing hero and story moments for wow, with light editorial reading sections for guides and forms, so articles stay comfortable to read.
5. **Checkpoint 1: Gurashish picks a direction** (or mixes). Nothing else proceeds until then.

### Phase B: design system
Forge turns the chosen direction into tokens and components, and records them in `site/DESIGN.md` (using the impeccable documenter):
- **Tokens:** color (keep the logo's blue and red; navy and neutral ramps), type scale and fonts (licensed or open), spacing, radii, shadows, and **motion tokens** (shared easings and durations, one motion language).
- **Components:** top pill nav, floating bottom pill nav with active section, buttons (primary, glassy, text), cards (spotlight, tilt, flat illustrated tile), chips, notification card, monospace label, section seams, footer, form fields, and the article reading layout.
- **Gate:** a component page (`/lab/system`) that passes contrast, focus-state, touch-target, and reduced-motion checks. Beacon reviews tone, Scout vets any new library.

### Phase C: page rounds (the loop proper)
Order, each page its own loop, at most two rounds per page:
1. **Home** (full spec in `home-v2-plan.md`: tilted guide wall in a glowing ring, editorial headline with hand-drawn oval, notification card, sticky step-card story, role tiles, how-we-check-facts, one final ask). **Checkpoint 2 with screenshots.**
2. **Guides hub and article template** (the reading experience, fact labels, last-verified dates, table of contents, a calm layout). **Checkpoint 3.**
3. For students, 4. For counselors, 5. How it works, 6. About, 7. Join (form states, success and error, accessible), 8. Footer, Privacy, Terms, 404.

**Each round:**
1. **Direction:** Forge loads `frontend-toolbox`, the catalog, and the design system, and states the round's goal in one sentence.
2. **Build:** Forge builds, prototyping variants for any big visual moment and picking by screenshot.
3. **Audit:** `web-design-guidelines`, the impeccable detector, `simplify`, a code review of the diff.
4. **Verify:** Forge measures; then Biscuit independently checks in the browser: screenshots at four widths, Lighthouse, trace, console, reduced motion, no-JS, and that sticky or bottom navs never cover text. Compare against the baseline in `QA-LOG.md`.
5. **Critique:** Beacon (claims and message), Pioneer (facts), Scout (new tools).
6. **Gate:** pass the page checklist and stop, or the top three fixes become the next round's goal. Update `QA-LOG.md`.

**Page checklist:** looks like the chosen direction; one clear focal point per screen; all text readable (AA); mobile Lighthouse performance at least 95, CLS 0, LCP within budget; JS within budget; reduced motion and no-JS complete; no unsupported claims; Pioneer confirms the facts.

### Phase D: site-wide polish
- **Transitions:** cross-page View Transitions and consistent motion; check the mid-frame of each transition (not yet verified so far).
- **Consistency pass** across all pages against `DESIGN.md`.
- **Performance, accessibility, and SEO passes** (Beacon with `searchfit-seo` skills for meta, schema, headings, internal links; noindex stays on until launch).
- **Cross-browser:** Firefox and WebKit via `playwright-cli`; fix what breaks.
- **Cleanup:** `simplify` across the codebase, dead code and unused dependencies removed, README and `site/CLAUDE.md` current.
- **Checkpoint 4:** full walkthrough with Gurashish.

### Phase E: handoff readiness (no deployment)
Final QA table in `QA-LOG.md`, a plain-language maintenance guide, a list of open items (real fees, legal text, content exports, hosting decision), and a launch checklist. Deployment is Gurashish's call and needs his explicit yes.

## 6. Loop controls
- **Round cap:** two rounds per page, four in Phase B and Phase D combined, and a hard stop at 12 Forge runs in total without a new go-ahead from Gurashish.
- **Regression guard:** no round may lower a page's Lighthouse, contrast, or a11y results versus `QA-LOG.md` without a written reason.
- **Stop early** when a checklist is met; don't polish for its own sake.
- **Cost control:** the plan is large. Priority tiers if the limit bites: Tier 1 is the direction exploration, design system, Home, and Guides; Tier 2 is the remaining pages; Tier 3 is Phase D extras. Cheaper models for critique roles; check in at every checkpoint before spending more; pause cleanly if the usage limit nears and record where to resume in `QA-LOG.md`.

## 7. Risks
- Heavy effects hurting speed: the budgets, spikes, and lazy-loading rules above.
- Looking impressive but unreadable: contrast and text-visibility tests every round, with the light reading sections in the hybrid direction.
- Copying references too closely: Forge replicates mechanisms, never code, assets, text, or brand marks.
- Claims creep (3D, globe, school imagery): Beacon and Pioneer critique every round.
- Usage limit: tiers, caps, and checkpoints.
- Unknown real-device performance: the shader and 3D frame rates are unverified on real hardware; test on a real phone before launch.

## 8. Decisions needed from Gurashish
1. Approve the three exploration directions (A, B, C), or tell me to add or change one.
2. Scope: all pages, or Tier 1 first (direction, design system, Home, Guides) and the rest after you've seen it?
3. Is Pacific-time and Bay Area flavor in the design welcome (for example the local-time stamp)?
4. Are you okay with a private `/lab` route in the local site for comparing directions (local only, nothing public)?
5. Check-ins at each checkpoint (recommended), or let each phase run?

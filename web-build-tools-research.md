# Web build tools for the D2Excel demo site

Researched by Scout on 2026-10-08 for Forge's D2Excel marketing-site build (modern look, smooth high-tech animation, no pricing or payments). **Nothing was installed or run.** Gurashish installs everything himself. Stars, licenses and last-push dates come from the GitHub API fetched on 2026-10-08/09 unless noted. Many page details came through WebFetch, which returns model-written summaries, not raw bytes; where a finding rests on that, the "what I read" line says so.

Already installed, so not recommended again: frontend-design (Anthropic), web-artifacts-builder, theme-factory, brightdata design-mirror, skins, savvy-progress, terminal-browser, claude-reflect. Context7 appears installed but is not authenticated.

Context used: Forge's plan (`website-plan.md`) recommends Astro on Netlify, fully static, with targets of LCP 2.5 s or better, Lighthouse mobile 95+, WCAG 2.1 AA, and "no JavaScript required to read any page". That shapes every pick below.

## Answer

Install five things, in this order: the **official GSAP skills**, **Chrome DevTools MCP**, **Modern Web Guidance** (Google Chrome), **Impeccable**, and **Playwright** (CLI form). Three are clean installs from large organizations; two need caution (DevTools MCP for telemetry and browser reach, Impeccable because its hooks download and run a prebuilt binary). For the animation stack, recommend **CSS-first (scroll-driven reveals, native view transitions) plus GSAP with ScrollTrigger for two or three set-piece sections, Lenis optional, and no Three.js**. Confidence: medium-high on the tool picks (primary-source checks on all five), medium on the bundle numbers (measured by third-party bundlers, not by a real build). I could not reach Reddit at all (see Conflicts and gaps), so "popular" here means GitHub activity, organization backing, and developer blogs.

Pick 1 only pays off if Forge actually chooses GSAP. If Forge picks Motion instead (lighter, about 6 kB for reveals), swap pick 1 for Context7 docs lookups once authenticated.

## Top 5 picks (ranked for this job)

### 1. GSAP official skills (greensock/gsap-skills)

- **What it does for this build:** Eight docs-only skills (core, timeline, ScrollTrigger, plugins, utils, React, performance, frameworks) that steer Claude to correct GSAP: transform/opacity only, ScrollTrigger cleanup and refresh, `gsap.matchMedia()` for reduced motion. Prevents the usual AI mistakes (leaked triggers, layout-property animation).
- **Source:** https://github.com/greensock/gsap-skills
- **Maintainer / stars / activity:** GreenSock organization (GSAP is owned by Webflow, per Webflow's announcement). 16,047 stars, 942 forks, created 2026-03-04, last push 2026-07-29 (about 10 weeks ago), 12 open issues, MIT, no releases.
- **Trust verdict: Install.** Docs-only content, no hooks or scripts seen, official publisher.
  - Read: marketplace.json; the gsap-core, gsap-performance, gsap-scrolltrigger, gsap-plugins and gsap-frameworks SKILL.md files (via summaries): no shell commands, no runtime URL fetches, nothing suspicious.
  - Not read: gsap-timeline, gsap-utils, gsap-react, `examples/`.
  - Gaps: only `gsap-core` covers `prefers-reduced-motion`/`matchMedia`; `gsap-performance`, `gsap-scrolltrigger` and `gsap-frameworks` do not, and Astro is not covered at all. Tell Forge to apply the reduced-motion pattern in the animation section itself.
  - Lookalikes: mirrors exist (for example a `gsap-core` copy under nexu-io/open-design, and a gitlink.org.cn mirror). Install only from `greensock/gsap-skills`.
- **Install (run in Claude Code):**
  ```
  /plugin marketplace add greensock/gsap-skills
  /plugin install gsap-skills@gsap-skills
  ```
  First line registers the repo as a marketplace; second installs the one plugin it contains. Alternative from the README: `npx skills add https://github.com/greensock/gsap-skills`.
- **Uninstall:** `/plugin uninstall gsap-skills@gsap-skills`, then `/plugin marketplace remove gsap-skills`. Leaves nothing else behind.

### 2. Chrome DevTools MCP (re-ranked up from the earlier report)

- **What it does for this build:** The performance and QA workhorse. `performance_start_trace` and `performance_analyze_insight` give LCP/INP/CLS breakdowns; `lighthouse_audit` covers accessibility, SEO and best practices (it does **not** score performance; use the trace for that); `take_screenshot` at set viewports; `emulate` for 4x CPU throttling, Slow 4G and dark mode; `list_network_requests` to see how many kB of animation JavaScript actually ship. This makes a separate Lighthouse MCP unnecessary. Gap: `emulate` has no `prefers-reduced-motion` option, which is why pick 5 exists.
- **Source:** https://github.com/ChromeDevTools/chrome-devtools-mcp (tool list: https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md)
- **Maintainer / stars / activity:** ChromeDevTools organization (Google Chrome team). 53,142 stars, 5,844 forks, created 2025-09-11, last push 2026-10-08, Apache-2.0. npm `chrome-devtools-mcp` 1.10.1 carries SLSA provenance. Listed in Anthropic's official marketplace with a pinned commit (1cec9cd...).
- **Trust verdict: Install with caution.** Watch:
  - Usage statistics are on by default (tool success rates, latency, environment info go to Google); opt out with `--no-usage-statistics`.
  - Performance tools may send trace URLs to Google's CrUX API; opt out with `--no-performance-crux`.
  - It exposes browser content to the model and has `evaluate_script`; point it only at localhost and the Netlify preview, with a throwaway Chrome profile, never a signed-in one.
  - Lookalike: the MCP registry also lists `io.github.Async23/chrome-devtools-mcp` (a different repo). Use only the ChromeDevTools one.
  - Read: README and tool reference (via summaries), npm metadata. Not read: server source. I could not read the official plugin's `.mcp.json` (404), so I cannot confirm whether the plugin route sets the opt-out flags.
- **Install (run in the site's project folder; pinned, with both opt-outs):**
  ```
  claude mcp add chrome-devtools --scope project -- npx -y chrome-devtools-mcp@1.10.1 --no-usage-statistics --no-performance-crux
  ```
  Needs Node LTS and Chrome. Writes a `.mcp.json` in the project. Alternative (marketplace-pinned, telemetry flags unconfirmed): `/plugin install chrome-devtools-mcp@claude-plugins-official`.
- **Uninstall:** `claude mcp remove chrome-devtools --scope project`.

### 3. Modern Web Guidance (Google Chrome)

- **What it does for this build:** A skill that makes Claude check a Baseline-aware guide before writing frontend code, so it reaches for native CSS scroll-driven animations, view transitions, `content-visibility`, popover and `<dialog>` instead of a JavaScript library. Its README lists scroll-driven animations, view transitions, parallax, INP, LCP and preloading among 195 features and 170 use cases. Directly serves the "fast for SEO" goal and the plan's "no JS needed to read" rule.
- **Source:** https://developer.chrome.com/docs/modern-web-guidance and https://github.com/GoogleChrome/modern-web-guidance (install repo; contributions go to `modern-web-guidance-src`)
- **Maintainer / stars / activity:** Google Chrome team (GoogleChrome organization). 2,447 stars, 91 forks, created 2026-03-23, last push 2026-10-07, Apache-2.0. Listed in the official marketplace with a pinned commit (22ab18d...). Chrome labels it an early preview.
- **Trust verdict: Install.** Watch two things: it sends anonymous telemetry (install counts, calling agent name, guide IDs, CLI search queries; not raw prompts) unless you set `DISABLE_TELEMETRY=1`; and the skill calls `npx modern-web-guidance@latest ...`, an unpinned npm fetch at runtime (the package is Google-published, Apache-2.0, has provenance, no install scripts and no dependencies).
  - Read: README, official marketplace entry, npm metadata. Not read: the CLI source (including the telemetry code in `modern-web.ts`).
- **Install:**
  ```
  /plugin install modern-web-guidance@claude-plugins-official
  ```
  To opt out of telemetry, add `export DISABLE_TELEMETRY=1` to `~/.zshrc`. Alternative from Chrome's page: `npx modern-web-guidance@latest install`.
- **Uninstall:** `/plugin uninstall modern-web-guidance@claude-plugins-official`.

### 4. Impeccable (pbakaus/impeccable)

- **What it does for this build:** One design skill with 24 commands, including `critique`, `audit`, `polish`, `typeset`, `layout`, `colorize` and `animate`, plus 59 deterministic "AI slop" detector rules that run in code with no model call. Fills the gap between Anthropic's frontend-design (installed, sets direction) and a finished, consistent look. It is the review and polish loop for Forge, not a generator.
- **Source:** https://github.com/pbakaus/impeccable (site: https://impeccable.style)
- **Maintainer / stars / activity:** Paul Bakaus, an individual (a former Google developer advocate and creator of jQuery UI, per reviews; I did not verify this independently). 78,689 stars, 4,676 forks, created 2025-11-16 (under 11 months old), last push 2026-10-09 02:37 UTC, Apache-2.0, 63 open issues. Latest release `engine-v0.1.13`. Not in the official marketplace.
- **Trust verdict: Install with caution.** Popular and active, but it executes code on your machine automatically. Watch:
  - Its plugin `hooks.json` registers three hooks that all run `skills/impeccable/scripts/impeccable hook`: SessionStart (5 s), PostToolUse on `Edit|Write` (5 s), and Stop (30 s, labelled "Design deep pass"). They fire without per-call approval.
  - On first run the launcher downloads a prebuilt engine binary from the repo's GitHub Releases (`https://github.com/pbakaus/impeccable/releases/download/engine-v<version>/impeccable-<os>-<arch>`), checks it against a `.sha256` file served from the same release, refuses to run on mismatch, and caches it in `~/.impeccable/bin/`. The checksum catches corruption, not a compromised release.
  - I did not audit the engine's Rust source (`crates/`). Treat the binary as unreviewed third-party code.
  - Live mode starts a localhost helper and may run an optional `package.json` script; the README says to use it only in trusted local projects. Skip `live`.
  - It also ships a deprecated copy of its own `frontend-design` skill; keep Anthropic's as the one you use.
  - No telemetry in the launcher script. Read: `hooks.json`, the launcher script, `marketplace.json` (via summaries). Not read: `SKILL.md`, the `reference/` files, the Rust engine.
  - Lower-risk alternative if you would rather avoid hooks and a binary: `nextlevelbuilder/ui-ux-pro-max-skill` (MIT, 133,938 stars, Python standard-library scripts with no network calls per its README). But it generates a design system, which would compete with the palette and type already proposed in Forge's plan section 5.
- **Install (run in Claude Code; choose project scope when prompted so hooks stay in the site folder):**
  ```
  /plugin marketplace add pbakaus/impeccable
  /plugin install impeccable@impeccable
  /impeccable init
  ```
  Registers the repo, installs the plugin, then runs the one-time setup the README describes. To check always-on token cost afterward: `claude plugin details impeccable`.
- **Uninstall:** `/plugin uninstall impeccable@impeccable`, then `trash ~/.impeccable` to remove the cached binary. Check `.claude/settings.local.json` for leftover hook entries if you ever used `npx impeccable install` instead.

### 5. Playwright (CLI with skills; MCP as the fallback)

- **What it does for this build:** Fills the two gaps DevTools MCP leaves: **reduced-motion emulation** (`playwright-cli set-reduced-motion`, or `browser_emulate_media` in the MCP) and **non-Chrome engines** (WebKit and Firefox), which matters because scroll-driven CSS and Lenis behave differently in Safari. Also scripted scroll-and-screenshot passes at phone and desktop widths to catch broken animation states. The CLI form is lighter on context than the MCP because it skips large tool schemas (stated in Microsoft's README; no token figures given). A Chase AI roundup (2026-04-15) also calls the MCP version the wrong choice for testing.
- **Source:** https://github.com/microsoft/playwright-cli (MCP: https://github.com/microsoft/playwright-mcp)
- **Maintainer / stars / activity:** Microsoft. CLI: 13,883 stars, last push 2026-09-28, Apache-2.0, npm `@playwright/cli` 0.1.22 (pre-1.0) with SLSA provenance and no install scripts. MCP: 37,944 stars, last push 2026-10-08, Apache-2.0, npm `@playwright/mcp` 0.0.83 with provenance and no install scripts; also in the official marketplace as `playwright`.
- **Trust verdict: Install** (CLI). The MCP route is **Install with caution**: Microsoft says it is not a security boundary, and the official plugin runs `npx @playwright/mcp@latest` (unpinned). Origin allow/block lists do not stop redirects. Use it only against localhost and the preview URL.
  - Read: both READMEs and npm metadata (via summaries), and the official plugin's `.mcp.json` (exact JSON: `npx @playwright/mcp@latest`). Not read: source.
  - Unconfirmed: where `playwright-cli install --skills` writes the skill files (check afterward), and whether browser downloads happen on first use.
  - Lazy alternative: skip the install and have Forge add `playwright` as a dev dependency in the site project with a 10-line script using `reducedMotion: 'reduce'` in the context options.
- **Install (CLI):**
  ```
  npm install -g @playwright/cli@latest
  playwright-cli install --skills
  ```
  First line installs the command globally; second installs the Claude skills that teach it the commands. MCP fallback: `claude mcp add playwright --scope project -- npx @playwright/mcp@0.0.83 --isolated`.
- **Uninstall:** `npm uninstall -g @playwright/cli`; `claude mcp remove playwright --scope project`.

## What changed from the earlier report

- **Chrome DevTools MCP:** promoted to #2. It is the only single tool here that covers traces, Lighthouse (a11y/SEO/best practices), throttling and screenshots.
- **Playwright:** promoted to #5, CLI form preferred. The earlier "pick one" advice flips for this job because the two cover different gaps (reduced motion and WebKit vs. traces and Lighthouse). If Gurashish wants only one, keep DevTools and have Forge test reduced motion with a local Playwright script.
- **Context7:** demoted out of the top 5. Still useful for Motion, Lenis and Three.js docs once authenticated, but GSAP now has official skills and the other picks cover the platform features. Finish the authentication only if Forge picks a library without its own skills.

## Also vetted, not in the top 5

| Candidate | Verdict | Why |
|---|---|---|
| Astro Docs MCP (withastro/docs-mcp, `https://mcp.docs.astro.build/mcp`) | Skip for now | Official and free, but the repo has 66 stars, last push 2025-10-25, and no license. Remote service built on kapa.ai. Context7 covers the same docs. If wanted: `claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp` |
| Vercel `web-design-guidelines` skill (vercel-labs/agent-skills, 32,096 stars, pushed 2026-08-28) | Install with caution, optional | The skill has Claude fetch its rules live from `raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` on every review, so those instructions can change under you. The rules include "honor prefers-reduced-motion" and "muted decorative loops must stop". Cheaper: have Forge read that rules file once (that repo is MIT, 948 stars) and vendor it. GitHub shows no license for `agent-skills` itself although its README says MIT. If you install, take only this skill: `npx skills add vercel-labs/agent-skills --skill web-design-guidelines`. Do not install the whole repo; it includes a deploy skill that uploads project tarballs. |
| shadcn MCP (official, shadcn-ui/ui, 125,142 stars, MIT) | Conditional | Only worth it if Forge chooses React/Next. shadcn supports Astro only with the React integration and Tailwind, which puts a React runtime on a site meant to need no JavaScript. Third-party registries (animated component libraries) install code into your repo, so review before adding. Command if wanted: `pnpm dlx shadcn@latest mcp init --client claude` |
| Figma plugin (`figma@claude-plugins-official`, figma/mcp-server-guide, 2,057 stars) | Install when a Figma file exists | OAuth sign-in, marketplace-pinned. No design files or brand guidelines are known to exist (brief section 5.1), so it has nothing to read yet. Starter plans get 6 tool calls a month; paid Full or Dev seats get 200 a day (Figma docs via search; Figma can change these). The repo lists no license. |
| 21st.dev Magic MCP (21st-dev/magic-mcp, 5,983 stars, ISC, pushed 2026-09-09) | Avoid for this build | Needs a 21st.dev API key and sends your prompts to 21st.dev servers. Outputs React/Tailwind, wrong for static Astro. A Chase AI roundup notes its hero components are too opinionated to import cleanly. Magic UI's own MCP lists Cursor, Windsurf, Claude Desktop, Cline and Roo, not Claude Code. |
| Lighthouse MCPs (priyankark/lighthouse-mcp 210 stars; danielsogl/lighthouse-mcp-server 71 stars) | Skip | Individual maintainers, small. Redundant with DevTools MCP's `lighthouse_audit` and with `npx lighthouse` run through Bash. |
| taste-skill (Leonxlnx, 93,852 stars, MIT, created 2026-02-19) | Skip | Individual maintainer, self-described experimental, bundled scripts not inspected. Overlaps frontend-design and Impeccable. |
| Motion AI Kit | Skip | Paid (Motion+). Its two install routes differ between motion.dev pages. |
| Three.js skills (CloudAI-X/threejs-skills, about 3.5k stars) | Skip | Licensing unclear (README claims MIT, no LICENSE file per a fork's PR); README clone instructions point at a different repo. |
| Superdesign (official marketplace) | Skip | Account-based canvas service; no fit gap identified. |

Do not stack several design skills. One Substack writer reportedly benchmarked 47 popular skills against plain Claude Code and found 40 made output worse; that surfaced in a search summary and I did not open the post, so treat it as an unverified anecdote. One extra design skill (Impeccable) on top of frontend-design is plenty.

## Animation guide for Forge (static Astro site)

### Recommended stack

1. **Layer 0, zero JavaScript.** CSS transitions and keyframes; CSS scroll-driven reveals (`animation-timeline: view()`) wrapped in `@supports (animation-timeline: view())` as progressive enhancement; native cross-document view transitions (`@view-transition { navigation: auto; }`) for page changes.
2. **Layer 1, one JS library for set pieces only.** GSAP + ScrollTrigger (+ SplitText) for two or three pinned or scrubbed sections and the headline reveal. Load it as a deferred module, not in the critical path. If the design needs only reveals, hovers and springs, use Motion vanilla (about 6 kB) instead. Never ship both.
3. **Layer 2, optional.** Lenis smooth scroll, off by default, enabled only if the design truly needs it.
4. **Layer 3, optional accent.** A small fragment-shader canvas in the hero, written directly against WebGL, lazy-loaded after first paint. Skip Three.js (below).

### Libraries compared

Bundle sizes are gzipped, measured on 2026-10-08 with bundlejs/bundlephobia, or taken from the vendor docs where noted. Confirm with Forge's real build.

| Option | License (verified) | Weight | Reduced-motion handling |
|---|---|---|---|
| CSS scroll-driven animations | Web standard | 0 kB JS. Chrome/Edge 115+, Safari 26+. Firefox: caniuse lists 160, MDN lists "preview", so treat as unsupported. About 88% of users globally (caniuse). | `@media (prefers-reduced-motion: reduce)` sets `animation: none` and shows the final state. Gate on `@supports`. |
| Native cross-document view transitions | Web standard | 0 kB JS. Chrome/Edge 126+, Safari 18.2+, Firefox partial. 88.8% globally (caniuse). | Wrap `@view-transition` in `@media (prefers-reduced-motion: no-preference)` (my recommendation). |
| Astro `<ClientRouter />` | Part of Astro (license not re-checked here) | Size not published by Astro; adds a navigation interceptor. | Astro docs: a built-in CSS media query disables all transitions, including fallbacks, under reduced motion. Bundled module scripts run once; re-attach listeners on `astro:page-load`. Prefer native view transitions where 88% coverage is enough. |
| GSAP 3.15.0 + ScrollTrigger + SplitText | **Proprietary "Standard 'No Charge' GSAP License"**, not MIT and not OSI open source. Effective 2025-04-30, last modified 2025-05-30 (gsap.com). Commercial use covered. SplitText, MorphSVG and the other former Club plugins are free; the npm `gsap` package lists the same license. Forbidden: building tools that let users create visual animations without code in competition with Webflow's. Webflow may change terms later (existing versions stay under their original terms). AI-generated GSAP code is allowed. Fine for a marketing site. | Core 27.7 kB, ScrollTrigger about 18.3 kB, SplitText about 3.5 kB. About 46-50 kB total. | `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` condition. SplitText `aria: "auto"` keeps screen-reader text intact. |
| Motion (vanilla `motion` package) | MIT (33,888 stars) | `animate` mini 2.3 kB, hybrid about 18 kB (Motion docs); `scroll()` about 3.7 kB, `inView` under 0.5 kB (bundlejs, motion@14.0.0). The React `motion` component is 34 kB; avoid in Astro unless using React. | React: `MotionConfig reducedMotion="user"` disables transform and layout animations but keeps opacity and color. Vanilla: no documented equivalent, so use `matchMedia` yourself. |
| Lenis 1.3.26 | MIT (16,248 stars) | About 5.4 kB | `respectReducedMotion` defaults to true (smoothing off, programmatic scrolls jump). Keeps native scroll, so anchors and `position: sticky` work. Known limits: Safari capped at 60 fps, no smoothing over iframes, no CSS scroll-snap. |
| Three.js 0.186.1 | MIT (116,158 stars) | Whole package 184.9 kB; a minimal import of six classes still measured 133 kB. Far too heavy for a hero accent aiming at LCP 2.5 s on mobile. | None built in. You must stop or freeze the render loop yourself. |

GSAP licensing check: I read the license page itself, so the "recently changed" status is confirmed. The change is not a switch to open source; it is a no-charge proprietary license that Webflow can amend.

### Accessibility requirements (must-do)

- **Respect `prefers-reduced-motion: reduce` everywhere.** Remove parallax, scrub, pinning, autoplay and large transforms; keep content visible in its final state; subtle opacity fades are acceptable. Minimal GSAP pattern:
  ```js
  const mm = gsap.matchMedia();
  mm.add({ ok: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
    if (!ctx.conditions.ok) return; // reduced motion: leave final state
    // build timelines and ScrollTriggers here; they are cleaned up automatically
  });
  ```
- **WCAG status:** 2.3.3 Animation from Interactions is Level AAA, so the plan's AA target does not strictly require it, but `prefers-reduced-motion` is its listed sufficient technique (C39) and Forge's plan already commits to it. **2.2.2 Pause, Stop, Hide is Level A:** anything that moves automatically for more than 5 seconds beside other content (looping hero shader, marquee, background video) needs a pause, stop or hide control. My inference: the reduced-motion media query alone does not satisfy 2.2.2, because that criterion is about user control for everyone.
- Decorative canvases get `aria-hidden="true"`; never put content or the only call to action inside a canvas.
- Test reduced motion with Playwright (pick 5), since Chrome DevTools MCP cannot emulate it.

### Cautions that keep the site fast for SEO

Thresholds (web.dev, at the 75th percentile): LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less.

1. **Keep content in the HTML.** Google indexes the rendered page and says content not visible in the rendered HTML will not be indexed; it also still recommends pre-rendering because not every bot runs JavaScript. Never gate text on JavaScript adding a class.
2. **Do not hide the LCP element.** A published case saw LCP jump to 5.3 s when a headline started at `opacity: 0` and appeared only after JavaScript ran (Chrome does not count `opacity: 0` elements as LCP candidates). Keep the hero headline and image visible in initial CSS; animate with `transform` after paint, or start motion below the fold.
3. **Animate only `transform` and `opacity`.** Layout properties cause CLS and main-thread jank. Reserve space for animated blocks. Split text into lines only after web fonts load, or the split causes a layout shift.
4. **One animation library, loaded late.** Dynamic `import()` or a deferred module script, only on pages that use it. Budget suggestion (my proposal, not from a source): animation JavaScript at or under about 50 kB gzipped site-wide, deferred, nothing in the critical path.
5. **INP.** Avoid many scrubbed ScrollTriggers or per-frame scroll handlers; test under 4x CPU throttle and Slow 4G with DevTools MCP `emulate`.
6. **No autoplay video or looping shader as the hero.** Use a still poster, a short muted loop with a reduced-motion still fallback, or a paused-by-default canvas with a visible pause control (WCAG 2.2.2). Lazy-start WebGL on `requestIdleCallback`/IntersectionObserver, cap device pixel ratio, pause when off-screen or the tab is hidden.
7. **Smooth scroll is the riskiest "feel" feature.** Lenis keeps native scrolling but adds a per-frame loop and Safari quirks. Test keyboard scrolling, in-page anchors and the mobile address bar before keeping it.
8. **Verify, do not assume.** Run the DevTools MCP trace and `lighthouse_audit` on the Netlify preview, then watch the Search Console Core Web Vitals report after launch.

### Where this collides with the existing plan

- Plan section 5.3 item 6 says "Restrained motion; no autoplay; no carousels", and section 4.6 says no JavaScript is needed to read any page. Gurashish has since asked for smooth, high-tech animation. Forge should update the plan: motion is progressive enhancement over fully readable HTML, with the budgets above.
- **Claims policy (plan 2.4, brief 7.2/7.3):** a "high-tech" look must not imply features that do not exist. Do not animate an AI-matching network, live counters, or invented statistics; AI matching is Phase 3 and no real numbers exist. Abstract geometry is safe; anything that looks like a working matcher is not. Copy and claims decisions belong to Pioneer and Gurashish, not to this research.

## Key findings

- The official marketplace already carries three of the five picks or their close relatives (`chrome-devtools-mcp`, `modern-web-guidance`, `playwright`), with commit pins on the first two. That is the strongest trust signal available here.
- No Lighthouse-specific plugin appears in the official marketplace; DevTools MCP's built-in `lighthouse_audit` covers it.
- GSAP's license is now free for commercial use including former paid plugins, but proprietary and amendable by Webflow.
- The heaviest "wow" option (Three.js) costs more than all other animation libraries combined; the lightest effective options are CSS-native.

## Evidence

| Claim | Source | Date | Type | Confidence |
|---|---|---|---|---|
| gsap-skills: 16,047 stars, MIT, last push 2026-07-29 | https://api.github.com/repos/greensock/gsap-skills | 2026-10-08 | Primary (API) | High |
| GSAP license is "Standard No Charge", commercial OK, Club plugins free, Webflow-competition restriction | https://gsap.com/community/standard-license/ | Effective 2025-04-30, modified 2025-05-30 | Primary | High |
| gsap-core skill covers `matchMedia` and reduced motion; scrolltrigger/performance/frameworks do not | https://github.com/greensock/gsap-skills/tree/main/skills | 2026-10-08 | Primary (via summaries) | Medium-high |
| DevTools MCP: 53,142 stars, Apache-2.0, 59 tools, `lighthouse_audit` excludes performance, `emulate` has no reduced motion | https://github.com/ChromeDevTools/chrome-devtools-mcp, tool-reference.md | 2026-10-08 | Primary | High |
| DevTools MCP telemetry on by default; CrUX calls; opt-out flags | https://github.com/ChromeDevTools/chrome-devtools-mcp | 2026-10-08 | Primary (via summary) | Medium-high |
| Official marketplace pins chrome-devtools-mcp, figma, modern-web-guidance by commit; playwright by path | https://github.com/anthropics/claude-plugins-official (marketplace.json) | 2026-10-08 | Primary | High |
| Modern Web Guidance: Google Chrome, Apache-2.0, 2,447 stars, anonymous telemetry, opt-out `DISABLE_TELEMETRY=1` | https://github.com/GoogleChrome/modern-web-guidance, https://developer.chrome.com/docs/modern-web-guidance | 2026-10-08 | Primary | Medium-high |
| Impeccable: three hooks (SessionStart, PostToolUse Edit/Write, Stop) run a launcher that downloads a SHA-256-checked binary into `~/.impeccable/bin/` | https://raw.githubusercontent.com/pbakaus/impeccable/main/plugin/hooks/hooks.json and the launcher script | 2026-10-08 | Primary code (via summaries) | Medium-high |
| Impeccable: 78,689 stars, Apache-2.0, created 2025-11-16 | https://api.github.com/repos/pbakaus/impeccable | 2026-10-09 | Primary (API) | High |
| Playwright CLI: 13,883 stars, Apache-2.0, `set-reduced-motion`, provenance, no install scripts | https://github.com/microsoft/playwright-cli, https://registry.npmjs.org/@playwright/cli/latest | 2026-10-08 | Primary | High |
| Playwright MCP: "not a security boundary"; `browser_emulate_media` `reducedMotion` | https://github.com/microsoft/playwright-mcp | 2026-10-08 | Primary (via summary) | Medium-high |
| Vercel web-design-guidelines skill fetches rules from a `main` branch URL at runtime | https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/web-design-guidelines/SKILL.md | 2026-10-08 | Primary code (via summary) | Medium-high |
| Bundle sizes: GSAP 27.7 kB, ScrollTrigger 18.3 kB, SplitText 3.5 kB, Lenis 5.4 kB, Three minimal 133 kB | https://deno.bundlejs.com, https://bundlephobia.com | 2026-10-08 | Third-party measurement | Medium |
| Motion `animate` mini 2.3 kB, hybrid 18 kB; MIT | https://motion.dev/docs/react-reduce-bundle-size, https://api.github.com/repos/motiondivision/motion | 2026-10-08 | Primary | High |
| Scroll-driven animations: Chrome/Edge 115, Safari 26; Firefox "preview" (MDN) vs 160 (caniuse) | https://caniuse.com/mdn-css_properties_animation-timeline, https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/animation-timeline.json | 2026-10-08 | Primary | Medium (Firefox conflict) |
| Cross-document view transitions: Chrome/Edge 126, Safari 18.2, Firefox partial, 88.8% | https://caniuse.com/cross-document-view-transitions | 2026-10-08 | Primary | High |
| Astro ClientRouter disables transitions under reduced motion | https://docs.astro.build/en/guides/view-transitions/ | 2026-10-08 | Primary | High |
| WCAG 2.3.3 is AAA (C39 technique); 2.2.2 is Level A | https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html, https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | 2026-10-08 | Primary | High |
| Core Web Vitals thresholds | https://web.dev/articles/vitals | 2026-10-08 | Primary | High |
| Google renders JS but only indexes content visible in rendered HTML | https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | 2026-10-08 | Primary | High |
| Figma MCP: 6 calls a month on Starter; 200 a day on paid Full/Dev | https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/ (via search summary) | 2026-10-08 | Primary, not opened directly | Medium |
| Blog consensus (Frontend Design first; Impeccable, GSAP skills, Vercel guidelines, UI/UX Pro Max named) | https://snyk.io/articles/top-claude-skills-ui-ux-engineers/ (2026-03-02), https://www.chaseai.io/blog/claude-code-frontend-design-skills (2026-04-15), https://www.firecrawl.dev/blog/best-claude-code-skills | 2026-03 to 04 | Secondary | Medium |

## Conflicts and gaps

- **Reddit:** both my search and fetch tools are blocked from reddit.com. The only Reddit evidence I found is a third-party mirror of one r/ClaudeAI thread from March 2026 ("Best skills for front end UI / animation?", 2 points). Its only reply recommended an interaction-state matrix and shared motion tokens (duration, easing, distance), not a specific plugin. I have no r/ClaudeCode data. Gurashish may want to skim those subreddits himself for Impeccable and GSAP-skills feedback.
- **Star counts are a weak signal and move fast.** Roundups disagree (anthropics/skills shown as 65,847 and about 159k). Snyk listed UI/UX Pro Max at 29,636 stars in March 2026; GitHub shows 133,938 now. I cannot say how much of that growth is organic, so picks rest on maintainer, code and activity instead.
- **Firefox and scroll-driven animations:** caniuse says Firefox 160; MDN's data says "preview". I treated Firefox as unsupported.
- **Modern Web Guidance:** one summary said lookups are fully offline; its README says search is offline but telemetry exists and the skill fetches via `npx @latest`. I went with the README.
- **vercel-labs/agent-skills license:** README says MIT; GitHub's API reports none.
- **Bundle numbers** come from bundlejs/bundlephobia, not a real Astro build. ScrollTrigger at 18.3 kB is higher than I expected; verify.
- **Not read:** Impeccable's Rust engine and `SKILL.md`; DevTools MCP, Playwright and Modern Web Guidance source (including the telemetry code); gsap-timeline, gsap-utils, gsap-react. WebFetch gave me summaries of the files I did read.
- **Not done:** the MCP registry search found no shadcn entry and no official Lighthouse server; I did not search other registries (Smithery, Glama) in depth. Nothing was installed, so no tool was actually tried.
- **Astro license** was not re-checked (GitHub's detector reports "NOASSERTION" for the monorepo).

## What I'd do next

1. Gurashish installs the five in order, running each command himself. Start with picks 2 and 5 (QA) if he wants the safest first step; add pick 4 last, and only in the D2EXCEL site folder with project scope.
2. Before installing pick 1, ask Forge to commit to GSAP or Motion. If Motion, skip pick 1.
3. Tell Forge to revise plan sections 5.3 (item 6) and 4.6 for the new motion goal, with the budgets and the reduced-motion and pause requirements above, and to keep the claims policy in force for any "high-tech" visuals.
4. After installing, run `claude plugin details <name>` for each to see always-on token cost, and drop anything heavy that goes unused.
5. Finish Context7 authentication only if Forge ends up using Motion, Lenis or another library without official skills.
6. Revisit Figma only if someone produces a Figma design for the site.

## Sources

https://github.com/greensock/gsap-skills · https://gsap.com/community/standard-license/ · https://registry.npmjs.org/gsap/latest · https://github.com/ChromeDevTools/chrome-devtools-mcp · https://github.com/GoogleChrome/modern-web-guidance · https://developer.chrome.com/docs/modern-web-guidance · https://github.com/pbakaus/impeccable · https://impeccable.style · https://github.com/microsoft/playwright-cli · https://github.com/microsoft/playwright-mcp · https://github.com/anthropics/claude-plugins-official · https://github.com/vercel-labs/agent-skills · https://github.com/vercel-labs/web-interface-guidelines · https://ui.shadcn.com/docs/mcp · https://developers.figma.com/docs/figma-mcp-server/remote-server-installation · https://github.com/21st-dev/magic-mcp · https://docs.astro.build/en/guides/build-with-ai/ · https://docs.astro.build/en/guides/view-transitions/ · https://github.com/darkroomengineering/lenis · https://motion.dev/docs/react-reduce-bundle-size · https://motion.dev/docs/react-accessibility · https://caniuse.com/mdn-css_properties_animation-timeline · https://caniuse.com/cross-document-view-transitions · https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html · https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html · https://web.dev/articles/vitals · https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics · https://snyk.io/articles/top-claude-skills-ui-ux-engineers/ · https://www.chaseai.io/blog/claude-code-frontend-design-skills · https://www.firecrawl.dev/blog/best-claude-code-skills · https://reddit.sentinel-team.org/posts/1rkvlkh/snapshots/2026-03-05T08%3A53%3A45.24988Z

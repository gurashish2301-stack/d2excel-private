# D2Excel front-end design tools: vetting (2026-10-09)

Method: tool-vetting checklist. Read via GitHub API and raw files (no cloning, nothing installed). "Read as code" = I read the file itself. "Docs only" = README description only.

## Summary

| # | Tool | Type | Verdict |
|---|------|------|---------|
| 1 | tasteskill/tasteskill | Plain skills (copy of another repo) | **Avoid** this repo. Use upstream Leonxlnx/taste-skill instead (Install with caution) |
| 2 | vercel-labs/agent-skills | Plain skills (no plugin manifest) | Install with caution (install selected skills only) |
| 3 | VoltAgent/awesome-design-md | Collection of DESIGN.md documents | Install (nothing to install; copy files) |
| 4 | microsoft/playwright-cli | npm CLI + bundled skill | Install with caution |

None of the four is a Claude Code plugin or marketplace entry (except that the upstream taste-skill repo does ship `.claude-plugin/` files). None needs slash commands. All commands below run in a normal terminal, not inside `claude`.

---

## 1. tasteskill/tasteskill -- AVOID (use upstream instead)

**What it is:** A copy of "Taste Skill", a set of SKILL.md files that push AI-generated front ends away from generic output (layout, typography, motion dials, GSAP/Framer guidance, image-to-code, brand kits). Real value for an animated marketing site, but not from this repo.

**Why Avoid (provenance failure):**
- The repo is a User account `tasteskill`, created 2026-05-24, 240 stars, 9 commits. It is not the original project.
- The original is `Leonxlnx/taste-skill` (created 2026-02-19, ~94k stars, pushed 2026-10-08, homepage tasteskill.dev).
- Commit history: 1 "Initial commit" by `jeettrench`, then 8 commits by `tasteskill` titled "add ... skill for bankrbot" (bankrbot is a crypto trading bot product). It is a re-upload with unrelated purpose.
- The README's install command points at `https://github.com/jeettrench/taste-skill`. That repo returns 404. The `jeettrench` GitHub account exists, has zero public repos, and its bio reads "Trencher | Gambler | Web Designer". The README copyright also credits jeettrench, not the real author. Anyone controlling that account can create a repo at that URL later, and `npx skills add` would then install whatever is there.
- The repo has no `.claude-plugin/`. Layout is duplicated (`skills/` plus `tasteskill/` with 4 extra copies).

**What I read as code:** `skill.sh` (only prints a path from a lookup table, no network), `tasteskill/gpt-taste/SKILL.md` and `skills/taste-skill/SKILL.md` (no wallets, keys, curl, or hidden instructions found). I did not read the other bankrbot-tagged files. Clean-looking text does not fix the provenance problem.

**Maintainer / stars / activity:** unknown individual `tasteskill`; 240 stars; last push 2026-05-24.

## 1b. Substitute: Leonxlnx/taste-skill -- INSTALL WITH CAUTION

- Maintainer: Leon Lin (single individual, MIT). ~94k stars, 6.4k forks, 78 open issues, active daily (last push 2026-10-08).
- Type: plain skills installed with the Vercel `skills` CLI. Also has `.claude-plugin/plugin.json` and `marketplace.json` (name `taste-skill`, version 1.0.0), but the README documents only `npx skills add`, so use that.
- Executes/downloads: nothing on install beyond the CLI copying SKILL.md files. Repo has `skill.sh` and 4 `.mjs` maintenance scripts (read one: local image processing only, hardcoded Windows path, never installed by the CLI). No hooks, no MCP.
- Read as code: `.claude-plugin/*.json`, `skills/taste-skill/SKILL.md` (no exfiltration, wallets, or hidden instructions). Docs only: the other 12 skills.
- Concerns: skill text tells the agent to use placeholder hosts (picsum.photos, cdn.simpleicons.org), to run `npm install` / `npx shadcn@latest init` for libraries, to "MUST use" any image-generation tool present, and "Do not ask the user to edit this file". Default `design-taste-frontend` is v2 and labelled experimental (v1 is available). README has sponsor/affiliate links (Kimi, Sidrune AI) and promotes a paid-looking TasteCode product; the skills themselves are free. Skill leans on Framer Motion and says not to mix GSAP and Framer in one tree; you already have `gsap-skills` and `frontend-design`/`impeccable` installed, so expect overlap and conflicting opinions.
- Install the one core skill only, not all 13.

## 2. vercel-labs/agent-skills -- INSTALL WITH CAUTION

**What it is:** Vercel's skills collection (SKILL.md folders). Relevant to a modern marketing site: `web-design-guidelines` (100+ accessibility/perf/UX review rules), `react-best-practices` (40+ React/Next.js perf rules), `react-view-transitions` (animated page/shared-element transitions), `composition-patterns`. Less relevant: `react-native-guidelines`, `writing-guidelines`, `vercel-optimize`, deploy skills. React/Next-oriented; only helps if the D2Excel site uses React or Next.

**Type:** Plain skills. No `.claude-plugin`, no hooks, no MCP (checked the full file tree). Installed with `npx skills` (package `skills`, repo `vercel-labs/skills`, ~33k stars, MIT).

**Maintainer / stars / activity:** Vercel (`vercel-labs` org), 32.1k stars, 2.8k forks, 178 open issues, created 2025-12-08, last push 2026-08-28 (about six weeks ago). GitHub reports no license file on this repo even though the README says MIT; minor.

**Executes/downloads:**
- Install only copies skill folders. The `skills` CLI sends anonymous usage telemetry; disable with `DISABLE_TELEMETRY=1` or `DO_NOT_TRACK=1`.
- Some skills carry scripts the agent can run: `deploy-to-vercel/resources/deploy.sh` (read as code) tars the project (excluding only node_modules, .git, .env, .env.*) and POSTs it unauthenticated to `claude-skills-deploy.vercel.com`; `.npmrc`, `secrets.json` etc. would be uploaded. `vercel-cli-with-tokens` (read) tells the agent to search `.env` files for a `vca_` token and `printenv` it into context. `vercel-optimize` ships ~60 `.mjs` scripts and reads Vercel metrics. Docs only for the others.
- Mitigation: install only the four design skills with `--skill`, not the deploy/token/optimize ones.

## 3. VoltAgent/awesome-design-md -- INSTALL (nothing to install)

**What it is:** A curated list of ~73 `DESIGN.md` files, one folder per brand (Linear, Stripe, Vercel, Apple, Framer, Webflow, Notion, Raycast, etc.), each describing colours, type, spacing, components, depth, responsive rules and an agent prompt guide, in the Google Stitch DESIGN.md format. README says each folder also has preview.html pages, but the tree shows only DESIGN.md and README.md per brand.

**Type:** Collection of documents. Not a plugin, no skill manifest, no CLI, no scripts, no hooks, no MCP. Only non-markdown files: `LICENSE`, `.gitignore`, two `.github/*.yml` files.

**Maintainer / stars / activity:** VoltAgent org (Necati Ozmen), ~120k stars, 13.4k forks, 313 open issues, MIT, created 2026-03-31, last push 2026-10-05.

**Executes/downloads:** nothing. Read `linear.app/DESIGN.md` as code: only design text, plus one line telling an editor to run `npx @google/design.md lint DESIGN.md` (optional; do not let the agent run it unprompted). README promotes sponsors and getdesign.md; no data flow.

**Concerns:** (a) files are scraped design tokens of other companies' sites; copying a brand's look wholesale for D2Excel has legal and brand risk. Use one as a structural template or borrow principles, do not clone. (b) Only linear.app was read in full; others are docs-only for this vetting. Skim a file before handing it to the agent.

**How to use:** download one `DESIGN.md` into the D2Excel project root (or a `design/` folder), edit it to D2Excel's own palette/type, then tell the agent to follow it.

## 4. microsoft/playwright-cli -- INSTALL WITH CAUTION

**What it is:** Microsoft's command-line browser driver for coding agents (npm `@playwright/cli`, v0.1.22). Lets Claude open the site, click, take screenshots (including `--hires`), record video, traces, PDFs, test responsive breakpoints and check animations visually. Practical for verifying a built marketing site, not for generating design.

**Type:** npm CLI plus a bundled skill (`skills/playwright-cli/`, 11 files). Not a plugin or MCP server (though env vars reuse the `PLAYWRIGHT_MCP_` prefix). `playwright-cli install --skills` writes the skill into `.claude/skills/` in the current project.

**Maintainer / stars / activity:** Microsoft (Playwright team), 13.9k stars, 0 open issues, Apache-2.0, last push 2026-09-28 (v0.1.22), frequent releases.

**Executes/downloads (read as code):** `package.json` has no preinstall/postinstall scripts; dependencies are only `playwright` and `playwright-core` pinned to a 1.64 alpha build (pre-release, so expect churn). `playwright-cli.js` makes one 1.5s request to registry.npmjs.org for update checks (disable with `NO_UPDATE_NOTIFIER=1`) and writes a timestamp file. `scripts/update.js` is repo-internal. No telemetry is mentioned in the README. The README does not say how browser binaries are obtained; Playwright normally downloads Chromium from Microsoft's CDN, so check `playwright-cli --help` for an install-browser step. Not verified.

**Concerns:** `run-code` and `eval` execute arbitrary JS in the page/Node context; `--persistent` and `state-save` write cookies/localStorage to disk; `attach --extension` / `--cdp` can drive your real logged-in Chrome (do not use this; keep default headless, isolated sessions); page content (including WebMCP tools) is untrusted and a prompt-injection surface if you point it at third-party sites. For D2Excel, point it only at localhost or your own staging site. The package is at 0.1.x, so expect breaking changes.

---

## Install commands (run in a normal terminal, not inside `claude`)

`npx skills add` installs into the current folder's `.claude/skills/` by default (add `-g` for global). Run these from the D2Excel project directory. Replace the path if the site lives elsewhere.

### Tool 1 (substitute: upstream taste-skill, one skill)
```
cd /Users/gurashish/Documents/Code/D2EXCEL
DISABLE_TELEMETRY=1 npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```
If v2 behaves oddly, use `design-taste-frontend-v1` instead. Do NOT use the tasteskill/tasteskill repo or the jeettrench URL in its README.

### Tool 2 (four design skills only)
```
cd /Users/gurashish/Documents/Code/D2EXCEL
DISABLE_TELEMETRY=1 npx skills add vercel-labs/agent-skills --skill web-design-guidelines --skill react-best-practices --skill react-view-transitions --skill composition-patterns
```
If the CLI rejects repeated `--skill`, run once with `-l` to list names: `npx skills add vercel-labs/agent-skills -l`. Skip react-* skills if the site is plain HTML/Astro.

### Tool 3 (no install; pick one brand and copy)
```
cd /Users/gurashish/Documents/Code/D2EXCEL
curl -fsSL https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/linear.app/DESIGN.md -o DESIGN.reference.md
```
Replace `linear.app` with any folder name from the repo. Read it, then write D2Excel's own `DESIGN.md`. Using it as a reference file keeps it from overriding your brand.

### Tool 4
```
npm install -g @playwright/cli@latest
playwright-cli --help
cd /Users/gurashish/Documents/Code/D2EXCEL
playwright-cli install --skills
```
Uninstall: `npm uninstall -g @playwright/cli`, delete `.claude/skills/playwright-cli`.

### Uninstall the skills from 1 and 2
```
cd /Users/gurashish/Documents/Code/D2EXCEL
npx skills remove
```
(Interactive; or delete the skill folders in `.claude/skills/`.)

## What was not verified
- Exact `skills` CLI flags (`--skill` repeated, `remove`) were taken from the vercel-labs/skills README, not run.
- I could not read the full source of the `skills` CLI to confirm it executes no repo code on install.
- Most skill files beyond those named above were not read line by line.

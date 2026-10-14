# LinkedIn post production: tools found and vetted (Scout, checked 2026-10-12)

## Recommended stack (minimal, in order)
1. **Brand sheet and copy.** One page with the logo's blue and red hex, fonts, voice, and the rule "every statistic has a source line that can be opened". Then write with the `d2excel-content-writer` skill, review with `marketing:brand-review`. (Both already installed.)
2. **Three to four HTML templates rendered to PNG with Playwright.** Exact text, exact colours, real logo. Being built by Forge in `D2EXCEL/social-kit/`. Free; Chromium is already on this Mac.
3. **Canva connector** (already connected and working; no brand kit set up yet), only when a design needs photo composition or a click-to-edit file. Free tier exports standard-quality PNG.
4. **Publish by hand, or with LinkedIn's built-in Page scheduler** (clock icon in the composer; single image posts, 1 hour to 3 months ahead; page super or content admin only). No tool holds a posting credential.

## Verdicts
| Tool | Verdict | Why |
|---|---|---|
| Playwright / headless Chrome (HTML to PNG) | Install (already present) | Exact text and colours, Apache-2.0, free |
| Canva connector (official) | Use, with caution | Already connected; text accuracy of generated designs untested; no LinkedIn publish tool |
| Orshot (template API, hosted MCP) | Caution | Free 100 credits a month; its MCP has 103 tools including social publishing, so never connect LinkedIn there |
| LinkedIn native Page scheduler | Use | Free, no third party holds a credential |
| Buffer (free: 3 channels, 10 queued posts each) | Caution | Holds a LinkedIn token; only if cadence outgrows hand-posting |
| Postiz (cloud, `postiz` CLI, AGPL) | Caution, optional | $29 a month, no free tier; CLI can publish |
| Figma MCP | Skip for now | Needs design skill, manual export, write-tool pricing unclear |
| Adobe for Creativity connector (Express) | Caution, backup | Exports and brand kit undocumented |
| Image-generation MCPs (Replicate, fal) | Caution | Billable API key; no text-rendering guarantee; license differs per model |
| LinkedIn MCP servers (browser-session based) | Skip | Its own README warns accounts can be restricted or banned |
| LinkedIn Community Management API (direct) | Skip | Needs a registered organisation, business email, super-admin verification and a two-tier review |
| Satori, node-html-to-image, Bannerbear, OpenDesign | Skip | Redundant, costly or too much surface |
| Social Media Skills (community plugin, 106 skills) | Not vetted in depth | Writing skills only (linkedin-post-writer, carousel-writer, quote-cards, infographic-and-data-viz); the installed marketing skills cover the same ground |

## Image rights
- Use a real campus photo you have rights to. AI "campus" imagery in admissions marketing could mislead.
- Canva's AI terms give you the output for lawful use, but outputs may not be unique and there is no non-infringement guarantee (third-party summary; Canva's own pages returned 403).

## Not verified
Canva Free brand kit availability and pricing; text accuracy of Canva `generate-design`; Buffer's MCP; Figma write-tool pricing; Adobe Express exports; Orshot free-plan watermark; whether PDF carousels can be scheduled natively on LinkedIn.

## Sources (all checked 2026-10-12)
Canva MCP docs (canva.dev/docs/mcp), Playwright (github.com/microsoft/playwright), Postiz (github.com/gitroomhq/postiz-app, postiz.com/pricing), Buffer pricing, LinkedIn Help (scheduling, Page admin) and Microsoft Learn (Community Management API review, restricted use cases), stickerdaniel/linkedin-mcp-server README, Orshot pricing and MCP docs, Replicate MCP docs.

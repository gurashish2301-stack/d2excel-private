# About page copy draft (sourced)

Prepared by Pioneer, 2026-10-10, for the About page redesign (`site/src/pages/about.astro`). Read-only on the Drive; nothing was created or changed there.

Every sentence of proposed copy ends with a source tag. Anything with no tag is a note to Gurashish, not copy.

## Sources

| Tag | Drive document | Date | Role |
|---|---|---|---|
| [Strategy] | D2EXCEL_Product_Strategy_v1.docx (Product) | V1.0, Jul 28, 2026 | The only document with actual vision and mission text. Primary source. |
| [PRD] | D2EXCEL_PRD_v1(Rev 4) (Product) | Sept 1, 2026 | Lists "Mission, vision, about, contact" as P0 Phase 0 pages but contains no text for them. One useful principle (cite official sources). |
| [Deck] | d2excel-strategy-deck.pptx (Product) | modified Sep 30, 2026 | Motto, phase timeline, positioning. |
| [Architecture] | D2Excel — Website Content Architecture (v1.0), Google Sheet | modified Sep 22, 2026 | Shows the About page structure (company story, mission statement, team section), all rows empty. |
| [Social Bios] | D2Excel_Social_Bios.docx (Marketing/Social Media Research/Docs) | Jul 17, 2026 | Name expansion and an editorial rule about only stating what is true today. |
| [Brief] | Not a Drive document. Gurashish's instruction for this task and `D2EXCEL/CLAUDE.md` | 2026-10-10 | Source for "guides are live" and "California". |

Also read but not used for copy: D2Excel Positioning and Competitive Research.docx (Oct 4, 2026). It describes a different product (see "Conflicts" below).

## Headline options

1. **Someone in your corner who actually knows you.** [Strategy §2, Vision: "has someone in their corner who actually knows them"]
2. **A trustworthy home base for planning what comes after high school.** [Strategy §2, Mission: "a free, trustworthy home base for college and career planning"; "free" removed, see "Held back"]
3. Tagline, if wanted under the name: **Desire to Excel.** [Strategy cover, Deck cover and PRD cover: motto "Desire to Excel"]

Note: the current page headline, "Good guidance should not depend on who you know.", and the dark-band line, "Good guidance was never scarce. Access to it was.", do not appear in any Drive document I read. They are voice, not facts, so they are your call, but they are unsourced.

## Intro line (under the headline)

D2Excel, short for Desire2Excel, is building a marketplace that connects students with college admissions counselors, starting in California. [Social Bios, "Desire2Excel" as the full name for About-type fields; Strategy §1, "a two-sided marketplace connecting high schoolers to college and career counselors"; Brief, California]

## Why we are building it

Every high schooler working out what comes after graduation should have someone in their corner who actually knows them, not just a generic search result. [Strategy §2, Vision]

So we are starting with the student. We want to give students a trustworthy home base for college and career planning from day one, one that is useful on its own, before any counselor is involved. [Strategy §2, Mission; Strategy §2, "the product has to deliver real value solo before any counselor is involved"]

And when general guidance stops being enough, we want to give students a path to a real advisor. Parents come right after students in how we think about this, because family trust is what the whole platform depends on. [Strategy §2, Mission, "a path to a real advisor once free guidance stops being enough"; Strategy §2, "parents are close behind ... their trust is what the whole platform depends on"]

## Principles (4, all supported)

**Students come first.** The student gets real value on their own before a counselor is ever involved. [Strategy §2, "the student first, because the product has to deliver real value solo before any counselor is involved"]

**Trust travels through people you already trust.** We would rather families know our name because a school or counselor they rely on pointed them our way than because an ad found them. [Strategy §2, "How we win"; "Bay Area" removed per Brief]

**Point to the official source.** Admission rules need to be right, so our guides cite and link to official sources instead of standing alone as the authority. [PRD §4.3, "content should cite and link to official sources, not stand alone as authoritative"; Strategy §4, BigFuture row: "Don't try to replicate it — link to it instead"]

**Say what is true today.** We state only what is true of D2Excel today, with no invented numbers, testimonials or outcomes. [Social Bios, "Every claim below is grounded in what's actually true of the product today ... No stats, testimonials, or outcomes ... since none exist yet"]

Optional fifth, thinner support: **Be clear about what D2Excel is.** We are a place to find a counselor, not the counselor. [Strategy §7, "D2EXCEL is not the seller of record"; Architecture, "we are just a portal", "this is a open marketplace"] The Architecture rows are internal notes, not approved wording, so I left this out of the main four. It also contradicts nothing on the current page, whose "upfront about our stake" habit has only partial support: the docs back disclosing that D2Excel is a marketplace/portal, but I found nothing on "we will say when you may not need one."

## Where we are now

We are early. Our guides on applying to college, entrance exams, financial aid and choosing a major are live, and the counselor marketplace is planned. [Brief, guides live; Strategy §6, Phase 2 "Counselor marketplace (manual, then assisted)"; Deck, "Phase 2 Marketplace MVP"; the six guide drafts in Marketing/SEO Website Content cover these topics]

Copy deliberately gives no dates or phase numbers. The documents put the marketplace after a student-accounts phase, so "next" would be wrong, and a date would be a promise.

## Team

No copy proposed. Findings:

- The Architecture sheet has an ABOUT > "What's public" > "Team section" row, but with no assignee, no status and no notes. [Architecture]
- Strategy §10.1 lists "team/about" as a page for the marketing owner to write, but gives no team content. [Strategy §10.1]
- No document I read contains a public team roster, founder story, bios or photos. Strategy names internal roles and first names for planning only (engineers, a CTO, relationship owners); I did not carry any of that over.
- The wording "What's public" suggests the intent was to decide what to show. The page's own placeholder says the same.

Decision for Gurashish: show a team section at all, show names, or say nothing until launch. Safest default: remove the team block for now rather than ship a placeholder.

## Not in the documents (so not in the copy)

- A company founding story: who started D2Excel, when, or why. The Architecture sheet has a "Company story" row, empty.
- A written values list. The Architecture sheet has "Our Mission statement and Values" on Home, empty. The four principles above are assembled from strategy, PRD and bios text, not from a values document. Treat them as drafted principles needing sign-off.
- Anything about outcomes, user counts, partner schools, or counselor numbers. None exist per Social Bios, and no school commitments are confirmed in the documents.

## Held back, and why

| Source wording | Why not used |
|---|---|
| "free, trustworthy home base" (Strategy §2) | Rule: no pricing. Revenue plans include a premium option, so "free" could become a promise. Your call whether to put "free" back for the guides. |
| "affordable ... path to a real advisor" (Strategy §2) | Cost claim, and fees are off the site for now. |
| "vetted path" (Strategy §2), "Vetted freelance marketplace" (Deck), "vetted counselors reviewing" (Positioning) | Rule: no "vetted" or counselor review claims. Background checks are planned, not live. |
| "not a five-figure price tag most families can't reach" (Strategy §2) | Price reference, and "most families" is an unsourced quantity. |
| "AI-powered", "matched by data" (Social Bios) | Rule: no "AI-powered". Also not true of the product today. |
| 400:1 counselor ratio (Deck), 432 per counselor (Positioning), market sizes (Strategy §3) | Rule: no statistics without a source on the page. Could return with a linked citation. |
| "Bay Area" throughout | Rule: California wording. Dropped, not replaced with a claim. |
| "San Ramon-based" (Strategy §8, legal risk row) | Appears once, in a legal context. Not confirmed as something to publish, and it is Bay Area-specific. Ask before using. |
| Referral tiers, Ambassador program, parent chat visibility, background checks, school partnerships (Strategy, Deck, PRD) | All planned, none live. Not company-level About material yet. |

## Conflicts between documents

- **What D2Excel is.** Strategy (Jul 28) and Deck describe a two-sided counselor marketplace with a student resource hub. The newest document, Positioning and Competitive Research (Oct 4), describes a free application workspace for Bay Area seniors with counselor review, and itself lists "Who is the customer?" as an open item. Social Bios call it an "AI-powered" matching marketplace. I used Strategy because it is the only document with a mission and vision, and because the current page and `CLAUDE.md` already use marketplace framing. But Strategy is older than Positioning, so please confirm the mission text is still current.
- **Name spelling.** Documents write "D2EXCEL" and "D2Excel"; the motto is "Desire to Excel" but the formal name is "Desire2Excel" (Social Bios). The copy uses "D2Excel, short for Desire2Excel" and "Desire to Excel" for the motto only.
- **Geography.** Every document says Bay Area; copy says California per `CLAUDE.md` (Gurashish, 2026-10-10).

## Search coverage

Full-text searches for mission, vision, about us, one-pager, pitch, our values and why we; a title search for about, story, values, mission, brand, pitch, one-pager and vision (no results); and a listing of the Product and Management folders. Management returned no files. No dedicated mission, vision, story, values, brand or one-pager document exists in the Drive. The Obsolete folders were not opened.

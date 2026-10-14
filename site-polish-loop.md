# Site polish loop (started 2026-10-10)

Goal from Gurashish: keep making the site look better, smoother and more modern without going over the line. Research every round, analyze after every run, and finish the last run cleanly.

Each round: (1) Biscuit researches references in the browser, (2) Forge builds one scoped change, (3) Biscuit checks it independently with screenshots and a check script, (4) analysis below, (5) the next round's target comes from what the analysis found.

Rules carried over: `site/CLAUDE.md` hard rules (readable text, AA contrast, reduced-motion and no-JS fallbacks, no motion longer than 5s, budgets, no invented claims, California wording, local only).

## Starting state (round 0)
- Home and Guides (hub plus six articles) already use the new design system (direction C: dark hero with the glowing oval ring, light paper reading sections).
- For students, For counselors, How it works, About, Join, Privacy, Terms and 404 still use the old look: a bright blue gradient hero, the old Pause motion button (now against the rules), white pill nav, and sections that only appear after scroll animations (they are blank in a full-page capture). Moving from Home to any of these pages feels like a different site, which is the biggest visual problem right now.
- Home: strong overall. Two small issues: a white wall tile on the right that shows only an icon, and a ghost card that the "From: D2Excel" card partly covers.

## Round 1: For students and For counselors
**Research (Raycast Teams, Stripe Atlas, Linear Customers):**
- Raycast: feature rows that alternate sides. One side is a small glowing diagram; the other has an eyebrow with an icon, a heading, two short paragraphs and a text link. A big gradient "stage" panel then holds the key visual. Lots of empty space and one idea per row.
- Stripe Atlas: a faint column grid (dashed vertical lines) gives the page structure. Feature items get an icon, a heading with a small accent tick, and body text. A quiet tinted band breaks the page up.
- Linear: restraint. A large plain H1, thin dividers between columns, muted secondary text, no decoration that carries no meaning.
**Plan:** move both audience pages onto the new system, with a shared inner-page template that later pages reuse.

## Round 2 research (How it works and About), done while round 1 was building
- Linear Method: a centered editorial H1 in a large serif, short centered lede. Below it, two large dashed circles overlap with a hatched intersection, and a bright stroke draws along one arc. It's meaningful decoration, and a finer version of our "Students / Fit / Counselors" Venn.
- Attio: a sticky left index of steps (the active one dark, the rest faded) beside the content. Statements have a dark bold lead-in and a muted grey remainder. Panels sit on hairline grid lines.
- Resend: a row of icon tabs that switch one stage panel. Idea for How it works: a "Students | Counselors" switch that swaps the step text (accessible tabs; with JS off, both lists show).
- About content: Pioneer drafted sourced copy from the Drive in `D2EXCEL/about-copy-draft.md` (vision, mission, 4 principles, a "where we are now" line; every sentence tagged with its source). There's no team content in the Drive, so the visible "Placeholder" team box should go.

## Round 3 research (Join), done early
- Linear Contact: a two-column split. On the left, a big H1 and a short checklist of what you get, each item with a check icon. On the right, a quiet form on a dark field: labels above the fields, a muted placeholder example, a pill submit button, and an alternative contact line beside the button. A single hairline divides the columns.
- Vercel Contact: the same split on light. Fields pair up two per row, the consent is a bordered card with a toggle, and the submit button is small and dark (not full width).
- For our Join: replace the "I am a" dropdown with three large role choices (student, parent, counselor) as accessible radio cards. Use a left column of "what happens next" checks. Turn the "this is a demo" note into a calm inline notice, not a big blue box. Build the success and error states.

## Decisions waiting for Gurashish (not blocking the loop)
1. Team section on About: the Drive has no team content. Default: no team block until you decide.
2. The Drive disagrees on what D2Excel is. The Jul 28 strategy says a two-sided counselor marketplace. The Oct 4 positioning doc says a free application workspace with counselor review. The site follows the marketplace framing in `D2EXCEL/CLAUDE.md`. Is that still right?
3. The old About headline ("Good guidance should not depend on who you know.") is house voice and isn't in any Drive doc. Keep it, or use the Drive vision line ("Someone in your corner who actually knows you")?

---
# Round 1 result: For students and For counselors (done, 2026-10-10)
**Built by Forge:** shared inner-page template (`InnerLayout`, `inner.css`, hero, section, feature row, live board, ask), both pages on the dark-hero plus paper-sections look, Pause button gone, nothing hidden until scroll.
**Forge's numbers (production build):** Lighthouse mobile 98 and 98 to 99, desktop 100; LCP 2.1 to 2.3 s; CLS 0; JS 39.5 kB gzipped on a first visit; lowest contrast 5.51:1; reduced motion and no-JS complete. It also found and fixed a real CLS of 0.135.
**Library elements used:** SplitText headline settle (later visits only, 3.2 kB), DrawSVG hand-drawn oval (1.9 kB), blur fade, bento grid, one-pass button sweep, dot grid (all CSS), magnetic hero button (0.7 kB), existing spotlight and tilt cards.

**Biscuit's independent check (screenshots at 1440, 390; scripted overflow check at 320, 390, 768, 1440):**
- No horizontal overflow at any width; no Pause button anywhere; looks like the same site as Home and Guides. Big improvement over round 0.
- Dev server logged a stale-dependency 504 for gsap after Forge's new dynamic imports; cleared the Vite cache and restarted the preview. Console clean after that.
- Found, to fix next round:
  1. On a phone, the floating bottom dock sits over the hero art on first view (the "Applications" card label is half covered until the first scroll). Same on Home. Text must not be covered at rest.
  2. The hand-drawn oval around "now" touches the top of "counselor" on the next line at 1440.
  3. "What is live, and what is planned" repeats what the bento cards above already say ("Live today" and "Planned" labels appear three times per page). Trim to one.
  4. Home still has a plain white wall tile and a ghost card partly covered by the notification card (from round 0).

## Analysis
- What worked: building a template first made two pages in one round and sets up the next three. Prototyping variants stopped the counselor art from getting cluttered. The CLS check caught a real bug that a visual check would have missed.
- What to change: pages are getting long and a little repetitive. Next rounds should cut rather than add. The "one signature moment plus two supporting elements" cap is holding; keep it.
- Risk: first-visit JS is 39.5 kB against a 40 kB budget, so any further library element must be CSS-only or load later.

## Decision list for Gurashish (not blocking)
- Counselor page lists "A background check" as an expectation (current plan, may change). Pioneer's note says background checks are planned, not live; it reads close to the "vetted" wording we avoid. Keep, soften, or remove?
- FAQ accordions were skipped because neither page has real Q&A copy. Pioneer or Beacon can write real ones from the guides if you want them.

# Round 2 target: How it works and About
Template reuse, plus fixes 1 to 4 above. About uses Pioneer's sourced copy (`about-copy-draft.md`), no team block, and the sourced vision line "Someone in your corner who actually knows you." as the headline (default chosen without a check-in; the old line is voice, not in any Drive doc).

## Beacon's claims and SEO review of the audience pages (2026-10-11), queued for round 3
Held until Forge's round 2 finishes, since round 2 also touches these two files.

**Claims to soften (quote, then safer wording):**
- Counselors: "A background check. Families trust a marketplace more when the people on it have been checked." -> "A background check. We expect to ask for this before a counselor is listed." (drop the trust sentence)
- Counselors lede and meta: "We are expanding the counselor network now." -> "We are inviting counselors to express interest ahead of launch."
- Counselors: "When they are ready for a counselor, they will find you here." -> "The plan is to list independent counselors next to the guides."
- Counselors: "families can see why you might be the right match" and the Venn label "The right match" -> "families can read who you work with and how"; "A place to start a conversation."
- Counselors: "You keep running your practice the way you already do." -> "The plan is for counselors to stay independent. D2Excel is a marketplace, not an employer. Terms come at onboarding."
- Counselors art: "Reading the guides today" and "Students and parents read the guides" -> "Guides for students and parents" (don't imply an existing audience).
- Students: "Cal State processes sit side by side" -> "Our UC guide shows how the UC application differs from the Common App." (no Cal State guide exists; Pioneer to confirm)
- Students: "see why one might be right for you" and "see why each one might fit" -> "browse independent counselor profiles".
- Students lede: "a way to find an independent counselor as we launch" -> "A way to find an independent counselor is planned."
- All six guides are still draft or needs-review in their front matter, so "each guide names its sources and when it was last checked" needs Gurashish's confirmation before launch.

**Message:** Students H1 option "College answers you can check, *today*." with the lede "Free guides on applying, testing and paying for college in California. Finding a counselor is planned." Counselors H1 option "Help build the marketplace for *independent* counselors." with "Launching in California. Nothing for counselors is live yet. Tell us about your practice and we will follow up." CTA "Join the counselor waitlist". The Join form is a demo and has no "where you are in the process" or "practice" field, so those lines overpromise it. ("Free" needs Gurashish's OK, because the pricing rule says no fees on the site yet; the guides are free to read today, but revenue plans include a premium option.)

**SEO and AEO:** keyword titles ("College guides for California students", "For independent college counselors in California"); new meta descriptions; WebPage and BreadcrumbList JSON-LD plus the Organization logo; unique H2s; link the SAT/ACT and majors guides and `/guides/choose-a-counselor/`; descriptive anchors ("Browse all 6 college guides"); one answer-first definition sentence ("An independent college counselor is a private adviser, not a school employee."); gloss "Common App" and "UC"; plain words for marketplace, waitlist, onboarding; a one-line key "Planned means not built yet."

## Round 4 research (Privacy, Terms, 404), done early
- Linear Privacy: one narrow reading column (about 620 px), a large plain H1, a mono "EFFECTIVE DATE" line, bold lead-in sentence, hairline divider, then a numbered mono contents list. Nothing else competes with the text. Fits our article reading layout (`article.css`), so Privacy and Terms should reuse it instead of the inner-page template. Our pages are placeholders, so keep the visible "placeholder, not final" notice and don't write legal text.
- 404: keep it small and useful: one H1, a short line, and links to the six guides and Home (no jokes or fake search).

---
# Round 2 result: How it works and About (done, 2026-10-11)
**Forge's numbers (production build):** Home mobile 99 / desktop 100, LCP 2.1 s, CLS 0 (no regression); How it works and About mobile 98 / desktop 100, LCP 2.3 s, CLS 0; JS 38.8 to 39.9 kB first visit; lowest contrast 5.25:1; 0 failures at 320 to 1920; 140 Tab presses per page with no covered stop.
**Fixes applied:** dock no longer covers content at rest on phones (verified by me at 390 on Home); oval clearance; "live and planned" repeated section removed on the audience pages; Home's blank third row of wall tiles removed.
**New:** accessible Students | Counselors tabs on How it works (both lists show with JS off or reduced motion); About built from Pioneer's sourced copy with no team block and no placeholder box.

**Biscuit's independent check (screenshots at 1440 and 390):**
- How it works and About look like the rest of the site. The phone first view of Home is clean: no bottom bar over text.
- Weak spots (minor, for the polish pass): the overlap diagram on How it works is small and pale and leaves a tall empty gap on the right under it; the closing "Join the waitlist" band shows an empty glowing ring on four pages, which reads as repetitive.

## Analysis
- Worked: reusing the template cut each page to about 20 minutes of Forge time (round 1 took 45). Choosing the tabs over the sticky index by screenshot kept the page short.
- Watch: first-visit JS is 39.9 kB of a 40 kB budget, so Join must add nothing heavy. The same closing ring on every page needs one more idea in the polish pass (for example a different small meaningful image per page, or none).
- Reduced motion hides the dock until first scroll rather than showing it at rest (Forge's open question); acceptable because it only moves the dock, nothing is blocked. Not changing.

# Round 3 target: Join page plus Beacon's copy and SEO fixes (running)

## Polish-pass research (closing band and footer), done while round 3 builds
- Resend: the closing band is a big centered serif headline plus one button, then a giant, very low-contrast wordmark running across the bottom of the footer (decorative). Raycast: a footer where one soft light streak crosses the top edge.
- For us: (1) the closing "Join the waitlist" band shows an empty ring on every page; put something real in it instead, for example a single next-step guide card for that audience (a link, not decoration); (2) the footer gets an oversized outlined "D2Excel" wordmark at very low contrast (`aria-hidden`, doesn't carry meaning, doesn't cover the links). Both stay CSS-only.

---
# Round 3 result: Join page plus copy and SEO fixes (done, 2026-10-11)
**Forge's numbers (production build):** Home 99 / 100, LCP 2.1 s (no regression); Join, For students, For counselors, How it works mobile 98, desktop 100, LCP 2.3 s, CLS 0 (How it works 0.001); first-visit JS 39.7 to 39.9 kB; lowest contrast 5.51:1; JSON-LD parses; no overflow at six widths; keyboard clean.
**Biscuit's check (screenshots at 1440 and 390, and a live form test):** Join looks like the rest of the site. The role cards, the practice field that appears for Counselor, and the inline email error with a clear message all work. The demo notice is honest ("This form does not send anything yet"). Console clean.
**Left for Gurashish:** How it works marks "Join" as live though the form is a demo; "each guide names its sources and when last checked" needs confirming because all six guides are draft or under review; Join H1 wording is Forge's; with JS off the conditional field stays hidden until a role is chosen (I asked for both to show).
**Not run:** Pioneer's fact-check of the changed copy (cut because the user asked to stop after round 3); Firefox, WebKit, a real phone and a screen reader are still unverified.

# New directive (2026-10-11): work only on the Home page
Gurashish's list: (1) logo reveal when the site opens, (2) add the logo's red to the palette, (3) make the oval behind "right counselor" bigger, angled and behind the text, (4) card orbit animation on scroll for the guide cards, (5) a few more animations in the same style. Round 4 (Home) is running; readings of each request are in the Forge brief.

---
# Round 4 result: Home only (done, 2026-10-12)
**Requests and outcome:**
1. Logo reveal: plays on every direct load, reload, new tab or outside arrival; skipped for in-site navigation, reduced motion, no-JS. Settles in about 2.2 s, lands on the header logo, CLS 0. Fixed a bug where the curtain swallowed taps. Biscuit saw the ring draw in red and blue around the white mark in a fresh browser.
2. Red: ramp 50 to 950 from the logo's red; used on the ring arc, ember glow, status dots, "Planned" markers, a seam line, and the closing ask; blue stays every action.
3. Oval behind "right counselor": one ellipse tilted -11 degrees, 150% by 160% of the headline block, under all text, with 8.2:1 contrast at worst.
4. Orbit: all six cards, quarter turn, 10% farther out, fading to hidden by the end of the range. The two missing cards (SAT/ACT and counselor guide) were caused by `:nth-child` miscounting a decorative `<i>`; fixed with `:nth-of-type`.
5. More motion: red-to-blue seam line drawn on scroll, doors on an arc, story cards dealt along an arc. Rejected: fanning the notification and chips (text-dense) and a second ring rotation.
**Numbers (production, 3 runs):** mobile 99 to 100, desktop 100, LCP 2.1 s, CLS 0, TBT 0; JS 38.8 kB first visit (no JS added); lowest contrast 5.25:1, 0 failures at six widths; no overflow; console clean; For students, Join and Guides pixel-identical.
**Biscuit's check (fresh browser, screenshots at rest and at scroll 200):** all five visible in the browser; headline readable over the oval; cards in view and moving.
**Open:** the build minifier drops `animation` plus `animation-timeline` on Chromium 145 for `.fit` (How it works diagram) and `.wall-col` elsewhere, so those two are static in production (still readable); about 340 px of empty navy under the chips on tall screens; cards poke 7 px past the ring mid-turn at 1440; DESIGN.md's "One Red Rule" became "Marker Red Rule". Firefox, WebKit, real phone and screen reader still unverified.

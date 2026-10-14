---
name: D2Excel
description: "Lamplight and paper. A dark, glowing navy for story moments and a warm, calm paper for anything you read or fill in, held together by the logo's blue and red and its oval."
colors:
  blue-600: "#0040c0"
  blue-500: "#2a5fe0"
  blue-300: "#8fb2ff"
  blue-200: "#c4d6ff"
  blue-100: "#e3ecff"
  blue-50: "#f1f5ff"
  blue-700: "#0033a0"
  red-950: "#2f0309"
  red-900: "#5a0610"
  red-800: "#850a14"
  red-700: "#b00d1a"
  red-600: "#e01020"
  red-500: "#f0303f"
  red-400: "#ff5a66"
  red-300: "#ff8f98"
  red-200: "#ffc4ca"
  red-100: "#ffe1e4"
  red-50: "#fff1f2"
  navy-1000: "#030617"
  navy-950: "#050b24"
  navy-900: "#08122e"
  navy-850: "#0b1a40"
  navy-800: "#0f2255"
  paper-0: "#ffffff"
  paper-50: "#fbfaf6"
  paper-100: "#f5f2ea"
  paper-200: "#ebe7db"
  paper-300: "#dcd6c6"
  paper-500: "#8b8573"
  ink-1: "#0b1430"
  ink-2: "#2b3450"
  ink-3: "#4f5a75"
  text-on-dark: "#f5f8ff"
  text-2-on-dark: "#c3cfe8"
  text-3-on-dark: "#93a3c7"
  ok-700: "#0d6b36"
  warn-100: "#fff1cc"
typography:
  display:
    fontFamily: "Geist Variable, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.8rem + 6vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  h1:
    fontFamily: "Geist Variable, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 4.4vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "Geist Variable, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.4rem + 2.2vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  h3:
    fontFamily: "Geist Variable, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.25rem + 0.6vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Geist Variable, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  reading:
    fontFamily: "Geist Variable, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.02rem + 0.2vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Geist Variable, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  accent:
    fontFamily: "Instrument Serif, Iowan Old Style, Palatino Linotype, Georgia, serif"
    fontSize: "1.1em"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Geist Mono Variable, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
  seam: "clamp(24px, 4vw, 56px)"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  section: "clamp(64px, 3rem + 5vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.blue-600}"
    textColor: "{colors.paper-0}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 24px"
  button-primary-on-dark:
    backgroundColor: "{colors.blue-500}"
    textColor: "{colors.paper-0}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 24px"
  button-glass-on-dark:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 24px"
  nav-top:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.text-2-on-dark}"
    rounded: "{rounded.pill}"
    height: "52px"
  nav-dock-active:
    backgroundColor: "{colors.paper-0}"
    textColor: "{colors.ink-1}"
    rounded: "{rounded.pill}"
    height: "44px"
  card-on-dark:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-on-light:
    backgroundColor: "{colors.paper-0}"
    textColor: "{colors.ink-1}"
    rounded: "{rounded.lg}"
    padding: "24px"
  notification:
    backgroundColor: "{colors.blue-500}"
    textColor: "{colors.paper-0}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  field-on-light:
    backgroundColor: "{colors.paper-0}"
    textColor: "{colors.ink-1}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 14px"
  tile-blue:
    backgroundColor: "{colors.blue-600}"
    textColor: "{colors.paper-0}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: D2Excel

Direction C, Hybrid, chosen by Gurashish on 2026-10-10. Code: `src/styles/system/`. Live reference: the private `/lab/system/` page (dev server or `npm run build:lab`; noindex, outside the sitemap, linked from nowhere). The older pages still use `src/styles/base.css` and friends until their redesign round, and the two systems never load on the same page.

## Overview

**Creative North Star: "Lamplight and Paper"**

D2Excel says two things and the design says them with two surfaces. The story (who we are, what we are building, the one ask) is told in a deep navy that glows: a lit oval, glass pills, small mono labels, a wall of real guides in perspective. Everything a person has to read carefully or fill in (guides, forms, legal) sits on a warm, quiet paper with navy-tinted ink, so a long article is as comfortable as a printed one. The logo's oval is the recurring shape: the glowing ring, the white plate behind the logo on navy, the seam curves between sections.

The system is calm at rest and does its work through three kinds of movement only: things arrive and settle, the cursor and the scroll move a few things a few degrees, and states change. Nothing loops. The page reads fully, in order, with scripts off and with motion reduced.

**Key Characteristics:**
- Two themes in one page: `.theme-dark` for story and chrome, `.theme-light` for reading and forms, switched at rounded seams.
- Blue carries every action. Red, the logo's second colour, is a marker and a mark (the arc and ember on the ring, where the big ring starts, a dot, a seam line, "Planned"), never a button, a link or a paragraph. It leads in one section only, the closing ask.
- A single italic serif word per headline is the only ornamental type.
- Mono is for data: dates, sources, tags, measurements. It is never used to make a thing look technical.
- Truth first: a "Last verified" label only renders from a real date, and no component implies a feature that does not exist.

## Colors

A saturated logo blue and red over a blue-leaning navy and a warm paper. Raw values are in `tokens.css`; components read the semantic roles (`--bg`, `--text`, `--text-2`, `--text-3`, `--accent`, `--btn-bg`, `--border`, `--focus`, `--glow`) that each theme sets.

### Primary
- **Logo Blue** (#0040c0): the logo's blue. Primary buttons and links on light, the ring's body, the blue tile.
- **Lift Blue** (#2a5fe0): the same blue lifted for dark surfaces; primary button and notification card on navy (white text 5.5:1).
- **Glow Blue** (#8fb2ff, #c4d6ff): links on navy, the serif accent word, the ring highlight.

### Secondary
- **Logo Red** (#e01020, sampled from the "2" and the pulse of `public/logo-tight.png`): a first-class token next to the logo blue, with the same ramp (50 to 200 tints and backgrounds, 300 and 400 on navy, 500 mid, 600 the logo, 700 to 950 deep). Strokes, dots and tints use `--red-mark` (red-600 on paper, red-500 on navy), `--red-line` and `--red-tint`; the glow is `--red-glow`. White text on Logo Red is 4.9:1.
- Red text is `--accent-red`: **Signal Red** (#b00d1a, 6.9:1) on paper, **Ember Red** (#ff5a66, 6.4:1) on navy, and **Blush** (#ff8f98, about 8:1) for small labels that sit over the red glow of the closing ask.

### Neutral
- **Night** (#050b24) page and hero ground; **Deep Navy** (#08122e), **Card Navy** (#0b1a40) for raised surfaces; **Midnight** (#030617) deepest edge.
- **Paper** (#fbfaf6) the reading ground; **Warm White** (#ffffff) cards and fields; **Sand** (#ebe7db) tiles and hairlines.
- **Ink** (#0b1430 headings, #2b3450 body, #4f5a75 muted): navy-tinted, 17.4, 11.8 and 6.6:1 on paper.
- On navy: text #f5f8ff, secondary #c3cfe8, muted #93a3c7 (18.3, 12.4, 7.7:1).

### Named Rules
**The Marker Red Rule.** Red marks things (a state, a status, a start, a seam) and never carries meaning alone: the words say it too. It is never a button, a link or a paragraph, and blue stays every action. At most one red cluster per screen (a ring arc and its ember, or a run of "Planned" dots), and one section where it leads (the closing ask). If you need an error colour, it is Signal Red text with a "!" glyph and words.
**The Warm Floor Rule.** Light sections are paper, not white and not grey. White is for the objects that sit on paper (cards, fields, the active dock pill).
**The Measured Pair Rule.** A text and background pair is allowed only if it is in the contrast table on `/lab/system/` and passes. Muted text never goes below 4.5:1.

## Typography

**Display and UI Font:** Geist Variable (self-hosted via fontsource, OFL), weights 400 to 700, fallbacks Avenir Next and system sans.
**Accent Font:** Instrument Serif, italic 400 only (OFL), one word per headline.
**Label Font:** Geist Mono Variable, 500, uppercase, +0.08em.

**Character:** a clean, slightly technical grotesque that stays friendly at large sizes, with a single elegant italic voice for the human word ("right counselor") and a mono that earns its place by carrying dates and sources. Three families: about 29 kB, 22 kB and 23 kB of woff2, only the first two preloaded.

### Hierarchy
- **Display** (600, clamp 48 to 96 px, line 0.98, -0.04em): the home headline only.
- **H1** (600, clamp 40 to 80 px, 1.02, -0.035em): page titles. **H2** (600, clamp 30 to 52 px, 1.08, -0.03em): section titles. **H3** (600, 22 to 28 px, 1.2).
- **Lede** (400, 18 to 22 px, 1.5, max 46ch): once under a headline.
- **Reading** (400, 17 to 19 px, 1.7, max 66ch): article body, never wider.
- **Body** (400, 16 px, 1.55). **Small** 14 px for hints and tables.
- **Label** (mono 500, 12 px, +0.08em, uppercase): dates, sources, topics, section captions.
- **Accent** (serif italic, 1.1em of its line): `<span class="accent">`.

### Named Rules
**The One Italic Rule.** One serif-italic word or short phrase per headline, never a sentence, never body text. A pull quote in an article is the only other use.
**The 12-Pixel Floor.** Nothing is set below 12 px, and 12 px is mono labels only.

## Layout

A 1200 px wrap with a fluid gutter (20 to 40 px). Sections are full-bleed bands of one theme; section padding is 64 to 128 px. The reading layout is a 66ch column plus a 240 px sticky table of contents; below 62rem the contents become a boxed list above the article. Hero: copy left, art right, art drops under the copy below 62rem. Rhythm: 4 px base, with more space above a heading than below it.

Seams: a section may overlap the one above with `.seam-top` (rounded top corners, margin-top equal to the radius). Dark over light gets a hairline highlight; light over dark lets the ring's glow bleed upward along the join. Seams are the only large-radius shapes on the page.

Fixed chrome: the glass top pill (z 50) and the bottom dock (z 40). Both have a 90%+ navy backing; the dock slides away over the footer; the footer carries bottom padding for it. `scroll-padding` is 6rem top and 6.5rem bottom, and a small `focusin` handler re-centres any focused control that would sit under either.

## Elevation & Depth

Depth is tonal first, shadow second. On navy, surfaces are lighter navy with a 1 px inner highlight and, for raised or hovered, a blue glow. On paper, surfaces are white with a soft two-layer shadow. Shadows always have an offset and a blur; there are no hard offset shadows and no decorative zero-offset halos except the ring and notification, where the glow is the object.

### Shadow Vocabulary
- **Dark resting** (`0 1px 0 rgb(255 255 255/.07) inset, 0 12px 28px -14px rgb(0 0 0/.7)`): cards on navy.
- **Dark raised** (`... 0 28px 60px -24px rgb(0 0 0/.8), 0 0 48px -16px glow`): hover, notification.
- **Light resting** (`0 1px 2px rgb(11 20 48/.06), 0 8px 18px -10px rgb(11 20 48/.16)`).
- **Light raised** (`0 2px 4px rgb(11 20 48/.05), 0 22px 44px -20px rgb(11 20 48/.32)`).

### Named Rules
**The Glow Is An Object Rule.** Glow belongs to the ring, the notification card and the primary button hover on navy. It is never added to text or to a card at rest.

## Shapes

Pills for actions and chrome (999 px), 20 px for cards, 28 px for flat tiles and panels, 14 px for fields, 6 to 10 px for small controls. The oval (aspect 1.33, the logo's 159.5 by 120) is the signature: the ring, the logo plate. Borders are 1 px and always full; there is no coloured side stripe on cards, callouts or lists.

## Motion

One language. Things arrive with exponential ease-out and settle; small state changes use a quicker standard ease; page and seam moves use an in-out.

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 100 ms | press feedback |
| `--dur-fast` | 180 ms | colour, border, link states |
| `--dur-base` | 320 ms | hover lift, chips, cards |
| `--dur-slow` | 560 ms | nav panel, notification arrival |
| `--dur-scene` | 900 ms | the wall settling in, set pieces |
| `--stagger` | 60 ms | between siblings |
| `--ease-out` | cubic-bezier(.16,1,.3,1) | arrivals (GSAP: expo.out) |
| `--ease-std` | cubic-bezier(.2,.7,.2,1) | hover, press (power3.out) |
| `--ease-in-out` | cubic-bezier(.76,0,.24,1) | page and seam moves (expo.inOut) |

### The scroll family (home)
Path, orbit and arc, all driven by scroll with CSS only (no script, no loop, nothing runs by itself): the **orbit** is the one signature moment on the first screen (the six guide cards make a quarter turn round the ring and fade out); the supporting ones are used once each below it: the red-to-blue **seam line** that draws as the guides section rises, the **three doors** that lie on an arc and settle flat, and the **story cards** dealt in along a shallow arc. Each is a registered or individual property (`--p`, `translate`, `rotate`, `clip-path`) on a `view()` or `scroll()` timeline; written as longhands (`animation-name`, `animation-timeline`, ...) because the production minifier folds `animation` and `animation-timeline` into a shorthand that Chromium 145 drops.

### Named Rules
**The No-Loop Rule.** Nothing animates on its own for longer than about 5 seconds. Ambient movement is driven by scroll (CSS scroll-driven animations) or by the cursor, or it plays once and settles. That is why there is no pause control.
**The Compositor Rule.** Movement is transform and opacity (plus the occasional filter or clip-path that stays smooth). Layout properties (width, height, top, left, margin) are never animated. Colour, border and shadow may ease on a state change, at 180 to 320 ms, never inside a scroll or pointer loop.
**The Static Floor Rule.** `prefers-reduced-motion: reduce` sets every animation and transition to none; the end state is the page. Touch and coarse pointers skip spotlight, tilt and parallax.

## Components

### Top pill nav
- **Shape:** floating pill, 52 px, 12 px from the top, max 1200 px.
- **Style:** 90% Deep Navy over `backdrop-filter: blur(18px) saturate(1.5)`, a 1 px navy line, inner highlight. Logo on a white oval plate (the logo is blue and red on transparent; never recoloured). Links 15 px, 44 px targets; current page is a soft white pill.
- **Mobile:** under 56rem the links fold into a panel behind a 44 px menu button; without JavaScript the links wrap inside a normal-flow pill, so nothing floats over content.

### Bottom pill nav (dock)
- A centred pill with the page's sections; the one in view is a white pill with ink text (an IntersectionObserver; `aria-current="true"`). It scrolls inside itself on narrow screens, fades away over the footer, and is optional per page.

### Buttons
- **Primary:** Logo Blue on light, Lift Blue on navy, white text, 48 px (small is 44). Hover lifts 1 px and, on navy, glows.
- **Glassy:** translucent with a 1 px border and blur on navy, white with a hairline on paper.
- **Text link:** blue, with an arrow that nudges 3 px. 44 px tall.
- **Disabled:** dashed border and muted text, not reduced opacity.

### Cards
- **Spotlight:** a soft radial highlight follows the cursor behind the content (two CSS variables per card).
- **Tilt:** up to 5 degrees toward the cursor, released on leave; guide cards only, never body copy.
- **Flat illustrated tile:** one colour (blue, sky, sand or ink), one 1.5-stroke glyph from the hand-drawn set, a title and a line. No photographs, no school marks.
- **Guide card:** topic as mono label, title, excerpt, optional "Last verified" chip, "Read the guide".

### Chips
- Static (topic, 30 px), mono (data), and interactive (question links, filter toggles with `aria-pressed`; 44 px). Question chips are plain links to guides, never a chat.

### Notification card ("From: D2Excel, Now")
- Lift Blue to deep blue gradient, mono header, one title, one line, one link. Slides in once. Carries one real, dated item (for example the UC window, Oct 1 to Nov 30, 2026) and nothing promotional. On Home "Now" is a small white pill with a red dot (the one red highlight in the card).

### Form fields
- Visible label above, 48 px field, 14 px radius, 1.5 px border (#8b8573 on white is 3.7:1; focus is a 3 px ring), hint text, and an error line with a "!" glyph and words. Required state is stated in text; a success or error status uses `role="status"`.

### Section seams
- `.seam-top` with `theme-dark` or `theme-light`; see Layout.

### Footer
- Navy, seam-topped, three columns (about, explore, legal) and a mono base line. Carries bottom padding equal to the dock.

### Article reading layout (built, 2026-10-10)
- **Light and calm, all the way down.** Paper head with a faint lit oval behind it (breadcrumb, mono kicker from the guide's own category line, H1 at 32 to 56 px without an accent word because the titles are company text, meta row: green dot and "Last verified Sep 2026", reading time, optional "Under review" tag), then the body on the same paper. The dark nav pill floats over it. A dark head with a seam was tried and rejected: the page read as two moods and the title block lost to the glow.
- **Column.** 40rem reading column (38rem under 70rem, 37.5rem under 62rem), which measured 68 to 69 characters a line at 1440, 1024 and 768 (a phone is about 39, set by the screen), plus a 15rem sticky "On this page" list on the right that marks the heading in view. Under 62rem the list becomes a closed `details` above the article. Both lists are plain anchors and work without JavaScript.
- **Prose.** 17 to 19 px at 1.7, ink-2 on paper; the opening paragraph (when the doc has one) is set as a lede; H2 24 to 32 px with a 6rem scroll margin; dot bullets; numbered lists with blue numerals.
- **Quick answer.** Blue-50 panel, blue border, mono label. Shown first when the guide has a "QUICK ANSWER" or "The short answer" quote. No coloured side stripe.
- **Tables.** Framed white table on paper with mono column heads; a table under a "dates" heading gets its first column in blue tabular numerals. Below 40rem each row becomes a small card (first cell is the title, other cells carry their column name). The page never scrolls sideways.
- **Sources.** The guide's own Sources section, boxed on sand, with the "Last verified: ..." sentence under a rule; bare domains the front matter lists (studentaid.gov, FairTest.org) are linked.
- **Under review.** For `status: needs-review` an "Under review" tag in the header and a short note above the text ("This guide is being rechecked. Some dates or figures may be out of date, so confirm them on the official page before you act.").
- **End.** Previous and next guide cards in the hub's order, then a quiet navy strip with the waitlist link. No progress bar. A print stylesheet drops the chrome and spells out source links.
- **Data.** Content collection `guides` (`src/content.config.ts`, zod schema matching Pioneer's front matter). The Markdown body is never edited; `src/plugins/guide-article.mjs` only changes presentation and drops `<!-- ... -->` comments, so internal notes cannot render.

### Guides hub (built, 2026-10-10)
- **Header.** Dark glow field with dot texture. Mono eyebrow "Free to read / N guides" (N is the collection length), display H1 with one serif word, lede, mono "Soonest deadline first". Art: three real guide cards on a shallow arc (the middle one raised, outer two turned 5 degrees) inside the lit oval ring; links in it are `tabindex="-1"` and `aria-hidden` because the same guides are listed below. Two cards on phones. Variants tried: arc (kept), a perspective shelf (read as a copy of the home wall) and a stepped ledger of strips (clear, but lost the oval).
- **Order.** `GUIDE_ORDER` in `src/config.ts`: UC application and the money guide first (they carry key-dates tables), then the rest. Guides not listed sort after, by title.
- **Filter.** A fieldset of radio chips (All plus one per category) that filters with `:has()` and no JavaScript; "Showing N of M guides" comes from CSS counters.
- **Cards.** A white card with a category tile (one colour and glyph per category, from `categoryLook` in config), optional tags ("Key dates inside" when the guide has a dates heading, "Under review"), the title as an H2 with a stretched link, the guide's description in full, a mono "Last verified" and reading time, and a "Jump to the key dates" link where it applies. Two columns from 52rem, one below.

### Inner-page template (built, 2026-10-10, round 1: For students, For counselors)
- **Parts.** `InnerLayout` (SystemLayout plus `inner.css`) and five components in `src/components/system/`: `InnerHero` (dark hero), `InnerSection` (a paper band: `id`, `eyebrow`, `lede`, `title` slot, `tone` paper or tint, `rails`, `split`, `seam`), `FeatureRow`, `LiveBoard` and `InnerAsk`. A page is a hero, one or two bands, a board and the ask; How it works, About and Join reuse them.
- **Hero.** Same family as the hub: mono eyebrow ("For students / Launching in California"), H1 at 36 to 56 px with one serif-italic word, lede, one primary and one glass action, the lit oval ring with the page's own art inside (decorative, `aria-hidden`, links `tabindex="-1"`). The hero is `min(100svh, 62rem)` tall on wide screens so the bottom dock sits over the seam, not over the first heading. Art, per page: students get a three-stop path climbing the ring (two real guide cards, then a dashed "Planned: Find a counselor"); counselors get a vertical bridge (families reading the guides today, the D2Excel logo plate, counselors as a dashed Planned card). Variants tried: students a path (kept) and a tilted now-and-next pair (a smaller copy of the hub's tilted cards, and it repeated Home's dated item); counselors a horizontal bridge (sparse in the ring), a vertical bridge (kept) and two overlapping ovals (three ovals competed and the labels collided). No fake product UI.
- **Feature blocks.** `FeatureRow` has two wrappers. `.bento` (used on For students and For counselors, after Magic UI's Bento Grid): a 12-column grid, tiles of 7 and 5 columns and one full-width tile (`wide`, copy and art side by side); live tiles are white cards, planned tiles are dashed with a transparent ground. `.frows` (kept for How it works and About): two equal columns whose sides alternate by position, with a dashed centre rule and an oval marker per row (solid for live, dashed for planned). Either way the copy is a status eyebrow (tile glyph and a mono "Live today" with a green dot, or "Planned" with a dashed ring), an H3, 17 to 19 px paragraphs and one text link; the art is a small diagram or real guide cards on a soft oval of light. Status follows the truth of the claim, not the page: on For counselors every tile is Planned because nothing counselor-facing is live.
- **Ruled page.** `.rails` draws two dashed column lines at the wrap edges (fading in and out); hidden under 56rem. Lines sit in gutters and gaps, never behind text.
- **Live and planned.** `LiveBoard`: a white "Live today" panel and a dashed "Planned" panel whose items are each marked as not existing yet. Planned wording matches Home.
- **Motion.** One signature moment, two supporting ones. Signature: on later visits (not the first page of a session, which has the logo reveal) the headline's words settle in with GSAP SplitText and the hand-drawn oval around the accent is drawn with DrawSVG, once (`src/scripts/inner.ts`, dynamic import, 3.2 and 1.9 kB gzipped on top of GSAP core). Supporting: a one-pass sweep across `main .btn-primary` on hover and focus (CSS, after Magic UI Shimmer Button) and a magnetic lean of at most 8 px on the hero button (after React Bits Magnet, fine pointers and motion allowed only). Below the hero `.rise` is a blur fade (after Magic UI Blur Fade): opacity, 7 px blur and a 28 px rise as a block enters, on a view timeline with fill `forwards` only, so blocks that have not entered are untouched and a full-page capture, print and no-JS show every word sharp. Reduced motion removes all of it; the oval is then simply drawn.
- **Closing ask.** `InnerAsk`: dark seam on the system's static dot texture (after Magic UI Dot Pattern), mono "Be first to know", H2 with one italic word, lede, one primary button, optional small note, and the ring on the right (hidden under 52rem).
- **Dock.** Two to four sections per page (`#get`, `#join` on students). It appears after the first scroll (never at rest, so it cannot cover the first view on a phone) and slides away over the footer; with scripts off it is a static pill after the footer.

### How it works and About (built, 2026-10-11, round 2)
- **How it works.** Hero art: the four steps as a rising staircase in the ring (live steps solid, planned dashed). Body: a Students | Counselors switch (accessible tabs, arrow keys, Home and End; an enhancement that is off with scripts off or reduced motion, when both lists show one after the other under "For students" and "For counselors") over two groups: Live today (Explore, Join) in a solid white card and Planned (Meet, Work together) in a dashed panel, so status is stated once per group. Beside it a sticky figure: two thin circles and their overlap labelled Students, Counselors and Fit, with steps 1 and 2 on each side and steps 3 and 4 in the overlap; the overlap's dashed outline is drawn once as the figure scrolls in (CSS view timeline on a registered `--draw` property, no script; finished stroke where unsupported). No dock.
- **About.** Hero art: the logo on its white oval plate in the ring. A `split` band for "Why we are building it" (the first paragraph set as a lede), the four principles as bento tiles with no status label (`FeatureRow status="none"`, no art; 5, 7, 7, 5 columns on a 12-column grid), "Where we are now" as one large sentence, then the ask. Every sentence is from `about-copy-draft.md` with a source tag; headings that are labels ("What we hold ourselves to.") are not claims. No team block, no placeholder.
- **Accent oval clearance.** The hero title is line-height 1.16 and the hand-drawn oval is 108% of the accent box, offset up 4%, so it encloses ascenders and descenders and clears the next line.

### Join (built, 2026-10-11, round 3)
- **Layout.** Dark glow field with the dot texture, two columns: left a mono eyebrow, H1 with one serif word, lede, a check list of what happens next (real facts only) and a text link to the privacy placeholder; right a paper card (`.jn-card`, `theme-light`, 28 px radius) with a small dashed inline notice ("Demo: This form does not send anything yet"), the form and, in its place after sending, the success state. One column under 62rem (copy first). Variants tried: dark stage with a paper card (kept: the card is the one focal point and the page matches the other inner pages' hero) and the whole page on paper (rejected: calm, but the card loses its edge and the page reads as a different mood from For students and How it works; `shots/round3/variants/`).
- **Role choice.** A `fieldset` with a legend ("I am a (required)") and three large radio cards (Student, Parent or family, Counselor): a real `input type=radio` inside each label, visually hidden but focusable, arrow keys move the choice, the card draws the 3 px ring (`:has(input:focus-visible)`), a visible circle is the unchecked state and a check the checked one (never colour alone). One column of rows under 27rem of card width (container query). Spotlight is the existing `.card-spot`.
- **Conditional field.** `:has()` shows "Where are you in the process?" (select, optional) for Student and Parent and "Tell us about your practice" (textarea, optional) for Counselor, with a short blur fade. Before a role is chosen neither shows; where `:has()` is missing both show. `?role=student|parent|counselor` pre-selects (script).
- **States.** Validation on blur (email) and on submit, messages in always-present empty `aria-live` paragraphs tied to the controls, a summary line above the button, focus to the first problem. Valid submit: one sweep across the button, then the card shows "Thanks. This is a demo, so nothing was sent." with a link to the guides and "Start over". Without scripts the browser validates natively and a GET back to `/join/#sent` shows the same message through `:target`; the fields carry no `name` (only the role radios), so even that submit carries no personal data.
- **Elements.** Spotlight (`.card-spot`), one-pass sweep (`main .btn-primary`, plus `.is-sending` on submit), a 7 px focus halo on fields, blur fade for the conditional field and the success state. Nothing loops; reduced motion shows the end state at once.

### Tags
- Small mono status labels, 28 px tall, full border: blue (key dates), amber with a "!" glyph (under review). Never red, never the only carrier of meaning (the words say it).

### The set piece (home hero)
- A tilted wall inside a glowing oval ring (CSS 3D): the six real guide cards in 3 columns by 2 rows (title and a mono "Last verified" line each, topic hidden to keep titles at three lines). Cursor shifts the viewpoint with one `perspective-origin` write per frame; the wall settles in once. On phones the six cards are 2 columns by 3 rows in a tall ring that grows with them. Below 70rem the hero is one column with the art under the copy and the notification card in normal flow under the ring.
- **The orbit (scroll, signature).** One registered number `--p` (0 to 1) is driven by `scroll(root)` over the first 45% of a screen (on one-column layouts by the art's own passage, `view()`). Each card leaves its slot, rides the ellipse a quarter turn (90 degrees, clockwise, 10% farther from the centre than the wall sits, shrunk 22% so neighbours do not overlap), and fades out as it goes; at the end of the range all six are `visibility: hidden` (so they cannot be clicked or focused) and the ring is left clear. The ring's red arc turns the same quarter and its ember rides the ring. On wide, tall screens the art is `position: sticky` so the whole turn is seen. At scroll 0, with reduced motion, without scroll timelines, and without scripts, the wall is at rest and every card is readable. Variants tried: a continuous orbit (kept) and cards sliding along the ring one after another (rejected: they clump and overlap), and the turn length went from a full lap to a half and then a quarter turn on Gurashish's feedback. Written as `:nth-of-type` rules because the plane's first child is a decorative `<i>` (`:nth-child` skipped the third column and two cards never moved).
- Variants tried for the wall (earlier spike): halo (kept), portal, 3D ring in the wall plane.

### Headline mark (the big ring)
- A single hand-drawn ellipse behind the headline block (eyebrow, headline, lede): an `svg.oval` (viewBox 1000x500, `preserveAspectRatio="none"`, one path with `pathLength="1"`, `vector-effect: non-scaling-stroke`) at 150% by 160% of the head, tilted -11 degrees like the logo's oval, `z-index: -1` so every word is on top. On one-column layouts it is centred on the text and sized to it (116% of the text width, 230% of the head). The stroke is 1.8px with a soft blue glow, a gradient from the red of the "2" where it starts to the blue of the ring where it meets the ring art, at 42 to 70% opacity, so text over it keeps at least 8:1. It is drawn once (`stroke-dashoffset`) after the words land, then rests. Variants tried: one ellipse (kept), two overlapping tilted ellipses like the logo (busier; the red one cut through the lede) and one ellipse with a gap (read as a swoosh, not a ring); a first version that hugged only the accent word was too small, and one that was only a bit bigger struck through the lede.

### Arrive (settle once, in order)
- `.arrive` with `--i` sets a staggered delay (60 ms steps). Headline words only translate (opacity stays 1, so text is never hidden). Other items fade and rise 18 px. `html.intro:not(.intro-open) .arrive` pauses them while the logo curtain is up. Nothing loops.

### Logo reveal (every fresh arrival at Home)
- Plays on a direct load, a reload, a new tab and a visit from another site; skipped only when the visitor comes from another page of this site (same-origin referrer, including the logo link) and never under reduced motion or without scripts (`SystemLayout` `intro="arrival"` on Home; other pages keep once per session). The white oval plate rises, a blue arc and a red arc leave the top of a larger ring and draw round it in opposite directions, the logo's own ring draws and the D2E wipes in, the two arcs meet at the bottom and flare white, the 2 pulses red, then GSAP Flip carries the logo onto the header plate and the curtain splits. About 2.1 s; click, tap or any key skips it; a CSS failsafe hides it at 6 s.

### Dated panel and "Last verified"
- Anything with a date shows the source and the month it was last checked, in mono (`Last verified Sep 2026`). The month comes from the guide's `lastVerified` front matter field (`YYYY-MM`), formatted by `fmtMonth` in `config.ts`; re-check it every cycle. Panels with several dates are a `dl` of label and value. A caveat line ("Confirm on the official page") sits with any deadline.

### Flat guide tile and role tile (home)
- `article.tile` with a stretched link on the heading (`h3 a::after` covers the tile; focus ring is drawn inside the tile because tiles clip). Lead tiles span half the grid and carry a `dl` of dates; the rest are quarter tiles. Role tiles are one colour each (blue student, sand parent, ink counselor), each with its own glyph, its own destination and one cut corner (6rem radius) so the three read as different doors, not a repeated card. Mono labels read `--tile-2`, set per tile colour, because the page theme's muted colour fails on blue.

### Story stack (sticky step cards)
- `ol.steps` of `li.step`, each `position: sticky` with `top: 5.75rem + n * 0.5rem` so earlier cards show a thin edge. The gap after each card is `100svh - 35rem` (2.5 to 30rem) so only the card for the current beat is on screen. Each card is eased back (scale 0.95, brightness 0.8) by a CSS view timeline on the *next* card (`timeline-scope` on the list) and the last card by the next section. The fifth card ("Where it goes from here is up to you") is paper, pinned for a hold zone (`.steps::after`), and the next section has a negative margin so it rises over it. Pin only when width over 52rem, height over 40rem and motion allowed; otherwise a normal stacked list. Colour per step: blue, sky, sand, ink (dashed panel marked "Planned"). No bar, counter or step numbers.
- Each card is also dealt in along a shallow arc as it arrives (`translate` 4% from alternate sides and `rotate` 2 degrees, flat once it has entered; `overflow-x: clip` on the section so a card held off to the side never makes the page scroll sideways).
- Keyboard: a `focusin` handler scrolls to where a pinned card is the top one when focus lands on a covered card (sticky cards count as in view to the browser).

### Seam line and doors (home, supporting motion)
- **Seam line.** A 3px hairline from the logo's red (left) to its blue (right) along the top edge of the guides section, following its rounded corners (`::before`, border-radius inherited, a border-only mask). Drawn left to right with a clip-path as the seam rises through the screen (`view-timeline` on the section, `entry 0% to 26%`); without scroll timelines it is the finished line.
- **Doors.** The three role tiles (student, parent, counselor) lie on a shallow arc when they enter, the outer two lower and turned 3 degrees, the middle a little higher, and settle flat (individual `translate` and `rotate`, plus the fade they already had). Under 56rem they simply fade in.

### How a guide is checked (anatomy)
- A paper mock of a guide (topic, title, quick answer, key dates, sources, last verified) with mono tags and dashed outlines, next to a list that says what each part is for. Content is the UC guide's real quick answer and the real last-verified month; the sources line describes the pattern, not specific links.

### The one ask
- Dark section where red leads: a red glow rises from the lower left, the accent word is Blush, the eyebrow has the red dot, and the three dashed "Planned" items (find a counselor, student accounts, counselor profiles) have red dashed outlines, a red tint and Blush "Planned" chips, under "None of these exist yet". The primary button stays blue.

### Bottom dock on the home page
- Five items (Guides, Your path, The plan, Facts, Join). The active one is a white pill with a small red dot in its left padding (so the width never changes). When the footer is in view the dock slides away and becomes `inert`, so its links are not focusable while hidden.

## Do's and Don'ts

### Do:
- **Do** put reading and forms on paper and story on navy; change themes at a seam.
- **Do** use the semantic roles in components, so a component works in both themes (nested themes resolve to the nearest `.theme-*`).
- **Do** keep every interactive target at least 44 px, and every focus ring visible (3 px, white on navy, blue on paper).
- **Do** measure contrast against the rendered background (the glow field, the notification gradient) and add the pair to the table.
- **Do** write "California" in copy and keep dated items dated.

### Don't:
- **Don't** use red for a button, a link or a paragraph, or let it carry meaning without words. Blue is every action.
- **Don't** put gradient text, glass-as-decoration, or a coloured side stripe on cards and callouts.
- **Don't** loop anything, autoplay anything, or add a gate screen, a sound, or an AI chat box.
- **Don't** show a school logo or landmark, a price, a statistic, a testimonial, or "vetted", "AI-powered" or "counselor review" wording.
- **Don't** set body text below 16 px (reading 17 px and up) or labels below 12 px.

# D2Excel (D2XL) Static Website: Plan

Prepared by Forge, 2026-10-08. The plan below is otherwise as first written. Update 2026-10-09: a local placeholder demo of the marketing site now exists in `/Users/gurashish/Documents/Code/D2EXCEL/site/` (Astro; local only, not deployed; see its README). Sections 4.6, 5.2 and 5.3 were revised to match what was built.

**Source of truth for the company:** `/Users/gurashish/Documents/Code/D2EXCEL/website-brief.md` (Pioneer). Tags used below: `[BRIEF §n]` = read from the brief (which carries its own source tags); `[OBS]` = I observed it myself on a public page; `[PROPOSAL]` = my recommendation, not a fact; `[ESTIMATE]` = my effort guess.

**How the comparison research was done.** I used WebFetch on public pages. WebFetch returns a model-written summary of each page, not raw HTML, so exact wording and numbers (for example competitor statistics) are as the tool reported them. Where it matters for SEO (schema types, sitemaps, platform) I cross-checked with direct HTTP requests to the same public URLs. No logins, no private pages.

---

## 0. Findings that change the picture

1. **d2excel.com is live today, on GitHub Pages, from a public repo.** [OBS] `https://d2excel.com/` returns 200 with `server: GitHub.com`; its A records are GitHub Pages IPs (185.199.108-111.153); `www.d2excel.com` is a CNAME to `divyansh3030.github.io` and 301s to the apex; DNS is at GoDaddy (`ns23/ns24.domaincontrol.com`); MX is Google (`smtp.google.com`, consistent with Google Workspace). The source is public at `https://github.com/divyansh3030/d2excel` (created 2026-04-04, branch `main`, last push 2026-08-31, two contributors). The brief said no repo or hosting details were found; this resolves most of that (Section 6).
2. **The live site is a different product story from the brief.** [OBS] Home says "An AI Powered Student Success Platform" with services copy (counseling, course selection, admissions planning). The brief flags "AI-powered" as a claim that conflicts with the roadmap [BRIEF §7.2].
3. **Counsely (the brief's "closest match") could not be studied.** [OBS] `https://counsely.com/` redirects to a HugeDomains for-sale page; `counsely.ai` does not resolve. Its real URL is unknown to me.
4. **CollegeVine looks university-facing now.** [OBS] The homepage and `/updates` blog are about "the AI operating system for universities" (enrollment, advancement, finance). I saw no student-facing college-list product in its navigation. The brief lists it among free AI college-list competitors [BRIEF §1.4]; that may be stale or live at a URL I did not fetch.
5. **Urgency.** Today is 2026-10-08. The UC application window in the finished article closes Nov 30, 2026 (53 days) and FAFSA is already open [BRIEF §4.5]. Guides published late miss their season.

---

## 1. What the comparison sites show

### 1.1 Fetch log

| Site | URL fetched | Result |
|---|---|---|
| Kollegio | `https://www.kollegio.ai/` (the `.io` URL 301s here), `/blog`, `/for-educators`, `/financial-aid`, one blog post, robots, sitemap | Fetched |
| Scoir | `https://www.scoir.com/`, `/blog`, one blog post | Fetched |
| Empowerly | `https://www.empowerly.com/`, `/about-us/`, `/college-guidance/`, one article | Fetched |
| IECA (independent educational consultants) | `https://www.iecaonline.com/`, `/student-parent-information/`, `/independent-educational-consultant-search/`, one sample consultant profile, one guide page | Fetched. Note `ieca.org` is an unrelated erosion-control association; the college-consultant body is `iecaonline.com` |
| BigFuture (College Board) | `https://bigfuture.collegeboard.org/`, `/plan-for-college`, one article | Fetched |
| CollegeVine | `https://www.collegevine.com/`, `/updates` | Fetched (university-facing, see above) |
| Naviance | `https://www.naviance.com/` returned empty content | Not fetched. Used the PowerSchool product page instead: `https://www.powerschool.com/classroom/naviance/` |
| Crimson Education | `crimsoneducation.org` (4 URL variants) | **Not fetched.** HTTP 429 every time, including via direct request |
| Counsely | `https://counsely.com/` | **Not fetched.** Domain is parked and for sale (redirect to hugedomains.com) |
| Orbit | none | **Not attempted.** The brief gives no URL and the name is ambiguous; I did not guess a domain |
| d2excel.com (own site) | `https://d2excel.com/` plus CSS, repo file list | Fetched (Section 6) |

### 1.2 What each site does

**Kollegio** (free student tool; closest to a "free student workspace") [OBS]
- Nav: For Students / For Colleges / For Educators / Sign Up / Login. Footer "Info Center": `/financial-aid`, `/blog`. Product lives on a separate subdomain (`app.kollegio.ai`).
- Blog `/blog`: Popular / Categories / Latest views, 5+ listing pages, categories such as Application Deadlines, Essays, SAT/ACT, Extracurriculars. Flat slugs `/blog/{keyword-slug}`. Many posts are school-by-school (for example `/blog/uconn-sat-scores`, `/blog/caltech-admissions-acceptance-rate-gpa-sat`). Sidebar CTA to a quiz ("Find my fit").
- Programmatic data pages: `/financial-aid/{school}` cards (average aid, share receiving aid, tuition, estimated cost after aid). Sitemaps list 3,977 URLs in `college-sitemap.xml` and 270 in `blog-sitemap.xml` (`https://www.kollegio.ai/sitemap.xml` is an index).
- Trust: "~300K+ students and families", four named student testimonials, FAQ (safety, cost), team bios and investor logos on the educators page. The financial-aid cards show no source citation or update date.
- Post markup (direct fetch of `/blog/early-decision-vs-early-action`): canonical, Open Graph and Twitter tags, JSON-LD `BlogPosting` with `Person` author, `datePublished`, `dateModified`, plus `Organization`, `WebSite`; the HTML also contains `FAQPage`. One `<h1>`.
- CTA: one repeated "Sign Me Up!" to the app. "Pay nothing and get the services of a $10,000 college coach" is their headline-style claim.

**Scoir** (school/student platform) [OBS]
- Nav is audience-first: Students & Families / Middle & High Schools / Colleges / Get Started / Login. No dedicated parent page; parents get a "Create a Guardian Account" link only.
- Blog `/blog`: 15 topic filters (Financial Aid, Standardized Tests, Counselors, Parents and Guardians, ...), real topic hub URLs `/blog/topic/{slug}`, author pages `/blog/author/{name}`, read-time and headshot on each card, flat post slugs.
- Trust: logo wall of colleges, usage counters (values did not load for the tool), a Common App integration mention, testimonials, App Store rating link.
- Markup: JSON-LD `BlogPosting`, `Person`, `Organization`; canonical and OG present; site generator tag says HubSpot. A mainstream marketing CMS carries this whole structure.

**Empowerly** (paid counseling company; the price tier D2Excel positions against) [OBS]
- Nav: College Counseling / Programs / Resources / About Us / Events, plus Log In and a single "Book Free Consult" button. Offer is a free 30-minute consult; no prices shown on the homepage.
- Counselors are not individually profiled on the homepage; the About page has a "Meet the team" block of about 30 short bios emphasizing prior admissions-office employers.
- Trust: stats ("98% success rate", "4.9 Trustpilot, 400+ reviews", as the page states them), university and press logos, NACAC and WACAC membership logos, testimonials.
- Content hub `/college-guidance/`: article folders by topic (`/applications/...`, `/grade-levels/high-school/...`, `/majors/...`), search box, at least 128 listing pages, no labelled pillar pages, only lead capture is a newsletter. The homepage blog block rendered "No entries found".
- Markup on an article: `Article`, `BreadcrumbList`, `WebSite` + `SearchAction`, `Organization`, `Person`. Front end is Next.js (`_next/static` in the HTML).

**IECA** (`iecaonline.com`; the only real counselor directory I could study) [OBS]
- Nav: Student & Parent Info / News & Publications / Resources / Education & Events / Advocacy / About IECA. "Find a Consultant" appears twice in the top utility bar.
- Parent hub `/student-parent-information/`: three branches, "What is an Independent Educational Consultant?" (children: how a member can help, what to expect, how to choose one), "Resources for Students & Parents" (free articles), "Types of Advising" (six sub-pages by specialty).
- Search `/independent-educational-consultant-search/`: name/keyword, consulting area, location with radius, in-person/online. Results are paginated (page 1,161 appeared in the pagination).
- Profile page (`/consultant/{name}/`): photo, firm name, "Areas of Consulting Expertise", location, a message form (name, email, optional phone, message), website link, self-reported demographics. No fees, no reviews, no credentials shown on the one profile I read.
- Trust and disclaimers: "more than 2,800" members "since 1976"; only Professional-level members are listed; Principles of Good Practice page; the FAQ says IECA "cannot recommend a specific" consultant and that email is not secure.
- Markup: canonical and OG present, no JSON-LD on the guide page I checked.

**BigFuture** (free, official) [OBS]
- Nav organized by the student's task: Vision Builder / Explore Careers / Plan for College / Pay for College / Resources & Programs / My BigFuture.
- Hub pages are H2 sections of cards that each lead to one article; a six-step numbered journey; per-grade checklists `/checklist/9th-grade` to `/12th-grade`; a Spanish-language resource page (`/communities-events/recursos-en-espanol`); a "for parents" page.
- Article URLs nest by topic: `/plan-for-college/apply-to-college/facts-about-early-decision-and-early-action`.
- Markup: `Article`, `EducationalOrganization`, hreflang alternates (7), canonical.

**PowerSchool / Naviance product page** [OBS]: audience blocks (families get sent to their school for login), usage statistics, customer stories, a Security and Trust Center and a Responsible AI Statement in the footer. Relevant only as a model for how to document safety posture for a minor-facing, AI-touching product.

**CollegeVine** [OBS]: B2B nav (Platform / Solutions by campus department / Try an agent / Resources), trust center link, SOC 2 Type II and FERPA mentions, blog at `/updates/{slug}` with category tabs. Interactive "try an agent" tools used as lead generation.

### 1.3 Patterns worth adopting [PROPOSAL, based on the above]

1. **Audience router in the nav.** Kollegio and Scoir split by audience; BigFuture splits by task. D2Excel's own nav (Home / Find a Counselor / Student Hub / For Parents / For Counselors / About / Help) [BRIEF §3.1] already matches. Keep it, and add a visible parent entry (Scoir's omission is a gap D2Excel should not copy).
2. **One primary conversion goal per page.** Empowerly uses one "Book Free Consult"; Kollegio uses one "Sign Up". D2Excel's equivalent in Phase 0 is "Join the waitlist" (one form, role dropdown).
3. **Task-based hub with a checklist spine.** BigFuture's cards-to-articles hub and per-grade checklists. D2Excel's Student Hub should group guides by task (Apply, Test, Pay, Choose a major, Use AI, Get help), not by publication date.
4. **Topic and author pages for SEO structure.** Scoir's `/blog/topic/{slug}` and `/blog/author/{name}`. Use them once there are enough guides per topic (see 3.4); with six guides, topic pages would be thin.
5. **Visible dates, authorship and structured data.** Kollegio, Scoir and Empowerly all emit Article/BlogPosting with author and dates. D2Excel's articles already carry "Last verified" and "Sources & where to verify" [BRIEF §4.5], which is stronger than anything seen on Kollegio's data pages (no sources or dates shown).
6. **"How to choose a counselor" content next to the directory.** IECA puts "how to choose", "what to expect" and warning signs inside the parent hub. D2Excel already has the counselor article; it belongs under For Parents.
7. **Directory disclaimers.** IECA states it cannot recommend a specific consultant; ARCH asks for a similar "open marketplace, not responsible" disclosure [BRIEF §3.2]. Put it at the bottom of Find a Counselor and in the parent trust page.
8. **Product on a subdomain.** All three student platforms (`app.kollegio.ai`, `app.scoir.com`, `app.empowerly.com`) keep the marketing site on the apex and the logged-in product on `app.`. [PROPOSAL] Reserve `app.d2excel.com` for Phase 1 so the marketing site never has to move.
9. **Newsletter as the low-friction lead magnet.** Empowerly's only capture is a newsletter; the brief's "Junior year in 8 weeks" idea [BRIEF §4.4] fits here later.
10. **A translated entry page.** BigFuture's Spanish page is a model for the Chinese and Hindi pages the audience doc recommends [BRIEF §2.2]; not for Phase 0.
11. **Trust and security documentation for minors.** A short "Safety and privacy" section on For Parents that says plainly what is live and what is planned (see claims policy, 2.4).

### 1.4 Patterns to avoid

1. **Statistics, testimonials, logo walls and "success rate" claims.** Empowerly, Kollegio and Scoir all lean on them. D2Excel has none and the company's own claims policy forbids invented ones [BRIEF §5.3, §7.3]. Also never promise admission outcomes (the counselor article lists that as a red flag).
2. **Programmatic data pages with no sources or dates** (Kollegio's financial-aid cards). If D2Excel ships a college databank, cite IPEDS/College Scorecard and show the data year.
3. **Hiding counselors until after a consult** (Empowerly). Fine for an agency, wrong for a marketplace; but in Phase 0 there are no counselors to show, so do not fake a directory.
4. **Blog modules that render empty or JS-dependent content** (Empowerly's "No entries found" block). Render navigation, footer and article text at build time.
5. **Inconsistent URL taxonomies** (Empowerly mixes `/blog/`, `/applications/`, `/majors/`). Pick one flat scheme now (3.2).
6. **No parent page** (Scoir).
7. **Boilerplate trust claims without evidence** ("trusted by 1000s of educators" on Kollegio, unverifiable). D2Excel should say "early-stage" honestly; the brief's tone guidance supports this.
8. **Big hero images.** (D2Excel's own repo: `student-counselor-handshake.png` is 2.2 MB, `hero.png` 0.8 MB, logo PNG 0.36 MB. [OBS from repo file list].)

### 1.5 Scale reality check

Competitors publish at volume (Kollegio: 270 blog URLs and about 4,000 college URLs; Empowerly: 128+ article listing pages; IECA: well over a thousand directory result pages). The strategy doc already says D2Excel cannot out-publish them and should win on locality, curation and trustworthy sourcing [BRIEF §1.4, §4.1]. Six guides is a starting set, not a content moat. The plan below assumes a steady cadence after launch (Phase E) rather than a big-bang library.

---

## 2. Sitemap and page inventory for a static Phase 0

### 2.1 Assumption

[BRIEF §7.1 Q1] asks what "v1.0" means and nobody has answered. **Default I will plan against unless told otherwise:** v1.0 = the ARCH page list delivered as a static marketing site, with every back-end row handled as a placeholder, a third-party tool, or deferred (2.3), plus the six finished guides (which ARCH excluded but the growth strategy requires).

### 2.2 Page inventory

URLs are lowercase, hyphenated, trailing slash, no file extensions.

| URL | Page | Source row in ARCH | Truly static? | Phase 0 treatment | Indexed? |
|---|---|---|---|---|---|
| `/` | Home: banner, tagline, role router (Student / Parent / Counselor / School), mission and values, waitlist CTA, featured guides | HOME | Yes | Build. "Positioning claim" numbers stay out (ARCH says on hold). Sign-in button removed (see 2.3) | Yes |
| `/student-hub/` | Student Hub: guide index grouped by task, official resource links (Common App, UC App, College Board, Naviance, NACAC per PRD), "coming soon" tiles for deadline planner, college databank, achievements | STUDENT HUB > Resources | Yes | Build. This is where ARCH says the guides would live ("Needs work and categorization") | Yes |
| `/guides/{slug}/` x6 | The six finished articles | Not in v1.0 per ARCH | Yes | Build (Section 3) | Yes |
| `/guides/` | Redirects to `/student-hub/` | - | Yes | Redirect | n/a |
| `/find-a-counselor/` | Honest "coming soon" page: how matching will work (manual first per roadmap), marketplace disclosure text, waitlist for families, link to For Counselors | FIND A COUNSELLOR | Page yes; search and listings no | Placeholder only. No fake listings, no empty filters | No (`noindex,follow`) until Phase 2 |
| `/for-parents/` | Trust content, how counselors are paid and the "portal, not the seller" disclosure, refund and re-match policy, parent FAQ subset, link to the counselor guide | FOR PARENTS | Yes | Build. Policy and payment text need owner decisions (Section 8) | Yes |
| `/for-counselors/` | Value proposition, eligibility (documented: background check, liability insurance, one lower-cost starter package), disclosures, "Express interest" form | FOR COUNSELORS | Page yes; form via third party | Build. Fee percentage and payout timing are not documented anywhere, so omit them (say "shared during onboarding") rather than invent | Yes |
| `/for-schools/` | One page for school and tutoring-center outreach plus a contact form | not in ARCH | Yes | Recommended addition: outreach emails [BRIEF §2.4] currently have no destination. Needs a yes from Gurashish | Yes |
| `/about/` | Company story, mission (shared include with Home), team (only if decided), editorial policy anchor | ABOUT | Yes | Build | Yes |
| `/help/` | FAQ (audience-tagged, one source of truth reused on For Parents), contact/support form | HELP | Page yes; form via third party | Build. The "support ticket platform" becomes a form that emails a shared inbox | Yes |
| `/join/` | Standalone waitlist page for social bios, outreach emails and messaging-group links | "Prompt sign up" (all pages) | Page yes; form via third party | Build. Gives every campaign one trackable destination | Yes |
| `/careers/` | Existing page and email flow from the live site | not in ARCH | Yes | Carry over unless told otherwise | Yes |
| `/privacy/`, `/terms/` | Legal | HELP > Privacy and policies | Yes | Page shells now; text needs a legal owner; must exist before any form goes live | Yes |
| `/404.html`, `/robots.txt`, `/sitemap.xml` | Plumbing | - | Yes | Build | n/a |

Footer on every page: the ARCH footer ("what we already have on static, containing all links and support") rebuilt as one shared template, not fetched by JavaScript.

### 2.3 What needs a back end, and the Phase 0 handling

| ARCH item | Why not static | Phase 0 handling | Later |
|---|---|---|---|
| Find a Counselor search and filters | Needs listings and a database; no counselors exist until Phase 2 [BRIEF §3.2, §1.2] | Placeholder page (2.2), waitlist | Phase 2; if the roster stays small (10-20 hand-recruited), a build-time generated directory from a data file is possible and still static |
| Sign in form button | Accounts are Phase 1 [BRIEF §1.2] | Remove from nav. Replace with "Join the waitlist" | `app.d2excel.com` in Phase 1 |
| Prompt sign up (all pages) | Needs a destination | Waitlist form (`/join/` and an inline form) | Becomes sign-up in Phase 1 |
| Counselor application | Needs form handling; instant listing contradicts hand-recruited, vetted Phase 2 [BRIEF §2.3] | "Express interest" form feeding an inbox or sheet, vetting done offline | Application plus vetting workflow in Phase 2 |
| Support ticket platform | Needs ticket storage and replies | Contact form routed to a shared Google Workspace address or group inbox (the domain already has Google mail) | A ticket tool once volume warrants |
| Achievements Hub | Grades, SAT/PSAT, artifact store: needs accounts [BRIEF §3.2] | "Coming soon" tile on the Student Hub with waitlist | Phase 1 |
| Social Hub | Chat; also in tension with the PRD's private-by-default, no-open-chat posture [BRIEF §3.3] | Omit from Phase 0 entirely. A tile advertising an open chat for teens would contradict the trust positioning | Decide after Phase 1 |
| Chat bot button / Support chatbot | AI agents are Phase 3; a bot on a minor-facing site is a moderation and claims risk | Omit | Phase 3 |
| College databank (PRD P0) | Static-capable (public IPEDS / College Scorecard data baked in at build) but large to QA and its relation to "College guides" is unclear [BRIEF §3.3] | Not in the launch build; scope as Phase E pilot (California institutions only) | Phase E, then Phase 1 college search |
| Reviews | None exist [BRIEF §2.2] | Do not show a reviews area | Phase 2 |

**Waitlist and forms.** One form: email (required), "I am a" dropdown (Student / Parent / Counselor / School), optional ZIP code. Posts to a hosted form endpoint (Mailchimp or HubSpot embed/POST per the strategy doc [BRIEF §4.2]) so signups land in the mailing tool without custom code. Add a line asking users to be 13 or older, or a parent or guardian (the PRD blocks under-13 accounts [BRIEF §1.2]); legal should confirm the wording. Contact, counselor-interest and school forms use one form-to-email service (Section 4.4). Every form needs a privacy link and a plain-language consent line.

### 2.4 Claims policy for copy [BRIEF §5.3, §7.2, §7.3]

Until Gurashish decides, the site must not say: "AI-powered matching", "vetted counselors", "counselor review", "trusted by N", any caseload statistic (376 vs 195-224 conflict), any outcome or success claim, or anything implying live safety features (background checks, insurance, parent chat access are Phase 2). The accurate wording is "we are building" / "planned". The live site's account preview text says users can "sign in securely with your password and two-factor authentication" while the code sends and saves nothing [OBS, `js/portal.js`]; that copy goes.

---

## 3. Content model for guides and articles

### 3.1 Front matter (one Markdown file per guide)

| Field | Purpose |
|---|---|
| `title`, `description` | H1 and `<title>`; meta description (about 150 characters) |
| `slug` | Evergreen URL (no year), so updates keep the page's accumulated links |
| `eyebrow` | The header label already used in the articles (for example "CALIFORNIA ADMISSIONS - APPLYING FALL 2026 FOR FALL 2027") |
| `subtitle` | One-line subtitle |
| `audience` | `student`, `parent`, `both` |
| `topic` | One of: `applications`, `testing`, `paying`, `majors-careers`, `ai-essays`, `choosing-a-counselor` (drives hub grouping now, topic pages later) |
| `quickAnswer` | Content of the boxed "QUICK ANSWER" |
| `datePublished`, `lastVerified` | `lastVerified` renders on the page and becomes schema `dateModified` and sitemap `lastmod` (only changed when someone actually re-verified) |
| `cycle`, `reviewBy` | Admissions cycle label and the date the guide must be re-checked; a build step lists guides past `reviewBy` |
| `timeSensitive` | True for deadline/aid/rules guides; adds the standard caveat text |
| `sources[]` | Title, publisher, URL, accessed date; renders "Sources & where to verify" |
| `faq[]` | Optional question and answer pairs |
| `related[]` | 2-4 hand-picked slugs |
| `stakeNote` | Boolean; renders D2Excel's candid "A note on our stake" block |
| `author` | "D2Excel editorial team" (an Organization, not an invented person) |
| `status` | `draft` or `published` |

**Validation at build time** (Astro content collections can enforce this; see Section 4): the build fails if `lastVerified`, `description`, `quickAnswer` or at least one `sources[]` entry is missing, or if the body contains the literal markers `[Leadership to confirm` or `[Eng:`. Those two markers are currently in the counselor article [BRIEF §4.5], so this catches an unfinished article before it ships.

**Reusable components** (from the structure the six articles already share [BRIEF §4.5]): QuickAnswer box, KeyDatesTable, ComparisonTable (responsive), SourcesList, LastVerified (with the standard caveat sentence), StakeNote, FAQ, RelatedGuides, WaitlistCTA, Breadcrumbs.

### 3.2 URL structure

- `/guides/{slug}/` for guides (evergreen, no dates or file extensions).
- `/student-hub/` is the guide index; `/guides/` redirects to it.
- Role pages at the top level: `/for-parents/`, `/for-counselors/`, `/for-schools/`.
- Later, not now: `/colleges/{slug}/` (databank pilot), `/guides/topic/{topic}/` (once a topic has 4+ guides), `/zh/` and `/hi/` translated entry pages, and `app.d2excel.com` for the product.
- Local pages: do not create per-county or per-city landing pages until there is real local content for each; thin location pages are an SEO risk.
- Canonical host: apex `https://d2excel.com/` (the current `www` to apex 301 already does this; keep it).
- Old URLs to redirect on cutover: `about.html` to `/about/`, `contact.html` to `/help/`, `services.html` to `/` (or `/for-parents/`, to decide), `careers.html` to `/careers/`, and the prototype stubs (`student-login.html`, `portal.html`, and so on) to `/join/`.

### 3.3 How the six finished articles slot in

All six are in the Drive folder `Marketing/SEO Website Content` [BRIEF §4.5]. Forge cannot read the Drive, so each needs to be exported to the repo (Pioneer or Gurashish) before conversion.

| Article | Proposed slug | Topic / audience | Time-sensitive facts to re-verify | Blockers and notes |
|---|---|---|---|---|
| University of California application | `uc-application` | applications / student | UC window Oct 1 to Nov 30, 2026; 4 of 8 personal insight questions | No open markers. **Highest urgency: closes in 53 days.** Publish first |
| SAT or ACT | `sat-or-act` | testing / student | School-by-school score policies; UC and CSU do not use scores | No open markers |
| Where College Money Comes From | `paying-for-college` | paying / both | FAFSA opened by Oct 1, 2026; Cal Grant deadline Mar 2, 2027 | No open markers. Second-highest urgency |
| What A Major Is Worth 2026 | `what-a-major-is-worth` | majors-careers / student | "2026 data" (annual refresh) | Table-heavy; check responsive tables |
| AI and Your Application 2026-27 | `ai-and-your-application` | ai-essays / student | School-by-school AI rules (fast-changing); green/yellow/red zones | Needs a "zones" component or styled table |
| How to Choose a College Counselor | `how-to-choose-a-college-counselor` | choosing-a-counselor / parent | UC test-score reconsideration noted for a June 2027 recommendation | **Two open markers:** "[Leadership to confirm: one line on how D2Excel is paid.]" and "[Eng: replace with the collegeplannerpro.com original URL before publishing]". The second implies the text may already exist at `collegeplannerpro.com`; if so, publishing it unchanged here creates duplicate content, and a `rel=canonical` or a rewrite must be decided. This is the page the For Parents trust section should lead with |

Remove the articles' "d2excel.com · Page" footers; the site template supplies a footer.

### 3.4 Internal linking plan

- **Hub to guides:** Student Hub lists every guide, grouped by topic, with its `lastVerified` date.
- **Guide to guide (curated, in `related[]` and inline):**
  - `uc-application` links `sat-or-act` (UC does not use scores), `ai-and-your-application` (personal insight questions), `paying-for-college` (Cal Grant, FAFSA)
  - `sat-or-act` links `uc-application`
  - `paying-for-college` links `what-a-major-is-worth` and `how-to-choose-a-college-counselor`
  - `what-a-major-is-worth` links `paying-for-college`
  - `ai-and-your-application` links `uc-application`
  - `how-to-choose-a-college-counselor` links `paying-for-college` and, from its "do you need one" section, `/for-parents/` and `/find-a-counselor/`
- **Every guide ends** with a role-aware waitlist CTA, not a mid-article interruption.
- **Role pages link into guides:** `/for-parents/` to the counselor guide and the paying guide; `/for-counselors/` to the counselor guide ("what families are told to check").
- **Breadcrumbs** on guides: Home > Student Hub > guide title.
- **Anchor text** is descriptive, never "click here".
- **Orphan check at build:** a link checker run in CI so no published page lacks an inbound internal link and no internal link 404s.
- **Official sources** are outbound links in `sources[]`; BigFuture owns the official-data lane, so link to it [BRIEF §4.1].

### 3.5 Technical SEO and schema plan

**On every page:** unique `<title>` (about 60 characters) and meta description; one `<h1>`; self-referencing absolute canonical; `lang="en"`; Open Graph and Twitter card tags (WhatsApp and most messengers read Open Graph; I have not verified how WeChat link cards behave, and the audience uses WeChat [BRIEF §2.2], so test a real share); build-time navigation and footer (not JS-fetched); `width` and `height` on every image; descriptive alt text.

**Site files:** `sitemap.xml` generated at build with `lastmod` taken from `lastVerified`; `robots.txt` allowing all and pointing to the sitemap; a real `404`; HTTPS; a favicon set (the live site has none [OBS: `/favicon.ico` 404, no icon link in the home HTML]); staging and preview URLs served with `noindex`.

**Search tooling:** Google Search Console as a domain property (verify with a DNS TXT record at GoDaddy) and Bing Webmaster Tools, set up before launch so day-one data counts. GA4 per the PRD [BRIEF §4.2], subject to the consent decision in Section 4.5. Neither the existing site nor its repo has a sitemap, robots file, canonical, Open Graph or JSON-LD [OBS].

**Structured data (JSON-LD generated by the layout from front matter, never hand-written per page):**

| Type | Where | Notes |
|---|---|---|
| Organization (name, url, logo, `sameAs`) | Sitewide | Add `sameAs` only for social handles Gurashish confirms [BRIEF §4.6]. Postal address only if he confirms what to publish |
| WebSite | Home | No `SearchAction` until the site has search |
| Article (`headline`, `description`, `image`, `author` as the D2Excel editorial team Organization, `publisher`, `datePublished`, `dateModified` = `lastVerified`) | Guides | Same fields the competitors emit, with a more honest modified date |
| BreadcrumbList | Guides and hub | |
| FAQPage | FAQ page and the counselor guide | Low priority. My understanding is Google restricted FAQ rich results in 2023, so expect little visible benefit; harmless to include |
| CollegeOrUniversity | Databank, if built | Phase E |
| Person / ProfessionalService | Counselor profiles | Phase 2 |
| **Never:** Review, AggregateRating, or invented Person authors | - | No reviews exist; fabricated markup risks a penalty and breaks the company's own honesty stance |

Validate each template once with Google's Rich Results Test and the Schema.org validator before launch.

**Keywords.** There is no current keyword research [BRIEF §4.3]; the seeds there are inference from article titles. Do not build topic pages from them. Use Search Console impressions after launch as the first real data, and decide whether to revive or redo the obsolete keyword and competitor work (Section 8). Hypothesis worth testing: Kollegio's listing is dominated by national school-by-school pages; California-specific UC/CSU depth (cited, dated) is where D2Excel can be better rather than larger.

**Freshness and trust (YMYL-adjacent):** visible `lastVerified`, sources, an editorial policy section on About (how facts are checked, how to report an error), and the stake disclosure on the counselor guide. These are D2Excel's differentiator against the data pages that show no sources.

---

## 4. Recommended stack

### 4.1 Options compared

| | A. Static site generator (Markdown + templates) | B. Hand-written HTML (extend today's site) | C. No-code builder (Webflow / Wix), per strategy doc and PRD |
|---|---|---|---|
| Fits "static website" request | Yes (output is plain HTML/CSS) | Yes | Hosted site, not a static-file deliverable (export loses CMS and forms) |
| Adding or updating a guide | Edit one Markdown file; template adds nav, schema, breadcrumbs, sitemap entry, related links | Copy an HTML file, hand-edit header/footer, hub list, sitemap, JSON-LD; easy to drift | Fill CMS fields in a visual editor (best for non-engineers) |
| Shared header/footer | Build-time includes; present in raw HTML | Today it is a JavaScript `fetch` of `components/*.html` [OBS: `js/main.js`], so crawlers get no nav unless they run JS, and it breaks when a page is opened from disk | Built in |
| Enforcing "sources + last verified + no leftover placeholders" | Yes, via front-matter validation and a build check | Manual | Manual (required fields help) |
| Technical SEO control (canonical, schema, clean HTML, speed) | Full | Full but hand-maintained | Partial. Custom code embeds are possible; speed and markup depend on the vendor |
| Non-engineer publishing | Needs a small workflow (GitHub web editor, or a Git-based CMS added later) | Needs Git and HTML knowledge | Native |
| Ongoing cost | Hosting and form tool free-tier or low (check current limits) | Same | Recurring subscription, plus plan limits on CMS items and forms (check current pricing) |
| Lock-in and ownership | Code in your own repo; portable | Same | Content and design live in the vendor |
| Setup effort | Highest up front | Lowest | Low to medium |

### 4.2 Recommendation [PROPOSAL]

**Option A: a static site generator, Astro by default (Eleventy is an acceptable simpler fallback), with guides as Markdown files, hosted on Netlify, source in a D2Excel-owned GitHub organization.**

Why:
- The core asset is a growing set of structured, sourced, dated guides. A content model with validation (3.1) is exactly what a generator gives and what hand-written HTML cannot enforce.
- It keeps the output genuinely static, which is what Gurashish asked for, and avoids vendor lock-in and subscription creep.
- It fixes the live site's concrete SEO weakness (JS-loaded nav and footer) without adding runtime JavaScript.
- Astro's content collections validate front matter at build time, and it ships no JavaScript by default. I have not verified current Astro or Netlify versions or pricing; confirm before scaffolding.

Trade-offs, stated plainly:
- A non-technical person cannot publish with zero tooling. The baseline workflow is: edit a Markdown file in the GitHub web editor, commit, and a preview deploys automatically, then merge to publish. If that is too much for whoever maintains the site, add a Git-based editing UI (Decap CMS, Pages CMS and similar exist; I have not verified their current state) as an optional step in Phase E.
- This contradicts the strategy doc and PRD, which say Marketing publishes on a no-code builder with no engineering deploy [BRIEF §1.2, §6.4]. That is the real decision (Section 6).
- **When I would choose Webflow or Wix instead:** a marketing hire with no Git comfort starts soon, no engineer will be available for upkeep, and Gurashish accepts a monthly fee and lock-in. Webflow is the better of the two for SEO control; Wix is weaker on technical SEO and speed in general (my background knowledge, not tested here).
- **Why not hand-written HTML:** fine for five pages, error-prone for guides, and it is what exists today.

### 4.3 Hosting [PROPOSAL]

- **Netlify** (default): removes the need for a separate form vendor for contact forms, real 301 redirects for the old `.html` URLs, per-branch preview URLs a non-technical reviewer can open, free tier likely sufficient (verify limits). Cloudflare Pages is an equivalent alternative.
- **Stay on GitHub Pages** is a legitimate lazy option: it is already live, DNS needs no change, and it is free. Costs: no built-in forms (needs a separate form service), no true 301 redirects (meta-refresh only), no easy previews.
- DNS stays at GoDaddy; cutover is an A/CNAME change only. Keep Google Workspace MX untouched.

### 4.4 Forms

- Waitlist and newsletter: Mailchimp or HubSpot (the two the strategy doc names [BRIEF §4.2]). If neither account exists, start with the lighter one. One list with a `role` field.
- Contact, counselor-interest and school forms: Netlify Forms (if on Netlify) or an equivalent form-to-email service, delivering to a shared Google Workspace inbox, plus honeypot spam protection.
- No custom server code in Phase 0.

### 4.5 Analytics and consent

- GA4 from day one per the PRD, plus Search Console. The site is minor-facing and California restricts selling or sharing data of users under 16 without opt-in [BRIEF §7.1 Q19, from AUD]; this needs legal input. Default [PROPOSAL]: load GA4 only after consent (consent mode defaulting to denied) and use no advertising tags. If legal prefers, a cookieless analytics tool can run in the interim; I have not evaluated specific vendors.
- Self-host fonts and images to avoid third-party requests (the live site loads Google Fonts [OBS]).
- Events to track: waitlist submit (by role), guide scroll depth, outbound clicks to official sources, CTA clicks.

### 4.6 Performance and accessibility targets

| Target | Value | Basis |
|---|---|---|
| Largest Contentful Paint | 2.5 s or better on mobile 4G, aim for under 2 s | PRD says pages under 2 s [BRIEF §4.2, stated for Phase 1+]; apply now |
| Interaction to Next Paint / layout shift | 200 ms or better / 0.1 or lower | Standard Core Web Vitals "good" thresholds |
| Lighthouse (mobile) | Performance 95+, Accessibility 95+, SEO 100, Best Practices 95+ | [PROPOSAL] |
| JavaScript | None required to read or use any page. JavaScript is progressive enhancement only: mobile menu, the placeholder-form message, and the animation layer (see 5.3 item 6) | |
| Animation JavaScript (gzipped, as built in the demo) | About 8 kB on pages without a set piece (Lenis plus glue). About 52 kB on Home and How it works (adds GSAP and ScrollTrigger). All deferred, none in the critical path | Scout suggested about 50 kB site-wide; Home and How it works are slightly over [BUILD MEASUREMENT, from the Astro build output] |
| Motion rules | Animate transform and opacity only. Every animation has a static fallback under `prefers-reduced-motion`. Ambient loops carry a visible "Pause motion" button (WCAG 2.2.2, Level A) | |
| Images | AVIF or WebP, responsive sizes, nothing above 150 KB above the fold [PROPOSAL] | Today's hero image is 2.2 MB |
| Accessibility | WCAG 2.1 AA | PRD requires it from Phase 1 [BRIEF §4.2]; applying now is my suggestion |
| Specifics | Visible focus states, semantic landmarks, skip link, tap targets at least 44 px, tables with captions and horizontal scroll on small screens, `prefers-reduced-motion` respected, no information conveyed by color alone | |
| Check | Automated (axe or Lighthouse CI) plus manual keyboard and screen-reader pass on one guide and one form | |

---

## 5. Design direction (PROPOSAL, there are no brand guidelines)

I inspected the logo `/Users/gurashish/Documents/Desire2Excel/logo/Final_2-nobg.png`: heavy rounded geometric "D2E" letters, D and E in blue, the 2 in red, inside a thin blue ellipse, on a transparent 500 x 500 canvas with generous padding. The brief's sampled colors are about blue `#0040C0` and red `#E01020` [BRIEF §5.1]. Nothing else in the brand (social graphics use three different palettes) is consistent enough to carry a site. Everything below is a proposal for Gurashish to accept or change.

### 5.1 Palette (contrast ratios computed by me against WCAG)

| Role | Hex | Contrast | Use |
|---|---|---|---|
| D2E Blue (primary) | `#0040C0` | 8.4:1 on white | Links, primary buttons, headings accents |
| Ink (headings, body) | `#0B1F44` headings, `#1F2937` body | 16.2:1 and 14.7:1 on white | Text |
| Muted text | `#5B6477` | 5.9:1 on white | Captions, metadata |
| Surface | `#F5F7FB` | body text 13.7:1 on it | Section backgrounds |
| Quick Answer fill | `#EAF0FF` | blue text 7.4:1 on it | The boxed summary |
| Line | `#D8E3EE` | decorative | Borders (taken from the live site's CSS) |
| D2E Red (accent) | `#E01020` | 4.9:1 on white, but only 4.3:1 on `#EAF0FF` | Sparingly: the "2" motif, one highlight per page, "deadline" tags on white |
| Red for text | `#B00D1A` | 7.2:1 on white | Use this, not `#E01020`, for any red text |

Rules: red is an accent, not the action color (red reads as error and warning). No new hues until there is a reason; status should use icon plus text, not color alone. The social graphics' sage, coral and periwinkle are not adopted.

Note: the live site's primary blue `#0c74e8` is 4.49:1 on white, which just misses AA for body-size text [OBS, computed]. That is another reason to move to the logo's blue.

### 5.2 Type

- **Demo build note (2026-10-09):** the placeholder demo uses **Bricolage Grotesque** (headings, 700-800) and **Instrument Sans** (body), both self-hosted variable fonts, to avoid the generic Montserrat and Open Sans pairing. It also adds a deep cobalt gradient family around the logo blue for the hero. These are demo choices for Gurashish to accept or reverse; the proposal below still stands as the alternative.
- Keep **Montserrat** (headings, 600-700) and **Open Sans** (body) from the live site's CSS: continuity, and Montserrat's geometric forms sit well beside the logo and the light geometric headline in social post 3. Self-host variable WOFF2 files, Latin subset only, `font-display: swap`, with a system-font fallback.
- Scale: body 18 px on mobile and desktop for long-form guides, line length 65-75 characters, H1 clamped 30-44 px, generous line height (1.6).
- Alternative if speed matters more than continuity: a system-font stack only. I do not recommend dropping Montserrat unless the font cost shows up in the performance budget.

### 5.3 Layout principles

1. Mobile first (the audience is on phones and in group chats) [BRIEF §2.1, §2.2]. Single column; wide layouts add a sidebar, not extra columns of content.
2. One primary action per page: "Join the waitlist". Secondary links stay text links.
3. Guide pages: eyebrow, H1, subtitle, "Last verified" directly under the title, Quick Answer box, table of contents (sticky on desktop, collapsed on mobile), body, "Sources & where to verify", related guides, one CTA.
4. Role router on Home: four equal cards (Student, Parent, Counselor, School).
5. "Coming soon" things are labelled as such and never styled like live features.
6. **Motion: smooth and high-tech, layered over fully readable HTML** (replaces the earlier "restrained motion; no autoplay; no carousels"; Gurashish asked for impressive animation, and Scout's research set the stack). Still no carousels, no video, no Three.js, and no animation that implies a feature that does not exist (no matcher visuals, no live counters, no invented numbers). What the demo build does:
   - **CSS only, no JavaScript:** scroll-driven reveals (`animation-timeline: view()`, gated on `@supports` for `animation-timeline` and `animation-range`, so unsupported browsers such as Firefox simply show the content), the scroll-linked topic strip and step line on Home, and native cross-document View Transitions for page changes (`@view-transition`, with the header held still; Chrome, Edge and Safari 18.2+, other browsers navigate normally).
   - **GSAP with ScrollTrigger, two set pieces:** the Home hero intro timeline (headline words rise out of a mask, orbit rings scale in) followed by a scrubbed kinetic drift as the hero scrolls away; and a pinned four-step sequence on How it works (two circles, students and counselors, converge as the steps advance). The pin applies only at 900 px wide and 700 px tall or more; smaller screens get the stacked static version.
   - **Lenis smooth scrolling,** about 5 kB, native scroll position kept, paused while the mobile menu is open, not started at all under reduced motion.
   - **Hero visual:** an animated grid field, drifting glows and slow orbit rings with two dots (one blue, one red). It is abstract on purpose.
   - **Rules applied:** transform and opacity only; the hero's hidden start state exists only when JavaScript will animate it and is dropped automatically after 3 seconds if the script has not taken over; headline words are split in the markup, not by script, so there is no layout shift from font loading.
   - **Reduced motion:** `prefers-reduced-motion: reduce` removes every animation, transition, View Transition, smooth scroll and pin. Content shows in its final state and the pause button is hidden.
   - **Pause control:** every page with the animated backdrop has a visible "Pause motion" button (remembered between pages in `localStorage`). It stops all looping motion; this is the WCAG 2.2.2 mechanism that `prefers-reduced-motion` alone does not provide.
   - **Not yet measured:** Lighthouse and a performance trace (LCP, INP, CLS) have not been run on this build; the numbers in 4.6 are targets until then. The hero headline starts clipped and is revealed by script, so its LCP timing is the first thing to check.
7. Imagery: do not reuse the existing photos or the social-graphic photos until their license and provenance are confirmed [BRIEF §5.1]. Use typography, simple inline SVG, and the logo until real photography exists.
8. Logo handling: crop the transparent padding for headers; the thin ellipse stroke will vanish at favicon sizes, so make the favicon the "D2E" letters only (or the "2" in an app-icon-style tile). A vector (SVG) logo does not exist; ask for one, or trace it. Which logo is canonical (ellipse or the "orbit ring" variant) is undecided [BRIEF §5.1].
9. Spelling: "counselor" everywhere (the ARCH nav's "Counsellor" is inconsistent with the articles) [BRIEF §5.3].

---

## 6. The existing site versus the no-code plan

### 6.1 What exists (verified by me; this updates the brief's section 6)

- Live at `https://d2excel.com/` on GitHub Pages; `www` redirects to the apex. DNS at GoDaddy; Google Workspace mail.
- Public repo `https://github.com/divyansh3030/d2excel`: `main`, a few dozen files, two contributors (one with 15 commits, one with 5), no license, no issues. It sits in an individual contributor's personal GitHub account, not a D2Excel organization.
- Pages: `index.html`, `about.html`, `services.html`, `careers.html`, `contact.html`, plus `portal.html`/`account.html` and a set of one-line redirect stubs (`student-login.html`, `parent-register.html`, `payment.html`, `fun.html`, `resources.html`, and so on) that lead to a front-end-only account preview. Careers applications are by email to a Gmail address.
- Home copy: "An AI Powered Student Success Platform", a three-step process (Understand, Guide, Execute), a planned "Counselor Network", values (Student First, Trusted Guidance, Real Outcomes). Services-led, not marketplace-led.
- Missing: robots.txt, sitemap.xml, canonical, Open Graph, JSON-LD, favicon, forms, any guide content. Large unoptimized images. Nav and footer loaded by JavaScript.
- Last push 2026-08-31, so the strategy deck (modified Sept 30) and the PRD may have been written without reference to it, or in parallel.

### 6.2 Options

| Option | What it means | Verdict |
|---|---|---|
| 1. Evolve the existing hand-coded site | Add guides and pages by hand in that repo | Not recommended: the weaknesses in Section 4.1 stay, and the repo is on a personal account |
| 2. Replace with a new static build on the same domain | New repo in a D2Excel org, generator-based (Section 4), cut over DNS, redirect the old URLs | **Recommended** |
| 3. Build in Webflow/Wix as the strategy doc says | Throw away the repo, rebuild visually | Valid if Gurashish values no-code editing above control and cost; see 4.2 for when |

### 6.3 Recommendation [PROPOSAL]

Option 2. The live site is a thin five-page company site with a positioning that disagrees with the marketplace strategy, no SEO foundation, and prototype login pages whose copy overstates security. Little is worth salvaging beyond the careers flow, the domain, and possibly the font choice. The strategy documents' no-code plan was made without knowing a hand-coded repo existed, and its stated goals (Marketing edits without an engineering deploy) can be met with a Markdown workflow plus a CMS layer; if that proves too heavy, fall back to Option 3 (Webflow) rather than back to hand-written HTML.

Cutover safety [PROPOSAL]: build and review on a preview URL; keep the current site live until the new one passes the launch checklist; keep DNS and mail records untouched except for the web records; add redirects for the old pages; remove the prototype login pages; move the repo into a D2Excel-owned GitHub organization so ownership does not depend on one person's account.

### 6.4 What I would need to know

1. Who owns the GitHub repo, the Pages deployment, the GoDaddy account and the Google Workspace admin, and are the two contributors current D2Excel team members?
2. Does anyone expect to keep editing the existing repo, and does anyone already hold a Webflow or Wix account or contract?
3. Is the live site's "AI Powered Student Success Platform" wording something leadership wants kept?
4. Is the existing hero photography licensed (the 2.2 MB `student-counselor-handshake.png` has no documented provenance)?
5. Who will maintain the site after launch, with what technical comfort and budget? (Decides Option 2 versus 3.)

---

## 7. Phased build plan

Effort is in working days for one developer working with Claude, **excluding time spent waiting on decisions, copy, legal text and approvals** [ESTIMATE]. Totals: roughly 15 to 20 working days to a launched site.

| Phase | What | Effort | Depends on |
|---|---|---|---|
| **A. Foundation** | Repo in a D2Excel org; generator scaffold; design tokens (5.1-5.2); base layout, header and footer; logo crop, favicon set; SEO head and JSON-LD helpers; sitemap and robots; Netlify project with previews; redirect map; Search Console and Bing verification | 3-4 days | Decisions 1, 2, 7 (Section 8) |
| **B. Guides** | Content collection with validation; convert the six articles (docx to Markdown, then fix tables and callouts by hand); components (QuickAnswer, tables, SourcesList, LastVerified, StakeNote, FAQ, Related, Breadcrumbs); Student Hub page; social-card images; placeholder-marker check; link checker in CI | 3-4 days | Article exports; open markers in the counselor guide. **Aim: UC and paying-for-college guides live well before Nov 30** |
| **C. Marketing pages** | Home, For Parents, For Counselors, For Schools, About, Help/FAQ, Find a Counselor placeholder, Join, Careers carry-over, privacy and terms shells; waitlist and contact forms; GA4 with consent | 4-5 days | Positioning and claims (decision 3); legal text and the money and policy facts (decisions 5, 6); form tool |
| **D. Launch and QA** | Lighthouse and axe runs, real-device mobile check, keyboard and screen-reader pass, rich-results and share-preview tests (include a WhatsApp and WeChat share), redirect test, DNS cutover, post-launch Search Console check | 2 days | A to C complete |
| **E. After launch (ongoing)** | Re-verification calendar (each guide has `reviewBy`); 2 new guides a month once keyword direction exists; optional editing UI for Marketing (1-2 days); College databank pilot, California only (5-8 days plus data QA); Chinese and Hindi entry pages (translation lead time); local content only where real; hand-off design for `app.d2excel.com` (Phase 1 is a separate project) | Ongoing | Keyword research decision; Phase 1 planning |

Fast path if decisions are slow: ship Phases A and B alone (about 6-8 days) so the six guides, hub, waitlist and basic About are live, and add the role pages in C afterwards. This captures the UC and FAFSA season without waiting on positioning or legal copy.

---

## 8. Decisions needed from Gurashish, ranked by how much they block

**Blocks the start of the build**

1. **Platform of record.** Replace the live GitHub Pages site with a new generator-based static build (my recommendation), or use Webflow/Wix as the strategy doc planned, or keep hand-editing the old repo. Along with it: who owns the GitHub repo, GoDaddy and Google Workspace logins, and permission to move the repo into a D2Excel organization (6.4).
2. **What v1.0 is.** Confirm the default in 2.1: static marketing site plus six guides plus waitlist, with Find a Counselor, sign-in, Achievements Hub, Social Hub, chatbot and ticketing as placeholders, third-party tools or deferred (table 2.3). Confirm removing the "Sign in" button and the prototype login pages, and that the Social Hub is omitted.
3. **Get the six articles into the repo.** Export the docx files (and the logo files) from the Drive, and answer the two counselor-article questions: how D2Excel is paid, and what the `collegeplannerpro.com` marker means (is the article already published there, which decides canonical versus rewrite). The UC window closes Nov 30, so this is time-critical.

**Blocks copy (and therefore pages in Phase C), not the guides**

4. **One-line positioning, primary customer, and claims.** Free student workspace, open counselor marketplace, AI matching, or parent-paid service. Also: may the site say "AI-powered", "vetted" or "counselor review" now; Bay Area versus California in the headline; seniors only versus grades 9-12; and a single sourced position on the counselor-caseload statistic (376 versus 195-224) [BRIEF §7.1 Q5-Q8, Q11].
5. **Money and policy facts** for For Parents and For Counselors: counselor fee, payout timing, eligibility beyond the documented items, refund and re-match policy, and who writes the legal text. Without answers I will leave fees and payout timing out.

**Blocks launch, not the build**

6. **Legal and privacy:** owner and timeline for privacy policy and terms; the analytics consent approach for a minor-facing site; the age wording on the waitlist; AB 1312 registration status [BRIEF §7.1 Q12, Q18, Q19]. Forms stay off until the privacy page has real text.
7. **Email and form tools:** HubSpot or Mailchimp for the waitlist, which sender domain, and which inbox receives contact, counselor-interest and school forms.
8. **Brand basics:** which logo is canonical, an SVG if one exists, favicon sign-off, acceptance of the palette and type proposal in Section 5, and photo rights (existing hero image, social-graphic photos).

**Does not block anything; I will apply the default shown**

9. Add a `/for-schools/` page? (Default: yes, one page.)
10. Public team section on About? (Default: omit until people and bios are named.)
11. Keep the `/careers/` page? (Default: carry it over.)
12. Revive the obsolete keyword research and competitor teardown, or commission a new pass, and who owns it? (Default: launch the six guides now; use Search Console data for guide 7 onward.)
13. Chinese and Hindi pages in scope for v1.0? (Default: no; Phase E.)
14. Who maintains the site after launch, with what Git comfort? (Default: Markdown in GitHub plus a preview; revisit an editing UI or Webflow if that proves too hard.)

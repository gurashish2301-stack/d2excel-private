# D2XL / D2Excel Static Website: Brief for Forge

Prepared by Pioneer on 2026-10-08. Purpose: give Forge everything it needs from the D2Excel Google Drive (which Forge cannot access) to write a plan for the static website. This brief contains no code and makes no build decisions. Where the source documents are silent or contradict each other, that is stated rather than resolved.

## 0. How to read this brief

**Conventions**
- Every fact carries a source tag in square brackets, defined in the legend below.
- **[INFERENCE]** marks anything I concluded rather than read. Treat it as a hypothesis for Gurashish to confirm.
- **NOT FOUND** marks something I looked for in the current documents and could not find.
- Direct quotes from the sheet keep the original spelling, including typos.

**Source legend**

| Tag | Document | Drive location |
|---|---|---|
| [CLAUDE.md] | Local scope file | /Users/gurashish/Documents/Code/D2EXCEL/CLAUDE.md |
| [ARCH] | D2Excel — Website Content Architecture (v1.0), Google Sheet, id 1okqcO0AG-H2r2QsK0-ve_KcS8W6RvXjLE1HXXVnobSA. One tab ("Data", A1:F49) was exposed to me. | not placed in a folder I listed |
| [POS] | D2Excel Positioning and Competitive Research.docx (Oct 4, 2026) | Marketing/SEO (copy in Marketing/Research) |
| [AUD] | D2Excel Audience and Outreach Pilot.docx (Oct 4, 2026) | Marketing/SEO (copy in Marketing/Research) |
| [OUTREACH] | D2Excel_Targeted_Outreach_Plan.docx (Sept 8, 2026; earlier version of the outreach half of [AUD]) | Marketing/Social Media Research/Docs |
| [BIOS] | D2Excel_Social_Bios.docx (Jul 17, 2026) | Marketing/Social Media Research/Docs |
| [PILLARS] | content ideas pillars.docx | Marketing/Social Media Research/Docs |
| [LI] | 1-3 LinkedIn Posts Draft.docx | Marketing/Social Media Content |
| [DECK] | d2excel-strategy-deck.pptx | Product |
| [STRAT] | D2EXCEL_Product_Strategy_v1.docx (V1.0, Jul 28, 2026) | Product |
| [PRD] | D2EXCEL_PRD_v1(Rev 4) (Sept 1, 2026). I read Sections 2 to 5, 7 and 10; I did not read Sections 6, 8, 9. | Product |
| [INTAKE] | Intake form.docx (Version 1) | Product |
| [GUIDE] | D2E-WebSite-Maintenance-Guide.docx | Engineering |
| [DATABANK] | D2Excel_Databank_Plan_v4.docx | Marketing/Resources |
| [IDEAS] | D2Excel resouces/ideas (Google Sheet) | My Drive root |
| [TASKS] | D2Excel tasks (Google Sheet) | My Drive root |
| [ART-UC] | University of California application.docx | Marketing/SEO Website Content |
| [ART-SAT] | SAT or ACT.docx | Marketing/SEO Website Content |
| [ART-AID] | Where_College_Money_Comes_From.docx | Marketing/SEO Website Content |
| [ART-MAJOR] | What_A_Major_Is_Worth_2026.docx | Marketing/SEO Website Content |
| [ART-AI] | AI_And_Your_Application_2026-27.docx | Marketing/SEO Website Content |
| [ART-COUNSELOR] | How to Choose a College Counselor.docx | Marketing/SEO Website Content |
| [GFX] | 4 PNGs: Final_2-nobg.png, post 1/2/3 graphic.png | Marketing/Graphics |
| [LOGO-LOCAL] | Local copies of the logo files, inspected visually | /Users/gurashish/Documents/Desire2Excel/logo/ |

**Obsolete folders (existence noted, contents not read, per instruction)**
- `Marketing/SEO/Obsolete` holds 4 files: `D2Excel Competitor SEO Teardown.docx`, `D2Excel_SEO_Keyword_Research.docx`, and two copies of `D2Excel Marketing seo plan.docx`.
- `Marketing/Research/Obsolete files` holds older versions of the positioning, competitive landscape, target audience, case study and outreach documents.
- **Consequence: the SEO keyword research and the competitor SEO teardown that were requested exist only inside `SEO/Obsolete`, so I did not read them.** There is no current (non-obsolete) keyword research in the Drive (see Section 4.3). Local copies of the same files sit in /Users/gurashish/Documents/Desire2Excel/Marketing/. I do not know why they were marked obsolete, and I did not open them.

**Not read:** the `.xlsx` duplicate of [IDEAS] in Marketing/Resources, the older PRD v1.docx, the Human Resources folder, and the Personal folder on the local disk (private HR/legal documents, out of scope). The Management folder and the `Marketing` folder under Gurashish's My Drive returned no files.

**Naming:** the documents use D2Excel, D2EXCEL and D2E. The string "D2XL" appears in none of the documents I read. See open question 9.

---

## Read this first: the six things that most change the plan

1. **A site already exists, but it is not clearly the site this brief is about.** [GUIDE] describes "the current D2EXCEL website" as a hand-coded static HTML/CSS/JS site, while [STRAT] and [DECK] plan Phase 0 as a no-code (Wix/Webflow) site. The two disagree on platform. No source code is in the local workspace. See Section 6.
2. **The page inventory in [ARCH] describes more than a static site can do.** Find a Counsellor (search with filters and listings), sign-in, Achievements Hub, Social Hub, chat bot, counselor application and a support-ticket platform all need a back end. The roadmap in [STRAT]/[PRD] puts accounts at Phase 1 and counselor listings at Phase 2. See Section 3.3.
3. **[ARCH] excludes the very thing SEO depends on.** "Blog / guides" and "College guides" are listed under "NOT IN V1.0", yet [CLAUDE.md] and [DECK] name SEO content as the top-of-funnel growth lever, and six finished articles exist. The only home for them in v1.0 is Student Hub > Resources, which [ARCH] marks "(Needs work and categorization)".
4. **The documents disagree on what D2Excel is and who the customer is.** A free application workspace for seniors, an open counselor marketplace, an AI-matching platform, and a parent-paid service are all described. The homepage tagline cannot be written until this is settled. See Section 1.3.
5. **There is no current keyword research.** Target keywords below are marked as inference only.
6. **Several claims in the existing marketing materials conflict with the company's own research and roadmap** (counselor caseload statistic, "AI-powered matching", "vetted"). The site should not copy them without reconciliation. See Section 7.2.

---

## 1. What D2XL is: positioning and differentiators

### 1.1 The business in brief
- D2Excel is a two-sided marketplace connecting students with college admissions counselors, launching in California and expanding across the US. Student demand has to come first. SEO content in the college-admissions domain is the top-of-funnel growth lever [CLAUDE.md].
- [STRAT] describes it as four-sided in practice (student, parent, school, counselor) and sequences them: student first, parents close behind (they usually decide whether the family pays), schools as the highest-leverage distribution partner, counselors last.
- The company is described as San Ramon-based [STRAT, risk table, AB 1312 row].
- **Stage:** early. D2Excel has no user data [AUD]; no stats, testimonials or outcomes exist yet [BIOS]; there is no live product beyond the existing static site [GUIDE] and the roadmap below.
- **Geography:** the scope file says California, then the US [CLAUDE.md]. The research documents target the **Bay Area**: five core counties (Santa Clara, Alameda, San Mateo, Contra Costa, San Francisco) [POS, AUD], Bay Area schools [DECK, STRAT], a ZIP code "Bay Area filter — critical" in the intake form [INTAKE]. [AUD] says expansion elsewhere in California should assume lower spending and more Spanish-language outreach.

### 1.2 Roadmap the website sits inside [STRAT, DECK, PRD]
| Phase | Timing | What ships |
|---|---|---|
| 0 Static website | Weeks 1-3 | No-code static site: brand, mission, resource links, college databank as static content, email capture, SEO basics [STRAT 10.1] |
| 1 Student MVP | Weeks 3-16 | Consent-gated sign-up (13+ only), student profile, resource hub CMS, grade roadmap, deadline planner, college search, portfolio, Ambassador referral program |
| 2 Marketplace MVP | Weeks 16-30 | Hand-recruited counselors (10-20), mandatory background check and insurance, manual matching, simple payments, logged messaging |
| 3 AI and scale | Month 9-12+ | Algorithmic matching, AI counselor agents, school dashboards, counselor subscriptions, premium content |

Phase 0 requirements in [PRD] section 3, all P0: static marketing pages (mission, vision, about, contact), resource links (Common App, UC App, College Board, Naviance, NACAC), a read-only browsable college databank (including tuition and net price from public IPEDS/College Scorecard data), email capture waitlist, GA4 from day one. The PRD states these should be "content-managed by Marketing on the no-code builder, no engineering deploy needed".

Revenue [STRAT 7]: take-rate on counselor payments (Phase 2), counselor subscriptions and school licensing (Phase 3), premium student content; advertising dropped for now. Families pay the counselor, not D2Excel; D2Excel is "not the seller of record".

### 1.3 Positioning statements found (they are not the same)
| Source | Formulation |
|---|---|
| [POS] | "A free college application workspace for Bay Area high school seniors, with vetted counselors reviewing its recommendations." Headline: "A free college list built on your real profile." |
| [DECK] | "High-Trust High School Student Resource Center & Dual-Sided Counselor Marketplace"; "Vetted freelance marketplace + free local student hub"; motto "Desire to Excel" |
| [STRAT] | Vision: "every high schooler ... has someone in their corner who actually knows them". Mission: "a free, trustworthy home base for college and career planning from day one, and an affordable, vetted path to a real advisor once free guidance stops being enough." |
| [BIOS] | "AI-powered marketplace matching students with independent college counselors — built on fit, not assignment." "Matched, not assigned." |
| [LI] and [GFX] posts 2 and 3 | "An open marketplace connecting students and families to a wider range of counselors, plus decision-support information that isn't gated behind who can already afford it." |
| [ART-COUNSELOR] | "D2Excel is an open marketplace for independent college counselors." Contains an unresolved placeholder: "[Leadership to confirm: one line on how D2Excel is paid.]" |

### 1.4 Differentiators as documented
- Sits between $29.5K-$77K+ boutique counseling and Empowerly/Crimson at $10.8K-$32K, and overburdened school counselors, with free resource layers plus "highly affordable 1:1 starter packages" [DECK].
- "Nobody yet owns 'vetted freelance counselor marketplace with a strong local student community underneath it' — that is D2EXCEL's actual suitspot" [STRAT 4].
- Locality, curation and community, not content volume. [STRAT] says plainly that "A generic resource hub cannot out-SEO" Naviance, CollegeVine and BigFuture.
- Handles Common App, UC and CSU together; reach/target/safety list from the student's own profile; counselor review of recommendations [POS]. **[POS] itself says the California-tracking differentiator is unverified** against Counsely, Kollegio and SCOIR, and counselor review is "a later feature", so neither should be a headline claim yet.
- Counselors are matched on fit, with families seeing why [BIOS]. Under the roadmap, manual matching comes first and algorithmic matching is Phase 3 [PRD, DECK].
- Every active counselor offers at least one lower-cost starter package, with price filter and sort (Phase 2) [PRD 5.2.1].
- Competitive reality check from [POS]: Counsely is "the closest match to D2Excel's model"; Kollegio, Orbit, CollegeVine and others already offer free AI college lists. 27 competitors in four categories were profiled.

---

## 2. Audiences and what each needs from the site

Note on priority: the documents disagree on the primary customer. [POS] targets the student (free product). [AUD] targets parents as buyers and "assumes revenue from paid services that parents book through the platform". Both documents flag this as unresolved ("The two need one answer").

### 2.1 Students
**Who**
- [POS]: Bay Area high school seniors applying this fall without a private consultant. Earlier grades are out of scope there.
- [PRD]/[STRAT]: grades 9-12; registration blocked under 13.
- [INTAKE]: asks age (13-18 / 18-25 / 25+) and grade (6-10 / 11 / 12 / bachelors / masters / other), so the intake form is broader than either.
- The six articles are written in second person to students ("you") [ART-UC, ART-SAT, ART-AID, ART-MAJOR, ART-AI].

**What they need from the site (documented)**
- Free, immediate value: guides, deadlines, a college list [POS, PRD 4.2.2].
- Plain-language explanations of the UC, Common App and CSU systems and California requirements (A-G, UC/CSU eligibility, community college transfer) [PRD 4.2.2, DECK].
- Grade-level roadmap, deadline planner, college search [PRD 4.2.2]. These are Phase 1 product features. On the static site they can only be teasers or waitlist hooks **[INFERENCE]**.
- Mobile-first experience ("majority of teen usage will be mobile") and pages under 2 seconds [PRD 7.2].
- Low-friction sign-up that does not need a parent to approve a 13-17 account [PRD 4.1]. See the parental-consent conflict in Section 7.2.
- Sources and "where to verify" on every factual claim [ART-*].

### 2.2 Parents
**Who:** Persona A (priority 1) is first-generation Indian- or Chinese-American, tech-professional parents, aged 40-55, household income $200K-$400K+, in Cupertino, Sunnyvale, Santa Clara, Fremont, Dublin, San Ramon, Palo Alto and similar. Persona B is established professionals. Persona C is middle-income, price-sensitive, often first to navigate selective admissions. Persona D is private-school and high-net-worth, deprioritized [AUD].

**What they need from the site**
- Trust content ("Something to make the parents trust us") [ARCH, For Parents > Trustables].
- Clear statement that D2Excel is a portal and how counselors are paid: "how we are just a portal and we try our best but be careful" [ARCH].
- Refund / re-match policy and FAQ [ARCH].
- Visible safety posture: background checks and insurance gating, parent read access to counselor chat (these are planned for Phase 2, not live) [STRAT, PRD].
- Reviews matter: "89% of parents say online reviews play a key role" [AUD]; collect reviews from the start. No reviews exist yet **[INFERENCE from "no testimonials exist" in BIOS]**.
- Language: 55.7% of Santa Clara County residents speak a non-English language at home; "Chinese- and Hindi-language materials are worth producing" [AUD]. Reach is through WeChat and WhatsApp groups, referrals, Facebook groups, Nextdoor, Google search [AUD]. **[INFERENCE]** Pages need shareable link previews and phone-friendly layouts for group chats.
- Cost context they respond to: counseling packages $4,000-$12,000 [AUD, POS]; the parent-facing article gives California independent counselor averages of $6,939 total and $245/hour [ART-COUNSELOR].
- Parent link on student accounts is optional [PRD]; it is not an account requirement.

### 2.3 Counselors
**Who:** independent freelance college and career advisors; Phase 2 starts with 10-20 hand-recruited counselors from personal networks, IECA directories and LinkedIn [STRAT 10.4, PRD 5.2.1]. [BIOS] LinkedIn copy says "D2Excel is expanding its counselor network now" and recommends "For Counselors" in the top nav, not the footer.

**What they need from the site** (all from [ARCH, For Counselors])
- Value proposition with a headline and pitch.
- Fee structure. Direction in the documents: take-rate only at first, no subscription [STRAT 7]; stepped rates that fall as counselors log hours [DECK]. **No actual percentage is documented.**
- Payout method and timing. Direction: manual invoicing or a hosted payment link first, Stripe Connect later [STRAT, PRD]. **No payout timing is documented.**
- Eligibility requirements. Documented: mandatory third-party background check (Checkr) and liability insurance before listing [DECK, STRAT, PRD]; at least one lower-cost starter package [PRD]. No other criteria found.
- Disclosures and agreements ("Consent, legalities etc.").
- A counselor application. [PRD] says registration is "Hand-recruited, not publicly self-serve yet" and lists "no public/open counselor signup without vetting" as a Phase 2 non-goal, so an application form is compatible only if it feeds a vetting process, not instant listing **[INFERENCE]**.

### 2.4 Schools (not in [ARCH])
[STRAT] makes schools the primary distribution channel ("leading go-to-market with the school channel"), and [AUD]/[OUTREACH] run a whole outreach track to counselors, administrators and tutoring centers with offers such as workshops, presentations and pilots. **[ARCH] has no page for schools or partners**, so outreach emails would have no destination. This is a gap (open question 16).

---

## 3. Intended site structure and page inventory

### 3.1 Navigation
"It should atleast include- Home | Find A Counsellor | Student Hub | For Parents | For Counsellors | About Us | Help" [ARCH, Home > Menu Options, status In progress]. Note the sheet spells it both "Counsellor" and "Counselor" (see Section 5).

### 3.2 Page inventory, verbatim from [ARCH]
The Assignee column is empty for every row. Status values are exactly as in the sheet; blank means no status was entered. The last column is my assessment.

| Page | Section | Sub-item | Status | Notes in [ARCH] | Needs a back end? [INFERENCE] |
|---|---|---|---|---|---|
| HOME | (page) | | Not started | | |
| | Menu Options | | In progress | (nav list above) | No |
| | Banner | | Ready | | No |
| | | Tagline | | | No |
| | | Sign in form button | | | Yes: accounts are Phase 1 |
| | Motivational quote | | | | No |
| | Positioning claim | | | "Like some numbers to make us look more trustworthy, can be put on hold for now" | No. No real numbers exist [BIOS, AUD] |
| | Role router | | | "Buttons to go to respective roles pages" | No |
| | Our Mission statement and Values | | | | No |
| | Footer for website | | | "Basically what we already have on static, containg all links and support" | No; exists today [GUIDE] |
| FIND A COUNSELLOR | Search option with filters | | | "typical filters on left, listings of counsellors" | Yes, or pre-rendered data. No counselors exist yet: Phase 2 [STRAT] |
| | disclosures | | | "End of webpage written not so bold and big that we are not responsible. this is a open marketplace" | No |
| STUDENT HUB | Resources | | | | No |
| | | (Needs work and categorization) | | | |
| | Achievements Hub | | | | Yes: grades, SAT/PSAT, artifacts store (idea owner: Ravi, Phase 1) [IDEAS] |
| | Social Hub | | | "Gamified social place for everyone to chat" | Yes. See safety and PRD conflict below |
| | Chat bot button | | | | Yes: AI agents are Phase 3 [DECK] |
| FOR PARENTS | Trustables | | | "Something to make the parents trust us. some type of content" | No |
| | Counsellors payment disclosure | | | "Something about how we are just a portal and we try our best but be careful" | No |
| | Refund / re-match policy | | | | No (policy text needed) |
| | FAQ | | | | No |
| FOR COUNSELORS | Value proposition | | | | No |
| | | Headline + pitch | | | |
| | Fee structure | | | | No (values needed) |
| | Payout method + timing | | | | No (values needed) |
| | Eligibility requirements | | | | No |
| | Disclosures and agreements | | | "Consent , legalities etc." | No (legal text needed) |
| | Counsellor Application | | | | Form handling or a third-party form |
| ABOUT | Company story | | | | No |
| | Mission statement | | | | No (duplicates the Home section) |
| | What's public | | | | No |
| | | Team section | | | No (who is public is undecided) |
| HELP | FAQ | | | | No |
| | Supprt Ticket Platform | | | "People can raise a ticket and it gets stores to us and we can reply" | Yes: a ticketing tool or form backend |
| | Privacy and policies | | | | No (legal text needed) |
| NOT IN V1.0 | College guides | | | | |
| | High school pages | | | | |
| | Blog / guides | | | | |
| | Support chatbot | | | | |
| Additional (All pages) | Prompt sign up | | | | Needs a destination (waitlist or accounts) |

### 3.3 Issues the inventory raises
- **Static versus dynamic.** Rows marked "Yes" cannot be delivered by static files alone. The options are placeholder or "coming soon" pages, third-party embeds, or deferral. [ARCH] does not say which. See open questions 1 and 4.
- **"Sign in form button" and "Prompt sign up".** The roadmap has an email waitlist in Phase 0 and accounts in Phase 1 [PRD]. It is unclear what these do on day one.
- **Social Hub versus the PRD.** [ARCH] says "Gamified social place for everyone to chat". [PRD] describes student-to-student matching as non-monetary, interest-based, private by default, no leaderboards; and a "Fun" feature "can slip if the timeline is tight" [STRAT]. [STRAT] calls 1:1 chat between adults and minors "the single highest-stakes trust surface". Open chat for everyone conflicts with that posture.
- **"Chat bot button" (in v1.0) versus "Support chatbot" (NOT IN V1.0).** These may be two different bots; the sheet does not say.
- **College databank.** [PRD] and [STRAT] list a browsable static college databank as a P0 Phase 0 item. [ARCH] lists "College guides" as NOT IN V1.0 and has no databank row. It is unclear whether they are the same thing.
- **Mission statement** appears on both Home and About.

---

## 4. SEO requirements

### 4.1 Strategic role
- SEO content is the student-acquisition engine: "Organic SEO content & viral student ambassador loops"; Phase 1 core catalyst is "localized high-value content & organic SEO" targeting Bay Area local searches, "without paid ad spend" [DECK].
- Caveat from [STRAT]: do not try to out-publish Naviance, CollegeVine or BigFuture. Win on locality, curation and community, and link to official sources (BigFuture owns the official-data lane: "link to it instead").
- School and parent channels run in parallel and are not SEO-dependent [STRAT, AUD].

### 4.2 Technical SEO and measurement requirements stated in documents
- Meta tags, sitemap, Google Search Console, and "a target keyword list built around Bay Area college-counseling searches" [STRAT 10.1].
- GA4 from day one so Phase 0 traffic feeds the Phase 1 product-market-fit read [PRD, STRAT]. [TASKS] lists GA4, Semrush and Ahrefs as the keyword research toolset.
- Email capture wired to a mailing tool: "HubSpot per the existing plan, or a lighter tool like Mailchimp" [STRAT 10.1].
- Performance: pages under 2 seconds [PRD 7.2, stated for Phase 1 onward]. Mobile-first. WCAG 2.1 AA for student- and parent-facing pages [PRD 7.4, stated for Phase 1 onward; applying it now is my suggestion, **[INFERENCE]**].
- Resource-hub content must be updatable by Marketing "without an engineering deploy" [PRD 4.2.1, 3].

### 4.3 Target keywords
**NOT FOUND in current documents.** The only keyword research files are in the Obsolete folder. [TASKS] shows "SEO keywords research" as In Progress (assigned by Arnav, 7/24/2026, "Just learned the tools"). No volumes, difficulty scores or competitor keyword gaps are available to me.

What the live documents do give:
- Geography and topic direction: Bay Area local searches; UC App, Common App, California community college transfer pathways [DECK].
- Initial resource coverage: how Common App, UC App and Coalition differ; test-prep guidance and testing timeline; financial aid and scholarship basics; California requirements (A-G, UC/CSU eligibility, transfer) [PRD 4.2.2].

**Seed topics (INFERENCE, derived only from the titles and content of the six finished articles, not from any keyword tool). Do not treat as researched keywords.**
- UC application: deadline (Oct 1 - Nov 30), personal insight questions, "does UC require SAT/ACT", UC versus Common App, UC GPA.
- SAT or ACT: which is required where, test-optional versus test-free, CLT.
- Financial aid: FAFSA opening date, California Cal Grant deadline (March 2), net price calculator, scholarships versus grants, California Dream Act.
- How to choose a college counselor; how much a private college counselor costs; red flags.
- AI and college essays: Common App fraud policy, school-by-school AI rules.
- What a major pays; computer science unemployment; choosing a major.
- Local modifiers to test (my suggestion): "California", "Bay Area", county and city names from [AUD] persona locations.

**Recommended before Forge finalizes the information architecture:** a current keyword and competitor SEO pass (open question 10).

### 4.4 Content pillars [PILLARS]
1. **The Broken System** (problem-first, no pitch): counselor caseloads, fit, information gap, cost of bad guidance.
2. **Vision and Services** (what we are building): founding story, marketplace versus directory, what students, parents and counselors get, why the hub is free, the "anti-roadmap".
3. **Career and Academic Guidance** (the audience engine): career paths, how to choose a major, extracurriculars, essay evaluation, grade 9-12 timeline, financial aid terms, campus visit questions, researching colleges beyond rankings.
4. **Proof and People** (credibility): team, counselor spotlights, funding announcement, advisor introductions, waitlist milestone, pilot-school story. Most of this does not exist yet.

Content ideas that could become site features or lead magnets [DATABANK, IDEAS]: college cost calculator, career quiz, "Junior year in 8 weeks" email series, application deadline planner, free mini AI counselor demo, state-by-state guides, downloadable templates, webinars with counselors. The tasks sheet marks cost calculator, quiz, newsletter and deadline planner as ideas; [IDEAS] marks quiz, newsletter and deadline planner "Phase 1".

### 4.5 Existing finished content (SEO Website Content folder)
All six read as ready-to-publish web pages, already branded "d2excel.com · Page" in the footer.

| File | Header label | Audience and angle | Open markers |
|---|---|---|---|
| University of California application | CALIFORNIA ADMISSIONS - APPLYING FALL 2026 FOR FALL 2027 | Students; how UC differs from Common App; Oct 1 - Nov 30, 2026 window; 4 of 8 personal insight questions | None |
| SAT or ACT | COLLEGE ADMISSIONS - CLASS OF 2027 & 2028 | Students; which schools require scores; UC and CSU do not look at scores | None |
| Where College Money Comes From | PAYING FOR COLLEGE - 2026-27 & 2027-28 | Students and families; FAFSA opens by Oct 1, 2026; Cal Grant deadline March 2, 2027 | None |
| What A Major Is Worth 2026 | CAREERS & MAJORS - 2026 DATA | Students; pay versus unemployment by major | None |
| AI and Your College Application 2026-27 | APPLICATIONS & ESSAYS - 2026-27 CYCLE | Students; AI rules by school; green/yellow/red zones | None |
| How to Choose a College Counselor | (no label) "10 Checks You Can Verify Before You Pay" | Parents and students; bylined "Written by the D2Excel editorial team"; has FAQ section | "[Leadership to confirm: one line on how D2Excel is paid.]" and "[Eng: replace with the collegeplannerpro.com original URL before publishing]" |

**Structural pattern in these articles (for Forge to model as reusable page components) [INFERENCE on the component list]:**
- Eyebrow label, title, one-line subtitle.
- A boxed "QUICK ANSWER" summary at the top.
- Comparison tables and "Key dates" tables.
- "Sources & where to verify" section.
- A "Last verified: September 2026" line with the standard caveat: "Testing, deadline, and aid policies change every cycle — always confirm on the official page before you act on a date or rule."
- Time-sensitive facts that need re-verification each cycle. As of today (2026-10-08) the UC window and FAFSA are open. [ART-COUNSELOR] says UC may reconsider test scores after a recommendation due by June 2027.
- The counselor article lists D2Excel's own stake candidly ("A note on our stake") and tells readers when they do not need a paid counselor.

### 4.6 Structured data (schema) needs. All INFERENCE: no document specifies schema.
| Schema type | Where | Basis |
|---|---|---|
| Organization (name, logo, url, sameAs for social profiles) | Sitewide | Handles @d2excel on Instagram, Threads, Facebook, LinkedIn, unconfirmed [BIOS]. Postal address only if Gurashish confirms what to publish (San Ramon per [STRAT]) |
| WebSite | Home | Standard |
| Article (author: D2Excel editorial team; datePublished; dateModified) | The six guides | Articles carry "Last verified" dates, which map to dateModified |
| BreadcrumbList | Hub and guide pages | Standard |
| FAQPage | FAQ pages and the counselor article | FAQs exist in [ARCH] (Parents, Help) and [ART-COUNSELOR]. My background knowledge is that Google restricted FAQ rich results in 2023, so expect little visible benefit; low priority |
| CollegeOrUniversity | Databank pages, if shipped | [PRD] Phase 0 databank |
| Person / ProfessionalService | Counselor profiles | Not in a static v1.0; Phase 2 |

Also needed: XML sitemap, robots, canonical tags, Open Graph and Twitter card tags (parents share via messaging groups [AUD], **[INFERENCE]**), and `noindex` decisions for thin placeholder pages (**[INFERENCE]**).

---

## 5. Brand and tone

### 5.1 Brand assets that exist
- **Logo, main:** `Final_2-nobg.png` [GFX; inspected via LOGO-LOCAL]. Per my inspection of the local copy: 500 x 500 px, RGBA with transparent background, "D2E" wordmark inside a blue ellipse; D and E in blue, the "2" in red. Sampled colors are approximately blue #0040C0 and red #E01020. These are measured from the PNG, not from a brand document. [TASKS] records "Logo design — Finalised the logo with Rajeev sir", completed 7/3/2026. That the Drive file and local file are identical is my assumption.
- **Logo, variant:** `D2E orbit ring.png`, 2400 x 1400 px, transparent background, same wordmark with a black tilted orbit ring and no blue ellipse. It exists only locally (/Users/gurashish/Documents/Desire2Excel/logo/), not in the Drive Graphics folder. No document says which logo is canonical or where the variant is used.
- **Social graphics (Sept 18, 2026):** `post 1/2/3 graphic.png` [GFX]. Post 1 is a sage-green infographic with coral icons and a tilted-hexagon motif. Post 2 is a white layout with strong blue chevron panels, a campus photo and a counselor-meeting photo, plus the call to action "Get Started Today d2excel.com / Find Your Counselor Match Today". Post 3 is a light-grey and periwinkle layout with a large light-weight geometric sans headline, "From Gatekeeping to Equal Access", a photo of two students reading documents, and the handle @d2excel.
- **Visible consistency:** only the logo's blue and red recur. The three posts use three different background palettes, so there is no evident site palette.
- **Imagery:** the photos in posts 2 and 3 look stock-style. Their provenance and licensing are not documented, so do not reuse on the site until confirmed **[INFERENCE]**.

**NOT FOUND:** a brand guideline document, a color palette, typography choices, favicon or icon set, a photography policy, a vector (SVG) logo, a logo clear-space rule, any illustration or icon library.

### 5.2 Naming
- Account and page name "D2Excel"; formal name "Desire2Excel" "used once in longer About/description fields"; handle target @d2excel with @desire2excel as fallback [BIOS].
- Motto "Desire to Excel" [DECK, STRAT, PRD]. "Desire to" versus "Desire2" is inconsistent across documents.
- The mark itself reads "D2E".

### 5.3 Tone of voice, with sources
- **Base voice: confident and data-driven.** Energetic on Instagram and Threads, professional on LinkedIn, warm on Facebook [BIOS]. The website is not assigned a register; **[INFERENCE]** confident, plain-language and warm for students and parents, closer to the LinkedIn register for the counselors page.
- **Claims must be true today.** [BIOS]: "Every claim below is grounded in what's actually true of the product today ... No stats, testimonials, or outcomes are referenced, since none exist yet." [ARCH] agrees: the "Positioning claim" numbers are "on hold".
- **Cite sources and show dates.** Every LinkedIn statistic ends with a "Source:" line [LI]. Articles end with "Sources & where to verify" and "Last verified" [ART-*].
- **Structural, not blaming.** "This isn't a counselor problem — most are stretched thin, not indifferent. It's a structural math problem." "Not blaming ... the families who use private counseling" [LI].
- **Access and equity framing.** "Good guidance was never scarce — access to it was." [LI, GFX post 3]
- **Fit, not guesswork.** "Matched, not assigned"; "fit-based decision, not a guess" [BIOS, GFX post 2].
- **Plain, second-person, concrete.** Short answers first; tables; "One simple test"; "Where to spend your time first" [ART-*].
- **Honest about limits and about D2Excel's stake.** "A note on our stake: D2Excel is an open marketplace ... so we benefit when families hire one"; "You may not need a paid counselor if..." [ART-COUNSELOR].
- **No outcome guarantees.** The company's own counselor article lists "We guarantee admission" as a red flag, so the site must not promise admission or aid outcomes **[INFERENCE]**.
- **Culturally relevant without stereotyping.** [AUD] states that spending differences "describe averages, not individuals".
- **Spelling.** The articles, bios and posts use "counselor". [ARCH] nav and the Post 1 graphic header use "Counsellor". For a US audience, "counselor" is the safer default **[INFERENCE]**.

---

## 6. Does a website already exist? Current tech and hosting

### 6.1 Short answer
**Yes, a static site appears to exist, but its status is unclear.**

Evidence:
- [GUIDE] (Engineering): "The current D2EXCEL website is a static front-end website made from HTML, CSS, and JavaScript. The main page links to separate pages such as About Us, Services, Careers, and Contact Us."
- [ARCH], Home > Footer: "Basically what we already have on static, containg all links and support."
- Graphics, articles and bios already direct people to d2excel.com [GFX, ART-*, BIOS]. The Drive account is on the d2excel.com domain, so the domain is at least registered for Google Workspace **[INFERENCE]**.

### 6.2 What [GUIDE] says about the site
- Files: `index.html`, `about.html`, `services.html`, `careers.html`, `contact.html`; `css/style.css` and `css/responsive.css`; `js/main.js`; `components/navbar.html` and `components/footer.html`; `assets/images/`. The guide notes "the exact project may contain additional folders/files."
- `main.js` loads the navbar and footer components and initializes the active nav link and mobile menu. A change to shared CSS or JS can affect multiple pages.
- Workflow documented: edit in VS Code, test locally, `git pull`, `git add`, `git commit`, `git push`, in a GitHub repository (example name `d2excel-website`). The guide is a Windows beginner training guide and is addressed in part to "Rajeev Sir".
- It says: "If the D2EXCEL project is not already a Git repository ... run git init", so it does not confirm a repository exists.
- Its page set (Services, Careers) does not match the marketplace architecture in [ARCH]. It reads like a generic company site **[INFERENCE]**.

### 6.3 Not found anywhere
- Hosting provider, deployment method, CI, staging versus production, the live URL's current content, the repository URL or visibility, DNS and registrar, who owns the logins.
- Source code. The local workspace /Users/gurashish/Documents/Code/D2EXCEL contains only `CLAUDE.md`, and /Users/gurashish/Documents/Desire2Excel contains no site code. **Forge cannot inspect the current site until someone supplies the repository or folder.**
- Domain registration state: [DECK] lists "register landing domain" as a Phase 0 exit gate, which suggests it may not have been registered when the deck was written (deck created Aug 21, last modified Sept 30, 2026).

### 6.4 Conflict between planned and current platform
- [STRAT] and [DECK] plan Phase 0 on a no-code builder (Wix or Webflow), owned by a junior marketing hire with an engineering spot-check of about 2-3 hours, so engineers can start Phase 1 [STRAT 6, 10.1].
- [PRD] repeats "content-managed by Marketing on the no-code builder, no engineering deploy needed".
- [GUIDE] describes a hand-coded repo maintained through Git.
- Both may be true (a hand-coded company site plus a planned no-code marketing site), but no document says so.

### 6.5 Implications for Forge's plan **[INFERENCE]**
- A static site with no CMS conflicts with the requirement that Marketing publish without an engineering deploy. The plan should state how non-engineers will publish guides (for example, authoring files in the repo versus a hosted CMS).
- Navbar and footer loaded by JavaScript means they are absent from the raw HTML crawlers fetch; build-time includes would be more SEO-safe. Modern crawlers do render JavaScript, so this is a risk, not a certainty.
- Components loaded by JavaScript fetch typically fail when pages are opened from the file system, so local preview needs a local server.
- No back end exists, so every "Yes" row in Section 3.2 needs either a third-party service or deferral.

---

## 7. Gaps and open questions for Gurashish

### 7.1 Questions in priority order
**Scope and platform (blocking)**
1. **What is "v1.0"?** Is [ARCH] the Phase 0 static marketing site (with teaser or "coming soon" versions of dynamic items), a static front end with third-party embeds, or the full platform front end? Which rows in Section 3.2 are live on launch day?
2. **Where do the guides go?** [ARCH] says Blog / guides and College guides are "NOT IN V1.0", but SEO is the main growth lever and six articles are finished. Should the six articles ship in v1.0 under Student Hub > Resources? Is the college databank in scope (PRD P0) and is it the same as "College guides"?
3. **Platform of record.** Evolve the existing hand-coded static site, replace it with a new static build, or use a no-code builder? Who owns the repo, hosting, domain, DNS and logins, and is the site live at d2excel.com today? (The guide is addressed to "Rajeev Sir"; he is a likely contact.) Please supply the repo or folder.
4. **Dynamic features.** For Find a Counsellor, sign-in, counselor application, support tickets, Achievements Hub, Social Hub and chatbot: placeholder, third-party tool (which?), or deferred? What should the "Sign in" button and "Prompt sign up" do on day one?

**Positioning and messaging (blocking for copy)**
5. **Who is the customer and what is the one-line positioning?** Free student workspace, open counselor marketplace, AI matching, or parent-paid service? [POS] and [AUD] both ask for one answer.
6. **Claims.** (a) Is counselor review a live feature or "coming"? [POS] flags this. (b) "Vetted": [DECK]/[PRD] gate listing on background check and insurance, which do not exist yet. (c) "AI-powered matching" in [BIOS]: matching is manual in Phase 2 and algorithmic in Phase 3. May the site use these phrases now?
7. **Geography in the headline.** Bay Area, California, or US? The scope file says California then US; every research document says Bay Area.
8. **Student audience.** Seniors only [POS], grades 9-12 [PRD], or 6-12 [AUD, INTAKE]?
9. **Brand name and expansion.** D2XL, D2Excel, D2EXCEL or D2E? "Desire to Excel" or "Desire2Excel"? "D2XL" appears in no document I read.

**Content**
10. **SEO research.** The only keyword research and competitor teardown are in `SEO/Obsolete`. Should those be revived for use, or commission a new pass? Who owns it (the [TASKS] sheet shows it In Progress)?
11. **Reconcile statistics before publishing.** [LI] and [GFX] post 1 say the average school counselor has 376 students (50% above the recommended ratio) and that 1 in 4 high schools has no counselor. [ART-COUNSELOR] says high school counselors carry 195-224 students nationally, which already meets the ASCA 250:1 recommendation, and warns that California's 432 figure includes elementary and middle schools. [DECK] says "avg. 400:1". Post 2 claims "1 in 3 students transfer at least once". The site needs one sourced position.
12. **Money and policy values.** How is D2Excel paid (the placeholder in [ART-COUNSELOR])? Counselor fee percentage, payout timing, eligibility criteria, refund and re-match policy, counselor agreement, privacy policy, terms. Who writes the legal text? What is the AB 1312 registration status? [PRD] requires registration before Phase 1 launch.
13. **Parent trust content.** With no stats, testimonials or outcomes, what is the real "Trustables" content today (for example, background-check process, counselor standards, ethics codes)?
14. **Team section.** Who is public, with what bios and photos? Pillar 4 expects team posts.
15. **Languages.** Chinese and Hindi pages are recommended in [AUD]. In scope for v1.0?
16. **Schools and partners.** Add a "For Schools" page? Outreach in [AUD]/[OUTREACH] and the go-to-market strategy in [STRAT] depend on it.

**Brand and design**
17. **Brand guidelines.** Palette, typography, which logo file is canonical, SVG versions, favicon, and photo rights. Is the site expected to match the blue-and-red logo and the social graphics, or is a visual identity still to be decided?

**Compliance and operations**
18. **Parental consent for 13-17 sign-up.** [STRAT]/[DECK] say a parent-managed or parent-linked account is required; [PRD Rev 4] says no parental consent is needed to activate and the parent link is optional. This changes the sign-up copy and flow.
19. **Analytics and cookies.** GA4 on a minor-facing site: is a consent banner required? [AUD] notes California requires opt-in consent before selling or sharing data of users under 16. Needs legal input.
20. **Accessibility and performance targets for v1.0.** [PRD] sets WCAG 2.1 AA and under 2 seconds from Phase 1; apply now?
21. **Who builds and maintains the site,** with what budget and deadline? [STRAT] assumed a junior marketing hire; this brief assumes engineering involvement.
22. **Email and forms.** Which tool for the waitlist and counselor application (HubSpot or Mailchimp per [STRAT])? Which sender domain?

### 7.2 Conflicts between documents (summary)
| Topic | Document A | Document B |
|---|---|---|
| Primary customer | [POS]: student, free product | [AUD]: parent, buyer of paid services |
| Phase 0 platform | [STRAT]/[DECK]/[PRD]: no-code (Wix/Webflow) | [GUIDE]: hand-coded static HTML/CSS/JS in Git |
| Blog / guides in v1.0 | [CLAUDE.md]/[DECK]: SEO content is the growth lever | [ARCH]: Blog / guides and College guides are NOT IN V1.0 |
| Counselor caseload stat | [LI]/[GFX]: 376 students | [ART-COUNSELOR]: 195-224 (high school), 432 (CA, all grades, with caveat) |
| 13-17 consent | [STRAT]/[DECK]: parent-linked or parent-managed required | [PRD Rev 4]: not required; optional parent link |
| Counselor review | [POS] positioning: part of the product | [POS] launch offer: a later feature |
| Matching | [BIOS]: "AI-powered matching" | [PRD]/[DECK]: manual in Phase 2, algorithmic in Phase 3 |
| Social features | [ARCH]: "Gamified social place for everyone to chat" | [PRD]/[STRAT]: private by default, no leaderboards, "Fun" can slip |
| Geography | [CLAUDE.md]: California, then US | Research docs: Bay Area |
| Outreach cost | [OUTREACH]: $60-$80 core software | [AUD]: $54-$69 ($64-$99 with AI fees); [AUD] says the original "did not match its own line items" |

### 7.3 What Forge should and should not do with this brief
- Plan against Section 3.2 only after open questions 1-4 are answered; otherwise offer the plan as options keyed to those answers.
- Do not invent statistics, testimonials, counts of counselors or students, partner logos or press mentions for the site: none exist [BIOS, AUD].
- Treat Section 4.3 seeds as untested.
- Do not copy the statistic or claim wording flagged in questions 6 and 11 until Gurashish decides.

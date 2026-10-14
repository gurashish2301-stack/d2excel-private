# D2Excel demo website (placeholder)

This is a working demo of the D2Excel marketing site. It runs only on this computer. Nothing here is published, and nothing sends data anywhere.

## See it

Open the Terminal app and paste these two lines, then press Enter:

```
cd /Users/gurashish/Documents/Code/D2EXCEL/site
npm start
```

Then open <http://localhost:4321> in your browser. To stop it, click the Terminal window and press Control and C together.

(If you ever get an error about missing packages, run `npm install` once in the same folder, then `npm start` again.)

## What is in it

Home, For students, For counselors, How it works, Guides (six guides and one article layout), About, Join the waitlist, plus placeholder Privacy and Terms pages.

Things that are only teasers marked "Coming soon": Find a counselor, student accounts, counselor profiles and application, deadline planner. There is no sign-in, and nothing about pricing, fees or payouts.

## What is a placeholder

- **The logo.** The real logo is in `public/logo.png`. `public/logo-tight.png` is the cropped copy used in the header and footer (`src/components/Logo.astro`), and the favicons and `og.png` are made from it.
- **The form** on the Join page looks real but sends nothing. It shows a "demo only" message. The comment at the top of the form in `src/pages/join.astro` says what to connect later.
- **The guides.** The six titles come from the company documents. The excerpts and article text are placeholders.
- **The Privacy and Terms pages** have no real text.
- **The social-share image** `public/og.png` is a simple generated picture.
- **Hidden from search engines.** Every page says "do not index" and `robots.txt` blocks crawlers, so a demo cannot appear in Google by accident. The switch is `NOINDEX` in `src/config.ts`. Only change it when the real site is approved.

## Change things

- **Change text on a page:** open the file in `src/pages/` (for example `about.astro`), edit the words between the tags, save. The browser updates by itself.
- **Edit a guide:** open its file in `src/content/guides/`. The part between the `---` lines at the top holds the title, the short excerpt, the topic label and the related guides. Everything below is the article text.
- **Add a guide:** copy one of those files, give it a new file name (the file name becomes the web address), and change the contents. It appears on the Guides page by itself.
- **Change the menu:** edit the `NAV` list in `src/config.ts`.
- **Change colors and fonts:** the colors are at the top of `src/styles/base.css`.

## Motion

The animation is built to stay smooth. Pages are fully readable without it. If a visitor's computer is set to "reduce motion", every animation is switched off and they see the finished page. The older pages' animated headers also have a "Pause motion" button; the redesigned home page has none because nothing on it loops.

**Logo reveal.** The first page a visitor opens in a browser session starts with a short (about 2 second) logo reveal: a dark navy screen, the logo's ring draws itself, the real logo wipes in, then it flies into its place in the header as the screen splits open. A click, tap or any key skips it. It plays once per session (the browser remembers with `sessionStorage`; closing the browser or opening a private window shows it again). It never plays for reduced motion or without JavaScript, and a CSS timer removes it after 6 seconds even if the scripts fail. To stop it entirely, delete the `curtain` block in `src/layouts/Layout.astro` and the line that adds the `intro` class in the script above it.

## How the code is organized

- `src/pages/`: one file per page. `src/components/`: shared pieces (header, footer, cards, hero backdrop, logo).
- `src/styles/`: `base.css` (colors, type, buttons), `chrome.css` (header, footer), `hero.css`, `sections.css` (everything below the hero, plus article, forms, pinned flow), `motion.css` (shared animation language, page transitions, reduced-motion rules), `intro.css` (logo reveal). `global.css` only lists them.
- `src/scripts/`: `system.ts` (redesigned pages: menu, bottom dock, cursor effects, forms, logo reveal start), `main.ts` (older pages: menu, pause button, forms; always loaded), `motion.ts` (older pages: smooth scroll and the how-it-works pin; loaded only when motion is allowed), `intro.ts` (second half of the logo reveal).

## Check that it builds

```
npm run build
```

This makes a finished copy of the site in the `dist` folder. It is for checking only. **Publishing is a separate step and needs an explicit go-ahead from Gurashish.** Do not upload `dist` or connect any domain until then.

## What is under the hood

Astro (a site builder that produces plain pages), a small amount of JavaScript for the animation (GSAP, including its Flip plugin, and Lenis, loaded only when needed), and two self-hosted fonts. There is no tracking and no analytics.

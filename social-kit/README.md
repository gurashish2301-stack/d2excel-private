# D2Excel LinkedIn graphic kit

Make a LinkedIn post graphic by editing the words in a small text file and running one command. The words on the picture are typed by the computer, so they are always spelled exactly as you wrote them (no garbled letters).

Everything here is local. Nothing is uploaded or posted.

## Make a new post in 3 steps

1. **Copy a content file.** In the `content/` folder, copy the file that matches the layout you want (for example `a-hub-and-spoke.json`) and rename the copy (for example `counselor-ratio-oct.json`).
2. **Edit the words** in your copy with any text editor. Only change the text between the quotation marks. Keep the quotation marks, commas and brackets.
3. **Run one command** from the `social-kit` folder:

   ```
   node render.mjs content/counselor-ratio-oct.json
   ```

   The picture appears in `content/out/`. Open it and look at it before you post.

To make both sizes of every file in `content/` at once: `node render-all.mjs`.

## The four layouts

| Letter | Name | Use it for | Needs |
|---|---|---|---|
| `a` | Hub and spoke | One headline stat plus three supporting points | title, stat, 3 spokes, source |
| `b` | Chevron collage | A story with a photo, optional call to action | title, 2 blocks, source |
| `c` | Editorial big type | A manifesto or reframe line with a photo | headline, body |
| `d` | Big stat card | One huge number and one sentence | number, sentence, source |

Each content file says which layout it uses in its `"template"` line.

## What goes in a content file

Fields marked (optional) can be left out or left as `""`.

**All layouts**
- `"template"`: `"a"`, `"b"`, `"c"` or `"d"`.
- `"verified"`: `true` only when every number and claim was checked against `linkedin-stat-bank.md` and the wording is copied from its "Say" column. Otherwise `false`.
- `"theme"` (optional, layouts a and d): `"dark"` (navy, the default) or `"light"` (paper). Pictures of both are in `variants/`.

**Layout a**: `"kicker"` (optional small label), `"title"`, `"stat"`, `"source"`, `"spokes"` (exactly 3, each with `"icon"`, `"heading"`, `"body"`).
Icons you can use: `cap`, `scales`, `handshake`, `compass`, `book`, `chart`, `chat`, `calendar`.

**Layout b**: `"title"`, `"blocks"` (exactly 2, each with `"heading"` and `"body"`), `"source"`, `"stat"` (optional lead line above the blocks), `"cta"` (optional, `"label"` and `"url"`; leave it out for no blue call-to-action band), `"photo"` (optional wide photo at the top), `"photo2"` (optional small photo).

**Layout c**: `"headline"`, `"body"`, `"photo"` (optional), `"url"` (optional), `"handle"` (optional), `"source"` (optional). The blue footer band disappears if both `url` and `handle` are empty.

**Layout d**: `"kicker"` (optional), `"number"` (for example `"372"` or `"1 in 6"`), `"sentence"`, `"subline"` (optional smaller line under the sentence), `"source"`.

**One accent word:** wrap a word or short phrase in asterisks in a title or headline, like `"From Gatekeeping to *Equal Access*"`, and it is set in the italic serif. One per headline.

**Photos (optional):** put the image file in the `photos/` folder and write its path, for example `"photo": "photos/campus.jpg"`. Use a landscape photo, at least 1200 pixels wide. To shift which part of the photo shows, add `"photo_position": "50% 30%"` (left-right, top-bottom). If you give no photo, a blue pattern built from the D2Excel oval fills the space, so there is never a blank hole.

## Where the PNG goes and what it is called

`content/out/<file name>-1200x1200.png` (square) and `content/out/<file name>-1080x1350.png` (4:5, takes more room in the feed). Use `--size 1080x1350` to choose one size, and `--template d` to force a layout.

If `"verified"` is `false`, the name ends in `-SAMPLE-unverified.png`. Do not post those. Even for `true` files, open the source the day you post.

## How to check the PNG

The command checks the picture for you and refuses to write it if any of these fail (a copy of the failed picture goes to `content/out/failed/` so you can see why):

- a required field is missing or misspelled (an unknown field name is an error too);
- text runs outside its box, is clipped, is too close to the edge (under 40 px), or overlaps other text;
- any text is below the size floor: 30 px, or 24 px for source and label lines (measured on the 1200 px wide picture);
- any text has too little contrast against what is behind it (4.5 to 1 for normal text, 3 to 1 for very large type), measured from the rendered pixels.

If it fails, shorten the text or fix the field and run again. Then open the PNG and read every word once. If a field contains an em dash or en dash you get a warning (not a failure); the house style uses a comma, a colon or a hyphen.

## Setup (once)

Nothing to install. The command uses Node and the Playwright that is already on this Mac (`/opt/homebrew/lib/node_modules/@playwright/cli/node_modules/playwright-core`) and any Chromium in `~/Library/Caches/ms-playwright`. If it says Playwright or Chromium was not found, tell whoever maintains the Mac; do not install anything globally.

## Brand rules built in

- The logo (`assets/logo-tight.png`) is never recoloured. On dark backgrounds it sits on a light oval plate.
- Fonts: Geist (text) and Instrument Serif italic (one accent word), stored locally in `assets/fonts/`. Colours are the same blue and red as the website.
- Don't add statistics that are not in `linkedin-stat-bank.md`.

## Folder map

- `content/` your post files (and `out/` with the pictures)
- `templates/` the four layouts (HTML)
- `brand.css`, `fill.js` shared look and the code that fills in the words
- `assets/` logo, fonts, icons (Phosphor, MIT license)
- `photos/` put photos here
- `variants/` design test pictures (not for posting)

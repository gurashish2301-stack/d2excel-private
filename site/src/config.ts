export const SITE_NAME = 'D2Excel';
export const SITE_URL = 'https://d2excel.com';

// DEMO FLAG: while true, every page is marked noindex and robots.txt blocks crawlers.
// Flip to true -> false only when the real site is approved to go public.
export const NOINDEX = true;

// WebPage and BreadcrumbList JSON-LD for an inner page (Home > page).
export const pageLd = (name: string, description: string, path: string) => {
  const url = new URL(path, SITE_URL).href;
  const ctx = 'https://schema.org';
  return [
    { '@context': ctx, '@type': 'WebPage', name, description, url, inLanguage: 'en', isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL } },
    { '@context': ctx, '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name, item: url },
    ] },
  ];
};

export const NAV = [
  { href: '/for-students/', label: 'For students' },
  { href: '/for-counselors/', label: 'For counselors' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/guides/', label: 'Guides' },
  { href: '/about/', label: 'About' },
];

// '2026-09' -> 'Sep 2026' (or 'September 2026')
export const fmtMonth = (ym: string, long = false) =>
  new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-US', { month: long ? 'long' : 'short', year: 'numeric', timeZone: 'UTC' });

// ---- guides ----
// Hub and previous/next order: guides with a deadline first. A guide not listed here sorts after these, by title.
export const GUIDE_ORDER = ['uc-application', 'college-money', 'sat-or-act', 'major-worth', 'ai-and-your-application', 'choose-a-counselor'];
export const sortGuides = <T extends { id: string; data: { title: string } }>(list: T[]) => {
  const rank = (g: T) => { const i = GUIDE_ORDER.indexOf(g.id); return i < 0 ? GUIDE_ORDER.length : i; };
  return [...list].sort((a, b) => rank(a) - rank(b) || a.data.title.localeCompare(b.data.title));
};

// One tile colour and glyph per category. Unknown categories fall back to sand and the book glyph.
const CATEGORY: Record<string, { tile: string; icon: string }> = {
  'Applications': { tile: 'tile-blue', icon: 'calendar' },
  'Funding': { tile: 'tile-ink', icon: 'coin' },
  'Testing': { tile: 'tile-sky', icon: 'pencil' },
  'Majors and careers': { tile: 'tile-sand', icon: 'compass' },
  'AI': { tile: 'tile-sky', icon: 'book' },
  'Choosing help': { tile: 'tile-sand', icon: 'people' },
};
export const categoryLook = (c: string) => CATEGORY[c] ?? { tile: 'tile-sand', icon: 'book' };
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Reading time from the Markdown body, ignoring internal comments. About 220 words a minute.
export const readMinutes = (body = '') =>
  Math.max(1, Math.round(body.replace(/<!--[\s\S]*?-->/g, ' ').split(/\s+/).filter(Boolean).length / 220));

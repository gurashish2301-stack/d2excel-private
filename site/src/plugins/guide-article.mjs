// Rehype plugin for the guide articles. It only changes how the Markdown is presented; it never edits the words.
//  - drops HTML comments (the guides carry internal notes as <!-- INTERNAL: ... -->, which must never render)
//  - lifts the doc's brand strip and kicker line into front matter data (kicker), and styles the opening paragraph
//  - turns the "Quick answer" / "The short answer" quote into a callout
//  - wraps tables (data-label per cell for the phone layout) and tags key-dates tables
//  - wraps the Sources section and links bare domains that the front matter lists with a url
const textOf = (n) => (n.type === 'text' ? n.value : (n.children ?? []).map(textOf).join(''));
const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const isEl = (n, tag) => n.type === 'element' && (!tag || n.tagName === tag);
const cls = (n) => [].concat(n.properties?.className ?? []);
const addClass = (n, ...c) => { n.properties = { ...n.properties, className: [...cls(n), ...c] }; };

function strip(node) {
  if (!node.children) return;
  node.children = node.children.filter((c) => c.type !== 'comment' && !(c.type === 'raw' && /^\s*<!--[\s\S]*-->\s*$/.test(c.value)));
  node.children.forEach(strip);
}

function linkify(node, url) {
  const href = /^https?:/i.test(url) ? url : `https://${url}`;
  const needle = url.replace(/^https?:\/\//i, '').toLowerCase();
  const out = [];
  for (const c of node.children ?? []) {
    const at = c.type === 'text' ? c.value.toLowerCase().indexOf(needle) : -1;
    if (at < 0) { if (c.children) linkify(c, url); out.push(c); continue; }
    const end = at + needle.length;
    if (at) out.push({ type: 'text', value: c.value.slice(0, at) });
    out.push(el('a', { href, rel: 'noopener noreferrer' }, [{ type: 'text', value: c.value.slice(at, end) }]));
    if (end < c.value.length) out.push({ type: 'text', value: c.value.slice(end) });
  }
  node.children = out;
}

function table(t, heading) {
  const heads = [];
  const walk = (n) => {
    if (!isEl(n)) return;
    if (n.tagName === 'table') n.properties = { ...n.properties, role: 'table' };
    else if (n.tagName === 'thead' || n.tagName === 'tbody') n.properties = { ...n.properties, role: 'rowgroup' };
    else if (n.tagName === 'tr') n.properties = { ...n.properties, role: 'row' };
    else if (n.tagName === 'th') { n.properties = { ...n.properties, role: 'columnheader' }; heads.push(textOf(n).trim()); }
    n.children?.forEach(walk);
  };
  const head = t.children.find((c) => isEl(c, 'thead'));
  if (head) walk(head);
  t.properties = { ...t.properties, role: 'table' };
  const body = t.children.find((c) => isEl(c, 'tbody'));
  body?.children.filter((r) => isEl(r, 'tr')).forEach((r) => {
    r.properties = { ...r.properties, role: 'row' };
    r.children.filter((c) => isEl(c)).forEach((c, i) => { c.properties = { ...c.properties, role: 'cell', 'data-label': heads[i] ?? '' }; });
  });
  if (body) body.properties = { ...body.properties, role: 'rowgroup' };
  return el('div', { className: ['table-wrap', ...(/dates/i.test(heading) ? ['table-dates'] : [])] }, [t]);
}

export default function guideArticle() {
  return (tree, file) => {
    const fm = file.data?.astro?.frontmatter ?? {};
    strip(tree);
    const keep = tree.children.filter((c) => c.type !== 'text' || c.value.trim());
    let i = 0;

    // Brand strip and kicker line that the Drive export puts above the intro
    let kicker = '';
    if (isEl(keep[0], 'p') && /^D2EXCEL\b/.test(textOf(keep[0]).trim())) {
      i = 1;
      const t = textOf(keep[1] ?? { type: 'text', value: '' }).trim();
      if (isEl(keep[1], 'p') && t && t === t.toUpperCase() && t.length < 120) { kicker = t; i = 2; }
    }
    const rest = keep.slice(i);
    if (kicker) fm.kicker = kicker;

    const out = [];
    let heading = '';
    let sources = null;
    let lead = !!kicker;
    for (const n of rest) {
      if (sources) { sources.children.push(n); continue; }
      if (isEl(n, 'h2') || isEl(n, 'h3')) heading = textOf(n).trim();
      if (isEl(n, 'h2') && /^sources\b/i.test(heading)) { sources = el('section', { className: ['sources'] }, [n]); out.push(sources); continue; }
      if (isEl(n, 'p')) {
        if (lead) { addClass(n, 'p-lead'); }
        else if (/^Written by\b/.test(textOf(n).trim())) addClass(n, 'byline');
        lead = false;
      }
      if (isEl(n, 'blockquote')) {
        const first = n.children.find((c) => isEl(c, 'p'));
        const strong = first?.children.find((c) => isEl(c, 'strong'));
        if (strong && /^(quick answer|the short answer)/i.test(textOf(strong).trim()) && !fm.hasQuick) {
          fm.hasQuick = true;
          const kids = n.children;
          // "QUICK ANSWER" stands alone as a label. "The short answer: ..." runs into its sentence, so a label is added above it.
          if (first.children.filter((c) => c.type !== 'text' || c.value.trim()).length === 1) addClass(first, 'callout-label');
          else kids.unshift(el('p', { className: ['callout-label'] }, [{ type: 'text', value: 'Quick answer' }]));
          out.push(el('div', { className: ['callout', 'callout-answer'], id: 'quick-answer' }, kids));
          lead = false;
          continue;
        }
      }
      if (isEl(n, 'table')) { out.push(table(n, heading)); continue; }
      out.push(n);
    }

    if (sources) {
      for (const n of sources.children) {
        if (isEl(n, 'p') && /^Last verified\b/i.test(textOf(n).trim())) addClass(n, 'verified-line');
      }
      for (const s of fm.sources ?? []) {
        if (s?.url) sources.children.filter((n) => isEl(n, 'ul')).forEach((ul) => ul.children.filter((li) => isEl(li, 'li') && textOf(li).toLowerCase().includes(s.url.toLowerCase().replace(/^https?:\/\//, ''))).forEach((li) => linkify(li, s.url)));
      }
    }
    tree.children = out;
  };
}

#!/usr/bin/env node
/* Renders a D2Excel LinkedIn graphic from a content JSON file.
   node render.mjs <content.json> [--size 1200x1200|1080x1350] [--template a|b|c|d]
   Writes <json folder>/out/<name>-<size>[-SAMPLE-unverified].png. Fails loudly (exit 1, no PNG in out/) when a check fails. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const KIT = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const SIZES = { '1200x1200': [1200, 1200], '1080x1350': [1080, 1350] };   // 1080x1350 is laid out at 1200x1500 and scaled by 0.9
const TEMPLATES = {
  a: { file: 'a-hub.html', theme: 'dark', req: ['title', 'stat', 'source', 'spokes'], opt: ['kicker', 'theme'] },
  b: { file: 'b-chevron.html', req: ['title', 'blocks', 'source'], opt: ['stat', 'cta', 'photo', 'photo2', 'photo_position', 'photo2_position'] },
  c: { file: 'c-editorial.html', req: ['headline', 'body'], opt: ['photo', 'photo_position', 'url', 'handle', 'source'] },
  d: { file: 'd-stat.html', theme: 'dark', req: ['number', 'sentence', 'source'], opt: ['subline', 'kicker', 'theme'] },
};
const EDGE = 40;   // text must stay this far from the picture edge (CSS px at 1200 wide)

const isStr = v => typeof v === 'string' && v.trim() !== '';

function validate(data, key, icons) {
  const t = TEMPLATES[key];
  const errs = [];
  const allowed = ['template', 'verified', ...t.req, ...t.opt];
  for (const k of Object.keys(data)) if (!k.startsWith('_') && !allowed.includes(k)) errs.push(`unknown field "${k}" (allowed: ${allowed.join(', ')})`);
  if (typeof data.verified !== 'boolean') errs.push('"verified" must be true or false');
  for (const k of t.req) if (data[k] === undefined || data[k] === null || data[k] === '') errs.push(`required field "${k}" is missing`);
  for (const k of [...t.req, ...t.opt]) {
    if (['spokes', 'blocks', 'cta'].includes(k)) continue;
    if (data[k] !== undefined && data[k] !== '' && !isStr(data[k])) errs.push(`"${k}" must be text`);
  }
  if (data.theme !== undefined && !['dark', 'light'].includes(data.theme)) errs.push('"theme" must be "dark" or "light"');
  const items = (name, n, keys) => {
    if (data[name] === undefined || data[name] === '') return;
    if (!Array.isArray(data[name]) || data[name].length !== n) { errs.push(`"${name}" must be a list of exactly ${n}`); return; }
    data[name].forEach((it, i) => keys.forEach(k => { if (!isStr(it?.[k])) errs.push(`${name}[${i + 1}] is missing "${k}"`); }));
  };
  if (key === 'a') {
    items('spokes', 3, ['icon', 'heading', 'body']);
    if (Array.isArray(data.spokes)) data.spokes.forEach((s, i) => { if (isStr(s?.icon) && !icons.includes(s.icon)) errs.push(`spokes[${i + 1}] icon "${s.icon}" is not one of: ${icons.join(', ')}`); });
  }
  if (key === 'b') {
    items('blocks', 2, ['heading', 'body']);
    if (data.cta !== undefined && data.cta !== '') ['label', 'url'].forEach(k => { if (!isStr(data.cta?.[k])) errs.push(`cta is missing "${k}"`); });
  }
  return errs;
}

function warnings(data) {
  const out = [];
  const walk = (v, p) => {
    if (typeof v === 'string' && /[–—]/.test(v) && !p.startsWith('_')) out.push(`"${p}" has an en or em dash; house style uses a comma, colon or hyphen`);
    else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => walk(x, p ? `${p}.${k}` : k));
  };
  walk(data, '');
  return out;
}

function resolvePhoto(p, errs, field) {
  const abs = path.isAbsolute(p) ? p : path.join(KIT, p);
  if (!fs.existsSync(abs)) { errs.push(`"${field}" file not found: ${p} (put the photo in the photos folder and write photos/<name>)`); return p; }
  return pathToFileURL(abs).href;
}

/* ---- runs inside the page ---- */
function auditInPage({ H, edge }) {
  const slide = document.querySelector('.slide');
  const problems = [];
  const items = [];
  const short = t => `"${t.slice(0, 50)}"`;
  const walker = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode());) {
    const text = n.nodeValue.replace(/\s+/g, ' ').trim();
    if (!text) continue;
    const el = n.parentElement;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const range = document.createRange();
    range.selectNodeContents(n);
    const size = parseFloat(cs.fontSize);
    const lh = cs.lineHeight === 'normal' ? size * 1.2 : parseFloat(cs.lineHeight);
    const rects = [...range.getClientRects()].filter(r => r.width > 1 && r.height > 1).map(r => {
      const h = Math.min(r.height, Math.max(lh, size * 0.9));        // ink box, not the taller font content box
      return { x: r.left, y: r.top + (r.height - h) / 2, w: r.width, h };
    });
    if (!rects.length) continue;
    let block = el;
    while (getComputedStyle(block).display === 'inline') block = block.parentElement;
    const m = el.closest('[data-min]');
    items.push({ text, size, color: cs.color, rects, block, min: m ? Number(m.dataset.min) : 30 });
  }
  const flagged = new Set();
  for (const it of items) {
    if (it.size < it.min - 0.01) problems.push(`text too small: ${short(it.text)} is ${it.size}px, the minimum is ${it.min}px`);
    if (it.rects.some(r => r.x < edge || r.y < edge || r.x + r.w > 1200 - edge || r.y + r.h > H - edge)) problems.push(`text outside the safe margin (${edge}px) or the picture: ${short(it.text)}`);
    for (let e = it.block; e && e !== slide; e = e.parentElement) {
      const b = e.getBoundingClientRect();
      if (it.rects.some(r => r.x < b.left - 1 || r.x + r.w > b.right + 1 || r.y < b.top - 1 || r.y + r.h > b.bottom + 1)) {
        if (!flagged.has(e)) problems.push(`text overflows or is clipped by its box <${e.tagName.toLowerCase()} class="${e.className}">: ${short(it.text)} (shorten the text)`);
        flagged.add(e);
        break;
      }
    }
  }
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    if (items[i].block === items[j].block) continue;
    const hit = items[i].rects.some(a => items[j].rects.some(b => Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 2 && Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 2));
    if (hit) problems.push(`text overlaps text: ${short(items[i].text)} and ${short(items[j].text)}`);
  }
  document.querySelectorAll('img').forEach(img => { if (!img.complete || img.naturalWidth === 0) problems.push(`image did not load: ${img.getAttribute('src')}`); });
  return { problems, items: items.map(({ text, size, color, rects }) => ({ text, size, color, rects })) };
}

async function contrastInPage({ b64, items }) {
  const img = new Image();
  img.src = 'data:image/png;base64,' + b64;
  await img.decode();
  const cv = document.createElement('canvas');
  cv.width = img.width; cv.height = img.height;
  const g = cv.getContext('2d', { willReadFrequently: true });
  g.drawImage(img, 0, 0);
  const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  return items.map(it => {
    const m = it.color.match(/rgba?\(([^)]+)\)/)[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    const a = m.length > 3 ? m[3] : 1;
    const ratios = [];
    for (const q of it.rects) {
      const x0 = Math.max(0, Math.floor(q.x)), y0 = Math.max(0, Math.floor(q.y));
      const x1 = Math.min(img.width, Math.ceil(q.x + q.w)), y1 = Math.min(img.height, Math.ceil(q.y + q.h));
      if (x1 <= x0 || y1 <= y0) continue;
      const d = g.getImageData(x0, y0, x1 - x0, y1 - y0).data, w = x1 - x0;
      for (let y = 0; y < y1 - y0; y += 3) for (let x = 0; x < w; x += 3) {
        const i = (y * w + x) * 4, bg = [d[i], d[i + 1], d[i + 2]];
        const l1 = lum([0, 1, 2].map(k => a * m[k] + (1 - a) * bg[k])), l2 = lum(bg);
        ratios.push((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
      }
    }
    ratios.sort((p, q) => p - q);
    return { text: it.text, size: it.size, ratio: ratios.length ? ratios[Math.floor(ratios.length * 0.05)] : null };
  });
}

/* ---- browser ---- */
function loadChromium() {
  const candidates = [process.env.PLAYWRIGHT_CORE, 'playwright', 'playwright-core', '/opt/homebrew/lib/node_modules/@playwright/cli/node_modules/playwright-core'].filter(Boolean);
  for (const c of candidates) { try { return require(c).chromium; } catch { /* try next */ } }
  throw new Error('Playwright was not found. See README.md ("Setup").');
}

export async function launch() {
  const chromium = loadChromium();
  try { return await chromium.launch(); } catch { /* browser revision mismatch: use any installed Chromium */ }
  const cache = path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright');
  const rev = d => parseInt(d.split('-').pop(), 10);
  const dirs = fs.existsSync(cache) ? fs.readdirSync(cache) : [];
  const find = (prefix, sub, rel) => dirs.filter(d => d.startsWith(prefix)).sort((a, b) => rev(b) - rev(a)).map(d => {
    const inner = fs.readdirSync(path.join(cache, d)).find(n => n.startsWith(sub));
    return inner && path.join(cache, d, inner, ...rel);
  }).filter(p => p && fs.existsSync(p));
  const exe = [
    ...find('chromium_headless_shell-', 'chrome-headless-shell-', ['chrome-headless-shell']),
    ...find('chromium-', 'chrome-mac', ['Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing']),
  ][0];
  if (!exe) throw new Error('No Chromium found for Playwright. Run "npx playwright install chromium" once, or see README.md.');
  return chromium.launch({ executablePath: exe });
}

async function openSlide(browser, file, data, H, dsf) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: H }, deviceScaleFactor: dsf });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(`page error: ${e.message}`));
  page.on('requestfailed', r => errors.push(`file failed to load: ${r.url()}`));
  await page.goto(pathToFileURL(path.join(KIT, 'templates', file)).href);
  const sprite = fs.readFileSync(path.join(KIT, 'assets', 'icons.svg'), 'utf8');
  await page.evaluate(async ({ H, sprite, data, theme }) => {
    document.documentElement.style.setProperty('--h', H + 'px');
    if (theme) document.body.dataset.theme = theme;
    document.body.classList.toggle('tall', H > 1200);
    const doc = new DOMParser().parseFromString(sprite, 'image/svg+xml');
    document.body.prepend(document.importNode(doc.documentElement, true));
    await window.d2eFill(data);
  }, { H, sprite, data, theme: data.theme });
  return { ctx, page, errors };
}

/* Renders one content file at one size. Returns { ok, out, problems, warns, lowest }. */
export async function renderOne(browser, jsonPath, sizeKey, forcedTemplate) {
  const res = { ok: false, json: jsonPath, size: sizeKey, problems: [], warns: [], lowest: null, out: null };
  let data;
  try { data = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch (e) { res.problems.push(`not valid JSON: ${e.message}`); return res; }
  const key = (forcedTemplate || data.template || '').toLowerCase();
  if (!TEMPLATES[key]) { res.problems.push(`unknown template "${key}": use a, b, c or d`); return res; }
  const icons = [...fs.readFileSync(path.join(KIT, 'assets', 'icons.svg'), 'utf8').matchAll(/id="icon-([a-z]+)"/g)].map(m => m[1]);
  res.problems.push(...validate(data, key, icons));
  res.warns.push(...warnings(data));
  for (const f of ['photo', 'photo2']) if (isStr(data[f])) data[f] = resolvePhoto(data[f], res.problems, f);
  if (res.problems.length) return res;

  const tpl = TEMPLATES[key];
  const [outW, outH] = SIZES[sizeKey];
  const H = Math.round(outH * 1200 / outW);
  const base = path.basename(jsonPath, '.json');
  const name = `${base}-${sizeKey}${data.verified ? '' : '-SAMPLE-unverified'}.png`;
  const outDir = path.join(path.dirname(jsonPath), 'out');
  const withTheme = { ...data, theme: data.theme || tpl.theme };

  // 1) checks, always at 1:1
  const check = await openSlide(browser, tpl.file, withTheme, H, 1);
  try {
    res.problems.push(...check.errors);
    const audit = await check.page.evaluate(auditInPage, { H, edge: EDGE });
    res.problems.push(...audit.problems);
    await check.page.addStyleTag({ content: '*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}' });
    const shot = await check.page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: H } });
    const ratios = await check.page.evaluate(contrastInPage, { b64: shot.toString('base64'), items: audit.items });
    for (const r of ratios) {
      if (r.ratio === null) continue;
      const need = r.size >= 40 ? 3 : 4.5;
      if (res.lowest === null || r.ratio < res.lowest) res.lowest = r.ratio;
      if (r.ratio < need) res.problems.push(`contrast ${r.ratio.toFixed(2)}:1 is under ${need}:1 for "${r.text.slice(0, 50)}" (${r.size}px)`);
    }
  } finally { await check.ctx.close(); }

  // 2) the real picture at export scale
  const final = await openSlide(browser, tpl.file, withTheme, H, outW / 1200);
  try {
    const dir = res.problems.length ? path.join(outDir, 'failed') : outDir;
    fs.mkdirSync(dir, { recursive: true });
    res.out = path.join(dir, name);
    await final.page.screenshot({ path: res.out, clip: { x: 0, y: 0, width: 1200, height: H } });
  } finally { await final.ctx.close(); }
  res.ok = res.problems.length === 0;
  res.verified = data.verified;
  return res;
}

export function report(r) {
  const rel = p => path.relative(process.cwd(), p) || p;
  const head = `${r.ok ? 'OK  ' : 'FAIL'} ${rel(r.json)}  ${r.size}`;
  console.log(r.ok ? `${head}  ->  ${rel(r.out)}${r.lowest ? `  (lowest contrast ${r.lowest.toFixed(1)}:1)` : ''}` : head);
  r.problems.forEach(p => console.log(`       - ${p}`));
  if (!r.ok && r.out) console.log(`       (failed picture saved for inspection: ${rel(r.out)})`);
  r.warns.forEach(w => console.log(`       ! ${w}`));
  if (r.ok && r.verified === false) console.log('       ! "verified" is false: file is marked SAMPLE-unverified, do not post it');
}

function parseArgs(argv) {
  const o = { file: null, size: null, template: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--size') o.size = argv[++i];
    else if (argv[i] === '--template') o.template = argv[++i];
    else if (!o.file) o.file = argv[i];
    else { console.error(`Unexpected argument: ${argv[i]}`); process.exit(2); }
  }
  return o;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const a = parseArgs(process.argv.slice(2));
  if (!a.file || (a.size && !SIZES[a.size])) {
    console.error(`Usage: node render.mjs <content.json> [--size ${Object.keys(SIZES).join('|')}] [--template a|b|c|d]`);
    process.exit(2);
  }
  const browser = await launch();
  let failed = false;
  try {
    for (const s of a.size ? [a.size] : Object.keys(SIZES)) {
      const r = await renderOne(browser, path.resolve(a.file), s, a.template);
      report(r);
      failed ||= !r.ok;
    }
  } finally { await browser.close(); }
  process.exit(failed ? 1 : 0);
}

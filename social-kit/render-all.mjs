#!/usr/bin/env node
/* Renders every content/*.json at both sizes. node render-all.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch, renderOne, report } from './render.mjs';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'content');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().map(f => path.join(dir, f));
const browser = await launch();
let failed = 0;
try {
  for (const f of files) for (const size of ['1200x1200', '1080x1350']) {
    const r = await renderOne(browser, f, size);
    report(r);
    if (!r.ok) failed++;
  }
} finally { await browser.close(); }
console.log(failed ? `\n${failed} render(s) failed` : `\nAll ${files.length * 2} renders passed`);
process.exit(failed ? 1 : 0);

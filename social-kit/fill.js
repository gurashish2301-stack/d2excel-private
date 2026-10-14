/* Fills a template from a content object, then fits text. Used by render.mjs; text goes in as plain text, never HTML.
   data-f="path"      text from content (hidden when empty). *word* becomes the serif-italic accent.
   data-show="a|b"    element shown only when any listed path has a value.
   data-each="path"   repeat the child <template> once per array item (paths inside are relative to the item).
   data-icon="path"   sets href="#icon-<value>" on a <use>.
   data-photo="path"  on .slot: inserts the photo; keeps the pattern when empty. data-pos="path" sets object-position.
   data-fit="min,max" shrinks font-size (px) until the element's text fits its box; render.mjs fails if it still doesn't. */
(() => {
  const get = (ctx, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), ctx);
  const has = v => v !== undefined && v !== null && String(v).trim() !== '';

  function setText(el, value) {
    el.textContent = '';
    const typo = s => s.replace(/(\w)'(\w)/g, '$1\u2019$2').replace(/"([^"]+)"/g, '\u201C$1\u201D');
    typo(String(value)).split(/(\*[^*]+\*)/).forEach(part => {
      if (/^\*[^*]+\*$/.test(part)) {
        const em = document.createElement('em');
        em.className = 'accent';
        em.textContent = part.slice(1, -1);
        el.append(em);
      } else if (part) {
        // hyphenated compounds (four-year, 2004-09) stay on one line
        part.split(/(\S+-\S+)/).forEach((piece, i) => {
          if (i % 2) { const s = document.createElement('span'); s.className = 'nb'; s.textContent = piece; el.append(s); }
          else if (piece) el.append(piece);
        });
      }
    });
  }

  function bind(root, ctx, pending) {
    const lists = [...root.querySelectorAll('[data-each]')];
    root.querySelectorAll('[data-f],[data-show],[data-icon],[data-photo]').forEach(el => {
      const d = el.dataset;
      if (d.show !== undefined && !d.show.split('|').some(p => has(get(ctx, p)))) el.hidden = true;
      if (d.f !== undefined) { const v = get(ctx, d.f); if (has(v)) setText(el, v); else el.hidden = true; }
      if (d.icon !== undefined) el.setAttribute('href', '#icon-' + get(ctx, d.icon));
      if (d.photo !== undefined) {
        const src = get(ctx, d.photo);
        if (has(src)) {
          const img = document.createElement('img');
          img.alt = '';
          img.src = src;
          if (d.pos && has(get(ctx, d.pos))) img.style.objectPosition = get(ctx, d.pos);
          el.prepend(img);
          el.dataset.hasPhoto = '';
          pending.push(img.decode());
        }
      }
    });
    lists.forEach(list => {
      const tpl = list.querySelector(':scope > template');
      (get(ctx, list.dataset.each) || []).forEach(item => {
        const frag = tpl.content.cloneNode(true);
        bind(frag, item, pending);
        list.append(frag);
      });
    });
  }

  function fit() {
    document.querySelectorAll('[data-fit]').forEach(el => {
      const [min, max] = el.dataset.fit.split(',').map(Number);
      const capped = getComputedStyle(el).maxHeight !== 'none';
      // text height measured the way render.mjs does: line boxes, not the taller glyph overflow
      const inkOver = size => {
        const cs = getComputedStyle(el), lh = cs.lineHeight === 'normal' ? size * 1.2 : parseFloat(cs.lineHeight);
        const range = document.createRange();
        range.selectNodeContents(el);
        const bottom = Math.max(...[...range.getClientRects()].map(r => { const h = Math.min(r.height, Math.max(lh, size * 0.9)); return r.top + (r.height + h) / 2; }));
        return bottom > el.getBoundingClientRect().top + el.clientHeight + 1;
      };
      let size = max;
      el.style.fontSize = size + 'px';
      while (size > min && (el.scrollWidth > el.clientWidth + 1 || (capped && inkOver(size)))) {
        size -= 2;
        el.style.fontSize = size + 'px';
      }
    });
  }

  window.d2eFill = async data => {
    const pending = [];
    bind(document, data, pending);
    await Promise.all(pending);
    await document.fonts.ready;
    fit();
    if (window.d2eLayout) window.d2eLayout();
  };
})();

// Design-system behaviour. Everything here is progressive enhancement: with this file absent the page is complete.
const root = document.documentElement;
root.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Logo reveal: GSAP and Flip load only on the first page of a session (the head script sets html.intro)
if (root.classList.contains('intro')) {
  (window as any).__d2e = true; // tells the head script's 3 second fallback that we took over
  const end = () => { root.classList.remove('intro', 'intro-open'); dispatchEvent(new Event('d2e:intro-reveal')); };
  import('./intro').then((m) => m.playIntro(end)).catch(end);
}

// Mobile menu
const top = document.querySelector<HTMLElement>('.nav-top');
const menu = top?.querySelector<HTMLButtonElement>('.nav-menu');
if (top && menu) {
  const set = (open: boolean) => { top.classList.toggle('is-open', open); menu.setAttribute('aria-expanded', String(open)); };
  menu.addEventListener('click', () => set(!top.classList.contains('is-open')));
  top.addEventListener('keydown', (e) => { if (e.key === 'Escape' && top.classList.contains('is-open')) { set(false); menu.focus(); } });
  top.addEventListener('click', (e) => { if ((e.target as Element).closest('.nav-links a')) set(false); });
}

// Bottom dock: appears after the first scroll (at rest it would sit over the hero art on a phone), highlights the section in view,
// and slides away over the footer so it never covers the end of the page. `data-on` is the visible state; without JS it is a static pill after the footer.
const dock = document.querySelector<HTMLElement>('.nav-dock');
if (dock) {
  let scrolled = scrollY > 48, atFooter = false;
  const sync = () => { const on = scrolled && !atFooter; dock.toggleAttribute('data-on', on); dock.inert = !on; };
  sync();
  addEventListener('scroll', () => { const s = scrollY > 48; if (s !== scrolled) { scrolled = s; sync(); } }, { passive: true });
  const links = [...dock.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const map = new Map(links.map((a) => [document.querySelector(a.hash), a] as const));
  const seen = new Map<Element, number>();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
    let best: Element | null = null, bestR = 0;
    seen.forEach((r, el) => { if (r > bestR) { best = el; bestR = r; } });
    links.forEach((a) => a.removeAttribute('aria-current'));
    if (best) {
      const a = map.get(best);
      a?.setAttribute('aria-current', 'true');
      a?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    }
  }, { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] });
  map.forEach((_, el) => el && io.observe(el));
  const footer = document.querySelector('.footer');
  if (footer) new IntersectionObserver(([e]) => { atFooter = e.isIntersecting; sync(); }, { threshold: 0.15 }).observe(footer);
}

if (!reduce && finePointer) {
  // Spotlight: write the cursor position into two custom properties on the card under it
  document.addEventListener('pointermove', (e) => {
    const card = (e.target as Element).closest<HTMLElement>('.card-spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  // Tilt: a few degrees toward the cursor, released on leave
  document.querySelectorAll<HTMLElement>('.card-tilt').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add('is-tilting');
      el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
    });
    el.addEventListener('pointerleave', () => { el.classList.remove('is-tilting'); el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); });
  });

  // Tilted wall: one write per frame to perspective-origin. Cards sit at different depths, so one property gives true parallax.
  document.querySelectorAll<HTMLElement>('.wall').forEach((wall) => {
    let tx = 50, ty = 50, cx = 50, cy = 50, raf = 0, visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(wall);
    const tick = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      wall.style.perspectiveOrigin = `${cx.toFixed(2)}% ${cy.toFixed(2)}%`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    addEventListener('pointermove', (e) => {
      if (!visible) return;
      tx = 50 + (e.clientX / innerWidth - 0.5) * 36;
      ty = 50 + (e.clientY / innerHeight - 0.5) * 28;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
  });
}

// Local time, Pacific. Intl only; no network.
document.querySelectorAll<HTMLElement>('[data-pt-time]').forEach((el) => {
  const f = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' });
  const set = () => { el.textContent = `${f.format(new Date())} PT`; el.hidden = false; };
  set();
  setInterval(set, 30000);
});

// Keyboard focus must never land under the top pill or the dock: re-centre if it does
addEventListener('focusin', (e) => {
  const t = e.target;
  if (!(t instanceof HTMLElement) || t.closest('.nav-top, .nav-dock')) return;
  // Story stack: a pinned card that a later card (or the next section) sits over is still "in view" to the browser,
  // so focus would land on hidden content. Scroll to where that card is the top one. Card n's natural top is the
  // list top plus n card-heights (plus their spacing).
  const li = t.closest<HTMLElement>('.step');
  if (li && getComputedStyle(li).position === 'sticky') {
    const r = t.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    if (hit && !t.contains(hit) && !hit.contains(t) && !hit.closest('.nav-top, .nav-dock')) {
      const lis = [...(li.parentElement?.children ?? [])] as HTMLElement[];
      const gap = parseFloat(getComputedStyle(lis[0]).marginBottom);
      const natural = li.parentElement!.getBoundingClientRect().top + scrollY + lis.indexOf(li) * (li.offsetHeight + gap);
      scrollTo({ top: natural - parseFloat(getComputedStyle(li).top), behavior: 'instant' });
    }
  }
  requestAnimationFrame(() => {
    const r = t.getBoundingClientRect();
    const navBottom = document.querySelector('.nav-top .nav-bar')?.getBoundingClientRect().bottom ?? 0;
    const dockEl = document.querySelector<HTMLElement>('.nav-dock');
    const dockTop = dockEl?.hasAttribute('data-on') ? dockEl.getBoundingClientRect().top : innerHeight;
    if (r.top < navBottom + 8 || r.bottom > dockTop - 8) t.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
});

// Table of contents: mark the heading in view (there is a side list and a collapsible one; both are kept in step)
const tocs = [...document.querySelectorAll<HTMLElement>('.toc')];
if (tocs.length) {
  const links = tocs.flatMap((t) => [...t.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]);
  const heads = [...new Set(links.map((a) => a.hash))].map((h) => document.querySelector(h)).filter(Boolean) as Element[];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => (a.hash === `#${e.target.id}` ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    });
  }, { rootMargin: '-15% 0px -70% 0px' });
  heads.forEach((h) => io.observe(h));
}

// Demo forms never send anything
document.querySelectorAll<HTMLFormElement>('form[data-demo-form]').forEach((f) =>
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = f.querySelector<HTMLElement>('[data-form-status]');
    const bad = [...f.querySelectorAll<HTMLInputElement>('[required]')].filter((i) => !i.value.trim());
    f.querySelectorAll('[aria-invalid]').forEach((i) => i.removeAttribute('aria-invalid'));
    f.querySelectorAll<HTMLElement>('[data-err]').forEach((n) => (n.hidden = true));
    if (bad.length) {
      bad.forEach((i) => { i.setAttribute('aria-invalid', 'true'); const m = f.querySelector<HTMLElement>(`[data-err="${i.name}"]`); if (m) m.hidden = false; });
      bad[0].focus();
      if (status) { status.hidden = false; status.classList.remove('ok'); status.textContent = 'Some fields need a look before this can be sent.'; }
      return;
    }
    if (status) { status.hidden = false; status.classList.add('ok'); status.textContent = 'Demo only: nothing was sent.'; }
  }),
);

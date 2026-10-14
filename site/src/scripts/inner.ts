// Inner pages: enhancements only. With this file absent, with reduced motion, or with scripts off, the page is complete and readable.
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Signature moment: the headline's words settle in one by one (GSAP SplitText), then the hand-drawn oval is drawn (DrawSVG).
// Only on later visits (the head script marks html.split): on the first page of a session the logo reveal is the moment,
// and GSAP's plugins would add about 6 kB to a first visit that already sits at the 40 kB budget. Words only translate, never fade.
const h1 = document.querySelector<HTMLElement>('.ih-title');
if (h1 && root.classList.contains('split') && !reduce) {
  Promise.all([import('gsap'), import('gsap/SplitText'), import('gsap/DrawSVGPlugin'), document.fonts.ready])
    .then(([{ gsap }, { SplitText }, { DrawSVGPlugin }]) => {
      gsap.registerPlugin(SplitText, DrawSVGPlugin);
      const words = SplitText.create(h1, { type: 'words' }).words;
      gsap.from(words, { yPercent: 24, duration: 0.9, ease: 'expo.out', stagger: 0.055 });
      const path = h1.querySelector<SVGPathElement>('.scribble path');
      if (path) {
        root.classList.add('draw');
        gsap.fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', delay: 0.5 });
      }
    })
    .catch(() => root.classList.remove('split'));
}

// Magnetic hero button: leans up to 8px toward a nearby cursor, fine pointers and motion allowed only (after React Bits "Magnet", MIT + Commons Clause; own code).
if (!reduce && finePointer) {
  const targets = [...document.querySelectorAll<HTMLElement>('[data-magnet]')];
  if (targets.length) {
    addEventListener('pointermove', (e) => {
      for (const el of targets) {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const reach = Math.max(r.width, r.height) * 0.9;
        if (Math.hypot(dx, dy) > reach) { el.style.translate = ''; continue; }
        const k = 0.18, cap = 8;
        el.style.translate = `${Math.max(-cap, Math.min(cap, dx * k)).toFixed(1)}px ${Math.max(-cap, Math.min(cap, dy * k)).toFixed(1)}px`;
      }
    }, { passive: true });
    document.addEventListener('pointerleave', () => targets.forEach((el) => (el.style.translate = '')));
  }
}

// How it works: Students | Counselors switch, as accessible tabs (arrow keys, Home and End, roving tabindex). With scripts off or
// reduced motion there is no switch and both lists stay visible one after the other.
const hiw = document.querySelector<HTMLElement>('[data-hiw]');
if (hiw && !reduce) {
  const list = hiw.querySelector<HTMLElement>('[role=tablist]')!;
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role=tab]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')!)!);
  const show = (i: number, focus = false) => {
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(j === i));
      t.tabIndex = j === i ? 0 : -1;
      panels[j].toggleAttribute('data-off', j !== i);
      panels[j].inert = j !== i;
    });
    list.style.setProperty('--i', String(i));
    if (focus) tabs[i].focus();
  };
  hiw.classList.add('is-tabs');
  show(0);
  list.addEventListener('click', (e) => {
    const i = tabs.indexOf((e.target as Element).closest<HTMLButtonElement>('[role=tab]')!);
    if (i > -1) show(i);
  });
  list.addEventListener('keydown', (e) => {
    const at = tabs.indexOf(document.activeElement as HTMLButtonElement);
    const to = e.key === 'ArrowRight' ? (at + 1) % tabs.length : e.key === 'ArrowLeft' ? (at - 1 + tabs.length) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1;
    if (to > -1) { e.preventDefault(); show(to, true); }
  });
}

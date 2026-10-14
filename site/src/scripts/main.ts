// Small, always-loaded behaviour. Animation libraries live in motion.ts and load only when motion is allowed.
const root = document.documentElement;

// Mobile menu
const header = document.querySelector<HTMLElement>('.site-header');
const menuBtn = document.querySelector<HTMLButtonElement>('.menu-btn');
if (header && menuBtn) {
  const setOpen = (open: boolean) => {
    header.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    window.dispatchEvent(new CustomEvent('d2e:scrolllock', { detail: open }));
  };
  menuBtn.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      setOpen(false);
      menuBtn.focus();
    }
  });
}

// Desktop nav: one pill slides to the hovered or focused link and rests on the current page
const nav = document.querySelector<HTMLElement>('.site-nav');
const pill = nav?.querySelector<HTMLElement>('.nav-pill');
if (nav && pill) {
  const place = (a: Element | null) => {
    if (!(a instanceof HTMLElement) || a.classList.contains('nav-join')) return;
    pill.style.setProperty('--x', `${a.offsetLeft}px`);
    pill.style.setProperty('--w', `${a.offsetWidth}px`);
    pill.classList.add('on');
  };
  const rest = () => {
    const current = nav.querySelector('[aria-current="page"]');
    current ? place(current) : pill.classList.remove('on');
  };
  nav.addEventListener('pointerover', (e) => place((e.target as Element).closest('a')));
  nav.addEventListener('focusin', (e) => place((e.target as Element).closest('a')));
  nav.addEventListener('pointerleave', rest);
  nav.addEventListener('focusout', rest);
  addEventListener('resize', rest);
  pill.style.transition = 'none'; // first placement should not slide in from the left
  document.fonts.ready.then(() => { rest(); requestAnimationFrame(() => (pill.style.transition = '')); });
}

// Pause / resume for the ambient background motion (WCAG 2.2.2)
const toggles = document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]');
const syncToggles = () => {
  const paused = root.hasAttribute('data-paused');
  toggles.forEach((b) => (b.querySelector('span')!.textContent = paused ? 'Resume motion' : 'Pause motion'));
};
syncToggles();
toggles.forEach((b) =>
  b.addEventListener('click', () => {
    root.toggleAttribute('data-paused');
    try { localStorage.setItem('d2e-paused', root.hasAttribute('data-paused') ? '1' : '0'); } catch {}
    syncToggles();
  }),
);

// PLACEHOLDER FORMS: nothing is sent anywhere. Replace this with the real form service before launch.
document.querySelectorAll<HTMLFormElement>('form[data-placeholder-form]').forEach((form) =>
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('[data-form-status]');
    if (status) status.textContent = 'Demo only: this form is a placeholder, so nothing was sent. It will connect to the real waitlist before launch.';
  }),
);

// Pre-select the role from links such as /join/?role=counselor
const role = new URLSearchParams(location.search).get('role');
const roleSelect = document.querySelector<HTMLSelectElement>('select[name="role"]');
if (role && roleSelect) roleSelect.value = role;

// Animation layer: only when the head script allowed it (no reduced-motion preference).
if (root.classList.contains('motion')) {
  import('./motion').catch(() => root.classList.remove('motion'));
}

// Join form (demo): inline validation that is announced, a success state, and the sweep. Sends nothing. With this file absent the form
// still validates natively and falls back to the #sent state (see join.astro).
const form = document.querySelector<HTMLFormElement>('form[data-join]');
if (form) {
  const card = form.closest<HTMLElement>('.jn-card')!;
  const sent = card.querySelector<HTMLElement>('.jn-sent')!;
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const radios = [...form.querySelectorAll<HTMLInputElement>('input[name=role]')];
  const email = form.querySelector<HTMLInputElement>('#email')!;
  const age = form.querySelector<HTMLInputElement>('#age')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  form.noValidate = true;

  // Each field: the control that takes focus, and the message when it is not right (empty string when it is).
  const fields: Record<string, { el: HTMLInputElement; bad: () => string }> = {
    role: { el: radios[0], bad: () => (radios.some((r) => r.checked) ? '' : 'Choose who you are, so we send the right updates.') },
    email: { el: email, bad: () => (email.validity.valid ? '' : email.validity.valueMissing ? 'Add your email address, like name@example.com.' : 'That email address does not look right. Try name@example.com.') },
    age: { el: age, bad: () => (age.checked ? '' : 'Please confirm this to join.') },
  };
  const check = (n: string) => {
    const msg = fields[n].bad();
    form.querySelector(`[data-err=${n}]`)!.textContent = msg;
    (n === 'role' ? radios : [fields[n].el]).forEach((c) => c.toggleAttribute('aria-invalid', !!msg));
    return !!msg;
  };

  const role = new URLSearchParams(location.search).get('role');
  radios.find((r) => r.value === role)?.click();

  form.addEventListener('focusout', (e) => { if ((e.target as HTMLInputElement) === email) check('email'); });
  form.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    const n = t.id || t.name;
    if (n in fields && form.querySelector(`[data-err=${n}]`)!.textContent) check(n);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = Object.keys(fields).filter(check);
    status.textContent = bad.length ? `Please check ${bad.length === 1 ? 'one field' : `${bad.length} fields`} before you join.` : '';
    if (bad.length) { fields[bad[0]].el.focus(); return; }
    const done = () => { card.classList.add('is-sent'); sent.focus({ preventScroll: true }); card.scrollIntoView({ block: 'start', behavior: 'instant' }); };
    const btn = form.querySelector('.btn-primary')!;
    btn.classList.add('is-sending');
    reduce ? done() : setTimeout(done, 650);
  });

  card.querySelector('[data-again]')!.addEventListener('click', (e) => {
    e.preventDefault();
    form.reset();
    form.querySelector('.is-sending')?.classList.remove('is-sending');
    card.classList.remove('is-sent');
    if (location.hash) history.replaceState(null, '', location.pathname);
    radios[0].focus();
  });
}

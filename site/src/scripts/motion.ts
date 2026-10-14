// Animation layer for the pages that have not been redesigned yet (the home page and the redesigned pages use scripts/system.ts).
// Loaded only when the visitor has not asked for reduced motion (see the head script in Layout.astro).
// Budget: Lenis always (about 5 kB); GSAP + ScrollTrigger only on pages with a set piece ([data-flow]);
// the logo reveal (intro.ts, GSAP + Flip) only on a visit's first page.
// Everything animates transform and opacity only. Without this file the site is fully readable and complete.
import Lenis from 'lenis';

const root = document.documentElement;

if (root.classList.contains('motion')) {
  (window as any).__d2e = true; // tells the head script's 3 second fallback that we took over
  init().catch(() => root.classList.remove('motion'));
}

// Drops the logo-reveal gates and tells anything waiting for it to start.
function endIntro() {
  root.classList.remove('intro', 'intro-open');
  dispatchEvent(new Event('d2e:intro-reveal'));
}

async function init() {
  if (root.classList.contains('intro')) import('./intro').then((m) => m.playIntro(endIntro)).catch(endIntro);

  if (!document.querySelector('[data-flow]')) {
    lockOnMenu(new Lenis({ autoRaf: true }));
    return;
  }

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  if (!root.classList.contains('motion')) return; // fallback already revealed the static page; do not fight it
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lockOnMenu(lenis);

  // Set piece: pinned how-it-works sequence. Desktop only; smaller screens get the stacked static version.
  const flow = document.querySelector<HTMLElement>('[data-flow]');
  if (flow) {
    gsap.matchMedia().add('(min-width: 900px) and (min-height: 700px)', () => {
      const steps = gsap.utils.toArray<HTMLElement>('.flow-step', flow);
      gsap.set(steps.slice(1), { opacity: 0.6 });
      gsap.set('.circ-s', { x: -90, opacity: 0.4 });
      gsap.set('.circ-c', { x: 90, opacity: 0.4 });
      gsap.set(['.lens', '.lens-label', '.lens-glow'], { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: flow, start: 'top top', end: '+=260%', pin: true, scrub: 0.6 },
      });
      tl.fromTo('.flow-rail-fill', { scaleY: 0.06 }, { scaleY: 1, duration: 3 }, 0)
        .addLabel('join', 1)
        .to(steps[0], { opacity: 0.6, duration: 0.3 }, 'join')
        .to(steps[1], { opacity: 1, duration: 0.3 }, 'join')
        .to(['.circ-s', '.circ-c'], { opacity: 1, duration: 0.6 }, 'join')
        .addLabel('meet', 2)
        .to(steps[1], { opacity: 0.6, duration: 0.3 }, 'meet')
        .to(steps[2], { opacity: 1, duration: 0.3 }, 'meet')
        .to(['.circ-s', '.circ-c'], { x: 0, duration: 0.9, ease: 'power2.inOut' }, 'meet')
        .to(['.lens', '.lens-label'], { opacity: 1, duration: 0.5 }, 'meet+=0.5')
        .addLabel('work', 3)
        .to(steps[2], { opacity: 0.6, duration: 0.3 }, 'work')
        .to(steps[3], { opacity: 1, duration: 0.3 }, 'work')
        .to('.lens-glow', { opacity: 1, duration: 0.6 }, 'work')
        .to('.stage-all', { scale: 1.06, svgOrigin: '300 230', duration: 0.9 }, 'work')
        .to({}, { duration: 0.4 }); // hold the final state briefly before the pin releases
    });
  }

  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

function lockOnMenu(lenis: Lenis) {
  window.addEventListener('d2e:scrolllock', (e) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start()));
}

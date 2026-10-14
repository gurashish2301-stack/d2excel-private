// Logo reveal, phase 2. Phase 1 (plate, ring draw, logo wipe, red pulse) is CSS in styles/intro.css.
// Here the logo flies (GSAP Flip) from the centre to its exact header spot while the curtain splits open.
// Any click, tap or key skips it. It cannot trap anything: the overlay is aria-hidden and has nothing focusable in it, and every exit path ends in finish().
// It must not be `inert`: an inert overlay is not hit-tested, so a click or tap meant to skip it would land on whatever link lies beneath.
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

const root = document.documentElement;
const PHASE_ONE = 1.25; // seconds of CSS animation that must have played before the flight starts

export function playIntro(endIntro: () => void) {
  const curtain = document.querySelector<HTMLElement>('.curtain');
  const logo = curtain?.querySelector<HTMLElement>('.intro-logo');
  const target = document.querySelector<HTMLElement>('.site-header .logo, .nav-top .logo-plate img');
  if (!curtain || !logo || !target || !root.classList.contains('intro')) return endIntro();
  gsap.registerPlugin(Flip);
  (window as any).__introGo = true;

  let tl: gsap.core.Timeline | undefined;
  let done = false;
  const open = () => {
    root.classList.add('intro-open');
    dispatchEvent(new Event('d2e:intro-reveal'));
  };
  const hold = (e: Event) => { e.preventDefault(); e.stopImmediatePropagation(); };
  const finish = () => {
    if (done) return;
    done = true;
    removeEventListener('wheel', hold, true);
    removeEventListener('pointerdown', skip);
    removeEventListener('keydown', skip);
    curtain.remove();
    endIntro();
  };
  const skip = () => {
    if (done) return;
    start.kill();
    tl?.kill();
    open();
    gsap.to(curtain, { opacity: 0, duration: 0.3, ease: 'power2.out', onComplete: finish });
  };
  addEventListener('wheel', hold, { capture: true, passive: false });
  addEventListener('pointerdown', skip);
  addEventListener('keydown', skip);

  const wait = Math.max(0, PHASE_ONE - (performance.now() - ((window as any).__intro0 ?? 0)) / 1000);
  const start = gsap.delayedCall(wait, () => {
    open();
    const ease = 'expo.inOut';
    tl = gsap.timeline({ defaults: { duration: 0.85, ease }, onComplete: finish });
    tl.add(Flip.fit(logo, target, { scale: true, duration: 0.85, ease }) as gsap.core.Tween, 0)
      .to('.intro-l', { xPercent: -101 }, 0.05)
      .to('.intro-r', { xPercent: 101 }, 0.05);
  });
}

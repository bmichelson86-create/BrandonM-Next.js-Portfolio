'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Shared instance so components (menu, preloader) can lock scrolling. */
export let lenis: Lenis | null = null;

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.remove('js-loading');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenis = instance;

    instance.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Pause the scroll loop when the tab is hidden
    const onVisibility = () =>
      document.hidden ? instance.stop() : instance.start();
    document.addEventListener('visibilitychange', onVisibility);

    // Layout settles after fonts load — ScrollTrigger needs to re-measure
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // Client-side route changes don't fire load, so ScrollTrigger has to re-measure.
  // useGSAP already kills each component's own triggers on unmount — killing them
  // here would destroy the triggers children just registered, because child effects
  // run before parent effects.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    lenis?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}

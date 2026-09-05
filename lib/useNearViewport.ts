'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * True once `ref` has come within `rootMargin` of the viewport.
 *
 * Latches: once true it stays true, so a video that has started buffering is
 * never torn back down by a fast scroll past it.
 *
 * Used to defer attaching video `src` until a section is nearly on screen.
 * `preload="metadata"` is not enough on its own — ScrollTrigger's initial
 * refresh toggles every trigger once, which fires `video.play()` at mount and
 * makes Chrome buffer the whole file regardless of the preload hint.
 */
export function useNearViewport(
  ref: RefObject<Element | null>,
  rootMargin = '35% 0px'
): boolean {
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browser, or a test env): load eagerly
    // rather than never showing the video at all. Deferred a frame so this is
    // not a synchronous setState inside the effect body.
    if (typeof IntersectionObserver === 'undefined') {
      const id = requestAnimationFrame(() => setNear(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, near, rootMargin]);

  return near;
}

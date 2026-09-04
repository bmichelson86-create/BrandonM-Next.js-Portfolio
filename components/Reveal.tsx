'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Stagger direct children instead of revealing the wrapper as one block. */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

/**
 * Replaces the ~22 hand-written scroll-reveal calls from the old script.js.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className,
  id,
  stagger = false,
  delay = 0,
  y = 60,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = stagger
        ? Array.from(ref.current!.children)
        : [ref.current!];

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay,
          ease: 'expo.out',
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

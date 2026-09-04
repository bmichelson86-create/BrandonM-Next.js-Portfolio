'use client';

import { useRef, useId } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { lenis } from './SmoothScroll';
import Lanyard from './Lanyard';
import styles from './Hero.module.css';

const SUBTITLE =
  'Creating memorable digital experiences with modern tech and thoughtful design.';
const CTA_TEXT = 'View My Work';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const gradientId = useId();

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const targets = [
        `.${styles.label}`,
        `.${styles.subtitle}`,
        `.${styles.cta}`,
        `.${styles.scrollIndicator}`,
      ];

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        gsap.set(`.${styles.nameText}`, { strokeDashoffset: 0, fill: 'currentColor' });
        return;
      }

      const tl = gsap.timeline();

      tl.fromTo(
        `.${styles.label}`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
      )
        // Name: draw the stroke, then flood the fill
        .to(
          `.${styles.nameFirst}`,
          { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out' },
          '-=0.4'
        )
        .to(
          `.${styles.nameLast}`,
          { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out' },
          '-=1.3'
        )
        .to(
          `.${styles.nameFirst}`,
          { fill: '#ffffff', duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .to(
          `.${styles.nameLast}`,
          { fill: `url(#${gradientId})`, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          `.${styles.subtitle}`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
          '-=0.4'
        )
        .fromTo(
          `.${styles.cta}`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
          '-=0.5'
        )
        .fromTo(
          `.${styles.scrollIndicator}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
          '-=0.4'
        );

      // ---- hero parallax ----
      gsap.to(`.${styles.content}`, {
        y: 100,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    },
    { scope: root }
  );

  // Falling-text hover on the CTA
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const { contextSafe } = useGSAP({ scope: ctaRef });

  const fall = contextSafe(() => {
    const chars = ctaRef.current!.querySelectorAll(`.${styles.ctaChar}`);
    gsap.killTweensOf(chars);
    gsap.to(chars, { y: 80, duration: 0.6, ease: 'power2.in', stagger: 0.05 });
  });

  const rise = contextSafe(() => {
    const chars = ctaRef.current!.querySelectorAll(`.${styles.ctaChar}`);
    gsap.killTweensOf(chars);
    gsap.to(chars, { y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.05 });
  });

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) lenis?.scrollTo(target as HTMLElement);
    else ScrollTrigger.refresh();
  };

  return (
    <section className={styles.hero} id="hero" ref={root}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Lanyard />
        </div>

        <div className={styles.content}>
          <p className={styles.label}>UX/UI Designer &amp; Frontend Developer</p>

          <h1 className={styles.title}>
            <svg
              className={styles.nameSvg}
              viewBox="0 0 600 180"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e94560" />
                </linearGradient>
              </defs>
              <text
                className={`${styles.nameText} ${styles.nameFirst}`}
                x="300"
                y="70"
              >
                Brandon
              </text>
              <text
                className={`${styles.nameText} ${styles.nameLast}`}
                x="300"
                y="150"
              >
                Michelson
              </text>
            </svg>
            <span className="srOnly">Brandon Michelson</span>
          </h1>

          <p className={styles.subtitle}>{SUBTITLE}</p>

          <a
            href="#projects"
            className={styles.cta}
            ref={ctaRef}
            onClick={scrollToProjects}
            onMouseEnter={fall}
            onMouseLeave={rise}
          >
            <span className={styles.ctaLabel} aria-label={CTA_TEXT}>
              {[...CTA_TEXT].map((char, i) => (
                <span key={i} className={styles.ctaChar} aria-hidden="true">
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </span>
            <ArrowDown size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

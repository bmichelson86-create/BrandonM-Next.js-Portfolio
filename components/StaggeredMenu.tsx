'use client';

import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { lenis } from './SmoothScroll';
import styles from './StaggeredMenu.module.css';

const LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { label: 'Email', href: 'mailto:bmichelson86@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/brandonmichelson/' },
  { label: 'GitHub', href: 'https://github.com/brandonmichelson' },
];

/** Frame the robot rests on when the menu opens. */
const IDLE_FRAME = 0.1;

export default function StaggeredMenu() {
  const root = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const robotRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const busy = useRef(false);
  const openTl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      // The panel and prelayers park off-screen via CSS translateX(100%) so they
      // are hidden before hydration. GSAP would read that as `x`, leaving
      // xPercent at 0 and animating nothing — so restate it in GSAP's own terms.
      gsap.set(
        [panelRef.current, ...root.current!.querySelectorAll(`.${styles.prelayer}`)],
        { xPercent: 100, x: 0 }
      );

      // Header fades in after the intro, then gains a backdrop once scrolled
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.1,
      });

      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onToggle: (self) =>
          headerRef.current?.classList.toggle(
            styles.headerScrolled,
            self.isActive
          ),
      });
    },
    { scope: root }
  );

  const openMenu = contextSafe(() => {
    if (busy.current) return;
    busy.current = true;
    setIsOpen(true);
    lenis?.stop();

    const panel = panelRef.current!;
    const prelayers = root.current!.querySelectorAll(`.${styles.prelayer}`);
    const labels = panel.querySelectorAll(`.${styles.itemLabel}`);
    const numbers = panel.querySelectorAll(`.${styles.item}`);
    const socialTitle = panel.querySelector(`.${styles.socialsTitle}`);
    const socialLinks = panel.querySelectorAll(`.${styles.socialsLink}`);

    openTl.current?.kill();

    gsap.set(labels, { yPercent: 140, rotate: 10 });
    gsap.set(numbers, { '--sm-num-opacity': 0 });
    gsap.set(socialTitle, { opacity: 0 });
    gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    });
    openTl.current = tl;

    // Phase 1 — colour prelayers slide in
    prelayers.forEach((layer, i) => {
      tl.to(layer, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    // Phase 2 — panel
    const panelStart = prelayers.length * 0.07 + 0.08;
    tl.to(panel, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, panelStart);

    // Phase 3 — nav items
    const itemsStart = panelStart + 0.65 * 0.15;
    tl.to(
      labels,
      { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: 0.1 },
      itemsStart
    ).to(
      numbers,
      {
        '--sm-num-opacity': 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
      },
      itemsStart + 0.1
    );

    // Phase 4 — socials
    const socialsStart = panelStart + 0.65 * 0.4;
    tl.to(
      socialTitle,
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      socialsStart
    ).to(
      socialLinks,
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 },
      socialsStart + 0.04
    );

    // Robot rides up, paused on its idle frame — it only plays on hover
    const robot = robotRef.current;
    if (robot) {
      robot.pause();
      robot.currentTime = IDLE_FRAME;
      gsap.set(robot, { visibility: 'visible', opacity: 0, yPercent: 40 });
      gsap.to(robot, {
        opacity: 1,
        yPercent: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      });
    }

    gsap.to(iconRef.current, {
      rotate: 225,
      duration: 0.8,
      ease: 'power4.out',
      overwrite: 'auto',
    });
    gsap.to(textInnerRef.current, {
      yPercent: -50,
      duration: 0.5,
      ease: 'power4.out',
    });
  });

  const closeMenu = contextSafe(() => {
    setIsOpen(false);
    lenis?.start();
    openTl.current?.kill();
    busy.current = false;

    const panel = panelRef.current!;
    const prelayers = root.current!.querySelectorAll(`.${styles.prelayer}`);

    gsap.to(panel, { xPercent: 100, duration: 0.45, ease: 'power3.in' });
    gsap.to(prelayers, {
      xPercent: 100,
      duration: 0.45,
      ease: 'power3.in',
      stagger: 0.05,
    });
    gsap.to(iconRef.current, {
      rotate: 0,
      duration: 0.6,
      ease: 'power4.out',
      overwrite: 'auto',
    });
    gsap.to(textInnerRef.current, {
      yPercent: 0,
      duration: 0.4,
      ease: 'power4.out',
    });
    if (robotRef.current) gsap.set(robotRef.current, { visibility: 'hidden' });
  });

  const toggle = () => (isOpen ? closeMenu() : openMenu());

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      closeMenu();
      // Let the close animation start before scrolling
      window.setTimeout(() => {
        const target = document.querySelector(href);
        if (target) lenis?.scrollTo(target as HTMLElement, { offset: 0 });
      }, 250);
    },
    [closeMenu]
  );

  // Robot plays only while a nav item is hovered
  const startRobot = () => robotRef.current?.play().catch(() => {});
  const stopRobot = () => robotRef.current?.pause();

  return (
    <div
      className={styles.wrapper}
      ref={root}
      data-open={isOpen ? '' : undefined}
      onKeyDown={(e) => e.key === 'Escape' && isOpen && closeMenu()}
    >
      <div className={styles.prelayers} aria-hidden="true">
        <div className={styles.prelayer} style={{ background: '#1a1a2e' }} />
        <div className={styles.prelayer} style={{ background: '#e94560' }} />
      </div>

      <header className={styles.header} ref={headerRef}>
        <a href="#hero" aria-label="Home" onClick={(e) => handleNav(e, '#hero')}>
          <span className={styles.logoText}>BM</span>
        </a>
        <button
          className={styles.toggle}
          type="button"
          onClick={toggle}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="staggered-menu-panel"
        >
          <span className={styles.toggleTextWrap} aria-hidden="true">
            <span className={styles.toggleTextInner} ref={textInnerRef}>
              <span className={styles.toggleLine}>Menu</span>
              <span className={styles.toggleLine}>Close</span>
            </span>
          </span>
          <span className={styles.icon} ref={iconRef} aria-hidden="true">
            <span className={styles.iconLine} />
            <span className={`${styles.iconLine} ${styles.iconLineV}`} />
          </span>
        </button>
      </header>

      <aside
        id="staggered-menu-panel"
        className={styles.panel}
        ref={panelRef}
        aria-hidden={!isOpen}
      >
        <div className={styles.panelInner}>
          <ul className={styles.list} role="list">
            {LINKS.map((link) => (
              <li className={styles.itemWrap} key={link.href}>
                <a
                  className={styles.item}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  onMouseEnter={startRobot}
                  onMouseLeave={stopRobot}
                  tabIndex={isOpen ? 0 : -1}
                >
                  <span className={styles.itemLabel}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.robotWrapper}>
            <video
              ref={robotRef}
              className={styles.robotVideo}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src="/video/robot-portfolio.mp4" type="video/mp4" />
            </video>
          </div>

          <div className={styles.socials} aria-label="Social links">
            <h3 className={styles.socialsTitle}>Connect</h3>
            <ul className={styles.socialsList} role="list">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className={styles.socialsLink}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Lanyard.module.css';

const PHYSICS = {
  damping: 0.92, // energy lost per frame
  tension: 0.15, // spring constant
  maxAngle: 45, // degrees
  velocityThreshold: 0.1,
};

/** Damped pendulum sequence played once on entrance. */
const SWING_SEQUENCE = [
  { angle: -12, duration: 0.45 },
  { angle: 8, duration: 0.4 },
  { angle: -5, duration: 0.35 },
  { angle: 3, duration: 0.3 },
  { angle: -1.5, duration: 0.25 },
  { angle: 0.5, duration: 0.2 },
  { angle: 0, duration: 0.15 },
];

export default function Lanyard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stringRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current!;
      const card = cardRef.current!;
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (reduced) {
        gsap.set(container, { opacity: 1, y: 0, rotation: 0 });
        return;
      }

      // ---- physics state ----
      let currentAngle = 0;
      let angularVelocity = 0;
      let isDragging = false;
      let dragStartX = 0;
      let dragStartAngle = 0;
      let rafId = 0;
      let gustTimer = 0;

      const setTension = (tension: number) => {
        gsap.set(stringRef.current, {
          scaleY: 1 + tension * 0.08,
          skewX: tension * 3 * (currentAngle > 0 ? 1 : -1),
        });
      };

      // ---- entrance: drop + damped swing ----
      gsap.set(container, { opacity: 0, y: -150, rotation: 0 });

      const tl = gsap.timeline();
      tl.to(container, { opacity: 1, y: 0, duration: 0.6, ease: 'bounce.out' })
        .to(
          container,
          {
            rotation: 18,
            duration: 0.4,
            ease: 'power2.out',
            onUpdate() {
              setTension(this.progress());
            },
          },
          '-=0.2'
        );

      SWING_SEQUENCE.forEach((swing) => {
        tl.to(container, {
          rotation: swing.angle,
          duration: swing.duration,
          ease: 'sine.inOut',
          onUpdate() {
            setTension(Math.abs(swing.angle) / PHYSICS.maxAngle);
          },
        });
      });

      // ---- drag ----
      const pointerX = (e: MouseEvent | TouchEvent) =>
        'touches' in e ? e.touches[0].clientX : e.clientX;

      const startDrag = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        isDragging = true;
        cancelAnimationFrame(rafId);
        gsap.killTweensOf(container);
        dragStartX = pointerX(e);
        dragStartAngle = currentAngle;
        angularVelocity = 0;
        container.classList.add(styles.dragging);
      };

      const onDrag = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = pointerX(e) - dragStartX;
        let newAngle = dragStartAngle + deltaX * 0.3;

        // Elastic resistance past the limit
        if (Math.abs(newAngle) > PHYSICS.maxAngle) {
          const overflow = Math.abs(newAngle) - PHYSICS.maxAngle;
          const elastic = 1 / (1 + overflow * 0.05);
          newAngle =
            Math.sign(newAngle) * (PHYSICS.maxAngle + overflow * elastic * 0.3);
        }

        angularVelocity = deltaX * 0.1;
        currentAngle = newAngle;
        gsap.set(container, { rotation: newAngle });
        setTension(Math.abs(newAngle) / PHYSICS.maxAngle);
      };

      const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        container.classList.remove(styles.dragging);
        swing();
      };

      // Spring-back: Hooke's law with damping, run off rAF
      const swing = () => {
        const step = () => {
          const springForce = -PHYSICS.tension * currentAngle;
          angularVelocity += springForce;
          angularVelocity *= PHYSICS.damping;
          currentAngle += angularVelocity;

          gsap.set(container, { rotation: currentAngle });
          setTension(Math.abs(currentAngle) / PHYSICS.maxAngle);

          if (
            Math.abs(angularVelocity) > PHYSICS.velocityThreshold ||
            Math.abs(currentAngle) > 0.5
          ) {
            rafId = requestAnimationFrame(step);
          } else {
            currentAngle = 0;
            angularVelocity = 0;
            gsap.to(container, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            gsap.to(stringRef.current, {
              scaleY: 1,
              skewX: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        };
        rafId = requestAnimationFrame(step);
      };

      card.addEventListener('mousedown', startDrag);
      card.addEventListener('touchstart', startDrag, { passive: false });
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('touchmove', onDrag, { passive: false });
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchend', endDrag);

      // ---- ambient wind gusts ----
      const gust = () => {
        if (isDragging) {
          gustTimer = window.setTimeout(gust, 5000);
          return;
        }
        const strength = (Math.random() - 0.5) * 8;
        gsap.to(container, {
          rotation: `+=${strength}`,
          duration: 0.4 + Math.random() * 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(container, {
              rotation: 0,
              duration: 1.2,
              ease: 'elastic.out(1, 0.4)',
            });
          },
        });
        gustTimer = window.setTimeout(gust, 8000 + Math.random() * 7000);
      };
      const gustStart = window.setTimeout(gust, 7000);

      return () => {
        cancelAnimationFrame(rafId);
        window.clearTimeout(gustStart);
        window.clearTimeout(gustTimer);
        card.removeEventListener('mousedown', startDrag);
        card.removeEventListener('touchstart', startDrag);
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
      };
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.string} ref={stringRef} />
      <div className={styles.clip}>
        <div className={styles.clipTop} />
        <div className={styles.clipRing} />
      </div>
      <div className={styles.card} ref={cardRef}>
        <div className={styles.hole} />
        <video
          className={styles.badge}
          autoPlay
          loop
          muted
          playsInline
          /* This is the hero's LCP element. Without a poster nothing paints
             here until enough of the clip downloads and decodes, which on a
             throttled connection costs seconds. */
          poster="/images/posters/lanyard.webp"
          aria-label="Brandon Michelson badge photo"
        >
          <source src="/video/lanyard-photo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './TiltCard.module.css';

type Props = {
  image?: string;
  alt?: string;
  label: string;
  overlayTitle: string;
  overlayBody: string;
  /**
   * Sits the image on a light panel, contained rather than cropped. For
   * transparent logo artwork that would otherwise be black-on-black.
   */
  contain?: boolean;
  /** Replaces the image with custom content (used by the RDR2 data pillars). */
  children?: ReactNode;
};

/* Matches initTiltCards() in the original script.js: 15 degrees, no scale,
   0.3s in / 0.5s out. */
const MAX_ROTATION = 15;

export default function TiltCard({
  image,
  alt,
  label,
  overlayTitle,
  overlayBody,
  contain,
  children,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const onMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    // Coarse pointers get the hover overlay via CSS; skip the tilt maths
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = cardRef.current!.getBoundingClientRect();
    // Mouse position relative to centre, -1..1
    const mouseX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const mouseY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(innerRef.current, {
      rotationY: mouseX * MAX_ROTATION,
      rotationX: -mouseY * MAX_ROTATION,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to(innerRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  return (
    <div
      className={styles.tiltCard}
      ref={cardRef}
      tabIndex={0}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onBlur={onLeave}
    >
      <div className={styles.inner} ref={innerRef}>
        {children ?? (
          <>
            <div
              className={`${styles.image} ${contain ? styles.imageContain : ''}`}
            >
              {image && (
                <Image
                  src={image}
                  alt={alt ?? ''}
                  width={640}
                  height={300}
                  sizes="(max-width: 767px) 100vw, 320px"
                />
              )}
            </div>
            <span className={styles.label}>{label}</span>
          </>
        )}

        <div className={styles.overlay}>
          <h4>{overlayTitle}</h4>
          <p>{overlayBody}</p>
        </div>
      </div>
    </div>
  );
}

/* ---- RDR2 data pillars ---- */

export function PillarMetric() {
  return (
    <div className={styles.pillar}>
      <div className={styles.pillarHeader}>Critical Friction</div>
      <div className={styles.pillarMetric}>50%</div>
      <div className={styles.pillarDetail}>
        Users cite linear mission design as the primary barrier to immersion.
      </div>
    </div>
  );
}

export function PillarGraph() {
  return (
    <div className={styles.pillar}>
      <div className={styles.pillarHeader}>Interaction Variance</div>
      <div>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>Narrative</span>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: '90%' }} />
          </div>
          <span className={styles.barValue}>90%</span>
        </div>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>Interface</span>
          <div className={styles.barTrack}>
            <div
              className={`${styles.barFill} ${styles.barFillLow}`}
              style={{ width: '30%' }}
            />
          </div>
          <span className={styles.barValue}>30%</span>
        </div>
      </div>
      <div className={styles.pillarDetail}>
        High narrative satisfaction vs. low interface efficiency.
      </div>
    </div>
  );
}

export function PillarList() {
  const items = [
    ['OPTIMIZE', 'Streamline Satchel Taxonomy'],
    ['IMPROVE', 'Implement Contextual HUD'],
    ['EXPAND', 'Branching Logic'],
  ];
  return (
    <div className={styles.pillar}>
      <div className={styles.pillarHeader}>System Directives</div>
      <ul className={styles.directiveList}>
        {items.map(([tag, text]) => (
          <li key={tag}>
            <span className={styles.directiveTag}>{tag}</span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

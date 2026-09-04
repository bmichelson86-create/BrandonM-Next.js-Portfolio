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
  /** Replaces the image with custom content (used by the RDR2 data pillars). */
  children?: ReactNode;
};

const MAX_TILT = 12;

export default function TiltCard({
  image,
  alt,
  label,
  overlayTitle,
  overlayBody,
  children,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const onMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    // Coarse pointers get the hover overlay via CSS; skip the tilt maths
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = cardRef.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(innerRef.current, {
      rotateY: px * MAX_TILT * 2,
      rotateX: -py * MAX_TILT * 2,
      scale: 1.03,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to(innerRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
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
            <div className={styles.image}>
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

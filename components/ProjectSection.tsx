'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { Project } from '@/lib/projects';
import { useNearViewport } from '@/lib/useNearViewport';
import TiltCard, { PillarMetric, PillarGraph, PillarList } from './TiltCard';
import styles from './ProjectSection.module.css';

export default function ProjectSection({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const expandTl = useRef<gsap.core.Timeline | null>(null);
  const playTimeout = useRef<number | null>(null);
  const hasTriggered = useRef(false);
  const [expanded, setExpanded] = useState(false);

  const isRdr2 = project.slug === 'rdr2';

  // Defer the video download until the section is within one viewport of
  // the reader. Until then the poster frame stands in.
  const nearViewport = useNearViewport(root);

  useGSAP(
    () => {
      const video = videoRef.current;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ---- background video: play only while in view ----
      if (video) {
        const timed = project.playAfterScrollPast;

        if (timed) {
          // Port of initRdr2Video() from the original site: the clip plays once
          // at natural speed on a delay after the viewer scrolls past a cue
          // element, then pauses and resumes with section visibility. Playback
          // is time-based — deliberately NOT tied to scroll position.
          const cue = document.querySelector(timed.selector);
          const play = () => video.play().catch(() => {});
          const clear = () => {
            if (playTimeout.current !== null) {
              window.clearTimeout(playTimeout.current);
              playTimeout.current = null;
            }
          };

          if (cue) {
            ScrollTrigger.create({
              trigger: cue,
              start: 'bottom top',
              onEnter: () => {
                if (hasTriggered.current) return;
                hasTriggered.current = true;
                playTimeout.current = window.setTimeout(() => {
                  playTimeout.current = null;
                  play();
                }, timed.delayMs);
              },
            });
          }

          const resume = () => {
            if (hasTriggered.current && playTimeout.current === null) play();
          };
          ScrollTrigger.create({
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: resume,
            onEnterBack: resume,
            onLeave: () => {
              clear();
              video.pause();
            },
            onLeaveBack: () => {
              clear();
              video.pause();
            },
          });
        } else {
          ScrollTrigger.create({
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => {
              if (self.isActive) video.play().catch(() => {});
              else video.pause();
            },
          });
        }

        // Fade the video in as the section arrives
        gsap.fromTo(
          video,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: root.current, start: 'top 85%' },
          }
        );
      }

      if (reduced) return;

      // ---- Figma-style slide-in on the main card ----
      gsap.from(mainCardRef.current, {
        x: -100,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
        },
      });

      // ---- click-to-expand, responsive ----
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        expandTl.current = gsap
          .timeline({ paused: true })
          .to(mainCardRef.current, { xPercent: -80, duration: 0.6, ease: 'power2.out' }, 0)
          .to(
            tiltRef.current,
            { xPercent: 80, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
            0
          )
          .from(
            tiltRef.current!.children,
            { x: -20, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 },
            0.2
          );
      });

      mm.add('(max-width: 767px)', () => {
        expandTl.current = gsap
          .timeline({ paused: true })
          .to(mainCardRef.current, { scale: 0.92, y: -20, duration: 0.5, ease: 'power2.out' }, 0)
          .to(
            tiltRef.current,
            { y: 24, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
            0
          );
      });

      return () => {
        if (playTimeout.current !== null) window.clearTimeout(playTimeout.current);
        mm.revert();
      };
    },
    { scope: root, dependencies: [project.slug] }
  );

  const toggle = () => {
    const tl = expandTl.current;
    if (!tl) return;
    expanded ? tl.reverse() : tl.play();
    setExpanded(!expanded);
  };

  const rdr2Pillars = [<PillarMetric key="m" />, <PillarGraph key="g" />, <PillarList key="l" />];

  return (
    <section
      className={`${styles.section} ${expanded ? styles.expanded : ''}`}
      ref={root}
      data-project={project.slug}
      onClick={(e) => {
        if (expanded && e.target === e.currentTarget) toggle();
      }}
    >
      {isRdr2 ? (
        <div className={styles.videoWrapContain}>
          <video
            ref={videoRef}
            className={styles.videoContain}
            /* Matches index.html:230. Chrome defers muted autoplay until the
               element is visible, so the browser is what actually starts this
               clip as the section scrolls in; the ScrollTrigger logic below
               layers pause/resume on top. Without this the clip only ever
               starts via the delayed timer, which is not the original. */
            autoPlay
            muted
            playsInline
            preload="metadata"
            src={nearViewport ? project.bgVideo : undefined}
            poster={project.poster}
            aria-hidden="true"
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          className={styles.bgVideo}
          style={
            project.bgBrightness !== undefined
              ? { filter: `brightness(${project.bgBrightness})` }
              : undefined
          }
          loop
          muted
          playsInline
          preload="metadata"
          src={nearViewport ? project.bgVideo : undefined}
          poster={project.poster}
          aria-hidden="true"
        />
      )}

      <div className={styles.grid}>
        <div className={styles.mainCard} ref={mainCardRef}>
          {/* A real button rather than a role="button" div, so the card no
              longer nests links inside an interactive element. It covers the
              card and sits beneath .links, which keeps those clickable. */}
          <button
            type="button"
            className={styles.cardToggle}
            onClick={toggle}
            aria-expanded={expanded}
          >
            <span className="srOnly">
              {expanded ? `Collapse ${project.title} details` : `Expand ${project.title} details`}
            </span>
          </button>

          <div className={styles.mainCardImage}>
            <Image
              src={project.mainImage}
              alt={project.mainImageAlt}
              width={1600}
              height={800}
              sizes="(max-width: 767px) 100vw, 600px"
              priority={project.order === 0}
            />
          </div>

          <span className={styles.category}>{project.category}</span>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.tech}>
            {project.tech.map((t) => (
              <span className={styles.techTag} key={t}>
                {t}
              </span>
            ))}
          </div>

          <div className={styles.links}>
            {project.hasCaseStudy && (
              <Link href={`/work/${project.slug}`} className={styles.link}>
                <span>View Project</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className={styles.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live Site</span>
                <ExternalLink size={13} strokeWidth={2.5} />
              </a>
            )}
          </div>

          <span className={styles.hint}>
            {expanded ? 'Click to collapse' : 'Click to expand'}
          </span>
        </div>

        <div className={styles.tiltContainer} ref={tiltRef}>
          {project.tiltCards.map((card, i) =>
            isRdr2 ? (
              <TiltCard
                key={card.label}
                label={card.label}
                overlayTitle={card.overlayTitle}
                overlayBody={card.overlayBody}
              >
                {rdr2Pillars[i]}
              </TiltCard>
            ) : (
              <TiltCard
                key={card.label}
                image={card.image}
                alt={card.alt}
                contain={card.contain}
                label={card.label}
                overlayTitle={card.overlayTitle}
                overlayBody={card.overlayBody}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

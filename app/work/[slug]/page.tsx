import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { caseStudies, getCaseStudy } from '@/lib/caseStudies';
import { getProject } from '@/lib/projects';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';
import styles from './case-study.module.css';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.intro,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${study.title} | Brandon Michelson`,
      description: study.intro,
      images: [study.heroImage],
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const project = getProject(slug);

  return (
    <>
      <header className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          BM
        </Link>
        <Link href="/#projects" className={styles.back}>
          <ArrowLeft size={15} strokeWidth={2.5} />
          <span>Back to Projects</span>
        </Link>
      </header>

      <main id="main-content">
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <Image
              src={study.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.heroImg}
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContent}>
            <span className={styles.label}>{study.label}</span>
            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.intro}>{study.intro}</p>

            {project?.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.liveLink}
              >
                <span>Visit Live Site</span>
                <ExternalLink size={14} strokeWidth={2.5} />
              </a>
            )}
          </div>
        </section>

        <article className={styles.body}>
          {study.sections.map((section) => (
            <Reveal as="section" className={styles.section} key={section.num}>
              <span className={styles.sectionNumber}>{section.num}</span>
              <h2 className={styles.sectionTitle}>{section.title}</h2>

              {section.figure && (
                <figure className={styles.figure}>
                  <div className={styles.figureWrap}>
                    <Image
                      src={section.figure.src}
                      alt={section.figure.alt}
                      width={1600}
                      height={900}
                      sizes="(max-width: 900px) 100vw, 860px"
                    />
                  </div>
                  <figcaption className={styles.caption}>
                    {section.figure.caption}
                  </figcaption>
                </figure>
              )}

              {section.paragraphs.map((p, i) => (
                <p className={styles.text} key={i}>
                  {p}
                </p>
              ))}

              {section.list && (
                <ul className={styles.list}>
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.todo && (
                <aside className={styles.todo}>
                  <p className={styles.todoLabel}>Needs your input</p>
                  <ul>
                    {section.todo.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className={styles.todoHint}>
                    Answer these in <code>lib/caseStudies.ts</code>, then delete
                    the <code>todo</code> field for this section.
                  </p>
                </aside>
              )}
            </Reveal>
          ))}

          <div className={styles.footerNav}>
            <Link href="/#projects" className={styles.back}>
              <ArrowLeft size={15} strokeWidth={2.5} />
              <span>Back to Projects</span>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

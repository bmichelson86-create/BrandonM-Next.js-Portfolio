import {
  Search,
  Crosshair,
  PenTool,
  Code,
  Rocket,
  Cpu,
  Zap,
  ArrowLeftRight,
  Film,
  type LucideIcon,
} from 'lucide-react';
import Reveal from './Reveal';
import styles from './Sections.module.css';

const PROCESS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Search, title: 'Discover', body: 'User research, competitive analysis, stakeholder interviews' },
  { icon: Crosshair, title: 'Define', body: 'User personas, journey maps, problem statements' },
  { icon: PenTool, title: 'Design', body: 'Wireframes, prototypes, user testing, iteration' },
  { icon: Code, title: 'Develop', body: 'Modern tech stack, GSAP animations, performance-first' },
  { icon: Rocket, title: 'Deploy', body: 'Optimization, launch, analytics, continuous improvement' },
];

const DIFFERENTIATORS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Cpu, title: 'AI-Augmented Development', body: 'Leverage Claude Code for faster iteration and cleaner code' },
  { icon: Zap, title: 'Performance Obsessed', body: 'Core Web Vitals optimization and mobile-first approach' },
  { icon: ArrowLeftRight, title: 'Full-Stack Thinking', body: 'Designer + Developer perspective for seamless execution' },
  { icon: Film, title: 'Modern Animations', body: 'GSAP expertise for cinematic, engaging experiences' },
];

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.aboutContainer}>
        <div>
          <Reveal className="sectionHeader" stagger>
            <span className="sectionNumber">03</span>
            <h2 className="sectionTitle">Designer &amp; Developer</h2>
          </Reveal>

          <Reveal className={styles.bio}>
            <p>
              I&apos;m a UX/UI Designer and Frontend Developer who bridges the gap
              between beautiful design and functional code. After completing a
              UX/UI bootcamp at TripleTen and drawing on 20+ years of professional
              experience, I now specialize in creating modern web applications with
              advanced animations and performance optimization.
            </p>
            <p>
              Based in South San Francisco, I work with agencies and direct clients
              to build memorable digital experiences that combine thoughtful design
              with technical excellence.
            </p>
          </Reveal>

          <Reveal>
            <h3 className={styles.processTitle}>My Process</h3>
            <div className={styles.processSteps}>
              {PROCESS.map(({ icon: Icon, title, body }) => (
                <div className={styles.processStep} key={title}>
                  <div className={styles.stepIcon}>
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.differentiators} stagger>
          {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
            <div className={styles.differentiator} key={title}>
              <div className={styles.diffIcon}>
                <Icon size={20} strokeWidth={2} />
              </div>
              <h4>{title}</h4>
              <p>{body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

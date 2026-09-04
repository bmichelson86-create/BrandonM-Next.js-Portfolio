import {
  Code2,
  Wand2,
  Palette,
  Wrench,
  Gauge,
  type LucideIcon,
} from 'lucide-react';
import Reveal from './Reveal';
import styles from './Sections.module.css';

type Category = { title: string; icon: LucideIcon; items: string[] };

const CATEGORIES: Category[] = [
  {
    title: 'Frontend Development',
    icon: Code2,
    items: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React & Next.js',
      'HTML5 / CSS3',
      'Responsive Design',
      'Component Architecture',
    ],
  },
  {
    title: 'Animation & Interaction',
    icon: Wand2,
    items: [
      'GSAP',
      'ScrollTrigger',
      'Lenis Smooth Scroll',
      'Micro-interactions',
      'Parallax Effects',
    ],
  },
  {
    title: 'Design',
    icon: Palette,
    items: [
      'Figma',
      'Typography Systems',
      'UX/UI Principles',
      'Design Systems',
      'Wireframing & Prototyping',
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: Wrench,
    items: ['Claude Code', 'Git / GitHub', 'VS Code', 'Chrome DevTools', 'Vercel'],
  },
  {
    title: 'Performance',
    icon: Gauge,
    items: [
      'Core Web Vitals',
      'Image & Video Optimization',
      'Lazy Loading',
      'Mobile-First Approach',
    ],
  },
];

export default function Skills() {
  return (
    <section className={styles.section} id="skills">
      <Reveal className="sectionHeader" stagger>
        <span className="sectionNumber">02</span>
        <h2 className="sectionTitle">Skills &amp; Expertise</h2>
        <p className="sectionSubtitle">
          Technologies and tools I use to bring ideas to life.
        </p>
      </Reveal>

      <Reveal className={styles.skillsGrid} stagger>
        {CATEGORIES.map(({ title, icon: Icon, items }) => (
          <div className={styles.skillCategory} key={title}>
            <h3 className={styles.skillCategoryTitle}>
              <Icon size={18} strokeWidth={2} />
              {title}
            </h3>
            <ul className={styles.skillList}>
              {items.map((item) => (
                <li className={styles.skillItem} key={item}>
                  <span aria-hidden="true">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

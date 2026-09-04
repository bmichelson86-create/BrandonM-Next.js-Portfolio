import { projects } from '@/lib/projects';
import StaggeredMenu from '@/components/StaggeredMenu';
import Hero from '@/components/Hero';
import ProjectSection from '@/components/ProjectSection';
import Reveal from '@/components/Reveal';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import projectStyles from '@/components/ProjectSection.module.css';

export default function Home() {
  const ordered = [...projects].sort((a, b) => a.order - b.order);

  return (
    <>
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>
      <StaggeredMenu />

      <main id="main-content">
        <Hero />

        <div id="projects">
          <Reveal className={projectStyles.projectsHeader} stagger>
            <span className="sectionNumber">01</span>
            <h2 className="sectionTitle">Featured Projects</h2>
            <p className="sectionSubtitle" id="projects-subtitle">
              A selection of recent work showcasing design and development
              expertise.
            </p>
          </Reveal>

          {ordered.map((project) => (
            <ProjectSection key={project.slug} project={project} />
          ))}
        </div>

        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

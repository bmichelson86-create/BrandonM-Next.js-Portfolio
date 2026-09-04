import { Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';
import BackToTop from './BackToTop';
import styles from './Sections.module.css';

const NAV = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>BM</span>
          <p>&copy; {new Date().getFullYear()} Brandon Michelson</p>
        </div>

        <nav className={styles.footerNav} aria-label="Footer navigation">
          {NAV.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.footerSocial}>
          <a href="mailto:bmichelson86@gmail.com" aria-label="Email">
            <Mail size={18} strokeWidth={2} />
          </a>
          <a
            href="https://www.linkedin.com/in/brandonmichelson/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="https://github.com/brandonmichelson"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { lenis } from './SmoothScroll';
import styles from './Sections.module.css';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.backToTopVisible : ''}`}
      aria-label="Back to top"
      onClick={() =>
        lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  );
}

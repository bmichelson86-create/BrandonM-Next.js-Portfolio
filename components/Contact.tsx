'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';
import Reveal from './Reveal';
import styles from './Sections.module.css';

// Public Web3Forms key — safe client-side, but move to a Server Action
// if you ever want it out of the bundle entirely.
const ACCESS_KEY = 'beeb7c90-2c71-4400-8da1-9415b5a359fa';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const data = new FormData(e.currentTarget);
    data.append('access_key', ACCESS_KEY);
    data.append('subject', 'New Portfolio Inquiry');
    data.append('from_name', 'Portfolio Contact Form');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus('ok');
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className={styles.section} id="contact">
      <Reveal className="sectionHeader" stagger>
        <span className="sectionNumber">04</span>
        <h2 className="sectionTitle">Let&apos;s Work Together</h2>
        <p className="sectionSubtitle">
          Available for freelance projects and contract opportunities.
        </p>
      </Reveal>

      <div className={styles.contactContent}>
        <Reveal>
          <div className={styles.availability}>
            <span className={styles.statusDot} />
            <span>Currently accepting new projects</span>
          </div>
          <p className={styles.responseTime}>I typically respond within 24 hours</p>

          <div className={styles.contactLinks}>
            <a href="mailto:bmichelson86@gmail.com" className={styles.contactLink}>
              <Mail size={17} strokeWidth={2} />
              <span>bmichelson86@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/brandonmichelson/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <LinkedinIcon size={17} />
              <span>/in/brandonmichelson</span>
            </a>
            <a
              href="https://github.com/brandonmichelson"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <GithubIcon size={17} />
              <span>/brandonmichelson</span>
            </a>
          </div>
        </Reveal>

        <Reveal>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required placeholder="Your name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about your project..."
              />
            </div>

            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
              <Send size={15} strokeWidth={2.5} />
            </button>

            <p
              className={`${styles.formStatus} ${
                status === 'ok'
                  ? styles.formStatusOk
                  : status === 'error'
                    ? styles.formStatusErr
                    : ''
              }`}
              role="status"
              aria-live="polite"
            >
              {status === 'ok' && 'Thanks — your message is on its way.'}
              {status === 'error' &&
                'Something went wrong. Email me directly at bmichelson86@gmail.com.'}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE = 'https://brandonmichelson.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Brandon Michelson | UX/UI Designer & Frontend Developer',
    template: '%s | Brandon Michelson',
  },
  description:
    'Brandon Michelson is a UX/UI Designer and Frontend Developer creating memorable digital experiences with modern tech, GSAP animations, and thoughtful design.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Brandon Michelson | UX/UI Designer & Frontend Developer',
    description:
      'Creating memorable digital experiences with modern tech and thoughtful design.',
    url: SITE,
    siteName: 'Brandon Michelson',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandon Michelson | UX/UI Designer & Frontend Developer',
    description:
      'Creating memorable digital experiences with modern tech and thoughtful design.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Brandon Michelson',
  jobTitle: 'UX/UI Designer & Frontend Developer',
  url: SITE,
  email: 'bmichelson86@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/brandonmichelson/',
    'https://github.com/brandonmichelson',
  ],
  knowsAbout: [
    'UX Design',
    'UI Design',
    'Frontend Development',
    'React',
    'Next.js',
    'GSAP',
    'JavaScript',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="js-loading">
        {/* The hero starts hidden so GSAP can fade it in. With JS off nothing
            ever would, so reveal it outright. */}
        <noscript>
          <style>{`
            #hero * { opacity: 1 !important; }
            #hero text { stroke-dashoffset: 0 !important; fill: currentColor !important; }
          `}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

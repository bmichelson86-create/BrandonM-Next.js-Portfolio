export type TiltCard = {
  image: string;
  alt: string;
  label: string;
  overlayTitle: string;
  overlayBody: string;
  /** Show on a light panel, contained — for transparent logo artwork. */
  contain?: boolean;
};

export type Project = {
  slug: string;
  order: number;
  category: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  /** Fullscreen background video behind the section */
  bgVideo: string;
  /** Poster frame, used before the video is in view */
  poster?: string;
  mainImage: string;
  mainImageAlt: string;
  tiltCards: TiltCard[];
  /** When false, the project links out instead of to an internal case study */
  hasCaseStudy: boolean;
  /**
   * Plays the background video once at natural speed, starting `delayMs` after
   * the viewer scrolls past `selector`. Ports initRdr2Video() from the original
   * site — playback is time-based, not tied to scroll position.
   */
  playAfterScrollPast?: { selector: string; delayMs: number };
  /**
   * Overrides the default 0.4 brightness on the background video. Footage from
   * a light-coloured source needs to sit lower to match the dark sections.
   */
  bgBrightness?: number;
};

export const projects: Project[] = [
  {
    slug: 'biddle-shaw',
    order: 0,
    category: 'Spec Project / Insurance Brokerage',
    title: 'Biddle-Shaw Insurance',
    description:
      'A self-initiated Next.js redesign for an independent San Francisco brokerage. Seven coverage lines, an instant-quote flow, and a carrier-comparison story built to convert visitors into quote requests.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Conversion UX'],
    liveUrl: 'https://biddle-shaw-nextjs.vercel.app/',
    bgVideo: '/video/biddle-shaw.mp4',
    poster: '/images/posters/biddle-shaw.webp',
    // Captured from a white site — needs to sit much darker than the others
    bgBrightness: 0.16,
    mainImage: '/images/biddle-main-card.webp',
    mainImageAlt:
      'Biddle-Shaw Insurance homepage showing the hero carousel and instant quote form',
    hasCaseStudy: true,
    tiltCards: [
      {
        image: '/images/biddle-pillar-services.webp',
        alt: 'Biddle-Shaw insurance services grid showing auto, home, and commercial coverage',
        label: 'Service Architecture',
        overlayTitle: 'Service Architecture',
        overlayBody:
          'Seven coverage lines, each on its own route with dedicated copy — structured so a visitor lands directly on the product they searched for.',
      },
      {
        image: '/images/biddle-pillar-quote.webp',
        alt: 'Biddle-Shaw instant quote form with coverage type selector',
        label: 'Conversion Path',
        overlayTitle: 'Conversion Path',
        overlayBody:
          'The quote request sits above the fold and repeats through the page. One decision — coverage type — before the visitor commits.',
      },
      {
        image: '/images/biddle-pillar-trust.webp',
        alt: 'Biddle-Shaw client testimonials section with five star rating',
        label: 'Trust Signals',
        overlayTitle: 'Trust Signals',
        overlayBody:
          'Independent brokerage positioning, verified reviews, and named client outcomes — the credibility layer insurance buyers look for first.',
      },
    ],
  },
  {
    slug: 'rdr2',
    order: 1,
    category: 'System Design Analysis',
    title: 'Red Dead Redemption 2',
    description:
      'Deconstructing immersion, diegetic interface, and environmental narrative systems.',
    tech: ['UX Analysis', 'Interaction Design', 'Game Systems'],
    liveUrl: 'https://rdr2-portfolio-site.vercel.app/',
    bgVideo: '/video/RDR2-Merged-video.mp4',
    poster: '/images/RRD2-Still.webp',
    mainImage: '/images/rdr2-tilt-card.webp',
    mainImageAlt: 'Red Dead Redemption 2 cinematic silhouette scene',
    hasCaseStudy: true,
    playAfterScrollPast: { selector: '#projects-subtitle', delayMs: 1500 },
    tiltCards: [
      {
        image: '',
        alt: '',
        label: 'Critical Friction',
        overlayTitle: 'Critical Friction',
        overlayBody:
          'Half of surveyed players identified rigid mission structure as the #1 immersion breaker — a core UX problem driving the redesign.',
      },
      {
        image: '',
        alt: '',
        label: 'Interaction Variance',
        overlayTitle: 'Interaction Variance',
        overlayBody:
          'A 60-point gap between narrative and interface satisfaction reveals the core design tension — great story, clunky systems.',
      },
      {
        image: '',
        alt: '',
        label: 'System Directives',
        overlayTitle: 'System Directives',
        overlayBody:
          'Three targeted interventions addressing inventory, interface, and narrative — each backed by user research data.',
      },
    ],
  },
  {
    slug: 'bearded-threads',
    order: 2,
    category: 'Brand Identity & E-Commerce Experience',
    title: 'Bearded Threads',
    description:
      'A lifestyle apparel brand built on community, outdoor adventure, and clean design systems.',
    tech: ['E-Commerce Frontend', 'Brand Identity', 'UX/UI'],
    liveUrl: 'https://bearded-threads-portfolio.vercel.app/',
    bgVideo: '/video/BTCCintro.mp4',
    poster: '/images/posters/bearded-threads.webp',
    mainImage: '/images/BTCC3darkgrey.webp',
    mainImageAlt:
      'Bearded Threads dark forest road brand imagery showcasing outdoor lifestyle aesthetic',
    hasCaseStudy: true,
    tiltCards: [
      {
        image: '/images/brand-system.webp',
        alt: 'Bearded Threads brand identity system showing logo, typography, and color palette',
        contain: true,
        label: 'Identity System',
        overlayTitle: 'Identity System',
        overlayBody:
          'Logo system and color hierarchy built for consistent cross-platform brand recognition.',
      },
      {
        image: '/images/black-beanie-product.webp',
        alt: 'Bearded Threads black beanie clean studio product photography',
        label: 'Product Design',
        overlayTitle: 'Product Design',
        overlayBody:
          'Studio photography and presentation designed for e-commerce conversion.',
      },
      {
        image: '/images/black-beanie-model1.webp',
        alt: 'Bearded Threads beanie modeled in outdoor campfire lifestyle setting',
        label: 'Market Fit & Story',
        overlayTitle: 'Market Fit & Story',
        overlayBody:
          'Lifestyle positioning that connects with the outdoor demographic.',
      },
    ],
  },
  {
    slug: 'dj-big-cali',
    order: 3,
    category: 'Entertainment / Music Industry',
    title: 'DJ Big Cali',
    description:
      'Professional DJ website featuring video backgrounds, smooth scroll animations, and a custom logo intro sequence. Built for a client with focus on performance and mobile optimization.',
    tech: ['Vanilla JS', 'GSAP', 'Lenis', 'Video Optimization'],
    liveUrl: 'https://dj-big-cali-website.vercel.app/',
    bgVideo: '/video/dj-turntable.mp4',
    poster: '/images/posters/dj-big-cali.webp',
    mainImage: '/images/dj-big-cali.webp',
    mainImageAlt:
      'DJ Big Cali website showing vinyl record with bear mascot and custom branding',
    hasCaseStudy: true,
    tiltCards: [
      {
        image: '/images/djbc-pillar-system.webp',
        alt: 'DJ Big Cali Experience UI section showing typography and layered stats',
        label: 'UI & Layout System',
        overlayTitle: 'UI & Layout System',
        overlayBody:
          'Engineered a dark-mode content hierarchy prioritizing media layering, stat highlighting, and high-contrast readability.',
      },
      {
        image: '/images/djbc-pillar-energy.webp',
        alt: 'DJ Big Cali turntable interface showing high energy club lighting',
        label: 'Visual Performance',
        overlayTitle: 'Visual Performance',
        overlayBody:
          'Captured the high-energy club vibe using optimized motion backgrounds and dynamic GSAP scroll interactions.',
      },
      {
        image: '/images/djbc-pillar-client.webp',
        alt: 'DJ Big Cali premium wedding client experience in low key lighting',
        label: 'Professional Identity',
        overlayTitle: 'Professional Identity',
        overlayBody:
          'Elevated the brand to target premium wedding and corporate clients through a sophisticated, cinematic aesthetic.',
      },
    ],
  },
  {
    slug: 'cococoin',
    order: 4,
    category: 'UX/UI Design',
    title: 'CocoCoin — TripleTen Capstone',
    description:
      'Mobile banking app redesign focused on financial wellness. Built with competitive analysis, journey mapping, and high-fidelity prototypes validated through usability walkthroughs.',
    tech: ['Figma', 'User Research', 'Prototyping', 'Usability Testing'],
    bgVideo: '/video/coco-gradient.mp4',
    poster: '/images/posters/cococoin.webp',
    mainImage: '/images/coco-main-card.webp',
    mainImageAlt:
      'CocoCoin mobile banking app showing welcome screen, onboarding flow, and financial dashboard',
    hasCaseStudy: true,
    tiltCards: [
      {
        image: '/images/coco-pillar-logic.webp',
        alt: 'CocoCoin user flow and logic diagram',
        label: 'UX Logic & Flow',
        overlayTitle: 'UX Logic & Flow',
        overlayBody:
          'Mapped comprehensive user journeys and edge cases to ensure frictionless navigation and financial data accessibility.',
      },
      {
        image: '/images/coco-pillar-system.webp',
        alt: 'CocoCoin design system showing typography and color palettes',
        label: 'Design System',
        overlayTitle: 'Design System',
        overlayBody:
          'Architected a scalable, component-based design system optimized for accessibility and seamless developer handoff.',
      },
      {
        image: '/images/coco-pillar-desktop.webp',
        alt: 'Desktop UI dashboard for digital wallet showing data visualization',
        label: 'Cross-Platform UI',
        overlayTitle: 'Cross-Platform UI',
        overlayBody:
          'Translated the mobile-first wallet experience into a robust, widescreen desktop dashboard environment.',
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

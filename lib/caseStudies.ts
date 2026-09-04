// Generated from the original case-study pages, then hand-checked.

export type CaseSection = {
  num: string;
  title: string;
  paragraphs: string[];
  figure?: { src: string; alt: string; caption: string; contain?: boolean };
  list?: string[];
  /**
   * Placeholder prompts for copy only Brandon can write. These render as a
   * visible amber block so they cannot be shipped by accident — delete the
   * field once the surrounding paragraphs are filled in.
   */
  todo?: string[];
};

export type CaseStudy = {
  label: string;
  title: string;
  intro: string;
  heroImage: string;
  sections: CaseSection[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "biddle-shaw": {
    label: "Client Work / Insurance Brokerage",
    title: "Biddle-Shaw Insurance",
    intro: "A production site for an independent San Francisco brokerage — built to turn an insurance search into a quote request.",
    heroImage: "/images/biddle-main-card.webp",
    sections: [
      {
        num: "01",
        title: "The Objective",
        paragraphs: [
          "Biddle-Shaw is an independent brokerage, not a single-carrier agency — they shop multiple carriers on a client's behalf. That distinction is the entire value proposition, and it is the thing a generic insurance template cannot communicate.",
          "The site had to do two jobs at once: explain the brokerage model clearly enough that a visitor understands why it benefits them, and get that visitor into a quote request with as little friction as possible.",
        ],
        todo: [
          "What was your actual role? (design only, build only, both; solo or with others)",
          "How did the engagement come about, and what did the client have before this?",
          "What did the client specifically ask for, in their words?",
          "What was the timeline?",
        ],
      },
      {
        num: "02",
        title: "Service Architecture",
        figure: {
          src: "/images/biddle-pillar-services.webp",
          alt: "Biddle-Shaw insurance services grid showing auto, home, and commercial coverage cards",
          caption: "Seven coverage lines, each with its own route, imagery, and dedicated copy.",
        },
        paragraphs: [
          "Coverage is split across seven lines — auto, home, landlord protection, condo, renters, umbrella, and commercial with workers' comp. Each one lives on its own route rather than as an anchor on a single long page.",
          "That structure matters for how people actually arrive. Someone searching for renters insurance in San Francisco should land on a page about renters insurance, not on a homepage where they have to hunt. Separate routes also give each line its own metadata and its own entry point from search.",
        ],
      },
      {
        num: "03",
        title: "Conversion Path",
        figure: {
          src: "/images/biddle-pillar-quote.webp",
          alt: "Biddle-Shaw instant quote form with a coverage type selector and call to action",
          caption: "One decision — coverage type — stands between a visitor and a quote request.",
        },
        paragraphs: [
          "The quote request sits directly beneath the hero and repeats as the visitor moves down the page. It asks for one thing up front: which coverage type. Everything else is deferred until after the visitor has committed to starting.",
          "Insurance shoppers are comparing several providers in a single sitting. The form is deliberately short because every additional field is another reason to leave and try the next tab instead.",
        ],
      },
      {
        num: "04",
        title: "Trust & Credibility",
        figure: {
          src: "/images/biddle-pillar-trust.webp",
          alt: "Biddle-Shaw client testimonials section showing a five star rating and a named review",
          caption: "Named reviews with concrete outcomes, positioned before the final call to action.",
        },
        paragraphs: [
          "Insurance is a trust purchase, so credibility signals are placed where the decision actually happens rather than buried on an About page. Reviews are named and specific — they cite carriers shopped and dollars saved, not generic praise.",
          "The independent-brokerage positioning is stated plainly and repeated: they work for the client, not for one carrier. Physical address, direct phone number, and staffed office hours all reinforce that this is a real local business.",
        ],
      },
      {
        num: "05",
        title: "Build & Stack",
        paragraphs: [
          "Built with Next.js and React, styled with Tailwind, and deployed on Vercel. Routing is file-based, which keeps each coverage line a self-contained page that is cheap to add or amend as the brokerage's offering changes.",
          "Imagery runs through Next.js image optimization, so the lifestyle photography that carries the visual tone is served in modern formats at appropriate sizes rather than as full-resolution originals.",
        ],
        todo: [
          "Any technical constraints worth naming? (existing branding, carrier requirements, content supplied vs. written by you, compliance/disclosure rules)",
        ],
      },
      {
        num: "06",
        title: "Results & Takeaways",
        paragraphs: [],
        todo: [
          "Any measurable outcome? (quote requests before vs. after, traffic, time on page, Lighthouse scores, client feedback)",
          "What are you most pleased with in this build?",
          "What would you do differently next time?",
          "Is the client still using it, and is there ongoing work?",
        ],
      },
    ],
  },
  "dj-big-cali": {
    label: "Immersive Digital Experience",
    title: "DJ Big Cali",
    intro: "Translating live performance energy into a high-performance, motion-driven web presence.",
    heroImage: "/images/dj-big-cali.webp",
    sections: [
      {
        num: "01",
        title: "The Objective",
        paragraphs: [
          "DJ Big Cali's existing web presence didn't reflect the energy of a live performance. A static template-based layout failed to communicate the scale and professionalism of the events he plays — corporate galas, luxury weddings, and private parties.",
          "The goal was to build an immersive, performance-aware experience that positions the brand at a higher level. Fullscreen video, intentional scroll pacing, and layered UI — a digital stage that feels as deliberate as the live one.",
        ],
      },
      {
        num: "02",
        title: "UI & Layout System",
        paragraphs: [
          "The interface is built on a dark foundation that allows video and photography to take the lead. Typography is simple and intentional — large type for impact, restrained supporting text for clarity. Nothing competes for attention.",
          "Layout layering was handled carefully. Video, overlays, navigation, and interactive elements needed to live together without creating visual noise. Subtle overlap creates depth, but the screen always feels controlled and readable.",
        ],
        figure: { src: "/images/djbc-pillar-system.webp", alt: "DJ Big Cali website UI showing dark-mode typography hierarchy and content layout", caption: "Dark-mode content hierarchy engineered for media layering, stat highlighting, and high-contrast readability." },
      },
      {
        num: "03",
        title: "Motion & Performance",
        paragraphs: [
          "Motion was used deliberately — not as decoration, but as pacing. Scroll interactions are restrained and performance-aware, reinforcing the rhythm of a live set while maintaining fluid responsiveness across devices. Every animation earns its frame budget.",
          "Performance was the constraint that shaped the creativity. Fullscreen background videos were compressed and lazy-loaded. Scroll pacing was controlled using lightweight animation frameworks to preserve fluidity without hijacking browser accessibility. The site feels fast because it is fast — not because it's simple.",
        ],
        figure: { src: "/images/djbc-pillar-energy.webp", alt: "DJ Big Cali turntable interface with high-energy club lighting and motion effects", caption: "GSAP-powered scroll interactions and hardware-accelerated animations capture the energy of a live performance." },
      },
      {
        num: "04",
        title: "Professional Identity",
        paragraphs: [
          "The visual identity needed to communicate trust and polish before a single word was read. Premium event clients — corporate planners, luxury wedding coordinators — make decisions based on perceived professionalism. The cinematic dark aesthetic signals authority without sacrificing the energy that defines the brand.",
          "Every design decision reinforced the booking funnel. The layout guides visitors from the hero impact moment through credentials and social proof to a clear call-to-action. High-ticket clients scan, evaluate, and decide in seconds. The site is built for that decision speed.",
        ],
        figure: { src: "/images/djbc-pillar-client.webp", alt: "DJ Big Cali premium brand presentation in sophisticated low-key lighting", caption: "Cinematic aesthetic positioning the brand for premium corporate and wedding clients." },
      },
      {
        num: "05",
        title: "Results & Takeaways",
        paragraphs: [
          "The DJ Big Cali project proved that performance-driven frontend engineering and creative design aren't competing priorities — they're multipliers. When the tech is invisible and the experience is immersive, the brand speaks for itself.",
        ],
      },
    ],
  },
  "bearded-threads": {
    label: "E-Commerce & Brand Identity",
    title: "Bearded Threads",
    intro: "A lifestyle apparel brand built on community, outdoor adventure, and clean design systems.",
    heroImage: "/images/BTCC3darkgrey.webp",
    sections: [
      {
        num: "01",
        title: "The Challenge",
        paragraphs: [
          "Bearded Threads needed a complete brand identity that could stand out in the crowded lifestyle apparel market. The goal was to create a cohesive visual system that communicated rugged authenticity while maintaining the polish expected of a modern e-commerce brand.",
          "The challenge extended beyond just a logo — it required building a full design system including typography, color palette, product photography direction, and an e-commerce frontend that converted browsers into buyers. Every touchpoint needed to feel intentional and connected to the brand's core values of community, craftsmanship, and the outdoors.",
        ],
      },
      {
        num: "02",
        title: "Identity System",
        paragraphs: [
          "The identity system was designed for versatility across digital and physical touchpoints. The primary logo uses a bold, geometric wordmark that reads clearly at any scale — from favicon to storefront signage. A secondary icon mark provides flexibility for social media profiles, product tags, and packaging embossments.",
          "The color hierarchy anchors the brand in deep, earthy tones with strategic accent colors that drive attention to calls-to-action and key product features. This system ensures consistent cross-platform brand recognition whether a customer encounters Bearded Threads on Instagram, the Shopify store, or a physical product tag.",
        ],
        figure: { src: "/images/brand-system.webp", alt: "Bearded Threads brand identity system showing logo variations, typography, and color palette", caption: "Complete brand identity system including primary and secondary logo marks, typography hierarchy, and color palette." , contain: true },
      },
      {
        num: "03",
        title: "Product Design",
        paragraphs: [
          "Product photography was approached with an e-commerce conversion mindset. Clean studio shots with controlled lighting showcase material quality and construction details — the textures, stitching, and silhouette that customers can't feel through a screen. Each image was composed to answer the buyer's unspoken questions about quality and fit.",
          "The photography direction balances aspirational brand storytelling with the practical clarity that drives purchase decisions. White-background hero shots sit alongside styled flat lays that suggest outfit pairing and lifestyle context, giving shoppers both the information and the inspiration they need to convert.",
        ],
        figure: { src: "/images/black-beanie-product.webp", alt: "Bearded Threads black beanie product photography on clean studio background", caption: "Studio product photography designed for maximum e-commerce conversion." },
      },
      {
        num: "04",
        title: "Market Fit & Story",
        paragraphs: [
          "Bearded Threads isn't just selling apparel — it's selling a lifestyle. The brand positioning targets the intersection of outdoor enthusiasts, craft culture, and community-driven identity. Lifestyle photography places products in authentic environments — campfires, trails, workshop benches — that resonate with the target demographic's aspirations.",
          "This storytelling approach transforms simple products into identity markers. When a customer sees a Bearded Threads beanie at a trailhead campfire, they're not seeing a hat — they're seeing themselves in the brand's world. This emotional connection is what converts one-time buyers into repeat customers and brand advocates.",
        ],
        figure: { src: "/images/black-beanie-model1.webp", alt: "Model wearing Bearded Threads beanie in outdoor campfire lifestyle setting", caption: "Lifestyle photography connecting the product to its outdoor, adventure-driven demographic." },
      },
      {
        num: "05",
        title: "Results & Takeaways",
        paragraphs: [
          "The Bearded Threads project reinforced a core principle: brand identity isn't just visual — it's strategic. Every design decision, from color choices to photography angles, should serve both the emotional brand story and the practical conversion goals of the business.",
        ],
      },
    ],
  },
  "rdr2": {
    label: "System Design Analysis",
    title: "Red Dead Redemption 2",
    intro: "Deconstructing immersion, diegetic interface, and environmental narrative systems.",
    heroImage: "/images/rdr2-tilt-card.webp",
    sections: [
      {
        num: "01",
        title: "The Objective",
        paragraphs: [
          "Red Dead Redemption 2 is a masterpiece of narrative, yet player data reveals a critical tension between its cinematic ambitions and its gameplay mechanics. This project is not a UI redesign of Rockstar's aesthetic; it is a forensic breakdown of system friction.",
          "The goal: Understand exactly where \"immersion\" breaks for the player and propose system-level directives to resolve ludonarrative dissonance.",
        ],
      },
      {
        num: "02",
        title: "Research Protocol",
        paragraphs: [
          "We conducted 10 semi-structured player interviews, mixing qualitative sentiment analysis with quantitative task success and satisfaction metrics. Pain points were categorized into four primary friction buckets based on recurring player frustrations.",
          "Core research questions focused on: Which story moments felt least satisfying? What systems did players wish existed? How would they redesign the gang's downfall? And critically — where did the interface fight the narrative?",
        ],
      },
      {
        num: "03",
        title: "Key Findings",
        paragraphs: [
          "50% of users cited linear mission design as the primary barrier to immersion. Narrative satisfaction scored 90% while interface efficiency scored just 30% — a massive interaction variance that reveals the core tension in the experience.",
          "The pain categories broke down clearly: Mission Freedom (50%), Clunky Menus (25%), Underused Side Characters (18%), and Visual Clutter (7%). The data pointed to a system where the story excels but the mechanics actively work against it.",
        ],
      },
      {
        num: "04",
        title: "Player Voice",
        paragraphs: [
          "Players expressed a consistent desire for agency. \"I felt like I was just checking boxes. I wanted more choice in how to finish missions.\" The menu system drew particular frustration: \"Menus were too clunky — I avoided them unless I had to.\"",
          "Character investment ran deep but left players wanting more: \"Sadie deserved a whole game. Her arc was powerful but way too short.\" And the most telling insight into player desire for narrative control: \"I wish there was a leave the gang early option.\"",
        ],
      },
      {
        num: "05",
        title: "Design Directives",
        paragraphs: [
          "Based on the research findings, three system-level directives emerged. First: Optimize the satchel taxonomy — use iconography instead of text lists, reduce click-depth for weapon swapping, and implement Quick Access for high-frequency items.",
          "Second: Expand mission branching logic — introduce optional paths (Stealth vs. Combat vs. Dialogue), add visual cues in the journal for Chosen Path vs. Missed Path, and let player decisions materially impact camp morale and resources. Third: Improve the contextual HUD — add a Remind Me Later feature for side missions, use subtle audio cues instead of intrusive popups, and implement color-coded map markers for Urgent vs. Passive tasks.",
        ],
      },
      {
        num: "06",
        title: "Results & Takeaways",
        paragraphs: [
          "This analysis reinforced a core UX principle: immersion is a system, not a feature. When narrative design and interface design are misaligned, players feel the friction — even if they can't articulate exactly why.",
        ],
      },
    ],
  },
  "cococoin": {
    label: "UX/UI Product Design",
    title: "CocoCoin",
    intro: "Designing a frictionless mobile banking experience that turns financial anxiety into financial empowerment.",
    heroImage: "/images/coco-main-card.webp",
    sections: [
      {
        num: "01",
        title: "The Challenge",
        paragraphs: [
          "Modern banking apps often feel overwhelming, clinical, and difficult to navigate. Users don't abandon financial apps because they lack features — they leave because the features feel hostile. The TripleTen capstone objective was to design a digital wallet and financial tracking application that prioritizes clarity over complexity.",
          "The core question: How do you make personal finance feel approachable without sacrificing the trust signals users expect from a financial product? The answer required understanding not just what users do in banking apps, but how they feel while doing it — and designing around that emotional reality.",
        ],
      },
      {
        num: "02",
        title: "Research & Discovery",
        paragraphs: [
          "Due to the two-week project timeline, research was grounded in competitive analysis across five banking and budgeting apps, along with structured user assumption mapping. The goal was to identify recurring friction patterns — where existing products lost users to confusion, friction, or anxiety — before designing a solution.",
          "Problem framing and journey mapping were completed before moving into high-fidelity design. This ensured the solution addressed real usability gaps rather than aesthetic preferences. The research phase surfaced three core needs: frictionless navigation, goal-oriented saving, and transparent spending insights presented without judgment.",
        ],
        figure: { src: "/images/coco-pillar-logic.webp", alt: "CocoCoin user flow diagram and research logic mapping", caption: "User journey mapping and logic flows built from interview insights and competitive analysis." },
      },
      {
        num: "03",
        title: "Design System",
        paragraphs: [
          "The visual language needed to balance two competing signals: the institutional trust of a financial product and the warmth of a wellness application. The color system anchors in deep greens and golds — signaling growth and value — with clean white surfaces that let data breathe without overwhelming the user.",
          "A scalable component system was built to maintain consistency across 40+ screens. Shared spacing, typography, and layout rules reduce design drift and support efficient iteration or developer handoff. Every button, card, and input follows the same structural logic so new features slot in without redesigning existing patterns.",
        ],
        figure: { src: "/images/coco-pillar-system.webp", alt: "CocoCoin design system showing typography, color palette, and component library", caption: "Scalable component-based design system balancing financial trust with approachable aesthetics." },
      },
      {
        num: "04",
        title: "Cross-Platform Execution",
        paragraphs: [
          "The high-fidelity prototype spans 40+ screens across mobile and desktop. The mobile experience was designed first — onboarding, account linking, spending dashboards, and goal tracking — then translated to a widescreen desktop environment that uses the additional space for data visualization rather than simply stretching the mobile layout.",
          "Key interactions were prototyped in Figma with realistic transitions. The onboarding flow guides users from account creation through bank linking to their personalized dashboard in a minimal number of steps, prioritizing progressive disclosure over front-loading complexity.",
        ],
        figure: { src: "/images/coco-pillar-desktop.webp", alt: "CocoCoin desktop dashboard showing financial data visualization and wallet interface", caption: "Mobile-first design translated into a robust widescreen desktop dashboard environment." },
      },
      {
        num: "05",
        title: "Results & Takeaways",
        paragraphs: [
          "This project reinforced how emotional framing impacts financial UX. The goal was not just to display transactions, but to reduce friction and anxiety around money management. Design decisions focused on clarity, progressive disclosure, and supportive language to create a calmer, more intentional experience.",
        ],
      },
    ],
  },
};

export const getCaseStudy = (slug: string) => caseStudies[slug];

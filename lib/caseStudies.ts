// Generated from the original case-study pages, then hand-checked.

export type CaseSection = {
  num: string;
  title: string;
  paragraphs: string[];
  figure?: {
    src: string;
    alt: string;
    caption: string;
    /**
     * Fit the whole image inside the figure box instead of cropping it.
     * 'light' for transparent artwork that needs a pale panel behind it;
     * 'dark' for wide screenshots that would otherwise have text cropped off.
     */
    contain?: 'light' | 'dark';
  };
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
    label: "Spec Project / Insurance Brokerage",
    title: "Biddle-Shaw Insurance",
    intro: "A self-initiated redesign for an independent San Francisco brokerage, built to turn an insurance search into a quote request.",
    heroImage: "/images/biddle-main-card.webp",
    sections: [
      {
        num: "01",
        title: "The Objective",
        paragraphs: [
          "Biddle-Shaw is an independent brokerage. They shop multiple carriers for you instead of selling one company's policies, and that difference is the whole pitch. A stock insurance template doesn't say it for them.",
          "So the site had two jobs: explain what a brokerage actually does and why it works in your favor, then get you into a quote request without much effort.",
          "Nobody hired me for this. A family member works at Biddle-Shaw, which is the only reason I ever looked at their site, and biddleshaw.com was clearly old. I ran it through HubSpot's Website Grader and it came back 65 out of 100. Nobody had asked for a redesign, so I offered.",
          "There was no brief and no deadline. I gave myself about two weeks, designed and built all of it myself, finished early, and showed them. They passed. So this is a spec project: a real business with real constraints, but nothing they ever put live.",
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
          "I split coverage into seven lines: auto, home, landlord protection, condo, renters, umbrella, and commercial with workers' comp. Each one gets its own route instead of an anchor link on one long page.",
          "The idea was that someone searching for renters insurance in San Francisco should land on a page about renters insurance and not have to go hunting from the homepage. Separate routes also give each line its own metadata and its own way in from search.",
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
          "I put the quote request right under the hero and repeated it further down the page. It asks for one thing to start: which coverage you want. Everything else waits until you've already begun.",
          "People shopping for insurance are usually comparing a few providers in one sitting. I kept the form short on purpose, since every extra field is one more reason to close the tab and try someone else.",
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
          "Insurance is a trust purchase, so I put the credibility signals where someone actually decides instead of hiding them on an About page. The reviews are named and specific, and they mention which carriers got shopped and what the person saved.",
          "The independent-brokerage point gets said plainly and then said again: they work for you, not for one carrier. The address, a direct phone number, and staffed office hours are all there to show it's a real local business.",
        ],
      },
      {
        num: "05",
        title: "Build & Stack",
        paragraphs: [
          "Next.js and React, Tailwind for styling, deployed on Vercel. Routing is file-based, so each coverage line stays a self-contained page that's easy to add or change as what they offer changes.",
          "Images go through Next.js image optimization, so the photography that carries most of the visual weight gets served at sensible sizes in modern formats instead of as full-resolution files.",
          "I kept the brand colors exactly as they were. The point was to modernize how the business presents itself, not to rebrand a company that hadn't asked me to. Everything else changed: new photography, a cleaner and more current layout, and coverage listings updated to match what they actually sell now, with the lines they've dropped taken out.",
          "The photography is my own. The coverage details came from my contact at the agency, which is as close to a brief as this ever got. No carrier requirements shaped the build. None came up. I left the original site's disclosure copy alone instead of rewriting it. I wasn't going to draft new compliance language for a redesign nobody had commissioned, and none of this went through a real review.",
        ],
      },
      {
        num: "06",
        title: "Results & Takeaways",
        paragraphs: [
          "The old site scored 65 out of 100 on HubSpot's Website Grader. The rebuild scores 100, with full marks on performance, SEO, mobile, and security. Same tool, same scale, so those two are worth putting side by side. Lighthouse is a tougher test and measures less: mobile performance comes in between 81 and 96 depending on where it's run from. I'd treat that as a separate data point, not part of the before-and-after.",
          "Both numbers only describe the site itself. Nobody ever reached this version through Biddle-Shaw, so there aren't any quote requests to count or traffic to compare. The scores say the build is solid. They don't say it made anyone any money.",
          "The 100 is what I'm most pleased with, mostly because the 65 is there to compare it against. Scoring well on its own wouldn't mean much.",
          "I wouldn't do anything differently. This wasn't built to win the work or keep a client happy, since they passed on it. I built it to find out whether I could learn an unfamiliar framework and actually ship something in it, instead of falling back on the single-file HTML I already knew, with nothing holding the structure together. Most sites run on something like Shopify or Squarespace now anyway. I wanted to close that gap for myself.",
        ],
      },
    ],
  },
  "dj-big-cali": {
    label: "Spec Project / Event DJ",
    title: "DJ Big Cali",
    intro: "A spec build for a working event DJ, turning live performance energy into a motion-driven site.",
    heroImage: "/images/dj-big-cali.webp",
    sections: [
      {
        num: "01",
        title: "The Objective",
        paragraphs: [
          "DJ Big Cali plays corporate galas, luxury weddings, and private parties. His site didn't look anything like that. It was a static template, and it carried none of the scale.",
          "Nobody hired me for this. I liked the problem, so I built the site I thought the act deserved: fullscreen video, deliberate scroll pacing, and layered UI. A digital stage.",
        ],
      },
      {
        num: "02",
        title: "UI & Layout System",
        paragraphs: [
          "I built the interface on a dark foundation so the video and photography lead. Type is large where it needs impact and quiet everywhere else, so nothing fights for attention.",
          "Layering took the most work. Video, overlays, navigation, and interactive elements all share the same screen, and they had to do it without turning into noise. A little overlap gives the page depth and it still reads cleanly.",
        ],
        figure: { src: "/images/djbc-pillar-system.webp", alt: "DJ Big Cali website UI showing dark-mode typography hierarchy and content layout", caption: "Dark-mode content hierarchy engineered for media layering, stat highlighting, and high-contrast readability."  },
      },
      {
        num: "03",
        title: "Motion & Performance",
        paragraphs: [
          "Motion is pacing here, not decoration. The scroll interactions stay restrained and follow the rhythm of a live set, and they hold up across devices.",
          "Performance shaped most of the creative decisions. I compressed the fullscreen background videos and lazy-loaded them, and I kept the scroll pacing on a lightweight animation library so it stays smooth without hijacking scrolling or accessibility.",
        ],
        figure: { src: "/images/djbc-pillar-energy.webp", alt: "DJ Big Cali turntable interface with high-energy club lighting and motion effects", caption: "GSAP-powered scroll interactions and hardware-accelerated animations capture the energy of a live performance." },
      },
      {
        num: "04",
        title: "Professional Identity",
        paragraphs: [
          "The identity had to read as professional before anyone read a word. Corporate planners and wedding coordinators judge fast on polish, so the dark cinematic look carries the authority and the motion keeps the energy.",
          "I built the layout around a booking funnel: the hero moment, then credentials and social proof, then the call to action. Someone booking this kind of event scans and decides quickly, so I kept that path short. That's the intent behind it, not a measured result.",
        ],
        figure: { src: "/images/djbc-pillar-client.webp", alt: "DJ Big Cali premium brand presentation in sophisticated low-key lighting", caption: "Cinematic aesthetic positioning the brand for premium corporate and wedding clients." },
      },
      {
        num: "05",
        title: "Results & Takeaways",
        paragraphs: [
          "There's no outcome to report. I finished the build, tried to get in touch with him, and never heard back, so it never went live. It stays here as a spec piece: a real act with real constraints, and a site nobody ever put in front of an audience.",
        ],
      },
    ],
  },
  "bearded-threads": {
    label: "Personal Brand / Apparel",
    title: "Bearded Threads",
    intro: "My own apparel brand, built on community, outdoor adventure, and a clean design system.",
    heroImage: "/images/BTCC3darkgrey.webp",
    sections: [
      {
        num: "01",
        title: "The Challenge",
        paragraphs: [
          "Bearded Threads is my own brand. Community, craftsmanship, and the outdoors, in a lifestyle apparel market that's already crowded. I wanted an identity that could hold its own in it and still look polished enough to sell from.",
          "That meant more than a logo. I did the typography, the color palette, the product design, the photography direction, and an e-commerce frontend to put it all on. I never launched it, so everything below is what I designed it to do, not what it did.",
        ],
      },
      {
        num: "02",
        title: "Identity System",
        paragraphs: [
          "I designed the identity for versatility. The primary wordmark is bold and geometric so it reads at any size, from a favicon to storefront signage, and a secondary icon mark covers social profiles, product tags, and packaging.",
          "The color hierarchy sits in deep, earthy tones, with a few accent colors held back for calls to action and key product features. The point is that the brand stays recognizable wherever it turns up: a social profile, a store page, a tag sewn into a beanie.",
        ],
        figure: { src: "/images/brand-system.webp", alt: "Bearded Threads brand identity system showing logo variations, typography, and color palette", caption: "Complete brand identity system including primary and secondary logo marks, typography hierarchy, and color palette." , contain: 'light' },
      },
      {
        num: "03",
        title: "Product Design",
        paragraphs: [
          "The product designs are mine. The images are AI mockups I generated to see those designs on real garments, which let me judge placement, proportion, and how the marks sit on dark fabric without paying for samples and a photographer first.",
          "I directed them the way I'd brief a shoot: clean studio lighting and white backgrounds for the hero frames, styled flat lays for outfit context. If the brand had gone further, these are the first things I'd have replaced with real photography.",
        ],
        figure: { src: "/images/black-beanie-product.webp", alt: "Bearded Threads black beanie product photography on clean studio background", caption: "Studio product photography designed for maximum e-commerce conversion." },
      },
      {
        num: "04",
        title: "Market Fit & Story",
        paragraphs: [
          "Bearded Threads sells an identity as much as it sells apparel. The positioning sits where outdoor people, craft culture, and community overlap, and the lifestyle imagery puts the products in those places: campfires, trails, workshop benches.",
          "The idea is that someone sees the beanie at a trailhead and recognizes something of themselves in it. That's the bet the brand makes, and it never got tested, because nothing ever went on sale.",
        ],
        figure: { src: "/images/black-beanie-model1.webp", alt: "Model wearing Bearded Threads beanie in outdoor campfire lifestyle setting", caption: "Lifestyle photography connecting the product to its outdoor, adventure-driven demographic." },
      },
      {
        num: "05",
        title: "Results & Takeaways",
        paragraphs: [
          "There are no numbers here. I designed the brand and built the storefront. What exists is the identity system and the store design, finished and unsold.",
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

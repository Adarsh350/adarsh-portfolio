export type Metric = { value: string; label: string };

/** Professional Experience — the 4 roles that get full case-study treatment. */
export type Role = {
  id: string;
  sequence: number;
  company: string;
  companyNote: string;
  title: string;
  location: string;
  period: string;
  current: boolean;
  monogram: string;
  primaryMetric: Metric;
  stats: Metric[];
  highlights: string[];
  tools: string[];
};

/** Additional Experience — the 3 lighter roles. */
export type AdditionalRole = {
  id: string;
  sequence: number;
  company: string;
  title: string;
  location: string;
  period: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    id: "iyara-labs",
    sequence: 1,
    company: "Iyara Labs",
    companyNote: "Iyara Labs is an AI agency that improves AI visibility for companies.",
    title: "Co-Founder",
    location: "Dubai, UAE",
    period: "May 2026 — Present",
    current: true,
    monogram: "IL",
    primaryMetric: { value: "100+", label: "AI visibility markers tracked" },
    stats: [
      { value: "10+", label: "Clients sourced from zero" },
      { value: "Google, Perplexity, Claude, ChatGPT", label: "AI engines audited for brand citation" },
    ],
    highlights: [
      "Built Iyara Labs' client pipeline from zero, personally sourcing 10+ clients through AI-industry conferences and direct outreach to founders, VCs, and strategic partners.",
      "Architected a 100+-marker AI visibility scoring tool that audits brand citation across Google, Perplexity, Claude, and ChatGPT and pinpoints the exact technical/schema issues suppressing it.",
      "Designed, built, and shipped Iyara Labs' production website solo — no agency, no external dev — using Claude Code, 21st.dev, Google Stitch, Figma, Blender, and Midjourney/Nano Banana for imagery.",
      "Own Iyara Labs' GTM motion — strategy, email marketing, and social — using Perplexity, ChatGPT, and Claude for research and content drafting, and ElevenLabs for AI voiceovers and avatar video — driving outbound acquisition into the Texas and Northeast US markets.",
      "Negotiated and launched a strategic partnership with DaitaFix (UK), pairing their in-house AI-visibility tooling for companies with existing teams with Iyara Labs' managed measurement-and-optimization service for companies without one — covering both buyer profiles under one referral motion.",
    ],
    tools: ["Claude Code", "21st.dev", "Google Stitch", "Figma", "Blender", "Midjourney", "Nano Banana", "Perplexity", "ChatGPT", "Claude", "ElevenLabs"],
  },
  {
    id: "trussme",
    sequence: 2,
    company: "Trussme",
    companyNote: "Trussme is a creative content and media agency working with brands including EMAAR.",
    title: "Lifecycle Marketing Manager",
    location: "Dubai, UAE",
    period: "December 2025 — April 2026",
    current: false,
    monogram: "TM",
    primaryMetric: { value: "30%+", label: "Email MQL lift" },
    stats: [
      { value: "25%+", label: "SQL lift" },
      { value: "36 of 42", label: "Campaigns at 40%+ open, 6% CTR" },
      { value: "10+", label: "B2B/B2C clients, 4-person team" },
    ],
    highlights: [
      "Led a 4-person email team across 10+ B2B/B2C clients, hitting 40%+ open rates and 6% CTR on 36 of 42 campaigns through deliverability-focused content design.",
      "Lifted email MQLs 30%+ and SQLs 25%+ by building dual-purpose landing pages in Lovable with custom-coded trackers, automating lead pipelines via Zapier for real-time client conversion tracking.",
      "Built a live client dashboard and automated bounce/campaign reporting via Cloudflare Workers-based AI tools for real-time performance visibility.",
      "Produced client social, ad, and deck creative — Nano Banana, Higgsfield AI, and Canva for visuals, ElevenLabs for voiceovers — streamlining workflow and QA with HighlightAI across the 10+-client roster.",
    ],
    tools: ["Lovable", "Zapier", "Cloudflare Workers", "Nano Banana", "Higgsfield AI", "Canva", "ElevenLabs", "HighlightAI"],
  },
  {
    id: "bloodrec",
    sequence: 3,
    company: "Bloodrec",
    companyNote: "Bloodrec is an early-stage AI healthtech startup helping users interpret blood test results.",
    title: "Founding Marketing Manager (Product & Growth)",
    location: "New York, USA",
    period: "December 2024 — December 2025",
    current: false,
    monogram: "BR",
    primaryMetric: { value: "2,885+", label: "Active users in week one, organic" },
    stats: [
      { value: "<50%", label: "Homepage bounce rate" },
      { value: "20%", label: "Lift in report uploads from A/B tests" },
      { value: "First", label: "Marketing hire at founding" },
    ],
    highlights: [
      "Led marketing at Bloodrec from founding as the company's first marketing hire, simplifying blood test interpretation for non-experts and building the user base from zero.",
      "Launched Bloodrec's GTM strategy from zero, driving 2,885+ active users in week one, entirely through organic channels.",
      "Cut homepage bounce rate under 50% by simplifying content and streamlining the user experience.",
      "Ran A/B tests on landing page messaging using GA4 and user feedback, lifting report uploads 20%.",
    ],
    tools: ["GA4"],
  },
  {
    id: "armada-ai",
    sequence: 4,
    company: "Armada AI",
    companyNote: "Armada AI is an M12 (Microsoft Venture Fund)-backed Series B startup that has raised $250M+.",
    title: "Product Marketing Manager",
    location: "Seattle, USA",
    period: "May 2024 — September 2024",
    current: false,
    monogram: "AA",
    primaryMetric: { value: "25%", label: "Conversion lift from site content & UX overhaul" },
    stats: [
      { value: "150", label: "Leads driven to key landing pages" },
      { value: "20%", label: "Conversion lift from enterprise video" },
      { value: "$250M+", label: "Raised by this M12-backed Series B" },
    ],
    highlights: [
      "Led user research and testing via Amplitude, HubSpot, and Adobe Analytics — presenting findings in Tableau dashboards — driving 150 leads to key landing pages through targeted email marketing.",
      "Overhauled website content and UX using GA4, Google Tag Manager, and SQL-queried performance data — as Armada's sole marketing hire, driving alignment across product, sales, engineering, and design to lift conversions 25%.",
      "Produced product sales assets, including an enterprise video for Armada Edge, boosting conversion 20% and supporting several public-sector deal closes.",
      "Shaped Armada Galleon's GTM strategy around industry-specific outcomes — operational efficiency, cost reduction, compliance — with tailored messaging per vertical.",
    ],
    tools: ["Amplitude", "HubSpot", "Adobe Analytics", "Tableau", "GA4", "Google Tag Manager", "SQL"],
  },
];

export const additionalExperience: AdditionalRole[] = [
  {
    id: "jaguar-land-rover",
    sequence: 1,
    company: "Jaguar Land Rover",
    title: "Marketing Strategy Intern",
    location: "Bengaluru, India",
    period: "June 2023 — August 2023",
    highlights: [
      "Lifted CTR 18% and conversion 12% through integrated digital campaigns combining market research, A/B testing, and focus-group insights.",
      "Crafted layered customer segmentation and product messaging that lifted brand awareness 8% and luxury-SUV conversions 5%.",
      "Redefined JLR's Instagram content strategy using Meta Insights and Sprout Social, lifting story interactions 40% and post engagement 22%.",
    ],
  },
  {
    id: "helmer-scientific",
    sequence: 2,
    company: "Helmer Scientific",
    title: "Content Marketing Consultant",
    location: "Indiana, USA",
    period: "December 2022 — May 2023",
    highlights: [
      "Ran competitive analysis in Python and SEMrush to sharpen product positioning against market demand.",
      "Optimized branding from customer behavior analysis, lifting overall conversion 10%.",
      "Designed data-driven segmentation from user research, lifting engagement 20%.",
    ],
  },
  {
    id: "eride-ngo",
    sequence: 3,
    company: "ERIDE NGO",
    title: "Marketing Manager (Product, Growth, Content, Lifecycle)",
    location: "Bengaluru, India",
    period: "January 2018 — June 2022 (evenings alongside undergraduate studies through mid-2021, then remote through 2022)",
    highlights: [
      "Drove ERIDE's education GTM strategy across 5 partner organizations, redesigning marketing collateral to lift engagement 30% and reach 150,000+ students.",
      "Synthesized feedback from 800+ students to optimize workshop formats, lifting satisfaction scores from 75% to 92%.",
      "Drove ₹12 lakh in donor giving through omnichannel social and email campaigns.",
    ],
  },
];

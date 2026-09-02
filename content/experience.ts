export type Metric = { value: string; label: string };

export type CaseStudy = {
  id: string;
  index: string;
  company: string;
  descriptor: string;
  role: string;
  location: string;
  period: string;
  headline: string;
  narrative: string;
  metrics: Metric[];
  work: string[];
  tools: string[];
  evidence?: { label: string; href: string };
  diagram: "visibility" | "lifecycle" | "growth" | "product";
};

export const caseStudies: CaseStudy[] = [
  {
    id: "iyara-labs",
    index: "01",
    company: "Iyara Labs",
    descriptor: "AI visibility agency",
    role: "Co-Founder",
    location: "Dubai, UAE",
    period: "May 2026—Present",
    headline: "Built the company, the pipeline, and the product layer from zero.",
    narrative: "Iyara needed more than an agency proposition. It needed a way to measure how brands appear across AI search, a credible market presence, and a repeatable route to clients.",
    metrics: [
      { value: "100+", label: "visibility markers architected" },
      { value: "10+", label: "clients sourced" },
      { value: "4", label: "search and AI engines audited" },
    ],
    work: [
      "Architected a 100+-marker system auditing brand citation across Google, Perplexity, Claude, and ChatGPT.",
      "Built the client pipeline from zero through AI-industry conferences and direct outreach to founders, VCs, and partners.",
      "Owned GTM across strategy, email, and social, including outbound into Texas and the Northeast US.",
      "Designed, built, and shipped iyaralabs.com solo with Claude Code, 21st.dev, Google Stitch, Figma, and Midjourney.",
    ],
    tools: ["Claude Code", "21st.dev", "Google Stitch", "Figma", "Midjourney"],
    evidence: { label: "Visit Iyara Labs", href: "https://www.iyaralabs.com/" },
    diagram: "visibility",
  },
  {
    id: "trussme",
    index: "02",
    company: "Trussme",
    descriptor: "Creative content and media agency",
    role: "Lifecycle Marketing Manager",
    location: "Dubai, UAE",
    period: "Dec 2025—Apr 2026",
    headline: "Turned email operations into a measurable lead system.",
    narrative: "Across a 10+-client B2B and B2C roster, the work connected campaign execution to lead quality through landing pages, custom tracking, automation, and live reporting.",
    metrics: [
      { value: "30%+", label: "email MQL lift" },
      { value: "25%+", label: "SQL lift" },
      { value: "36 / 42", label: "campaigns above 40% opens and 6% CTR" },
    ],
    work: [
      "Led a four-person email team across more than 10 B2B and B2C clients.",
      "Built dual-purpose landing pages with custom-coded trackers and Zapier-automated lead pipelines.",
      "Built a live client dashboard plus automated bounce and campaign reporting on Cloudflare Workers.",
    ],
    tools: ["Lovable", "Zapier", "Cloudflare Workers", "Email lifecycle"],
    diagram: "lifecycle",
  },
  {
    id: "bloodrec",
    index: "03",
    company: "Bloodrec",
    descriptor: "AI healthtech",
    role: "Founding Marketing Manager, Product & Growth",
    location: "New York, USA",
    period: "Dec 2024—Dec 2025",
    headline: "Took a healthtech product from zero to 10,000+ users.",
    narrative: "As the first marketing hire, the mandate was to create the GTM motion, make a technical product easier to understand, and turn user behavior into product decisions.",
    metrics: [
      { value: "2,885+", label: "active users in week one" },
      { value: "10,000+", label: "users in year one" },
      { value: "20%", label: "lift in report uploads" },
    ],
    work: [
      "Launched GTM from zero and drove the first 2,885+ active users organically in week one.",
      "Simplified content and streamlined the user experience, cutting homepage bounce below 50%.",
      "Used GA4-instrumented landing-page tests to lift report uploads 20%.",
    ],
    tools: ["GA4", "A/B testing", "GTM strategy", "User feedback"],
    diagram: "growth",
  },
  {
    id: "armada-ai",
    index: "04",
    company: "Armada AI",
    descriptor: "M12-backed edge AI company",
    role: "Product Marketing Manager",
    location: "Seattle, USA",
    period: "May 2024—Sep 2024",
    headline: "Connected product insight, enterprise narrative, and conversion.",
    narrative: "As sole marketing hire, the work crossed product, sales, engineering, and design: using behavioral data to reshape the website, targeted campaigns, and enterprise sales assets.",
    metrics: [
      { value: "25%", label: "site conversion lift" },
      { value: "150", label: "leads to key landing pages" },
      { value: "20%", label: "video conversion lift" },
    ],
    work: [
      "Overhauled site content and UX using GA4, GTM, and SQL performance data.",
      "Ran user research in Amplitude, HubSpot, and Adobe Analytics, reporting findings in Tableau.",
      "Produced enterprise sales assets, including an Armada Edge video that supported public-sector deal closes.",
    ],
    tools: ["GA4", "GTM", "SQL", "Amplitude", "HubSpot", "Tableau"],
    diagram: "product",
  },
];

export const career = [
  { company: "Jaguar Land Rover", role: "Marketing Strategy Intern", location: "Bengaluru", period: "2023", result: "18% CTR lift · 12% conversion lift · 22% post-engagement lift" },
  { company: "Helmer Scientific", role: "Content Marketing Consultant", location: "Indiana", period: "2022—2023", result: "10% conversion lift · 20% engagement lift" },
  { company: "ERIDE NGO", role: "Marketing Manager, part-time", location: "Vellore", period: "2018—2022", result: "150,000+ students reached · 30% engagement lift · ₹12 lakh raised" },
];

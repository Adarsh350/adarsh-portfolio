export type SkillCategoryId =
  | "analysis"
  | "ai-tooling"
  | "content"
  | "stakeholder"
  | "certifications";

export type SkillCategory = {
  id: SkillCategoryId;
  category: string;
  note?: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    id: "analysis",
    category: "Analysis & Reporting",
    items: [
      "HubSpot",
      "Google Analytics 4 (GA4)",
      "Google Tag Manager",
      "Tableau Desktop",
      "SQL",
      "Adobe Analytics",
      "Microsoft Office (PowerPoint, Excel, Word)",
      "Google Sheets",
      "Competitor Analysis",
      "Campaign Reporting",
    ],
  },
  {
    id: "ai-tooling",
    category: "AI Tooling & Automation",
    note: "Used to independently design, build, and ship production websites and internal tools without an engineering team.",
    items: [
      "Claude Code",
      "21st.dev",
      "Google Stitch",
      "Figma",
      "Blender",
      "Lovable",
      "Zapier",
      "ChatGPT",
      "Claude",
      "Perplexity",
      "Midjourney",
      "Nano Banana",
      "Higgsfield AI",
      "ElevenLabs",
      "HighlightAI",
      "Canva",
    ],
  },
  {
    id: "content",
    category: "Content & Execution",
    items: [
      "Email marketing and lifecycle campaigns",
      "Copywriting (email, social, marketing collateral)",
      "Brand messaging consistency across channels",
    ],
  },
  {
    id: "stakeholder",
    category: "Stakeholder & Coordination",
    items: [
      "Cross-functional coordination (Marketing, Sales, Product, Engineering, Design, Leadership)",
      "Campaign coordination across digital and offline channels",
      "Vendor and agency coordination",
      "Clear written/verbal English communication",
    ],
  },
  {
    id: "certifications",
    category: "Certifications",
    note: "10+ licenses and certifications.",
    items: [
      "HubSpot — Email",
      "HubSpot — Digital Marketing",
      "HubSpot — Social Media Marketing",
      "HubSpot — Content Marketing",
      "Microsoft — Generative AI",
      "Microsoft — Project Management",
      "Microsoft — Data Analysis",
      "Aha! Product Management",
      "Sprout Social",
      "Anthropic — AI Fluency",
    ],
  },
];

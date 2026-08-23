export type Credential = {
  school: string;
  qualifier: string;
  degree: string;
  period: string;
  leadership?: string;
};

export type Profile = {
  name: string;
  headline: string;
  valueProp: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  availability: string;
  eligibility: string[];
  education: Credential[];
};

export const profile: Profile = {
  name: "Adarsh Shankar",
  headline: "Marketing Analytics Leader & AI-Native Builder",
  valueProp:
    "I run GTM, lifecycle, and growth marketing for B2B and B2C brands — and build the sites, trackers, and internal tools that make them measurable, using Claude Code and modern AI tooling.",
  bio: "I co-built a 100+-marker AI visibility platform at Iyara Labs, and at Trussme lifted email MQLs 30%+ and SQLs 25%+ through AI-built landing pages and automated lead pipelines. Before that I was the first marketing hire at Bloodrec and the sole marketing hire at Microsoft-backed Armada AI. Purdue M.S. Marketing Analytics (STEM), based in Dubai.",
  location: "Dubai, UAE",
  email: "adarsh.shankar712@gmail.com",
  linkedin: "https://www.linkedin.com/in/adarshbuilds/",
  availability: "Immediate notice",
  eligibility: [
    "Indian National",
    "US-Educated (Purdue University, STEM)",
    "UAE Golden Visa Holder",
  ],
  education: [
    {
      school: "Purdue University",
      qualifier: "Top-10 Marketing program in the US — QS",
      degree: "M.S. in Marketing Analytics and Management (STEM)",
      period: "July 2022 — December 2023",
      leadership:
        "Krannert Graduate Marketing Association (KGMA); International Student Ambassador",
    },
    {
      school: "VIT University",
      qualifier: "NIRF Top-20 Engineering University in India",
      degree: "B.Tech in Computer Science and Engineering",
      period: "July 2017 — June 2021",
      leadership:
        "Founder, Board Gamers Club; organized a 15-country, 300+-participant International Collegiate Chess Tournament on Lichess",
    },
  ],
};

export type Authorization = { market: string; status: string };
export type Education = { school: string; degree: string; period: string; note: string };

export const profile = {
  name: "Adarsh Shankar",
  role: "AI-native product & growth marketer",
  headline: "I build the systems behind measurable growth.",
  summary: "I lead GTM, lifecycle, and product marketing, then build the sites, automations, dashboards, and tools that make the work measurable.",
  location: "Dubai, UAE",
  availability: "Available immediately",
  email: "adarsh.shankar712@gmail.com",
  linkedin: "https://www.linkedin.com/in/adarshbuilds/",
  github: "https://github.com/Adarsh350",
  resume: "/Adarsh_Shankar_Resume.pdf",
  authorization: [
    { market: "UAE", status: "Golden Visa · Authorized · Immediate start" },
    { market: "India", status: "Indian citizen · Authorized" },
    { market: "United States", status: "Requires cap-exempt H-1B sponsorship" },
  ] satisfies Authorization[],
  education: [
    { school: "Purdue University", degree: "M.S. Marketing Analytics and Management (STEM)", period: "2022—2023", note: "Top-10 US marketing program (QS)" },
    { school: "VIT University", degree: "B.Tech Computer Science and Engineering", period: "2017—2021", note: "NIRF Top-20" },
  ] satisfies Education[],
};

export const proofPoints = [
  { value: "100+", label: "AI visibility markers", href: "#iyara-labs" },
  { value: "10,000+", label: "Bloodrec users in year one", href: "#bloodrec" },
  { value: "30%+ / 25%+", label: "MQL / SQL lift at Trussme", href: "#trussme" },
  { value: "25%", label: "Conversion lift at Armada", href: "#armada-ai" },
];

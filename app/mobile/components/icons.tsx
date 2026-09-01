// Duplicated by design — app/mobile and app/desktop share no component code. Do not extract.

import type { ReactNode } from "react";
import type { SkillCategoryId } from "@/content/skills";

type IconProps = { size?: number };

/** Nav tab icon paths — moved verbatim (byte-identical) out of Nav.tsx. */
export const navIconPaths = {
  hero: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5",
  about: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  projects: "M4 7h16v12H4zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  skills:
    "M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8",
  contact: "M3 6h18v12H3zM3 7l9 6 9-6",
} as const;

/** <details> disclosure chevron path — moved verbatim out of Projects.tsx. */
export const chevronDownPath = "m6 9 6 6 6-6";

function svgProps(size = 20) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
}

export function ChevronDown({ size }: IconProps) {
  return (
    <svg {...svgProps(size)} className="chevron">
      <path d={chevronDownPath} />
    </svg>
  );
}

export function Mail({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d={navIconPaths.contact} />
    </svg>
  );
}

export function Linkedin({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 13v4" />
    </svg>
  );
}

export function ArrowUpRight({ size }: IconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** Per-category skill icons — compiler-checked exhaustive over SkillCategoryId. */
export const skillIcons: Record<SkillCategoryId, (p: IconProps) => ReactNode> = {
  analysis: ({ size }) => (
    <svg {...svgProps(size)}>
      <path d="M4 20h16M7 20v-6M12 20v-10M17 20v-4" />
    </svg>
  ),
  "ai-tooling": ({ size }) => (
    <svg {...svgProps(size)}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 7l1.8 3.2L17 12l-3.2 1.8L12 17l-1.8-3.2L7 12l3.2-1.8L12 7Z" />
    </svg>
  ),
  content: ({ size }) => (
    <svg {...svgProps(size)}>
      <path d="M12 3l3 3-9 9-4 1 1-4 9-9Z" />
      <path d="M4 21h16" />
    </svg>
  ),
  stakeholder: ({ size }) => (
    <svg {...svgProps(size)}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  certifications: ({ size }) => (
    <svg {...svgProps(size)}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  ),
};

/** Company monogram tile — not 24-grid. Rounded square, hairline border, corner notch. */
export function Monogram({ text, size = 40 }: { text: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="8"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      <path
        d="M27 1h6a6 6 0 0 1 6 6"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="var(--accent)"
        letterSpacing="0.5"
      >
        {text}
      </text>
    </svg>
  );
}

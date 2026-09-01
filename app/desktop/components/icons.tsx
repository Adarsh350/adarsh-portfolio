// Duplicated by design — app/mobile and app/desktop share no component code. Do not extract.
import type { SkillCategoryId } from "@/content/skills";

export type IconProps = { size?: number; className?: string };

function IconBase({
  size = 24,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Reuses mobile Nav's existing envelope path verbatim. */
export function Mail(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
    </IconBase>
  );
}

export function Linkedin(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a5.98 5.98 0 0 1 2-2c.62-.25 1.3-.4 2-.4Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </IconBase>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </IconBase>
  );
}

/** Two initials in a rounded-square with a --d-accent hairline and a small
 * corner notch. Not 24-grid. Also becomes public/favicon.svg. */
export function Monogram({
  text,
  size = 32,
  className,
}: {
  text: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        fill="var(--d-accent, #2b3a67)"
      />
      <path
        d="M24 1v6"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="#ffffff"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="0.5"
      >
        {text}
      </text>
    </svg>
  );
}

function SkillAnalysis(props: IconProps) {
  return (
    <IconBase {...props}>
      <line x1="3" y1="20" x2="21" y2="20" />
      <line x1="7" y1="20" x2="7" y2="13" />
      <line x1="12" y1="20" x2="12" y2="6" />
      <line x1="17" y1="20" x2="17" y2="10" />
    </IconBase>
  );
}

function SkillAiTooling(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 7v3M12 14v3M8 11h3M13 11h3" />
    </IconBase>
  );
}

function SkillContent(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7 21l-4 1 1-4L17 3Z" />
      <path d="M3 21h18" />
    </IconBase>
  );
}

function SkillStakeholder(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="8" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M15 4.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

function SkillCertifications(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="5" />
      <polyline points="8.21 13.89 7 21 12 18 17 21 15.79 13.88" />
    </IconBase>
  );
}

export const skillIcons: Record<
  SkillCategoryId,
  (p: IconProps) => React.ReactNode
> = {
  analysis: SkillAnalysis,
  "ai-tooling": SkillAiTooling,
  content: SkillContent,
  stakeholder: SkillStakeholder,
  certifications: SkillCertifications,
};

/** Decorative Hero background: a light dot-grid with two rising polylines
 * and a highlighted node. Abstract analytics motif — references the work
 * without claiming to be a screenshot of it. Static, no cursor-tracking. */
export function SignalGrid({ className }: { className?: string }) {
  const dots: React.ReactNode[] = [];
  for (let x = 0; x <= 600; x += 40) {
    for (let y = 0; y <= 440; y += 40) {
      dots.push(
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill="currentColor" />,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 600 440"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g opacity="0.35" color="var(--d-border-strong, #c9cdd6)">
        {dots}
      </g>
      <polyline
        points="40,360 160,320 240,340 320,240 420,260 560,120"
        stroke="var(--d-accent, #2b3a67)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      <polyline
        points="40,400 180,380 260,300 360,320 460,180 560,200"
        stroke="var(--d-accent, #2b3a67)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.22"
      />
      <circle cx="560" cy="120" r="6" fill="var(--d-accent, #2b3a67)" />
      <circle
        cx="560"
        cy="120"
        r="11"
        stroke="var(--d-accent, #2b3a67)"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}

/** Oversized open-envelope outline for the Contact band background — the
 * element that stops Contact reading as a Hero repeat. Decorative. */
export function EnvelopeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="24" width="232" height="152" rx="10" />
      <path d="M4 34 120 130 236 34" />
    </svg>
  );
}

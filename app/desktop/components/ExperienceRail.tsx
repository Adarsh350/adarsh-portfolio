"use client";

import { useEffect, useState } from "react";

type RailRole = {
  id: string;
  sequence: number;
  company: string;
  period: string;
  primaryMetricValue: string;
};

export default function ExperienceRail({ roles }: { roles: RailRole[] }) {
  const [activeId, setActiveId] = useState(roles[0]?.id ?? "");

  useEffect(() => {
    const sections = roles
      .map((role) => document.getElementById(role.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [roles]);

  return (
    <nav aria-label="Experience index" className="sticky top-24 self-start">
      <ol className="space-y-[var(--d-space-5)]">
        {roles.map((role) => {
          const isActive = role.id === activeId;
          return (
            <li key={role.id}>
              <a
                href={`#${role.id}`}
                aria-current={isActive ? "true" : undefined}
                className="relative block border-l-2 border-[var(--d-border)] py-1 pl-[var(--d-space-4)]"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[2px] top-0 w-[2px] bg-[var(--d-accent)] transition-[height] duration-[var(--d-dur)] ease-[var(--d-ease-out)] ${
                    isActive ? "h-full" : "h-0"
                  }`}
                />
                <span
                  className={`block text-[length:var(--d-step--1)] font-mono ${
                    isActive ? "text-[var(--d-accent)]" : "text-[var(--d-ink-3)]"
                  }`}
                >
                  0{role.sequence}
                </span>
                <span
                  className={`block text-[length:var(--d-step-0)] font-medium ${
                    isActive ? "text-[var(--d-ink)]" : "text-[var(--d-ink-3)]"
                  }`}
                >
                  {role.company}
                </span>
                <span className="block text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                  {isActive ? role.primaryMetricValue : role.period}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

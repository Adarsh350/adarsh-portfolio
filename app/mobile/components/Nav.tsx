"use client";

import { useEffect, useState } from "react";
import { navIconPaths } from "./icons";

const items = [
  { href: "#hero", label: "Home", d: navIconPaths.hero },
  { href: "#about", label: "About", d: navIconPaths.about },
  { href: "#projects", label: "Work", d: navIconPaths.projects },
  { href: "#skills", label: "Skills", d: navIconPaths.skills },
  { href: "#contact", label: "Contact", d: navIconPaths.contact },
];

export default function Nav() {
  const [activeHref, setActiveHref] = useState("#hero");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="mobile-tabbar fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white/95 backdrop-blur"
      aria-label="Section navigation"
    >
      <ul className="flex">
        {items.map((item) => {
          const isActive = item.href === activeHref;
          return (
            <li key={item.href} className="flex-1">
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px] font-medium active:text-[var(--accent)] ${
                  isActive ? "text-[var(--accent)]" : "text-[var(--muted)]"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={item.d} />
                </svg>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

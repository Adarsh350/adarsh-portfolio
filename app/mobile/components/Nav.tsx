"use client";

import { useEffect, useState } from "react";

const items = [
  { href: "#hero", label: "Home", d: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" },
  {
    href: "#about",
    label: "About",
    d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  },
  {
    href: "#projects",
    label: "Work",
    d: "M4 7h16v12H4zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  },
  {
    href: "#skills",
    label: "Skills",
    d: "M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8",
  },
  {
    href: "#contact",
    label: "Contact",
    d: "M3 6h18v12H3zM3 7l9 6 9-6",
  },
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

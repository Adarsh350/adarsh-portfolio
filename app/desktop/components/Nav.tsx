"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { Monogram, ArrowUpRight } from "./icons";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [activeHref, setActiveHref] = useState("#about");
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = linkRefs.current[activeHref];
    const list = listRef.current;
    if (!el || !list) return;
    const listRect = list.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    list.style.setProperty("--d-nav-x", `${elRect.left - listRect.left}px`);
    list.style.setProperty("--d-nav-w", `${elRect.width}px`);
  }, [activeHref]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--d-dur)] ${
        scrolled
          ? "bg-[var(--d-surface)] shadow-[var(--d-shadow-1)]"
          : "bg-transparent"
      }`}
    >
      <nav className="d-container flex h-20 items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-3 text-[length:var(--d-step-0)] font-semibold tracking-tight text-[var(--d-ink)]"
        >
          <Monogram text="AS" size={32} />
          {profile.name}
        </a>

        <ul ref={listRef} className="relative flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <li key={link.href}>
                <a
                  ref={(el) => {
                    linkRefs.current[link.href] = el;
                  }}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-[length:var(--d-step--1)] font-medium transition-colors duration-[var(--d-dur-fast)] ${
                    isActive
                      ? "text-[var(--d-ink)]"
                      : "text-[var(--d-ink-3)] hover:text-[var(--d-ink)]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2 h-[2px] rounded-full bg-[var(--d-accent)] transition-all duration-[var(--d-dur)] ease-[var(--d-ease-out)]"
            style={{
              transform: "translateX(var(--d-nav-x, 0px))",
              width: "var(--d-nav-w, 0px)",
            }}
          />
        </ul>

        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-[var(--d-r-full)] bg-[var(--d-ink)] px-5 py-2.5 text-[length:var(--d-step--1)] font-medium text-white transition-colors duration-[var(--d-dur-fast)] hover:bg-[var(--d-accent)]"
        >
          Get in touch
          <ArrowUpRight size={14} />
        </a>
      </nav>
    </header>
  );
}

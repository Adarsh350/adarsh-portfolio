"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "./icons";

const links = [
  { href: "#work", label: "Work" },
  { href: "#builds", label: "Builds" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links.map(({ href }) => document.querySelector(href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -68%", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-nav">
      <a className="wordmark" href="#top" aria-label="Adarsh Shankar, back to top"><span>AS</span><strong>Adarsh Shankar</strong></a>
      <nav aria-label="Primary navigation">
        {links.map((link) => <a key={link.href} href={link.href} aria-current={active === link.href.slice(1) ? "location" : undefined}>{link.label}</a>)}
      </nav>
      <a className="resume-link" href="/Adarsh_Shankar_Resume.pdf" download>Resume <ArrowDown /></a>
    </header>
  );
}

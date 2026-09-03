"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const stills = [
  { src: "/assets/trussme/dashboard-overview.png", width: 2764, height: 1468, label: "Dashboard overview", detail: "A single view across campaign volume, engagement, and delivery health." },
  { src: "/assets/trussme/overview.png", width: 2774, height: 950, label: "Campaign overview", detail: "Account-level reporting across the selected time range." },
  { src: "/assets/trussme/trends.png", width: 2750, height: 1008, label: "Performance trends", detail: "Delivery health, opens, and clicks plotted across campaigns over time." },
  { src: "/assets/trussme/campaign-explorer.png", width: 2770, height: 1468, label: "Campaign explorer", detail: "A searchable campaign table with sortable performance columns." },
  { src: "/assets/trussme/insights.png", width: 2758, height: 942, label: "Campaign insights", detail: "Key observations surfaced from campaign performance data." },
  { src: "/assets/trussme/comparison.png", width: 2768, height: 1466, label: "Campaign comparison", detail: "Side-by-side comparison of campaign metrics and change." },
  { src: "/assets/trussme/click-performance.png", width: 2764, height: 1208, label: "Click performance", detail: "Top links ranked by total clicks, unique clicks, and share of clicks." },
  { src: "/assets/trussme/performance-24h.png", width: 2772, height: 968, label: "24-hour performance", detail: "Opens and clicks tracked in the first day after delivery." },
  { src: "/assets/trussme/recent-campaigns.png", width: 2746, height: 1454, label: "Recent campaigns", detail: "Recent sends organized with volume, open rate, click rate, and unsubscribe data." },
  { src: "/assets/trussme/analysis.png", width: 2180, height: 474, label: "Automated analysis", detail: "A plain-language performance assessment generated for a campaign." },
];

export function TrussmeEvidence() {
  const [active, setActive] = useState(0);
  const current = stills[active];

  const move = (direction: 1 | -1) => {
    setActive((index) => (index + direction + stills.length) % stills.length);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="trussme-evidence" aria-labelledby="trussme-evidence-title">
      <div className="evidence-heading">
        <div>
          <p className="micro-label">Interface evidence</p>
          <h4 id="trussme-evidence-title">A reporting layer built for the work behind the campaigns.</h4>
        </div>
        <div className="evidence-heading-side">
          <p className="evidence-caption">Use the arrows to inspect the dashboard one screen at a time.</p>
          <p className="evidence-build-note"><span>Built independently</span>Google Anti-Gravity</p>
        </div>
      </div>
      <div className="evidence-carousel" aria-roledescription="carousel" aria-label="Trussme dashboard screens">
        <button className="evidence-arrow evidence-arrow-left" type="button" onClick={() => move(-1)} aria-label="Previous dashboard screen">←</button>
        <div className="evidence-slide" aria-live="polite">
          <Image src={current.src} alt={`Trussme dashboard: ${current.label.toLowerCase()}`} width={current.width} height={current.height} sizes="(max-width: 700px) calc(100vw - 32px), 100vw" priority={active === 0} />
        </div>
        <button className="evidence-arrow evidence-arrow-right" type="button" onClick={() => move(1)} aria-label="Next dashboard screen">→</button>
      </div>
      <div className="evidence-caption-row">
        <div>
          <p className="evidence-current"><span>{String(active + 1).padStart(2, "0")}</span> / {String(stills.length).padStart(2, "0")}</p>
          <h5>{current.label}</h5>
          <p>{current.detail}</p>
        </div>
        <div className="evidence-dots" aria-label="Choose a dashboard screen">
          {stills.map((still, index) => <button key={still.src} type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show ${still.label}`} aria-current={index === active ? "true" : undefined} />)}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const stills = [
  { src: "/assets/trussme/overview.png", label: "Account overview" },
  { src: "/assets/trussme/trends.png", label: "Performance trends" },
  { src: "/assets/trussme/comparison.png", label: "Campaign comparison" },
  { src: "/assets/trussme/analysis.png", label: "Automated analysis" },
];

export function TrussmeEvidence() {
  return (
    <section className="trussme-evidence" aria-labelledby="trussme-evidence-title">
      <div className="evidence-heading">
        <div>
          <p className="micro-label">Interface evidence</p>
          <h4 id="trussme-evidence-title">A reporting layer built for the work behind the campaigns.</h4>
        </div>
        <p className="evidence-caption">Screen recording and interface stills from the Trussme dashboard.</p>
      </div>
      <div className="evidence-video-wrap">
        <video
          className="evidence-video"
          controls
          preload="metadata"
          poster="/assets/trussme/walkthrough-poster.jpg"
          aria-label="Trussme dashboard walkthrough"
          playsInline
        >
          <source src="/assets/trussme/dashboard-walkthrough.mp4" type="video/mp4" />
          Your browser does not support the video element.
        </video>
        <span className="evidence-video-label">00:28 / dashboard walkthrough</span>
      </div>
      <div className="evidence-stills">
        {stills.map((still, index) => (
          <figure key={still.src}>
            <div className="evidence-still-image">
              <Image src={still.src} alt={`Trussme dashboard: ${still.label.toLowerCase()}`} fill sizes="(max-width: 700px) 50vw, 25vw" />
            </div>
            <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{still.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

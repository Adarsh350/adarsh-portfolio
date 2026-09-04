import type { CaseStudy as CaseStudyType } from "@/content/experience";
import { ArrowUpRight } from "./icons";
import { SystemDiagram } from "./system-diagram";
import { TrussmeEvidence } from "./trussme-evidence";

export function CaseStudy({ study }: { study: CaseStudyType }) {
  return (
    <article className="case-study" id={study.id}>
      <aside className="case-meta">
        <span>{study.index} / 04</span>
        <p>{study.period}</p>
        <p>{study.location}</p>
      </aside>
      <div className="case-main">
        <div className="case-title-row">
          <div><p className="case-company">{study.company} <span>· {study.descriptor}</span></p><p className="case-role">{study.role}</p></div>
          {study.evidence ? <a className="evidence-link" href={study.evidence.href} target="_blank" rel="noreferrer">{study.evidence.label}<span className="sr-only"> (opens in a new tab)</span><ArrowUpRight /></a> : <span className="source-label">Resume-backed</span>}
        </div>
        <h3>{study.headline}</h3>
        <p className="case-narrative">{study.narrative}</p>
        <div className="metric-band">
          {study.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
        </div>
        {study.id === "trussme" ? (
          <div className="trussme-breakdown" aria-label="Trussme case study context">
            <div><p className="micro-label">The opportunity</p><p>Connect campaign execution to lead quality through landing pages, tracking, automation, and reporting.</p></div>
            <div><p className="micro-label">The build</p><p>Built the live client dashboard and automated bounce and campaign reporting on Cloudflare Workers, independently using Google Anti-Gravity.</p></div>
            <div><p className="micro-label">My ownership</p><p>Led a four-person email team across more than 10 B2B and B2C clients while building the systems behind the work.</p></div>
          </div>
        ) : null}
        {study.id === "trussme" ? <TrussmeEvidence /> : null}
        <div className="case-detail-grid">
          <div className="case-work"><p className="micro-label">What I did</p><ol>{study.work.map((item) => <li key={item}>{item}</li>)}</ol></div>
          <SystemDiagram type={study.diagram} />
        </div>
        <div className="tool-line"><span>Toolkit</span><p>{study.tools.join(" · ")}</p></div>
      </div>
    </article>
  );
}

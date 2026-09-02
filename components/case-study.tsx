import type { CaseStudy as CaseStudyType } from "@/content/experience";
import { ArrowUpRight } from "./icons";
import { SystemDiagram } from "./system-diagram";

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
        <div className="case-detail-grid">
          <div className="case-work"><p className="micro-label">What I did</p><ol>{study.work.map((item) => <li key={item}>{item}</li>)}</ol></div>
          <SystemDiagram type={study.diagram} />
        </div>
        <div className="tool-line"><span>Toolkit</span><p>{study.tools.join(" · ")}</p></div>
      </div>
    </article>
  );
}

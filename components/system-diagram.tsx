import type { CaseStudy } from "@/content/experience";

const diagrams = {
  visibility: { label: "Visibility system", nodes: ["Brand signals", "100+ markers", "4 AI engines", "Priority actions"], footer: "Audit → diagnose → improve" },
  lifecycle: { label: "Lifecycle system", nodes: ["Campaign", "Landing page", "Lead pipeline", "Live reporting"], footer: "Send → qualify → attribute" },
  growth: { label: "Growth loop", nodes: ["Message", "User behavior", "GA4 test", "Product action"], footer: "Learn → test → compound" },
  product: { label: "Product marketing loop", nodes: ["Research", "Positioning", "Experience", "Conversion"], footer: "Insight → narrative → outcome" },
} satisfies Record<CaseStudy["diagram"], { label: string; nodes: string[]; footer: string }>;

export function SystemDiagram({ type }: { type: CaseStudy["diagram"] }) {
  const diagram = diagrams[type];
  return (
    <div className={`system-diagram diagram-${type}`} aria-label={diagram.label}>
      <div className="diagram-head"><span>System map</span><span>Live / 0{diagram.nodes.length}</span></div>
      <div className="diagram-grid">
        {diagram.nodes.map((node, index) => <div className="diagram-node" key={node}><span>0{index + 1}</span><strong>{node}</strong></div>)}
      </div>
      <div className="diagram-path" aria-hidden="true"><i /><i /><i /></div>
      <p>{diagram.footer}</p>
    </div>
  );
}

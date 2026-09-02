import { proofPoints } from "@/content/profile";

export function ProofLedger() {
  return (
    <section className="proof-ledger" aria-label="Selected results">
      {proofPoints.map((point, index) => (
        <a href={point.href} key={point.href}>
          <span className="proof-index">0{index + 1}</span>
          <strong>{point.value}</strong>
          <span>{point.label}</span>
        </a>
      ))}
    </section>
  );
}

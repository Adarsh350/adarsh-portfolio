import { additionalExperience } from "@/content/experience";

export default function AdditionalExperience() {
  return (
    <div className="mt-[var(--d-section-y)]">
      <div className="d-rule" aria-hidden="true" />
      <p className="mt-[var(--d-space-6)] text-[length:var(--d-step--1)] font-medium uppercase tracking-widest text-[var(--d-ink-3)]">
        Earlier
      </p>

      <div className="mt-[var(--d-space-5)] divide-y divide-[var(--d-border)]">
        {additionalExperience.map((role) => (
          <article
            key={role.id}
            className="grid gap-[var(--d-space-6)] py-[var(--d-space-6)] first:pt-0 last:pb-0 md:grid-cols-[1fr_2fr]"
          >
            <div>
              <h3 className="text-[length:var(--d-step-1)] font-semibold tracking-tight text-[var(--d-ink)]">
                {role.title}
              </h3>
              <p className="mt-1 text-[length:var(--d-step-0)] text-[var(--d-ink-2)]">
                {role.company}
              </p>
              <p className="mt-1 text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                {role.location} · {role.period}
              </p>
            </div>

            <ul className="space-y-[var(--d-space-2)] text-[length:var(--d-step--1)] leading-relaxed text-[var(--d-ink-3)]">
              {role.highlights.map((highlight) => (
                <li key={highlight} className="d-node">
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

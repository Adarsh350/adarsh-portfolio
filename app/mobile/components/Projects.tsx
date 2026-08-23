import { experience, additionalExperience } from "@/content/experience";

export default function Projects() {
  const sorted = [...experience].sort((a, b) => a.sequence - b.sequence);

  return (
    <section id="projects" className="py-10">
      <h2 className="mb-1 px-6 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        Experience
      </h2>
      <p className="mb-5 px-6 text-sm text-[var(--muted)]">
        Swipe to see how each role was built.
      </p>

      <div className="snap-row flex gap-4 overflow-x-auto px-6 pb-2">
        {sorted.map((role) => (
          <article
            key={role.id}
            className="snap-card flex w-[85vw] max-w-sm shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
          >
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {role.company}
                </span>
                {role.current && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    Current
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold leading-snug">{role.title}</h3>
              <p className="text-xs text-[var(--muted)]">
                {role.location} · {role.period}
              </p>
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {role.companyNote}
              </p>

              <div className="flex items-baseline gap-2 rounded-xl bg-[var(--surface)] px-4 py-3">
                <span className="text-2xl font-bold text-[var(--accent)]">
                  {role.primaryMetric.value}
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {role.primaryMetric.label}
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-3">
                {role.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[11px] text-[var(--muted)]">
                      {stat.label}
                    </dt>
                    <dd className="text-sm font-semibold">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <details className="mt-1 border-t border-[var(--border)] pt-3">
                <summary className="flex min-h-[44px] cursor-pointer items-center justify-between text-sm font-semibold text-[var(--fg)]">
                  Full role
                  <svg
                    className="chevron"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>

                <div className="flex flex-col gap-4 pt-3 text-sm leading-relaxed text-[var(--fg)]">
                  <div>
                    <h4 className="mb-1 font-semibold">Highlights</h4>
                    <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
                      {role.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-semibold">Tools</h4>
                    <p className="text-[var(--muted)]">
                      {role.tools.join(", ")}
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>

      <h3 className="mb-3 mt-8 px-6 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        Additional Experience
      </h3>
      <div className="flex flex-col gap-3 px-6">
        {additionalExperience.map((role) => (
          <div
            key={role.id}
            className="rounded-2xl border border-[var(--border)] bg-white p-4"
          >
            <h4 className="text-sm font-semibold">{role.title}</h4>
            <p className="text-xs text-[var(--muted)]">
              {role.company} · {role.location} · {role.period}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[var(--muted)]">
              {role.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

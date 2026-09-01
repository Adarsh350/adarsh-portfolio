import { experience } from "@/content/experience";
import { Monogram } from "./icons";
import ExperienceRail from "./ExperienceRail";
import AdditionalExperience from "./AdditionalExperience";

export default function Experience() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-[var(--d-surface-2)] py-[var(--d-section-y)]"
    >
      <div className="d-container">
        <p className="text-[length:var(--d-step--1)] font-medium uppercase tracking-widest text-[var(--d-accent)]">
          Experience
        </p>
        <h2 className="mt-[var(--d-space-3)] text-[length:var(--d-step-4)] font-semibold tracking-tight text-[var(--d-ink)]">
          Professional Experience
        </h2>

        <div className="mt-[var(--d-space-8)] grid grid-cols-[minmax(200px,22%)_1fr] gap-[var(--d-space-8)]">
          <ExperienceRail
            roles={experience.map((role) => ({
              id: role.id,
              sequence: role.sequence,
              company: role.company,
              period: role.period,
              primaryMetricValue: role.primaryMetric.value,
            }))}
          />

          <div className="flex flex-col gap-[var(--d-space-8)]">
            {experience.map((role) => (
              <article
                key={role.id}
                id={role.id}
                className={`scroll-mt-24 rounded-[var(--d-r-lg)] border border-[var(--d-border)] p-[var(--d-space-6)] ${
                  role.current
                    ? "bg-[var(--d-accent-soft)]"
                    : "bg-[var(--d-surface)]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Monogram text={role.monogram} size={40} />
                    <div>
                      <h3
                        className={`font-semibold tracking-tight text-[var(--d-ink)] ${
                          role.current
                            ? "text-[length:var(--d-step-5)]"
                            : "text-[length:var(--d-step-4)]"
                        }`}
                      >
                        {role.title} · {role.company}
                      </h3>
                      <p className="mt-1 text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                        {role.location}
                      </p>
                    </div>
                  </div>

                  {role.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-[var(--d-r-full)] bg-[var(--d-accent)] px-3 py-1 text-[length:var(--d-step--1)] font-medium text-white">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-white"
                      />
                      Current role
                    </span>
                  ) : (
                    <span className="rounded-[var(--d-r-full)] border border-[var(--d-border-strong)] px-3 py-1 text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                      {role.period}
                    </span>
                  )}
                </div>

                <p className="mt-[var(--d-space-3)] text-[length:var(--d-step-0)] italic text-[var(--d-ink-3)]">
                  {role.companyNote}
                </p>

                <div className="mt-[var(--d-space-6)] border-t border-[var(--d-border)] pt-[var(--d-space-5)]">
                  <p className="text-[length:var(--d-step-5)] font-semibold text-[var(--d-metric)]">
                    {role.primaryMetric.value}
                  </p>
                  <p className="text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                    {role.primaryMetric.label}
                  </p>

                  <dl className="mt-[var(--d-space-5)] grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-[var(--d-space-5)]">
                    {role.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="sr-only">{stat.label}</dt>
                        <dd className="text-[length:var(--d-step-1)] font-semibold text-[var(--d-ink)]">
                          {stat.value}
                        </dd>
                        <dd className="mt-1 text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                          {stat.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <ul className="mt-[var(--d-space-6)] space-y-[var(--d-space-3)]">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="d-node text-[length:var(--d-step-0)] leading-relaxed text-[var(--d-ink-2)]"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-[var(--d-space-6)]">
                  <p className="text-[length:var(--d-step--1)] font-medium uppercase tracking-widest text-[var(--d-ink-3)]">
                    Tools
                  </p>
                  <ul className="mt-[var(--d-space-3)] flex flex-wrap gap-2">
                    {role.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-[var(--d-r-full)] border border-[var(--d-border)] px-3 py-1 text-[length:var(--d-step--1)] text-[var(--d-ink-2)]"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <AdditionalExperience />
      </div>
    </section>
  );
}

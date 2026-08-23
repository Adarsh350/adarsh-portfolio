import { experience, additionalExperience } from "@/content/experience";

export default function Projects() {
  return (
    <section id="projects" className="bg-slate-50 py-28">
      <div className="d-container">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--d-accent)]">
          Experience
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Professional Experience
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-8">
          {experience.map((role) => (
            <article
              key={role.id}
              tabIndex={0}
              className="d-card group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d-accent)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {role.monogram}
                </div>
                {role.current && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Current
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {role.title} · {role.company}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {role.location} · {role.period}
              </p>
              <p className="mt-2 text-sm text-slate-600">{role.companyNote}</p>

              <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">
                    {role.primaryMetric.value}
                  </p>
                  <p className="text-xs text-slate-500">
                    {role.primaryMetric.label}
                  </p>
                </div>
              </div>

              {/* Hover-reveal detail panel — desktop has a precise pointer,
                  so highlights surface on hover instead of a second page. */}
              <div className="d-card-overlay absolute inset-x-0 bottom-0 flex h-2/3 flex-col justify-end bg-slate-900/95 p-6 text-white">
                <p className="text-xs font-medium uppercase tracking-widest text-indigo-300">
                  Highlights
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {role.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <h3 className="mt-20 text-xl font-semibold tracking-tight text-slate-900">
          Additional Experience
        </h3>
        <div className="mt-6 grid grid-cols-3 gap-6">
          {additionalExperience.map((role) => (
            <div
              key={role.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h4 className="text-sm font-semibold text-slate-900">
                {role.title}
              </h4>
              <p className="text-xs text-slate-500">
                {role.company} · {role.location}
              </p>
              <p className="mt-1 text-xs text-slate-400">{role.period}</p>
              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

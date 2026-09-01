import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { Mail, ArrowUpRight, SignalGrid } from "./icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[var(--d-surface)]"
    >
      <SignalGrid className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[42rem] text-[var(--d-border-strong)] opacity-60 md:block" />

      <div className="d-container relative grid grid-cols-1 items-center gap-16 pb-[var(--d-space-9)] pt-[calc(var(--d-space-9)+2rem)] lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-[length:var(--d-step--1)] font-medium uppercase tracking-widest text-[var(--d-ink-3)]">
            {profile.availability}
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[var(--d-ink-3)]"
            />
            {profile.location}
          </p>

          <h1 className="mt-[var(--d-space-4)] text-[length:var(--d-step-6)] font-semibold tracking-tight text-balance text-[var(--d-ink)]">
            {profile.name}
          </h1>
          <p className="mt-[var(--d-space-2)] text-[length:var(--d-step-3)] font-medium text-[var(--d-accent)]">
            {profile.headline}
          </p>
          <p className="mt-[var(--d-space-5)] max-w-[54ch] text-[length:var(--d-step-1)] leading-relaxed text-[var(--d-ink-2)]">
            {profile.valueProp}
          </p>

          <ul className="mt-[var(--d-space-6)] flex flex-wrap gap-3">
            {profile.eligibility.map((item) => (
              <li
                key={item}
                className="rounded-[var(--d-r-full)] border border-[var(--d-border)] px-4 py-1.5 text-[length:var(--d-step--1)] text-[var(--d-ink-2)]"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-[var(--d-space-7)] flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 rounded-[var(--d-r-full)] bg-[var(--d-ink)] px-6 py-3 text-[length:var(--d-step-0)] font-medium text-white transition-colors duration-[var(--d-dur-fast)] hover:bg-[var(--d-accent)]"
            >
              See the work
              <ArrowUpRight size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 rounded-[var(--d-r-full)] border border-[var(--d-border-strong)] px-6 py-3 text-[length:var(--d-step-0)] font-medium text-[var(--d-ink)] transition-colors duration-[var(--d-dur-fast)] hover:border-[var(--d-ink)]"
            >
              <Mail size={16} />
              Email me
            </a>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          {experience.map((role) => (
            <div
              key={role.id}
              className="rounded-[var(--d-r-lg)] border border-[var(--d-border)] bg-[var(--d-surface)] p-5 shadow-[var(--d-shadow-1)]"
            >
              <p className="text-[length:var(--d-step-2)] font-semibold text-[var(--d-metric)]">
                {role.primaryMetric.value}
              </p>
              <p className="mt-1 text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                {role.primaryMetric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

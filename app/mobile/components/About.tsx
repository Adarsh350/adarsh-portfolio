import { profile } from "@/content/profile";

export default function About() {
  return (
    <section id="about" className="px-6 py-10">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        About
      </h2>
      <p className="text-[15px] leading-relaxed text-[var(--fg)]">
        {profile.bio}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {profile.eligibility.map((item) => (
          <li
            key={item}
            className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs text-[var(--fg)]"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 border-t border-[var(--border)] pt-4">
        {profile.education.map((edu) => (
          <div key={edu.school}>
            <p className="text-sm font-semibold">{edu.school}</p>
            <p className="text-xs text-[var(--muted)]">
              {edu.degree} · {edu.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

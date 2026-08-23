import { skills } from "@/content/skills";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-10">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        Skills
      </h2>

      <div className="flex flex-col gap-6">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-2 text-sm font-semibold">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-[13px] text-[var(--fg)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

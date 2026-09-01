import { skills } from "@/content/skills";
import { skillIcons } from "./icons";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-10">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        Skills
      </h2>

      <div className="flex flex-col gap-6">
        {skills.map((group) => {
          const Icon = skillIcons[group.id];
          return (
          <div key={group.category}>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Icon size={16} />
              {group.category}
            </h3>
            {group.note && (
              <p className="mb-2 text-xs text-[var(--muted)]">{group.note}</p>
            )}
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
          );
        })}
      </div>
    </section>
  );
}

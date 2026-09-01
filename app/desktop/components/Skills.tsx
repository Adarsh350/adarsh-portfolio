import { skills } from "@/content/skills";

export default function Skills() {
  return (
    <section id="skills" className="d-container py-28">
      <p className="text-sm font-medium uppercase tracking-widest text-[var(--d-accent)]">
        Skills
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        What I bring
      </h2>

      <div className="mt-14 grid grid-cols-4 gap-8">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold text-slate-900">
              {group.category}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-slate-600">
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

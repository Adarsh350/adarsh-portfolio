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
    </section>
  );
}

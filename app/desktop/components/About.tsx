import Image from "next/image";
import headshot from "@/public/assets/headshot/adarsh-shankar.png";
import { profile } from "@/content/profile";

export default function About() {
  return (
    <section id="about" className="d-container py-[var(--d-section-y)]">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(220px,26%)_1fr] md:gap-[var(--d-space-8)]">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-3 -top-3 h-full w-full rounded-[var(--d-r-lg)] border border-[var(--d-accent)]"
          />
          <div className="relative aspect-square overflow-hidden rounded-[var(--d-r-lg)] bg-[var(--d-surface-2)]">
            <Image
              src={headshot}
              alt={profile.name}
              fill
              sizes="26vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-[length:var(--d-step--1)] font-medium uppercase tracking-widest text-[var(--d-accent)]">
            About
          </p>
          <p className="mt-[var(--d-space-4)] max-w-[62ch] text-[length:var(--d-step-2)] leading-relaxed text-balance text-[var(--d-ink)]">
            {profile.bio}
          </p>

          <div className="mt-[var(--d-space-7)] rounded-[var(--d-r-md)] border border-[var(--d-border)] p-[var(--d-space-5)]">
            {profile.education.map((cred, i) => (
              <div key={cred.school}>
                {i > 0 && <hr className="d-rule my-[var(--d-space-5)]" />}
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
                  <h3 className="text-[length:var(--d-step-0)] font-semibold text-[var(--d-ink)]">
                    {cred.school}
                  </h3>
                  <p className="text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                    {cred.period}
                  </p>
                </div>
                <p className="mt-1 text-[length:var(--d-step--1)] text-[var(--d-ink-2)]">
                  {cred.degree}
                </p>
                <p className="mt-1 text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                  {cred.qualifier}
                </p>
                {cred.leadership && (
                  <p className="mt-1 text-[length:var(--d-step--1)] text-[var(--d-ink-3)]">
                    {cred.leadership}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

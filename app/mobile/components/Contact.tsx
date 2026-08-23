import { profile } from "@/content/profile";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-10">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        Contact
      </h2>
      <p className="mb-5 text-sm text-[var(--muted)]">
        Based in {profile.location}. Reach out directly.
      </p>

      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="flex min-h-[52px] items-center justify-between rounded-2xl border border-[var(--border)] px-5 text-sm font-semibold"
        >
          {profile.email}
          <span aria-hidden="true">&rarr;</span>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[52px] items-center justify-between rounded-2xl border border-[var(--border)] px-5 text-sm font-semibold"
        >
          LinkedIn
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}

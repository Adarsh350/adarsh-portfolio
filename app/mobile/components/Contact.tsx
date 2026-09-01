import { profile } from "@/content/profile";
import { Mail, Linkedin, ArrowUpRight } from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-10">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        Contact
      </h2>
      <p className="mb-5 text-sm text-[var(--muted)]">
        Based in {profile.location}. {profile.availability}. Reach out directly.
      </p>

      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="flex min-h-[52px] items-center justify-between gap-2 rounded-2xl border border-[var(--border)] px-5 text-sm font-semibold"
        >
          <span className="flex items-center gap-2">
            <Mail size={16} />
            {profile.email}
          </span>
          <ArrowUpRight size={16} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[52px] items-center justify-between gap-2 rounded-2xl border border-[var(--border)] px-5 text-sm font-semibold"
        >
          <span className="flex items-center gap-2">
            <Linkedin size={16} />
            LinkedIn
          </span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

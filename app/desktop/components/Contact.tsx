import { profile } from "@/content/profile";

export default function Contact() {
  return (
    <section id="contact" className="bg-slate-900 py-28 text-white">
      <div className="d-container text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-300">
          Contact
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
          Let&apos;s talk about your next campaign.
        </h2>
        <p className="mt-3 text-slate-400">{profile.location}</p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-indigo-200"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

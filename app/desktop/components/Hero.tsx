import { profile } from "@/content/profile";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-slate-900 text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950" />

      <div className="d-container relative grid grid-cols-[1.1fr_1fr] items-center gap-16 py-32">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-300">
            {profile.location}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl text-slate-300">{profile.headline}</p>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            {profile.valueProp}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-indigo-200"
            >
              Get in touch
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white"
            >
              Email me
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-300">
            Eligibility
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {profile.eligibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-medium uppercase tracking-widest text-indigo-300">
            Availability
          </p>
          <p className="mt-2 text-sm text-slate-200">{profile.availability}</p>
        </div>
      </div>
    </section>
  );
}

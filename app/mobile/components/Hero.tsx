import Image from "next/image";
import { profile } from "@/content/profile";
import headshot from "@/public/assets/headshot/adarsh-shankar.png";
import { Mail, ArrowUpRight } from "./icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center gap-4 px-6 pt-14 pb-10 text-center"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[var(--border)]">
        <Image
          src={headshot}
          alt={profile.name}
          fill
          sizes="96px"
          className="object-cover"
          placeholder="blur"
          priority
        />
      </div>

      <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="max-w-xs text-base font-medium text-[var(--accent)]">
        {profile.headline}
      </p>
      <p className="text-sm text-[var(--muted)]">{profile.location}</p>
      <p className="max-w-xs text-sm leading-relaxed text-[var(--fg)]">
        {profile.valueProp}
      </p>

      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--fg)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
        {profile.availability}
      </span>

      <div className="mt-2 flex w-full max-w-xs flex-col gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white"
        >
          <Mail size={16} />
          Email me
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[var(--border)] px-6 text-sm font-semibold text-[var(--fg)]"
        >
          Connect on LinkedIn
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

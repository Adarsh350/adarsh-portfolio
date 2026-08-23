import Image from "next/image";
import { profile } from "@/content/profile";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center gap-4 px-6 pt-14 pb-10 text-center"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[var(--border)]">
        <Image
          src="/assets/headshot/adarsh-shankar.png"
          alt={profile.name}
          fill
          sizes="96px"
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="max-w-xs text-base font-medium text-[var(--accent)]">
        {profile.headline}
      </p>
      <p className="text-sm text-[var(--muted)]">{profile.location}</p>

      <div className="mt-2 flex w-full max-w-xs flex-col gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white"
        >
          Email me
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] items-center justify-center rounded-full border border-[var(--border)] px-6 text-sm font-semibold text-[var(--fg)]"
        >
          Connect on LinkedIn
        </a>
      </div>
    </section>
  );
}

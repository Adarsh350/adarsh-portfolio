import Image from "next/image";
import { profile } from "@/content/profile";

export default function About() {
  return (
    <section id="about" className="d-container py-28">
      <div className="grid grid-cols-[280px_1fr] items-center gap-16">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/assets/headshot/adarsh-shankar.png"
            alt={profile.name}
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--d-accent)]">
            About
          </p>
          <p className="mt-4 max-w-2xl text-2xl leading-relaxed text-slate-800 text-balance">
            {profile.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

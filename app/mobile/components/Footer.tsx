import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-8 text-center text-xs text-[var(--muted)]">
      <p>
        &copy; {new Date().getFullYear()} {profile.name}. {profile.location}.
      </p>
    </footer>
  );
}

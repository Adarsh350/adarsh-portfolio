import { profile } from "@/content/profile";
import { Monogram } from "./icons";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-[var(--border)] px-6 py-8 text-center text-xs text-[var(--muted)]">
      <Monogram text="AS" size={28} />
      <p>
        &copy; {new Date().getFullYear()} {profile.name}. {profile.location}.
      </p>
    </footer>
  );
}

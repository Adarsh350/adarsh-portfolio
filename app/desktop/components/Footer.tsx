import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="d-container flex items-center justify-between text-sm text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <a href={`mailto:${profile.email}`} className="hover:text-slate-900">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}

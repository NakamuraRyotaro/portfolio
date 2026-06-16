import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-800/80">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-neutral-200">{profile.name}</p>
          <p className="mt-1 text-xs text-neutral-500">
            © 2026 {profile.nameEn} ・ AI × Healthcare Engineer
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm text-neutral-400">
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-emerald-400"
            >
              GitHub
            </a>
          )}
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-emerald-400"
          >
            Email
          </a>
          <Link href="/contact" className="transition-colors hover:text-emerald-400">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

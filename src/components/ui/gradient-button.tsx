import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** グラデーション枠が走るプライマリボタン */
export function GradientButton({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <span className="relative z-10 flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-neutral-50 transition-colors group-hover:bg-neutral-900">
      {children}
    </span>
  );
  const wrapper =
    "group relative inline-flex rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 p-px shadow-[0_0_25px_-5px_rgba(16,185,129,0.5)] transition-shadow hover:shadow-[0_0_35px_-3px_rgba(16,185,129,0.7)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(wrapper, className)}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(wrapper, className)}>
      {inner}
    </Link>
  );
}

/** 控えめなアウトラインボタン */
export function GhostButton({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-neutral-900",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** マウス追従の発光スポットを持つカード (Aceternity: Card Spotlight 風) */
export default function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors duration-300 hover:border-emerald-500/40",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(16,185,129,0.12), transparent 65%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

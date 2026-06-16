"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getTechIcon } from "@/components/ui/tech-icon";

export default function InfiniteMovingCards({
  items,
  speed = "slow",
  className,
}: {
  items: string[];
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const dup = item.cloneNode(true);
      scrollerRef.current?.appendChild(dup);
    });
    const dur = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "70s";
    containerRef.current.style.setProperty("--animation-duration", dur);
    setStart(true);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-3 py-2",
          start && "animate-scroll",
        )}
      >
        {items.map((item) => {
          const Icon = getTechIcon(item);
          return (
            <li
              key={item}
              className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-emerald-500/40 hover:text-neutral-100"
            >
              <Icon className="h-4 w-4 text-neutral-400" />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

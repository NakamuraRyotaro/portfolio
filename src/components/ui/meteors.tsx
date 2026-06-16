"use client";

import { cn } from "@/lib/utils";

export default function Meteors({ number = 20 }: { number?: number }) {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((_, idx) => {
        const left = Math.floor((idx / number) * 120) - 10; // deterministic, SSR-safe
        const delay = ((idx * 7) % 50) / 10; // 0–5s
        const duration = 4 + ((idx * 3) % 5); // 4–8s
        return (
          <span
            key={idx}
            className={cn(
              "absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-emerald-300 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-px before:w-12 before:-translate-y-1/2 before:bg-gradient-to-r before:from-emerald-300 before:to-transparent before:content-['']",
            )}
            style={{
              top: 0,
              left: left + "%",
              animationDelay: delay + "s",
              animationDuration: duration + "s",
            }}
          />
        );
      })}
    </>
  );
}

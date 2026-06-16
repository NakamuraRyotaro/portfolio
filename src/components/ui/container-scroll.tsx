"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** スクロールで3Dに起き上がる画面 (Aceternity: Container Scroll Animation 風) */
export default function ContainerScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className="[perspective:1000px]">
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className="mx-auto w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-900/60 p-2 shadow-[0_30px_80px_-20px_rgba(16,185,129,0.3)]"
      >
        {children}
      </motion.div>
    </div>
  );
}

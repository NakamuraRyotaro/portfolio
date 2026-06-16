"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** マウス追従で3D傾斜する軽量カード。子要素は translateZ で浮かせる。 */
export default function TiltCard({
  children,
  className,
  intensity = 12,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`,
    );
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTransform("")}
      className={cn("group/tilt [perspective:1200px]", className)}
    >
      <div
        className="transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{ transform }}
      >
        {children}
      </div>
    </div>
  );
}

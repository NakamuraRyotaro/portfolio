import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function AuroraBackground({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -inset-[10px] opacity-40 blur-[10px] will-change-transform",
            "[background-image:repeating-linear-gradient(100deg,#10B981_10%,#22D3EE_20%,#8B5CF6_30%,#10B981_40%)]",
            "[background-size:200%_100%] animate-aurora",
            "[mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_70%)]",
          )}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

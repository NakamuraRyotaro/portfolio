import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import TechIcon from "@/components/ui/tech-icon";

const roleLabel: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  infra: "Infra",
  fullstack: "Fullstack",
};

export default function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const cover = project.cover ?? project.images?.[0];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:border-emerald-500/40 hover:bg-neutral-900/70",
      )}
    >
      {cover && (
        <div
          className={cn(
            "relative w-full overflow-hidden border-b border-neutral-800/80 bg-neutral-950",
            large ? "aspect-[16/9]" : "aspect-[16/10]",
          )}
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={large ? "(max-width:768px) 100vw, 640px" : "(max-width:768px) 100vw, 420px"}
            className={cn(
              "transition-transform duration-500 group-hover:scale-[1.04]",
              cover.kind === "screenshot"
                ? "object-cover object-top"
                : "object-contain p-4",
              cover.kind === "diagram" && "bg-white",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-medium",
              project.track === "研究室"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-violet-500/30 bg-violet-500/10 text-violet-300",
            )}
          >
            {project.track}
          </span>
          <span>{project.period}</span>
          {project.archived && (
            <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-[10px]">
              PoC
            </span>
          )}
        </div>
        <h3
          className={cn(
            "font-semibold tracking-tight text-neutral-50",
            large ? "text-xl" : "text-lg",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300"
            >
              {roleLabel[r] ?? r}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {project.techStack.slice(0, large ? 5 : 3).map((t) => (
              <span key={t} className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                <TechIcon label={t} className="h-3 w-3 text-neutral-600" />
                {t}
              </span>
            ))}
            {project.techStack.length > (large ? 5 : 3) && (
              <span className="text-[11px] text-neutral-600">
                +{project.techStack.length - (large ? 5 : 3)}
              </span>
            )}
          </div>
          <IconArrowUpRight className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-emerald-400" />
        </div>
      </div>
    </Link>
  );
}

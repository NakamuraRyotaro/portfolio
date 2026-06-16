import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowLeft,
  IconArrowRight,
  IconUsers,
  IconCalendar,
} from "@tabler/icons-react";
import { projects, getProjectBySlug } from "@/data/projects";
import {
  PhoneFrame,
  BrowserFrame,
  DiagramFrame,
  PortraitFrame,
} from "@/components/ui/device-frame";
import TiltCard from "@/components/ui/tilt-card";
import TechIcon from "@/components/ui/tech-icon";
import Reveal from "@/components/ui/reveal";
import Spotlight from "@/components/ui/spotlight";

const roleLabel: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  infra: "Infra",
  fullstack: "Fullstack",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ryotaro Nakamura`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const imgs = project.images ?? [];
  const screenshots = imgs.filter((i) => i.kind === "screenshot");
  const phones = imgs.filter((i) => i.kind === "phone");
  const portraits = imgs.filter((i) => i.kind === "portrait");
  const diagrams = imgs.filter((i) => i.kind === "diagram");
  // ヒーローはスクショ優先、無ければ図。人物(アバター)はヒーローにせず専用セクションで見せる
  const hero = screenshots[0] ?? diagrams[0];
  const restScreens = screenshots.filter((i) => i !== hero);
  const restDiagrams = diagrams.filter((i) => i !== hero);
  const restPortraits = portraits.filter((i) => i !== hero);

  return (
    <div className="relative overflow-hidden">
      <Spotlight className="-top-40 left-0" />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-40" />

      <article className="relative mx-auto max-w-5xl px-6 py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-emerald-400"
        >
          <IconArrowLeft className="h-4 w-4" /> Projects
        </Link>

        {/* ===== Header ===== */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={
                "rounded-full border px-3 py-1 text-xs font-semibold " +
                (project.track === "研究室"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-violet-500/40 bg-violet-500/10 text-violet-300")
              }
            >
              {project.track}
            </span>
            {project.roles.map((r) => (
              <span
                key={r}
                className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-300"
              >
                {roleLabel[r] ?? r}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-400">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="h-4 w-4 text-neutral-500" /> {project.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconUsers className="h-4 w-4 text-neutral-500" /> {project.team}
            </span>
          </div>
        </Reveal>

        {/* ===== Hero image (kind に応じた枠) ===== */}
        {hero && (
          <Reveal className="mt-12">
            {hero.kind === "screenshot" ? (
              <BrowserFrame src={hero.src} alt={hero.alt} priority />
            ) : (
              <DiagramFrame src={hero.src} alt={hero.alt} priority />
            )}
            <p className="mt-3 text-center text-xs text-neutral-500">{hero.alt}</p>
          </Reveal>
        )}

        {/* ===== Summary ===== */}
        <Reveal className="mt-14">
          <SectionLabel>概要</SectionLabel>
          <p className="mt-4 max-w-3xl text-base leading-loose text-neutral-300">
            {project.summary}
          </p>
        </Reveal>

        {/* ===== Portraits (アバター表情など) ===== */}
        {restPortraits.length > 0 && (
          <Reveal className="mt-16">
            <SectionLabel>表情例</SectionLabel>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              {restPortraits.map((img) => (
                <div key={img.src} className="w-[240px]">
                  <TiltCard intensity={8}>
                    <PortraitFrame src={img.src} alt={img.alt} />
                  </TiltCard>
                  <p className="mt-3 text-center text-xs text-neutral-500">{img.alt}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ===== Phone screenshots (tilt) ===== */}
        {phones.length > 0 && (
          <Reveal className="mt-16">
            <SectionLabel>画面</SectionLabel>
            <div className="mt-8 flex flex-wrap justify-center gap-10">
              {phones.map((img) => (
                <TiltCard key={img.src} className="shrink-0">
                  <PhoneFrame src={img.src} alt={img.alt} />
                  <p className="mt-3 max-w-[230px] text-center text-xs text-neutral-500">
                    {img.alt}
                  </p>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        )}

        {/* ===== 臨床試験での声 ===== */}
        {project.testimonials && project.testimonials.length > 0 && (
          <Reveal className="mt-16">
            <SectionLabel>臨床試験での声</SectionLabel>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.testimonials.map((t) => (
                <div
                  key={t.quote}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5"
                >
                  <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                    {t.role}
                  </span>
                  <p className="mt-3 leading-relaxed text-neutral-200">「{t.quote}」</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ===== 開発スライド (提出スライドより) ===== */}
        {project.slides && project.slides.length > 0 && (
          <Reveal className="mt-16">
            <SectionLabel>開発スライド</SectionLabel>
            <p className="mt-2 text-sm text-neutral-500">
              設計・アーキテクチャ・直面した課題などの詳細資料。
            </p>
            <div className="mt-8 space-y-8">
              {project.slides.map((s) => (
                <figure key={s.src}>
                  <DiagramFrame src={s.src} alt={s.alt} />
                  <figcaption className="mt-3 text-center text-xs text-neutral-500">
                    {s.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        )}

        {/* ===== 図・構成・フロー ===== */}
        {(restDiagrams.length > 0 || restScreens.length > 0) && (
          <Reveal className="mt-16">
            <SectionLabel>構成・フロー</SectionLabel>
            <div className="mt-8 space-y-10">
              {restScreens.map((img) => (
                <figure key={img.src}>
                  <BrowserFrame src={img.src} alt={img.alt} />
                  <figcaption className="mt-3 text-center text-xs text-neutral-500">
                    {img.alt}
                  </figcaption>
                </figure>
              ))}
              {restDiagrams.map((img) => (
                <figure key={img.src}>
                  <DiagramFrame src={img.src} alt={img.alt} />
                  <figcaption className="mt-3 text-center text-xs text-neutral-500">
                    {img.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        )}

        {/* ===== Tech stack ===== */}
        <Reveal className="mt-14">
          <SectionLabel>技術スタック</SectionLabel>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-sm text-neutral-300"
              >
                <TechIcon label={t} className="h-3.5 w-3.5 text-neutral-400" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        {/* ===== Next ===== */}
        <div className="mt-20 border-t border-neutral-800 pt-8">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors hover:border-emerald-500/40"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500">Next</p>
              <p className="mt-1 text-lg font-semibold text-neutral-100">{next.title}</p>
            </div>
            <IconArrowRight className="h-6 w-6 text-neutral-600 transition-colors group-hover:text-emerald-400" />
          </Link>
        </div>
      </article>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
      {children}
    </h2>
  );
}

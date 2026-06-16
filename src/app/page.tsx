import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Spotlight from "@/components/ui/spotlight";
import TextGenerateEffect from "@/components/ui/text-generate-effect";
import Globe from "@/components/ui/globe";
import InfiniteMovingCards from "@/components/ui/infinite-moving-cards";
import Reveal from "@/components/ui/reveal";
import Meteors from "@/components/ui/meteors";
import { GradientButton, GhostButton } from "@/components/ui/gradient-button";

const allTech = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI", "LangChain",
  "Claude API", "Amazon Bedrock", "Amazon Transcribe", "AWS App Runner",
  "Lambda", "EventBridge", "ECS Fargate", "RDS", "Cognito", "SpeechBrain",
  "Vercel AI SDK", "Live2D", "Docker", "GitHub Actions",
];

export default function Home() {
  const major = projects.filter((p) => p.scale === "major" && !p.archived);
  const minor = projects.filter((p) => p.scale === "minor");

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-60" />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        {/* 背景グローブ (右端寄せ・ドラッグで回せる) */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
          <div className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] opacity-70">
            <Globe className="h-[440px] w-[440px] lg:h-[520px] lg:w-[520px]" />
          </div>
        </div>

        <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-32">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              2028卒
            </span>
          </Reveal>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-neutral-50 md:text-6xl">
            AIとITで、
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              社会を作り替えにいく。
            </span>
          </h1>

          <div className="mt-6 max-w-2xl text-lg text-neutral-400">
            <TextGenerateEffect words="Product Engineer" />
          </div>

          <div className="mt-5 flex max-w-2xl items-center gap-4">
            <Image
              src="/work/me.jpg"
              alt={profile.name}
              width={96}
              height={96}
              priority
              className="h-14 w-14 shrink-0 rounded-full border border-neutral-700 object-cover"
            />
            <p className="text-base leading-relaxed text-neutral-400">
              {profile.name}（{profile.nameEn}）。{profile.positioning}
            </p>
          </div>

          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
            <GradientButton href="/projects">
              プロジェクトを見る <IconArrowRight className="h-4 w-4" />
            </GradientButton>
            <GhostButton href={profile.links.github} external>
              <IconBrandGithub className="h-4 w-4" /> GitHub
            </GhostButton>
            <GhostButton href="/contact">お問い合わせ</GhostButton>
          </div>
        </div>

      </section>


      {/* ============ FEATURED PROJECTS ============ */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                Selected Work
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">主要プロジェクト</h2>
            </div>
            <Link
              href="/projects"
              className="hidden items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-emerald-400 sm:flex"
            >
              すべて見る <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        {/* major: 2 large cards with meteor accent */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {major.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="relative">
              {i === 0 && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <Meteors number={10} />
                </div>
              )}
              <ProjectCard project={p} large />
            </Reveal>
          ))}
        </div>

        {/* minor: smaller */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {minor.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ TECH STACK ============ */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              Stack
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">技術スタック</h2>
          </Reveal>
        </div>
        <div className="mt-8">
          <InfiniteMovingCards items={allTech} speed="slow" />
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 px-8 py-16 text-center">
          <div className="absolute left-1/2 top-0 h-[200px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              まずは、気軽に話しませんか。
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              カジュアル面談やインターン、選考のお話など、気軽にご連絡いただけたら嬉しいです。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GradientButton href="/contact">
                お問い合わせ <IconArrowRight className="h-4 w-4" />
              </GradientButton>
              <GhostButton href="/about">プロフィールを見る</GhostButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

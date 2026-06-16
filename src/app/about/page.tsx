import Image from "next/image";
import { IconBrandGithub, IconMail } from "@tabler/icons-react";
import { profile } from "@/data/profile";
import AuroraBackground from "@/components/ui/aurora-background";
import Timeline from "@/components/ui/timeline";
import SpotlightCard from "@/components/ui/spotlight-card";
import Reveal from "@/components/ui/reveal";
import { GhostButton } from "@/components/ui/gradient-button";
import TechIcon from "@/components/ui/tech-icon";

export const metadata = {
  title: "About — Ryotaro Nakamura",
  description: "中村 遼太郎のプロフィール・経歴・スキル。",
};

const skillGroups: { label: string; key: keyof typeof profile.skills }[] = [
  { label: "Frontend", key: "frontend" },
  { label: "Backend", key: "backend" },
  { label: "Infra", key: "infra" },
  { label: "AI / ML", key: "ai" },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* ===== Hero ===== */}
      <AuroraBackground className="border-b border-neutral-800/60">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <Reveal>
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-60 blur-md" />
                <Image
                  src="/work/me.jpg"
                  alt={profile.name}
                  width={160}
                  height={160}
                  priority
                  className="relative h-28 w-28 rounded-full border border-neutral-700 object-cover md:h-36 md:w-36"
                />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-emerald-300">
                  About
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">
                  {profile.name}
                </h1>
                <p className="mt-3 text-lg text-neutral-300">
                  {profile.nameEn} — {profile.title}
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-400">
              {profile.positioning}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <GhostButton href={profile.links.github} external>
                <IconBrandGithub className="h-4 w-4" /> GitHub
              </GhostButton>
              <GhostButton href={`mailto:${profile.email}`} external>
                <IconMail className="h-4 w-4" /> Email
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </AuroraBackground>

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* ===== Facts ===== */}
        <Reveal>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {profile.facts.map((f) => (
              <div
                key={f.label}
                className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 px-5 py-3.5"
              >
                <span className="text-sm font-medium text-neutral-500">{f.label}</span>
                <span className="text-sm text-neutral-200">{f.value}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ===== Summary ===== */}
        <Reveal className="mt-12">
          <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
            自己紹介
          </h2>
          <div className="mt-5 space-y-4">
            {profile.summary.map((p, i) => (
              <p key={i} className="text-base leading-loose text-neutral-300">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* ===== Timeline ===== */}
        <Reveal className="mt-16">
          <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
            経歴
          </h2>
          <div className="mt-8">
            <Timeline items={profile.timeline} />
          </div>
        </Reveal>

        {/* ===== Skills ===== */}
        <Reveal className="mt-16">
          <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
            スキル
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Languages
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.languages.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </div>
            {skillGroups.map((g) => (
              <SpotlightCard key={g.key} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {g.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.skills[g.key].map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950/50 px-3 py-1.5 text-sm text-neutral-300">
      <TechIcon label={children} className="h-3.5 w-3.5 text-neutral-400" />
      {children}
    </span>
  );
}

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/ui/reveal";
import Spotlight from "@/components/ui/spotlight";

export const metadata = {
  title: "Projects — Ryotaro Nakamura",
  description: "AI × ヘルスケアを中心としたプロジェクト一覧。",
};

export default function ProjectsPage() {
  const lab = projects.filter((p) => p.track === "研究室");
  const intern = projects.filter((p) => p.track === "インターン");

  return (
    <div className="relative overflow-hidden">
      <Spotlight className="-top-40 right-0" fill="#22D3EE" />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Project</h1>
        </Reveal>

        {/* 研究室 */}
        <TrackHeading title="研究室" caption="医療AIアプリの開発（共同開発）" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {lab.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} large />
            </Reveal>
          ))}
        </div>

        {/* インターン */}
        <TrackHeading title="インターン" caption="スタートアップ・ベンチャーでのプロダクト開発 / PoC" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {intern.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrackHeading({ title, caption }: { title: string; caption: string }) {
  return (
    <Reveal className="mb-6 mt-14">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <span className="text-sm text-neutral-500">{caption}</span>
      </div>
    </Reveal>
  );
}

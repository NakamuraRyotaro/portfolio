import type { ComponentType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiFastapi,
  SiLangchain,
  SiClaude,
  SiDocker,
  SiGithubactions,
  SiVercel,
  SiStreamlit,
  SiSqlalchemy,
  SiMui,
  SiLine,
  SiSocketdotio,
} from "react-icons/si";
import {
  IconBrandAws,
  IconWaveSine,
  IconDatabase,
  IconApi,
  IconServer2,
  IconMoodSmile,
  IconCode,
} from "@tabler/icons-react";

type IconType = ComponentType<{ className?: string }>;

// 技術名 → アイコン。AWS各サービスは共通の AWS ロゴでまとめる。
const map: Record<string, IconType> = {
  react: SiReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  python: SiPython,
  fastapi: SiFastapi,
  langchain: SiLangchain,
  "claude api": SiClaude,
  docker: SiDocker,
  "github actions": SiGithubactions,
  "vercel ai sdk": SiVercel,
  streamlit: SiStreamlit,
  sqlalchemy: SiSqlalchemy,
  mui: SiMui,
  liff: SiLine,
  "line messaging api": SiLine,
  websocket: SiSocketdotio,
  sql: IconDatabase,
  rest: IconApi,
  chroma: IconDatabase,
  rag: IconDatabase,
  "rag (chroma)": IconDatabase,
  tts: IconWaveSine,
  speechbrain: IconWaveSine,
  live2d: IconMoodSmile,
  // AWS family
  "amazon bedrock": IconBrandAws,
  "amazon transcribe": IconBrandAws,
  "app runner": IconBrandAws,
  lambda: IconBrandAws,
  eventbridge: IconBrandAws,
  "ecs fargate": IconBrandAws,
  rds: IconBrandAws,
  cognito: IconBrandAws,
  sns: IconBrandAws,
  ses: IconBrandAws,
  alb: IconBrandAws,
  ecr: IconBrandAws,
  s3: IconBrandAws,
  "sst / opennext": IconServer2,
};

export function getTechIcon(label: string): IconType {
  return map[label.toLowerCase().trim()] ?? IconCode;
}

export default function TechIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const Icon = getTechIcon(label);
  return <Icon className={className} />;
}

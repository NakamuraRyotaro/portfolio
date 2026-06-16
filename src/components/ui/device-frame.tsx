import Image from "next/image";
import { cn } from "@/lib/utils";

/** スマホUIスクショ用のiPhone風フレーム */
export function PhoneFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[230px] rounded-[2.2rem] border-[7px] border-neutral-800 bg-neutral-800 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.35)]",
        className,
      )}
    >
      <div className="absolute left-1/2 top-0 z-10 h-4 w-24 -translate-x-1/2 rounded-b-xl bg-neutral-800" />
      <div className="overflow-hidden rounded-[1.7rem] bg-black">
        <Image
          src={src}
          alt={alt}
          width={393}
          height={852}
          className="h-auto w-full"
          sizes="230px"
        />
      </div>
    </div>
  );
}

/** ダッシュボード等の横長スクショ用のブラウザ風フレーム */
export function BrowserFrame({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-emerald-500/10",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-neutral-800 bg-neutral-900 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        priority={priority}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 1000px"
      />
    </div>
  );
}

/** 図・フロー(白背景のスライド)用。明るいカードに載せて「図」として見せる */
export function DiagramFrame({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-neutral-200/10 bg-white p-3 shadow-2xl shadow-black/40 md:p-5",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        priority={priority}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 900px"
      />
    </div>
  );
}

/** 人物・アバター(縦長/正方形)用。ダークカードに contain で載せる */
export function PortraitFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={574}
        height={588}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 50vw, 280px"
      />
    </div>
  );
}

import { GradientButton } from "@/components/ui/gradient-button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6">
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="relative text-center">
        <p className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-7xl font-bold text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">ページが見つかりません</h1>
        <p className="mt-3 text-neutral-400">
          お探しのページは移動または削除された可能性があります。
        </p>
        <div className="mt-8 flex justify-center">
          <GradientButton href="/">トップに戻る</GradientButton>
        </div>
      </div>
    </div>
  );
}

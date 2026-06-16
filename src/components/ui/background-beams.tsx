export function BackgroundBeams() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid mask-radial opacity-40" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />
      <div className="absolute bottom-0 right-1/4 h-[300px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />
    </div>
  );
}

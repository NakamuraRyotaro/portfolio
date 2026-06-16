"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

/**
 * 点描の地球儀 (cobe)。idle時は自動回転、ドラッグで手動回転できる。
 * サイズは親の className で指定する。
 */
export default function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const committedR = useRef(0); // 過去のドラッグで確定した回転量
  const dragDelta = useRef(0); // ドラッグ中の差分

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let width = canvas.offsetWidth;
    let frame = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.22, 0.24, 0.28],
      markerColor: [0.1, 0.85, 0.6],
      glowColor: [0.08, 0.35, 0.35],
      markers: [],
    });

    // cobe v2 は onRender が無いので rAF で駆動する
    const render = () => {
      if (pointerInteracting.current === null) phi += 0.004; // idle時のみ自動回転
      const r = committedR.current + dragDelta.current;
      globe.update({ phi: phi + r, width: width * 2, height: width * 2 });
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const endDrag = () => {
    committedR.current += dragDelta.current;
    dragDelta.current = 0;
    pointerInteracting.current = null;
  };

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
        style={{ contain: "layout paint size" }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            dragDelta.current = (e.clientX - pointerInteracting.current) / 150;
          }
        }}
      />
    </div>
  );
}

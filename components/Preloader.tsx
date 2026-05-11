"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const startedAt = performance.now();
    let frame = 0;

    const updateProgress = (timestamp: number) => {
      const elapsed = timestamp - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(updateProgress);
      }
    };

    frame = window.requestAnimationFrame(updateProgress);
    const timeout = window.setTimeout(() => setVisible(false), 2500);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Skip uplink preloader"
      onClick={() => setVisible(false)}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-void text-center"
    >
      <span className="mb-7 h-3 w-3 rounded-full bg-crimson shadow-[0_0_24px_rgba(204,0,0,0.6)] animate-[sosPulse_2.2s_linear_infinite]" />
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-bone drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
        Establishing Uplink...
      </span>
      <span className="mt-6 w-[min(320px,80vw)]" aria-hidden="true">
        <span className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-bone">
          <span>Signal Acquisition</span>
          <span className="font-bold text-[#f1f4dc] drop-shadow-[0_0_12px_rgba(241,244,220,0.45)]">{progress.toString().padStart(3, "0")}%</span>
        </span>
        <span className="block h-2 overflow-hidden rounded-full border border-[#f1f4dc]/40 bg-gunmetal">
          <span
            className="block h-full bg-[#f1f4dc] shadow-[0_0_18px_rgba(241,244,220,0.45)] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </span>
        <span className="mt-2 grid grid-cols-12 gap-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className={`h-1 border border-[#f1f4dc]/30 ${progress >= ((index + 1) / 12) * 100 ? "bg-[#f1f4dc]" : "bg-gunmetal"}`}
            />
          ))}
        </span>
      </span>
    </button>
  );
}

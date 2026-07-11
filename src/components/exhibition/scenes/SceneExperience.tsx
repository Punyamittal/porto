"use client";

import { EXPERIENCE } from "@/data/portfolio";

export function SceneExperience() {
  return (
    <div className="pixel-grid-bg relative flex h-full w-full flex-col bg-[var(--bg)] px-4 pt-20 pb-28 text-[var(--fg)] sm:px-8">
      <div className="pointer-events-none absolute top-16 right-6 font-pixel text-[8px] text-hot-pink rotate-6 border-[3px] border-border bg-yellow px-2 py-1 text-black shadow-[3px_3px_0_var(--border)]">
        XP.EXE
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1100px] flex-col">
        <p className="font-pixel text-[9px] text-electric uppercase">
          // 04 — WORK HISTORY
        </p>
        <h2 className="font-display mt-1 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] font-black uppercase">
          Experience
          <span className="mt-2 block h-3 w-40 bg-neon sm:h-4" />
        </h2>

        <div
          data-scene-scroll
          className="mt-5 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1"
        >
          {EXPERIENCE.map((e, i) => (
            <div
              key={e.id}
              className="brutal-border grid gap-3 bg-surface p-4 sm:grid-cols-[minmax(0,0.9fr)_1.2fr]"
              style={{
                transform: i % 2 ? "rotate(0.3deg)" : "rotate(-0.3deg)",
              }}
            >
              <div>
                <p className="font-display text-lg font-black uppercase">{e.role}</p>
                <p className="font-pixel mt-1 text-[8px] text-hot-pink">{e.company}</p>
                <p className="mt-1 text-xs opacity-60">
                  {e.period} · {e.location}
                </p>
              </div>
              <ul className="space-y-1.5 text-sm">
                {e.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-electric">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { ABOUT, SITE } from "@/data/portfolio";

const CyberEye = dynamic(
  () =>
    import("@/components/three/CyberEye").then((m) => m.CyberEye),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-36 w-36 items-center justify-center font-pixel text-[7px] text-electric sm:h-44 sm:w-44">
        …
      </div>
    ),
  },
);

export function SceneAbout() {
  return (
    <div className="pixel-grid-bg relative flex h-full w-full flex-col bg-[var(--bg)] px-4 pt-20 pb-28 text-[var(--fg)] sm:px-8">
      <div className="pointer-events-none absolute top-16 right-6 font-pixel text-[8px] border-[3px] border-border bg-hot-pink px-2 py-1 text-black shadow-[3px_3px_0_var(--border)] rotate-3">
        ID.SYS
      </div>

      <div
        data-scene-scroll
        className="relative z-10 mx-auto grid h-full min-h-0 w-full max-w-[1200px] gap-6 overflow-y-auto lg:grid-cols-12 lg:gap-10 lg:overflow-visible"
      >
        <div className="flex flex-col lg:col-span-5">
          <p className="font-pixel text-[9px] text-electric uppercase">
            // 02 — IDENTITY
          </p>
          <h2 className="font-display mt-1 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] font-black uppercase">
            About
            <span className="mt-2 block h-3 w-28 bg-neon sm:h-4" />
          </h2>

          <div className="relative mt-44 lg:mt-56">
            <div className="absolute bottom-full left-1/2 z-20 mb-5 -translate-x-[35%] sm:-translate-x-[30%] lg:left-[calc(50%+10px)] lg:mb-6 lg:-translate-x-1/2">
              <CyberEye />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {ABOUT.facts.map((f) => (
                <div
                  key={f.label}
                  className="brutal-border bg-surface p-3"
                >
                  <p className="font-pixel text-[7px] text-hot-pink">{f.label}</p>
                  <p className="mt-1 font-display text-sm font-bold">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pb-4 lg:col-span-7 lg:pt-10 lg:overflow-y-auto lg:min-h-0">
          <p className="max-w-xl text-base leading-relaxed opacity-75 sm:text-lg">
            {ABOUT.bio}
          </p>
          <ul className="mt-6 space-y-3 border-t-[3px] border-border pt-5">
            {ABOUT.timeline.map((t) => (
              <li key={t.year} className="flex gap-4">
                <span className="font-pixel w-14 shrink-0 text-[8px] text-electric">
                  {t.year}
                </span>
                <span className="text-sm opacity-80">{t.event}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {ABOUT.skills.slice(0, 10).map((s) => (
              <span
                key={s}
                className="font-pixel border-[2px] border-border bg-surface px-2 py-1 text-[7px] uppercase hover:bg-neon hover:text-black"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="font-pixel mt-5 text-[8px] opacity-40 uppercase">
            {SITE.location}
          </p>
        </div>
      </div>
    </div>
  );
}

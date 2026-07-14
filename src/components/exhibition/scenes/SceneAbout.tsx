"use client";

import dynamic from "next/dynamic";
import { EvidenceList } from "@/components/seo/EvidenceList";
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
    <div className="pixel-grid-bg relative flex h-full w-full flex-col bg-[var(--bg)] px-4 pt-[max(5rem,calc(env(safe-area-inset-top)+4rem))] pb-[max(6rem,calc(env(safe-area-inset-bottom)+4.5rem))] text-[var(--fg)] sm:px-8">
      <div className="pointer-events-none absolute top-16 right-6 z-20 rotate-3 border-[3px] border-border bg-hot-pink px-2 py-1 font-pixel text-[8px] text-black shadow-[3px_3px_0_var(--border)]">
        ID.SYS
      </div>

      <div
        data-scene-scroll
        className="relative z-10 mx-auto h-full min-h-0 w-full max-w-[1200px] overflow-y-auto"
      >
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-5">
            <p className="font-pixel text-[9px] text-electric uppercase">
              // 02 — IDENTITY
            </p>
            <h2 className="font-display mt-1 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] font-black uppercase">
              About
              <span className="mt-2 block h-3 w-28 bg-neon sm:h-4" />
            </h2>

            <div className="relative mt-4 lg:mt-10">
              <div className="mb-4 flex justify-center">
                <CyberEye />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {ABOUT.facts.map((f) => (
                  <div key={f.label} className="brutal-border bg-surface p-3">
                    <p className="font-pixel text-[7px] text-hot-pink">{f.label}</p>
                    <p className="mt-1 font-display text-sm font-bold">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pb-2 lg:col-span-7 lg:pt-6">
            <p className="max-w-xl text-base leading-relaxed opacity-75 sm:text-lg">
              {ABOUT.bio}
            </p>
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

        <div className="mt-8 border-t-[3px] border-border pt-6 pb-8">
          <EvidenceList title="Results at a glance" limit={8} />

          <h3 className="font-display mt-10 text-2xl font-black uppercase sm:text-3xl">
            Timeline
          </h3>
          <ol className="mt-4 space-y-3">
            {ABOUT.timeline.map((t) => (
              <li key={t.year} className="flex gap-4 text-sm">
                <span className="font-pixel w-14 shrink-0 text-[8px] text-electric">
                  {t.year}
                </span>
                <span className="opacity-80">{t.event}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

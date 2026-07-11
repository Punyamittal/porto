"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SITE } from "@/data/portfolio";
import { useExhibition } from "@/components/exhibition/SceneExhibition";
import { useApp } from "@/components/providers/AppProvider";
import { useMousePosition } from "@/hooks/useMousePosition";

const Samurai = dynamic(
  () => import("@/components/three/Samurai").then((m) => m.Samurai),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-44 w-36 shrink-0 items-center justify-center font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase sm:h-60 sm:w-48 lg:h-[22rem] lg:w-80 xl:h-[26rem] xl:w-96">
        …
      </div>
    ),
  },
);

export function SceneHero() {
  const { goTo } = useExhibition();
  const { playBlip } = useApp();
  const mouse = useMousePosition(true);
  const [ready, setReady] = useState(false);
  const [first, ...rest] = SITE.name.toUpperCase().split(" ");
  const last = rest.join(" ") || "MITTAL";

  useEffect(() => setReady(true), []);

  const gx =
    ready && typeof window !== "undefined"
      ? (mouse.x / window.innerWidth - 0.5) * 16
      : 0;
  const gy =
    ready && typeof window !== "undefined"
      ? (mouse.y / window.innerHeight - 0.5) * 12
      : 0;

  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[#050505] px-4 pt-[max(4.5rem,env(safe-area-inset-top))] pb-[max(5.5rem,env(safe-area-inset-bottom))] text-white sm:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translate(${gx}px, ${gy}px)`,
        }}
      />
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-[40vh] w-[40vh] rounded-full opacity-40 blur-3xl sm:h-[50vh] sm:w-[50vh]"
        style={{
          background: "radial-gradient(circle, rgba(255,45,45,0.5), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <p className="font-mono mb-3 text-[9px] tracking-[0.3em] text-[#FF2D2D] uppercase sm:mb-4 sm:text-[10px] sm:tracking-[0.35em]">
          EXHIBITION / SCENE 01
        </p>

        {/* Name left · Samurai right */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
          <h1 className="font-display min-w-0 flex-1 leading-[0.82] font-bold tracking-[-0.04em] uppercase">
            <span className="block text-[clamp(2.2rem,9vw,8.5rem)]">{first}</span>
            <span
              className="mt-1 block text-[clamp(2.2rem,9vw,8.5rem)] text-transparent"
              style={{ WebkitTextStroke: "1.5px #fff" }}
            >
              {last}
            </span>
          </h1>

          <div className="relative shrink-0">
            <Samurai size="responsive" />
            <p className="font-mono mt-0.5 hidden text-center text-[8px] tracking-[0.28em] text-white/35 uppercase sm:mt-1 sm:block sm:text-[9px] sm:tracking-[0.3em]">
              DELHI · INDIA · EST. 2006
            </p>
          </div>
        </div>

        <div className="mt-4 h-px w-28 bg-white/80 sm:mt-5 sm:w-48" />
        <div className="mt-4 space-y-1 font-display text-[10px] tracking-[0.22em] text-white/70 uppercase sm:mt-5 sm:text-[11px] sm:tracking-[0.28em]">
          <p>Full Stack Engineer</p>
          <p>AI Researcher</p>
          <p>Open Source Builder</p>
        </div>
        <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-white/50 sm:mt-6">
          Building intelligent software systems, scalable web platforms, and
          AI-driven products — a cinematic tour of the work.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
          <button
            type="button"
            onClick={() => {
              playBlip();
              goTo("projects");
            }}
            className="min-h-11 border border-white bg-white px-5 py-3 font-display text-xs tracking-[0.22em] text-[#050505] uppercase transition-colors hover:border-[#FF2D2D] hover:bg-[#FF2D2D] hover:text-white active:scale-[0.98]"
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={() => {
              playBlip();
              window.open(SITE.resumeUrl, "_blank");
            }}
            className="min-h-11 border border-white/40 px-5 py-3 font-display text-xs tracking-[0.22em] text-white uppercase transition-colors hover:border-[#FF2D2D] hover:text-[#FF2D2D] active:scale-[0.98]"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

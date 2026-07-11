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
      <div className="mx-auto flex h-80 w-80 items-center justify-center font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase sm:h-96 sm:w-96">
        Loading…
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

  const gx = ready && typeof window !== "undefined"
    ? (mouse.x / window.innerWidth - 0.5) * 16
    : 0;
  const gy = ready && typeof window !== "undefined"
    ? (mouse.y / window.innerHeight - 0.5) * 12
    : 0;

  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[#050505] px-5 pt-20 pb-24 text-white sm:px-10">
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
        className="pointer-events-none absolute -top-20 -right-20 h-[50vh] w-[50vh] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,45,45,0.5), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono mb-4 text-[10px] tracking-[0.35em] text-[#FF2D2D] uppercase">
            EXHIBITION / SCENE 01
          </p>
          <h1 className="font-display leading-[0.82] font-bold tracking-[-0.04em] uppercase">
            <span className="block text-[clamp(3.2rem,11vw,8.5rem)]">{first}</span>
            <span
              className="mt-1 block text-[clamp(3.2rem,11vw,8.5rem)] text-transparent"
              style={{ WebkitTextStroke: "1.5px #fff" }}
            >
              {last}
            </span>
          </h1>
          <div className="mt-5 h-px w-48 bg-white/80" />
          <div className="mt-5 space-y-1 font-display text-[11px] tracking-[0.28em] text-white/70 uppercase">
            <p>Full Stack Engineer</p>
            <p>AI Researcher</p>
            <p>Open Source Builder</p>
          </div>
          <p className="mt-6 max-w-[40ch] text-sm leading-relaxed text-white/50">
            Building intelligent software systems, scalable web platforms, and
            AI-driven products — a cinematic tour of the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => {
                playBlip();
                goTo("projects");
              }}
              className="border border-white bg-white px-5 py-3 font-display text-xs tracking-[0.22em] text-[#050505] uppercase transition-colors hover:border-[#FF2D2D] hover:bg-[#FF2D2D] hover:text-white"
            >
              View Projects
            </button>
            <button
              type="button"
              onClick={() => {
                playBlip();
                window.open(SITE.resumeUrl, "_blank");
              }}
              className="border border-white/40 px-5 py-3 font-display text-xs tracking-[0.22em] text-white uppercase transition-colors hover:border-[#FF2D2D] hover:text-[#FF2D2D]"
            >
              Download Resume
            </button>
          </div>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <Samurai />
          <p className="font-mono mt-2 text-center text-[9px] tracking-[0.3em] text-white/35 uppercase">
            DELHI · INDIA · EST. 2006
          </p>
        </div>
      </div>
    </div>
  );
}

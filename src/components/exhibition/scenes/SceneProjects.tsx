"use client";

import { PROJECTS } from "@/data/portfolio";
import { useApp } from "@/components/providers/AppProvider";

export function SceneProjects() {
  const { playBlip } = useApp();
  const featured = PROJECTS.slice(0, 6);

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#050505] px-4 pt-[max(5rem,calc(env(safe-area-inset-top)+4rem))] pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4rem))] text-white sm:px-10">
      <div className="mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col">
        <div className="mb-4 shrink-0 sm:mb-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] text-[#FF2D2D] uppercase">
              SCENE 03 · SELECTED WORK
            </p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none font-bold uppercase">
              Projects
            </h2>
          </div>
          <p className="mt-2 text-[10px] text-white/35 sm:hidden">
            Scroll the list · use PREV / NEXT for scenes
          </p>
        </div>

        <div
          data-scene-scroll
          className="grid min-h-0 flex-1 touch-pan-y gap-3 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch] pr-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col border border-white/15 bg-white/[0.02] p-4 transition-colors hover:border-[#FF2D2D]/60"
            >
              <div
                className="mb-3 h-1 w-full"
                style={{ background: p.color }}
              />
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-bold tracking-tight uppercase">
                  {p.title}
                </h3>
                <span className="font-mono text-[8px] text-[#FF2D2D]">{p.sticker}</span>
              </div>
              <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-white/50">
                {p.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="font-mono text-[7px] text-white/35 uppercase">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-3">
                {p.liveUrl !== "#" && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playBlip}
                    className="font-mono text-[8px] tracking-widest text-white/60 uppercase underline underline-offset-4 hover:text-[#FF2D2D]"
                  >
                    Live
                  </a>
                )}
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playBlip}
                  className="font-mono text-[8px] tracking-widest text-white/60 uppercase underline underline-offset-4 hover:text-[#FF2D2D]"
                >
                  Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

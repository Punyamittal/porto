"use client";

import { ACHIEVEMENTS, PROJECTS, SKILL_CARDS } from "@/data/portfolio";

export function SceneResearch() {
  const research = PROJECTS.filter((p) =>
    ["automl-pipeline", "kai", "llm-security", "crisproots", "hospital-rag"].includes(
      p.id,
    ),
  );
  const awards = ACHIEVEMENTS.filter((a) => a.unlocked).slice(0, 6);

  return (
    <div className="relative flex h-full w-full flex-col bg-fg px-4 pt-[max(5rem,calc(env(safe-area-inset-top)+4rem))] pb-[max(6rem,calc(env(safe-area-inset-bottom)+4.5rem))] text-bg sm:px-8">
      <div className="pointer-events-none absolute top-20 left-4 font-pixel text-[8px] border-[3px] border-bg bg-hot-pink px-2 py-1 text-black shadow-[3px_3px_0_#fff] -rotate-3">
        LAB
      </div>
      <div className="pointer-events-none absolute top-24 right-8 font-pixel text-[8px] border-[3px] border-bg bg-neon px-2 py-1 text-black shadow-[3px_3px_0_#fff] rotate-2">
        AI
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1200px] flex-col">
        <p className="font-pixel text-[9px] text-neon uppercase">
          // 05 — RESEARCH & SYSTEMS
        </p>
        <h2 className="font-display mt-1 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] font-black uppercase">
          Research
          <span className="mt-2 block h-3 w-36 bg-hot-pink sm:h-4" />
        </h2>
        <p className="mt-3 max-w-xl text-sm text-bg/70">
          AutoML, LLM security, agri-AI twins, emotion systems, healthcare RAG.
        </p>

        <div
          data-scene-scroll
          className="mt-5 grid min-h-0 flex-1 touch-pan-y gap-4 overflow-y-auto overscroll-y-contain pr-1 sm:grid-cols-2"
        >
          <div className="space-y-3">
            {research.map((p) => (
              <div
                key={p.id}
                className="border-[3px] border-bg bg-surface p-4 text-fg shadow-[4px_4px_0_#fff]"
              >
                <div className="mb-2 h-1.5 w-full" style={{ background: p.color }} />
                <h3 className="font-display text-base font-black uppercase">{p.title}</h3>
                <p className="mt-1 text-xs opacity-70">{p.description}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="border-[3px] border-bg bg-electric/20 p-4">
              <p className="font-pixel mb-2 text-[8px] text-yellow">CORE STACK</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_CARDS.map((s) => (
                  <span
                    key={s.id}
                    className="border-[2px] border-bg bg-bg px-2 py-1 font-pixel text-[7px] text-fg uppercase"
                  >
                    {s.name} · {s.level}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-[3px] border-bg bg-surface p-4 text-fg shadow-[4px_4px_0_var(--neon)]">
              <p className="font-pixel mb-2 text-[8px] text-hot-pink">HIGH SCORES</p>
              <ul className="space-y-2">
                {awards.map((a) => (
                  <li key={a.id} className="flex items-start gap-2 text-xs">
                    <span>{a.icon}</span>
                    <span>
                      <strong>{a.title}</strong> — {a.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

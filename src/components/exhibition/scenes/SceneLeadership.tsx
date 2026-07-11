"use client";

import { motion } from "framer-motion";

const ROLES = [
  {
    title: "Founder & CEO",
    org: "Y-SoC",
    detail: "Open-source season for student builders · ysoc.in · 1000+ entries",
    accent: "bg-hot-pink",
  },
  {
    title: "Secretary",
    org: "IE(I) VIT Chennai",
    detail: "Chapter inauguration · workshops · industry initiatives",
    accent: "bg-electric",
  },
  {
    title: "CTO",
    org: "AUTOMATA",
    detail: "EcoAI GenAI architecture · climate-resilient product systems",
    accent: "bg-neon",
  },
  {
    title: "Co-Founder",
    org: "Hackfinity",
    detail: "Hackathon infrastructure · MoU partnerships · community scale",
    accent: "bg-yellow",
  },
];

export function SceneLeadership() {
  return (
    <div className="pixel-grid-bg relative flex h-full w-full flex-col bg-[var(--bg)] px-4 pt-[max(5rem,calc(env(safe-area-inset-top)+4rem))] pb-[max(6rem,calc(env(safe-area-inset-bottom)+4.5rem))] text-[var(--fg)] sm:px-8">
      <div className="pointer-events-none absolute top-16 left-5 font-pixel text-[8px] border-[3px] border-border bg-hot-pink px-2 py-1 text-black shadow-[3px_3px_0_var(--border)] -rotate-2">
        LEAD.SYS
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1100px] flex-col">
        <p className="font-pixel text-[9px] text-electric uppercase">
          // 06 — COMMUNITY
        </p>
        <h2 className="font-display mt-1 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] font-black uppercase">
          Leadership
          <span className="mt-2 block h-3 w-44 bg-electric sm:h-4" />
        </h2>
        <p className="mt-3 max-w-lg text-sm opacity-70">
          Building organizations, chapters, and open-source seasons — not just repos.
        </p>

        <div
          data-scene-scroll
          className="mt-5 min-h-0 flex-1 touch-pan-y space-y-3 overflow-y-auto overscroll-y-contain pr-1"
        >
          {ROLES.map((r, i) => (
            <div
              key={r.org}
              className="brutal-border flex gap-0 overflow-hidden bg-surface"
              style={{
                transform: i % 2 ? "rotate(0.4deg)" : "rotate(-0.35deg)",
              }}
            >
              <div className={`w-3 shrink-0 ${r.accent}`} />
              <div className="flex-1 p-4 sm:p-5">
                <p className="font-display text-lg font-black uppercase sm:text-xl">
                  {r.title}
                </p>
                <p className="font-pixel mt-1 text-[8px] text-hot-pink">{r.org}</p>
                <p className="mt-2 text-sm opacity-70">{r.detail}</p>
              </div>
            </div>
          ))}

          <motion.div
            className="brutal-border mt-2 inline-flex items-center gap-3 bg-fg px-4 py-3 text-bg"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            <span className="font-pixel text-[8px] text-neon">STATUS</span>
            <span className="text-sm font-bold uppercase">Building in public</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

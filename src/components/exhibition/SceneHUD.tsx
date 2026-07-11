"use client";

import { motion } from "framer-motion";
import { SCENE_IDS, SCENE_META } from "@/lib/scenes";
import { useExhibition } from "@/components/exhibition/SceneExhibition";
import { cn } from "@/lib/utils";

export function SceneHUD() {
  const { active, index, goTo, next, prev, animating } = useExhibition();
  const meta = SCENE_META[active];

  return (
    <>
      <div className="pointer-events-none fixed top-1/2 right-3 z-[80] hidden -translate-y-1/2 flex-col items-end gap-2.5 md:flex">
        {SCENE_IDS.map((id, i) => (
          <button
            key={id}
            type="button"
            disabled={animating}
            onClick={() => goTo(i)}
            className="pointer-events-auto group flex items-center gap-2"
            aria-label={`Go to ${SCENE_META[id].label}`}
            aria-current={i === index}
          >
            <span
              className={cn(
                "font-pixel text-[7px] uppercase transition-opacity",
                i === index
                  ? "text-hot-pink opacity-100"
                  : "text-[var(--fg)]/40 opacity-0 group-hover:opacity-100",
              )}
            >
              {SCENE_META[id].label}
            </span>
            <span
              className={cn(
                "block border-[2px] border-border transition-all duration-200",
                i === index
                  ? "h-2.5 w-8 bg-neon shadow-[2px_2px_0_var(--border)]"
                  : "h-2 w-2 bg-[var(--fg)]/25 group-hover:bg-electric",
              )}
            />
          </button>
        ))}
      </div>

      {/* Mobile scene dots */}
      <div className="pointer-events-none fixed top-[max(4.25rem,calc(env(safe-area-inset-top)+3.25rem))] right-0 left-0 z-[80] flex justify-center gap-1.5 md:hidden">
        {SCENE_IDS.map((id, i) => (
          <button
            key={id}
            type="button"
            disabled={animating}
            onClick={() => goTo(i)}
            className={cn(
              "pointer-events-auto h-1.5 border border-border transition-all",
              i === index ? "w-5 bg-hot-pink" : "w-1.5 bg-[var(--fg)]/30",
            )}
            aria-label={`Go to ${SCENE_META[id].label}`}
            aria-current={i === index}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed right-0 bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 z-[80] flex items-center justify-between px-4 sm:px-8">
        <p className="font-pixel max-w-[45%] truncate text-[7px] text-[var(--fg)]/50 uppercase sm:max-w-none sm:text-[8px]">
          <span className="text-electric">{meta.label}</span>
          <span className="ml-2 sm:ml-3">
            {String(index + 1).padStart(2, "0")}/
            {String(SCENE_IDS.length).padStart(2, "0")}
          </span>
        </p>

        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            disabled={animating || index === 0}
            onClick={prev}
            className="font-pixel min-h-9 border-[3px] border-border bg-surface px-3 py-1.5 text-[8px] uppercase shadow-[2px_2px_0_var(--border)] disabled:opacity-25"
          >
            PREV
          </button>
          <button
            type="button"
            disabled={animating || index === SCENE_IDS.length - 1}
            onClick={next}
            className="font-pixel min-h-9 border-[3px] border-border bg-hot-pink px-3 py-1.5 text-[8px] text-black uppercase shadow-[2px_2px_0_var(--border)] disabled:opacity-25"
          >
            NEXT
          </button>
        </div>
      </div>

      {index === 0 && (
        <motion.div
          className="pointer-events-none fixed bottom-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.5rem))] left-1/2 z-[80] -translate-x-1/2 font-pixel text-[7px] text-electric uppercase sm:bottom-20 sm:text-[8px]"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          SWIPE / SCROLL ▾
        </motion.div>
      )}
    </>
  );
}

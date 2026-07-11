"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RetroWindow } from "@/components/ui/RetroWindow";
import { useApp } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";

type Pos = { x: number; y: number };

export function Experience() {
  const [open, setOpen] = useState<string | null>(EXPERIENCE[0]?.id ?? null);
  const [positions, setPositions] = useState<Record<string, Pos>>({});
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const { playBlip } = useApp();

  useEffect(() => {
    const initial: Record<string, Pos> = {};
    EXPERIENCE.forEach((exp, i) => {
      initial[exp.id] = { x: 20 + i * 28, y: 20 + i * 36 };
    });
    setPositions(initial);
  }, []);

  const onPointerDown = useCallback(
    (id: string, e: React.PointerEvent) => {
      if (window.matchMedia("(max-width: 768px)").matches) return;
      const pos = positions[id] ?? { x: 0, y: 0 };
      dragRef.current = { id, ox: e.clientX - pos.x, oy: e.clientY - pos.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [positions],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const { id, ox, oy } = dragRef.current;
    setPositions((prev) => ({
      ...prev,
      [id]: { x: e.clientX - ox, y: e.clientY - oy },
    }));
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="// 04 — WORK HISTORY"
          title="EXPERIENCE"
          subtitle="Internships · founding roles · open source · research."
          accent="bg-electric"
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-wrap gap-4 lg:col-span-4">
            {EXPERIENCE.map((exp) => (
              <motion.button
                key={exp.id}
                type="button"
                onClick={() => {
                  playBlip();
                  setOpen(exp.id);
                }}
                className={cn(
                  "flex w-28 flex-col items-center gap-2 p-2 text-center",
                  open === exp.id && "bg-electric/20",
                )}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex h-14 w-16 items-end justify-center border-[3px] border-border bg-yellow shadow-[3px_3px_0_var(--border)]">
                  <span className="mb-1 h-8 w-12 border-[2px] border-border bg-electric" />
                </span>
                <span className="font-pixel text-[8px] leading-tight">
                  {exp.company
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .slice(0, 8)
                    .toUpperCase()}
                  .FLD
                </span>
              </motion.button>
            ))}
          </div>

          <div
            className="pixel-grid-bg relative min-h-[420px] border-[3px] border-border bg-bg/50 p-4 lg:col-span-8"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <p className="font-pixel mb-4 text-[8px] opacity-60">
              DESKTOP — drag windows on larger screens
            </p>

            <AnimatePresence mode="popLayout">
              {EXPERIENCE.filter((e) => e.id === open).map((exp) => (
                <motion.div
                  key={exp.id}
                  className="absolute top-12 left-4 right-4 z-10 md:right-auto md:w-[min(100%,420px)]"
                  style={
                    positions[exp.id]
                      ? {
                          left: positions[exp.id].x,
                          top: positions[exp.id].y,
                          right: "auto",
                        }
                      : undefined
                  }
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onPointerDown={(e) => onPointerDown(exp.id, e)}
                >
                  <RetroWindow
                    title={`${exp.company.replace(/\s/g, "_").toUpperCase()}.TXT`}
                    onClose={() => setOpen(null)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <p className="font-display text-xl font-black">{exp.role}</p>
                    <p className="font-pixel mt-1 text-[8px] text-electric">
                      {exp.period} · {exp.location}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-hot-pink">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </RetroWindow>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

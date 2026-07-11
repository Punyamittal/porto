"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { ACHIEVEMENTS } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useApp } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString();
    });
  }, [spring]);

  return <span ref={ref}>0</span>;
}

export function Achievements() {
  const { unlocked } = useApp();
  const totalPoints = ACHIEVEMENTS.filter(
    (a) => a.unlocked || unlocked.has(a.id),
  ).reduce((sum, a) => sum + a.points, 0);

  return (
    <section id="achievements" className="relative bg-fg py-20 text-bg md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="// 05 — HIGH SCORES"
          title="ACHIEVE"
          subtitle="Hackathon wins · NPTEL Top 1% · Research · Leadership unlocks."
          accent="bg-hot-pink"
          className="text-bg [&_h2]:text-bg"
        />

        <div className="mb-8 inline-block border-[3px] border-bg bg-electric px-4 py-2 text-black">
          <p className="font-pixel text-[9px]">TOTAL SCORE</p>
          <p className="font-display text-4xl font-black">
            <AnimatedCounter value={totalPoints} />
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((ach, i) => {
            const isUnlocked = ach.unlocked || unlocked.has(ach.id);
            return (
              <motion.div
                key={ach.id}
                className={cn(
                  "relative border-[3px] border-bg p-4",
                  isUnlocked ? "bg-surface text-fg" : "bg-bg/20 text-bg/50",
                )}
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 14,
                  delay: i * 0.06,
                }}
              >
                {isUnlocked && (
                  <span className="font-pixel absolute -top-2 -right-2 bg-neon px-1.5 py-0.5 text-[7px] text-black animate-[unlock-pop_0.6s_ease]">
                    UNLOCKED
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center border-[3px] border-current text-2xl",
                      isUnlocked ? "bg-yellow" : "grayscale",
                    )}
                    aria-hidden
                  >
                    {isUnlocked ? ach.icon : "?"}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-black uppercase">
                      {isUnlocked || !ach.secret ? ach.title : "LOCKED"}
                    </h3>
                    <p className="mt-1 text-xs">
                      {isUnlocked || !ach.secret
                        ? ach.description
                        : "Secret achievement — keep exploring"}
                    </p>
                    <p className="font-pixel mt-2 text-[8px] text-electric">
                      +{ach.points} PTS
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

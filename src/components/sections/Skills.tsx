"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SKILL_CARDS } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function SkillCard({
  card,
  index,
}: {
  card: (typeof SKILL_CARDS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  const rarityColor = {
    LEGENDARY: "bg-yellow text-black",
    EPIC: "bg-hot-pink text-black",
    RARE: "bg-electric text-black",
    COMMON: "bg-neon text-black",
  }[card.rarity];

  return (
    <motion.div
      ref={ref}
      className="group perspective-[1000px]"
      initial={{ opacity: 0, y: 40, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div className="brutal-border-thick relative h-64 overflow-hidden bg-surface transition-shadow group-hover:shadow-[8px_8px_0_var(--electric)]">
        <div
          className="flex h-28 items-center justify-center border-b-[3px] border-border"
          style={{ background: card.color }}
        >
          <span className="font-display text-4xl font-black text-black mix-blend-overlay">
            {card.name.slice(0, 2)}
          </span>
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-black">{card.name}</h3>
            <span className={cn("font-pixel px-1 py-0.5 text-[7px]", rarityColor)}>
              {card.rarity}
            </span>
          </div>
          <div className="mt-2 h-2 border-[2px] border-border bg-bg">
            <div
              className="h-full bg-neon"
              style={{ width: `${card.level}%` }}
            />
          </div>
          <p className="font-pixel mt-1 text-[8px]">LVL {card.level}</p>

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-fg/95 p-3 text-bg opacity-0 transition-opacity group-hover:opacity-100">
            <p className="font-pixel text-[8px] text-neon">{card.experience}</p>
            <p className="mt-1 text-xs">{card.description}</p>
            <p className="font-pixel mt-2 text-[7px] text-yellow">
              RELATED: {card.related.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="// 03 — COLLECTIBLES"
          title="SKILLS"
          subtitle="Trading cards. Tilt them. Hover to unlock stats."
          accent="bg-yellow"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CARDS.map((card, i) => (
            <SkillCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

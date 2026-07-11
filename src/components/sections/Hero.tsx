"use client";

import { motion } from "framer-motion";
import { SITE } from "@/data/portfolio";
import { FloatingShapes } from "@/components/effects/FloatingShapes";
import { GSAPParallax } from "@/components/effects/GSAPParallax";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { Sticker } from "@/components/ui/Sticker";
import { useApp } from "@/components/providers/AppProvider";

export function Hero() {
  const { playBlip } = useApp();

  return (
    <section
      id="hero"
      className="pixel-grid-bg relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-8"
    >
      <FloatingShapes />

      <GSAPParallax className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="relative" data-parallax>
          <Sticker label="LIVE" className="-top-2 left-0 sm:left-4" rotate={-8} />
          <Sticker label="NEW" className="top-8 right-4 sm:right-20" rotate={12} />
          <Sticker
            label="BETA"
            className="right-2 bottom-20 hidden sm:block"
            rotate={-6}
          />

          <motion.p
            className="font-pixel mb-4 text-[10px] text-electric sm:text-[11px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            // VIT · Y-SOC · HACKATHONS · AI SYSTEMS
          </motion.p>

          <motion.h1
            className="font-display text-[14vw] leading-[0.82] font-black tracking-tighter uppercase sm:text-[11vw] md:text-[9vw] lg:text-[8rem]"
            initial={{ opacity: 0, scaleX: 0.85, y: 60 }}
            animate={{ opacity: 1, scaleX: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.15 }}
          >
            {SITE.name.split(" ").map((word, i) => (
              <span
                key={word}
                className="block"
                style={{
                  WebkitTextStroke: i === 1 ? "2px var(--fg)" : undefined,
                  color: i === 1 ? "transparent" : undefined,
                  background:
                    i === 0
                      ? "linear-gradient(90deg, var(--fg) 40%, var(--electric))"
                      : undefined,
                  WebkitBackgroundClip: i === 0 ? "text" : undefined,
                  backgroundClip: i === 0 ? "text" : undefined,
                }}
              >
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.div
            className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <div className="max-w-lg">
              <p className="font-display text-xl font-bold uppercase sm:text-2xl md:text-3xl">
                {SITE.title}
              </p>
              <motion.p
                className="mt-2 text-base opacity-80 sm:text-lg"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {SITE.subtitle}
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton
                variant="primary"
                onClick={() => {
                  playBlip();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Work
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => {
                  playBlip();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Open Terminal
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {["VIT CSE", "Y-SOC", "AI BUILDER", "2× WINNER"].map((badge, i) => (
              <span
                key={badge}
                className="font-pixel border-[3px] border-border bg-surface px-2 py-1 text-[8px] shadow-[3px_3px_0_var(--border)]"
                style={{
                  transform: `rotate(${(i - 1.5) * 3}deg)`,
                  backgroundColor:
                    ["var(--yellow)", "var(--neon)", "var(--hot-pink)", "var(--electric)"][
                      i
                    ],
                  color: "#000",
                }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </GSAPParallax>

      <div className="relative z-10 mt-12">
        <Marquee
          items={[
            "MODERN BRUTALISM",
            "RETRO FUTURE",
            "PIXEL PLAYGROUND",
            "EXPERIMENTAL UI",
            "HIGH ENERGY",
            "SCROLL TO EXPLORE",
          ]}
        />
      </div>
    </section>
  );
}

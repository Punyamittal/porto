"use client";

import { motion } from "framer-motion";
import { ABOUT, SITE } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RetroWindow } from "@/components/ui/RetroWindow";
import { useApp } from "@/components/providers/AppProvider";

export function About() {
  const { playBlip } = useApp();

  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="// 01 — IDENTITY"
          title="ABOUT"
          subtitle="VIT CSE · Founder · Hackathon winner · AI systems builder."
          accent="bg-hot-pink"
        />

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <motion.div
            className="relative lg:col-span-5 lg:-rotate-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="brutal-border-thick relative aspect-[4/5] overflow-hidden bg-electric">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="font-pixel mb-4 text-[10px] text-black">IMG_001.BMP</div>
                <div className="flex h-40 w-40 items-center justify-center border-[4px] border-black bg-fg text-bg sm:h-52 sm:w-52">
                  <span className="font-display text-6xl font-black sm:text-7xl">
                    {SITE.shortName.slice(0, 2)}
                  </span>
                </div>
                <p className="font-pixel mt-4 text-[9px] text-black">
                  {SITE.name.toUpperCase()}
                </p>
              </div>
              <div className="absolute top-3 right-3 h-8 w-8 border-[3px] border-black bg-yellow" />
              <div className="absolute bottom-3 left-3 h-6 w-16 border-[3px] border-black bg-neon" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {ABOUT.facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  className="brutal-border bg-surface p-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, rotate: i % 2 ? 1 : -1 }}
                >
                  <p className="font-pixel text-[8px] text-electric">{fact.label}</p>
                  <p className="mt-1 font-bold">{fact.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6 lg:col-span-7 lg:pt-8">
            <motion.p
              className="font-display text-2xl leading-tight font-bold md:text-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {ABOUT.bio}
            </motion.p>

            <RetroWindow title="C:\\USERS\\PUNYA\\TIMELINE.EXE" className="lg:ml-8">
              <ul className="space-y-3">
                {ABOUT.timeline.map((item) => (
                  <li
                    key={item.year}
                    className="flex gap-4 border-b border-border/20 pb-2 last:border-0"
                  >
                    <span className="font-pixel shrink-0 text-[9px] text-hot-pink">
                      {item.year}
                    </span>
                    <span className="text-sm">{item.event}</span>
                  </li>
                ))}
              </ul>
            </RetroWindow>

            <div>
              <p className="font-pixel mb-3 text-[9px] text-yellow">SKILL CHIPS</p>
              <div className="flex flex-wrap gap-2">
                {ABOUT.skills.map((skill) => (
                  <motion.button
                    key={skill}
                    type="button"
                    onClick={playBlip}
                    className="font-pixel border-[2px] border-border bg-bg px-2 py-1 text-[8px] uppercase hover:bg-neon hover:text-black"
                    whileHover={{ scale: 1.08, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

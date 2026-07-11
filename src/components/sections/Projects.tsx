"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderGit2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { PROJECTS } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { useApp } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";

export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { playBlip } = useApp();

  return (
    <section id="projects" className="relative bg-fg py-20 text-bg md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="// 02 — SELECTED WORK"
          title="PROJECTS"
          subtitle="REHAB · AutoML · Gear Lab · Hospital RAG · Y-SoC and more."
          accent="bg-neon"
          className="text-bg [&_h2]:text-bg"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => {
            const open = expanded === project.id;
            return (
              <motion.article
                key={project.id}
                className={cn(
                  "animated-border relative overflow-hidden bg-surface text-fg",
                  i % 2 === 1 && "md:mt-10",
                )}
                initial={{ opacity: 0, y: 50, rotate: i % 2 ? 1 : -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <Sticker
                  label={project.sticker}
                  className="-top-1 -right-1"
                  rotate={project.sticker === "HOT" ? 12 : -10}
                />

                <div
                  className="relative flex h-44 items-end border-b-[3px] border-border p-4 sm:h-52"
                  style={{
                    background: `repeating-linear-gradient(
                      -45deg,
                      ${project.color}33,
                      ${project.color}33 8px,
                      transparent 8px,
                      transparent 16px
                    ), linear-gradient(160deg, ${project.color}, #111)`,
                  }}
                >
                  <div className="absolute top-3 left-3 font-pixel text-[8px] text-black mix-blend-difference">
                    PREVIEW_{project.year}.PNG
                  </div>
                  <p className="font-display text-4xl font-black tracking-tight text-white mix-blend-difference sm:text-5xl">
                    {project.title}
                  </p>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-sm opacity-90 sm:text-base">{project.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-pixel border-[2px] border-border bg-bg px-1.5 py-0.5 text-[7px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <a
                      href={project.liveUrl}
                      onClick={playBlip}
                      className="font-pixel inline-flex items-center gap-1 border-[2px] border-border bg-electric px-2 py-1 text-[8px] text-black"
                    >
                      <ExternalLink size={10} /> LIVE
                    </a>
                    <a
                      href={project.githubUrl}
                      onClick={playBlip}
                      className="font-pixel inline-flex items-center gap-1 border-[2px] border-border bg-fg px-2 py-1 text-[8px] text-bg"
                    >
                      <FolderGit2 size={10} /> GITHUB
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        playBlip();
                        setExpanded(open ? null : project.id);
                      }}
                      className="font-pixel ml-auto inline-flex items-center gap-1 text-[8px] underline"
                      aria-expanded={open}
                    >
                      DETAILS
                      <ChevronDown
                        size={12}
                        className={cn("transition-transform", open && "rotate-180")}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 border-t-[2px] border-border pt-3 text-sm">
                          {project.longDescription}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

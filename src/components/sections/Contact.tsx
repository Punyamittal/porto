"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SITE,
  PROJECTS,
  EXPERIENCE,
  ACHIEVEMENTS,
  EDUCATION,
  CERTIFICATIONS,
  ABOUT,
  SKILL_CARDS,
} from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useApp } from "@/components/providers/AppProvider";

type Line = {
  id: number;
  type: "input" | "output" | "system" | "success";
  text: string;
};

type Out = Omit<Line, "id">;

const HELP = [
  "Available commands (aliases work too):",
  "  help / ?           — this list",
  "  about / who / me   — profile bio",
  "  projects / work    — project index",
  "  xp / experience    — roles & internships",
  "  achieve / awards   — wins & unlocks",
  "  edu / college / vit — education",
  "  skills / stack     — skill cards",
  "  certs              — certifications",
  "  contact / email    — how to reach me",
  "  github / linkedin / ysoc — open link",
  "  social / links     — all socials",
  "  resume / cv        — open GitHub",
  "  name / location    — quick facts",
  "  theme / retro      — UI toggles",
  "  clear / cls        — wipe screen",
  "  Tip: type any project, company, or skill name to look it up.",
];

let lineId = 0;
const nextId = () => ++lineId;

function openUrl(url: string) {
  if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
}

function resolve(raw: string): { lines: Out[]; open?: string } | null {
  const c = raw.trim().toLowerCase().replace(/[^\w\s./+-]/g, "");
  if (!c) return null;

  if (["help", "?", "commands", "menu", "ls", "man"].includes(c)) {
    return { lines: HELP.map((t) => ({ type: "output", text: t })) };
  }

  if (["about", "who", "me", "bio", "profile", "punya", "mittal", "info"].includes(c)) {
    return {
      lines: [
        { type: "output", text: `${SITE.name} — ${SITE.title}` },
        { type: "output", text: SITE.subtitle },
        { type: "output", text: ABOUT.bio },
        { type: "output", text: SITE.headline },
        { type: "success", text: "✓ PROFILE LOADED" },
      ],
    };
  }

  if (["name", "whoami"].includes(c)) {
    return {
      lines: [
        { type: "output", text: SITE.name },
        { type: "success", text: "✓ IDENTITY OK" },
      ],
    };
  }

  if (["location", "where", "based", "city", "delhi", "chennai"].includes(c)) {
    return {
      lines: [
        { type: "output", text: SITE.location },
        { type: "success", text: "✓ LOCATION PINNED" },
      ],
    };
  }

  if (["projects", "project", "work", "portfolio", "builds", "apps"].includes(c)) {
    return {
      lines: [
        ...PROJECTS.map((p) => ({
          type: "output" as const,
          text: `• ${p.title} [${p.sticker}] — ${p.description}`,
        })),
        { type: "success", text: "✓ PROJECT INDEX READY" },
      ],
    };
  }

  if (["xp", "experience", "exp", "jobs", "intern", "internship", "roles", "career"].includes(c)) {
    return {
      lines: [
        ...EXPERIENCE.map((e) => ({
          type: "output" as const,
          text: `• ${e.role} @ ${e.company} (${e.period})`,
        })),
        { type: "success", text: "✓ EXPERIENCE TIMELINE READY" },
      ],
    };
  }

  if (["achieve", "achievements", "awards", "wins", "hackathon", "hackathons", "prizes"].includes(c)) {
    return {
      lines: [
        ...ACHIEVEMENTS.filter((a) => a.unlocked).map((a) => ({
          type: "output" as const,
          text: `• ${a.title} — ${a.description}`,
        })),
        { type: "success", text: "✓ HIGH SCORES LOADED" },
      ],
    };
  }

  if (["edu", "education", "college", "school", "university", "vit", "degree", "cgpa"].includes(c)) {
    return {
      lines: [
        ...EDUCATION.map((e) => ({
          type: "output" as const,
          text: `• ${e.school} — ${e.degree} (${e.period}) · ${e.detail}`,
        })),
        { type: "success", text: "✓ EDUCATION LOADED" },
      ],
    };
  }

  if (["skills", "skill", "stack", "tech", "technologies", "tools"].includes(c)) {
    return {
      lines: [
        ...SKILL_CARDS.map((s) => ({
          type: "output" as const,
          text: `• ${s.name} [${s.rarity}] LVL ${s.level} — ${s.description}`,
        })),
        { type: "output", text: `Chips: ${ABOUT.skills.join(", ")}` },
        { type: "success", text: "✓ SKILL DECK LOADED" },
      ],
    };
  }

  if (["certs", "certifications", "certificates", "courses", "nptel"].includes(c)) {
    return {
      lines: [
        ...CERTIFICATIONS.map((cert) => ({
          type: "output" as const,
          text: `• ${cert}`,
        })),
        { type: "success", text: "✓ CERT STACK LOADED" },
      ],
    };
  }

  if (["contact", "email", "mail", "reach", "hire", "connect", "message"].includes(c)) {
    return {
      lines: [
        { type: "output", text: `location: ${SITE.location}` },
        { type: "output", text: `github: ${SITE.social.github}` },
        { type: "output", text: `linkedin: ${SITE.social.linkedin}` },
        { type: "output", text: `ysoc: ${SITE.social.ysoc}` },
        { type: "output", text: "Tip: type github / linkedin / ysoc to open." },
        { type: "success", text: "✓ CONTACT CHANNEL OPEN" },
      ],
    };
  }

  if (["social", "links", "link", "urls", "sites"].includes(c)) {
    return {
      lines: [
        ...Object.entries(SITE.social).map(([k, v]) => ({
          type: "output" as const,
          text: `${k}: ${v}`,
        })),
        { type: "success", text: "✓ SOCIAL GRAPH LOADED" },
      ],
    };
  }

  if (["github", "gh", "git", "repo", "repos", "code"].includes(c)) {
    return {
      lines: [
        { type: "output", text: `GitHub → ${SITE.social.github}` },
        { type: "output", text: "Opening profile..." },
        { type: "success", text: "✓ GITHUB LINK DISPATCHED" },
      ],
      open: SITE.social.github,
    };
  }

  if (["linkedin", "li", "linked", "ln"].includes(c)) {
    return {
      lines: [
        { type: "output", text: `LinkedIn → ${SITE.social.linkedin}` },
        { type: "output", text: "Opening profile..." },
        { type: "success", text: "✓ LINKEDIN LINK DISPATCHED" },
      ],
      open: SITE.social.linkedin,
    };
  }

  if (["ysoc", "y-soc", "youth", "opensource", "open-source"].includes(c)) {
    return {
      lines: [
        { type: "output", text: `Y-SoC → ${SITE.social.ysoc}` },
        { type: "output", text: "Youth Season of Code — You Code. You Create. You Collaborate." },
        { type: "output", text: "Opening site..." },
        { type: "success", text: "✓ Y-SOC LINK DISPATCHED" },
      ],
      open: SITE.social.ysoc,
    };
  }

  if (["resume", "cv", "portfolio"].includes(c)) {
    return {
      lines: [
        { type: "output", text: `Opening ${SITE.resumeUrl} ...` },
        { type: "success", text: "✓ RESUME / GITHUB DISPATCHED" },
      ],
      open: SITE.resumeUrl,
    };
  }

  if (["theme", "dark", "light", "mode"].includes(c)) {
    return { lines: [{ type: "output", text: "__THEME__" }] };
  }

  if (["retro", "crt", "vhs", "pixel"].includes(c)) {
    return { lines: [{ type: "output", text: "__RETRO__" }] };
  }

  if (["clear", "cls", "reset", "wipe"].includes(c)) {
    return { lines: [{ type: "system", text: "__CLEAR__" }] };
  }

  if (["hi", "hello", "hey", "sup", "yo"].includes(c)) {
    return {
      lines: [
        { type: "output", text: `Hey! I'm ${SITE.name}.` },
        { type: "output", text: "Try: about · projects · xp · github · linkedin · help" },
        { type: "success", text: "✓ HELLO ACK" },
      ],
    };
  }

  // Fuzzy: project by id / title / keyword
  const projectHits = PROJECTS.filter(
    (p) =>
      p.id.includes(c) ||
      p.title.toLowerCase().includes(c) ||
      p.description.toLowerCase().includes(c) ||
      p.tech.some((t) => t.toLowerCase().includes(c)) ||
      c.split(/\s+/).some(
        (w) =>
          w.length > 2 &&
          (p.title.toLowerCase().includes(w) ||
            p.id.includes(w) ||
            p.tech.some((t) => t.toLowerCase().includes(w))),
      ),
  );
  if (projectHits.length === 1) {
    const p = projectHits[0];
    return {
      lines: [
        { type: "output", text: `${p.title} [${p.sticker}] · ${p.year}` },
        { type: "output", text: p.description },
        { type: "output", text: p.longDescription },
        { type: "output", text: `Tech: ${p.tech.join(", ")}` },
        ...(p.liveUrl !== "#"
          ? [{ type: "output" as const, text: `Live: ${p.liveUrl}` }]
          : []),
        { type: "output", text: `GitHub: ${p.githubUrl}` },
        { type: "success", text: "✓ PROJECT DOSSIER" },
      ],
      open: p.liveUrl !== "#" ? p.liveUrl : undefined,
    };
  }
  if (projectHits.length > 1) {
    return {
      lines: [
        { type: "output", text: `Found ${projectHits.length} projects matching "${raw}":` },
        ...projectHits.map((p) => ({
          type: "output" as const,
          text: `• ${p.title} — type "${p.id}" for details`,
        })),
        { type: "success", text: "✓ SEARCH RESULTS" },
      ],
    };
  }

  // Fuzzy: experience / company
  const xpHits = EXPERIENCE.filter(
    (e) =>
      e.company.toLowerCase().includes(c) ||
      e.role.toLowerCase().includes(c) ||
      e.id.includes(c) ||
      e.highlights.some((h) => h.toLowerCase().includes(c)),
  );
  if (xpHits.length >= 1) {
    return {
      lines: [
        ...xpHits.flatMap((e) => [
          { type: "output" as const, text: `${e.role} @ ${e.company}` },
          { type: "output" as const, text: `${e.period} · ${e.location}` },
          ...e.highlights.map((h) => ({
            type: "output" as const,
            text: `  ▸ ${h}`,
          })),
        ]),
        { type: "success", text: "✓ EXPERIENCE MATCH" },
      ],
    };
  }

  // Fuzzy: achievement
  const achHits = ACHIEVEMENTS.filter(
    (a) =>
      a.unlocked &&
      (a.title.toLowerCase().includes(c) ||
        a.description.toLowerCase().includes(c) ||
        a.id.includes(c)),
  );
  if (achHits.length >= 1) {
    return {
      lines: [
        ...achHits.map((a) => ({
          type: "output" as const,
          text: `• ${a.title} (+${a.points} pts) — ${a.description}`,
        })),
        { type: "success", text: "✓ ACHIEVEMENT MATCH" },
      ],
    };
  }

  // Fuzzy: skill
  const skillHits = SKILL_CARDS.filter(
    (s) =>
      s.name.toLowerCase().includes(c) ||
      s.id.includes(c) ||
      s.description.toLowerCase().includes(c),
  );
  if (skillHits.length >= 1) {
    return {
      lines: [
        ...skillHits.map((s) => ({
          type: "output" as const,
          text: `• ${s.name} [${s.rarity}] LVL ${s.level} — ${s.description}`,
        })),
        { type: "success", text: "✓ SKILL MATCH" },
      ],
    };
  }

  // Fuzzy: education keyword
  if (EDUCATION.some((e) => e.school.toLowerCase().includes(c) || e.degree.toLowerCase().includes(c))) {
    return {
      lines: [
        ...EDUCATION.map((e) => ({
          type: "output" as const,
          text: `• ${e.school} — ${e.degree} (${e.period}) · ${e.detail}`,
        })),
        { type: "success", text: "✓ EDUCATION MATCH" },
      ],
    };
  }

  // Cert partial match
  const certHits = CERTIFICATIONS.filter((cert) => cert.toLowerCase().includes(c));
  if (certHits.length >= 1 && c.length > 3) {
    return {
      lines: [
        ...certHits.map((cert) => ({ type: "output" as const, text: `• ${cert}` })),
        { type: "success", text: "✓ CERT MATCH" },
      ],
    };
  }

  return {
    lines: [
      { type: "output", text: `No exact match for "${raw}".` },
      {
        type: "output",
        text: "Try: help · about · projects · xp · skills · github · linkedin · ysoc",
      },
      {
        type: "output",
        text: "Or search a name like: rehab · kai · annam · jbn · react · nptel",
      },
    ],
  };
}

export function Contact() {
  const [lines, setLines] = useState<Line[]>([
    {
      id: nextId(),
      type: "system",
      text: "PORTO TERMINAL v1.0 — type 'help' or try github / linkedin / about",
    },
  ]);
  const [input, setInput] = useState("");
  const [bootText, setBootText] = useState("");
  const [queue, setQueue] = useState<Out[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playBlip, toggleTheme, setRetroMode, retroMode } = useApp();

  useEffect(() => {
    const msg = "> establishing secure connection...";
    let i = 0;
    const id = setInterval(() => {
      setBootText(msg.slice(0, i + 1));
      i++;
      if (i >= msg.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!queue.length) return;
    const [next, ...rest] = queue;
    const t = setTimeout(() => {
      setLines((prev) => [...prev, { ...next, id: nextId() }]);
      setQueue(rest);
    }, next.type === "success" ? 100 : 40);
    return () => clearTimeout(t);
  }, [queue]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const enqueue = useCallback((items: Out[]) => {
    setQueue((q) => [...q, ...items]);
  }, []);

  const run = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setLines((prev) => [
        ...prev,
        { id: nextId(), type: "input", text: `> ${cmd}` },
      ]);

      const result = resolve(trimmed);
      if (!result) return;

      const first = result.lines[0]?.text;

      if (first === "__CLEAR__") {
        setLines([{ id: nextId(), type: "system", text: "Terminal cleared." }]);
        setQueue([]);
        return;
      }

      if (first === "__THEME__") {
        toggleTheme();
        enqueue([
          { type: "output", text: "Theme toggled." },
          { type: "success", text: "✓ DISPLAY MODE UPDATED" },
        ]);
        return;
      }

      if (first === "__RETRO__") {
        setRetroMode(!retroMode);
        enqueue([
          {
            type: "output",
            text: retroMode ? "Retro Mode OFF." : "Retro Mode ON. CRT engaged.",
          },
          { type: "success", text: "✓ SYSTEM FLAG FLIPPED" },
        ]);
        return;
      }

      enqueue(result.lines);
      if (result.open) openUrl(result.open);
    },
    [enqueue, retroMode, setRetroMode, toggleTheme],
  );

  const quickRun = (cmd: string) => {
    playBlip();
    run(cmd);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="// 06 — TRANSMISSION"
          title="CONTACT"
          subtitle="Type anything — github, linkedin, rehab, jbn, help…"
          accent="bg-neon"
        />

        <div
          className="brutal-border-thick mx-auto max-w-3xl overflow-hidden bg-black text-neon"
          onClick={() => inputRef.current?.focus()}
          role="application"
          aria-label="Interactive contact terminal"
        >
          <div className="flex items-center justify-between border-b-2 border-neon/40 bg-[#111] px-3 py-2">
            <span className="font-pixel text-[9px] text-electric">
              terminal.exe
            </span>
            <span className="font-pixel text-[8px] text-yellow">{bootText}</span>
          </div>

          <div className="font-mono h-72 space-y-1 overflow-y-auto p-4 text-xs sm:h-80 sm:text-sm">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.p
                  key={line.id}
                  initial={
                    line.type === "success"
                      ? { opacity: 0, x: -24 }
                      : { opacity: 0, y: 6 }
                  }
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className={
                    line.type === "input"
                      ? "text-yellow"
                      : line.type === "system"
                        ? "text-electric"
                        : line.type === "success"
                          ? "font-bold text-hot-pink"
                          : "text-neon"
                  }
                >
                  {line.text}
                </motion.p>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          <form
            className="flex items-center gap-2 border-t-2 border-neon/40 bg-[#0a0a0a] px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              playBlip();
              run(input);
              setInput("");
            }}
          >
            <span className="font-pixel text-[10px] text-hot-pink">C:\</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono flex-1 bg-transparent text-sm text-neon outline-none placeholder:text-neon/40"
              placeholder="github · linkedin · about · rehab · help"
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="h-4 w-2 animate-[blink_1s_step-end_infinite] bg-neon" />
          </form>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["linkedin", "github", "ysoc", "about", "projects", "xp", "help"].map(
            (cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => quickRun(cmd)}
                className="font-pixel border-[3px] border-border bg-surface px-4 py-2 text-[9px] uppercase shadow-[4px_4px_0_var(--border)] hover:bg-electric hover:text-black"
              >
                {cmd}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

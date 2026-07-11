"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE, PROJECTS, EXPERIENCE } from "@/data/portfolio";
import { useApp } from "@/components/providers/AppProvider";

type Line = { id: number; text: string; kind: "in" | "out" | "ok" };

let lid = 0;

export function SceneContact() {
  const { playBlip, soundEnabled, toggleSound, trackName } = useApp();
  const [lines, setLines] = useState<Line[]>([
    {
      id: ++lid,
      kind: "out",
      text: "PORTO TERMINAL v2 — type help · github · linkedin · music",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = useCallback((items: Omit<Line, "id">[]) => {
    setLines((prev) => [...prev, ...items.map((i) => ({ ...i, id: ++lid }))]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const c = raw.trim().toLowerCase();
      if (!c) return;
      push([{ kind: "in", text: `> ${raw}` }]);

      if (["help", "?"].includes(c)) {
        push([
          {
            kind: "out",
            text: "help · about · projects · xp · github · linkedin · ysoc · music · clear",
          },
        ]);
        return;
      }
      if (["about", "who", "me"].includes(c)) {
        push([
          { kind: "out", text: `${SITE.name} — ${SITE.title}` },
          { kind: "out", text: SITE.subtitle },
          { kind: "ok", text: "✓ PROFILE" },
        ]);
        return;
      }
      if (["projects", "work"].includes(c)) {
        push([
          ...PROJECTS.slice(0, 5).map((p) => ({
            kind: "out" as const,
            text: `• ${p.title}`,
          })),
          { kind: "ok", text: "✓" },
        ]);
        return;
      }
      if (["xp", "experience"].includes(c)) {
        push([
          ...EXPERIENCE.slice(0, 5).map((e) => ({
            kind: "out" as const,
            text: `• ${e.role} @ ${e.company}`,
          })),
          { kind: "ok", text: "✓" },
        ]);
        return;
      }
      if (["github", "gh", "git"].includes(c)) {
        push([
          { kind: "out", text: SITE.social.github },
          { kind: "ok", text: "✓ OPENING" },
        ]);
        window.open(SITE.social.github, "_blank");
        return;
      }
      if (["linkedin", "li"].includes(c)) {
        push([
          { kind: "out", text: SITE.social.linkedin },
          { kind: "ok", text: "✓ OPENING" },
        ]);
        window.open(SITE.social.linkedin, "_blank");
        return;
      }
      if (["ysoc"].includes(c)) {
        push([
          { kind: "out", text: SITE.social.ysoc },
          { kind: "ok", text: "✓ OPENING" },
        ]);
        window.open(SITE.social.ysoc, "_blank");
        return;
      }
      if (["music", "sound", "audio"].includes(c)) {
        toggleSound();
        push([
          {
            kind: "ok",
            text: soundEnabled ? "✓ MUTED" : `✓ PLAYING · ${trackName}`,
          },
        ]);
        return;
      }
      if (["clear", "cls"].includes(c)) {
        setLines([{ id: ++lid, kind: "out", text: "Cleared." }]);
        return;
      }
      push([{ kind: "out", text: `Unknown: ${c}. Try help.` }]);
    },
    [push, soundEnabled, toggleSound, trackName],
  );

  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--bg)] px-4 pt-[max(5rem,calc(env(safe-area-inset-top)+4rem))] pb-[max(6rem,calc(env(safe-area-inset-bottom)+4.5rem))] text-[var(--fg)] sm:px-8">
      <div className="pointer-events-none absolute top-16 right-5 font-pixel text-[8px] border-[3px] border-border bg-electric px-2 py-1 text-black shadow-[3px_3px_0_var(--border)] rotate-3">
        TERM
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col">
        <p className="font-pixel text-[9px] text-hot-pink uppercase">
          // 07 — TRANSMISSION
        </p>
        <h2 className="font-display mt-1 text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] font-black uppercase">
          Contact
          <span className="mt-2 block h-3 w-32 bg-yellow sm:h-4" />
        </h2>

        <div
          className="brutal-border-thick mt-5 flex min-h-0 flex-1 flex-col overflow-hidden bg-black text-neon"
          onClick={() => inputRef.current?.focus()}
          role="application"
          aria-label="Contact terminal"
        >
          <div className="flex items-center justify-between border-b-2 border-neon/40 bg-[#111] px-3 py-2">
            <span className="font-pixel text-[9px] text-electric">terminal.exe</span>
            <span className="font-pixel text-[8px] text-yellow">SYS.OK</span>
          </div>

          <div
            ref={logRef}
            data-scene-scroll
            className="font-mono min-h-0 flex-1 space-y-1 overflow-y-auto p-4 text-xs sm:text-sm"
          >
            {lines.map((l) => (
              <p
                key={l.id}
                className={
                  l.kind === "in"
                    ? "text-yellow"
                    : l.kind === "ok"
                      ? "font-bold text-hot-pink"
                      : "text-neon"
                }
              >
                {l.text}
              </p>
            ))}
          </div>

          <form
            className="flex shrink-0 items-center gap-2 border-t-2 border-neon/40 bg-[#0a0a0a] px-3 py-3"
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
              placeholder="github · linkedin · help"
              spellCheck={false}
              autoComplete="off"
            />
            <span className="h-4 w-2 animate-[blink_1s_step-end_infinite] bg-neon" />
          </form>
        </div>

        <div className="mt-4 flex shrink-0 flex-wrap gap-2">
          {Object.entries(SITE.social).map(([k, url]) => (
            <a
              key={k}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel border-[3px] border-border bg-surface px-3 py-2 text-[8px] uppercase shadow-[3px_3px_0_var(--border)] hover:bg-neon hover:text-black"
            >
              {k}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

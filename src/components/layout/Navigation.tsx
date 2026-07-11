"use client";

import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { SITE } from "@/data/portfolio";
import { NAV_SCENES, type SceneId } from "@/lib/scenes";
import { useApp } from "@/components/providers/AppProvider";
import { useExhibition } from "@/components/exhibition/SceneExhibition";
import { cn } from "@/lib/utils";

export function Navigation() {
  const {
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    cyclePalette,
    playBlip,
    retroMode,
  } = useApp();
  const { active, goTo, animating } = useExhibition();

  return (
    <header className="fixed top-0 right-0 left-0 z-[90] border-b-[3px] border-border bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2.5 sm:px-8">
        <button
          type="button"
          onDoubleClick={() => {
            cyclePalette();
            playBlip();
          }}
          onClick={playBlip}
          className="font-pixel shrink-0 border-[3px] border-border bg-yellow px-2 py-1 text-[8px] text-black shadow-[2px_2px_0_var(--border)] uppercase"
          aria-label={`${SITE.shortName} logo`}
        >
          {SITE.shortName}
          {retroMode && <span className="ml-1 text-hot-pink">●</span>}
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Scenes">
          {NAV_SCENES.map((link) => (
            <button
              key={link.id}
              type="button"
              disabled={animating}
              onClick={() => {
                playBlip();
                goTo(link.id as SceneId);
              }}
              className={cn(
                "font-pixel relative px-2 py-1 text-[7px] uppercase transition-colors",
                active === link.id
                  ? "bg-hot-pink text-black"
                  : "text-[var(--fg)]/55 hover:bg-electric hover:text-black",
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleSound}
            className="border-[3px] border-border bg-surface p-1.5 text-[var(--fg)] shadow-[2px_2px_0_var(--border)] hover:bg-neon hover:text-black"
            aria-label={soundEnabled ? "Mute" : "Play sound"}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="border-[3px] border-border bg-surface p-1.5 text-[var(--fg)] shadow-[2px_2px_0_var(--border)] hover:bg-electric hover:text-black"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>
    </header>
  );
}

"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useApp } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";

export function Navigation() {
  const active = useActiveSection();
  const {
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    cyclePalette,
    playBlip,
    retroMode,
  } = useApp();

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 border-b-[3px] border-border bg-surface/90 backdrop-blur-md"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-5">
        <button
          type="button"
          onDoubleClick={() => {
            cyclePalette();
            playBlip();
          }}
          onClick={playBlip}
          className="font-pixel glitch-hover shrink-0 border-[3px] border-border bg-fg px-2 py-1.5 text-[9px] text-bg uppercase"
          aria-label={`${SITE.shortName} logo. Double-click to change palette.`}
          title="Double-click to cycle palette"
        >
          {SITE.shortName}
          {retroMode && <span className="ml-1 text-neon">●</span>}
        </button>

        <nav
          className="hidden items-center gap-1 overflow-x-auto md:flex lg:gap-2"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={playBlip}
              className={cn(
                "font-pixel relative px-2 py-1 text-[8px] uppercase transition-transform hover:skew-x-[-6deg] lg:text-[9px]",
                active === link.id ? "text-hot-pink" : "text-fg",
              )}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute right-0 -bottom-0.5 left-0 h-0.5 bg-electric"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              toggleSound();
            }}
            className="border-[2px] border-border bg-bg p-1.5 hover:bg-yellow"
            aria-label={soundEnabled ? "Mute soundtrack" : "Play soundtrack"}
            title={soundEnabled ? "Mute soundtrack" : "Play soundtrack"}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              playBlip();
            }}
            className="border-[2px] border-border bg-bg p-1.5 hover:bg-neon"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <span className="font-pixel hidden border-[2px] border-border bg-electric px-2 py-1 text-[8px] text-black sm:inline">
            SYS.OK
          </span>
        </div>
      </div>

      {/* Mobile section indicator */}
      <div className="flex gap-1 overflow-x-auto border-t-[2px] border-border px-2 py-1 md:hidden">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={cn(
              "font-pixel shrink-0 px-2 py-0.5 text-[7px]",
              active === link.id
                ? "bg-hot-pink text-black"
                : "bg-bg text-fg",
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.header>
  );
}

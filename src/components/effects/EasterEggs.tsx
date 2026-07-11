"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useKonami } from "@/hooks/useKonami";
import { useApp } from "@/components/providers/AppProvider";

export function EasterEggs() {
  const {
    setRetroMode,
    unlockAchievement,
    playBlip,
    retroMode,
  } = useApp();
  const [toast, setToast] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [pixelFound, setPixelFound] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }, []);

  const onKonami = useCallback(() => {
    setRetroMode(true);
    unlockAchievement("konami");
    playBlip();
    showToast("🎮 RETRO MODE UNLOCKED — Konami Code accepted");
  }, [playBlip, setRetroMode, showToast, unlockAchievement]);

  useKonami(onKonami);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        setShowHelp((v) => !v);
      }
      if (e.key === "Escape") setShowHelp(false);
      if ((e.key === "r" || e.key === "R") && e.altKey) {
        setRetroMode(!retroMode);
        showToast(retroMode ? "Retro Mode OFF" : "Retro Mode ON");
      }
      if ((e.key === "t" || e.key === "T") && e.altKey) {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [retroMode, setRetroMode, showToast]);

  return (
    <>
      {/* Hidden pixel character */}
      <button
        type="button"
        className="fixed right-3 bottom-3 z-40 opacity-[0.15] transition-opacity hover:opacity-100"
        aria-label="Hidden pixel character"
        onClick={() => {
          if (pixelFound) return;
          setPixelFound(true);
          unlockAchievement("explorer");
          playBlip();
          showToast("👾 PIXEL HUNTER — secret achievement unlocked!");
        }}
      >
        <span
          className="block h-6 w-6"
          style={{
            imageRendering: "pixelated",
            background: `
              linear-gradient(var(--neon), var(--neon)) 8px 0 / 8px 8px no-repeat,
              linear-gradient(var(--neon), var(--neon)) 0 8px / 24px 8px no-repeat,
              linear-gradient(#000, #000) 8px 8px / 8px 8px no-repeat,
              linear-gradient(var(--hot-pink), var(--hot-pink)) 0 16px / 8px 8px no-repeat,
              linear-gradient(var(--hot-pink), var(--hot-pink)) 16px 16px / 8px 8px no-repeat
            `,
          }}
        />
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="font-pixel fixed top-20 left-1/2 z-[9990] max-w-sm -translate-x-1/2 border-[3px] border-black bg-yellow px-4 py-3 text-center text-[9px] text-black shadow-[4px_4px_0_#000]"
            initial={{ y: -40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="fixed inset-0 z-[9980] flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              className="brutal-border-thick w-full max-w-md bg-surface p-5"
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-2xl font-black">SHORTCUTS</h3>
              <ul className="font-mono mt-4 space-y-2 text-sm">
                <li>
                  <kbd className="border border-border bg-bg px-1">?</kbd> Toggle
                  this help
                </li>
                <li>
                  <kbd className="border border-border bg-bg px-1">Alt</kbd>+
                  <kbd className="border border-border bg-bg px-1">R</kbd> Retro
                  mode
                </li>
                <li>
                  <kbd className="border border-border bg-bg px-1">Alt</kbd>+
                  <kbd className="border border-border bg-bg px-1">T</kbd> Jump to
                  terminal
                </li>
                <li>↑↑↓↓←→←→BA — Konami / Retro Mode</li>
                <li>Double-click logo — cycle palette</li>
                <li>Find the pixel in the corner</li>
              </ul>
              <button
                type="button"
                className="font-pixel mt-4 border-[2px] border-border bg-electric px-3 py-1 text-[9px] text-black"
                onClick={() => setShowHelp(false)}
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

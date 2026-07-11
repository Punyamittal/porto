"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";

const BOOT_LINES = [
  "PORTO BIOS v2.6",
  "Checking memory .............. OK",
  "Loading pixel fonts .......... OK",
  "Mounting brutalist grid ...... OK",
  "Initializing chrome shaders .. OK",
  "Calibrating magnetic buttons . OK",
  "Booting creative laboratory...",
];

export function LoadingScreen() {
  const { loading, setLoading } = useApp();
  const [line, setLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const lineTimer = setInterval(() => {
      setLine((l) => Math.min(l + 1, BOOT_LINES.length - 1));
    }, 280);
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer);
          clearInterval(lineTimer);
          setTimeout(() => setLoading(false), 350);
          return 100;
        }
        return p + 4;
      });
    }, 60);
    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
    };
  }, [loading, setLoading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-black text-neon"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45 }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className="w-full max-w-md px-6 font-mono text-xs sm:text-sm">
            <p className="font-pixel mb-6 text-[10px] text-electric">
              SYSTEM BOOT // 1999→2026
            </p>
            <div className="space-y-1">
              {BOOT_LINES.slice(0, line + 1).map((l) => (
                <p key={l}>{l}</p>
              ))}
              <span className="inline-block h-4 w-2 animate-[blink_1s_step-end_infinite] bg-neon" />
            </div>
            <div className="mt-8 border-2 border-neon p-1">
              <div
                className="h-3 bg-neon transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-pixel mt-3 text-[9px] text-yellow">
              {progress}% COMPLETE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

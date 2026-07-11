"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createMusicEngine } from "@/lib/chiptune";
import { playPixelPiano } from "@/lib/pixelPiano";

type Theme = "light" | "dark";
type Palette = "default" | "chrome" | "acid" | "sunset";

type AppContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  palette: Palette;
  cyclePalette: () => void;
  retroMode: boolean;
  setRetroMode: (v: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  musicPlaying: boolean;
  trackName: string;
  playBlip: () => void;
  unlocked: Set<string>;
  unlockAchievement: (id: string) => void;
  visitorCount: number;
  loading: boolean;
  setLoading: (v: boolean) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const PALETTES: Palette[] = ["default", "chrome", "acid", "sunset"];

const TRACKS = [
  "Pixel Dreams — Lo-Fi OS",
  "Chrome Waves — Synth Lab",
  "Brutal Beats — Grid Theory",
  "Y2K Forever — Modem Choir",
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [palette, setPalette] = useState<Palette>("default");
  const [retroMode, setRetroMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [trackName, setTrackName] = useState(TRACKS[0]);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const musicRef = useRef<ReturnType<typeof createMusicEngine> | null>(null);
  const blipCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMounted(true);
    setVisitorCount(10000 + Math.floor(Math.random() * 89999));
    setTrackName(TRACKS[Math.floor(Math.random() * TRACKS.length)]);
    musicRef.current = createMusicEngine();

    const savedTheme = localStorage.getItem("porto-theme") as Theme | null;
    const savedPalette = localStorage.getItem("porto-palette") as Palette | null;
    const savedUnlocks = localStorage.getItem("porto-unlocks");
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
    if (savedPalette) setPalette(savedPalette);
    if (savedUnlocks) {
      try {
        setUnlocked(new Set(JSON.parse(savedUnlocks)));
      } catch {
        /* ignore */
      }
    }

    console.log(
      "%c⚡ PORTO SYSTEM v1.0",
      "font-family:monospace;font-size:16px;color:#39FF14;background:#000;padding:8px 12px;",
    );
    console.log(
      "%cClick the speaker icon to play the retro soundtrack.",
      "font-family:monospace;color:#00A3FF;",
    );

    return () => {
      musicRef.current?.stop();
      blipCtxRef.current?.close().catch(() => undefined);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.palette = palette;
    document.documentElement.dataset.retro = retroMode ? "true" : "false";
    localStorage.setItem("porto-theme", theme);
    localStorage.setItem("porto-palette", palette);
  }, [theme, palette, retroMode, mounted]);

  useEffect(() => {
    const engine = musicRef.current;
    if (!engine) return;

    if (soundEnabled) {
      engine
        .start()
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false));
    } else {
      engine.stop();
      setMusicPlaying(false);
    }
  }, [soundEnabled]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const cyclePalette = useCallback(() => {
    setPalette((p) => {
      const i = PALETTES.indexOf(p);
      return PALETTES[(i + 1) % PALETTES.length];
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((s) => !s);
  }, []);

  const playBlip = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      if (!blipCtxRef.current) blipCtxRef.current = new AudioContext();
      const ctx = blipCtxRef.current;
      playPixelPiano(ctx);
    } catch {
      /* ignore */
    }
  }, [soundEnabled]);

  // Piano pixel notes on any interactive click while sound is on
  useEffect(() => {
    if (!mounted || !soundEnabled) return;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, input, textarea, select, [role='button'], [data-magnetic], [data-cursor='hover']",
      );
      if (!interactive) return;
      // Avoid double-firing when handlers also call playBlip on the same tick
      if ((interactive as HTMLElement).dataset.pianoSkip === "1") return;
      try {
        if (!blipCtxRef.current) blipCtxRef.current = new AudioContext();
        playPixelPiano(blipCtxRef.current);
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, [mounted, soundEnabled]);

  const unlockAchievement = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem("porto-unlocks", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      palette,
      cyclePalette,
      retroMode,
      setRetroMode,
      soundEnabled,
      toggleSound,
      musicPlaying,
      trackName,
      playBlip,
      unlocked,
      unlockAchievement,
      visitorCount,
      loading,
      setLoading,
    }),
    [
      theme,
      toggleTheme,
      palette,
      cyclePalette,
      retroMode,
      soundEnabled,
      toggleSound,
      musicPlaying,
      trackName,
      playBlip,
      unlocked,
      unlockAchievement,
      visitorCount,
      loading,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

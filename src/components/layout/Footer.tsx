"use client";

import { useEffect, useState } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { useLocalTime } from "@/hooks/useLocalTime";
import { useApp } from "@/components/providers/AppProvider";
import { getRandomQuote } from "@/lib/utils";
import { SITE } from "@/data/portfolio";

export function Footer() {
  const time = useLocalTime();
  const {
    visitorCount,
    soundEnabled,
    musicPlaying,
    trackName,
    toggleSound,
    playBlip,
  } = useApp();
  const [quote, setQuote] = useState("Loading vibe...");

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <footer className="border-t-[4px] border-border bg-fg text-bg">
      <Marquee
        items={[
          "PUNYA MITTAL",
          "VIT CHENNAI",
          "Y-SOC.IN",
          "GITHUB.COM/PUNYAMITTAL",
          "BUILD · SHIP · LEAD",
          "PRESS ? FOR SHORTCUTS",
        ]}
        className="border-border bg-electric text-black"
        speed="fast"
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-pixel text-[10px] text-neon">VISITOR COUNTER</p>
          <p className="font-display mt-2 text-4xl font-black tabular-nums animate-[counter-glow_2s_ease_infinite]">
            {visitorCount > 0 ? visitorCount.toLocaleString() : "-----"}
          </p>
        </div>

        <div>
          <p className="font-pixel text-[10px] text-yellow">LOCAL TIME</p>
          <p className="font-mono mt-2 text-2xl font-bold">{time}</p>
        </div>

        <div>
          <p className="font-pixel text-[10px] text-hot-pink">NOW PLAYING</p>
          <button
            type="button"
            onClick={() => {
              toggleSound();
              // blip only audible after enable; still fine
              setTimeout(playBlip, 50);
            }}
            className="mt-2 w-full border-[2px] border-bg/40 p-2 text-left transition-colors hover:border-neon hover:bg-bg/10"
            aria-pressed={soundEnabled}
            aria-label={
              soundEnabled ? "Mute soundtrack" : "Play retro soundtrack"
            }
          >
            <p className="font-pixel text-[8px]">
              {musicPlaying ? "❚❚" : "▶"} {trackName}
            </p>
            <p className="font-pixel mt-1 text-[7px] text-bg/60">
              {soundEnabled
                ? "CLICK TO MUTE"
                : "CLICK TO PLAY — RETRO OST"}
            </p>
            <div className="mt-2 flex h-2 gap-0.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom bg-neon"
                  style={
                    musicPlaying
                      ? {
                          animationName: "float-y",
                          animationDuration: `${0.6 + (i % 5) * 0.15}s`,
                          animationTimingFunction: "ease-in-out",
                          animationIterationCount: "infinite",
                          animationDelay: `${i * 0.05}s`,
                          opacity: 0.4 + (i % 3) * 0.2,
                        }
                      : {
                          animationName: "none",
                          animationDuration: "0s",
                          animationDelay: "0s",
                          opacity: 0.2,
                          transform: "scaleY(0.35)",
                        }
                  }
                />
              ))}
            </div>
          </button>
        </div>

        <div>
          <p className="font-pixel text-[10px] text-electric">DESIGN QUOTE</p>
          <p className="mt-2 text-sm italic">&ldquo;{quote}&rdquo;</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t-[2px] border-bg/30 px-4 py-4 sm:flex-row">
        <p className="font-pixel text-[8px]">
          © {new Date().getFullYear()} {SITE.name} // ALL RIGHTS FLIPPED
        </p>
        <div className="flex gap-3">
          {Object.entries(SITE.social).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[8px] uppercase underline decoration-2 underline-offset-4 hover:text-neon"
            >
              {key}
            </a>
          ))}
        </div>
        <p className="font-pixel text-[8px] text-bg/60">{SITE.email}</p>
      </div>
    </footer>
  );
}

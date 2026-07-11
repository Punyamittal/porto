"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

const SHAPES = [
  { type: "square" as const, color: "var(--electric)", size: 48, x: 12, y: 20, speed: 0.02 },
  { type: "circle" as const, color: "var(--hot-pink)", size: 36, x: 78, y: 30, speed: 0.035 },
  { type: "triangle" as const, color: "var(--yellow)", size: 44, x: 65, y: 70, speed: 0.025 },
  { type: "square" as const, color: "var(--neon)", size: 28, x: 25, y: 75, speed: 0.04 },
  { type: "circle" as const, color: "var(--electric)", size: 20, x: 88, y: 55, speed: 0.03 },
];

export function FloatingShapes() {
  const mouse = useMousePosition(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {SHAPES.map((s, i) => {
        const offsetX = ready
          ? (mouse.x - window.innerWidth / 2) * s.speed
          : 0;
        const offsetY = ready
          ? (mouse.y - window.innerHeight / 2) * s.speed
          : 0;

        return (
          <motion.div
            key={i}
            className="absolute border-[3px] border-black"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              borderRadius: s.type === "circle" ? "50%" : "0px",
              clipPath:
                s.type === "triangle"
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : "none",
              x: offsetX,
            }}
            animate={{
              rotate: [0, 180, 360],
              y: [offsetY, offsetY - 16, offsetY],
            }}
            transition={{
              rotate: { duration: 12 + i * 2, repeat: Infinity, ease: "linear" },
              y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}
    </div>
  );
}

"use client";

import { useMousePosition } from "@/hooks/useMousePosition";

export function MouseLight() {
  const { x, y } = useMousePosition(true);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-soft-light"
      aria-hidden
      style={{
        background: `radial-gradient(420px circle at ${x}px ${y}px, color-mix(in srgb, var(--electric) 35%, transparent), transparent 55%)`,
      }}
    />
  );
}

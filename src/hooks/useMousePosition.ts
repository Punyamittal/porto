"use client";

import { useEffect, useState } from "react";

export function useMousePosition(smooth = false) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      if (!smooth) setPosition(target);
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      setPosition({ ...current });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    if (smooth) raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [smooth]);

  return position;
}

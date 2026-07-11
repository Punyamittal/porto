"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CustomCursor() {
  const pos = useMousePosition(true);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const scale = useSpring(1, { stiffness: 300, damping: 20 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    x.set(pos.x);
    y.set(pos.y);
  }, [pos.x, pos.y, x, y]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setVisible(true);
    document.body.classList.add("cursor-none-all");

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, input, textarea, [data-cursor='hover'], [role='button']",
      );
      setHovering(!!interactive);
      scale.set(interactive ? 2.2 : 1);
    };

    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-none-all");
    };
  }, [scale]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          scale,
        }}
        aria-hidden
      >
        <div
          className={`h-4 w-4 border-2 border-white bg-white ${hovering ? "rounded-none" : "rounded-full"}`}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: pos.x,
          y: pos.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        aria-hidden
      >
        <div className="h-8 w-8 border border-hot-pink/60" />
      </motion.div>
    </>
  );
}

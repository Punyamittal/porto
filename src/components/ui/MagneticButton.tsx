"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useCallback,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "pixel";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
};

export function MagneticButton({
  children,
  className,
  variant = "primary",
  onClick,
  type = "button",
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const { playBlip } = useApp();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18 });
  const springY = useSpring(y, { stiffness: 280, damping: 18 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      x.set(dx * 0.35);
      y.set(dy * 0.35);
    },
    [x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const variants = {
    primary:
      "bg-fg text-bg border-[3px] border-border shadow-[4px_4px_0_var(--border)] hover:shadow-[6px_6px_0_var(--electric)] hover:-translate-y-0.5",
    secondary:
      "bg-electric text-black border-[3px] border-border shadow-[4px_4px_0_var(--border)] hover:shadow-[6px_6px_0_var(--hot-pink)]",
    ghost:
      "bg-transparent text-fg border-[3px] border-border hover:bg-yellow hover:text-black",
    pixel:
      "font-pixel text-[10px] bg-hot-pink text-black border-[3px] border-border shadow-[3px_3px_0_var(--border)] uppercase",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={(e) => {
        playBlip();
        onClick?.(e);
      }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-5 py-3 font-display font-bold uppercase tracking-wide transition-shadow",
        variants[variant],
        className,
      )}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

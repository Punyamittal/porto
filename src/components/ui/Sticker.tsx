"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  color?: string;
  className?: string;
  rotate?: number;
};

const COLORS: Record<string, string> = {
  NEW: "bg-neon text-black",
  HOT: "bg-hot-pink text-black",
  BETA: "bg-yellow text-black",
  LIVE: "bg-electric text-black",
};

export function Sticker({ label, color, className, rotate = -12 }: Props) {
  return (
    <motion.span
      className={cn(
        "font-pixel absolute z-10 inline-block border-[3px] border-black px-2 py-1 text-[8px] uppercase shadow-[3px_3px_0_#000]",
        COLORS[label] ?? "bg-white text-black",
        className,
      )}
      style={{
        backgroundColor: color,
        rotate,
      }}
      animate={{ rotate: [rotate, rotate + 8, rotate] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {label}
    </motion.span>
  );
}

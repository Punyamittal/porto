"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  accent?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  accent = "bg-electric",
}: Props) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      {eyebrow && (
        <motion.p
          className="font-pixel mb-3 text-[10px] uppercase text-hot-pink"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className="font-display relative inline-block text-5xl leading-[0.9] font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl"
        initial={{ opacity: 0, y: 40, skewX: -6 }}
        whileInView={{ opacity: 1, y: 0, skewX: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
      >
        {title}
        <span
          className={cn(
            "absolute -right-3 -bottom-2 -z-10 h-4 w-[70%] sm:h-5",
            accent,
          )}
          aria-hidden
        />
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 max-w-xl text-base md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

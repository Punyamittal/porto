"use client";

import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
  separator?: string;
};

export function Marquee({
  items,
  className,
  speed = "normal",
  separator = "◆",
}: Props) {
  const duration =
    speed === "slow" ? "40s" : speed === "fast" ? "18s" : "28s";
  const content = items.join(`  ${separator}  `);

  return (
    <div
      className={cn(
        "overflow-hidden border-y-[3px] border-border bg-fg text-bg",
        className,
      )}
      aria-hidden
    >
      <div
        className="marquee-track font-pixel py-2 text-[10px] uppercase tracking-widest sm:text-[11px]"
        style={{ animationDuration: duration }}
      >
        <span className="px-4 whitespace-nowrap">{content}&nbsp;&nbsp;{separator}&nbsp;&nbsp;</span>
        <span className="px-4 whitespace-nowrap">{content}&nbsp;&nbsp;{separator}&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}

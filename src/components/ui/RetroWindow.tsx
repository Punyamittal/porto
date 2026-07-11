"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  variant?: "classic" | "chrome";
};

export function RetroWindow({
  title,
  children,
  className,
  onClose,
  variant = "classic",
}: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden border-[3px] border-border shadow-[6px_6px_0_var(--border)]",
        variant === "chrome" ? "chrome-gradient text-black" : "bg-surface text-fg",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b-[3px] border-border bg-electric px-2 py-1.5 text-black">
        <span className="font-pixel truncate text-[9px] uppercase">{title}</span>
        <div className="flex gap-1">
          <span className="h-3 w-3 border-2 border-black bg-yellow" aria-hidden />
          <span className="h-3 w-3 border-2 border-black bg-neon" aria-hidden />
          <button
            type="button"
            onClick={onClose}
            className="h-3 w-3 border-2 border-black bg-hot-pink"
            aria-label="Close window"
          />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

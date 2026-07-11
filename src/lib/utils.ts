import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export const DESIGN_QUOTES = [
  "Design is intelligence made visible.",
  "Make it work, make it right, make it weird.",
  "Pixels are the new paint.",
  "Brutalism is honesty in UI.",
  "The best interface is a playground.",
  "Retro is the new future.",
  "Constraints breed creativity.",
  "Ship the vibe, then the polish.",
  "Good design is as little design as possible — then add chrome.",
  "Click everything. Trust nothing. Explore always.",
];

export function getRandomQuote() {
  return DESIGN_QUOTES[Math.floor(Math.random() * DESIGN_QUOTES.length)];
}

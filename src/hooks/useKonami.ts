"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonami(onUnlock: () => void) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[progress];
      const match =
        key === expected ||
        (expected.length === 1 && key === expected.toLowerCase());

      if (match) {
        const next = progress + 1;
        if (next === KONAMI.length) {
          setProgress(0);
          onUnlock();
        } else {
          setProgress(next);
        }
      } else {
        setProgress(key === KONAMI[0] ? 1 : 0);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [progress, onUnlock]);

  return progress;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SCENE_DURATION, SCENE_IDS, type SceneId } from "@/lib/scenes";
import { runSceneTransition } from "@/components/exhibition/transitions";

type ExhibitionCtx = {
  active: SceneId;
  index: number;
  goTo: (id: SceneId | number) => void;
  next: () => void;
  prev: () => void;
  animating: boolean;
};

const Ctx = createContext<ExhibitionCtx | null>(null);

export function useExhibition() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useExhibition within SceneExhibition");
  return v;
}

type Props = {
  children: ReactNode;
};

export function SceneExhibition({ children }: Props) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(0);
  const touchY = useRef(0);
  const swordReadyRef = useRef(false);
  const swordDrawingRef = useRef(false);
  const pendingIndexRef = useRef<number | null>(null);
  const swordTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = SCENE_IDS[index];

  const clearSwordTimeout = () => {
    if (swordTimeoutRef.current) {
      clearTimeout(swordTimeoutRef.current);
      swordTimeoutRef.current = null;
    }
  };

  const goTo = useCallback((target: SceneId | number) => {
    if (animatingRef.current) return;
    const nextIndex =
      typeof target === "number"
        ? target
        : SCENE_IDS.indexOf(target);
    if (nextIndex < 0 || nextIndex === indexRef.current) return;
    if (nextIndex < 0 || nextIndex >= SCENE_IDS.length) return;

    // Leaving hero forward: draw sword first (desktop), then enter next scene.
    // Skip gate on small screens where the samurai is hidden — otherwise scroll
    // waits forever for an animation that never runs.
    const swordVisible =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;

    if (
      indexRef.current === 0 &&
      nextIndex > 0 &&
      !swordReadyRef.current &&
      swordVisible
    ) {
      if (swordDrawingRef.current) return;
      pendingIndexRef.current = nextIndex;
      swordDrawingRef.current = true;
      animatingRef.current = true;
      setAnimating(true);
      window.dispatchEvent(new CustomEvent("porto:draw-sword"));
      // Fail-open if model/CDN fails or listener isn't mounted yet (common on deploy).
      clearSwordTimeout();
      swordTimeoutRef.current = setTimeout(() => {
        if (!swordDrawingRef.current) return;
        window.dispatchEvent(new CustomEvent("porto:sword-drawn"));
      }, 4200);
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    const scenes = stage.querySelectorAll<HTMLElement>("[data-scene]");
    const outgoing = scenes[indexRef.current];
    const incoming = scenes[nextIndex];
    if (!outgoing || !incoming) return;

    const direction = (nextIndex > indexRef.current ? 1 : -1) as 1 | -1;
    const toId = SCENE_IDS[nextIndex];
    const fromId = SCENE_IDS[indexRef.current];

    animatingRef.current = true;
    setAnimating(true);

    const tl = runSceneTransition(outgoing, incoming, toId, fromId, direction);
    const prevComplete = tl.eventCallback("onComplete");
    tl.eventCallback("onComplete", () => {
      if (typeof prevComplete === "function") prevComplete();
      indexRef.current = nextIndex;
      setIndex(nextIndex);
      animatingRef.current = false;
      setAnimating(false);
      history.replaceState(null, "", `#${toId}`);

      if (toId === "hero") {
        swordReadyRef.current = false;
        swordDrawingRef.current = false;
        pendingIndexRef.current = null;
        clearSwordTimeout();
        window.dispatchEvent(new CustomEvent("porto:sheathe-sword"));
      }
    });
  }, []);

  // Samurai finished drawing — proceed to the pending scene.
  useEffect(() => {
    const onDrawn = () => {
      clearSwordTimeout();
      swordReadyRef.current = true;
      swordDrawingRef.current = false;
      animatingRef.current = false;
      setAnimating(false);
      const pending = pendingIndexRef.current;
      pendingIndexRef.current = null;
      if (pending != null) goTo(pending);
    };
    window.addEventListener("porto:sword-drawn", onDrawn);
    return () => {
      window.removeEventListener("porto:sword-drawn", onDrawn);
      clearSwordTimeout();
    };
  }, [goTo]);

  const next = useCallback(() => {
    if (indexRef.current < SCENE_IDS.length - 1) goTo(indexRef.current + 1);
  }, [goTo]);

  const prev = useCallback(() => {
    if (indexRef.current > 0) goTo(indexRef.current - 1);
  }, [goTo]);

  // Init first scene visibility
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const scenes = stage.querySelectorAll<HTMLElement>("[data-scene]");
    scenes.forEach((el, i) => {
      el.style.visibility = i === 0 ? "visible" : "hidden";
      el.style.pointerEvents = i === 0 ? "auto" : "none";
      el.style.zIndex = i === 0 ? "20" : "1";
      el.style.opacity = i === 0 ? "1" : "0";
    });

    // Hero entrance: fade + scale + blur
    const hero = scenes[0];
    if (hero) {
      hero.style.filter = "blur(16px)";
      hero.style.transform = "scale(1.06)";
      hero.style.opacity = "0";
      requestAnimationFrame(() => {
        hero.animate(
          [
            { opacity: 0, filter: "blur(16px)", transform: "scale(1.06)" },
            { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
          ],
          { duration: 1100, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
        );
      });
    }

    // Hash deep-link
    const hash = window.location.hash.replace("#", "") as SceneId;
    if (hash && SCENE_IDS.includes(hash) && hash !== "hero") {
      const i = SCENE_IDS.indexOf(hash);
      // Jump without animation on first paint deep link
      setTimeout(() => goTo(i), 1200);
    }
  }, [goTo]);

  // Wheel / trackpad — accumulate delta for smoother snap
  useEffect(() => {
    let accum = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-scene-scroll]")) {
        const scroller = t.closest("[data-scene-scroll]") as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = scroller;
        const canScroll = scrollHeight > clientHeight + 4;
        if (canScroll) {
          const atTop = scrollTop <= 1;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
            return;
          }
        }
      }

      e.preventDefault();
      if (animatingRef.current) return;
      const now = Date.now();
      if (now - wheelLock.current < SCENE_DURATION * 1000 + 120) return;

      accum += e.deltaY;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accum = 0;
      }, 180);

      if (Math.abs(accum) < 55) return;
      const goingDown = accum > 0;
      accum = 0;
      wheelLock.current = now;
      if (goingDown) next();
      else prev();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [next, prev]);

  // Touch swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? 0;
    };
    const onEnd = (e: TouchEvent) => {
      if (animatingRef.current) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-scene-scroll]")) {
        const scroller = target.closest("[data-scene-scroll]") as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = scroller;
        const canScroll = scrollHeight > clientHeight + 4;
        const dy = touchY.current - (e.changedTouches[0]?.clientY ?? 0);
        if (canScroll) {
          const atTop = scrollTop <= 1;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
          if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) return;
        }
      }
      const y = e.changedTouches[0]?.clientY ?? 0;
      const dy = touchY.current - y;
      if (Math.abs(dy) < 56) return;
      if (dy > 0) next();
      else prev();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (["ArrowDown", "PageDown", " ", "j"].includes(e.key)) {
        e.preventDefault();
        next();
      }
      if (["ArrowUp", "PageUp", "k"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(SCENE_IDS.length - 1);
    };
    const onGoto = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) goTo(id as SceneId);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("porto:goto", onGoto);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("porto:goto", onGoto);
    };
  }, [goTo, next, prev]);

  // Lock body scroll
  useEffect(() => {
    document.documentElement.classList.add("exhibition-mode");
    return () => {
      document.documentElement.classList.remove("exhibition-mode");
    };
  }, []);

  return (
    <Ctx.Provider
      value={{ active, index, goTo, next, prev, animating }}
    >
      <div
        ref={stageRef}
        id="main"
        className="exhibition-stage relative h-dvh w-screen overflow-hidden bg-[#050505]"
        style={{ perspective: "1400px" }}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function Scene({
  id,
  children,
  className = "",
}: {
  id: SceneId;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-scene={id}
      className={`absolute inset-0 h-dvh w-screen overflow-hidden will-change-transform ${className}`}
      style={{
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      aria-hidden={false}
    >
      {children}
    </section>
  );
}

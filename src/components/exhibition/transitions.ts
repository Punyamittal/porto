"use client";

import gsap from "gsap";
import { SCENE_DURATION, type SceneId } from "@/lib/scenes";

type Dir = 1 | -1;

const CLEAR =
  "x,y,xPercent,yPercent,scale,scaleY,rotate,rotateY,skewX,skewY,opacity,filter,clipPath,borderRadius,z,transform,transformOrigin";

function resetIdentity(el: HTMLElement) {
  // Clear leftover GSAP inline transforms first, then force a clean visible state
  gsap.set(el, { clearProps: CLEAR });
  gsap.set(el, {
    visibility: "visible",
    pointerEvents: "auto",
    opacity: 1,
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    scale: 1,
    scaleY: 1,
    rotate: 0,
    rotateY: 0,
    skewX: 0,
    skewY: 0,
    filter: "none",
    clipPath: "none",
    borderRadius: "0%",
    z: 0,
  });
}

/**
 * Cinematic transition. Forward uses `toId` enter.
 * Reverse undoes `fromId` enter so scrolling up always restores the previous scene.
 */
export function runSceneTransition(
  outgoing: HTMLElement,
  incoming: HTMLElement,
  toId: SceneId,
  fromId: SceneId,
  direction: Dir,
): gsap.core.Timeline {
  const d = SCENE_DURATION;
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  const forward = direction > 0;
  const key = forward ? toId : fromId;

  gsap.set(incoming, {
    visibility: "visible",
    pointerEvents: "auto",
    zIndex: 20,
  });
  gsap.set(outgoing, { zIndex: 10, pointerEvents: "none" });

  switch (key) {
    case "about": {
      // Soft vertical scroll — matches wheel direction
      if (forward) {
        gsap.set(incoming, { yPercent: 100, opacity: 1 });
        tl.to(
          outgoing,
          {
            yPercent: -22,
            opacity: 0,
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
        tl.to(
          incoming,
          {
            yPercent: 0,
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
      } else {
        gsap.set(outgoing, { yPercent: 0, opacity: 1 });
        gsap.set(incoming, { yPercent: -22, opacity: 0 });
        tl.to(
          outgoing,
          {
            yPercent: 100,
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
        tl.to(
          incoming,
          {
            yPercent: 0,
            opacity: 1,
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
      }
      break;
    }

    case "projects": {
      if (forward) {
        gsap.set(incoming, { xPercent: 100, opacity: 1, rotateY: 6 });
        tl.to(
          outgoing,
          {
            xPercent: -10,
            rotate: -3,
            opacity: 0.25,
            scale: 0.95,
            duration: d,
          },
          0,
        );
        tl.to(incoming, { xPercent: 0, rotateY: 0, duration: d }, 0);
      } else {
        gsap.set(outgoing, { xPercent: 0, opacity: 1, rotateY: 0 });
        gsap.set(incoming, {
          xPercent: -10,
          opacity: 0.25,
          rotate: -3,
          scale: 0.95,
        });
        tl.to(outgoing, { xPercent: 100, rotateY: 6, duration: d }, 0);
        tl.to(
          incoming,
          {
            xPercent: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: d,
          },
          0,
        );
      }
      break;
    }

    case "experience": {
      if (forward) {
        gsap.set(incoming, { yPercent: -100, opacity: 1 });
        tl.to(
          outgoing,
          { yPercent: 6, opacity: 0.2, scale: 0.96, duration: d, ease: "power2.inOut" },
          0,
        );
        tl.to(
          incoming,
          { yPercent: 0, duration: d, ease: "power2.inOut" },
          0,
        );
      } else {
        gsap.set(outgoing, { yPercent: 0, opacity: 1 });
        gsap.set(incoming, { yPercent: 6, opacity: 0.2, scale: 0.96 });
        tl.to(
          outgoing,
          { yPercent: -100, duration: d, ease: "power2.inOut" },
          0,
        );
        tl.to(
          incoming,
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
      }
      break;
    }

    case "research": {
      // Lab scan — horizontal wipe from left
      if (forward) {
        gsap.set(incoming, {
          clipPath: "inset(0 100% 0 0)",
          opacity: 1,
          xPercent: -6,
        });
        tl.to(
          outgoing,
          {
            xPercent: 12,
            opacity: 0.15,
            filter: "saturate(0.2) blur(2px)",
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
        tl.to(
          incoming,
          {
            clipPath: "inset(0 0% 0 0)",
            xPercent: 0,
            duration: d,
            ease: "power3.inOut",
          },
          0,
        );
      } else {
        gsap.set(outgoing, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          xPercent: 0,
        });
        gsap.set(incoming, {
          xPercent: 12,
          opacity: 0.15,
          filter: "saturate(0.2) blur(2px)",
        });
        tl.to(
          outgoing,
          {
            clipPath: "inset(0 100% 0 0)",
            xPercent: -6,
            duration: d,
            ease: "power3.inOut",
          },
          0,
        );
        tl.to(
          incoming,
          {
            xPercent: 0,
            opacity: 1,
            filter: "saturate(1) blur(0px)",
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
      }
      break;
    }

    case "leadership": {
      if (forward) {
        gsap.set(incoming, { xPercent: -100, opacity: 1 });
        tl.to(
          outgoing,
          { xPercent: 25, opacity: 0.25, filter: "blur(3px)", duration: d },
          0,
        );
        tl.to(incoming, { xPercent: 0, duration: d }, 0);
      } else {
        gsap.set(outgoing, { xPercent: 0, opacity: 1 });
        gsap.set(incoming, {
          xPercent: 25,
          opacity: 0.25,
          filter: "blur(3px)",
        });
        tl.to(outgoing, { xPercent: -100, duration: d }, 0);
        tl.to(
          incoming,
          {
            xPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: d,
          },
          0,
        );
      }
      break;
    }

    case "contact": {
      // Terminal boot — rises from bottom with a hard skew snap
      if (forward) {
        gsap.set(incoming, {
          yPercent: 110,
          opacity: 1,
          skewY: 4,
          transformOrigin: "50% 100%",
        });
        tl.to(
          outgoing,
          {
            yPercent: -18,
            opacity: 0,
            scale: 0.92,
            filter: "blur(6px)",
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
        tl.to(
          incoming,
          {
            yPercent: 0,
            skewY: 0,
            duration: d,
            ease: "power2.out",
          },
          0,
        );
      } else {
        gsap.set(outgoing, {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          transformOrigin: "50% 100%",
        });
        gsap.set(incoming, {
          yPercent: -18,
          opacity: 0,
          scale: 0.92,
          filter: "blur(6px)",
        });
        tl.to(
          outgoing,
          {
            yPercent: 110,
            skewY: 4,
            duration: d,
            ease: "power2.inOut",
          },
          0,
        );
        tl.to(
          incoming,
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: d,
            ease: "power2.out",
          },
          0,
        );
      }
      break;
    }

    case "hero":
    default: {
      if (forward) {
        gsap.set(incoming, {
          opacity: 0,
          yPercent: 12,
        });
        tl.to(
          outgoing,
          { opacity: 0, yPercent: -10, duration: d, ease: "power2.inOut" },
          0,
        );
        tl.to(
          incoming,
          { opacity: 1, yPercent: 0, duration: d, ease: "power2.inOut" },
          0,
        );
      } else {
        gsap.set(outgoing, { opacity: 1, yPercent: 0 });
        gsap.set(incoming, {
          opacity: 0,
          yPercent: -10,
        });
        tl.to(
          outgoing,
          { opacity: 0, yPercent: 12, duration: d, ease: "power2.inOut" },
          0,
        );
        tl.to(
          incoming,
          { opacity: 1, yPercent: 0, duration: d, ease: "power2.inOut" },
          0,
        );
      }
    }
  }

  tl.eventCallback("onComplete", () => {
    gsap.set(outgoing, {
      visibility: "hidden",
      pointerEvents: "none",
      opacity: 0,
      zIndex: 1,
    });
    resetIdentity(incoming);
    gsap.set(incoming, { zIndex: 20, visibility: "visible", opacity: 1 });
  });

  return tl;
}

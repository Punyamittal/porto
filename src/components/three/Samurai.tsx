"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useAnimations, useGLTF, useProgress } from "@react-three/drei";
import { LoopOnce, type AnimationAction, type Group, type Object3D } from "three";

/**
 * Model space height is ~190 units. Fixed scale avoids broken
 * SkinnedMesh bind-pose bounds (which stretch to ~1900 and hide the character).
 */
const MODEL_SCALE = 0.0128;
const MODEL_URL = "/samurai.glb";
/** Local Draco (not Google CDN) — more reliable on deployed hosts. */
const DRACO_PATH = "/draco/";
/** Clip is 8s — speed up so scroll doesn't wait forever. */
const DRAW_TIME_SCALE = 2.8;

useGLTF.setDecoderPath(DRACO_PATH);

function hideFloor(root: Object3D) {
  root.traverse((obj) => {
    if (!obj.name.toLowerCase().includes("floor")) return;
    obj.visible = false;
  });
}

function holdSheathed(action: AnimationAction) {
  action.reset();
  action.setLoop(LoopOnce, 1);
  action.clampWhenFinished = true;
  action.timeScale = DRAW_TIME_SCALE;
  action.time = 0;
  action.play();
  action.paused = true;
}

function signalDrawn() {
  window.dispatchEvent(new CustomEvent("porto:sword-drawn"));
}

function SamuraiModel() {
  const { scene, animations } = useGLTF(MODEL_URL, DRACO_PATH);
  const group = useRef<Group>(null);
  const look = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const drawingRef = useRef(false);
  const pendingDrawRef = useRef(false);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    hideFloor(scene);
  }, [scene]);

  const { actions, names, mixer } = useAnimations(animations, group);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!look.current) return;
    const tx = mouse.current.x * 0.35;
    const ty = mouse.current.y * 0.18;
    look.current.rotation.y += (tx - look.current.rotation.y) * 0.06;
    look.current.rotation.x += (ty - look.current.rotation.x) * 0.06;
    look.current.position.x += (mouse.current.x * 0.12 - look.current.position.x) * 0.06;
    look.current.position.y += (mouse.current.y * 0.06 - look.current.position.y) * 0.06;
  });

  // Idle: sheathed pose (frame 0), waiting for scroll.
  useEffect(() => {
    if (!names.length) return;
    names.forEach((name) => {
      const action = actions[name];
      if (action) holdSheathed(action);
    });
  }, [actions, names]);

  useEffect(() => {
    const clearFinishTimer = () => {
      if (finishTimerRef.current) {
        clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
      }
    };

    const playDraw = () => {
      if (drawingRef.current) return;

      if (!names.length) {
        // Model/animations not ready yet — queue until they are.
        pendingDrawRef.current = true;
        return;
      }

      const primary = actions[names[0]];
      if (!primary) {
        signalDrawn();
        return;
      }

      drawingRef.current = true;
      pendingDrawRef.current = false;

      const finish = () => {
        clearFinishTimer();
        mixer.removeEventListener("finished", onFinished);
        drawingRef.current = false;
        signalDrawn();
      };

      const onFinished = (e: { action: AnimationAction }) => {
        if (e.action !== primary) return;
        finish();
      };

      mixer.addEventListener("finished", onFinished);
      // Backup if the mixer 'finished' event is missed in production.
      const durationMs = (primary.getClip().duration / DRAW_TIME_SCALE) * 1000 + 200;
      finishTimerRef.current = setTimeout(finish, durationMs);

      primary.reset();
      primary.setLoop(LoopOnce, 1);
      primary.clampWhenFinished = true;
      primary.timeScale = DRAW_TIME_SCALE;
      primary.paused = false;
      primary.fadeIn(0.05).play();
    };

    const sheathe = () => {
      clearFinishTimer();
      drawingRef.current = false;
      pendingDrawRef.current = false;
      names.forEach((name) => {
        const action = actions[name];
        if (action) holdSheathed(action);
      });
    };

    window.addEventListener("porto:draw-sword", playDraw);
    window.addEventListener("porto:sheathe-sword", sheathe);

    return () => {
      clearFinishTimer();
      window.removeEventListener("porto:draw-sword", playDraw);
      window.removeEventListener("porto:sheathe-sword", sheathe);
    };
  }, [actions, names, mixer]);

  // Flush queued draw once animations exist.
  useEffect(() => {
    if (!pendingDrawRef.current || !names.length) return;
    pendingDrawRef.current = false;
    window.dispatchEvent(new CustomEvent("porto:draw-sword"));
  }, [names]);

  return (
    <group ref={look}>
      <group ref={group} position={[0, -1.15, 0]} scale={MODEL_SCALE}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

function Loader() {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <Html center>
      <p className="font-mono whitespace-nowrap text-[9px] tracking-[0.3em] text-white/40 uppercase">
        {Math.round(progress)}%
      </p>
    </Html>
  );
}

export function Samurai() {
  return (
    <div className="relative mx-auto h-80 w-80 overflow-visible bg-transparent sm:h-96 sm:w-96">
      <Canvas
        className="h-full w-full border-0 outline-none"
        style={{ background: "transparent" }}
        camera={{ position: [0, 0.55, 4.8], fov: 35, near: 0.1, far: 2000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[4, 6, 3]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-3, 2, -2]} intensity={0.7} color="#ff6b6b" />
        <hemisphereLight args={["#ffffff", "#1a0505", 0.55]} />
        <Suspense fallback={<Loader />}>
          <SamuraiModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL, DRACO_PATH);

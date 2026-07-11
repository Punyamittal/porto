"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useAnimations, useGLTF } from "@react-three/drei";
import { LoopRepeat, type Group } from "three";

function EyeModel() {
  const look = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { scene, animations } = useGLTF("/cyber_eye.glb");
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    if (!names.length) return;

    const playing = names.map((name) => {
      const action = actions[name];
      if (!action) return null;
      action.reset().setLoop(LoopRepeat, Infinity).fadeIn(0.25).play();
      return action;
    });

    return () => {
      playing.forEach((action) => action?.fadeOut(0.15).stop());
    };
  }, [actions, names]);

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
    const tx = mouse.current.x * 0.55;
    const ty = mouse.current.y * 0.4;
    look.current.rotation.y += (tx - look.current.rotation.y) * 0.08;
    look.current.rotation.x += (ty - look.current.rotation.x) * 0.08;
  });

  return (
    <group ref={look}>
      <Center>
        <primitive object={scene} scale={0.85} />
      </Center>
    </group>
  );
}

export function CyberEye() {
  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0.1, 2.6], fov: 35 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-3, -1, -2]} intensity={0.55} color="#39ff14" />
        <pointLight position={[0, 0, 2]} intensity={0.8} color="#ff2d95" />
        <Suspense fallback={null}>
          <EyeModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/cyber_eye.glb");

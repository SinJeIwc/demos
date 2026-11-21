"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * 3D-тундук: обод, по три перекрещенных дуги-купола (как на флаге)
 * и 40 лучей вокруг. Вращается сам и раскрывается вместе со скроллом.
 */
const R = 1.6;

function Tunduk({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const offsets = [-0.55, 0, 0.55];
    const make = (o: number, vertical: boolean) => {
      const half = Math.sqrt(R * R - o * o);
      const a = vertical ? new THREE.Vector3(o, -half, 0) : new THREE.Vector3(-half, o, 0);
      const b = vertical ? new THREE.Vector3(o, half, 0) : new THREE.Vector3(half, o, 0);
      const mid = vertical ? new THREE.Vector3(o, 0, 0.6) : new THREE.Vector3(0, o, 0.6);
      return new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a, mid, b), 64, 0.05, 12, false);
    };
    return [...offsets.map((o) => make(o, false)), ...offsets.map((o) => make(o, true))];
  }, []);

  const rays = useMemo(() => Array.from({ length: 40 }, (_, i) => (i / 40) * Math.PI * 2), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.get();
    g.rotation.z += delta * 0.12;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.55 + p * 0.55 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06, 0.08);
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.18;
    const s = THREE.MathUtils.lerp(g.scale.x, 1 + p * 1.8, 0.1);
    g.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[R, 0.1, 32, 180]} />
        <meshStandardMaterial color="#d9a05b" metalness={0.45} roughness={0.32} />
      </mesh>
      {arcs.map((geometry, i) => (
        <mesh key={i} geometry={geometry}>
          <meshStandardMaterial color="#e9bd83" metalness={0.4} roughness={0.36} />
        </mesh>
      ))}
      {rays.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * (R + 0.5), Math.sin(a) * (R + 0.5), 0]} rotation={[0, 0, a]}>
          <boxGeometry args={[0.62, 0.028, 0.028]} />
          <meshStandardMaterial color="#f0a35e" emissive="#f0a35e" emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default function TundukCanvas({ progress, active }: { progress: MotionValue<number>; active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <hemisphereLight args={["#f2f6f5", "#0d2830", 1.1]} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} />
      <pointLight position={[-4, -2, 3]} intensity={25} color="#2fa4a9" />
      <Tunduk progress={progress} />
    </Canvas>
  );
}

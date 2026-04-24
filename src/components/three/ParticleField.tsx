"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function generateParticles(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);
  }
  return pos;
}

function Particles({ count = 100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => generateParticles(count), [count]);
  const altPositions = useMemo(
    () => new Float32Array(positions.map((p, i) => (i % 3 === 1 ? -p : p))),
    [positions]
  );

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#E8330A"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points
        positions={altPositions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      role="img"
      aria-label="Decorative 3D particle background"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#E8330A" intensity={0.5} />
      <Suspense fallback={null}>
        <Particles count={80} />
      </Suspense>
    </Canvas>
  );
}

export function ParticleField() {
  const { isMobile, prefersReducedMotion } = useMediaQuery();

  if (isMobile || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 opacity-50 pointer-events-none">
      <Scene />
    </div>
  );
}

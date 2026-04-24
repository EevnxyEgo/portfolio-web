"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Torus, Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[2, 0]} scale={2.5}>
        <meshBasicMaterial
          color="#E8330A"
          wireframe
          transparent
          opacity={0.8}
        />
      </Icosahedron>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <Torus ref={meshRef} args={[1.5, 0.3, 16, 32]} scale={2}>
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.6}
        />
      </Torus>
    </Float>
  );
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#E8330A" intensity={1} />
      <pointLight position={[-5, -5, 5]} color="#00D4FF" intensity={0.5} />
      <Suspense fallback={null}>
        <FloatingIcosahedron />
        <FloatingTorus />
      </Suspense>
    </Canvas>
  );
}

export function FloatingGeometry() {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldRender(!isMobile && !prefersReduced);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {mounted && shouldRender && <Scene />}
    </div>
  );
}
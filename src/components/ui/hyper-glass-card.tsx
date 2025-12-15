"use client";

import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Html, Environment } from "@react-three/drei";
import { useDynamicTheme } from "@/components/dynamic-theme-provider";
import * as THREE from "three";

interface HyperGlassCardProps {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  /** Enable enhanced chromatic dispersion (Luminous spec) */
  chromaticDispersion?: boolean;
  /** Enable iridescent coating (oil-slick effect) */
  iridescence?: boolean;
}

function GlassPlane({ 
  children, 
  width = 4, 
  height = 3,
  chromaticDispersion = true,
  iridescence = true,
}: { 
  children?: React.ReactNode; 
  width?: number; 
  height?: number;
  chromaticDispersion?: boolean;
  iridescence?: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { sourceColor } = useDynamicTheme();
  const [hovered, setHovered] = useState(false);

  // Breathing animation state (Luminous "Heartbeat" - opacity pulse every 4s)
  const breatheRef = useRef(0);

  useFrame((state) => {
    if (mesh.current) {
      // Subtle floating animation + heartbeat breathing
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      const heartbeat = Math.sin(state.clock.elapsedTime * (Math.PI / 2)) * 0.02; // 4s cycle
      mesh.current.position.y = breathe + heartbeat;
      breatheRef.current = 0.9 + Math.sin(state.clock.elapsedTime * (Math.PI / 2)) * 0.1;
      
      // Mouse tilt - max 5 degrees per spec
      const maxTilt = hovered ? 0.087 : 0.052; // ~5deg or ~3deg in radians
      const mouseX = state.mouse.x * maxTilt;
      const mouseY = state.mouse.y * maxTilt;
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -mouseY, 0.05);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouseX, 0.05);
    }
  });

  return (
    <mesh 
      ref={mesh}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[width, height, 0.12]} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.3}
        samples={6}
        resolution={512}
        /* Glass thickness - affects refraction depth */
        thickness={0.2}
        /* Surface properties */
        roughness={0.08}
        clearcoat={iridescence ? 1 : 0}
        clearcoatRoughness={0.1}
        /* Index of Refraction - glass is ~1.5 */
        ior={1.5}
        /* Chromatic Aberration - RGB split per Luminous spec */
        chromaticAberration={chromaticDispersion ? (hovered ? 0.5 : 0.25) : 0}
        /* Anisotropic reflections - simulates brushed glass */
        anisotropy={0.3}
        anisotropicBlur={0.2}
        /* Distortion - ripple effect */
        distortion={hovered ? 0.15 : 0.08}
        distortionScale={0.3}
        temporalDistortion={0.1}
        /* Color tint */
        color={sourceColor}
        /* Transmission - how much light passes through */
        transmission={1}
        /* Environment map intensity for reflections */
        envMapIntensity={iridescence ? 1.5 : 0.8}
        /* Attenuation - light absorption in glass */
        attenuationDistance={0.5}
        attenuationColor={new THREE.Color(sourceColor)}
      />
      <Html
        transform
        occlude="blending"
        position={[0, 0, 0.07]}
        style={{
          width: `${width * 100}px`,
          height: `${height * 100}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div className="p-6 text-center w-full h-full flex flex-col justify-center">
          {children}
        </div>
      </Html>
    </mesh>
  );
}

export function HyperGlassCard({ 
  children, 
  className, 
  width = 4, 
  height = 3,
  chromaticDispersion = true,
  iridescence = true,
}: HyperGlassCardProps) {
  return (
    <div className={className} style={{ height: "400px", width: "100%" }}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          {/* Environment map for realistic reflections */}
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff99cc" />
          <GlassPlane 
            width={width} 
            height={height}
            chromaticDispersion={chromaticDispersion}
            iridescence={iridescence}
          >
            {children}
          </GlassPlane>
        </Suspense>
      </Canvas>
    </div>
  );
}

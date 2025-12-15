"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Html } from "@react-three/drei";
import { useDynamicTheme } from "@/components/dynamic-theme-provider";
import * as THREE from "three";

interface HyperGlassCardProps {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
}

function GlassPlane({ children, width = 4, height = 3 }: { children?: React.ReactNode; width?: number; height?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const { sourceColor } = useDynamicTheme();

  useFrame((state) => {
    if (mesh.current) {
      // Subtle floating animation
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Mouse tilt - reduced lerp frequency
      const mouseX = state.mouse.x * 0.15;
      const mouseY = state.mouse.y * 0.15;
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -mouseY, 0.05);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouseX, 0.05);
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[width, height, 0.15]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        resolution={256}
        thickness={0.15}
        roughness={0.3}
        ior={1.4}
        chromaticAberration={0.2}
        anisotropy={0.2}
        distortion={0.1}
        distortionScale={0.2}
        temporalDistortion={0.05}
        color={sourceColor}
        background={new THREE.Color("#000000")}
      />
      <Html
        transform
        occlude="blending"
        position={[0, 0, 0.08]}
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

export function HyperGlassCard({ children, className, width = 4, height = 3 }: HyperGlassCardProps) {
  return (
    <div className={className} style={{ height: "400px", width: "100%" }}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <GlassPlane width={width} height={height}>{children}</GlassPlane>
        </Suspense>
      </Canvas>
    </div>
  );
}

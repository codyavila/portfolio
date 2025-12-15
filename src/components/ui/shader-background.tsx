"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { useMouseStore } from "@/lib/mouse-store";
import { useTheme } from "next-themes";

// Simplified shader for better performance
const GradientShaderMaterial = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    // Optimized noise function
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    void main() {
      vec2 uv = vUv;
      
      // Simple mouse ripple
      float dist = distance(uv, uMouse * 0.5 + 0.5);
      float ripple = sin((dist - uTime * 0.5) * 8.0) * exp(-dist * 3.0) * 0.015;
      uv += ripple;
      
      // Flowing gradient
      float n1 = noise(uv * 2.0 + uTime * 0.03);
      float n2 = noise(uv * 1.5 - uTime * 0.02);
      float mixFactor = smoothstep(-0.3, 0.3, n1 + n2 * 0.4 - 0.5);
      
      vec3 color = mix(uColorStart, uColorEnd, mixFactor);
      
      // Subtle grain (cheap)
      float grain = hash(uv + uTime * 0.01) * 0.03;
      color += grain - 0.015;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function GradientMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const normalizedX = useMouseStore((state) => state.normalizedX);
  const normalizedY = useMouseStore((state) => state.normalizedY);
  const mouse = useRef(new THREE.Vector2(0, 0));
  
  // Use Luminous void colors - subtle purple tints, not dynamic theme colors
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorStart: { value: new THREE.Color("#08040C") }, // lum-void-deep
      uColorEnd: { value: new THREE.Color("#120E1A") },   // lum-void-surface (subtle purple)
    }),
    []
  );

  // Animate shader at reduced frequency
  useFrame((state, delta) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += delta * 0.5; // Slower time progression
      
      // Smooth mouse interpolation
      mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, normalizedX, 0.03);
      mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, normalizedY, 0.03);
      material.uniforms.uMouse.value.copy(mouse.current);
    }
  });

  return (
    <mesh ref={mesh} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        fragmentShader={GradientShaderMaterial.fragmentShader}
        vertexShader={GradientShaderMaterial.vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  const { resolvedTheme } = useTheme();
  
  // Only render shader background in dark mode
  if (resolvedTheme !== "dark") {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        dpr={1}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: false,
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <GradientMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}

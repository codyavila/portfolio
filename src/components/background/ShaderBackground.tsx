"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { vertexShader } from "@/shaders/background/vertex";
import { fragmentShader } from "@/shaders/background/fragment";

const WaveMesh = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const { theme, resolvedTheme } = useTheme();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color("#050508") },
      uColorSurface: { value: new THREE.Color("#1A1424") },
    }),
    []
  );

  // Update colors based on theme
  useEffect(() => {
    const isDark = theme === "dark" || resolvedTheme === "dark";
    
    if (isDark) {
      // Dark Mode: Deep Violet/Black
      uniforms.uColorDeep.value.set("#050508");
      uniforms.uColorSurface.value.set("#1A1424");
    } else {
      // Light Mode: White/Subtle Cool Gray
      uniforms.uColorDeep.value.set("#ffffff");
      uniforms.uColorSurface.value.set("#e0f2fe"); // Light sky blue tint
    }
  }, [theme, resolvedTheme, uniforms]);

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        transparent={true}
      />
    </mesh>
  );
};

export default function ShaderBackground() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    // Check for battery status API
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const checkPower = () => {
          setLowPower(battery.level < 0.2 && !battery.charging);
        };
        checkPower();
        battery.addEventListener('levelchange', checkPower);
        battery.addEventListener('chargingchange', checkPower);
      });
    }
  }, []);

  if (lowPower) return null;

  return (
    <div 
      className="fixed -z-10 pointer-events-none"
      style={{
        // Use -10vh on all sides to extend well beyond any browser chrome
        top: '-10vh',
        left: '-10vw',
        right: '-10vw',
        bottom: '-10vh',
        // Make it 120% of viewport to cover any gaps
        width: '120vw',
        height: '120vh',
      }}
    >
      <Canvas 
        camera={{ position: [0, 5, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <WaveMesh />
      </Canvas>
    </div>
  );
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useDynamicTheme } from "@/components/dynamic-theme-provider";

const GradientShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorStart: { value: new THREE.Color("#000000") },
    uColorEnd: { value: new THREE.Color("#000000") },
  },
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

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Mouse interaction: distort UVs slightly based on mouse position
      vec2 mouseDistort = uMouse * 0.1;
      
      // Slow moving noise
      float noiseValue = snoise(uv * 2.5 + uTime * 0.05 + mouseDistort);
      
      // Create organic flow
      float flow = snoise(uv * 1.2 - uTime * 0.02);
      
      // Mix colors based on noise
      float mixFactor = smoothstep(-0.6, 0.6, noiseValue + flow * 0.4);
      
      vec3 finalColor = mix(uColorStart, uColorEnd, mixFactor);
      
      // Add subtle grain
      float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
      finalColor += grain * 0.03;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

function GradientMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const { sourceColor } = useDynamicTheme();
  const mouse = useRef(new THREE.Vector2(0, 0));
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorStart: { value: new THREE.Color("#050505") }, // Void
      uColorEnd: { value: new THREE.Color(sourceColor) }, // Dynamic Theme Color
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update colors when theme changes
  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smoothly interpolate mouse position
      material.uniforms.uMouse.value.lerp(mouse.current, 0.05);
      
      material.uniforms.uColorEnd.value.lerp(new THREE.Color(sourceColor), 0.05);
    }
  });

  return (
    <mesh ref={mesh} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={GradientShaderMaterial.fragmentShader}
        vertexShader={GradientShaderMaterial.vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <GradientMesh />
      </Canvas>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * ShaderGradient — Interactive UV gradient demonstration
 */
export function ShaderGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hue, setHue] = useState(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = () => {
      timeRef.current += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const u = x / width;
          const v = y / height;

          // Animated gradient based on UV and time
          const r = Math.sin(timeRef.current + u * 6.28 + hue) * 0.5 + 0.5;
          const g = Math.cos(timeRef.current + v * 6.28) * 0.5 + 0.5;
          const b = Math.sin(timeRef.current * 0.5 + (u + v) * 3.14) * 0.5 + 0.5;

          const index = (y * width + x) * 4;
          data[index] = r * 255;
          data[index + 1] = g * 255;
          data[index + 2] = b * 255;
          data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [hue]);

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <canvas
          ref={canvasRef}
          width={200}
          height={150}
          className="w-full h-[150px]"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Hue Shift</span>
          <span className="font-mono text-zinc-900 dark:text-white">{hue.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="6.28"
          step="0.1"
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
      </div>
      <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
        This gradient is generated mathematically — no image files!
      </p>
    </div>
  );
}

/**
 * NoiseDemo — Shows the difference between random and noise
 */
export function NoiseDemo() {
  const randomCanvasRef = useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(0);

  // Simple 2D noise implementation
  const noise2D = useCallback((x: number, y: number, seed: number) => {
    const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
    return n - Math.floor(n);
  }, []);

  const smoothNoise = useCallback((x: number, y: number, seed: number) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;

    const sx = x - x0;
    const sy = y - y0;

    const n00 = noise2D(x0, y0, seed);
    const n10 = noise2D(x1, y0, seed);
    const n01 = noise2D(x0, y1, seed);
    const n11 = noise2D(x1, y1, seed);

    const nx0 = n00 * (1 - sx) + n10 * sx;
    const nx1 = n01 * (1 - sx) + n11 * sx;

    return nx0 * (1 - sy) + nx1 * sy;
  }, [noise2D]);

  useEffect(() => {
    // Random canvas
    const randomCanvas = randomCanvasRef.current;
    if (randomCanvas) {
      const ctx = randomCanvas.getContext("2d");
      if (ctx) {
        const imageData = ctx.createImageData(randomCanvas.width, randomCanvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const value = Math.random() * 255;
          imageData.data[i] = value;
          imageData.data[i + 1] = value;
          imageData.data[i + 2] = value;
          imageData.data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }

    // Noise canvas
    const noiseCanvas = noiseCanvasRef.current;
    if (noiseCanvas) {
      const ctx = noiseCanvas.getContext("2d");
      if (ctx) {
        const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
        const scale = 0.05;
        for (let y = 0; y < noiseCanvas.height; y++) {
          for (let x = 0; x < noiseCanvas.width; x++) {
            const value = smoothNoise(x * scale, y * scale, seed) * 255;
            const index = (y * noiseCanvas.width + x) * 4;
            imageData.data[index] = value;
            imageData.data[index + 1] = value;
            imageData.data[index + 2] = value;
            imageData.data[index + 3] = 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [seed, smoothNoise]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="rounded-xl overflow-hidden border border-white/10">
            <canvas
              ref={randomCanvasRef}
              width={120}
              height={120}
              className="w-full aspect-square"
            />
          </div>
          <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
            Math.random()
          </p>
        </div>
        <div className="space-y-2">
          <div className="rounded-xl overflow-hidden border border-white/10">
            <canvas
              ref={noiseCanvasRef}
              width={120}
              height={120}
              className="w-full aspect-square"
            />
          </div>
          <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
            Smooth Noise
          </p>
        </div>
      </div>
      <button
        onClick={() => setSeed(Math.random() * 1000)}
        className={cn(
          "w-full py-2 px-4 rounded-lg font-medium text-sm",
          "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white",
          "hover:bg-zinc-200 dark:hover:bg-white/15 transition-colors"
        )}
      >
        Regenerate
      </button>
    </div>
  );
}

/**
 * ColorMixDemo — Shows how shaders blend colors
 */
export function ColorMixDemo() {
  const [mix, setMix] = useState(0.5);
  const color1 = { r: 0.05, g: 0, b: 0.1 }; // Dark purple
  const color2 = { r: 0, g: 1, b: 0.6 }; // Cyan

  const blended = {
    r: color1.r * (1 - mix) + color2.r * mix,
    g: color1.g * (1 - mix) + color2.g * mix,
    b: color1.b * (1 - mix) + color2.b * mix,
  };

  const toHex = (c: { r: number; g: number; b: number }) =>
    `rgb(${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)})`;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div
          className="w-16 h-16 rounded-lg border border-white/10"
          style={{ backgroundColor: toHex(color1) }}
        />
        <div className="flex-1 h-16 rounded-lg border border-white/10 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${toHex(color1)}, ${toHex(color2)})`,
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
            style={{ left: `${mix * 100}%` }}
          />
        </div>
        <div
          className="w-16 h-16 rounded-lg border border-white/10"
          style={{ backgroundColor: toHex(color2) }}
        />
      </div>

      <div
        className="h-12 rounded-lg border border-white/10"
        style={{ backgroundColor: toHex(blended) }}
      />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">mix()</span>
          <span className="font-mono text-zinc-900 dark:text-white">{mix.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={mix}
          onChange={(e) => setMix(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
      </div>

      <pre className="text-xs bg-zinc-900 text-emerald-400 p-3 rounded-lg overflow-x-auto">
        {`mix(purple, cyan, ${mix.toFixed(2)})`}
      </pre>
    </div>
  );
}

/**
 * FBMDemo — Fractal Brownian Motion visualization
 */
export function FBMDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [octaves, setOctaves] = useState(4);
  const timeRef = useRef(0);

  const noise2D = useCallback((x: number, y: number) => {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1;
  }, []);

  const smoothNoise = useCallback((x: number, y: number) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const sx = x - x0;
    const sy = y - y0;
    
    // Smoothstep
    const u = sx * sx * (3 - 2 * sx);
    const v = sy * sy * (3 - 2 * sy);

    const n00 = noise2D(x0, y0);
    const n10 = noise2D(x0 + 1, y0);
    const n01 = noise2D(x0, y0 + 1);
    const n11 = noise2D(x0 + 1, y0 + 1);

    return n00 * (1 - u) * (1 - v) + n10 * u * (1 - v) + n01 * (1 - u) * v + n11 * u * v;
  }, [noise2D]);

  const fbm = useCallback((x: number, y: number, octaves: number) => {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;

    for (let i = 0; i < octaves; i++) {
      value += amplitude * smoothNoise(x * frequency, y * frequency);
      frequency *= 2;
      amplitude *= 0.5;
    }

    return value * 0.5 + 0.5;
  }, [smoothNoise]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = () => {
      timeRef.current += 0.01;
      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx.createImageData(width, height);
      const scale = 0.02;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const n = fbm(x * scale + timeRef.current, y * scale, octaves);
          
          // Color mapping similar to the portfolio
          const r = n * 0.1 + 0.05;
          const g = n * 0.8;
          const b = n * 0.5 + 0.3;

          const index = (y * width + x) * 4;
          imageData.data[index] = r * 255;
          imageData.data[index + 1] = g * 255;
          imageData.data[index + 2] = b * 255;
          imageData.data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [octaves, fbm]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden border border-white/10">
        <canvas
          ref={canvasRef}
          width={150}
          height={100}
          className="w-full h-[150px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Octaves (detail layers)</span>
          <span className="font-mono text-zinc-900 dark:text-white">{octaves}</span>
        </div>
        <input
          type="range"
          min="1"
          max="8"
          value={octaves}
          onChange={(e) => setOctaves(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
      </div>

      <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
        More octaves = more fine detail
      </p>
    </div>
  );
}

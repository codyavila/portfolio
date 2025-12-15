"use client";

import { create } from "zustand";

interface MouseState {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  isMoving: boolean;
  setPosition: (x: number, y: number) => void;
}

// Throttle helper
let lastUpdateTime = 0;
const THROTTLE_MS = 16; // ~60fps

export const useMouseStore = create<MouseState>((set, get) => ({
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
  isMoving: false,
  setPosition: (x: number, y: number) => {
    const now = performance.now();
    
    // Throttle updates to 60fps
    if (now - lastUpdateTime < THROTTLE_MS) return;
    lastUpdateTime = now;
    
    // Normalize position to -1 to 1 range
    const normalizedX = typeof window !== "undefined" 
      ? (x / window.innerWidth) * 2 - 1 
      : 0;
    const normalizedY = typeof window !== "undefined" 
      ? -(y / window.innerHeight) * 2 + 1 
      : 0;

    set({
      x,
      y,
      normalizedX,
      normalizedY,
      isMoving: true,
    });
  },
}));

// Magnetic effect utility
export function useMagneticEffect(
  elementRef: React.RefObject<HTMLElement | null>,
  options: { strength?: number; radius?: number } = {}
) {
  const { strength = 0.3, radius = 100 } = options;
  const { x, y } = useMouseStore();

  if (!elementRef.current) return { magnetX: 0, magnetY: 0, isNear: false };

  const rect = elementRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  const isNear = distance < radius;

  if (!isNear) return { magnetX: 0, magnetY: 0, isNear: false };

  const magnetX = (x - centerX) * strength;
  const magnetY = (y - centerY) * strength;

  return { magnetX, magnetY, isNear };
}

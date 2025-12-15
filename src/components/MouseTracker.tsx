"use client";

import { useEffect, useCallback } from "react";
import { useMouseStore } from "@/lib/mouse-store";

export function MouseTracker() {
  const setPosition = useMouseStore((state) => state.setPosition);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition(e.clientX, e.clientY);
  }, [setPosition]);

  useEffect(() => {
    // Use passive listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return null;
}

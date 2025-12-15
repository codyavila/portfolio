"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMouseStore } from "@/lib/mouse-store";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { useTheme } from "next-themes";

export function DynamicVignette() {
  const [mounted, setMounted] = useState(false);
  const { x, y } = useMouseStore();
  const { phase } = useTimeOfDay();
  const { theme, resolvedTheme } = useTheme();
  
  // Smooth mouse movement for the torch effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Dynamic gradient using motion template (always called - hooks rule)
  const dynamicBackground = useMotionTemplate`radial-gradient(
    circle at ${springX}px ${springY}px,
    transparent 150px,
    rgba(5, 5, 8, 0.6) 100%
  )`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      mouseX.set(x);
      mouseY.set(y);
    }
  }, [x, y, mouseX, mouseY, mounted]);

  // Determine vignette color based on time and theme
  const isDark = theme === "dark" || resolvedTheme === "dark";
  
  // Keep vignetteColor logic for potential future phase-based adjustments
  // Currently using dynamicBackground directly instead
  void phase; // Silence unused warning - reserved for phase-based color adjustments

  // Static background for SSR to prevent hydration mismatch
  const staticBackground = "radial-gradient(circle at 0px 0px, transparent 150px, rgba(5, 5, 8, 0.6) 100%)";

  // Light mode gets reduced opacity
  const baseOpacity = isDark ? 0.7 : 0.3;

  return (
    <motion.div
      className="hidden md:block fixed inset-0 pointer-events-none z-[9990]"
      style={{ 
        background: mounted ? dynamicBackground : staticBackground,
      }}
      animate={{
        opacity: [baseOpacity, baseOpacity * 0.75, baseOpacity],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

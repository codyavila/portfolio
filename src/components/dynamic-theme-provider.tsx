"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { generateTheme, applyThemeToDom } from "@/lib/theme-utils";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { getColorForTime, ColorSchedule } from "@/lib/color-utils";

interface DynamicThemeContextType {
  sourceColor: string;
  setSourceColor: (color: string) => void;
  timeOverride: number | null;
  setTimeOverride: (hour: number | null) => void;
}

// Color Schedules for different variables
const PRIMARY_START_SCHEDULE: ColorSchedule = {
  0: "#4c1d95",  // Midnight: Deep Violet
  5: "#db2777",  // Dawn: Pink
  8: "#4F46E5",  // Morning: Indigo
  12: "#06B6D4", // Noon: Cyan
  17: "#f59e0b", // Sunset: Amber
  20: "#7c3aed", // Dusk: Purple
};

const PRIMARY_END_SCHEDULE: ColorSchedule = {
  0: "#2e1065",  // Midnight: Darker Violet
  5: "#f472b6",  // Dawn: Light Pink
  8: "#06B6D4",  // Morning: Cyan
  12: "#3b82f6", // Noon: Blue
  17: "#ef4444", // Sunset: Red
  20: "#4c1d95", // Dusk: Deep Purple
};

const SECONDARY_START_SCHEDULE: ColorSchedule = {
  0: "#831843",  // Midnight: Deep Pink
  5: "#c084fc",  // Dawn: Lavender
  8: "#7C3AED",  // Morning: Violet
  12: "#d946ef", // Noon: Fuchsia
  17: "#db2777", // Sunset: Pink
  20: "#be123c", // Dusk: Rose
};

const SECONDARY_END_SCHEDULE: ColorSchedule = {
  0: "#500724",  // Midnight: Dark Red
  5: "#818cf8",  // Dawn: Indigo
  8: "#DB2777",  // Morning: Pink
  12: "#8b5cf6", // Noon: Violet
  17: "#f97316", // Sunset: Orange
  20: "#9f1239", // Dusk: Red
};

const DynamicThemeContext = createContext<DynamicThemeContextType | undefined>(undefined);

export function useDynamicTheme() {
  const context = useContext(DynamicThemeContext);
  if (!context) {
    throw new Error("useDynamicTheme must be used within a DynamicThemeProvider");
  }
  return context;
}

export function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const [sourceColor, setSourceColor] = useState("#5E60CE"); // Default Aurora Blue
  const { hour: realHour } = useTimeOfDay();
  const [timeOverride, setTimeOverride] = useState<number | null>(null);

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const generatedTheme = generateTheme(sourceColor, isDark);
    applyThemeToDom(generatedTheme);

    // Determine effective time (continuous)
    // If override is set, use it. If not, use real time.
    // For real time, we could use minutes for smoother transition if we had them, 
    // but hour is fine for now.
    const effectiveTime = timeOverride !== null ? timeOverride : realHour;

    // Interpolate colors
    const primaryStart = getColorForTime(PRIMARY_START_SCHEDULE, effectiveTime);
    const primaryEnd = getColorForTime(PRIMARY_END_SCHEDULE, effectiveTime);
    const secondaryStart = getColorForTime(SECONDARY_START_SCHEDULE, effectiveTime);
    const secondaryEnd = getColorForTime(SECONDARY_END_SCHEDULE, effectiveTime);

    // Apply to CSS variables
    const root = document.documentElement;
    
    // Update Gradients
    root.style.setProperty("--lum-grad-primary", `linear-gradient(135deg, ${primaryStart} 0%, ${primaryEnd} 100%)`);
    root.style.setProperty("--lum-grad-secondary", `linear-gradient(135deg, ${secondaryStart} 0%, ${secondaryEnd} 100%)`);
    
    // Update Neon Rails (Solid colors used for borders/glows)
    root.style.setProperty("--neon-primary-start", primaryStart);
    root.style.setProperty("--neon-primary-end", primaryEnd);
    root.style.setProperty("--neon-secondary-start", secondaryStart);
    root.style.setProperty("--neon-secondary-end", secondaryEnd);

    // Also update accent to be complementary or derived?
    // For now let's keep accent simple or interpolate it too if needed.
    // Let's make accent a mix of primary/secondary for harmony
    // root.style.setProperty("--lum-grad-accent", ...);

  }, [sourceColor, resolvedTheme, theme, realHour, timeOverride]);

  return (
    <DynamicThemeContext.Provider value={{ sourceColor, setSourceColor, timeOverride, setTimeOverride }}>
      {children}
    </DynamicThemeContext.Provider>
  );
}

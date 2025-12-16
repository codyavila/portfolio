"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { generateTheme, applyThemeToDom } from "@/lib/theme-utils";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { getColorForTime, ColorSchedule, getContrastColor } from "@/lib/color-utils";

interface DynamicThemeContextType {
  sourceColor: string;
  setSourceColor: (color: string) => void;
  timeOverride: number | null;
  setTimeOverride: (hour: number | null) => void;
  bgDeep: string;
  bgSurface: string;
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

const BACKGROUND_DEEP_SCHEDULE: ColorSchedule = {
  0: "#0f0529",  // Midnight: Deep Indigo/Violet (More vibrant)
  5: "#2a0a18",  // Dawn: Deep Pink/Purple
  8: "#1e1b4b",  // Morning: Deep Blue Indigo
  12: "#0f172a", // Noon: Slate/Blue Deep
  17: "#3f1010", // Sunset: Deep Red/Amber
  20: "#2e1065", // Dusk: Deep Purple
};

const BACKGROUND_SURFACE_SCHEDULE: ColorSchedule = {
  0: "#1e1b4b",  // Midnight: Lighter Indigo
  5: "#4a1d34",  // Dawn: Lighter Pink/Purple
  8: "#312e81",  // Morning: Lighter Indigo
  12: "#1e293b", // Noon: Lighter Slate
  17: "#5c1c1c", // Sunset: Lighter Red
  20: "#4c1d95", // Dusk: Lighter Purple
};

const LIGHT_BACKGROUND_DEEP_SCHEDULE: ColorSchedule = {
  0: "#e0e7ff",  // Midnight: Cool Pale Indigo
  5: "#fce7f3",  // Dawn: Pale Pink
  8: "#ffffff",  // Morning: Pure White
  12: "#f0f9ff", // Noon: Pale Sky Blue
  17: "#fff7ed", // Sunset: Warm Pale Orange
  20: "#f3e8ff", // Dusk: Pale Purple
};

const LIGHT_BACKGROUND_SURFACE_SCHEDULE: ColorSchedule = {
  0: "#c7d2fe",  // Midnight: Soft Indigo
  5: "#fbcfe8",  // Dawn: Soft Pink
  8: "#f1f5f9",  // Morning: Soft Slate
  12: "#bae6fd", // Noon: Soft Sky Blue
  17: "#fed7aa", // Sunset: Soft Orange
  20: "#d8b4fe", // Dusk: Soft Purple
};

// Accent Schedules (Tertiary/Expressive)
const ACCENT_START_SCHEDULE: ColorSchedule = {
  0: "#22d3ee",  // Midnight: Cyan
  5: "#f472b6",  // Dawn: Pink
  8: "#84cc16",  // Morning: Lime
  12: "#facc15", // Noon: Yellow
  17: "#fb923c", // Sunset: Orange
  20: "#c084fc", // Dusk: Lavender
};

const ACCENT_END_SCHEDULE: ColorSchedule = {
  0: "#06b6d4",  // Midnight: Darker Cyan
  5: "#db2777",  // Dawn: Darker Pink
  8: "#10b981",  // Morning: Emerald
  12: "#eab308", // Noon: Darker Yellow
  17: "#ea580c", // Sunset: Darker Orange
  20: "#a855f7", // Dusk: Purple
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
  const [bgDeep, setBgDeep] = useState("#050508");
  const [bgSurface, setBgSurface] = useState("#1A1424");

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
    const accentStart = getColorForTime(ACCENT_START_SCHEDULE, effectiveTime);
    const accentEnd = getColorForTime(ACCENT_END_SCHEDULE, effectiveTime);
    
    // Select background schedule based on theme
    const deepSchedule = isDark ? BACKGROUND_DEEP_SCHEDULE : LIGHT_BACKGROUND_DEEP_SCHEDULE;
    const surfaceSchedule = isDark ? BACKGROUND_SURFACE_SCHEDULE : LIGHT_BACKGROUND_SURFACE_SCHEDULE;

    const newBgDeep = getColorForTime(deepSchedule, effectiveTime);
    const newBgSurface = getColorForTime(surfaceSchedule, effectiveTime);

    setBgDeep(newBgDeep);
    setBgSurface(newBgSurface);

    // Apply to CSS variables
    const root = document.documentElement;
    
    // Update Gradients
    root.style.setProperty("--lum-grad-primary", `linear-gradient(135deg, ${primaryStart} 0%, ${primaryEnd} 100%)`);
    root.style.setProperty("--lum-grad-secondary", `linear-gradient(135deg, ${secondaryStart} 0%, ${secondaryEnd} 100%)`);
    root.style.setProperty("--lum-grad-accent", `linear-gradient(135deg, ${accentStart} 0%, ${accentEnd} 100%)`);
    
    // Update Neon Rails (Solid colors used for borders/glows)
    root.style.setProperty("--neon-primary-start", primaryStart);
    root.style.setProperty("--neon-primary-end", primaryEnd);
    root.style.setProperty("--neon-secondary-start", secondaryStart);
    root.style.setProperty("--neon-secondary-end", secondaryEnd);
    root.style.setProperty("--neon-accent-start", accentStart);
    root.style.setProperty("--neon-accent-end", accentEnd);

    // Update Text Contrast Colors
    root.style.setProperty("--on-primary", getContrastColor(primaryStart));
    root.style.setProperty("--on-secondary", getContrastColor(secondaryStart));
    root.style.setProperty("--on-accent", getContrastColor(accentStart));
    
    // Update Accent Colors
    root.style.setProperty("--lum-void-accent", accentStart);
    root.style.setProperty("--hover-accent", accentStart);

    // Update Background Shader Colors
    root.style.setProperty("--bg-deep", newBgDeep);
    root.style.setProperty("--bg-surface", newBgSurface);

    // Sync with Global Design System Tokens
    root.style.setProperty("--lum-void-deep", newBgDeep);
    root.style.setProperty("--lum-void-surface", newBgSurface);
    // Approximate elevated color by using surface color
    root.style.setProperty("--lum-void-elevated", newBgSurface);

    // Update Chip Colors (Derived from Primary/Secondary/Accent)
    // Use color-mix to ensure contrast and transparency dynamically
    const mixColor = isDark ? "white" : "black";
    const textMixStrength = "40%"; // Mix in white/black to ensure text is readable
    
    // Primary Chip
    root.style.setProperty("--chip-primary-text", `color-mix(in srgb, ${primaryStart}, ${mixColor} ${textMixStrength})`);
    root.style.setProperty("--chip-primary-bg", `color-mix(in srgb, ${primaryStart}, transparent 85%)`);
    root.style.setProperty("--chip-primary-border", `color-mix(in srgb, ${primaryStart}, transparent 70%)`);
    
    // Secondary Chip
    root.style.setProperty("--chip-secondary-text", `color-mix(in srgb, ${secondaryStart}, ${mixColor} ${textMixStrength})`);
    root.style.setProperty("--chip-secondary-bg", `color-mix(in srgb, ${secondaryStart}, transparent 85%)`);
    root.style.setProperty("--chip-secondary-border", `color-mix(in srgb, ${secondaryStart}, transparent 70%)`);
    
    // Blue/Accent Chip
    root.style.setProperty("--chip-blue-text", `color-mix(in srgb, ${accentStart}, ${mixColor} ${textMixStrength})`);
    root.style.setProperty("--chip-blue-bg", `color-mix(in srgb, ${accentStart}, transparent 85%)`);
    root.style.setProperty("--chip-blue-border", `color-mix(in srgb, ${accentStart}, transparent 70%)`);
    
    // Purple Chip
    root.style.setProperty("--chip-purple-text", `color-mix(in srgb, ${secondaryEnd}, ${mixColor} ${textMixStrength})`);
    root.style.setProperty("--chip-purple-bg", `color-mix(in srgb, ${secondaryEnd}, transparent 85%)`);
    root.style.setProperty("--chip-purple-border", `color-mix(in srgb, ${secondaryEnd}, transparent 70%)`);

  }, [sourceColor, resolvedTheme, theme, realHour, timeOverride]);

  return (
    <DynamicThemeContext.Provider value={{ sourceColor, setSourceColor, timeOverride, setTimeOverride, bgDeep, bgSurface }}>
      {children}
    </DynamicThemeContext.Provider>
  );
}

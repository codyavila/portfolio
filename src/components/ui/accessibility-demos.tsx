"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Eye, Keyboard } from "lucide-react";

/**
 * ContrastChecker — Interactive contrast ratio demonstration
 */
export function ContrastChecker() {
  const [foreground, setForeground] = useState("#00ff99");
  const [background, setBackground] = useState("#0f1116");

  // Calculate relative luminance
  const getLuminance = (hex: string) => {
    const rgb = hex
      .replace("#", "")
      .match(/.{2}/g)!
      .map((x) => {
        const c = parseInt(x, 16) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  // Calculate contrast ratio
  const getContrast = (fg: string, bg: string) => {
    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const contrast = getContrast(foreground, background);
  const passesAA = contrast >= 4.5;
  const passesAAA = contrast >= 7;

  const presets = [
    { fg: "#00ff99", bg: "#0f1116", label: "Neon Green" },
    { fg: "#ff6b9d", bg: "#0f1116", label: "Neon Pink" },
    { fg: "#15803d", bg: "#ffffff", label: "Light Mode" },
    { fg: "#666666", bg: "#ffffff", label: "Low Contrast" },
  ];

  return (
    <div className="space-y-4">
      <div
        className="p-6 rounded-xl text-center transition-colors"
        style={{ backgroundColor: background, color: foreground }}
      >
        <p className="text-2xl font-bold mb-2">Sample Text</p>
        <p className="text-sm opacity-90">This shows your contrast ratio</p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-bold",
            passesAA ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
          )}
        >
          AA {passesAA ? "✓" : "✗"}
        </div>
        <div className="text-2xl font-mono font-bold text-zinc-900 dark:text-white">
          {contrast.toFixed(1)}:1
        </div>
        <div
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-bold",
            passesAAA ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
          )}
        >
          AAA {passesAAA ? "✓" : "✗"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="flex-1 px-2 py-1 rounded text-sm font-mono bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="flex-1 px-2 py-1 rounded text-sm font-mono bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              setForeground(preset.fg);
              setBackground(preset.bg);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * MotionPreference — Demonstrates reduced motion
 */
export function MotionPreference() {
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-100 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-zinc-500" />
          <div>
            <p className="font-medium text-zinc-900 dark:text-white text-sm">Reduce Motion</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Simulates prefers-reduced-motion</p>
          </div>
        </div>
        <button
          onClick={() => setReduceMotion(!reduceMotion)}
          className={cn(
            "w-12 h-7 rounded-full transition-colors relative",
            reduceMotion ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"
          )}
        >
          <motion.div
            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
            animate={{ left: reduceMotion ? "calc(100% - 24px)" : "4px" }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          className="p-4 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-white text-center"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: reduceMotion ? 0 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <p className="text-sm font-medium">Floating</p>
        </motion.div>

        <motion.div
          className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <p className="text-sm font-medium">Pulsing</p>
        </motion.div>
      </div>

      <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
        {reduceMotion
          ? "Animations disabled — instant transitions"
          : "Animations enabled — toggle to see the difference"}
      </p>
    </div>
  );
}

/**
 * FocusDemo — Keyboard navigation demonstration
 */
export function FocusDemo() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const items = [
    { label: "Home", icon: "🏠" },
    { label: "About", icon: "👤" },
    { label: "Projects", icon: "💼" },
    { label: "Contact", icon: "📧" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-100 dark:bg-white/5">
        <Keyboard className="w-4 h-4 text-zinc-500" />
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Use <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-white/10 font-mono">Tab</kbd> to navigate these buttons
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item.label}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm transition-all",
              "bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white",
              "hover:bg-zinc-200 dark:hover:bg-white/10",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
            )}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "p-3 rounded-lg text-sm transition-colors",
          focusedIndex !== null
            ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
            : "bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400"
        )}
      >
        {focusedIndex !== null
          ? `Currently focused: ${items[focusedIndex].label}`
          : "Tab through the buttons above"}
      </div>
    </div>
  );
}

/**
 * ColorBlindnessDemo — Shows how colors appear to different types
 */
export function ColorBlindnessDemo() {
  const [mode, setMode] = useState<"normal" | "protanopia" | "deuteranopia" | "tritanopia">("normal");

  // Simplified color transformation matrices
  const transform = (r: number, g: number, b: number) => {
    switch (mode) {
      case "protanopia":
        return {
          r: 0.567 * r + 0.433 * g,
          g: 0.558 * r + 0.442 * g,
          b: 0.242 * g + 0.758 * b,
        };
      case "deuteranopia":
        return {
          r: 0.625 * r + 0.375 * g,
          g: 0.7 * r + 0.3 * g,
          b: 0.3 * g + 0.7 * b,
        };
      case "tritanopia":
        return {
          r: 0.95 * r + 0.05 * g,
          g: 0.433 * g + 0.567 * b,
          b: 0.475 * g + 0.525 * b,
        };
      default:
        return { r, g, b };
    }
  };

  const colors = [
    { name: "Success", rgb: { r: 0, g: 255, b: 153 } },
    { name: "Error", rgb: { r: 255, g: 99, b: 99 } },
    { name: "Warning", rgb: { r: 255, g: 200, b: 0 } },
    { name: "Info", rgb: { r: 51, g: 204, b: 255 } },
  ];

  const modes = [
    { value: "normal", label: "Normal Vision" },
    { value: "protanopia", label: "Protanopia (Red)" },
    { value: "deuteranopia", label: "Deuteranopia (Green)" },
    { value: "tritanopia", label: "Tritanopia (Blue)" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value as typeof mode)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              mode === m.value
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => {
          const transformed = transform(color.rgb.r, color.rgb.g, color.rgb.b);
          return (
            <div key={color.name} className="text-center">
              <div
                className="h-16 rounded-lg mb-2 transition-colors duration-300"
                style={{
                  backgroundColor: `rgb(${transformed.r}, ${transformed.g}, ${transformed.b})`,
                }}
              />
              <p className="text-xs text-zinc-600 dark:text-zinc-400">{color.name}</p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
        ~8% of men have some form of color blindness
      </p>
    </div>
  );
}

/**
 * ThemeSwitchDemo — Light/dark mode comparison
 */
export function ThemeSwitchDemo() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setIsDark(false)}
          className={cn(
            "p-3 rounded-xl transition-all",
            !isDark ? "bg-amber-100 text-amber-600 scale-110" : "bg-zinc-100 dark:bg-white/5 text-zinc-400"
          )}
        >
          <Sun className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsDark(true)}
          className={cn(
            "p-3 rounded-xl transition-all",
            isDark ? "bg-indigo-500/20 text-indigo-400 scale-110" : "bg-zinc-100 dark:bg-white/5 text-zinc-400"
          )}
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>

      <div
        className={cn(
          "p-4 rounded-xl transition-colors duration-300",
          isDark ? "bg-[#0f1116]" : "bg-white border border-zinc-200"
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              "w-8 h-8 rounded-lg",
              isDark ? "bg-gradient-to-br from-emerald-500 to-cyan-500" : "bg-gradient-to-br from-emerald-600 to-teal-600"
            )}
          />
          <div>
            <p className={cn("font-semibold text-sm", isDark ? "text-white" : "text-zinc-900")}>
              Card Title
            </p>
            <p className={cn("text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>
              Subtitle text
            </p>
          </div>
        </div>
        <p className={cn("text-sm", isDark ? "text-zinc-300" : "text-zinc-700")}>
          Notice how the neon colors adapt between modes while maintaining readability.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={cn("p-2 rounded text-center", isDark ? "bg-white/5 text-emerald-400" : "bg-emerald-50 text-emerald-700")}>
          {isDark ? "#00ff99" : "#15803d"}
        </div>
        <div className={cn("p-2 rounded text-center", isDark ? "bg-white/5 text-pink-400" : "bg-pink-50 text-pink-700")}>
          {isDark ? "#ff6b9d" : "#9e1b4d"}
        </div>
      </div>
    </div>
  );
}

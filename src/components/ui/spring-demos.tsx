"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SpringCompare — Interactive spring physics comparison
 * 
 * Shows different spring configurations side-by-side so users can feel the difference
 */

interface SpringPreset {
  name: string;
  config: { stiffness: number; damping: number; mass?: number };
  color: string;
}

const presets: SpringPreset[] = [
  { 
    name: "Snappy", 
    config: { stiffness: 500, damping: 30, mass: 1 },
    color: "from-emerald-500 to-cyan-500"
  },
  { 
    name: "Bouncy", 
    config: { stiffness: 400, damping: 15, mass: 1 },
    color: "from-violet-500 to-pink-500"
  },
  { 
    name: "Smooth", 
    config: { stiffness: 300, damping: 25, mass: 1 },
    color: "from-amber-500 to-orange-500"
  },
  { 
    name: "Gentle", 
    config: { stiffness: 200, damping: 20, mass: 1.5 },
    color: "from-blue-500 to-indigo-500"
  },
];

export function SpringCompare() {
  const [triggered, setTriggered] = useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {presets.map((preset) => (
          <SpringBox 
            key={preset.name} 
            preset={preset} 
            triggered={triggered}
          />
        ))}
      </div>
      <button
        onClick={() => setTriggered(t => !t)}
        className={cn(
          "w-full py-3 px-4 rounded-xl font-semibold text-sm",
          "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white",
          "hover:bg-zinc-200 dark:hover:bg-white/15",
          "transition-colors duration-150",
          "border border-zinc-200 dark:border-white/10"
        )}
      >
        {triggered ? "↩ Reset All" : "▶ Trigger Animation"}
      </button>
    </div>
  );
}

function SpringBox({ preset, triggered }: { preset: SpringPreset; triggered: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={cn(
          "w-16 h-16 rounded-xl bg-gradient-to-br shadow-lg",
          preset.color
        )}
        animate={{
          y: triggered ? -40 : 0,
          scale: triggered ? 1.1 : 1,
          rotate: triggered ? 10 : 0,
        }}
        transition={{
          type: "spring",
          ...preset.config,
        }}
      />
      <div className="text-center">
        <p className="text-xs font-semibold text-zinc-900 dark:text-white">{preset.name}</p>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
          {preset.config.stiffness}/{preset.config.damping}
        </p>
      </div>
    </div>
  );
}

/**
 * SpringSlider — Interactive spring parameter explorer
 */
export function SpringSlider() {
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(20);
  const [triggered, setTriggered] = useState(false);

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-center">
        <motion.div
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg cursor-pointer"
          animate={{
            y: triggered ? -60 : 0,
            scale: triggered ? 1.15 : 1,
          }}
          transition={{
            type: "spring",
            stiffness,
            damping,
          }}
          onClick={() => setTriggered(t => !t)}
        />
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Stiffness</span>
            <span className="font-mono text-zinc-900 dark:text-white">{stiffness}</span>
          </div>
          <input
            type="range"
            min="50"
            max="1000"
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Damping</span>
            <span className="font-mono text-zinc-900 dark:text-white">{damping}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
      </div>
      
      <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
        Click the box or adjust sliders to experiment
      </p>
    </div>
  );
}

/**
 * DurationVsSpring — Side-by-side comparison of duration vs spring
 */
export function DurationVsSpring() {
  const [triggered, setTriggered] = useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="w-16 h-16 rounded-xl bg-zinc-400 dark:bg-zinc-600 shadow-lg"
            animate={{
              y: triggered ? -40 : 0,
              scale: triggered ? 1.1 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />
          <div className="text-center">
            <p className="text-xs font-semibold text-zinc-900 dark:text-white">Duration</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">300ms ease-in-out</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg"
            animate={{
              y: triggered ? -40 : 0,
              scale: triggered ? 1.1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          />
          <div className="text-center">
            <p className="text-xs font-semibold text-zinc-900 dark:text-white">Spring</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">400/17 (bouncy)</p>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setTriggered(t => !t)}
        className={cn(
          "w-full py-3 px-4 rounded-xl font-semibold text-sm",
          "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white",
          "hover:bg-zinc-200 dark:hover:bg-white/15",
          "transition-colors duration-150",
          "border border-zinc-200 dark:border-white/10"
        )}
      >
        {triggered ? "↩ Reset" : "▶ Compare"}
      </button>
    </div>
  );
}

/**
 * GlassDensityCompare — Shows different glass opacity levels
 */
export function GlassDensityCompare() {
  const layers = [
    { name: "Mist", opacity: "bg-white/[0.03]", blur: "backdrop-blur-sm", desc: "3% / 12px" },
    { name: "Prism", opacity: "bg-white/[0.08]", blur: "backdrop-blur-md", desc: "8% / 24px" },
    { name: "Lume", opacity: "bg-white/[0.15]", blur: "backdrop-blur-xl", desc: "15% / 48px" },
  ];

  return (
    <div className="w-full">
      {/* Background pattern to show blur effect */}
      <div className="relative rounded-xl overflow-hidden p-6 bg-gradient-to-br from-violet-600/20 via-cyan-500/20 to-emerald-500/20">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-pink-500" />
          <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-cyan-500" />
          <div className="absolute bottom-6 left-1/3 w-10 h-10 rounded-full bg-emerald-500" />
          <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-amber-500" />
        </div>
        
        <div className="relative grid grid-cols-3 gap-3">
          {layers.map((layer) => (
            <div
              key={layer.name}
              className={cn(
                "p-4 rounded-xl border border-white/10",
                layer.opacity,
                layer.blur
              )}
            >
              <p className="text-sm font-semibold text-white">{layer.name}</p>
              <p className="text-[10px] text-white/70 mt-1">{layer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * HoverScaleCompare — Different hover scale amounts
 */
export function HoverScaleCompare() {
  const scales = [
    { scale: 1.01, label: "1.01x", desc: "Subtle" },
    { scale: 1.02, label: "1.02x", desc: "Standard" },
    { scale: 1.05, label: "1.05x", desc: "Noticeable" },
    { scale: 1.1, label: "1.10x", desc: "Dramatic" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {scales.map((item) => (
        <motion.div
          key={item.label}
          className={cn(
            "p-4 rounded-xl text-center cursor-pointer",
            "bg-zinc-100 dark:bg-white/5",
            "border border-zinc-200 dark:border-white/10"
          )}
          whileHover={{ scale: item.scale }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <p className="text-lg font-bold text-zinc-900 dark:text-white">{item.label}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

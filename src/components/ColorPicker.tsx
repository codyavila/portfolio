"use client";

import React from "react";
import { useDynamicTheme } from "@/components/dynamic-theme-provider";
import { cn } from "@/lib/utils";

const PRESETS = [
  { name: "Cyber Lime", color: "#ccff00" },
  { name: "Neon Mint", color: "#00ff99" },
  { name: "Cotton Candy Pink", color: "#ff99cc" },
  { name: "Cotton Candy Blue", color: "#33ccff" },
  { name: "Solar Flare Gold", color: "#ffcc00" },
  { name: "Solar Flare Coral", color: "#ff3366" },
  { name: "Iridescent Violet", color: "#b388ff" },
  { name: "Deep Void", color: "#120e1a" },
];

export function ColorPicker() {
  const { sourceColor, setSourceColor } = useDynamicTheme();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-medium text-[var(--text-secondary)] mb-2">Theme Color</div>
      <div className="grid grid-cols-4 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.color}
            onClick={() => setSourceColor(preset.color)}
            className={cn(
              "w-6 h-6 rounded-full border border-white/10 transition-transform hover:scale-110",
              sourceColor === preset.color && "ring-2 ring-white ring-offset-2 ring-offset-black"
            )}
            style={{ backgroundColor: preset.color }}
            title={preset.name}
          />
        ))}
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10 hover:scale-110 transition-transform group">
           <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
           <input
            type="color"
            value={sourceColor}
            onChange={(e) => setSourceColor(e.target.value)}
            className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0 opacity-0"
          />
          <div 
            className="w-full h-full" 
            style={{ background: `conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)` }} 
          />
        </div>
      </div>
    </div>
  );
}

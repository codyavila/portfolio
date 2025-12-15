"use client";

import React from "react";
import { useDynamicTheme } from "@/components/dynamic-theme-provider";
import { cn } from "@/lib/utils";

const PRESETS = [
  { name: "Aurora Blue", color: "#5E60CE" },
  { name: "Neon Purple", color: "#7400B8" },
  { name: "Alert Red", color: "#D00000" },
  { name: "Forest Green", color: "#2E7D32" },
  { name: "Ocean Teal", color: "#00695C" },
  { name: "Solar Orange", color: "#E65100" },
  { name: "Deep Pink", color: "#C2185B" },
  { name: "Cyan", color: "#00BCD4" },
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

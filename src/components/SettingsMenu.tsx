"use client";

import * as React from "react";
import { Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ColorPicker } from "@/components/ColorPicker";

const CONTRAST_KEY = "lum-contrast";

export function SettingsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(CONTRAST_KEY);
    const enabled = stored === "high";
    setHighContrast(enabled);
    document.documentElement.dataset.contrast = enabled ? "high" : "normal";
  }, []);

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    document.documentElement.dataset.contrast = next ? "high" : "normal";
    localStorage.setItem(CONTRAST_KEY, next ? "high" : "normal");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        aria-label="Open settings"
      >
        <Settings className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-full left-0 mb-4 p-4 rounded-2xl bg-background/80 backdrop-blur-xl min-w-[200px] shadow-2xl border border-white/10 bg-gradient-to-b from-[var(--neon-primary-start)]/20 to-transparent z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-[var(--text-primary)]">Appearance</span>
              <button onClick={() => setIsOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text-secondary)]">Mode</span>
                <ThemeToggle />
              </div>
              
              <div className="h-[1px] bg-white/10" />
              
              <button
                onClick={toggleContrast}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-white/20 transition-colors"
              >
                <span className="text-xs font-medium">High Contrast</span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/10">{highContrast ? "On" : "Off"}</span>
              </button>

              <div className="h-[1px] bg-white/10" />

              <ColorPicker />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

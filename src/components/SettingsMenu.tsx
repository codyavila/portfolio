"use client";

import * as React from "react";
import { Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ColorPicker } from "@/components/ColorPicker";

export function SettingsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

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
              
              <ColorPicker />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

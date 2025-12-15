"use client";

import * as React from "react";
import { Settings, X, Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const CONTRAST_KEY = "lum-contrast";

export function SettingsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONTRAST_KEY);
    const enabled = stored === "high";
    setHighContrast(enabled);
    document.documentElement.dataset.contrast = enabled ? "high" : "normal";
  }, []);

  // Close menu when clicking outside
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-settings-menu]')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  // Close on escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    document.documentElement.dataset.contrast = next ? "high" : "normal";
    localStorage.setItem(CONTRAST_KEY, next ? "high" : "normal");
  };

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ];

  return (
    <div className="relative" data-settings-menu>
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2.5 rounded-full bg-[var(--glass-1-fill)] border border-[var(--glass-1-border)] hover:bg-[var(--glass-2-fill)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        aria-label="Open settings"
        aria-expanded={isOpen}
      >
        <Settings className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile: Bottom sheet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed bottom-0 left-0 right-0 p-5 pb-8 rounded-t-3xl bg-[var(--lum-void-surface)] border-t border-[var(--glass-2-border)] shadow-2xl z-[101] safe-area-inset-bottom"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="w-10 h-1 bg-[var(--text-tertiary)] rounded-full mx-auto mb-5" />
              
              <div className="flex items-center justify-between mb-5">
                <span className="text-base font-bold text-[var(--text-primary)]">Appearance</span>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 rounded-full bg-[var(--glass-1-fill)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-5">
                {/* Theme selector */}
                <div>
                  <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-3 block">Theme</span>
                  <div className="grid grid-cols-2 gap-2">
                    {mounted && themeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                          theme === option.value
                            ? 'bg-[var(--chip-primary-bg)] border-[var(--chip-primary-border)] text-[var(--chip-primary-text)] font-semibold'
                            : 'bg-[var(--glass-1-fill)] border-[var(--glass-1-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-2-border)]'
                        }`}
                      >
                        <option.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="h-px bg-[var(--glass-1-border)]" />
                
                {/* Enhanced contrast toggle */}
                <button
                  onClick={toggleContrast}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--glass-1-fill)] border border-[var(--glass-1-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-2-border)] transition-all"
                >
                  <span className="text-sm font-medium">Enhanced Contrast</span>
                  <div className={`w-11 h-6 rounded-full relative transition-colors ${
                    highContrast ? 'bg-[var(--neon-primary-end)]' : 'bg-[var(--glass-2-fill)] border border-[var(--glass-2-border)]'
                  }`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      highContrast ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Desktop: Popover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="hidden md:block absolute bottom-full left-0 mb-3 p-4 rounded-2xl bg-[var(--lum-void-surface)]/95 backdrop-blur-xl min-w-[220px] shadow-2xl border border-[var(--glass-2-border)] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[var(--text-primary)]">Appearance</span>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 rounded-full hover:bg-[var(--glass-1-fill)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Theme selector */}
                <div>
                  <span className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-2 block">Theme</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {mounted && themeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border transition-all text-xs font-medium ${
                          theme === option.value
                            ? 'bg-[var(--chip-primary-bg)] border-[var(--chip-primary-border)] text-[var(--chip-primary-text)] font-semibold'
                            : 'bg-[var(--glass-1-fill)] border-[var(--glass-1-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-2-border)]'
                        }`}
                      >
                        <option.icon className="w-3.5 h-3.5" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="h-px bg-[var(--glass-1-border)]" />
                
                {/* Enhanced contrast toggle */}
                <button
                  onClick={toggleContrast}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--glass-1-fill)] border border-[var(--glass-1-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-2-border)] transition-all"
                >
                  <span className="text-xs font-medium">Enhanced Contrast</span>
                  <div className={`w-9 h-5 rounded-full relative transition-colors ${
                    highContrast ? 'bg-[var(--neon-primary-end)]' : 'bg-[var(--glass-2-fill)] border border-[var(--glass-2-border)]'
                  }`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                      highContrast ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

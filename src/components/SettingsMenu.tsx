"use client";

import * as React from "react";
import { Settings, Moon, Sun, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const CONTRAST_KEY = "lum-contrast";

export function SettingsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  
  // Icon rotation animation
  const iconRotation = useSpring(0, { stiffness: 300, damping: 20 });
  
  React.useEffect(() => {
    iconRotation.set(isOpen ? 180 : 0);
  }, [isOpen, iconRotation]);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONTRAST_KEY);
    const enabled = stored === "high";
    setHighContrast(enabled);
    document.documentElement.dataset.contrast = enabled ? "high" : "normal";
  }, []);

  // Close on click outside
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-settings-menu]')) {
        setIsOpen(false);
      }
    };
    // Delay to prevent immediate close on open click
    const timeout = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', handleClick);
    };
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

  return (
    <div className="relative" data-settings-menu>
      {/* Settings trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "p-2.5 rounded-full transition-colors relative z-10",
          isOpen 
            ? "text-[var(--chip-primary-text)]" 
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        )}
        aria-label={isOpen ? "Close settings" : "Open settings"}
        aria-expanded={isOpen}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div style={{ rotate: iconRotation }}>
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Settings className="w-5 h-5" />
          )}
        </motion.div>
        
        {/* Pulse indicator when menu is open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, var(--neon-primary-end) 0%, transparent 70%)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.3 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop: Connected bubble panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -16 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3"
              style={{ transformOrigin: "left center" }}
            >
              {/* Connection nub */}
              <motion.div 
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 glass-2 border border-[var(--glass-2-border)]"
                style={{ borderRadius: "4px", borderRight: "none", borderTop: "none" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.05, type: "spring", stiffness: 400, damping: 25 }}
              />
              
              {/* Panel */}
              <div className={cn(
                "relative glass-2 rounded-2xl p-3",
                "shadow-xl dark:shadow-2xl",
                "min-w-[180px] border border-[var(--glass-2-border)]"
              )}>
                {/* Header */}
                <motion.div 
                  className="px-1 pb-2 mb-2 border-b border-[var(--glass-2-border)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Settings
                  </span>
                </motion.div>
                
                <div className="space-y-1">
                  {/* Theme section */}
                  <span className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-1">
                    Theme
                  </span>
                  {mounted && (
                    <div className="space-y-1">
                      <OptionButton
                        icon={Sun}
                        label="Light"
                        isActive={theme === 'light'}
                        onClick={() => setTheme('light')}
                        delay={0.05}
                      />
                      <OptionButton
                        icon={Moon}
                        label="Dark"
                        isActive={theme === 'dark'}
                        onClick={() => setTheme('dark')}
                        delay={0.1}
                      />
                    </div>
                  )}
                  
                  <div className="h-px bg-[var(--glass-2-border)] my-2" />
                  
                  {/* Accessibility section */}
                  <span className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-1">
                    Accessibility
                  </span>
                  <OptionButton
                    icon={Sparkles}
                    label={highContrast ? "High Contrast" : "Normal"}
                    isActive={highContrast}
                    onClick={toggleContrast}
                    fullWidth
                    delay={0.15}
                  />
                </div>
              </div>
            </motion.div>

            {/* Mobile: Bottom-attached panel */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="md:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-3"
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Connection nub */}
              <motion.div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 glass-2 border border-[var(--glass-2-border)]"
                style={{ borderRadius: "4px", borderLeft: "none", borderTop: "none" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.05, type: "spring", stiffness: 400, damping: 25 }}
              />
              
              {/* Panel */}
              <div className={cn(
                "relative glass-2 rounded-2xl p-3",
                "shadow-xl dark:shadow-2xl border border-[var(--glass-2-border)]"
              )}>
                <div className="flex items-center gap-1">
                  {/* Theme options */}
                  {mounted && (
                    <>
                      <OptionButton
                        icon={Sun}
                        label="Light"
                        isActive={theme === 'light'}
                        onClick={() => setTheme('light')}
                        compact
                        delay={0.05}
                      />
                      <OptionButton
                        icon={Moon}
                        label="Dark"
                        isActive={theme === 'dark'}
                        onClick={() => setTheme('dark')}
                        compact
                        delay={0.1}
                      />
                    </>
                  )}
                  
                  <div className="w-px h-8 bg-[var(--glass-2-border)] mx-1" />
                  
                  {/* Contrast toggle */}
                  <OptionButton
                    icon={Sparkles}
                    label="AAA"
                    isActive={highContrast}
                    onClick={toggleContrast}
                    compact
                    delay={0.15}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced option button component with animations
function OptionButton({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick, 
  fullWidth = false,
  compact = false,
  delay = 0,
}: { 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  fullWidth?: boolean;
  compact?: boolean;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        delay 
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative flex items-center gap-2 rounded-xl transition-colors overflow-hidden",
        compact ? "p-2" : "px-3 py-2.5",
        fullWidth && "w-full",
        isActive
          ? "text-[var(--chip-primary-text)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      )}
      title={label}
    >
      {/* Background with animated state */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        animate={{
          backgroundColor: isActive 
            ? "var(--chip-primary-bg)" 
            : isHovered 
              ? "rgba(128, 128, 128, 0.1)" 
              : "transparent",
          borderColor: isActive ? "var(--chip-primary-border)" : "transparent",
        }}
        style={{ border: "1px solid transparent" }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Active indicator glow */}
      {isActive && (
        <motion.div
          layoutId="settings-active-glow"
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, var(--neon-primary-end) 0%, transparent 70%)",
            opacity: 0.15,
            filter: "blur(8px)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      
      <motion.span
        className="relative z-10"
        animate={{ 
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Icon className={compact ? "w-5 h-5" : "w-4 h-4"} />
      </motion.span>
      {!compact && <span className="text-sm font-medium relative z-10">{label}</span>}
      
      {/* Checkmark indicator */}
      <AnimatePresence>
        {isActive && !compact && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="ml-auto relative z-10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--chip-primary-text)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

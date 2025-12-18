"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, FolderGit2, Layers, Settings, Sun, Moon, Sparkles, X, BookOpen, Volume2, VolumeX } from "lucide-react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { useDynamicTheme } from "@/components/dynamic-theme-provider";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { useSoundSystem } from "@/hooks/useSoundSystem";

const navItems = [
  { name: "Home", href: "/", icon: Home, sectionId: null },
  { name: "Projects", href: "/#projects", icon: FolderGit2, sectionId: "projects" },
  { name: "About", href: "/#about", icon: User, sectionId: "about" },
  { name: "Process", href: "/#process", icon: Layers, sectionId: "process" },
  { name: "Experience", href: "/#experience", icon: Briefcase, sectionId: "experience" },
  { name: "Blog", href: "/blog", icon: BookOpen, sectionId: null },
];

const CONTRAST_KEY = "lum-contrast";

// Liquid glass spring config - bouncy and satisfying
const liquidSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

// Extra bouncy for the panel expansion
const jellySpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 15,
  mass: 0.6,
};

export function Header() {
  const [activeTab, setActiveTab] = useState("Home");
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hasAnimated = useRef(false);
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, y: 0, w: 56, h: 56 });
  const indicatorRef = useRef({ x: 0, y: 0, w: 56, h: 56 });
  const { theme, setTheme } = useTheme();
  const { timeOverride, setTimeOverride } = useDynamicTheme();
  const pathname = usePathname();
  useTimeOfDay();
  const { playToggle, playTick, playSliderTick, playOpen, playClose, playNavNote, playLightMode, playDarkMode, playHome, isMuted, toggleMute } = useSoundSystem();
  
  // Magnetic effect values with smoother springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 300, damping: 25 });
  const springY = useSpring(my, { stiffness: 300, damping: 25 });

  // Ambient glow pulse
  const glowOpacity = useSpring(0.3, { stiffness: 100, damping: 20 });
  
  // Icon rotation - bouncy
  const iconRotation = useSpring(0, { stiffness: 400, damping: 12 });

  // Initialize on mount - using layout effect for synchronous execution
  useEffect(() => {
    // These setState calls are intentional for hydration-safe initialization
    // and reading from localStorage which is only available client-side
    requestAnimationFrame(() => {
      setMounted(true);
      // Mark as animated after the animation completes
      setTimeout(() => {
        hasAnimated.current = true;
      }, 800);
      const stored = localStorage.getItem(CONTRAST_KEY);
      const enabled = stored === "high";
      setHighContrast(enabled);
      document.documentElement.dataset.contrast = enabled ? "high" : "normal";
    });
  }, []);

  // Scroll spy - track which section is in view
  useEffect(() => {
    if (pathname?.startsWith('/blog')) {
      if (activeTab !== "Blog") {
        setTimeout(() => setActiveTab("Blog"), 0);
      }
      return;
    }

    const sectionIds = navItems
      .filter(item => item.sectionId)
      .map(item => item.sectionId as string);
    
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the section that's most visible
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length === 0) {
        // Check if we're at the top of the page
        if (window.scrollY < 200) {
          setActiveTab("Home");
        }
        return;
      }

      // Get the topmost visible section
      const sorted = visibleEntries.sort((a, b) => {
        return a.boundingClientRect.top - b.boundingClientRect.top;
      });
      
      const topSection = sorted[0];
      const sectionId = topSection.target.id;
      const navItem = navItems.find(item => item.sectionId === sectionId);
      
      if (navItem) {
        setActiveTab(navItem.name);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in upper-middle of viewport
      threshold: 0,
    });

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Also handle scroll to top for "Home"
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveTab("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, activeTab]);

  useEffect(() => {
    iconRotation.set(settingsOpen ? 180 : 0);
  }, [settingsOpen, iconRotation]);

  // Track indicator position based on active/hover tab
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = containerRef.current?.querySelector<HTMLElement>(`[data-tab="${hoverTab ?? activeTab}"]`);
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const parentRect = containerRef.current?.getBoundingClientRect();
        if (parentRect) {
          // Use ref to store position, then update state in rAF
          const newIndicator = {
            x: rect.left - parentRect.left,
            y: rect.top - parentRect.top,
            w: rect.width,
            h: rect.height,
          };
          // Only update if changed to avoid unnecessary re-renders
          if (
            indicatorRef.current.x !== newIndicator.x ||
            indicatorRef.current.y !== newIndicator.y ||
            indicatorRef.current.w !== newIndicator.w ||
            indicatorRef.current.h !== newIndicator.h
          ) {
            indicatorRef.current = newIndicator;
            requestAnimationFrame(() => {
              setIndicator(newIndicator);
            });
          }
        }
      }
    };
    updateIndicator();
  }, [activeTab, hoverTab]);

  // Update glow on hover
  useEffect(() => {
    glowOpacity.set(isHovered ? 0.6 : 0.3);
  }, [isHovered, glowOpacity]);

  // Close settings on escape
  useEffect(() => {
    if (!settingsOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSettingsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [settingsOpen]);

  // Close on click outside
  useEffect(() => {
    if (!settingsOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-nav-container]')) {
        setSettingsOpen(false);
      }
    };
    const timeout = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', handleClick);
    };
  }, [settingsOpen]);

  // Magnetic cursor follow effect
  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-settings-panel]')) {
      mx.set(0);
      my.set(0);
      return;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const moveX = ((x / rect.width) - 0.5) * 6;
    const moveY = ((y / rect.height) - 0.5) * 6;
    mx.set(moveX);
    my.set(moveY);
  }, [mx, my]);

  const resetMove = useCallback(() => {
    mx.set(0);
    my.set(0);
    setIsHovered(false);
  }, [mx, my]);

  const handleEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const toggleContrast = () => {
    playToggle();
    const next = !highContrast;
    setHighContrast(next);
    document.documentElement.dataset.contrast = next ? "high" : "normal";
    localStorage.setItem(CONTRAST_KEY, next ? "high" : "normal");
  };

  const handleNavClick = useCallback((tabName: string, index: number) => {
    if (tabName === 'Home') {
      playHome();
    } else {
      playNavNote(index);
    }
    setActiveTab(tabName);
  }, [playNavNote, playHome]);

  const handleSettingsToggle = useCallback(() => {
    // Prevent rapid toggling which causes animation bugs
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    if (settingsOpen) {
      playClose();
    } else {
      playOpen();
    }
    setSettingsOpen(!settingsOpen);
    
    // Release lock after animation completes
    setTimeout(() => {
      isAnimating.current = false;
    }, 300);
  }, [playOpen, playClose, settingsOpen]);

  const handleThemeChange = useCallback((newTheme: string) => {
    if (newTheme === 'light') {
      playLightMode();
    } else {
      playDarkMode();
    }
    setTheme(newTheme);
  }, [playLightMode, playDarkMode, setTheme]);

  const handleTimeSliderChange = useCallback((value: number, min: number, max: number) => {
    playSliderTick(value, min, max);
    setTimeOverride(value < 0 ? null : value);
  }, [playSliderTick, setTimeOverride]);
  
  return (
    <motion.header
      initial={hasAnimated.current ? false : { y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: hasAnimated.current ? 0 : 0.3 
      }}
      className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2 md:left-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 w-auto"
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-[28px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--neon-primary-end) 0%, transparent 70%)",
          filter: "blur(20px)",
          opacity: glowOpacity,
          scale: 1.2,
        }}
      />

      {/* Mobile Settings Panel - absolutely positioned above navbar */}
      <AnimatePresence mode="wait">
        {settingsOpen && (
          <motion.div
            data-settings-panel
            key="mobile-settings"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{
              ...jellySpring,
              opacity: { duration: 0.15 }
            }}
            className="md:hidden absolute bottom-full left-0 right-0 mb-2 glass-2 glass-noise glass-noise-ghost rounded-2xl border border-[var(--glass-2-border)] shadow-lg overflow-hidden"
          >
            <motion.div 
              className="px-3 py-3 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div className="flex items-center justify-center gap-2">
                {mounted && (
                  <>
                    <MobileOption
                      icon={Sun}
                      label="Light"
                      isActive={theme === 'light'}
                      onClick={() => handleThemeChange('light')}
                    />
                    <MobileOption
                      icon={Moon}
                      label="Dark"
                      isActive={theme === 'dark'}
                      onClick={() => handleThemeChange('dark')}
                    />
                  </>
                )}
                <div className="w-px h-8 bg-[var(--glass-2-border)] mx-1" />
                
                {/* Mobile Time Slider */}
                <div className="flex flex-col justify-center w-24 px-1">
                   <span className="text-[9px] font-mono text-[var(--text-secondary)] text-center mb-1">
                      {timeOverride !== null ? `${timeOverride}:00` : "Auto"}
                   </span>
                   <input
                      type="range"
                      min="-1"
                      max="23"
                      step="1"
                      value={timeOverride ?? -1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        handleTimeSliderChange(val, -1, 23);
                      }}
                      className="w-full h-1.5 bg-[var(--glass-2-border)] rounded-full appearance-none cursor-pointer accent-[var(--chip-primary-text)]"
                    />
                </div>

                <div className="w-px h-8 bg-[var(--glass-2-border)] mx-1" />
                <MobileOption
                  icon={isMuted ? VolumeX : Volume2}
                  label={isMuted ? "Muted" : "Sound"}
                  isActive={!isMuted}
                  onClick={toggleMute}
                />
                <div className="w-px h-8 bg-[var(--glass-2-border)] mx-1" />
                <MobileOption
                  icon={Sparkles}
                  label="Contrast"
                  isActive={highContrast}
                  onClick={toggleContrast}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main glass container */}
      <motion.div
        data-nav-container
        layout
        className={cn(
          "relative",
          "glass-2 glass-noise glass-noise-ghost",
          "shadow-lg dark:shadow-2xl",
          "backdrop-saturate-150",
          "border border-[var(--glass-2-border)]",
          "flex md:flex-row",
          "rounded-[28px]"
        )}
        transition={{
          ...liquidSpring,
          borderRadius: { duration: 0 },
        }}
        onMouseMove={handleMove}
        onMouseLeave={resetMove}
        onMouseEnter={handleEnter}
      >
        {/* Nav content */}
        <motion.nav
          ref={containerRef}
          layout="position"
          className={cn(
            "relative px-2 py-2 md:px-2 md:py-3",
            "flex md:flex-col items-center gap-1",
          )}
          transition={liquidSpring}
        >
          {/* Active indicator glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--neon-primary-end) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
            animate={{
              left: indicator.x,
              top: indicator.y,
              width: indicator.w,
              height: indicator.h,
              opacity: hoverTab ? 0.5 : 0.35,
            }}
            transition={liquidSpring}
          />

          {/* Logo / Home */}
          <Link
            href="/"
            data-tab="Home"
            onMouseEnter={() => setHoverTab("Home")}
            onMouseLeave={() => setHoverTab(null)}
            onClick={() => handleNavClick("Home", 0)}
            className="relative p-2 rounded-full group"
          >
            <motion.div
              whileHover={{ scale: 1.12, rotate: 5 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={cn(
                "relative z-10 w-10 h-10 rounded-full flex items-center justify-center",
                "text-white font-bold text-sm tracking-tight",
                "shadow-lg"
              )}
              style={{
                x: springX,
                y: springY,
                background: "var(--lum-grad-cyber-lime)",
              }}
            >
              <motion.span
                initial={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                CA
              </motion.span>
            </motion.div>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ 
                opacity: hoverTab === "Home" ? 1 : 0,
                x: hoverTab === "Home" ? 0 : -10,
                scale: hoverTab === "Home" ? 1 : 0.9
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="hidden md:block absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg glass-2 text-xs font-medium text-[var(--text-primary)] whitespace-nowrap pointer-events-none"
            >
              Home
            </motion.div>
          </Link>

          <motion.div 
            layout
            className="h-4 w-[1px] bg-[var(--glass-2-border)] md:w-4 md:h-[1px] mx-1 md:mx-0 md:my-1"
            transition={liquidSpring}
          />

          {/* Nav Items */}
          <div className="flex md:flex-col items-center gap-0.5">
            {navItems.slice(1).map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                data-tab={item.name}
                onMouseEnter={() => setHoverTab(item.name)}
                onMouseLeave={() => setHoverTab(null)}
                onClick={() => handleNavClick(item.name, index + 1)}
                className="relative p-2.5 rounded-full group"
                title={item.name}
              >
                <motion.div 
                  style={{ x: springX, y: springY }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    animate={{
                      scale: activeTab === item.name ? 1 : 0.95,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <item.icon
                      className={cn(
                        "relative z-10 w-5 h-5 transition-colors duration-200",
                        activeTab === item.name
                          ? "text-[var(--chip-primary-text)]"
                          : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                      )}
                    />
                  </motion.div>
                </motion.div>
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ 
                    opacity: hoverTab === item.name ? 1 : 0,
                    x: hoverTab === item.name ? 0 : -10,
                    scale: hoverTab === item.name ? 1 : 0.9
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="hidden md:block absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg glass-2 text-xs font-medium text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50"
                >
                  {item.name}
                </motion.div>
                
                <span className="sr-only">{item.name}</span>
              </Link>
            ))}
          </div>

          <motion.div 
            layout
            className="h-4 w-[1px] bg-[var(--glass-2-border)] md:w-4 md:h-[1px] mx-1 md:mx-0 md:my-1"
            transition={liquidSpring}
          />

          {/* Settings Button */}
          <motion.button
            layout
            onClick={handleSettingsToggle}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "p-2.5 rounded-full transition-colors relative z-10",
              settingsOpen 
                ? "text-[var(--chip-primary-text)]" 
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
            aria-label={settingsOpen ? "Close settings" : "Open settings"}
            aria-expanded={settingsOpen}
            transition={liquidSpring}
          >
            <motion.div style={{ rotate: iconRotation }}>
              {settingsOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Settings className="w-5 h-5" />
              )}
            </motion.div>
          </motion.button>
        </motion.nav>

        {/* Settings Panel - Desktop only (horizontal expansion) */}
        <AnimatePresence mode="wait">
          {settingsOpen && (
            <motion.div
              data-settings-panel
              key="desktop-panel"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 185, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                width: { type: "spring", stiffness: 500, damping: 30 },
                opacity: { duration: 0.15 },
              }}
              className="hidden md:block overflow-hidden origin-left rounded-r-[28px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.1, delay: 0.05 } }}
                className="py-3 px-4 w-[185px] border-l border-[var(--glass-2-border)]"
              >
                {/* Theme Section */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-1">
                    Theme
                  </span>
                  {mounted && (
                    <div className="space-y-1">
                      <SettingsOption
                        icon={Sun}
                        label="Light"
                        isActive={theme === 'light'}
                        onClick={() => handleThemeChange('light')}
                      />
                      <SettingsOption
                        icon={Moon}
                        label="Dark"
                        isActive={theme === 'dark'}
                        onClick={() => handleThemeChange('dark')}
                      />
                    </div>
                  )}
                </div>
                
                <div className="h-px bg-[var(--glass-2-border)] my-2" />
                
                {/* Time Travel Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                      Time Travel
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                      {timeOverride !== null 
                        ? `${Math.floor(timeOverride).toString().padStart(2, '0')}:${Math.floor((timeOverride % 1) * 60).toString().padStart(2, '0')}` 
                        : "Auto"}
                    </span>
                  </div>
                  
                  <div className="px-1">
                    <input
                      type="range"
                      min="-1"
                      max="23.9"
                      step="0.1"
                      value={timeOverride ?? -1}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        handleTimeSliderChange(val, -1, 23.9);
                      }}
                      className="w-full h-1.5 bg-[var(--glass-2-border)] rounded-full appearance-none cursor-pointer accent-[var(--chip-primary-text)]"
                    />
                    <div className="flex justify-between text-[8px] text-[var(--text-tertiary)] mt-1 font-mono">
                      <span>Auto</span>
                      <span>12PM</span>
                      <span>11PM</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[var(--glass-2-border)] my-2" />
                
                {/* Sound Section */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-1">
                    Sound
                  </span>
                  <SettingsOption
                    icon={isMuted ? VolumeX : Volume2}
                    label={isMuted ? "Muted" : "On"}
                    isActive={!isMuted}
                    onClick={toggleMute}
                  />
                </div>

                <div className="h-px bg-[var(--glass-2-border)] my-2" />
                
                {/* Accessibility Section */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-1">
                    Accessibility
                  </span>
                  <SettingsOption
                    icon={Sparkles}
                    label="High Contrast"
                    isActive={highContrast}
                    onClick={toggleContrast}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

// Desktop settings option
function SettingsOption({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative flex items-center gap-2.5 w-full px-3 py-2 rounded-xl transition-colors overflow-hidden",
        "text-sm font-medium whitespace-nowrap",
        isActive 
          ? "bg-[var(--chip-primary-bg)] border border-[var(--chip-primary-border)] text-[var(--chip-primary-text)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-1-fill)] border border-transparent"
      )}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{label}</span>
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--chip-primary-text)]"
        />
      )}
    </motion.button>
  );
}

// Mobile compact option
function MobileOption({ 
  icon: Icon, 
  label,
  isActive, 
  onClick 
}: { 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "p-2.5 rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center",
        isActive
          ? "bg-[var(--chip-primary-bg)] border border-[var(--chip-primary-border)] text-[var(--chip-primary-text)]"
          : "text-[var(--text-secondary)] active:text-[var(--text-primary)] active:bg-[var(--glass-1-fill)] border border-transparent"
      )}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </motion.button>
  );
}

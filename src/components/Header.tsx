"use client";

import Link from "next/link";
import { Home, User, Briefcase, FolderGit2, Layers } from "lucide-react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { SettingsMenu } from "@/components/SettingsMenu";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Process", href: "/#process", icon: Layers },
  { name: "Experience", href: "/#experience", icon: Briefcase },
  { name: "Projects", href: "/#projects", icon: FolderGit2 },
];

export function Header() {
  const [activeTab, setActiveTab] = useState("Home");
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, y: 0, w: 56, h: 56 });
  
  // Magnetic effect values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 400, damping: 30 });
  const springY = useSpring(my, { stiffness: 400, damping: 30 });

  // Track indicator position based on active/hover tab
  useEffect(() => {
    const activeEl = containerRef.current?.querySelector<HTMLElement>(`[data-tab="${hoverTab ?? activeTab}"]`);
    if (activeEl) {
      const rect = activeEl.getBoundingClientRect();
      const parentRect = containerRef.current?.getBoundingClientRect();
      if (parentRect) {
        setIndicator({
          x: rect.left - parentRect.left,
          y: rect.top - parentRect.top,
          w: rect.width,
          h: rect.height,
        });
      }
    }
  }, [activeTab, hoverTab]);

  // Magnetic cursor follow effect - memoized for performance
  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const moveX = ((x / rect.width) - 0.5) * 8;
    const moveY = ((y / rect.height) - 0.5) * 8;
    mx.set(moveX);
    my.set(moveY);
  }, [mx, my]);

  const resetMove = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);
  
  return (
    <motion.header
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.2 
      }}
      className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2 md:left-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 w-auto"
    >
      {/* Floating Blob Navigation — Glass-Lume Material */}
      <nav
        ref={containerRef}
        className={cn(
          "relative rounded-full px-2 py-2 md:px-2 md:py-3",
          "flex md:flex-col items-center gap-1",
          "backdrop-saturate-150 border border-[var(--glass-2-border)]",
          "shadow-lg dark:shadow-2xl"
        )}
        style={{ 
          filter: "url('#gooey')",
          background: "var(--glass-lume-fill)",
          backdropFilter: "blur(24px)",
        }}
        onMouseMove={handleMove}
        onMouseLeave={resetMove}
      >
        {/* Gooey Active Indicator — Subtle glow behind active item */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--neon-primary-end) 0%, transparent 70%)",
            filter: "blur(12px)",
            opacity: 0.4,
          }}
          animate={{
            left: indicator.x,
            top: indicator.y,
            width: indicator.w,
            height: indicator.h,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
          }}
        />

        {/* Logo / Home — Morphing blob shape with iridescence */}
        <Link
          href="/"
          data-tab="Home"
          onMouseEnter={() => setHoverTab("Home")}
          onMouseLeave={() => setHoverTab(null)}
          onClick={() => setActiveTab("Home")}
          className="relative p-2 rounded-full transition-all group"
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.9, scaleX: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className={cn(
              "relative z-10 w-10 h-10 rounded-full flex items-center justify-center",
              "text-white font-bold text-sm tracking-tight",
              "transition-shadow duration-300"
            )}
            style={{
              x: springX,
              y: springY,
              background: "var(--lum-grad-cyber-lime)",
            }}
          >
            CA
          </motion.div>
        </Link>

        <div className="h-4 w-[1px] bg-[var(--glass-2-border)] md:w-4 md:h-[1px] mx-1 md:mx-0 md:my-1" />

        {/* Nav Items — With magnetic effect */}
        <div className="flex md:flex-col items-center gap-0.5">
          {navItems.slice(1).map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              data-tab={item.name}
              onMouseEnter={() => setHoverTab(item.name)}
              onMouseLeave={() => setHoverTab(null)}
              onClick={() => setActiveTab(item.name)}
              className="relative p-2.5 rounded-full transition-all group"
              title={item.name}
            >
              <motion.div 
                style={{ x: springX, y: springY }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <item.icon
                  className={cn(
                    "relative z-10 w-5 h-5 transition-all duration-300",
                    activeTab === item.name
                      ? "text-[var(--neon-primary-end)]"
                      : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                  )}
                />
              </motion.div>
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-[var(--glass-2-border)] md:w-4 md:h-[1px] mx-1 md:mx-0 md:my-1" />

        <SettingsMenu />

        {/* Gooey filter */}
        <svg className="absolute inset-0 pointer-events-none opacity-0" width="0" height="0">
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </svg>
      </nav>
    </motion.header>
  );
}


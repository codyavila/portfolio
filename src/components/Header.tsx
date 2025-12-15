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
          "floating-blob backdrop-saturate-150"
        )}
        style={{ 
          filter: "url('#gooey')",
          background: "var(--glass-lume-fill)",
          backdropFilter: "blur(var(--glass-lume-blur))",
          boxShadow: `
            0 20px 50px -18px rgba(0,0,0,0.65),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
            0 0 40px -20px rgba(0, 255, 153, 0.3)
          `,
        }}
        onMouseMove={handleMove}
        onMouseLeave={resetMove}
      >
        {/* Gooey Active Indicator — Subtle glow behind active item */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,255,153,0.4) 0%, rgba(51,204,255,0.2) 70%, transparent 100%)",
            filter: "blur(12px)",
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

        {/* Logo / Home — Morphing blob shape */}
        <Link
          href="/"
          data-tab="Home"
          onMouseEnter={() => setHoverTab("Home")}
          onMouseLeave={() => setHoverTab(null)}
          onClick={() => setActiveTab("Home")}
          className="relative p-2 rounded-full transition-all group"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={cn(
              "relative z-10 w-10 h-10 rounded-full flex items-center justify-center",
              "text-[var(--lum-void-deep)] font-bold text-xs",
              "transition-shadow duration-300"
            )}
            style={{
              x: springX,
              y: springY,
              background: "var(--lum-grad-cyber-lime)",
              boxShadow: "0 0 20px rgba(204, 255, 0, 0.6)",
            }}
          >
            CA
          </motion.div>
        </Link>

        <div className="h-4 w-[1px] bg-white/10 md:w-4 md:h-[1px] mx-1 md:mx-0 md:my-1" />

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
                      ? "text-[var(--neon-primary-end)] drop-shadow-[0_0_12px_rgba(0,255,153,0.8)]"
                      : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  )}
                />
              </motion.div>
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-white/10 md:w-4 md:h-[1px] mx-1 md:mx-0 md:my-1" />

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


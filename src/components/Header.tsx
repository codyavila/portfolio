"use client";

import Link from "next/link";
import { Home, User, Briefcase, FolderGit2, Layers } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, y: 0, w: 56, h: 56 });
  
  // Magnetic effect values with smoother springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 300, damping: 25 });
  const springY = useSpring(my, { stiffness: 300, damping: 25 });

  // Ambient glow pulse
  const glowOpacity = useSpring(0.3, { stiffness: 100, damping: 20 });

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

  // Update glow on hover
  useEffect(() => {
    glowOpacity.set(isHovered ? 0.6 : 0.3);
  }, [isHovered, glowOpacity]);

  // Magnetic cursor follow effect
  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-settings-menu]')) {
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
  
  return (
    <motion.header
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: 0.3 
      }}
      className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2 md:left-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 w-auto"
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--neon-primary-end) 0%, transparent 70%)",
          filter: "blur(20px)",
          opacity: glowOpacity,
          scale: 1.2,
        }}
      />

      {/* Floating Blob Navigation */}
      <motion.nav
        ref={containerRef}
        className={cn(
          "relative rounded-full px-2 py-2 md:px-2 md:py-3",
          "flex md:flex-col items-center gap-1",
          "glass-2 glass-noise glass-noise-ghost",
          "shadow-lg dark:shadow-2xl",
          "backdrop-saturate-150",
          "border border-[var(--glass-2-border)]"
        )}
        onMouseMove={handleMove}
        onMouseLeave={resetMove}
        onMouseEnter={handleEnter}
        whileHover={{ 
          boxShadow: "0 0 40px -10px var(--neon-primary-end)",
        }}
        transition={{ duration: 0.3 }}
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
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
          }}
        />

        {/* Logo / Home */}
        <Link
          href="/"
          data-tab="Home"
          onMouseEnter={() => setHoverTab("Home")}
          onMouseLeave={() => setHoverTab(null)}
          onClick={() => setActiveTab("Home")}
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
            whileHover={{ opacity: 1, x: 0, scale: 1 }}
            className="hidden md:block absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg glass-2 text-xs font-medium text-[var(--text-primary)] whitespace-nowrap pointer-events-none"
          >
            Home
          </motion.div>
        </Link>

        <motion.div 
          className="h-4 w-[1px] bg-[var(--glass-2-border)] md:w-4 md:h-[1px] mx-1 md:mx-0 md:my-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
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
              onClick={() => setActiveTab(item.name)}
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
                whileHover={{ opacity: 1, x: 0, scale: 1 }}
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
          className="h-4 w-[1px] bg-[var(--glass-2-border)] md:w-4 md:h-[1px] mx-1 md:mx-0 md:my-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />

        <SettingsMenu />
      </motion.nav>
    </motion.header>
  );
}


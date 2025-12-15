"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useCallback, memo } from "react";

type GlowVariant = "cyber-lime" | "cotton-candy" | "solar-flare" | "aurora" | "none";

interface PortalCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  glow?: GlowVariant;
  enableTilt?: boolean;
  enableShimmer?: boolean;
}

const glowColors: Record<GlowVariant, string> = {
  "cyber-lime": "rgba(204, 255, 0, 0.4)",
  "cotton-candy": "rgba(255, 153, 204, 0.4)",
  "solar-flare": "rgba(255, 204, 0, 0.4)",
  "aurora": "rgba(0, 255, 153, 0.4)",
  "none": "transparent",
};

const PortalCardComponent = ({ 
  children, 
  className, 
  onClick, 
  delay = 0,
  glow = "aurora",
  enableTilt = true,
  enableShimmer = true,
}: PortalCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Tilt effect - reduced stiffness for smoother performance
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 25 };
  const springTiltX = useSpring(tiltX, springConfig);
  const springTiltY = useSpring(tiltY, springConfig);
  
  // Glow position for spotlight effect
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enableTilt) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Max tilt of 5 degrees as per spec
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = -((y / rect.height) - 0.5) * 10;
    
    tiltX.set(rotateX);
    tiltY.set(rotateY);
    
    // Update glow position
    glowX.set((x / rect.width) * 100);
    glowY.set((y / rect.height) * 100);
  }, [enableTilt, tiltX, tiltY, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  }, [tiltX, tiltY, glowX, glowY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Dynamic glow based on mouse position
  const glowStyle = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, ${glowColors[glow]}, transparent 40%)`
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -10, // Lift effect
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: delay,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "portal-card group relative overflow-hidden cursor-pointer",
        "rounded-3xl chromatic-edge iridescent",
        className
      )}
      style={{ 
        rotateX: enableTilt ? springTiltX : 0, 
        rotateY: enableTilt ? springTiltY : 0, 
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Glass-Prism Background */}
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "var(--glass-prism-fill)",
          backdropFilter: "blur(var(--glass-prism-blur))",
        }}
      />

      {/* Shimmer Border — Subtle gradient border */}
      {enableShimmer && (
        <div 
          className={cn(
            "absolute inset-0 rounded-3xl pointer-events-none z-10 transition-opacity duration-300 border",
            isHovered ? "opacity-100 border-[var(--neon-primary-end)]" : "opacity-100 border-[var(--glass-2-border)]"
          )}
        />
      )}

      {/* Spotlight Glow on hover */}
      <motion.div 
        className="absolute inset-0 rounded-3xl pointer-events-none z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glowStyle }}
      />

      {/* Rim Light (Top Highlight) - dark mode only */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none dark:block hidden"
        style={{
          boxShadow: `
            inset 0 1px 0 0 rgba(255, 255, 255, ${isHovered ? 0.5 : 0.2}),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05)
          `,
          transition: "box-shadow 0.4s ease",
        }}
      />

      {/* Category Glow Shadow (behind card) - reduced in light mode */}
      <motion.div
        className="absolute -inset-4 rounded-3xl -z-10 hidden dark:block"
        animate={{
          boxShadow: isHovered 
            ? `0 30px 60px -12px rgba(0,0,0,0.6), 0 0 60px -20px ${glowColors[glow]}`
            : "0 20px 40px -10px rgba(0,0,0,0.5)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </motion.div>
  );
};

// Title component with weight shift
export const PortalCardTitle = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h4 
      className={cn(
        "text-xl font-bold transition-all duration-300",
        "text-[var(--text-primary)]",
        "dark:drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]",
        "group-hover:text-[var(--neon-primary-end)]",
        className
      )}
    >
      {children}
    </h4>
  );
});
PortalCardTitle.displayName = "PortalCardTitle";

// Description component
export const PortalCardDescription = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <p 
      className={cn(
        "transition-colors duration-300 leading-relaxed",
        "text-[var(--text-secondary)]",
        "dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
        "group-hover:text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </p>
  );
});
PortalCardDescription.displayName = "PortalCardDescription";

// Export memoized PortalCard
export const PortalCard = memo(PortalCardComponent);
PortalCard.displayName = "PortalCard";

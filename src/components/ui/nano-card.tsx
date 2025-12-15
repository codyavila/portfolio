"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useCallback, useRef, useState, memo } from "react";

type GlowVariant = "cyber-lime" | "cotton-candy" | "solar-flare" | "aurora" | "none";

interface NanoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  glow?: GlowVariant;
}

const glowColors: Record<GlowVariant, string> = {
  "cyber-lime": "rgba(204, 255, 0, 0.5)",
  "cotton-candy": "rgba(255, 153, 204, 0.5)",
  "solar-flare": "rgba(255, 204, 0, 0.5)",
  "aurora": "rgba(0, 255, 153, 0.5)",
  "none": "transparent",
};

const NanoCardComponent = ({ children, className, onClick, delay = 0, glow = "aurora" }: NanoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position relative to card (0-100%)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  
  // 3D Tilt with spring physics (Luminous spec: max 5 degrees)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { stiffness: 350, damping: 25 };
  const springTiltX = useSpring(tiltX, springConfig);
  const springTiltY = useSpring(tiltY, springConfig);

  // Dynamic spotlight that follows the mouse
  const spotlightStyle = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(400px circle at ${x}% ${y}%, ${glowColors[glow]}, transparent 50%)`
  );

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Update spotlight position (0-100%)
    mouseX.set((x / rect.width) * 100);
    mouseY.set((y / rect.height) * 100);
    
    // Calculate 3D tilt (max 5deg each side per Luminous spec)
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = -((y / rect.height) - 0.5) * 10;
    tiltX.set(rotateX);
    tiltY.set(rotateY);
  }, [mouseX, mouseY, tiltX, tiltY]);

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
    mouseX.set(50);
    mouseY.set(50);
    setIsHovered(false);
  }, [tiltX, tiltY, mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      whileTap={{ scale: 0.97 }}
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
        "nano-card prism-card shimmer-border group relative overflow-hidden cursor-pointer iridescent chromatic-edge",
        className
      )}
      style={{ 
        rotateX: springTiltX, 
        rotateY: springTiltY, 
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Effect layers - separated to avoid ::before/::after conflicts */}
      <div className="shimmer-border-layer hidden dark:block" style={{ '--shimmer-angle': '0deg' } as React.CSSProperties} />
      <div className="chroma-red hidden dark:block" />
      <div className="chroma-cyan hidden dark:block" />
      <div className="iridescent-layer hidden dark:block" />
      <div className="iridescent-fresnel hidden dark:block" />

      {/* Spotlight glow that follows mouse */}
      <motion.div 
        className="absolute inset-0 rounded-[20px] pointer-events-none z-5 transition-opacity duration-300"
        style={{ background: spotlightStyle }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Rim Light (Top Highlight) - Fresnel-style edge glow */}
      <div 
        className="absolute inset-0 rounded-[24px] pointer-events-none dark:block hidden"
        style={{
          boxShadow: `
            inset 0 1px 0 0 rgba(255, 255, 255, ${isHovered ? 0.5 : 0.2}),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04)
          `,
          transition: "box-shadow 0.4s ease",
        }}
      />

      {/* Category Glow Shadow (behind card) - dark mode only */}
      <motion.div
        className="absolute -inset-3 rounded-[24px] -z-10 hidden dark:block"
        animate={{
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 60px -15px ${glowColors[glow]}`
            : "0 15px 30px -10px rgba(0,0,0,0.4)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const NanoCardTitle = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h4 className={cn(
      "text-lg font-bold tracking-tight transition-all duration-300",
      "text-[var(--text-primary)]",
      "dark:drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]",
      className
    )}>
      {children}
    </h4>
  );
});
NanoCardTitle.displayName = "NanoCardTitle";

export const NanoCardDescription = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <p className={cn(
      "text-sm leading-relaxed transition-colors duration-300",
      "text-[var(--text-secondary)]",
      "dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
      className
    )}>
      {children}
    </p>
  );
});
NanoCardDescription.displayName = "NanoCardDescription";

// Export memoized component
export const NanoCard = memo(NanoCardComponent);
NanoCard.displayName = "NanoCard";
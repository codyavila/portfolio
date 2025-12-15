"use client";

import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useCallback, memo } from "react";

type GlowVariant = "cyber-lime" | "cotton-candy" | "solar-flare" | "aurora" | "none";
type CardSize = "sm" | "md" | "lg";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  glow?: GlowVariant;
  /** Card size affects border radius: sm=16px, md=20px, lg=24px */
  size?: CardSize;
  /** Enable 3D tilt effect on hover */
  enableTilt?: boolean;
  /** Enable shimmer border animation */
  enableShimmer?: boolean;
  /** Enable mouse-following spotlight glow */
  enableSpotlight?: boolean;
  /** Enable iridescent coating effect */
  enableIridescence?: boolean;
  /** Enable chromatic aberration on edges */
  enableChromatic?: boolean;
  /** Enable glass noise texture overlay */
  enableNoise?: boolean;
  /** Custom border radius in pixels (overrides size) */
  borderRadius?: number;
  /** Additional motion props for the card */
  motionProps?: Omit<MotionProps, 'ref' | 'className' | 'style' | 'onClick'>;
}

const glowColors: Record<GlowVariant, string> = {
  "cyber-lime": "rgba(204, 255, 0, 0.25)",
  "cotton-candy": "rgba(255, 153, 204, 0.25)",
  "solar-flare": "rgba(255, 204, 0, 0.25)",
  "aurora": "rgba(0, 255, 153, 0.25)",
  "none": "transparent",
};

const sizeToRadius: Record<CardSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const GlassCardComponent = ({ 
  children, 
  className, 
  onClick, 
  delay = 0,
  glow = "aurora",
  size = "md",
  enableTilt = true,
  enableShimmer = true,
  enableSpotlight = true,
  enableIridescence = false,
  enableChromatic = false,
  enableNoise = false,
  borderRadius: customRadius,
  motionProps = {},
}: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate border radius
  const radius = customRadius ?? sizeToRadius[size];
  
  // 3D Tilt effect with spring physics (max 5 degrees)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { stiffness: 400, damping: 25, mass: 0.5 };
  const springTiltX = useSpring(tiltX, springConfig);
  const springTiltY = useSpring(tiltY, springConfig);
  
  // Spotlight glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springGlowConfig = { stiffness: 500, damping: 30 };
  const springGlowX = useSpring(glowX, springGlowConfig);
  const springGlowY = useSpring(glowY, springGlowConfig);

  // Shimmer border rotation
  const shimmerAngle = useMotionValue(0);
  
  useAnimationFrame((time) => {
    if (enableShimmer) {
      shimmerAngle.set((time * 0.045) % 360);
    }
  });

  // Dynamic spotlight style
  const spotlightStyle = useTransform(
    [springGlowX, springGlowY],
    ([x, y]) => `radial-gradient(350px circle at ${x}% ${y}%, ${glowColors[glow]}, transparent 50%)`
  );

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (enableTilt) {
      // Max tilt of 5 degrees
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = -((y / rect.height) - 0.5) * 10;
      tiltX.set(rotateX);
      tiltY.set(rotateY);
    }
    
    if (enableSpotlight) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      glowX.set(percentX);
      glowY.set(percentY);
    }
  }, [enableTilt, enableSpotlight, tiltX, tiltY, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
    // Don't reset glow position - let it fade out where cursor last was
    setIsHovered(false);
  }, [tiltX, tiltY]);

  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // Set glow position immediately where cursor enters (no spring animation on entry)
    if (ref.current && enableSpotlight) {
      const rect = ref.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      // Jump directly to position (bypass spring)
      glowX.set(percentX);
      glowY.set(percentY);
    }
    setIsHovered(true);
  }, [enableSpotlight, glowX, glowY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: delay,
      }}
      {...motionProps}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "glass-card group relative cursor-pointer",
        enableChromatic && "chromatic-edge",
        enableNoise && "glass-noise glass-noise-prism",
        className
      )}
      style={{ 
        ["--card-radius" as string]: `${radius}px`,
        borderRadius: `${radius}px`,
        rotateX: enableTilt ? springTiltX : 0, 
        rotateY: enableTilt ? springTiltY : 0, 
        transformStyle: "preserve-3d",
        perspective: "1000px",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Glass Background */}
      <div 
        className="absolute inset-0 border border-[var(--glass-2-border)] group-hover:border-[var(--neon-primary-end)]"
        style={{
          borderRadius: `${radius}px`,
          background: "var(--glass-prism-fill)",
          backdropFilter: "blur(var(--glass-prism-blur))",
          WebkitBackdropFilter: "blur(var(--glass-prism-blur))",
          transition: "border-color 0.3s ease",
        }}
      />

      {/* Shimmer Border Layer */}
      {enableShimmer && (
        <div 
          className="shimmer-border-layer hidden dark:block"
          style={{ 
            ["--shimmer-angle" as string]: '0deg',
            borderRadius: `${radius}px`,
          }} 
        />
      )}

      {/* Chromatic Aberration Layers */}
      {enableChromatic && (
        <>
          <div className="chroma-red hidden dark:block" style={{ borderRadius: `${radius}px` }} />
          <div className="chroma-cyan hidden dark:block" style={{ borderRadius: `${radius}px` }} />
        </>
      )}

      {/* Iridescent Layers */}
      {enableIridescence && (
        <>
          <div className="iridescent-layer hidden dark:block" style={{ borderRadius: `${radius}px` }} />
          <div className="iridescent-fresnel hidden dark:block" style={{ borderRadius: `${radius}px` }} />
        </>
      )}

      {/* Spotlight Glow */}
      {enableSpotlight && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-[5] transition-opacity duration-500"
          style={{ 
            background: spotlightStyle,
            borderRadius: `${radius}px`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Rim Light (Top Highlight) */}
      <div 
        className="absolute inset-0 pointer-events-none dark:block hidden"
        style={{
          borderRadius: `${radius}px`,
          boxShadow: `
            inset 0 1px 0 0 rgba(255, 255, 255, ${isHovered ? 0.6 : 0.25}),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05)
          `,
          transition: "box-shadow 0.4s ease",
        }}
      />

      {/* Category Glow Shadow (behind card) */}
      <motion.div
        className="absolute -inset-4 -z-10 hidden dark:block"
        style={{ borderRadius: `${radius + 8}px` }}
        animate={{
          boxShadow: isHovered 
            ? `0 30px 60px -12px rgba(0,0,0,0.6), 0 0 80px -20px ${glowColors[glow]}`
            : "0 20px 40px -10px rgba(0,0,0,0.5)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-20 h-full" style={{ borderRadius: `${radius}px` }}>
        {children}
      </div>
    </motion.div>
  );
};

// Memoized export
export const GlassCard = memo(GlassCardComponent);
GlassCard.displayName = "GlassCard";

// Convenience presets
export const GlassCardSm = memo((props: Omit<GlassCardProps, 'size'>) => (
  <GlassCard {...props} size="sm" />
));
GlassCardSm.displayName = "GlassCardSm";

export const GlassCardLg = memo((props: Omit<GlassCardProps, 'size'>) => (
  <GlassCard {...props} size="lg" />
));
GlassCardLg.displayName = "GlassCardLg";

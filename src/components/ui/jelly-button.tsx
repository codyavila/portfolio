"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type GradientVariant = "cyber-lime" | "cotton-candy" | "solar-flare";

interface JellyButtonProps {
  children: React.ReactNode;
  variant?: GradientVariant;
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  glowIntensity?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const gradientStyles: Record<GradientVariant, { gradient: string; glow: string; textColor: string }> = {
  "cyber-lime": {
    gradient: "linear-gradient(135deg, #CCFF00 0%, #00FF99 100%)",
    glow: "rgba(0, 255, 153, 0.6)",
    textColor: "#0f0d12",
  },
  "cotton-candy": {
    gradient: "linear-gradient(135deg, #FF99CC 0%, #33CCFF 100%)",
    glow: "rgba(255, 153, 204, 0.6)",
    textColor: "#0f0d12",
  },
  "solar-flare": {
    gradient: "linear-gradient(135deg, #FFCC00 0%, #FF3366 100%)",
    glow: "rgba(255, 51, 102, 0.6)",
    textColor: "#0f0d12",
  },
};

const sizeStyles = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-4 text-base",
  lg: "px-10 py-5 text-lg",
};

export const JellyButton = React.forwardRef<HTMLButtonElement, JellyButtonProps>(
  ({ children, variant = "cyber-lime", size = "md", href, className, glowIntensity = 1, onClick, disabled }, ref) => {
    const styles = gradientStyles[variant];
    
    // Magnetic effect — button follows cursor slightly
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springX = useSpring(mx, { stiffness: 400, damping: 25 });
    const springY = useSpring(my, { stiffness: 400, damping: 25 });

    // Gradient rotation on hover
    const gradientRotation = useMotionValue(135);
    const springRotation = useSpring(gradientRotation, { stiffness: 100, damping: 20 });
    const animatedGradient = useTransform(
      springRotation,
      (r) => `linear-gradient(${r}deg, ${styles.gradient.match(/#[A-Fa-f0-9]{6}/g)?.join(", ")})`
    );

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const moveX = ((x / rect.width) - 0.5) * 16;
      const moveY = ((y / rect.height) - 0.5) * 16;
      mx.set(moveX);
      my.set(moveY);
      
      // Rotate gradient based on mouse position
      const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI);
      gradientRotation.set(angle + 90);
    };

    const handleMouseLeave = () => {
      mx.set(0);
      my.set(0);
      gradientRotation.set(135);
    };

    const buttonContent = (
      <motion.button
        ref={ref}
        // The Squish — scale(0.95, 0.9) on click (wider and shorter)
        whileHover={{ 
          scale: 1.05, 
          rotate: 1,
        }}
        whileTap={{ 
          scale: 0.92, 
          scaleX: 1.1, 
          rotate: -0.5,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 10 
        }}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-full font-semibold tracking-wide cursor-pointer overflow-hidden",
          "transition-shadow duration-300 chromatic-edge",
          sizeStyles[size],
          className
        )}
        style={{
          x: springX,
          y: springY,
          background: styles.gradient,
          color: styles.textColor,
          boxShadow: `0 0 ${20 * glowIntensity}px ${styles.glow}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        disabled={disabled}
      >
        {/* Animated gradient overlay - only visible on hover */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity"
          style={{ background: animatedGradient }}
        />
        
        {/* Content */}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );

    if (href) {
      return (
        <a href={href} className="no-underline inline-block">
          {buttonContent}
        </a>
      );
    }

    return buttonContent;
  }
);

JellyButton.displayName = "JellyButton";

// Secondary "Ghost" Button — Glass material
interface GhostButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  accentColor?: GradientVariant;
  onClick?: () => void;
  disabled?: boolean;
}

export const GhostButton = React.forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ children, size = "md", href, className, accentColor, onClick, disabled }, ref) => {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springX = useSpring(mx, { stiffness: 400, damping: 25 });
    const springY = useSpring(my, { stiffness: 400, damping: 25 });

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mx.set(((x / rect.width) - 0.5) * 12);
      my.set(((y / rect.height) - 0.5) * 12);
    };

    const handleMouseLeave = () => {
      mx.set(0);
      my.set(0);
    };

    const accentStyles = accentColor ? gradientStyles[accentColor] : null;

    const buttonContent = (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full font-medium cursor-pointer",
          "bg-[var(--glass-1-fill)] backdrop-blur-md",
          "border border-[var(--glass-2-border)] hover:border-[var(--hover-accent)]",
          "text-[var(--text-primary)]",
          "transition-colors duration-300",
          sizeStyles[size],
          className
        )}
        style={{
          x: springX,
          y: springY,
          boxShadow: accentStyles 
            ? `0 0 20px ${accentStyles.glow.replace("0.6", "0.2")}` 
            : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        disabled={disabled}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );

    if (href) {
      return (
        <a href={href} className="no-underline inline-block">
          {buttonContent}
        </a>
      );
    }

    return buttonContent;
  }
);

GhostButton.displayName = "GhostButton";

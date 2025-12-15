"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from "framer-motion";
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
  /** Enable idle heartbeat breathing animation (per Luminous spec) */
  breathing?: boolean;
}

// Check if high contrast mode is enabled
const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = React.useState(false);
  
  React.useEffect(() => {
    const checkContrast = () => {
      setIsHighContrast(document.documentElement.dataset.contrast === "high");
    };
    checkContrast();
    
    // Watch for changes
    const observer = new MutationObserver(checkContrast);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-contrast"] });
    return () => observer.disconnect();
  }, []);
  
  return isHighContrast;
};

const gradientStyles: Record<GradientVariant, { gradient: string; colors: string[]; glow: string; textColor: string }> = {
  "cyber-lime": {
    gradient: "linear-gradient(135deg, #CCFF00 0%, #00FF99 100%)",
    colors: ["#CCFF00", "#00FF99"],
    glow: "rgba(0, 255, 153, 0.6)",
    textColor: "#0f0d12",
  },
  "cotton-candy": {
    gradient: "linear-gradient(135deg, #FF99CC 0%, #33CCFF 100%)",
    colors: ["#FF99CC", "#33CCFF"],
    glow: "rgba(255, 153, 204, 0.6)",
    textColor: "#0f0d12",
  },
  "solar-flare": {
    gradient: "linear-gradient(135deg, #FFCC00 0%, #FF3366 100%)",
    colors: ["#FFCC00", "#FF3366"],
    glow: "rgba(255, 51, 102, 0.6)",
    textColor: "#0f0d12",
  },
};

// High contrast variants - solid colors, no gradients
const highContrastStyles: Record<GradientVariant, { background: string; textColor: string; border: string }> = {
  "cyber-lime": {
    background: "#00ff00",
    textColor: "#000000",
    border: "#000000",
  },
  "cotton-candy": {
    background: "#ff00ff",
    textColor: "#000000",
    border: "#000000",
  },
  "solar-flare": {
    background: "#ffff00",
    textColor: "#000000",
    border: "#000000",
  },
};

const sizeStyles = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-4 text-base",
  lg: "px-10 py-5 text-lg",
};

export const JellyButton = React.forwardRef<HTMLButtonElement, JellyButtonProps>(
  ({ 
    children, 
    variant = "cyber-lime", 
    size = "md", 
    href, 
    className, 
    glowIntensity = 1, 
    onClick, 
    disabled,
    breathing = false,
  }, ref) => {
    const styles = gradientStyles[variant];
    const highContrast = highContrastStyles[variant];
    const isHighContrast = useHighContrast();
    
    // Magnetic effect — button follows cursor slightly
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springX = useSpring(mx, { stiffness: 400, damping: 25 });
    const springY = useSpring(my, { stiffness: 400, damping: 25 });

    // Gradient rotation on hover (Luminous spec: gradient rotates on hover)
    const gradientRotation = useMotionValue(135);
    const springRotation = useSpring(gradientRotation, { stiffness: 100, damping: 20 });
    const animatedGradient = useTransform(
      springRotation,
      (r) => `linear-gradient(${r}deg, ${styles.colors[0]}, ${styles.colors[1]})`
    );

    // Heartbeat breathing animation (Luminous spec: opacity 0.9→1.0, scale pulse every 4s)
    const breatheOpacity = useMotionValue(1);
    const breatheScale = useMotionValue(1);
    
    useAnimationFrame((time) => {
      // Disable breathing in high contrast mode
      if (breathing && !disabled && !isHighContrast) {
        // 4 second cycle = 0.25 Hz = time * 0.00025 * 2π
        const phase = (time * 0.00157) % (Math.PI * 2); // ~4s cycle
        breatheOpacity.set(0.9 + Math.sin(phase) * 0.1);
        breatheScale.set(1 + Math.sin(phase) * 0.015);
      } else {
        breatheOpacity.set(1);
        breatheScale.set(1);
      }
    });

    // Glow intensity pulsing with breath (disabled in high contrast)
    const animatedGlow = useTransform(
      breatheOpacity,
      (opacity) => isHighContrast ? "none" : `0 0 ${20 * glowIntensity * opacity}px ${styles.glow}`
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
        // The Squish — scale(0.95, 0.9) on click (wider and shorter) per Luminous spec
        whileHover={{ 
          scale: 1.05, 
          rotate: 1,
        }}
        whileTap={{ 
          // Squash and stretch: wider (1.1x) and shorter (0.9y)
          scale: 0.9, 
          scaleX: 1.1, 
          scaleY: 0.85,
          rotate: -0.5,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 10 
        }}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-full font-semibold tracking-wide cursor-pointer overflow-hidden",
          "transition-shadow duration-300",
          !isHighContrast && "chromatic-edge",
          sizeStyles[size],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={{
          x: isHighContrast ? 0 : springX,
          y: isHighContrast ? 0 : springY,
          scale: breatheScale,
          opacity: breatheOpacity,
          background: isHighContrast ? highContrast.background : styles.gradient,
          color: isHighContrast ? highContrast.textColor : styles.textColor,
          boxShadow: animatedGlow,
          border: isHighContrast ? `2px solid ${highContrast.border}` : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        disabled={disabled}
      >
        {/* Animated gradient overlay - visible on hover, follows mouse (disabled in high contrast) */}
        {!isHighContrast && (
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300"
            style={{ background: animatedGradient }}
          />
        )}
        
        {/* Shine/glare effect on hover (disabled in high contrast) */}
        {!isHighContrast && (
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            initial={{ backgroundPosition: "200% 0" }}
            whileHover={{ backgroundPosition: "-200% 0" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
        
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

// Secondary "Ghost" Button — Glass material with breathing
interface GhostButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  accentColor?: GradientVariant;
  onClick?: () => void;
  disabled?: boolean;
  breathing?: boolean;
}

export const GhostButton = React.forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ children, size = "md", href, className, accentColor, onClick, disabled, breathing = false }, ref) => {
    const isHighContrast = useHighContrast();
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springX = useSpring(mx, { stiffness: 400, damping: 25 });
    const springY = useSpring(my, { stiffness: 400, damping: 25 });

    // Subtle breathing for ghost buttons when enabled (disabled in high contrast)
    const breatheOpacity = useMotionValue(1);
    
    useAnimationFrame((time) => {
      if (breathing && !disabled && !isHighContrast) {
        const phase = (time * 0.00157) % (Math.PI * 2);
        breatheOpacity.set(0.95 + Math.sin(phase) * 0.05);
      } else {
        breatheOpacity.set(1);
      }
    });

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isHighContrast) return;
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
        whileHover={{ scale: isHighContrast ? 1 : 1.03 }}
        whileTap={{ scale: isHighContrast ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full font-medium cursor-pointer",
          "bg-[var(--glass-1-fill)]",
          !isHighContrast && "backdrop-blur-md",
          "border-2 border-[var(--glass-2-border)] hover:border-[var(--hover-accent)]",
          "text-[var(--text-primary)]",
          "transition-colors duration-300",
          !isHighContrast && "shimmer-border iridescent",
          disabled && "opacity-50 cursor-not-allowed",
          sizeStyles[size],
          className
        )}
        style={{
          x: isHighContrast ? 0 : springX,
          y: isHighContrast ? 0 : springY,
          opacity: breatheOpacity,
          boxShadow: (accentStyles && !isHighContrast)
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

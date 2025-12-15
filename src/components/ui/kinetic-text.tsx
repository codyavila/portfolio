"use client";

import { motion, useTransform, MotionProps } from "framer-motion";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

interface KineticTextProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  velocityFactor?: number; // Adjust how much it skews
}

// Map of motion components to avoid creating during render
const motionComponents = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
} as const;

export function KineticText({
  children,
  className,
  as: Component = "div",
  velocityFactor = 0.5, // Default factor
  style,
  ...props
}: KineticTextProps) {
  const velocity = useScrollVelocity();
  
  // Skew based on velocity
  // Max skew of -10deg as per spec
  // We map velocity range [-1000, 1000] to skew [-10, 10] (inverted as per spec "leans forward")
  // "Leans forward" usually means if scrolling down (positive velocity), text skews back? 
  // Or "leans into the wind"?
  // Spec says: Scroll Velocity Max -> skewX(-10deg).
  // Let's assume positive velocity (scrolling down) -> negative skew.
  
  const skewX = useTransform(
    velocity, 
    [-2000, 2000], 
    [-10 * velocityFactor, 10 * velocityFactor]
  );

  // Get the motion component from our pre-defined map
  const MotionComponent = useMemo(() => motionComponents[Component], [Component]);

  return (
    <MotionComponent
      className={cn("will-change-transform origin-bottom", className)}
      style={{ 
        skewX,
        ...style 
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

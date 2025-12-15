"use client";

import { motion, useTransform, MotionProps } from "framer-motion";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { cn } from "@/lib/utils";
import React from "react";

interface KineticTextProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  velocityFactor?: number; // Adjust how much it skews
}

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

  // We need to cast Component to "any" or use motion(Component) if it's a custom component,
  // but for standard HTML tags, motion.div, motion.h1 etc work.
  // Since we want to support dynamic tags, we can use motion.create(Component) or just switch.
  
  const MotionComponent = motion(Component as any);

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

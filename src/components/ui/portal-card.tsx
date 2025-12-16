"use client";

import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { GlassCard } from "./glass-card";

type GlowVariant = "cyber-lime" | "cotton-candy" | "solar-flare" | "aurora" | "none";

interface PortalCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  glow?: GlowVariant;
  enableTilt?: boolean;
  enableShimmer?: boolean;
  /** Enable glass noise texture overlay */
  enableNoise?: boolean;
  /** Enable iridescent coating effect */
  enableIridescence?: boolean;
  /** Whether the card should react to hover/tap interactions. Default: true */
  interactive?: boolean;
}

const PortalCardComponent = ({ 
  children, 
  className, 
  onClick, 
  delay = 0,
  glow = "aurora",
  enableTilt = true,
  enableShimmer = true,
  enableNoise = true,
  enableIridescence = true,
  interactive = true,
}: PortalCardProps) => {
  return (
    <GlassCard
      size="lg"
      delay={delay}
      glow={glow}
      onClick={onClick}
      enableTilt={enableTilt}
      enableShimmer={enableShimmer}
      enableNoise={enableNoise}
      enableIridescence={enableIridescence}
      enableChromatic={true}
      interactive={interactive}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </GlassCard>
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

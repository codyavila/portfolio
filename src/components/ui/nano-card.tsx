"use client";

import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { GlassCard } from "./glass-card";

type GlowVariant = "cyber-lime" | "cotton-candy" | "solar-flare" | "aurora" | "none";

interface NanoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  glow?: GlowVariant;
}

const NanoCardComponent = ({ children, className, onClick, delay = 0, glow = "aurora" }: NanoCardProps) => {
  return (
    <GlassCard
      size="md"
      delay={delay}
      glow={glow}
      onClick={onClick}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </GlassCard>
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

export const NanoCard = memo(NanoCardComponent);
NanoCard.displayName = "NanoCard";
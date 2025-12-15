"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface NanoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NanoCard = ({ children, className, onClick }: NanoCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        y: -4, 
        scale: 1.01,
        boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1), inset 0 0 0 1px var(--glass-border-highlight)"
      }}
      initial={{ 
        boxShadow: "0 4px 24px -1px rgba(0, 0, 0, 0.05), inset 0 0 0 1px var(--glass-border)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-base)] backdrop-blur-2xl",
        "cursor-pointer",
        className
      )}
    >
      {/* Inner Glow Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--glass-elevated)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const NanoCardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h3 className={cn("text-xl font-bold text-[var(--text-primary)] tracking-tight", className)}>
      {children}
    </h3>
  );
};

export const NanoCardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <p className={cn("text-sm text-[var(--text-secondary)] leading-relaxed dark:mix-blend-plus-lighter", className)}>
      {children}
    </p>
  );
};

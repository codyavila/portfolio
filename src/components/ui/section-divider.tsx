"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "gradient" | "dots" | "glow";
}

export const SectionDivider = ({ 
  className,
  variant = "gradient" 
}: SectionDividerProps) => {
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-3 py-8", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[var(--text-tertiary)]"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div className={cn("relative py-12 flex items-center justify-center", className)}>
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: "radial-gradient(circle, var(--neon-primary-end) 0%, transparent 70%)",
            filter: "blur(40px)",
            opacity: 0.15,
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--glass-2-border)] to-transparent" />
      </div>
    );
  }

  // Default gradient variant
  return (
    <div className={cn("relative py-8 flex items-center justify-center max-w-5xl mx-auto", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--glass-2-border)] to-transparent" />
      <motion.div 
        className="mx-4 h-2 w-2 rounded-full"
        style={{
          background: "linear-gradient(135deg, var(--neon-primary-start), var(--neon-primary-end))",
          boxShadow: "0 0 10px var(--neon-primary-end)",
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--glass-2-border)] to-transparent" />
    </div>
  );
};

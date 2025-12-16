"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface BlogCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BlogCard({ children, className }: BlogCardProps) {
  return (
    <div 
      className={cn(
        "relative w-full rounded-[24px] md:rounded-[32px]",
        // Light mode: Clean paper-like surface with subtle depth
        "bg-white/90 border border-zinc-200 shadow-sm",
        // Dark mode: Deep, rich background (more opaque than standard glass)
        "dark:bg-[#0c0c0e]/90 dark:border-white/10 dark:shadow-2xl",
        // Blur for context but high readability
        "backdrop-blur-xl",
        className
      )}
    >
      {/* Subtle top highlight for depth */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

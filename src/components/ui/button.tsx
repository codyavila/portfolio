"use client";

import * as React from "react";
import { motion, HTMLMotionProps, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", href, className, ...props }, ref) => {
    
    // "Photon" Actions
    const variants = {
      primary: cn(
        "relative overflow-hidden",
        "bg-[var(--neon-primary-start)] text-[var(--lum-void-deep)] font-semibold tracking-wide",
        "shadow-[0_0_22px_-6px_rgba(0,255,153,0.8)]",
        "before:absolute before:inset-0 before:bg-[var(--lum-grad-cyber-lime)] before:bg-[length:200%_200%] before:animate-[gradient-xy_18s_ease_infinite] before:-z-10",
        "border border-transparent"
      ),
      secondary: cn(
        "bg-transparent",
        "border border-white/25",
        "backdrop-blur-[6px]",
        "text-[var(--text-primary)]",
        "hover:bg-white/5"
      ),
    };

    const Component = motion.button;

      const mx = useMotionValue(0);
      const my = useMotionValue(0);

      const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const moveX = ((x / rect.width) - 0.5) * 16;
        const moveY = ((y / rect.height) - 0.5) * 16;
        mx.set(moveX);
        my.set(moveY);
      };

      const handleMouseLeave = () => {
        mx.set(0);
        my.set(0);
      };

    const content = (
      <Component
        ref={ref}
        whileHover={{ scale: 1.05, rotate: 0.5, transition: { type: "spring", stiffness: 400, damping: 18 } }}
        whileTap={{ scale: 0.92, scaleX: 1.08, rotate: -0.5, transition: { type: "spring", stiffness: 520, damping: 24 } }}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-8 py-4 text-base transition-[filter,transform] cursor-pointer",
          "[filter:drop-shadow(0_0_12px_rgba(0,255,153,0.4))]",
          "active:scale-95",
          "heartbeat",
          variants[variant],
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: mx, y: my, backgroundSize: "200% 200%" }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </Component>
    );

    if (href) {
      return (
        <a href={href} className="no-underline">
          {content}
        </a>
      );
    }

    return content;
  }
);

Button.displayName = "Button";

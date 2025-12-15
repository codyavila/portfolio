"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
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
        // Fill: Live gradient mesh (simulated with gradient)
        "bg-gradient-to-br from-[var(--neon-primary-start)] via-[var(--neon-primary-end)] to-[var(--neon-primary-start)] bg-[length:200%_200%]",
        "animate-gradient-xy", // Assuming we might add this animation, or just rely on hover
        // Glow: Drop-shadow matching dominant color
        "shadow-[0_0_20px_-5px_var(--neon-primary-start)]",
        // Text
        "text-white font-semibold tracking-wide",
        "border-none"
      ),
      secondary: cn(
        // Fill: Transparent
        "bg-transparent",
        // Border: 1px solid rgba(255,255,255,0.2)
        "border border-white/20",
        // Backdrop: blur(4px)
        "backdrop-blur-[4px]",
        "text-[var(--text-primary)]",
        "hover:bg-white/5"
      ),
    };

    const Component = motion.button;

    const content = (
      <Component
        ref={ref}
        // Spring Config: "Pop" (Mass: 1, Tension: 1200, Friction: 50)
        whileHover={{ scale: 1.02, fontWeight: 550 }} // Optical compression on press/hover mentioned in spec
        whileTap={{ scale: 0.95, fontWeight: 550 }}
        transition={{ type: "spring", mass: 1, stiffness: 1200, damping: 50 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-8 py-4 text-base transition-all cursor-pointer",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
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

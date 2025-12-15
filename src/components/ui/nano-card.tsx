"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MouseContext } from "./bento-grid";

interface NanoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

export const NanoCard = ({ children, className, onClick, delay = 0 }: NanoCardProps) => {
  const mouseContext = useContext(MouseContext);
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  useEffect(() => {
    if (ref.current) {
      const updatePosition = () => {
        if (ref.current) {
            if (ref.current.offsetParent) {
                 setPosition({
                    left: ref.current.offsetLeft,
                    top: ref.current.offsetTop
                });
            }
        }
      };
      
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, []);

  let borderMask = useMotionTemplate``;
  
  if (mouseContext) {
      const { mouseX, mouseY } = mouseContext;
      borderMask = useMotionTemplate`radial-gradient(
        250px circle at calc(${mouseX}px - ${position.left}px) calc(${mouseY}px - ${position.top}px),
        white,
        transparent
      )`;
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10; // max 5deg each side
    const rotateX = -((y / rect.height) - 0.5) * 10;
    tiltX.set(rotateX);
    tiltY.set(rotateY);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ 
        type: "spring", 
        mass: 1, 
        stiffness: 1200, 
        damping: 50,
        opacity: { duration: 0.5, delay: delay },
        y: { type: "spring", stiffness: 100, damping: 20, delay: delay }
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "prism-card shimmer-border group relative overflow-hidden cursor-pointer iridescent chromatic-edge",
        className
      )}
      style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
    >
      {/* Torch Effect (Border Reveal) - Only if in BentoGrid */}
      {mouseContext && (
          <motion.div 
            className="absolute inset-0 border-2 border-transparent rounded-[24px] pointer-events-none z-20"
            style={{ 
                maskImage: borderMask,
                WebkitMaskImage: borderMask,
                borderColor: "rgba(255,255,255,0.5)"
            }}
          />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const NanoCardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h4 className={cn("text-title-m font-bold text-[var(--text-primary)] group-hover:text-[var(--neon-primary-end)] transition-colors on-glass", className)}>
      {children}
    </h4>
  );
};

export const NanoCardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <p className={cn("text-body-m text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors on-glass", className)}>
      {children}
    </p>
  );
};

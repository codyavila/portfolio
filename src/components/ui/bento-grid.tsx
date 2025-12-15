"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// Context to share mouse position
export const MouseContext = React.createContext<{
  mouseX: any;
  mouseY: any;
} | null>(null);

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Dynamic gap based on scroll velocity (Parallax breathing)
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const gap = useTransform(smoothVelocity, [-2000, 0, 2000], ["32px", "24px", "32px"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <MouseContext.Provider value={{ mouseX, mouseY }}>
      <motion.div
        className={cn(
          "grid grid-cols-4 md:grid-cols-12 gap-6 max-w-7xl mx-auto relative",
          className
        )}
        style={{ gap }}
        onMouseMove={handleMouseMove}
      >
        {children}
      </motion.div>
    </MouseContext.Provider>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  colSpan = 4, // Default to 4 columns (1/3 on desktop, full on mobile)
  rowSpan = 1,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}) => {
  const { mouseX, mouseY } = React.useContext(MouseContext) || { mouseX: 0, mouseY: 0 };
  const ref = useRef<HTMLDivElement>(null);
  
  // We need to calculate the position of this item relative to the grid
  // But since we can't easily get that reactively without layout effects,
  // we'll use a simpler approach: 
  // The mask is applied to a "border" layer.
  // Actually, let's use the CSS variable approach for the mask on the item itself,
  // but we need the item's position.
  
  // Alternative: Just pass the grid-relative mouse coordinates and let CSS calc() handle it?
  // No, CSS doesn't know the element's offset.
  
  // Let's use the "Spotlight" effect where the mouse is tracked *per card* for simplicity and performance,
  // unless we really need the "nearby cards" effect.
  // The "nearby cards" effect is best done by having a single large radial gradient on the PARENT
  // that masks a "border overlay" grid.
  
  // Let's try the "Border Overlay" approach.
  // But `BentoGridItem` is a child.
  
  // Okay, I'll implement the "Torch" effect using the `motion` values and `useMotionTemplate`.
  // Each card will track its own position relative to the grid.
  
  const [position, setPosition] = useState({ left: 0, top: 0 });
  
  useEffect(() => {
    if (ref.current) {
      const updatePosition = () => {
        if (ref.current) {
            // We need the offset relative to the grid container (which is the offsetParent usually)
            setPosition({
                left: ref.current.offsetLeft,
                top: ref.current.offsetTop
            });
        }
      };
      
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, []);

  // Calculate local mouse position
  // localX = mouseX - position.left
  // But mouseX is a MotionValue.
  
  const maskImage = useMotionTemplate`radial-gradient(
    300px circle at calc(${mouseX}px - ${position.left}px) calc(${mouseY}px - ${position.top}px),
    var(--neon-primary-start),
    transparent
  )`;
  
  const borderMask = useMotionTemplate`radial-gradient(
    150px circle at calc(${mouseX}px - ${position.left}px) calc(${mouseY}px - ${position.top}px),
    white,
    transparent
  )`;

  // Static class mappings for Tailwind to detect at build time
  const colSpanClasses: Record<number, string> = {
    1: "col-span-4 md:col-span-1",
    2: "col-span-4 md:col-span-2",
    3: "col-span-4 md:col-span-3",
    4: "col-span-4 md:col-span-4",
    5: "col-span-4 md:col-span-5",
    6: "col-span-4 md:col-span-6",
    7: "col-span-4 md:col-span-7",
    8: "col-span-4 md:col-span-8",
    9: "col-span-4 md:col-span-9",
    10: "col-span-4 md:col-span-10",
    11: "col-span-4 md:col-span-11",
    12: "col-span-4 md:col-span-12",
  };

  const rowSpanClasses: Record<number, string> = {
    1: "",
    2: "row-span-2",
    3: "row-span-3",
    4: "row-span-4",
    5: "row-span-5",
    6: "row-span-6",
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-[24px] group/bento overflow-hidden",
        colSpanClasses[colSpan] || "col-span-4 md:col-span-4",
        rowSpanClasses[rowSpan] || "",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Base Glass Layer */}
      <div className="absolute inset-0 bg-[var(--glass-1-fill)] backdrop-blur-[var(--glass-1-blur)] border border-[var(--glass-1-border)] rounded-[24px]" />
      
      {/* Torch Effect (Border Reveal) */}
      <motion.div 
        className="absolute inset-0 border-2 border-transparent rounded-[24px] pointer-events-none z-20"
        style={{ 
            maskImage: borderMask,
            WebkitMaskImage: borderMask,
            borderColor: "rgba(255,255,255,0.5)"
        }}
      />
      
      {/* Hover Glow (Inner) */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
            background: useMotionTemplate`radial-gradient(
                400px circle at calc(${mouseX}px - ${position.left}px) calc(${mouseY}px - ${position.top}px),
                rgba(94, 96, 206, 0.15),
                transparent
            )`
        }}
      />

      {/* Content */}
      <div className="relative z-30 p-6 h-full flex flex-col justify-between">
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-300">
            {icon}
            <div className="font-sans font-bold text-[var(--text-primary)] mb-2 mt-2 text-title-m">
            {title}
            </div>
            <div className="font-sans font-normal text-[var(--text-secondary)] text-body-s">
            {description}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

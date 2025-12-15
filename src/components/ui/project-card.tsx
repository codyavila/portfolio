"use client";

import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const ProjectCard = ({ title, description, link, icon, className, gradient = "from-[var(--neon-primary-start)]/10 to-[var(--neon-secondary-end)]/10" }: ProjectCardProps) => {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = -((y / rect.height) - 0.5) * 8;
    tiltX.set(rotateX);
    tiltY.set(rotateY);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <Link href={link} className={cn("block w-full h-full", className)}>
      {/* Prism Card Structure */}
      <motion.div
        whileHover={{ y: -12, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", mass: 1, stiffness: 1200, damping: 50 }} // "Pop" physics
        className="prism-card shimmer-border group relative h-full overflow-hidden p-8 flex flex-col justify-between"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shimmer effect layers */}
        <div className="shimmer-border-layer hidden dark:block" style={{ '--shimmer-angle': '0deg' } as React.CSSProperties} />
        
        {/* Gradient Background on Hover (Optional extra layer) */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none", gradient)} />
        
        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="p-4 rounded-2xl bg-white/5 text-[var(--neon-primary-end)] shadow-inner border border-white/10"
                >
                    {icon}
                </motion.div>
                <div className="rounded-full p-2 bg-transparent group-hover:bg-white/10 transition-colors border border-transparent group-hover:border-white/10">
                    <ArrowRight className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
            </div>

            {/* Content */}
            <div>
                <h3 className="text-title-l text-[var(--text-primary)] mb-3 group-hover:text-[var(--hover-accent)] transition-colors font-bold">
                  {title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-body-m group-hover:text-[var(--text-primary)] transition-colors">
                  {description}
                </p>
            </div>
        </div>
      </motion.div>
    </Link>
  );
};

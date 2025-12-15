"use client";

import { motion } from "framer-motion";
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

export const ProjectCard = ({ title, description, link, icon, className, gradient = "from-primary/10 to-secondary/10" }: ProjectCardProps) => {
  return (
    <Link href={link} className={cn("block w-full h-full", className)}>
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full overflow-hidden rounded-[2rem] bg-surface-variant/30 border border-outline-variant/20 p-8 transition-[background-color,box-shadow,border-color] duration-300 hover:shadow-xl hover:bg-surface-variant/50"
      >
        {/* Gradient Background on Hover */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100", gradient)} />
        
        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="p-4 rounded-2xl bg-primary-container text-on-primary-container shadow-sm"
                >
                    {icon}
                </motion.div>
                <div className="rounded-full p-2 bg-transparent group-hover:bg-surface/20 transition-colors">
                    <ArrowRight className="w-6 h-6 text-outline group-hover:text-on-surface -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
            </div>

            {/* Content */}
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed font-medium group-hover:text-on-surface transition-colors">
                  {description}
                </p>
            </div>
        </div>
      </motion.div>
    </Link>
  );
};

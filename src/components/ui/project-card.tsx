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

export const ProjectCard = ({ title, description, link, icon, className, gradient = "from-blue-500/20 to-purple-500/20" }: ProjectCardProps) => {
  return (
    <Link href={link} className={cn("block w-full h-full", className)}>
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group relative h-full overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/80 shadow-sm hover:shadow-xl dark:shadow-none transition-shadow duration-300"
      >
        {/* Gradient Background on Hover */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", gradient)} />
        
        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {icon}
                </div>
                <div className="rounded-full p-2 bg-transparent group-hover:bg-white/20 dark:group-hover:bg-black/20 transition-colors">
                    <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
            </div>

            {/* Content */}
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                  {description}
                </p>
            </div>
        </div>
      </motion.div>
    </Link>
  );
};

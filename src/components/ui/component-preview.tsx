"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play, Code, Eye } from "lucide-react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * ComponentPreview — Interactive "Try Me" component wrapper for MDX
 * 
 * Wraps components in a styled preview container with a header indicating
 * it's interactive. Used in blog posts to demonstrate components.
 */
export function ComponentPreview({ 
  children, 
  title = "Try it out",
  description,
  className 
}: ComponentPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "my-8 rounded-2xl overflow-hidden",
        "border border-white/10 dark:border-white/10",
        "bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900/50 dark:to-zinc-950/50",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5">
        <motion.div 
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Play className="w-4 h-4 text-white fill-white" />
        </motion.div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            {title}
          </p>
          {description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive</span>
        </div>
      </div>

      {/* Preview Area */}
      <div className="p-6 flex items-center justify-center min-h-[120px] bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.03)_0%,transparent_70%)]">
        {children}
      </div>
    </motion.div>
  );
}

interface ComponentShowcaseProps {
  children: React.ReactNode;
  code?: string;
  title?: string;
}

/**
 * ComponentShowcase — Preview with code toggle
 * 
 * Shows both the live component and optionally its code
 */
export function ComponentShowcase({ 
  children, 
  code,
  title = "Component Demo"
}: ComponentShowcaseProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 dark:border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500">
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            {title}
          </p>
        </div>
        
        {code && (
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
              showCode 
                ? "bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white" 
                : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
            )}
          >
            <Code className="w-3.5 h-3.5" />
            {showCode ? "Hide Code" : "View Code"}
          </button>
        )}
      </div>

      {/* Preview */}
      <div className="p-6 flex items-center justify-center min-h-[120px] bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900/50 dark:to-zinc-950/50">
        {children}
      </div>

      {/* Code Panel */}
      {code && showCode && (
        <div className="border-t border-zinc-200 dark:border-white/10">
          <pre className="p-4 text-sm overflow-x-auto bg-zinc-950 text-zinc-300">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

interface TryMeButtonProps {
  children: React.ReactNode;
  label?: string;
}

/**
 * TryMeButton — Simple inline interactive wrapper
 * 
 * For smaller inline demos, just adds a subtle "try me" indicator
 */
export function TryMeButton({ children, label = "Try me!" }: TryMeButtonProps) {
  return (
    <div className="inline-flex flex-col items-center gap-2 my-4">
      {children}
      <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
        <motion.span
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          👆
        </motion.span>
        {label}
      </span>
    </div>
  );
}

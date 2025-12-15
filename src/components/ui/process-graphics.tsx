"use client";

import { motion } from "framer-motion";

export const DiscoverGraphic = () => {
  return (
    <div className="flex w-full h-40 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden relative items-center justify-center">
      <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex gap-2"
      >
        <div className="h-8 w-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
        </div>
        <div className="h-8 w-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center translate-y-4">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
        </div>
        <div className="h-8 w-8 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-pink-500" />
        </div>
      </motion.div>
    </div>
  );
};

export const FeasibilityGraphic = () => {
  return (
    <div className="flex w-full h-40 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden relative items-center justify-center">
      <div className="absolute inset-0 bg-dot-zinc-300/50 dark:bg-dot-zinc-700/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="relative z-10 p-4 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm w-3/4">
        <div className="space-y-2">
            <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse delay-75" />
            <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};

export const ExecuteGraphic = () => {
  return (
    <div className="flex w-full h-40 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden relative items-center justify-center">
       <svg className="absolute inset-0 h-full w-full stroke-zinc-300 dark:stroke-zinc-700 opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" strokeWidth="1" />
       </svg>
       <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative z-10"
       >
         <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-500 shadow-lg shadow-green-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
         </div>
       </motion.div>
    </div>
  );
};

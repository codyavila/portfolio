"use client";

import { motion } from "framer-motion";

export const DiscoverGraphic = () => {
  return (
    <div className="flex w-full h-40 rounded-xl bg-[var(--glass-base)] overflow-hidden relative items-center justify-center border border-[var(--glass-border)]">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex gap-2"
      >
        <div className="h-8 w-8 rounded-full bg-[var(--color-neon-blue)]/20 border border-[var(--color-neon-blue)] flex items-center justify-center shadow-[0_0_15px_var(--color-neon-blue)]">
            <div className="h-2 w-2 rounded-full bg-[var(--color-neon-blue)]" />
        </div>
        <div className="h-8 w-8 rounded-full bg-[var(--color-neon-violet)]/20 border border-[var(--color-neon-violet)] flex items-center justify-center translate-y-4 shadow-[0_0_15px_var(--color-neon-violet)]">
            <div className="h-2 w-2 rounded-full bg-[var(--color-neon-violet)]" />
        </div>
        <div className="h-8 w-8 rounded-full bg-[var(--color-neon-cyan)]/20 border border-[var(--color-neon-cyan)] flex items-center justify-center shadow-[0_0_15px_var(--color-neon-cyan)]">
            <div className="h-2 w-2 rounded-full bg-[var(--color-neon-cyan)]" />
        </div>
      </motion.div>
    </div>
  );
};

export const FeasibilityGraphic = () => {
  return (
    <div className="flex w-full h-40 rounded-xl bg-[var(--glass-base)] overflow-hidden relative items-center justify-center border border-[var(--glass-border)]">
      <div className="absolute inset-0 bg-dot-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="relative z-10 p-4 bg-[var(--color-midnight-light)] rounded-lg border border-[var(--glass-border)] shadow-xl w-3/4">
        <div className="space-y-2">
            <div className="h-2 w-1/2 bg-[var(--glass-border)] rounded animate-pulse" />
            <div className="h-2 w-3/4 bg-[var(--glass-border)] rounded animate-pulse delay-75" />
            <div className="h-2 w-full bg-[var(--glass-border)] rounded animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};

export const ExecuteGraphic = () => {
  return (
    <div className="flex w-full h-40 rounded-xl bg-[var(--glass-base)] overflow-hidden relative items-center justify-center border border-[var(--glass-border)]">
       <svg className="absolute inset-0 h-full w-full stroke-[var(--glass-border)] opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" strokeWidth="1" />
       </svg>
       <motion.div
         initial={{ width: "0%" }}
         animate={{ width: "60%" }}
         transition={{ duration: 1.5, ease: "easeInOut" }}
         className="relative z-10 h-2 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-violet)] rounded-full shadow-[0_0_10px_var(--color-neon-violet)]"
       />
    </div>
  );
};

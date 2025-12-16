"use client";

import { motion } from "framer-motion";

// Floating animation for orbs
const floatVariants = {
  animate: (delay: number) => ({
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  }),
};

// Pulse animation for glow effects
const pulseVariants = {
  animate: (delay: number) => ({
    scale: [1, 1.15, 1],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  }),
};

export const DiscoverGraphic = () => {
  return (
    <div className="flex w-full h-44 rounded-2xl bg-gradient-to-br from-[var(--glass-ghost-fill)] to-transparent overflow-hidden relative items-center justify-center border border-[var(--glass-2-border)] backdrop-blur-sm">
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(var(--neon-primary-start) 1px, transparent 1px), linear-gradient(90deg, var(--neon-primary-start) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse at center, white 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, white 30%, transparent 70%)',
          }}
        />
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <motion.line 
          x1="35%" y1="50%" x2="50%" y2="65%" 
          stroke="var(--neon-secondary-start)" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.line 
          x1="50%" y1="65%" x2="65%" y2="50%" 
          stroke="var(--neon-accent-start)" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative z-10 flex gap-6 items-center"
      >
        {/* User/Stakeholder orb */}
        <motion.div 
          className="relative"
          variants={floatVariants}
          animate="animate"
          custom={0}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-[var(--neon-primary-start)]"
            variants={pulseVariants}
            animate="animate"
            custom={0}
            style={{ filter: 'blur(12px)' }}
          />
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--neon-primary-start)]/30 to-[var(--neon-primary-start)]/10 border border-[var(--neon-primary-start)] flex items-center justify-center backdrop-blur-sm relative">
            <div className="h-3 w-3 rounded-full bg-[var(--neon-primary-start)] shadow-[0_0_10px_var(--neon-primary-start)]" />
          </div>
        </motion.div>

        {/* Data/Insights orb */}
        <motion.div 
          className="relative translate-y-6"
          variants={floatVariants}
          animate="animate"
          custom={0.5}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-[var(--lum-neon-purple)]"
            variants={pulseVariants}
            animate="animate"
            custom={0.3}
            style={{ filter: 'blur(12px)' }}
          />
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--lum-neon-purple)]/30 to-[var(--lum-neon-purple)]/10 border border-[var(--lum-neon-purple)] flex items-center justify-center backdrop-blur-sm relative">
            <div className="h-3 w-3 rounded-full bg-[var(--lum-neon-purple)] shadow-[0_0_10px_var(--lum-neon-purple)]" />
          </div>
        </motion.div>

        {/* Success metrics orb */}
        <motion.div 
          className="relative"
          variants={floatVariants}
          animate="animate"
          custom={1}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-[var(--lum-neon-cyan)]"
            variants={pulseVariants}
            animate="animate"
            custom={0.6}
            style={{ filter: 'blur(12px)' }}
          />
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--lum-neon-cyan)]/30 to-[var(--lum-neon-cyan)]/10 border border-[var(--lum-neon-cyan)] flex items-center justify-center backdrop-blur-sm relative">
            <div className="h-3 w-3 rounded-full bg-[var(--lum-neon-cyan)] shadow-[0_0_10px_var(--lum-neon-cyan)]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const FeasibilityGraphic = () => {
  return (
    <div className="flex w-full h-44 rounded-2xl bg-gradient-to-br from-[var(--glass-ghost-fill)] to-transparent overflow-hidden relative items-center justify-center border border-[var(--glass-2-border)] backdrop-blur-sm">
      {/* Dot pattern background */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(var(--lum-neon-blue) 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
          maskImage: 'radial-gradient(ellipse at center, white 40%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, white 40%, transparent 70%)',
        }}
      />
      
      {/* Code/Architecture representation */}
      <motion.div 
        className="relative z-10 p-5 rounded-xl border border-[var(--glass-2-border)] shadow-2xl w-4/5 max-w-[200px]"
        style={{
          background: 'linear-gradient(135deg, var(--glass-prism-fill) 0%, var(--glass-ghost-fill) 100%)',
          backdropFilter: 'blur(20px)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="space-y-3">
          <motion.div 
            className="h-2 rounded-full bg-gradient-to-r from-[var(--lum-neon-green)] to-[var(--lum-neon-green)]/50"
            initial={{ width: 0 }}
            animate={{ width: "45%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
          <motion.div 
            className="h-2 rounded-full bg-gradient-to-r from-[var(--lum-neon-blue)] to-[var(--lum-neon-blue)]/50"
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          />
          <motion.div 
            className="h-2 rounded-full bg-gradient-to-r from-[var(--lum-neon-purple)] to-[var(--lum-neon-purple)]/50"
            initial={{ width: 0 }}
            animate={{ width: "90%" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          />
          <motion.div 
            className="h-2 rounded-full bg-gradient-to-r from-[var(--lum-cotton-candy)] to-[var(--lum-cotton-candy)]/50"
            initial={{ width: 0 }}
            animate={{ width: "55%" }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          />
        </div>
        
        {/* Checkmark indicator */}
        <motion.div 
          className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-[var(--lum-neon-green)] flex items-center justify-center shadow-[0_0_15px_var(--lum-neon-green)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 1 }}
        >
          <svg className="w-3 h-3 text-[var(--lum-void-deep)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ExecuteGraphic = () => {
  return (
    <div className="flex w-full h-44 rounded-2xl bg-gradient-to-br from-[var(--glass-ghost-fill)] to-transparent overflow-hidden relative items-center justify-center border border-[var(--glass-2-border)] backdrop-blur-sm">
      {/* Animated wave background */}
      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M0 70 Q 25 50 50 70 T 100 70 V 100 H 0 Z" 
          fill="url(#wave-gradient)"
          initial={{ d: "M0 80 Q 25 80 50 80 T 100 80 V 100 H 0 Z" }}
          animate={{ d: "M0 70 Q 25 50 50 70 T 100 70 V 100 H 0 Z" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--lum-neon-blue)" />
            <stop offset="100%" stopColor="var(--lum-neon-purple)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-4 w-4/5">
        {/* Progress bar container */}
        <div className="w-full h-3 rounded-full bg-[var(--glass-ghost-fill)] border border-[var(--glass-2-border)] overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, var(--lum-neon-blue), var(--lum-neon-purple), var(--lum-neon-pink))',
            }}
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {/* Shimmer effect on progress bar */}
            <motion.div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>
          
          {/* Glow effect */}
          <motion.div
            className="absolute top-0 h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--lum-neon-blue), var(--lum-neon-purple))',
              filter: 'blur(8px)',
              opacity: 0.5,
            }}
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>

        {/* Iteration indicators */}
        <div className="flex gap-3 items-center">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="h-4 w-4 rounded-full border-2"
                style={{
                  borderColor: i < 3 ? 'var(--lum-neon-green)' : 'var(--glass-2-border)',
                  background: i < 3 ? 'var(--lum-neon-green)' : 'transparent',
                  boxShadow: i < 3 ? '0 0 10px var(--lum-neon-green)' : 'none',
                }}
                animate={i < 3 ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.div>
          ))}
          <motion.div
            className="h-4 w-4 rounded-full border-2 border-dashed border-[var(--glass-2-border)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ delay: 1.3, type: "spring" }}
          />
        </div>
      </div>
    </div>
  );
};

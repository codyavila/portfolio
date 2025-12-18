"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlogTemplateProps {
  children: ReactNode;
}

export default function BlogTemplate({ children }: BlogTemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom ease for smooth entry
      }}
    >
      {/* Entrance shimmer effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ 
          background: "linear-gradient(135deg, rgba(var(--lum-neon-purple-rgb), 0.1) 0%, transparent 50%, rgba(var(--lum-neon-blue-rgb), 0.1) 100%)",
          opacity: 1,
        }}
        animate={{ 
          opacity: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      />
      
      {children}
    </motion.div>
  );
}

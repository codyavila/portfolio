"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Email", href: "mailto:your.email@example.com", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Glass-Ghost background layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: "var(--glass-ghost-fill)",
          backdropFilter: "blur(var(--glass-ghost-blur))",
        }}
      />
      
      {/* Subtle top border with gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 80%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-16 flex flex-col items-center gap-8">
        {/* Social Links with magnetic hover */}
        <div className="flex gap-3">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="relative p-3 rounded-full group"
              style={{
                background: "var(--glass-prism-fill)",
                backdropFilter: "blur(20px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: index * 0.1 
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(0, 255, 153, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="h-5 w-5 text-[var(--text-tertiary)] group-hover:text-[var(--neon-primary-end)] transition-colors duration-300" />
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Copyright with glass legibility */}
        <motion.div 
          className="text-center on-glass"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-sm text-[var(--text-secondary)] tracking-wide">
            &copy; {new Date().getFullYear()} Cody Avila
          </p>
          <p className="mt-2 text-xs text-[var(--text-tertiary)]">
            Crafted with Next.js, TypeScript & Framer Motion
          </p>
        </motion.div>

        {/* Subtle heartbeat indicator */}
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-[var(--neon-primary-end)] heartbeat"
          style={{ boxShadow: "0 0 10px rgba(0, 255, 153, 0.5)" }}
        />
      </div>
    </footer>
  );
}

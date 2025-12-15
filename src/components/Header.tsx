"use client";

import Link from "next/link";
import { Home, User, Briefcase, FolderGit2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { SettingsMenu } from "@/components/SettingsMenu";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Process", href: "/#process", icon: Layers },
  { name: "Experience", href: "/#experience", icon: Briefcase },
  { name: "Projects", href: "/#projects", icon: FolderGit2 },
];

export function Header() {
  const [activeTab, setActiveTab] = useState("Home");

  // Optional: Add intersection observer to update activeTab on scroll
  // For now, we'll just update on click
  
  return (
    <motion.header
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed z-50 
        bottom-8 left-1/2 -translate-x-1/2 
        md:left-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0
        w-auto"
    >
      {/* Island Bar: Glass Level 3 */}
      <nav className="glass-3 rounded-full px-2 py-2 md:px-2 md:py-4 flex md:flex-col items-center gap-2 shadow-2xl shadow-black/20">
        
        {/* Logo / Home */}
        <Link 
          href="/" 
          onClick={() => setActiveTab("Home")}
          className="relative p-3 rounded-full transition-colors group"
        >
          {activeTab === "Home" && (
            <motion.div
              layoutId="spotlight"
              className="absolute inset-0 bg-gradient-to-br from-[var(--neon-primary-start)]/20 to-[var(--neon-primary-end)]/20 rounded-full blur-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-primary-start)] to-[var(--neon-primary-end)] flex items-center justify-center text-white font-bold text-xs shadow-[0_0_10px_var(--neon-primary-start)]">
            CA
          </div>
        </Link>

        <div className="h-6 w-[1px] bg-white/10 md:w-6 md:h-[1px] mx-1 md:mx-0 md:my-1" />

        {/* Nav Items */}
        <div className="flex md:flex-col items-center gap-1">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className="relative p-3 rounded-full transition-all group"
              title={item.name}
            >
              {activeTab === item.name && (
                <motion.div
                  layoutId="spotlight"
                  className="absolute inset-0 bg-gradient-to-br from-[var(--neon-primary-start)]/20 to-[var(--neon-primary-end)]/20 rounded-full blur-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon 
                className={cn(
                  "relative z-10 w-5 h-5 transition-colors duration-300",
                  activeTab === item.name 
                    ? "text-[var(--neon-primary-end)] drop-shadow-[0_0_8px_rgba(78,168,222,0.5)]" 
                    : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                )} 
              />
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="h-6 w-[1px] bg-white/10 md:w-6 md:h-[1px] mx-1 md:mx-0 md:my-1" />
        
        <SettingsMenu />
      </nav>
    </motion.header>
  );
}


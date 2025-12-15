"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Home, User, Briefcase, FolderGit2, Layers } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Process", href: "/#process", icon: Layers },
  { name: "Experience", href: "/#experience", icon: Briefcase },
  { name: "Projects", href: "/#projects", icon: FolderGit2 },
];

export function Header() {
  return (
    <motion.header
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed z-50 
        bottom-8 left-1/2 -translate-x-1/2 
        md:left-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0
        w-auto max-w-[90vw]"
    >
      <nav className="bg-[var(--glass-elevated)] backdrop-blur-xl rounded-full px-5 py-3 md:px-3 md:py-8 flex md:flex-col items-center gap-5 md:gap-8 shadow-2xl shadow-black/10 dark:shadow-black/40 border border-[var(--glass-border)]">
        
        {/* Logo / Home (Mobile only, or top of pill on desktop) */}
        <Link href="/" className="p-2 rounded-full hover:bg-[var(--glass-border)] transition-colors md:mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)] to-[var(--color-neon-violet)] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            CA
          </div>
        </Link>

        <div className="h-8 w-[1px] bg-[var(--glass-border)] md:w-8 md:h-[1px]" />

        {/* Nav Items */}
        <div className="flex md:flex-col items-center gap-3">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative p-3 rounded-full hover:bg-[var(--glass-border)] transition-all hover:scale-110"
              title={item.name}
            >
              <item.icon className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--color-neon-blue)] transition-colors" />
              <span className="sr-only">{item.name}</span>
              
              {/* Tooltip for Desktop */}
              <span className="absolute left-full ml-5 px-3 py-1.5 bg-[var(--color-midnight-light)]/90 backdrop-blur-md border border-[var(--glass-border)] rounded-lg text-xs font-medium text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap hidden md:block pointer-events-none shadow-xl">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="h-8 w-[1px] bg-[var(--glass-border)] md:w-8 md:h-[1px]" />

        {/* Socials & Theme */}
        <div className="flex md:flex-col items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-border)] transition-colors hover:scale-110"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-border)] transition-colors hover:scale-110"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </nav>
    </motion.header>
  );
}


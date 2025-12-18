"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionDivider } from "@/components/ui/section-divider";
import { cn } from "@/lib/utils";

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  role: string;
  timeline?: string;
  techStack: string[];
  children: React.ReactNode;
  backLink?: string;
  backText?: string;
  layoutId?: string;
}

export function CaseStudyLayout({
  title,
  subtitle,
  role,
  timeline,
  techStack,
  children,
  backLink = "/#projects",
  backText = "Back to Projects",
  layoutId,
}: CaseStudyLayoutProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 opacity-50"
          fill="var(--neon-primary-end)"
        />
        <div className="absolute top-[40%] right-0 w-full h-screen pointer-events-none opacity-30">
          <Spotlight
            className="-top-40 right-0 md:right-60 md:-top-20"
            fill="var(--neon-secondary-end)"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <Link
            href={backLink}
            className="pointer-events-auto inline-flex items-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group backdrop-blur-md bg-[var(--background)]/50 px-4 py-2 rounded-full border border-[var(--glass-border)]"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {backText}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.header
        style={{ opacity, scale }}
        className="relative z-10 min-h-[70vh] flex flex-col justify-center px-6 pt-32 pb-16"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* The "Card" that expands */}
          <motion.div
            layoutId={layoutId}
            className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-1-fill)] backdrop-blur-xl p-8 md:p-12"
          >
            {/* Inner content wrapper for staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-3 mb-8">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--chip-primary-bg)] text-[var(--chip-primary-text)] border border-[var(--chip-primary-border)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h1 className="text-display-l md:text-display-xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
                {title}
              </h1>
              <p className="text-title-m md:text-title-l text-[var(--text-secondary)] max-w-3xl leading-relaxed">
                {subtitle}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-[var(--glass-border)]">
                <div>
                  <h3 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                    Role
                  </h3>
                  <p className="text-body-m font-medium text-[var(--text-primary)]">
                    {role}
                  </p>
                </div>
                {timeline && (
                  <div>
                    <h3 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                      Timeline
                    </h3>
                    <p className="text-body-m font-medium text-[var(--text-primary)]">
                      {timeline}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Decorative gradient blob inside the card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--neon-primary-start)] opacity-10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </motion.header>

      <SectionDivider variant="gradient" />

      {/* Main Content */}
      <main className="relative z-10 px-6 py-16 md:py-24 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

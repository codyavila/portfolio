"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Database, Layers, Zap, Users } from "lucide-react";
import { NanoCard } from "@/components/ui/nano-card";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

export default function BloxNxtCmsRebuild() {
  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 py-12 sm:py-20 squish-scroll"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Link
        href="/#projects"
        className="inline-flex items-center text-body-s text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-12"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>
      </motion.div>

      <motion.header className="mb-16" variants={item}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[var(--lum-neon-purple)]/10 text-[var(--lum-neon-purple)]">
            <Database className="h-6 w-6" />
          </div>
          <span className="text-label-m text-[var(--text-secondary)]">
            BLOX Digital
          </span>
        </div>
        <h1 className="text-display-l text-[var(--text-primary)] mb-6 on-glass">
          BLOX NXT CMS Rebuild
        </h1>
        <p className="text-title-m text-[var(--text-secondary)] leading-relaxed max-w-2xl on-glass">
          Rebuilding the core content management system for over 2,000 media organizations, focusing on performance, scalability, and editorial workflow efficiency.
        </p>
      </motion.header>

      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 border-y border-[var(--glass-border)] py-8" variants={item}>
        <div>
          <h3 className="text-label-s text-[var(--text-tertiary)] mb-2 uppercase tracking-wider">Role</h3>
          <p className="text-body-l text-[var(--text-primary)]">Lead Frontend Engineer</p>
        </div>
        <div>
          <h3 className="text-label-s text-[var(--text-tertiary)] mb-2 uppercase tracking-wider">Scale</h3>
          <p className="text-body-l text-[var(--text-primary)]">141M+ Monthly Users</p>
        </div>
        <div>
          <h3 className="text-label-s text-[var(--text-tertiary)] mb-2 uppercase tracking-wider">Tech Stack</h3>
          <p className="text-body-l text-[var(--text-primary)]">React, TypeScript, MUI</p>
        </div>
      </motion.div>

      <motion.section className="space-y-20" variants={item}>
        {/* Problem */}
        <div>
          <h2 className="text-display-s text-[var(--text-primary)] mb-6">The Challenge</h2>
          <p className="text-body-l text-[var(--text-secondary)] leading-relaxed mb-8">
            BLOX Digital powers digital transformation for thousands of media organizations. The legacy systems needed to evolve to handle massive scale (6.8B+ annual pageviews) while providing a modern, efficient experience for editorial teams.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-body-m text-[var(--text-secondary)]">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--lum-neon-pink)] shrink-0" />
              Need for rapid feature delivery across multiple teams.
            </li>
            <li className="flex items-start gap-3 text-body-m text-[var(--text-secondary)]">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--lum-neon-pink)] shrink-0" />
              Inconsistent UI/UX patterns slowing down editorial workflows.
            </li>
            <li className="flex items-start gap-3 text-body-m text-[var(--text-secondary)]">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--lum-neon-pink)] shrink-0" />
              Performance bottlenecks impacting user productivity.
            </li>
          </ul>
        </div>

        {/* Solution */}
        <div>
          <h2 className="text-display-s text-[var(--text-primary)] mb-6">The Solution</h2>
          <p className="text-body-l text-[var(--text-secondary)] leading-relaxed mb-10">
            I led the frontend development of the BLOX NXT CMS, focusing on a modular architecture and a robust design system to enable scale and consistency.
          </p>
          
          <div className="grid gap-6">
            <NanoCard className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Layers className="h-6 w-6 text-[var(--lum-neon-blue)]" />
                <h3 className="text-title-m text-[var(--text-primary)]">Design System & Component Library</h3>
              </div>
              <p className="text-body-m text-[var(--text-secondary)]">
                Established a reusable component library and lightweight design system. This standardized UI patterns and accelerated feature delivery by approximately 30% across teams.
              </p>
            </NanoCard>

            <NanoCard className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="h-6 w-6 text-[var(--lum-neon-yellow)]" />
                <h3 className="text-title-m text-[var(--text-primary)]">Performance Optimization</h3>
              </div>
              <p className="text-body-m text-[var(--text-secondary)]">
                Improved perceived performance via render profiling, memoization, and request batching. This decreased key UI interaction latency and boosted Lighthouse scores.
              </p>
            </NanoCard>

            <NanoCard className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-6 w-6 text-[var(--lum-neon-cyan)]" />
                <h3 className="text-title-m text-[var(--text-primary)]">Editorial Workflow Enhancements</h3>
              </div>
              <p className="text-body-m text-[var(--text-secondary)]">
                Built data-driven dashboards and real-time authoring affordances. Shipped 20+ customer-visible features across content authoring, audience, and analytics workflows.
              </p>
            </NanoCard>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-display-s text-[var(--text-primary)] mb-6">The Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <NanoCard className="p-8 bg-[var(--lum-neon-purple)]/10 border-[var(--lum-neon-purple)]/20">
              <div className="text-display-l font-bold mb-2 text-[var(--lum-neon-purple)]">30%</div>
              <div className="text-title-s text-[var(--text-secondary)]">Faster Feature Delivery</div>
            </NanoCard>
            <NanoCard className="p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--lum-neon-green)]">
                <CheckCircle2 className="h-6 w-6" />
                <span className="text-title-m">Impact at Scale</span>
              </div>
              <p className="text-body-m text-[var(--text-secondary)]">
                Architected payment integrations supporting <strong>2M+ paid subscribers</strong>, standardizing API contracts for resilient flows.
              </p>
            </NanoCard>
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
}

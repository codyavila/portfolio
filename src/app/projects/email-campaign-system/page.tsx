"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Layout, Zap, BarChart3 } from "lucide-react";
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

export default function EmailCampaignSystem() {
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
          <div className="p-2 rounded-lg bg-[var(--lum-neon-blue)]/10 text-[var(--lum-neon-blue)]">
            <Layout className="h-6 w-6" />
          </div>
          <span className="text-label-m text-[var(--text-secondary)]">
            BLOX Digital
          </span>
        </div>
        <h1 className="text-display-l text-[var(--text-primary)] mb-6 on-glass">
          Email Campaign Management System
        </h1>
        <p className="text-title-m text-[var(--text-secondary)] leading-relaxed max-w-2xl on-glass">
          A multi-step wizard that simplified complex campaign setups, reducing user error and increasing successful launches.
        </p>
      </motion.header>

      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 border-y border-[var(--glass-border)] py-8" variants={item}>
        <div>
          <h3 className="text-label-s text-[var(--text-tertiary)] mb-2 uppercase tracking-wider">Role</h3>
          <p className="text-body-l text-[var(--text-primary)]">Lead Frontend Engineer</p>
        </div>
        <div>
          <h3 className="text-label-s text-[var(--text-tertiary)] mb-2 uppercase tracking-wider">Timeline</h3>
          <p className="text-body-l text-[var(--text-primary)]">3 Months</p>
        </div>
        <div>
          <h3 className="text-label-s text-[var(--text-tertiary)] mb-2 uppercase tracking-wider">Tech Stack</h3>
          <p className="text-body-l text-[var(--text-primary)]">React, React Query, TypeScript</p>
        </div>
      </motion.div>

      <motion.section className="space-y-20" variants={item}>
        {/* Problem */}
        <div>
          <h2 className="text-display-s text-[var(--text-primary)] mb-6">The Problem</h2>
          <p className="text-body-l text-[var(--text-secondary)] leading-relaxed mb-8">
            Users were struggling to configure email campaigns correctly. The existing interface was a monolithic form with poor validation, leading to:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-body-m text-[var(--text-secondary)]">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--lum-neon-pink)] shrink-0" />
              High rate of configuration errors requiring support intervention.
            </li>
            <li className="flex items-start gap-3 text-body-m text-[var(--text-secondary)]">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--lum-neon-pink)] shrink-0" />
              Frustration with the &quot;black box&quot; scheduling logic.
            </li>
            <li className="flex items-start gap-3 text-body-m text-[var(--text-secondary)]">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--lum-neon-pink)] shrink-0" />
              Slow UI performance due to unnecessary network requests.
            </li>
          </ul>
        </div>

        {/* Solution */}
        <div>
          <h2 className="text-display-s text-[var(--text-primary)] mb-6">The Solution</h2>
          <p className="text-body-l text-[var(--text-secondary)] leading-relaxed mb-10">
            I architected a new <strong>multi-step wizard</strong> that guided users through the process, validating each step before proceeding.
          </p>
          
          <div className="grid gap-6">
            <NanoCard className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="h-6 w-6 text-[var(--lum-neon-yellow)]" />
                <h3 className="text-title-m text-[var(--text-primary)]">Natural Language Scheduling</h3>
              </div>
              <p className="text-body-m text-[var(--text-secondary)]">
                Replaced complex cron-like selectors with a human-readable summary (e.g., &quot;Sends every Monday at 9:00 AM&quot;). This immediate feedback loop drastically reduced scheduling errors.
              </p>
            </NanoCard>

            <NanoCard className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Layout className="h-6 w-6 text-[var(--lum-neon-blue)]" />
                <h3 className="text-title-m text-[var(--text-primary)]">Granular State & Validation</h3>
              </div>
              <p className="text-body-m text-[var(--text-secondary)]">
                Leveraged React Hook Form and Zod to validate inputs in real-time. Users couldn&apos;t proceed to the &quot;Review&quot; step without valid configuration.
              </p>
            </NanoCard>

            <NanoCard className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <BarChart3 className="h-6 w-6 text-[var(--lum-neon-green)]" />
                <h3 className="text-title-m text-[var(--text-primary)]">Optimistic Updates</h3>
              </div>
              <p className="text-body-m text-[var(--text-secondary)]">
                Used React Query to manage server state, implementing optimistic updates for immediate UI feedback and request deduping to cut network overhead.
              </p>
            </NanoCard>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-display-s text-[var(--text-primary)] mb-6">The Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <NanoCard className="p-8 bg-[var(--lum-neon-blue)]/10 border-[var(--lum-neon-blue)]/20">
              <div className="text-display-l font-bold mb-2 text-[var(--lum-neon-blue)]">30%</div>
              <div className="text-title-s text-[var(--text-secondary)]">Reduction in Support Tickets</div>
            </NanoCard>
            <NanoCard className="p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--lum-neon-green)]">
                <CheckCircle2 className="h-6 w-6" />
                <span className="text-title-m">Success</span>
              </div>
              <p className="text-body-m text-[var(--text-secondary)]">
                Increased successful campaign launches and received positive feedback from the editorial team for the simplified workflow.
              </p>
            </NanoCard>
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
}

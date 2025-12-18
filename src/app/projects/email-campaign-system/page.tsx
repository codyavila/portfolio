"use client";

import { CheckCircle2, Layout, Zap, BarChart3 } from "lucide-react";
import { CaseStudyLayout } from "@/components/ui/case-study-layout";
import { BentoGrid } from "@/components/ui/bento-grid";
import { PortalCard, PortalCardTitle, PortalCardDescription } from "@/components/ui/portal-card";
import { NanoCard, NanoCardTitle, NanoCardDescription } from "@/components/ui/nano-card";

export default function EmailCampaignSystem() {
  return (
    <CaseStudyLayout
      title="Email Campaign Management System"
      subtitle="A multi-step wizard that simplified complex campaign setups, reducing user error and increasing successful launches."
      role="Lead Frontend Engineer"
      timeline="3 Months"
      techStack={["React", "React Query", "TypeScript", "Zod"]}
      layoutId="project-email-system"
    >
      {/* Problem */}
      <section className="mb-24">
        <h2 className="text-display-s text-[var(--text-primary)] mb-8">The Problem</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-body-l text-[var(--text-secondary)] leading-relaxed">
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
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--lum-neon-pink)]/20 to-[var(--lum-neon-orange)]/20 blur-3xl rounded-full" />
            <PortalCard glow="cotton-candy" className="relative z-10 p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-4">
                  <span className="text-sm font-mono text-[var(--text-tertiary)]">Error Rate</span>
                  <span className="text-xs text-[var(--lum-neon-pink)]">High</span>
                </div>
                <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-4">
                  <span className="text-sm font-mono text-[var(--text-tertiary)]">UX Friction</span>
                  <span className="text-xs text-[var(--lum-neon-pink)]">Severe</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-[var(--text-tertiary)]">Performance</span>
                  <span className="text-xs text-[var(--lum-neon-pink)]">Slow</span>
                </div>
              </div>
            </PortalCard>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="mb-24">
        <h2 className="text-display-s text-[var(--text-primary)] mb-8">The Solution</h2>
        <p className="text-body-l text-[var(--text-secondary)] leading-relaxed mb-12 max-w-3xl">
          I led cross-functional discovery and defined the product requirements for a new <strong>multi-step wizard</strong> that guided users through the process, validating each step before proceeding.
        </p>
        
        <BentoGrid className="auto-rows-[20rem]">
          <PortalCard className="md:col-span-2 p-8" glow="aurora">
            <div className="flex flex-col h-full justify-between">
              <div className="p-3 w-fit rounded-xl bg-[var(--lum-neon-yellow)]/10 text-[var(--lum-neon-yellow)] mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <PortalCardTitle className="mb-2">Natural Language Scheduling</PortalCardTitle>
                <PortalCardDescription>
                  Replaced complex cron-like selectors with a human-readable summary (e.g., &quot;Sends every Monday at 9:00 AM&quot;). This immediate feedback loop drastically reduced scheduling errors.
                </PortalCardDescription>
              </div>
            </div>
          </PortalCard>

          <PortalCard className="md:col-span-1 p-8" glow="cyber-lime">
            <div className="flex flex-col h-full justify-between">
              <div className="p-3 w-fit rounded-xl bg-[var(--lum-neon-blue)]/10 text-[var(--lum-neon-blue)] mb-4">
                <Layout className="h-6 w-6" />
              </div>
              <div>
                <PortalCardTitle className="mb-2">Granular Validation</PortalCardTitle>
                <PortalCardDescription>
                  Leveraged React Hook Form and Zod to validate inputs in real-time.
                </PortalCardDescription>
              </div>
            </div>
          </PortalCard>

          <PortalCard className="md:col-span-3 p-8" glow="solar-flare">
            <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1">
                <div className="p-3 w-fit rounded-xl bg-[var(--lum-neon-green)]/10 text-[var(--lum-neon-green)] mb-4">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <PortalCardTitle className="mb-2">Optimistic Updates</PortalCardTitle>
                <PortalCardDescription>
                  Used React Query to manage server state, implementing optimistic updates for immediate UI feedback and request deduping to cut network overhead.
                </PortalCardDescription>
              </div>
              <div className="flex-1 w-full h-full min-h-[150px] bg-[var(--glass-ghost-fill)] rounded-xl border border-[var(--glass-border)] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--lum-neon-green)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="font-mono text-sm text-[var(--text-tertiary)]">Real-time Feedback</span>
              </div>
            </div>
          </PortalCard>
        </BentoGrid>
      </section>

      {/* Results */}
      <section>
        <h2 className="text-display-s text-[var(--text-primary)] mb-8">The Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NanoCard className="p-8 bg-[var(--lum-neon-blue)]/10 border-[var(--lum-neon-blue)]/20">
            <div className="text-display-xl font-bold mb-2 text-[var(--lum-neon-blue)]">30%</div>
            <NanoCardTitle className="text-[var(--text-primary)]">Reduction in Support Tickets</NanoCardTitle>
            <NanoCardDescription>
              Simplified workflow drastically reduced user errors.
            </NanoCardDescription>
          </NanoCard>
          
          <NanoCard className="p-8">
            <div className="flex items-center gap-3 mb-4 text-[var(--lum-neon-green)]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <NanoCardTitle className="mb-2">Success</NanoCardTitle>
            <NanoCardDescription>
              Increased successful campaign launches and received positive feedback from the editorial team.
            </NanoCardDescription>
          </NanoCard>
        </div>
      </section>
    </CaseStudyLayout>
  );
}

"use client";

import { CheckCircle2, Layers, Zap, Users } from "lucide-react";
import { CaseStudyLayout } from "@/components/ui/case-study-layout";
import { BentoGrid } from "@/components/ui/bento-grid";
import { PortalCard, PortalCardTitle, PortalCardDescription } from "@/components/ui/portal-card";
import { NanoCard, NanoCardTitle, NanoCardDescription } from "@/components/ui/nano-card";

export default function BloxNxtCmsRebuild() {
  return (
    <CaseStudyLayout
      title="BLOX NXT CMS Rebuild"
      subtitle="Rebuilding the core content management system for over 2,000 media organizations, focusing on performance, scalability, and editorial workflow efficiency."
      role="Lead Frontend Engineer"
      timeline="141M+ Monthly Users"
      techStack={["React", "TypeScript", "MUI", "Next.js"]}
      layoutId="project-blox-nxt"
    >
      {/* Problem */}
      <section className="mb-24">
        <h2 className="text-display-s text-[var(--text-primary)] mb-8">The Challenge</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-body-l text-[var(--text-secondary)] leading-relaxed">
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
          <div className="relative">
            {/* Abstract representation of complexity */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--lum-neon-purple)]/20 to-[var(--lum-neon-blue)]/20 blur-3xl rounded-full" />
            <PortalCard glow="aurora" className="relative z-10 p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-4">
                  <span className="text-sm font-mono text-[var(--text-tertiary)]">Legacy System</span>
                  <span className="text-xs text-[var(--lum-neon-pink)]">High Latency</span>
                </div>
                <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-4">
                  <span className="text-sm font-mono text-[var(--text-tertiary)]">Tech Debt</span>
                  <span className="text-xs text-[var(--lum-neon-pink)]">Critical</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-[var(--text-tertiary)]">Scalability</span>
                  <span className="text-xs text-[var(--lum-neon-pink)]">Limited</span>
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
          I drove the product strategy and technical execution of the BLOX NXT CMS, aligning cross-functional stakeholders around a modular architecture and scalable design system.
        </p>
        
        <BentoGrid className="auto-rows-[20rem]">
          <PortalCard className="md:col-span-2 p-8" glow="cyber-lime">
            <div className="flex flex-col h-full justify-between">
              <div className="p-3 w-fit rounded-xl bg-[var(--lum-neon-blue)]/10 text-[var(--lum-neon-blue)] mb-4">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <PortalCardTitle className="mb-2">Design System & Component Library</PortalCardTitle>
                <PortalCardDescription>
                  Established a reusable component library and lightweight design system. This standardized UI patterns and accelerated feature delivery by approximately 30% across teams.
                </PortalCardDescription>
              </div>
            </div>
          </PortalCard>

          <PortalCard className="md:col-span-1 p-8" glow="solar-flare">
            <div className="flex flex-col h-full justify-between">
              <div className="p-3 w-fit rounded-xl bg-[var(--lum-neon-yellow)]/10 text-[var(--lum-neon-yellow)] mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <PortalCardTitle className="mb-2">Performance</PortalCardTitle>
                <PortalCardDescription>
                  Improved perceived performance via render profiling, memoization, and request batching.
                </PortalCardDescription>
              </div>
            </div>
          </PortalCard>

          <PortalCard className="md:col-span-3 p-8" glow="cotton-candy">
            <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1">
                <div className="p-3 w-fit rounded-xl bg-[var(--lum-neon-cyan)]/10 text-[var(--lum-neon-cyan)] mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <PortalCardTitle className="mb-2">Editorial Workflow Enhancements</PortalCardTitle>
                <PortalCardDescription>
                  Built data-driven dashboards and real-time authoring affordances. Shipped 20+ customer-visible features across content authoring, audience, and analytics workflows.
                </PortalCardDescription>
              </div>
              <div className="flex-1 w-full h-full min-h-[150px] bg-[var(--glass-ghost-fill)] rounded-xl border border-[var(--glass-border)] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--lum-neon-cyan)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="font-mono text-sm text-[var(--text-tertiary)]">Workflow Visualization</span>
              </div>
            </div>
          </PortalCard>
        </BentoGrid>
      </section>

      {/* Results */}
      <section>
        <h2 className="text-display-s text-[var(--text-primary)] mb-8">The Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NanoCard className="p-8 bg-[var(--lum-neon-purple)]/5 border-[var(--lum-neon-purple)]/20">
            <div className="text-display-xl font-bold mb-2 text-[var(--lum-neon-purple)]">30%</div>
            <NanoCardTitle className="text-[var(--text-primary)]">Faster Feature Delivery</NanoCardTitle>
            <NanoCardDescription>
              Standardized components reduced development time significantly.
            </NanoCardDescription>
          </NanoCard>
          
          <NanoCard className="p-8">
            <div className="flex items-center gap-3 mb-4 text-[var(--lum-neon-green)]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <NanoCardTitle className="mb-2">Impact at Scale</NanoCardTitle>
            <NanoCardDescription>
              Architected payment integrations supporting <strong>2M+ paid subscribers</strong>, standardizing API contracts for resilient flows.
            </NanoCardDescription>
          </NanoCard>
        </div>
      </section>
    </CaseStudyLayout>
  );
}

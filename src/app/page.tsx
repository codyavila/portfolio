"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Code2, Layout, Users, BarChart3, Database } from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight";
import { BentoGrid } from "@/components/ui/bento-grid";
import { NanoCard, NanoCardTitle, NanoCardDescription } from "@/components/ui/nano-card";
import { PortalCard, PortalCardTitle, PortalCardDescription } from "@/components/ui/portal-card";
import { DiscoverGraphic, FeasibilityGraphic, ExecuteGraphic } from "@/components/ui/process-graphics";
import { JellyButton, GhostButton } from "@/components/ui/jelly-button";

// Staggered animation variants for the Entry Sequence
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
    },
  },
};

export default function Home() {
  return (
    <main className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 md:pl-32">
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--neon-primary-end)" />
      </div>

      {/* Hero Section — Entry Sequence with stagger */}
      <motion.section 
        className="mb-24 sm:mb-32 relative z-10 max-w-5xl mx-auto pt-16 sm:pt-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-8 sm:gap-10">
          <motion.h1 
            variants={itemVariants}
            className="text-display-xl font-bold tracking-tighter text-[var(--text-primary)] heartbeat"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span 
              className="text-glow inline-block"
              style={{
                background: "linear-gradient(135deg, var(--text-primary) 0%, var(--neon-primary-end) 50%, var(--text-primary) 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >Cody Avila</span>
          </motion.h1>
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-4xl font-medium text-[var(--text-primary)] flex flex-wrap items-center gap-4 tracking-tight"
          >
            Frontend Engineer 
            <ArrowRight className="h-6 w-6 text-[var(--neon-primary-end)]" />
            <span className="text-[var(--text-secondary)]">Technical Product Manager</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-body-l leading-relaxed max-w-2xl text-[var(--text-secondary)] font-normal"
          >
            I bridge the gap between engineering reality and product vision. 
            With deep roots in frontend architecture, I translate complex technical constraints into viable product strategies.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-5 mt-8"
          >
            <JellyButton href="#contact" variant="cyber-lime">
              Get in Touch
            </JellyButton>
            <GhostButton href="#projects" accentColor="cotton-candy">
              View Case Studies
            </GhostButton>
          </motion.div>
        </div>
      </motion.section>

      {/* About / Transition Story — The Technical Edge */}
      <section id="about" className="mb-20 sm:mb-32 scroll-mt-32 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <h3 className="text-display-m mb-10 sm:mb-14 text-[var(--text-primary)]">The Technical Edge</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Main Story Card */}
            <PortalCard 
              className="md:col-span-2 p-8 sm:p-12" 
              glow="cyber-lime"
              delay={0.1}
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--chip-primary-bg)] border border-[var(--chip-primary-border)] mb-6">
                    <Code2 className="w-4 h-4 text-[var(--chip-primary-text)]" />
                    <span className="text-sm font-semibold text-[var(--chip-primary-text)]">Engineer → PM</span>
                  </div>
                  <PortalCardTitle className="text-2xl sm:text-3xl mb-4">
                    I speak both languages fluently
                  </PortalCardTitle>
                  <PortalCardDescription className="text-base sm:text-lg leading-relaxed">
                    At BLOX Digital, I didn't just implement features—I owned the technical lifecycle of product initiatives. 
                    I partnered with Product and Design to de-risk complex requirements early, identifying API limitations 
                    and architectural trade-offs before a single line of code was written.
                  </PortalCardDescription>
                </div>
                <div className="flex-1">
                  <PortalCardDescription className="text-base sm:text-lg leading-relaxed">
                    My background allows me to earn the trust of engineering teams immediately. I can dive into API specs, 
                    understand database schemas, and make informed decisions about technical debt versus speed.
                  </PortalCardDescription>
                  <p className="mt-6 text-[var(--text-primary)] font-medium text-lg">
                    I'm now applying this rigorous technical lens to product strategy, ensuring we build scalable solutions 
                    that deliver real value.
                  </p>
                </div>
              </div>
            </PortalCard>

            {/* Stats/Highlights */}
            <NanoCard delay={0.2} className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[var(--chip-primary-bg)]">
                  <Database className="w-6 h-6 text-[var(--chip-primary-text)]" />
                </div>
                <div>
                  <NanoCardTitle className="text-lg mb-2">Technical Due Diligence</NanoCardTitle>
                  <NanoCardDescription>
                    API specs, database schemas, system architecture—I understand the constraints before defining the solution.
                  </NanoCardDescription>
                </div>
              </div>
            </NanoCard>

            <NanoCard delay={0.3} className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[var(--chip-secondary-bg)]">
                  <Users className="w-6 h-6 text-[var(--chip-secondary-text)]" />
                </div>
                <div>
                  <NanoCardTitle className="text-lg mb-2">Cross-Functional Trust</NanoCardTitle>
                  <NanoCardDescription>
                    Engineering teams trust me because I've been in their shoes. I bridge the gap between vision and reality.
                  </NanoCardDescription>
                </div>
              </div>
            </NanoCard>
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section id="process" className="mb-20 sm:mb-32 scroll-mt-32">
        <h3 className="text-display-l font-bold mb-8 sm:mb-12 tracking-tight max-w-5xl mx-auto text-[var(--text-primary)]">My Process</h3>
        <BentoGrid className="max-w-5xl mx-auto">
          <NanoCard delay={0.1} className="col-span-4 md:col-span-6 md:row-span-2 p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="mb-6"><DiscoverGraphic /></div>
              <NanoCardTitle className="mb-3">Discover & Define</NanoCardTitle>
              <NanoCardDescription>
                I start by understanding the 'why'. I analyze user data, interview stakeholders, and define success metrics before discussing solutions.
              </NanoCardDescription>
            </div>
            <Users className="h-6 w-6 text-[var(--lum-neon-purple)] mt-6" />
          </NanoCard>
          
          <NanoCard delay={0.2} className="col-span-4 md:col-span-3 md:row-span-2 p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="mb-6"><FeasibilityGraphic /></div>
              <NanoCardTitle className="mb-3">Technical Feasibility</NanoCardTitle>
              <NanoCardDescription>
                I evaluate architectural constraints early. I work with engineers to identify risks, dependencies, and trade-offs to ensure realistic roadmaps.
              </NanoCardDescription>
            </div>
            <Code2 className="h-6 w-6 text-[var(--lum-neon-blue)] mt-6" />
          </NanoCard>

          <NanoCard delay={0.3} className="col-span-4 md:col-span-3 md:row-span-2 p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="mb-6"><ExecuteGraphic /></div>
              <NanoCardTitle className="mb-3">Execute & Iterate</NanoCardTitle>
              <NanoCardDescription>
                I prioritize iterative delivery. I use data from each release to refine the backlog, ensuring we're always building the highest-value features.
              </NanoCardDescription>
            </div>
            <BarChart3 className="h-6 w-6 text-[var(--neon-primary-end)] mt-6" />
          </NanoCard>
        </BentoGrid>
      </section>

      {/* Experience */}
      <section id="experience" className="mb-20 sm:mb-32 scroll-mt-32 max-w-5xl mx-auto">
        <h3 className="text-display-l font-bold mb-8 sm:mb-12 tracking-tight text-[var(--text-primary)]">Experience</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
          <NanoCard delay={0.1} className="col-span-1 p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <h4 className="text-title-m font-bold text-[var(--text-primary)] hover-weight-shift">Frontend Software Engineer</h4>
              <span className="text-label-s font-semibold text-[var(--chip-blue-text)] font-mono bg-[var(--chip-blue-bg)] px-3 py-1 rounded-full border border-[var(--chip-blue-border)]">Present</span>
            </div>
            <div className="text-body-l text-[var(--text-secondary)] mb-6 font-medium">BLOX Digital</div>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-body-l">
              Led front‑end development on BLOX NXT CMS, shipping 20+ customer‑visible features across content authoring, audience, and analytics workflows.
            </p>
            <ul className="list-disc list-inside space-y-4 text-[var(--text-secondary)] text-body-l marker:text-[var(--lum-neon-blue)]">
              <li>Architected payment integrations supporting 2M+ paid subscribers.</li>
              <li>Established a reusable component library, accelerating feature delivery by ~30%.</li>
              <li>Improved perceived performance via render profiling and request batching.</li>
              <li>Mentored peers and advocated for accessibility (WCAG).</li>
            </ul>
          </NanoCard>
          
          <NanoCard delay={0.2} className="col-span-1 p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <h4 className="text-title-m font-bold text-[var(--text-primary)] hover-weight-shift">Instructional Assistant</h4>
              <span className="text-label-s font-medium text-[var(--text-tertiary)] font-mono bg-[var(--glass-base)] px-3 py-1 rounded-full border border-[var(--glass-border)]">Previous</span>
            </div>
            <div className="text-body-l text-[var(--text-secondary)] mb-6 font-medium">General Assembly</div>
            <p className="text-[var(--text-secondary)] leading-relaxed text-body-l">
              Supported a cohort of 60+ students in full‑stack fundamentals, providing code reviews and debugging sessions.
            </p>
          </NanoCard>
        </BentoGrid>
      </section>

      {/* Skills */}
      <section className="mb-20 sm:mb-32 scroll-mt-32 max-w-5xl mx-auto">
        <h3 className="text-display-l font-bold mb-8 sm:mb-12 tracking-tight text-[var(--text-primary)]">Skills</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <NanoCard delay={0.1} className="col-span-1 p-6 sm:p-10">
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="p-3 rounded-2xl bg-[var(--chip-blue-bg)] text-[var(--chip-blue-text)]">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-title-m text-[var(--text-primary)]">Technical Product Management</h4>
            </div>
            <ul className="space-y-4 sm:space-y-5">
              {[
                "Technical Feasibility Analysis",
                "API Design & Strategy",
                "System Architecture Review",
                "Data-Driven Roadmapping",
                "Agile & Scrum Methodologies",
                "Stakeholder Management"
              ].map((skill) => (
                <li key={skill} className="flex items-start sm:items-center gap-3 text-body-l text-[var(--text-secondary)]">
                  <div className="h-2 w-2 rounded-full bg-[var(--chip-blue-text)] mt-2 sm:mt-0 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </NanoCard>

          <NanoCard delay={0.2} className="col-span-1 p-6 sm:p-10">
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="p-3 rounded-2xl bg-[var(--chip-purple-bg)] text-[var(--chip-purple-text)]">
                <Code2 className="h-6 w-6" />
              </div>
              <h4 className="text-title-m text-[var(--text-primary)]">Engineering</h4>
            </div>
            <ul className="space-y-4 sm:space-y-5">
              {[
                "React, TypeScript, Next.js",
                "Material UI (MUI)",
                "React Query & Hook Form",
                "Node.js & Express.js",
                "Accessibility (WCAG)"
              ].map((skill) => (
                <li key={skill} className="flex items-start sm:items-center gap-3 text-body-l text-[var(--text-secondary)]">
                  <div className="h-2 w-2 rounded-full bg-[var(--chip-purple-text)] mt-2 sm:mt-0 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </NanoCard>
        </BentoGrid>
      </section>

      {/* Projects / Case Studies — Using Portal Cards */}
      <section id="projects" className="mb-20 sm:mb-32 scroll-mt-32 max-w-5xl mx-auto">
        <h3 className="text-display-l font-bold mb-8 sm:mb-12 tracking-tight text-[var(--text-primary)]">Case Studies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/projects/email-campaign-system" className="block h-full">
            <PortalCard delay={0.1} glow="cyber-lime" className="h-full p-10 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-[var(--chip-primary-bg)] text-[var(--chip-primary-text)]">
                  <Layout className="h-6 w-6" />
                </div>
                <ArrowRight className="w-6 h-6 text-[var(--text-tertiary)] -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
              <PortalCardTitle className="mb-4 text-title-l">Email Campaign Management System</PortalCardTitle>
              <PortalCardDescription className="text-body-l">
                Built a multi‑step wizard with advanced validation and natural‑language scheduling. Reduced setup friction and increased successful campaign launches.
              </PortalCardDescription>
            </PortalCard>
          </a>
          
          <a href="/projects/blox-nxt-cms-rebuild" className="block h-full">
            <PortalCard delay={0.2} glow="cotton-candy" className="h-full p-10 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-[var(--chip-secondary-bg)] text-[var(--chip-secondary-text)]">
                  <Database className="h-6 w-6" />
                </div>
                <ArrowRight className="w-6 h-6 text-[var(--text-tertiary)] -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
              <PortalCardTitle className="mb-4 text-title-l">BLOX NXT CMS Rebuild</PortalCardTitle>
              <PortalCardDescription className="text-body-l">
                Contributed to modular, pattern‑driven front‑end architecture. Built data‑driven dashboards and real‑time authoring affordances to streamline editorial workflows.
              </PortalCardDescription>
            </PortalCard>
          </a>
        </div>
      </section>

      {/* Contact — Glass-Lume material */}
      <section id="contact" className="scroll-mt-32 pb-24">
        <PortalCard glow="aurora" className="px-6 py-16 text-center sm:px-16">
          <h3 className="text-display-m font-semibold text-[var(--text-primary)] mb-6 on-glass">Ready to Connect?</h3>
          <p className="text-body-l text-[var(--text-secondary)] mb-10 max-w-lg mx-auto on-glass">
            I'm currently open to Product Management roles where I can leverage my engineering background to build better products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <JellyButton href="mailto:your.email@example.com" variant="cyber-lime">
              Send me an email
            </JellyButton>
            <GhostButton href="https://linkedin.com" accentColor="cotton-candy">
              Connect on LinkedIn
            </GhostButton>
          </div>
        </PortalCard>
      </section>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Layout, Users, BarChart3, Database } from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight";
import { BentoGrid } from "@/components/ui/bento-grid";
import { NanoCard, NanoCardTitle, NanoCardDescription } from "@/components/ui/nano-card";
import { DiscoverGraphic, FeasibilityGraphic, ExecuteGraphic } from "@/components/ui/process-graphics";

export default function Home() {
  return (
    <main className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 md:pl-32">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--color-neon-blue)" />

      {/* Hero Section */}
      <section className="mb-32 sm:mb-48 relative max-w-5xl mx-auto pt-16 sm:pt-24">
        <div className="flex flex-col gap-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-8xl font-bold tracking-tighter text-[var(--text-primary)]"
          >
            <span className="text-glow">Cody Avila</span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-2xl sm:text-4xl font-medium text-[var(--text-secondary)] flex flex-wrap items-center gap-4 tracking-tight"
          >
            Frontend Engineer 
            <ArrowRight className="h-6 w-6 text-[var(--text-tertiary)]" />
            <span className="text-[var(--text-primary)]">Technical Product Manager</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl leading-relaxed max-w-2xl text-[var(--text-secondary)] font-normal"
          >
            I bridge the gap between engineering reality and product vision. 
            With deep roots in frontend architecture, I translate complex technical constraints into viable product strategies.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-5 mt-8"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-neon-blue)] px-8 py-4 text-base font-medium text-white transition-all hover:bg-[var(--color-neon-blue)]/80 hover:shadow-[0_0_25px_var(--color-neon-blue)]"
            >
              Get in Touch
            </a>
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-base)] backdrop-blur-sm px-8 py-4 text-base font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--glass-elevated)] hover:border-[var(--glass-border-highlight)]"
            >
              View Case Studies
            </a>
          </motion.div>
        </div>
      </section>

      {/* About / Transition Story */}
      <section id="about" className="mb-24 sm:mb-40 scroll-mt-32 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 tracking-tight text-[var(--text-primary)]">The Technical Edge</h3>
        <div className="prose prose-lg max-w-none text-[var(--text-secondary)]">
          <p className="leading-relaxed">
            At BLOX Digital, I didn't just implement features; I owned the technical lifecycle of product initiatives. 
            I partnered with Product and Design to de-risk complex requirements early, identifying API limitations and architectural trade-offs before a single line of code was written.
          </p>
          <p className="leading-relaxed mt-6">
            My background allows me to earn the trust of engineering teams immediately. I can dive into API specs, understand database schemas, 
            and make informed decisions about technical debt versus speed. I'm now applying this rigorous technical lens to product strategy, ensuring we build scalable solutions that deliver real value.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="mb-24 sm:mb-40 scroll-mt-32">
        <h3 className="text-3xl font-bold mb-12 tracking-tight max-w-5xl mx-auto text-[var(--text-primary)]">My Process</h3>
        <BentoGrid className="max-w-5xl mx-auto gap-8">
          <NanoCard className="md:col-span-1 p-8 flex flex-col justify-between">
            <div>
              <div className="mb-6"><DiscoverGraphic /></div>
              <NanoCardTitle className="mb-3">Discover & Define</NanoCardTitle>
              <NanoCardDescription>
                I start by understanding the 'why'. I analyze user data, interview stakeholders, and define success metrics before discussing solutions.
              </NanoCardDescription>
            </div>
            <Users className="h-6 w-6 text-[var(--text-tertiary)] mt-6" />
          </NanoCard>
          
          <NanoCard className="md:col-span-1 p-8 flex flex-col justify-between">
            <div>
              <div className="mb-6"><FeasibilityGraphic /></div>
              <NanoCardTitle className="mb-3">Technical Feasibility</NanoCardTitle>
              <NanoCardDescription>
                I evaluate architectural constraints early. I work with engineers to identify risks, dependencies, and trade-offs to ensure realistic roadmaps.
              </NanoCardDescription>
            </div>
            <Code2 className="h-6 w-6 text-[var(--text-tertiary)] mt-6" />
          </NanoCard>

          <NanoCard className="md:col-span-1 p-8 flex flex-col justify-between">
            <div>
              <div className="mb-6"><ExecuteGraphic /></div>
              <NanoCardTitle className="mb-3">Execute & Iterate</NanoCardTitle>
              <NanoCardDescription>
                I prioritize iterative delivery. I use data from each release to refine the backlog, ensuring we're always building the highest-value features.
              </NanoCardDescription>
            </div>
            <BarChart3 className="h-6 w-6 text-[var(--text-tertiary)] mt-6" />
          </NanoCard>
        </BentoGrid>
      </section>

      {/* Experience */}
      <section id="experience" className="mb-24 sm:mb-40 scroll-mt-32 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 tracking-tight text-[var(--text-primary)]">Experience</h3>
        <div className="space-y-10">
          <NanoCard className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <h4 className="text-xl font-bold text-[var(--text-primary)]">Frontend Software Engineer</h4>
              <span className="text-sm font-medium text-[var(--color-neon-blue)] font-mono bg-[var(--color-neon-blue)]/10 px-3 py-1 rounded-full border border-[var(--color-neon-blue)]/20">Present</span>
            </div>
            <div className="text-lg text-[var(--text-secondary)] mb-6 font-medium">BLOX Digital</div>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-lg">
              Led front‑end development on BLOX NXT CMS, shipping 20+ customer‑visible features across content authoring, audience, and analytics workflows.
            </p>
            <ul className="list-disc list-inside space-y-4 text-[var(--text-secondary)] text-base marker:text-[var(--color-neon-blue)]">
              <li>Architected payment integrations supporting 2M+ paid subscribers.</li>
              <li>Established a reusable component library, accelerating feature delivery by ~30%.</li>
              <li>Improved perceived performance via render profiling and request batching.</li>
              <li>Mentored peers and advocated for accessibility (WCAG).</li>
            </ul>
          </NanoCard>
          
          <NanoCard className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <h4 className="text-xl font-bold text-[var(--text-primary)]">Instructional Assistant</h4>
              <span className="text-sm font-medium text-[var(--text-tertiary)] font-mono bg-[var(--glass-base)] px-3 py-1 rounded-full border border-[var(--glass-border)]">Previous</span>
            </div>
            <div className="text-lg text-[var(--text-secondary)] mb-6 font-medium">General Assembly</div>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              Supported a cohort of 60+ students in full‑stack fundamentals, providing code reviews and debugging sessions.
            </p>
          </NanoCard>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-24 sm:mb-40 scroll-mt-32 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 tracking-tight text-[var(--text-primary)]">Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <NanoCard className="p-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="p-3 rounded-2xl bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)]">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-[var(--text-primary)]">Technical Product Management</h4>
            </div>
            <ul className="space-y-5">
              {[
                "Technical Feasibility Analysis",
                "API Design & Strategy",
                "System Architecture Review",
                "Data-Driven Roadmapping",
                "Agile & Scrum Methodologies",
                "Stakeholder Management"
              ].map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-[var(--text-secondary)] text-base">
                  <div className="h-2 w-2 rounded-full bg-[var(--color-neon-blue)]/50" />
                  {skill}
                </li>
              ))}
            </ul>
          </NanoCard>

          <NanoCard className="p-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="p-3 rounded-2xl bg-[var(--color-neon-violet)]/10 text-[var(--color-neon-violet)]">
                <Code2 className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-[var(--text-primary)]">Engineering</h4>
            </div>
            <ul className="space-y-5">
              {[
                "React, TypeScript, Next.js",
                "Material UI (MUI)",
                "React Query & Hook Form",
                "Node.js & Express.js",
                "Accessibility (WCAG)"
              ].map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-[var(--text-secondary)] text-base">
                  <div className="h-2 w-2 rounded-full bg-[var(--color-neon-violet)]/50" />
                  {skill}
                </li>
              ))}
            </ul>
          </NanoCard>
        </div>
      </section>

      {/* Projects / Case Studies */}
      <section id="projects" className="mb-24 sm:mb-40 scroll-mt-32 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 tracking-tight text-[var(--text-primary)]">Case Studies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <a href="/projects/email-campaign-system" className="block h-full">
            <NanoCard className="h-full p-10 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)]">
                  <Layout className="h-6 w-6" />
                </div>
                <ArrowRight className="w-6 h-6 text-[var(--text-tertiary)] -rotate-45" />
              </div>
              <NanoCardTitle className="mb-4 text-2xl">Email Campaign Management System</NanoCardTitle>
              <NanoCardDescription className="text-base">
                Built a multi‑step wizard with advanced validation and natural‑language scheduling. Reduced setup friction and increased successful campaign launches.
              </NanoCardDescription>
            </NanoCard>
          </a>
          
          <a href="/projects/blox-nxt-cms-rebuild" className="block h-full">
            <NanoCard className="h-full p-10 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-[var(--color-neon-violet)]/10 text-[var(--color-neon-violet)]">
                  <Database className="h-6 w-6" />
                </div>
                <ArrowRight className="w-6 h-6 text-[var(--text-tertiary)] -rotate-45" />
              </div>
              <NanoCardTitle className="mb-4 text-2xl">BLOX NXT CMS Rebuild</NanoCardTitle>
              <NanoCardDescription className="text-base">
                Contributed to modular, pattern‑driven front‑end architecture. Built data‑driven dashboards and real‑time authoring affordances to streamline editorial workflows.
              </NanoCardDescription>
            </NanoCard>
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-32 pb-24">
        <NanoCard className="px-6 py-16 text-center sm:px-16 bg-gradient-to-br from-[var(--glass-elevated)] to-transparent">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Ready to Connect?</h3>
          <p className="text-[var(--text-secondary)] mb-10 max-w-lg mx-auto">
            I'm currently open to Product Management roles where I can leverage my engineering background to build better products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="mailto:your.email@example.com" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--color-midnight)] font-medium hover:bg-[var(--text-primary)]/90 transition-colors">
              Send me an email
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-full border border-[var(--glass-border-highlight)] text-[var(--text-primary)] font-medium hover:bg-[var(--glass-elevated)] transition-colors">
              Connect on LinkedIn
            </a>
          </div>
        </NanoCard>
      </section>
    </main>
  );
}

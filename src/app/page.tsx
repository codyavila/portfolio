"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Code2, Layout, Users, BarChart3, Database } from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight";
import { BentoGrid } from "@/components/ui/bento-grid";
import { NanoCard, NanoCardTitle, NanoCardDescription } from "@/components/ui/nano-card";
import { PortalCard, PortalCardTitle, PortalCardDescription } from "@/components/ui/portal-card";
import { DiscoverGraphic, FeasibilityGraphic, ExecuteGraphic } from "@/components/ui/process-graphics";
import { JellyButton, GhostButton } from "@/components/ui/jelly-button";
import { SectionDivider } from "@/components/ui/section-divider";
import { KineticText } from "@/components/ui/kinetic-text";
import { useEffect, useState } from "react";
import Link from "next/link";

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

// Key for sessionStorage to track if hero animation has played
const HERO_ANIMATED_KEY = 'hero-has-animated';

const FEATURED_POSTS = [
  {
    slug: "building-portfolio",
    title: "Behind the Build: A Portfolio Journey",
    summary: "The messy, iterative, coffee-fueled story of how this portfolio came together—failures, breakthroughs, and lessons learned.",
    date: "2025-12-15",
    tags: ["Process", "Web Development"]
  },
  {
    slug: "glassmorphism-done-right",
    title: "Glassmorphism Done Right",
    summary: "How to use glass effects without sacrificing readability, performance, or accessibility.",
    date: "2025-12-12",
    tags: ["Design", "UI"]
  }
];

export default function Home() {
  // Track if this is the initial page load to prevent re-animation on hash navigation
  // Start with null to indicate we haven't checked yet, avoiding hydration mismatch
  const [animationState, setAnimationState] = useState<'pending' | 'animate' | 'skip'>('pending');
  
  useEffect(() => {
    // Check sessionStorage after mount to avoid hydration mismatch
    const alreadyAnimated = sessionStorage.getItem(HERO_ANIMATED_KEY) === 'true';
    setAnimationState(alreadyAnimated ? 'skip' : 'animate');
    
    // Mark as animated after a delay
    if (!alreadyAnimated) {
      const timer = setTimeout(() => {
        sessionStorage.setItem(HERO_ANIMATED_KEY, 'true');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none z-0">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--neon-primary-end)" />
      </div>
      
      {/* Secondary Spotlight for lower sections */}
      <div className="absolute top-[40%] right-0 w-full h-screen pointer-events-none z-0">
        <Spotlight className="-top-40 right-0 md:right-60 md:-top-20" fill="var(--neon-secondary-end)" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 md:pl-32">
        {/* Global Connecting Line - The "System Bus" */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--neon-primary-end)] to-transparent opacity-20 hidden md:block" />

        {/* Hero Section — Entry Sequence with stagger */}
      <motion.section 
        className="mb-24 sm:mb-32 relative z-10 max-w-6xl mx-auto pt-16 sm:pt-24"
        variants={containerVariants}
        initial={animationState === 'animate' ? "hidden" : false}
        animate="visible"
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="flex flex-col gap-8 sm:gap-10">
            <KineticText 
              as="h1"
              variants={itemVariants}
              className="text-display-xl font-bold tracking-tighter text-[var(--text-primary)] heartbeat"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              velocityFactor={1.5}
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
            </KineticText>
            <KineticText 
              as="h2"
              variants={itemVariants}
              className="text-2xl sm:text-4xl font-medium text-[var(--text-primary)] flex flex-wrap items-center gap-4 tracking-tight"
              velocityFactor={1}
            >
              Frontend Engineer 
              <ArrowRight className="h-6 w-6 text-[var(--neon-primary-end)]" />
              <span className="text-[var(--text-secondary)]">Technical Product Manager</span>
            </KineticText>
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
        </div>
      </motion.section>

      <SectionDivider variant="glow" />

      {/* Featured Projects Section - New Addition */}
      <section id="projects" className="mb-20 sm:mb-32 scroll-mt-32 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-12"
        >
          <h3 className="text-display-l font-bold tracking-tight text-[var(--text-primary)] relative inline-block mb-4">
            Featured Work
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 rounded-full bg-gradient-to-r from-[var(--neon-accent-start)] to-[var(--neon-accent-end)] opacity-70" />
          </h3>
          <p className="text-body-l text-[var(--text-secondary)] max-w-2xl">
            A selection of projects where I&apos;ve applied my technical background to solve complex product challenges.
          </p>
        </motion.div>

        <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <Link href="/projects/blox-nxt-cms-rebuild" className="group">
            <PortalCard className="h-full p-8 transition-all duration-300 group-hover:border-[var(--neon-primary-start)]" glow="solar-flare">
              <div className="flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--chip-primary-bg)] text-[var(--chip-primary-text)] border border-[var(--chip-primary-border)]">
                      CMS Architecture
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)]">2024</span>
                  </div>
                  <PortalCardTitle className="text-2xl mb-3 group-hover:text-[var(--neon-primary-end)] transition-colors">
                    BLOX NXT CMS Rebuild
                  </PortalCardTitle>
                  <PortalCardDescription>
                    Leading the architectural overhaul of a legacy CMS serving 2,000+ media sites. 
                    Migrating from Angular.js to a modern React/Next.js ecosystem.
                  </PortalCardDescription>
                </div>
                <div className="flex items-center text-[var(--neon-primary-end)] font-medium text-sm group-hover:translate-x-2 transition-transform">
                  View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </PortalCard>
          </Link>

          {/* Project 2 */}
          <Link href="/projects/email-campaign-system" className="group">
            <PortalCard className="h-full p-8 transition-all duration-300 group-hover:border-[var(--neon-secondary-start)]" glow="cotton-candy">
              <div className="flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--chip-secondary-bg)] text-[var(--chip-secondary-text)] border border-[var(--chip-secondary-border)]">
                      System Design
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)]">2023</span>
                  </div>
                  <PortalCardTitle className="text-2xl mb-3 group-hover:text-[var(--neon-secondary-end)] transition-colors">
                    Email Campaign System
                  </PortalCardTitle>
                  <PortalCardDescription>
                    Designing a high-throughput email delivery system capable of sending 50M+ emails daily. 
                    Focused on deliverability, analytics, and template flexibility.
                  </PortalCardDescription>
                </div>
                <div className="flex items-center text-[var(--neon-secondary-end)] font-medium text-sm group-hover:translate-x-2 transition-transform">
                  View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </PortalCard>
          </Link>
        </BentoGrid>
      </section>

      <SectionDivider variant="gradient" />

      {/* About / Transition Story — The Technical Edge */}
      <section id="about" className="mb-20 sm:mb-32 scroll-mt-32 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div 
            className="mb-10 sm:mb-14"
            animate={{ opacity: [0.95, 1, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <h3 className="text-display-m text-[var(--text-primary)] relative inline-block">
              The Technical Edge
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 rounded-full bg-gradient-to-r from-[var(--neon-primary-start)] to-[var(--neon-primary-end)] opacity-70" />
            </h3>
          </motion.div>
          
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
                    At BLOX Digital, I didn&apos;t just implement features—I owned the technical lifecycle of product initiatives. 
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
                    I&apos;m now applying this rigorous technical lens to product strategy, ensuring we build scalable solutions 
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
                    Engineering teams trust me because I&apos;ve been in their shoes. I bridge the gap between vision and reality.
                  </NanoCardDescription>
                </div>
              </div>
            </NanoCard>
          </div>
        </motion.div>
      </section>

      <SectionDivider variant="glow" />

      {/* Process Section - The Build Protocol */}
      <section id="process" className="mb-20 sm:mb-32 scroll-mt-32">
        <motion.div 
          className="max-w-5xl mx-auto mb-12 sm:mb-16"
          animate={{ opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <h3 className="text-display-l font-bold tracking-tight text-[var(--text-primary)] relative inline-block">
            The Build Protocol
            <span className="absolute -bottom-2 left-0 w-1/4 h-1 rounded-full bg-gradient-to-r from-[var(--lum-neon-blue)] to-[var(--lum-neon-purple)] opacity-70" />
          </h3>
          <p className="mt-4 text-body-l text-[var(--text-secondary)] max-w-2xl">
            A rigorous, engineering-driven methodology for shipping high-impact products.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {/* Phase 1: Deconstruction */}
          <PortalCard glow="cotton-candy" className="p-0 overflow-hidden group">
            <div className="grid md:grid-cols-[240px_1fr] h-full">
              <div className="bg-[var(--glass-2-fill)] p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--glass-1-border)] relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-mono text-[var(--lum-neon-purple)] uppercase tracking-wider mb-2 block">Phase 01</span>
                  <h4 className="text-2xl font-bold text-[var(--text-primary)]">Deconstruct</h4>
                </div>
                <div className="mt-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[var(--chip-purple-bg)] flex items-center justify-center text-[var(--chip-purple-text)]">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                {/* Decorative background graphic */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--lum-neon-purple)] opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Discovery & Technical Definition</h5>
                <p className="text-body-l text-[var(--text-secondary)] leading-relaxed mb-6">
                  I don&apos;t just gather requirements; I deconstruct them. I analyze user data and stakeholder needs, then immediately map them to technical realities—identifying API constraints, data models, and potential blockers before a roadmap is even drafted.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["User Analysis", "Tech Spec Definition", "Success Metrics"].map((tag) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--glass-2-border)] text-[var(--text-tertiary)] bg-[var(--glass-ghost-fill)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </PortalCard>

          {/* Phase 2: Architecture */}
          <PortalCard glow="cyber-lime" className="p-0 overflow-hidden group">
            <div className="grid md:grid-cols-[240px_1fr] h-full">
              <div className="bg-[var(--glass-2-fill)] p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--glass-1-border)] relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-mono text-[var(--lum-neon-blue)] uppercase tracking-wider mb-2 block">Phase 02</span>
                  <h4 className="text-2xl font-bold text-[var(--text-primary)]">Architect</h4>
                </div>
                <div className="mt-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[var(--chip-blue-bg)] flex items-center justify-center text-[var(--chip-blue-text)]">
                    <Code2 className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--lum-neon-blue)] opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">System Design & Feasibility</h5>
                <p className="text-body-l text-[var(--text-secondary)] leading-relaxed mb-6">
                  This is where engineering meets strategy. I work with the dev team to design scalable architectures, choosing the right tools for the job. We define the &quot;Happy Path&quot; and the edge cases, ensuring the solution is robust, secure, and maintainable.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["System Architecture", "API Design", "Risk Assessment"].map((tag) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--glass-2-border)] text-[var(--text-tertiary)] bg-[var(--glass-ghost-fill)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </PortalCard>

          {/* Phase 3: Execution */}
          <PortalCard glow="solar-flare" className="p-0 overflow-hidden group">
            <div className="grid md:grid-cols-[240px_1fr] h-full">
              <div className="bg-[var(--glass-2-fill)] p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--glass-1-border)] relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-mono text-[var(--neon-primary-end)] uppercase tracking-wider mb-2 block">Phase 03</span>
                  <h4 className="text-2xl font-bold text-[var(--text-primary)]">Execute</h4>
                </div>
                <div className="mt-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[var(--chip-primary-bg)] flex items-center justify-center text-[var(--chip-primary-text)]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--neon-primary-end)] opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h5 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Iterative Delivery & Optimization</h5>
                <p className="text-body-l text-[var(--text-secondary)] leading-relaxed mb-6">
                  Shipping is just the beginning. I prioritize iterative releases to gather real-world data. We monitor performance, track user behavior, and refine the backlog based on evidence, not assumptions. It&apos;s a continuous loop of improvement.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Agile Delivery", "Performance Monitoring", "Data-Driven Iteration"].map((tag) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--glass-2-border)] text-[var(--text-tertiary)] bg-[var(--glass-ghost-fill)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </PortalCard>
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Experience */}
      <section id="experience" className="mb-20 sm:mb-32 scroll-mt-32 max-w-5xl mx-auto">
        <motion.div 
          className="mb-8 sm:mb-12"
          animate={{ opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <h3 className="text-display-l font-bold tracking-tight text-[var(--text-primary)] relative inline-block">
            Experience
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 rounded-full bg-gradient-to-r from-[var(--neon-secondary-start)] to-[var(--neon-secondary-end)] opacity-70" />
          </h3>
        </motion.div>
        
        <div className="flex flex-col gap-8">
          {/* Current Role - Highlighted */}
          <PortalCard glow="cyber-lime" className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 gap-4">
              <div className="flex items-start gap-5">
                <motion.div 
                  className="p-4 rounded-2xl bg-gradient-to-br from-[var(--chip-blue-bg)] to-transparent border border-[var(--chip-blue-border)]"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code2 className="h-6 w-6 text-[var(--chip-blue-text)]" />
                </motion.div>
                <div>
                  <h4 className="text-title-l font-bold text-[var(--text-primary)] mb-1">Frontend Software Engineer</h4>
                  <div className="text-body-l text-[var(--text-secondary)] font-medium flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--chip-blue-text)] animate-pulse" />
                    BLOX Digital
                  </div>
                </div>
              </div>
              <motion.span 
                className="self-start text-label-s font-semibold text-[var(--chip-primary-text)] font-mono px-4 py-1.5 rounded-full border relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--chip-primary-bg), transparent)',
                  borderColor: 'var(--chip-primary-border)',
                }}
                animate={{ boxShadow: ['0 0 10px var(--neon-primary-end)', '0 0 20px var(--neon-primary-end)', '0 0 10px var(--neon-primary-end)'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="relative z-10">Current Role</span>
              </motion.span>
            </div>
            
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-body-l max-w-3xl">
              Led front‑end development on BLOX NXT CMS, shipping 20+ customer‑visible features across content authoring, audience, and analytics workflows.
            </p>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { text: "Architected payment integrations supporting 2M+ paid subscribers.", color: "var(--lum-neon-blue)" },
                { text: "Established a reusable component library, accelerating feature delivery by ~30%.", color: "var(--lum-neon-purple)" },
                { text: "Improved perceived performance via render profiling and request batching.", color: "var(--lum-neon-green)" },
                { text: "Mentored peers and advocated for accessibility (WCAG).", color: "var(--lum-cotton-candy)" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-start gap-4 group/item"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
                >
                  <div className="relative mt-1.5">
                    <div className="absolute inset-0 rounded-full blur-sm opacity-50" style={{ backgroundColor: item.color }} />
                    <div className="relative h-2.5 w-2.5 rounded-full border border-[var(--glass-1-border)]" style={{ backgroundColor: item.color }} />
                  </div>
                  <span className="text-body-m text-[var(--text-secondary)] group-hover/item:text-[var(--text-primary)] transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </PortalCard>
          
          {/* Previous Role - Secondary */}
          <NanoCard className="p-8 sm:p-10 opacity-90 hover:opacity-100 transition-opacity">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--glass-ghost-fill)] to-transparent border border-[var(--glass-2-border)]">
                  <Users className="h-5 w-5 text-[var(--text-tertiary)]" />
                </div>
                <div>
                  <h4 className="text-title-m font-bold text-[var(--text-primary)]">Instructional Assistant</h4>
                  <div className="text-body-m text-[var(--text-tertiary)] font-medium">General Assembly</div>
                </div>
              </div>
              <span className="text-label-s font-medium text-[var(--text-tertiary)] font-mono px-4 py-1.5 rounded-full border border-[var(--glass-2-border)] bg-[var(--glass-ghost-fill)]">
                Previous
              </span>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed text-body-l">
              Supported a cohort of 60+ students in full‑stack fundamentals, providing code reviews and debugging sessions.
            </p>
          </NanoCard>
        </div>
      </section>

      <SectionDivider variant="glow" />

      {/* Skills */}
      <section className="mb-20 sm:mb-32 scroll-mt-32 max-w-5xl mx-auto">
        <motion.div 
          className="mb-8 sm:mb-12"
          animate={{ opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <h3 className="text-display-l font-bold tracking-tight text-[var(--text-primary)] relative inline-block">
            Skills
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 rounded-full bg-gradient-to-r from-[var(--chip-blue-text)] to-[var(--chip-purple-text)] opacity-70" />
          </h3>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Skills */}
          <PortalCard glow="cotton-candy" className="p-8 h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-[var(--chip-blue-bg)] text-[var(--chip-blue-text)]">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-title-m text-[var(--text-primary)] font-bold">Technical Product Management</h4>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                "Technical Feasibility Analysis",
                "API Design & Strategy",
                "System Architecture Review",
                "Data-Driven Roadmapping",
                "Agile & Scrum Methodologies",
                "Stakeholder Management"
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--glass-2-fill)] border border-[var(--glass-1-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--chip-blue-border)] hover:bg-[var(--chip-blue-bg)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </PortalCard>

          {/* Engineering Skills */}
          <PortalCard glow="cyber-lime" className="p-8 h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-[var(--chip-purple-bg)] text-[var(--chip-purple-text)]">
                <Code2 className="h-6 w-6" />
              </div>
              <h4 className="text-title-m text-[var(--text-primary)] font-bold">Engineering</h4>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                "React", "TypeScript", "Next.js",
                "Material UI (MUI)", "Tailwind CSS",
                "React Query", "React Hook Form",
                "Node.js", "Express.js",
                "Accessibility (WCAG)", "Performance Optimization"
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--glass-2-fill)] border border-[var(--glass-1-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--chip-purple-border)] hover:bg-[var(--chip-purple-bg)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </PortalCard>
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Latest Insights / Blog */}
      <section id="blog" className="mb-20 sm:mb-32 scroll-mt-32 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-display-l font-bold tracking-tight text-[var(--text-primary)] relative inline-block mb-4">
              Latest Insights
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 rounded-full bg-gradient-to-r from-[var(--lum-neon-green)] to-[var(--lum-neon-cyan)] opacity-70" />
            </h3>
            <p className="text-body-l text-[var(--text-secondary)] max-w-xl">
              Thoughts on engineering, product strategy, and the intersection of both.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/blog" 
              className="group inline-flex items-center gap-2 text-[var(--text-primary)] font-medium hover:text-[var(--neon-primary-end)] transition-colors"
            >
              View all posts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {FEATURED_POSTS.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
              <PortalCard 
                className="h-full p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg" 
                glow={i === 0 ? "cyber-lime" : "cotton-candy"}
                delay={i * 0.1}
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono text-[var(--text-tertiary)]">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <div className="h-px w-4 bg-[var(--glass-2-border)]" />
                      <div className="flex gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs font-medium text-[var(--text-secondary)] bg-[var(--glass-2-fill)] px-2 py-0.5 rounded-full border border-[var(--glass-1-border)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--neon-primary-end)] transition-colors">
                      {post.title}
                    </h4>
                    
                    <p className="text-body-m text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-sm font-medium text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">
                    Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </PortalCard>
            </Link>
          ))}
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Contact — Glass-Lume material with aurora effect */}
      <section id="contact" className="scroll-mt-32 pb-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <PortalCard glow="aurora" className="relative overflow-hidden">
            {/* Aurora background effect */}
            <div className="absolute inset-0 overflow-hidden rounded-[24px]">
              <motion.div 
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30 dark:opacity-20"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, var(--neon-primary-start), var(--neon-primary-end), var(--lum-neon-cyan), var(--neon-secondary-start), var(--neon-secondary-end), var(--neon-primary-start))',
                  filter: 'blur(60px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="relative z-10 px-6 py-16 sm:px-16 text-center">
              <motion.div
                animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.01, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <h3 className="text-display-m font-semibold text-[var(--text-primary)] mb-6 on-glass">
                  Ready to Connect?
                </h3>
              </motion.div>
              
              <p className="text-body-l text-[var(--text-secondary)] mb-10 max-w-lg mx-auto on-glass leading-relaxed">
                I&apos;m currently open to Product Management roles where I can leverage my engineering background to build better products.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <JellyButton href="mailto:your.email@example.com" variant="cyber-lime">
                  Send me an email
                </JellyButton>
                <GhostButton href="https://linkedin.com" accentColor="cotton-candy">
                  Connect on LinkedIn
                </GhostButton>
              </div>
              
              {/* Decorative floating orbs */}
              <div className="absolute top-8 right-8 hidden sm:block">
                <motion.div 
                  className="h-3 w-3 rounded-full bg-[var(--neon-primary-end)] opacity-60"
                  style={{ boxShadow: '0 0 15px var(--neon-primary-end)' }}
                  animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute bottom-12 left-12 hidden sm:block">
                <motion.div 
                  className="h-2 w-2 rounded-full bg-[var(--neon-secondary-end)] opacity-60"
                  style={{ boxShadow: '0 0 12px var(--neon-secondary-end)' }}
                  animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </div>
          </PortalCard>
        </motion.div>
      </section>
      </main>
    </div>
  );
}

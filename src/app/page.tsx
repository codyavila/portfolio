import Link from "next/link";
import { ArrowRight, Code2, Layout, Users, BarChart3, Database, GitBranch, Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className="relative max-w-4xl mx-auto px-6 py-12 sm:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-dot-pattern opacity-50" />
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-blue-500/10 blur-[100px] rounded-full opacity-50 dark:bg-blue-500/20" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] bg-purple-500/10 blur-[100px] rounded-full opacity-50 dark:bg-purple-500/20" />

      {/* Hero Section */}
      <section className="mb-20 sm:mb-32 relative">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
              Cody Avila
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
            Frontend Engineer 
            <ArrowRight className="h-5 w-5 text-blue-500" />
            <span className="text-zinc-900 dark:text-zinc-100">Technical Product Manager</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl text-zinc-600 dark:text-zinc-400">
            I bridge the gap between engineering reality and product vision. 
            With deep roots in frontend architecture, I translate complex technical constraints into viable product strategies.
            I'm looking to leverage my engineering background to drive technical product roadmaps and build developer-centric tools.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700 hover:scale-105 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Get in Touch
            </a>
            <a href="#case-studies" className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-50 hover:scale-105 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900">
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* About / Transition Story */}
      <section id="about" className="mb-20 sm:mb-32 scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-8 tracking-tight">The Technical Edge</h3>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            At BLOX Digital, I didn't just implement features; I owned the technical lifecycle of product initiatives. 
            I partnered with Product and Design to de-risk complex requirements early, identifying API limitations and architectural trade-offs before a single line of code was written.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            My background allows me to earn the trust of engineering teams immediately. I can dive into API specs, understand database schemas, 
            and make informed decisions about technical debt versus speed. I'm now applying this rigorous technical lens to product strategy, ensuring we build scalable solutions that deliver real value.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mb-20 sm:mb-32 scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-8 tracking-tight">Experience</h3>
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-12">
          <div className="relative pl-8">
            <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-zinc-200 ring-4 ring-white dark:bg-zinc-800 dark:ring-black" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Frontend Software Engineer</h4>
              <span className="text-sm text-zinc-500 font-mono">Present</span>
            </div>
            <div className="text-zinc-600 dark:text-zinc-400 mb-4 font-medium">BLOX Digital</div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              Led front‑end development on BLOX NXT CMS, shipping 20+ customer‑visible features across content authoring, audience, and analytics workflows.
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 text-sm marker:text-zinc-300">
              <li>Architected payment integrations supporting 2M+ paid subscribers.</li>
              <li>Established a reusable component library, accelerating feature delivery by ~30%.</li>
              <li>Improved perceived performance via render profiling and request batching.</li>
              <li>Mentored peers and advocated for accessibility (WCAG).</li>
            </ul>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-zinc-200 ring-4 ring-white dark:bg-zinc-800 dark:ring-black" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Instructional Assistant</h4>
              <span className="text-sm text-zinc-500 font-mono">Previous</span>
            </div>
            <div className="text-zinc-600 dark:text-zinc-400 mb-4 font-medium">General Assembly</div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Supported a cohort of 60+ students in full‑stack fundamentals, providing code reviews and debugging sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-20 sm:mb-32 scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-8 tracking-tight">Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="group rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Technical Product Management</h4>
            </div>
            <ul className="space-y-3">
              {[
                "Technical Feasibility Analysis",
                "API Design & Strategy",
                "System Architecture Review",
                "Data-Driven Roadmapping",
                "Agile & Scrum Methodologies",
                "Stakeholder Management"
              ].map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="group rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <Code2 className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Engineering</h4>
            </div>
            <ul className="space-y-3">
              {[
                "React, TypeScript, Next.js",
                "Material UI (MUI)",
                "React Query & Hook Form",
                "Node.js & Express.js",
                "Accessibility (WCAG)"
              ].map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Projects / Case Studies */}
      <section id="case-studies" className="mb-20 sm:mb-32 scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-8 tracking-tight">Case Studies</h3>
        <div className="grid gap-6">
          {/* Project 1 */}
          <Link href="/projects/email-campaign-system" className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-blue-500/50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Email Campaign Management System</h4>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                  Built a multi‑step wizard with advanced validation and natural‑language scheduling. 
                  Reduced setup friction and increased successful campaign launches.
                </p>
              </div>
              <div className="shrink-0 p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <Layout className="h-6 w-6" />
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="text-zinc-900 dark:text-zinc-100">Problem</span>
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-zinc-900 dark:text-zinc-100">Solution</span>
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-zinc-900 dark:text-zinc-100">Result</span>
            </div>

            <div className="mt-8 flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Read Case Study 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

           {/* Project 2 */}
           <Link href="/projects/blox-nxt-cms-rebuild" className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-purple-500/50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">BLOX NXT CMS Rebuild</h4>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                  Contributed to modular, pattern‑driven front‑end architecture. 
                  Built data‑driven dashboards and real‑time authoring affordances to streamline editorial workflows.
                </p>
              </div>
              <div className="shrink-0 p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <Database className="h-6 w-6" />
              </div>
            </div>
            
            <div className="mt-8 flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Read Case Study 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24">
        <div className="rounded-3xl bg-zinc-900 px-6 py-12 text-center dark:bg-zinc-50/5 sm:px-12">
          <h3 className="text-2xl font-semibold text-white mb-4">Ready to Connect?</h3>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            I'm currently open to Product Management roles where I can leverage my engineering background to build better products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:your.email@example.com" className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition-colors">
              Send me an email
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 rounded-full border border-zinc-700 text-white font-medium hover:bg-zinc-800 transition-colors">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

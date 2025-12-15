import Link from "next/link";
import { ArrowRight, Code2, Layout, Users, BarChart3, Database, GitBranch, Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      {/* Hero Section */}
      <section className="mb-20 sm:mb-32">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cody Avila
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-zinc-600 dark:text-zinc-400">
            Frontend Engineer <span className="mx-2 text-zinc-400">➔</span> Product Manager
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl text-zinc-600 dark:text-zinc-400">
            I bridge the gap between technical feasibility and user value. 
            With a strong foundation in frontend engineering, I build products that solve real problems.
            Currently transitioning to Product Management to leverage my technical background in driving product strategy.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Get in Touch
            </a>
            <a href="#case-studies" className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900">
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* About / Transition Story */}
      <section id="about" className="mb-20 sm:mb-32 scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-8 tracking-tight">The Transition</h3>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            At BLOX Digital, I didn't just write code; I partnered with Product and Design to convert fuzzy requirements into shippable increments. 
            I drove backlog grooming, acceptance criteria, and QA sign‑off, ensuring that what we built actually delivered value to our 141M monthly users.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            My technical background allows me to communicate effectively with engineering teams, 
            understand technical constraints, and make informed trade-offs. Now, I'm applying 
            that rigorous analytical thinking and cross-functional collaboration experience to product strategy.
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
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Product Management</h4>
            </div>
            <ul className="space-y-3">
              {[
                "Roadmapping & Prioritization",
                "Data-Driven UX",
                "Stakeholder Management",
                "Agile & Scrum Methodologies",
                "Cross-functional Collaboration"
              ].map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
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
          <Link href="/projects/email-campaign-system" className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">
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
           <Link href="/projects/blox-nxt-cms-rebuild" className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">
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

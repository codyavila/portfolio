import Link from "next/link";
import { ArrowLeft, CheckCircle2, Database, Layers, Zap, Users } from "lucide-react";

export default function BloxNxtCmsRebuild() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
      <Link
        href="/#case-studies"
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Database className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            BLOX Digital
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          BLOX NXT CMS Rebuild
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Rebuilding the core content management system for over 2,000 media organizations, focusing on performance, scalability, and editorial workflow efficiency.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 border-y border-zinc-200 dark:border-zinc-800 py-8">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Role</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Lead Frontend Engineer</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Scale</h3>
          <p className="text-zinc-600 dark:text-zinc-400">141M+ Monthly Users</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Tech Stack</h3>
          <p className="text-zinc-600 dark:text-zinc-400">React, TypeScript, MUI</p>
        </div>
      </div>

      <section className="space-y-16">
        {/* Problem */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">The Challenge</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            BLOX Digital powers digital transformation for thousands of media organizations. The legacy systems needed to evolve to handle massive scale (6.8B+ annual pageviews) while providing a modern, efficient experience for editorial teams.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              Need for rapid feature delivery across multiple teams.
            </li>
            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              Inconsistent UI/UX patterns slowing down editorial workflows.
            </li>
            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              Performance bottlenecks impacting user productivity.
            </li>
          </ul>
        </div>

        {/* Solution */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">The Solution</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            I led the frontend development of the BLOX NXT CMS, focusing on a modular architecture and a robust design system to enable scale and consistency.
          </p>
          
          <div className="grid gap-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Design System & Component Library</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Established a reusable component library and lightweight design system. This standardized UI patterns and accelerated feature delivery by approximately 30% across teams.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Performance Optimization</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Improved perceived performance via render profiling, memoization, and request batching. This decreased key UI interaction latency and boosted Lighthouse scores.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Editorial Workflow Enhancements</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Built data-driven dashboards and real-time authoring affordances. Shipped 20+ customer-visible features across content authoring, audience, and analytics workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">The Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900">
              <div className="text-4xl font-bold mb-2">30%</div>
              <div className="text-zinc-400 dark:text-zinc-600 font-medium">Faster Feature Delivery</div>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6" />
                <span className="font-bold">Impact at Scale</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Architected payment integrations supporting <strong>2M+ paid subscribers</strong>, standardizing API contracts for resilient flows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

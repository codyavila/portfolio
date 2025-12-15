import Link from "next/link";
import { ArrowLeft, CheckCircle2, Layout, Zap, BarChart3 } from "lucide-react";

export default function EmailCampaignSystem() {
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
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Layout className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            BLOX Digital
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          Email Campaign Management System
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          A multi-step wizard that simplified complex campaign setups, reducing user error and increasing successful launches.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 border-y border-zinc-200 dark:border-zinc-800 py-8">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Role</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Lead Frontend Engineer</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Timeline</h3>
          <p className="text-zinc-600 dark:text-zinc-400">3 Months</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Tech Stack</h3>
          <p className="text-zinc-600 dark:text-zinc-400">React, React Query, TypeScript</p>
        </div>
      </div>

      <section className="space-y-16">
        {/* Problem */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">The Problem</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            Users were struggling to configure email campaigns correctly. The existing interface was a monolithic form with poor validation, leading to:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              High rate of configuration errors requiring support intervention.
            </li>
            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              Frustration with the "black box" scheduling logic.
            </li>
            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              Slow UI performance due to unnecessary network requests.
            </li>
          </ul>
        </div>

        {/* Solution */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">The Solution</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            I architected a new <strong>multi-step wizard</strong> that guided users through the process, validating each step before proceeding.
          </p>
          
          <div className="grid gap-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Natural Language Scheduling</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Replaced complex cron-like selectors with a human-readable summary (e.g., "Sends every Monday at 9:00 AM"). This immediate feedback loop drastically reduced scheduling errors.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 mb-3">
                <Layout className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Granular State & Validation</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Leveraged React Hook Form and Zod to validate inputs in real-time. Users couldn't proceed to the "Review" step without valid configuration.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Optimistic Updates</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Used React Query to manage server state, implementing optimistic updates for immediate UI feedback and request deduping to cut network overhead.
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
              <div className="text-zinc-400 dark:text-zinc-600 font-medium">Reduction in Support Tickets</div>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6" />
                <span className="font-bold">Success</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Increased successful campaign launches and received positive feedback from the editorial team for the simplified workflow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
        {/* Hero Section */}
        <section className="mb-16 sm:mb-24">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Cody Avila
          </h1>
          <h2 className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 mb-6">
            Frontend Engineer ➔ Product Manager
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl text-zinc-700 dark:text-zinc-300">
            Front-end Software Engineer with full‑stack range, building high‑traffic media platforms. 
            Known for shipping polished, accessible UI at scale and turning ambiguous product goals into measurable outcomes.
            Now transitioning to Product Management to leverage my technical background in building products that solve real user problems.
          </p>
        </section>

        {/* About / Transition Story */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">The Transition</h3>
          <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
            <p className="mb-4">
              At BLOX Digital, I didn't just write code; I partnered with Product and Design to convert fuzzy requirements into shippable increments. 
              I drove backlog grooming, acceptance criteria, and QA sign‑off, ensuring that what we built actually delivered value to our 141M monthly users.
            </p>
            <p>
              My technical background allows me to communicate effectively with engineering teams, 
              understand technical constraints, and make informed trade-offs. Now, I'm applying 
              that rigorous analytical thinking and cross-functional collaboration experience to product strategy.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Experience</h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-xl font-medium">Frontend Software Engineer</h4>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">BLOX Digital</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                Led front‑end development on BLOX NXT CMS, shipping 20+ customer‑visible features across content authoring, audience, and analytics workflows.
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 text-sm">
                <li>Architected payment integrations supporting 2M+ paid subscribers.</li>
                <li>Established a reusable component library, accelerating feature delivery by ~30%.</li>
                <li>Improved perceived performance via render profiling and request batching.</li>
                <li>Mentored peers and advocated for accessibility (WCAG).</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-xl font-medium">Instructional Assistant</h4>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">General Assembly</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                Supported a cohort of 60+ students in full‑stack fundamentals.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-3 text-zinc-900 dark:text-zinc-100">Product Management</h4>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>Roadmapping & Prioritization</li>
                <li>Data-Driven UX</li>
                <li>Stakeholder Management</li>
                <li>Agile & Scrum Methodologies</li>
                <li>Cross-functional Collaboration</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-3 text-zinc-900 dark:text-zinc-100">Engineering</h4>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>React, TypeScript, Next.js</li>
                <li>Material UI (MUI)</li>
                <li>React Query & Hook Form</li>
                <li>Node.js & Express.js</li>
                <li>Accessibility (WCAG)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects / Case Studies */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Case Studies</h3>
          <div className="space-y-8">
            {/* Project 1 */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <h4 className="text-xl font-medium mb-2">Email Campaign Management System</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Built a multi‑step wizard with advanced validation and natural‑language scheduling. 
                Reduced setup friction and increased successful campaign launches.
                <br/>
                <span className="italic text-sm">Problem &rarr; Solution &rarr; Result</span>
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer">Read Case Study &rarr;</span>
            </div>
             {/* Project 2 */}
             <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <h4 className="text-xl font-medium mb-2">BLOX NXT CMS Rebuild</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Contributed to modular, pattern‑driven front‑end architecture. 
                Built data‑driven dashboards and real‑time authoring affordances to streamline editorial workflows.
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer">Read Case Study &rarr;</span>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-6">
            I'm currently open to Product Management roles. Let's connect!
          </p>
          <div className="flex gap-4">
            <a href="#" className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-md font-medium hover:opacity-90 transition-opacity">
              LinkedIn
            </a>
            <a href="#" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Email Me
            </a>
             <a href="#" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

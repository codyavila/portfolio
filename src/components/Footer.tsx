import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] bg-transparent">
      <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col items-center gap-6">
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-[var(--text-tertiary)] hover:bg-[var(--glass-border)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-[var(--text-tertiary)] hover:bg-[var(--glass-border)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="mailto:your.email@example.com"
            className="p-2 rounded-full text-[var(--text-tertiary)] hover:bg-[var(--glass-border)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </a>
        </div>
        <div className="text-center text-body-s text-[var(--text-secondary)]">
          <p>&copy; {new Date().getFullYear()} Cody Avila. All rights reserved.</p>
          <p className="mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

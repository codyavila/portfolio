import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/70 supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Cody Avila
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/#about"
            className="hidden text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white sm:block"
          >
            About
          </Link>
          <Link
            href="/#process"
            className="hidden text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white sm:block"
          >
            Process
          </Link>
          <Link
            href="/#experience"
            className="hidden text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white sm:block"
          >
            Experience
          </Link>
          <Link
            href="/#projects"
            className="hidden text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white sm:block"
          >
            Projects
          </Link>
          <div className="flex items-center gap-4 border-l border-zinc-200 pl-6 dark:border-zinc-800">
            <ThemeToggle />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

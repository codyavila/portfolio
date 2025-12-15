import { getBlogPosts } from '@/lib/mdx';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { KineticText } from '@/components/ui/kinetic-text';

export const metadata = {
  title: 'Blog',
  description: 'Read my latest thoughts and tutorials.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-white">
          <KineticText>Blog</KineticText>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          Thoughts, tutorials, and experiments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Design System Post */}
        <Link href="/blog/design-system">
          <GlassCard className="h-full p-6 hover:scale-[1.02] transition-transform duration-150 ease-[var(--spring-snappy)] relative overflow-hidden" glow="cyber-lime">
            <div className="absolute top-0 right-0 p-2">
              <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Featured</span>
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-2">
                  2025-12-15
                </p>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  Project Luminous: Design System
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  Interactive documentation for the portfolio design system. Explore the physics, colors, and components that power this site.
                </p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {["Design System", "Interactive", "React"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </Link>

        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <GlassCard className="h-full p-6 hover:scale-[1.02] transition-transform duration-150 ease-[var(--spring-snappy)]" glow="aurora">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-2">
                    {post.metadata.publishedAt}
                  </p>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                    {post.metadata.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {post.metadata.summary}
                  </p>
                </div>
                {post.metadata.tags && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

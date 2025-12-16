import { getBlogPost, getBlogPosts } from '@/lib/mdx';
import { CustomMDX } from '@/components/mdx-components';
import { notFound } from 'next/navigation';
import { KineticText } from '@/components/ui/kinetic-text';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { BlogCard } from '@/components/ui/blog-card';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return;
  }
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
      {/* Navigation */}
      <div className="mb-12">
        <Link
          href="/blog"
          className="group inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-4 py-2 rounded-full bg-[var(--glass-2-fill)] border border-[var(--glass-1-border)] hover:border-[var(--glass-2-border)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-16 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6 text-sm font-mono text-[var(--lum-neon-purple)]">
          <span className="px-3 py-1 rounded-full bg-[var(--lum-neon-purple)]/10 border border-[var(--lum-neon-purple)]/20">
            Article
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]" />
          <span className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Calendar className="w-4 h-4" />
            {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-[var(--text-primary)] tracking-tight leading-tight">
          <KineticText velocityFactor={1.5}>{post.metadata.title}</KineticText>
        </h1>

        <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-8">
          {post.metadata.summary}
        </p>

        {post.metadata.tags && (
          <div className="flex flex-wrap justify-center gap-2">
            {post.metadata.tags.map((tag) => (
              <span key={tag} className="text-sm px-3 py-1.5 rounded-full bg-[var(--glass-2-fill)] border border-[var(--glass-1-border)] text-[var(--text-secondary)] flex items-center gap-2">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="relative">
        {/* Content Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--lum-neon-purple)]/5 via-transparent to-transparent blur-3xl -z-10" />
        
        <BlogCard className="p-8 md:p-16">
          <div className="prose prose-lg dark:prose-invert prose-zinc max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--text-primary)]
            prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
            prose-a:text-[var(--lum-neon-blue)] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[var(--text-primary)]
            prose-code:text-[var(--lum-neon-purple)] prose-code:bg-[var(--glass-2-fill)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[var(--glass-3-fill)] prose-pre:border prose-pre:border-[var(--glass-2-border)]
            prose-blockquote:border-l-[var(--lum-neon-purple)] prose-blockquote:bg-[var(--glass-2-fill)] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-li:text-[var(--text-secondary)]
            prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-[var(--glass-1-border)]
          ">
            <CustomMDX source={post.content} />
          </div>
        </BlogCard>
      </div>

      {/* Footer / Next Steps */}
      <div className="mt-24 text-center">
        <p className="text-[var(--text-tertiary)] mb-6">Thanks for reading!</p>
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--text-primary)] font-bold hover:text-[var(--lum-neon-purple)] transition-colors text-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Read more articles
        </Link>
      </div>
    </article>
  );
}


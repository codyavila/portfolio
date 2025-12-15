import { getBlogPost, getBlogPosts } from '@/lib/mdx';
import { CustomMDX } from '@/components/mdx-components';
import { notFound } from 'next/navigation';
import { KineticText } from '@/components/ui/kinetic-text';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-24 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">
          <KineticText>{post.metadata.title}</KineticText>
        </h1>
        <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.metadata.publishedAt}>
            {post.metadata.publishedAt}
          </time>
          {post.metadata.tags && (
            <div className="flex gap-2">
              {post.metadata.tags.map((tag) => (
                <span key={tag} className="text-sm bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded text-zinc-700 dark:text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="prose dark:prose-invert prose-zinc max-w-none">
        <CustomMDX source={post.content} />
      </div>
    </article>
  );
}

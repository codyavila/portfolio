import { getBlogPosts } from '@/lib/mdx';
import { BlogList } from '@/components/BlogList';

export const metadata = {
  title: 'Blog | Cody Avila',
  description: 'Deep dives into frontend architecture, product strategy, and the craft of building digital experiences.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return <BlogList posts={posts} />;
}



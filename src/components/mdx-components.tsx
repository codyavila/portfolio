import { MDXRemote } from 'next-mdx-remote/rsc';
import { JellyButton } from '@/components/ui/jelly-button';
import { GlassCard } from '@/components/ui/glass-card';
import { KineticText } from '@/components/ui/kinetic-text';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const components = {
  JellyButton,
  GlassCard,
  KineticText,
  // Add more components here
};

export function CustomMDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [
              rehypePrettyCode,
              {
                theme: 'github-dark',
                keepBackground: true,
              },
            ],
          ],
        },
      }}
    />
  );
}

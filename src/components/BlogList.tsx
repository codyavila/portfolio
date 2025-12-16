"use client";

import Link from 'next/link';
import { PortalCard, PortalCardTitle, PortalCardDescription } from '@/components/ui/portal-card';
import { KineticText } from '@/components/ui/kinetic-text';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { BlogPost } from '@/lib/mdx';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="container mx-auto px-6 py-24 md:py-32 max-w-7xl">
      {/* Header Section */}
      <div className="mb-20 md:mb-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[var(--glass-2-fill)] border border-[var(--glass-1-border)] text-xs font-mono text-[var(--lum-neon-purple)]">
            Engineering & Design
          </span>
          <h1 className="text-display-xl font-bold mb-6 text-[var(--text-primary)] tracking-tight">
            <KineticText velocityFactor={1.2}>Insights &</KineticText>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--lum-neon-purple)] to-[var(--lum-neon-blue)]">
              Perspectives
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Deep dives into frontend architecture, product strategy, and the craft of building digital experiences.
          </p>
        </motion.div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-title-l font-bold text-[var(--text-primary)]">Featured Article</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--glass-2-border)] to-transparent" />
          </div>

          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <PortalCard 
              className="p-0 overflow-hidden group-hover:shadow-2xl transition-all duration-500" 
              glow="cyber-lime"
              enableIridescence={true}
            >
              <div className="grid md:grid-cols-[1.2fr_1fr] gap-0 min-h-[400px]">
                {/* Image/Visual Side */}
                <div className="relative bg-[var(--glass-2-fill)] border-b md:border-b-0 md:border-r border-[var(--glass-1-border)] overflow-hidden p-12 flex flex-col justify-center items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--lum-neon-purple)]/10 to-[var(--lum-neon-blue)]/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  {/* Abstract decorative elements */}
                  <div className="relative z-10 w-full max-w-xs aspect-square rounded-full border border-[var(--glass-2-border)] flex items-center justify-center">
                    <div className="w-2/3 h-2/3 rounded-full bg-[var(--lum-neon-purple)]/20 blur-3xl animate-pulse" />
                    <div className="absolute inset-0 border border-[var(--glass-1-border)] rounded-full scale-110 opacity-30" />
                    <div className="absolute inset-0 border border-[var(--glass-1-border)] rounded-full scale-75 opacity-30" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <span className="px-3 py-1 rounded-full bg-[var(--lum-neon-purple)]/10 text-[var(--lum-neon-purple)] border border-[var(--lum-neon-purple)]/20 font-medium">
                      Latest
                    </span>
                    <span className="flex items-center gap-2 text-[var(--text-tertiary)]">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.metadata.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6 leading-tight group-hover:text-[var(--lum-neon-purple)] transition-colors">
                    {featuredPost.metadata.title}
                  </h3>

                  <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                    {featuredPost.metadata.summary}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-[var(--lum-neon-purple)] font-medium group-hover:translate-x-2 transition-transform">
                    Read Article <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </PortalCard>
          </Link>
        </motion.section>
      )}

      {/* Remaining Posts Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-title-l font-bold text-[var(--text-primary)]">All Articles</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[var(--glass-2-border)] to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map((post, index) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`} className="group h-full block">
                <PortalCard 
                  className="h-full p-8 flex flex-col transition-all duration-300 group-hover:-translate-y-2" 
                  glow={index % 2 === 0 ? "cotton-candy" : "aurora"}
                  delay={index * 0.1}
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[var(--text-tertiary)] flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <PortalCardTitle className="text-xl mb-3 group-hover:text-[var(--text-primary)]">
                      {post.metadata.title}
                    </PortalCardTitle>
                    
                    <PortalCardDescription className="line-clamp-3 text-sm">
                      {post.metadata.summary}
                    </PortalCardDescription>
                  </div>

                  <div className="mt-auto pt-6 border-t border-[var(--glass-1-border)] flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.metadata.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-[var(--glass-2-fill)] text-[var(--text-secondary)] border border-[var(--glass-1-border)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors" />
                  </div>
                </PortalCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

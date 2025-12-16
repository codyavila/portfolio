"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortalCard, PortalCardTitle, PortalCardDescription } from '@/components/ui/portal-card';
import { KineticText } from '@/components/ui/kinetic-text';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Search, X } from 'lucide-react';
import { BlogPost } from '@/lib/mdx';
import { cn } from '@/lib/utils';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.metadata.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = (
        post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.metadata.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const matchesTags = selectedTags.length === 0 || (
        post.metadata.tags?.some(tag => selectedTags.includes(tag)) ?? false
      );

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const isFiltering = searchQuery.length > 0 || selectedTags.length > 0;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="container mx-auto px-6 py-24 md:py-32 max-w-7xl">
      {/* Header Section */}
      <div className="mb-12 md:mb-16 max-w-4xl">
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

      {/* Search and Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16 space-y-6"
      >
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[var(--text-tertiary)]" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[var(--glass-1-fill)] border border-[var(--glass-1-border)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--lum-neon-blue)] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                  isSelected 
                    ? "bg-[var(--lum-neon-blue)]/10 border-[var(--lum-neon-blue)] text-[var(--lum-neon-blue)] shadow-[0_0_10px_rgba(0,240,255,0.2)]" 
                    : "bg-[var(--glass-1-fill)] border-[var(--glass-1-border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)] hover:bg-[var(--glass-2-fill)]"
                )}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="px-3 py-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear tags
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isFiltering ? (
          /* Filtered Results View */
          <motion.div
            key="filtered"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-title-l font-bold text-[var(--text-primary)]">
                {filteredPosts.length} Result{filteredPosts.length !== 1 ? 's' : ''}
              </h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-[var(--lum-neon-purple)] hover:underline"
              >
                Clear all filters
              </button>
            </div>

            {filteredPosts.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPosts.map((post) => (
                  <motion.div key={post.slug} variants={itemVariants}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <PortalCard className="h-full p-8 flex flex-col group-hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] mb-4 font-mono">
                            <Calendar className="w-3 h-3" />
                            <time dateTime={post.metadata.publishedAt}>
                              {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </time>
                          </div>
                          
                          <PortalCardTitle className="mb-3 group-hover:text-[var(--lum-neon-blue)] transition-colors">
                            {post.metadata.title}
                          </PortalCardTitle>
                          
                          <PortalCardDescription className="line-clamp-3 mb-6 flex-grow">
                            {post.metadata.summary}
                          </PortalCardDescription>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--glass-1-border)]">
                            <div className="flex gap-2">
                              {post.metadata.tags?.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--glass-2-fill)] text-[var(--text-secondary)] border border-[var(--glass-1-border)]">
                                  {tag}
                                </span>
                              ))}
                              {(post.metadata.tags?.length || 0) > 2 && (
                                <span className="text-[10px] px-2 py-0.5 text-[var(--text-tertiary)]">
                                  +{post.metadata.tags!.length - 2}
                                </span>
                              )}
                            </div>
                            <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--lum-neon-blue)] group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </PortalCard>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-24 border border-dashed border-[var(--glass-2-border)] rounded-3xl bg-[var(--glass-1-fill)]">
                <p className="text-[var(--text-secondary)] text-lg mb-2">No articles found</p>
                <p className="text-[var(--text-tertiary)]">Try adjusting your search or filters</p>
                <button 
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2 rounded-full bg-[var(--lum-neon-blue)]/10 text-[var(--lum-neon-blue)] hover:bg-[var(--lum-neon-blue)]/20 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* Default View (Featured + Grid) */
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
                <div className="relative bg-[var(--glass-2-fill)] border-b md:border-b-0 md:border-r border-[var(--glass-1-border)] overflow-hidden p-0 flex flex-col justify-center items-center">
                  {featuredPost.metadata.image ? (
                    <div className="absolute inset-0 w-full h-full">
                      <Image 
                        src={featuredPost.metadata.image} 
                        alt={featuredPost.metadata.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-60" />
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--lum-neon-purple)]/10 to-[var(--lum-neon-blue)]/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                      
                      {/* Abstract decorative elements */}
                      <div className="relative z-10 w-full max-w-xs aspect-square rounded-full border border-[var(--glass-2-border)] flex items-center justify-center">
                        <div className="w-2/3 h-2/3 rounded-full bg-[var(--lum-neon-purple)]/20 blur-3xl animate-pulse" />
                        <div className="absolute inset-0 border border-[var(--glass-1-border)] rounded-full scale-110 opacity-30" />
                        <div className="absolute inset-0 border border-[var(--glass-1-border)] rounded-full scale-75 opacity-30" />
                      </div>
                    </>
                  )}
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
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

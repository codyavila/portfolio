"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PortalCard, PortalCardTitle, PortalCardDescription } from '@/components/ui/portal-card';
import { KineticText } from '@/components/ui/kinetic-text';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Briefcase, Calendar, Code2, BarChart3, Layers, Target, ExternalLink, Github, FileText, Play } from 'lucide-react';
import { Project, ProjectCategory } from '@/lib/projects';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 18,
    },
  },
};

const categoryConfig = {
  all: { label: 'All Projects', icon: Layers, color: 'var(--text-primary)' },
  engineering: { label: 'Engineering', icon: Code2, color: 'var(--neon-primary-end)' },
  product: { label: 'Product', icon: Target, color: 'var(--neon-secondary-end)' },
} as const;

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags for the selected category
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    const categoryProjects = selectedCategory === 'all' 
      ? projects 
      : projects.filter(p => p.category === selectedCategory);
    categoryProjects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects, selectedCategory]);

  // Filter projects based on category, search, and tags
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      const matchesSearch = (
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(selectedTag => project.tags.includes(selectedTag));

      return matchesCategory && matchesSearch && matchesTags;
    });
  }, [projects, selectedCategory, searchQuery, selectedTags]);

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

  const handleCategoryChange = (category: ProjectCategory | 'all') => {
    setSelectedCategory(category);
    setSelectedTags([]); // Clear tag filters when changing category
  };

  const glowColors = {
    engineering: 'cyber-lime',
    product: 'cotton-candy',
  } as const;

  return (
    <main className="container mx-auto px-6 py-24 md:py-32 max-w-7xl">
      {/* Header Section */}
      <div className="mb-12 md:mb-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[var(--neon-secondary-end)]/10 border border-[var(--neon-secondary-end)]/20 text-xs font-mono text-[var(--neon-secondary-end)]">
            Case Studies & Showcases
          </span>
          <h1 className="text-display-l md:text-display-xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            <KineticText as="span" velocityFactor={0.8}>
              Projects
            </KineticText>
          </h1>
          <p className="text-body-l text-[var(--text-secondary)] max-w-2xl">
            From hands-on frontend engineering to product strategy—here&apos;s work I&apos;ve shipped.
          </p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2 p-1 rounded-2xl bg-[var(--glass-1-fill)] border border-[var(--glass-1-border)] w-fit">
          {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category) => {
            const config = categoryConfig[category];
            const Icon = config.icon;
            const isActive = selectedCategory === category;
            const count = category === 'all' 
              ? projects.length 
              : projects.filter(p => p.category === category).length;
            
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[var(--glass-2-fill)] text-[var(--text-primary)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? config.color : undefined }} />
                <span>{config.label}</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-xs font-mono",
                  isActive 
                    ? "bg-[var(--glass-1-fill)] text-[var(--text-secondary)]"
                    : "text-[var(--text-tertiary)]"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-10"
      >
        {/* Search Bar */}
        <div className="relative max-w-md mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[var(--text-tertiary)]" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-11 pr-10 py-3 rounded-2xl",
              "bg-[var(--glass-1-fill)] backdrop-blur-md",
              "border border-[var(--glass-1-border)]",
              "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--neon-secondary-end)]/30 focus:border-[var(--neon-secondary-end)]/50",
              "transition-all duration-200"
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                  selectedTags.includes(tag)
                    ? "bg-[var(--chip-secondary-bg)] text-[var(--chip-secondary-text)] border border-[var(--chip-secondary-border)]"
                    : "bg-[var(--glass-1-fill)] text-[var(--text-secondary)] border border-[var(--glass-1-border)] hover:border-[var(--neon-secondary-end)]/30"
                )}
              >
                {tag}
              </button>
            ))}
            {isFiltering && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Results Count */}
      <AnimatePresence mode="wait">
        {isFiltering && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-[var(--text-tertiary)] mb-6"
          >
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
          </motion.p>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <motion.div
        key={selectedCategory} // Re-animate when category changes
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <PortalCard 
                className={cn(
                  "h-full p-8 transition-all duration-300",
                  project.category === 'engineering' 
                    ? "hover:border-[var(--neon-primary-start)]"
                    : "hover:border-[var(--neon-secondary-start)]"
                )}
                glow={glowColors[project.category]}
                enableTilt={false}
                enableIridescence={false}
                enableChromatic={false}
                enableShimmer={false}
              >
                <div className="flex flex-col h-full gap-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
                        project.status === 'live' 
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : project.status === 'in-progress'
                          ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                          : "bg-gray-500/10 text-gray-500 border border-gray-500/20"
                      )}>
                        {project.status === 'live' ? '● Live' : project.status === 'in-progress' ? '◐ In Progress' : '○ Archived'}
                      </span>
                      {project.tags.slice(0, 1).map(tag => (
                        <span 
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--chip-secondary-bg)] text-[var(--chip-secondary-text)] border border-[var(--chip-secondary-border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)] font-mono flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3 h-3" />
                      {project.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <PortalCardTitle className="text-xl md:text-2xl mb-3">
                      {project.title}
                    </PortalCardTitle>
                    <PortalCardDescription className="line-clamp-3">
                      {project.summary}
                    </PortalCardDescription>
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-3 pt-4 border-t border-[var(--glass-1-border)]">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Briefcase className="w-4 h-4 text-[var(--text-tertiary)]" />
                      <span>{project.role}</span>
                    </div>
                    
                    {project.metrics && (
                      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <BarChart3 className="w-4 h-4 text-[var(--text-tertiary)]" />
                        <span>{project.metrics}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[var(--text-tertiary)]" />
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map(tech => (
                          <span 
                            key={tech}
                            className="px-2 py-0.5 rounded text-xs bg-[var(--glass-1-fill)] text-[var(--text-tertiary)] border border-[var(--glass-1-border)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.hasInteractivePage && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          "bg-[var(--chip-primary-bg)] text-[var(--chip-primary-text)] border border-[var(--chip-primary-border)]",
                          "hover:scale-105 active:scale-95"
                        )}
                      >
                        <Play className="w-3 h-3" />
                        Try it
                      </Link>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          "bg-[var(--chip-primary-bg)] text-[var(--chip-primary-text)] border border-[var(--chip-primary-border)]",
                          "hover:scale-105 active:scale-95"
                        )}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          "bg-[var(--glass-1-fill)] text-[var(--text-secondary)] border border-[var(--glass-1-border)]",
                          "hover:text-[var(--text-primary)] hover:border-[var(--glass-2-border)] hover:scale-105 active:scale-95"
                        )}
                      >
                        <Github className="w-3 h-3" />
                        GitHub
                      </a>
                    )}
                    {project.caseStudySlug && (
                      <Link
                        href={`/blog/${project.caseStudySlug}`}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          "bg-[var(--glass-1-fill)] text-[var(--text-secondary)] border border-[var(--glass-1-border)]",
                          "hover:text-[var(--text-primary)] hover:border-[var(--glass-2-border)] hover:scale-105 active:scale-95"
                        )}
                      >
                        <FileText className="w-3 h-3" />
                        Case Study
                      </Link>
                    )}
                  </div>
                </div>
              </PortalCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--glass-1-fill)] border border-[var(--glass-1-border)] flex items-center justify-center">
            <Search className="w-8 h-8 text-[var(--text-tertiary)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
            No projects found
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl bg-[var(--chip-secondary-bg)] text-[var(--chip-secondary-text)] border border-[var(--chip-secondary-border)] text-sm font-medium hover:bg-[var(--chip-secondary-bg)]/80 transition-colors"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </main>
  );
}

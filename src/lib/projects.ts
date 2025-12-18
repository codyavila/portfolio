export type ProjectCategory = 'engineering' | 'product';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  image?: string;
  year: string;
  category: ProjectCategory;
  tags: string[];
  role: string;
  techStack: string[];
  metrics?: string;
  featured?: boolean;
  // Links
  liveUrl?: string;
  githubUrl?: string;
  caseStudySlug?: string; // Links to /blog/[slug]
  status: 'live' | 'in-progress' | 'archived';
};

// Add your projects here
export const projects: Project[] = [
  {
    slug: 'portfolio',
    title: 'This Portfolio',
    summary: 'A creative portfolio featuring glassmorphism, WebGL shaders, procedural audio, and physics-based animations. Built to showcase frontend craft.',
    year: '2025',
    category: 'engineering',
    tags: ['Next.js', 'WebGL', 'Animation', 'Design System'],
    role: 'Designer & Developer',
    techStack: ['Next.js', 'TypeScript', 'Framer Motion', 'WebGL', 'Web Audio API'],
    liveUrl: 'https://codyavila.com',
    githubUrl: 'https://github.com/codyavila/portfolio',
    caseStudySlug: 'building-portfolio',
    status: 'live',
    featured: true,
  },
  {
    slug: 'blox-nxt-cms',
    title: 'BLOX NXT CMS',
    summary: 'Enterprise CMS serving 2,000+ media organizations with 141M+ monthly users. Led frontend architecture and design system.',
    year: '2024',
    category: 'engineering',
    tags: ['Enterprise', 'CMS', 'Design System'],
    role: 'Lead Frontend Engineer',
    techStack: ['React', 'TypeScript', 'MUI', 'Next.js'],
    metrics: '141M+ Monthly Users',
    caseStudySlug: 'case-study-blox-cms',
    status: 'live',
    featured: true,
  },
  {
    slug: 'email-campaign-system',
    title: 'Email Campaign System',
    summary: 'Multi-step campaign wizard with natural language scheduling. Reduced support tickets by 30% through better UX.',
    year: '2023',
    category: 'product',
    tags: ['UX', 'Wizard', 'Forms'],
    role: 'Lead Frontend Engineer',
    techStack: ['React', 'React Query', 'TypeScript', 'Zod'],
    metrics: '30% fewer support tickets',
    caseStudySlug: 'case-study-email-campaign',
    status: 'live',
  },
];

export function getProjects(): Project[] {
  return projects.sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

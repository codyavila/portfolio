import { getProject } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { ProjectClient } from './project-client';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  
  if (!project) {
    notFound();
  }

  // If this project doesn't have an interactive page, 
  // we shouldn't be rendering this route.
  if (!project.hasInteractivePage) {
    notFound();
  }

  return <ProjectClient slug={slug} />;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Cody Avila`,
    description: project.summary,
  };
}

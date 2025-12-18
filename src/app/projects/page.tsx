import { getProjects } from '@/lib/projects';
import { ProjectList } from '@/components/ProjectList';

export const metadata = {
  title: 'Projects | Cody Avila',
  description: 'Case studies and showcases of products driven from concept to launch.',
};

export default function ProjectsPage() {
  const projects = getProjects();

  return <ProjectList projects={projects} />;
}

import { Link, useParams } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { useSiteContent } from '../hooks/useSiteContent';
import './ProjectDetail.css';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects } = useSiteContent();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="page">
        <h1 className="page-title">Project not found</h1>
        <Link to="/projects">← Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="page project-detail">
      <h1 className="project-detail__title">
        {project.title}
        <span className="project-detail__zh"> ({project.titleZh})</span>
      </h1>
      <VideoPlayer
        src={project.video}
        poster={project.poster}
        title={`${project.title} demo`}
      />
      <section className="project-detail__desc">
        <p>{project.description}</p>
      </section>
      <section className="project-detail__tech">
        <h2 className="section-label">Technical Stack</h2>
        <ul className="tech-list">
          {project.techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </section>
      <Link to="/projects" className="project-detail__back">
        ← All projects
      </Link>
    </div>
  );
}

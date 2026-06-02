import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import './Projects.css';

export function Projects() {
  const { projects } = useSiteContent();

  return (
    <div className="page projects-page">
      <h1 className="page-title">Projects</h1>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.id} className="projects-list__item">
            <Link to={`/projects/${project.id}`} className="projects-list__link">
              <span className="projects-list__title">{project.title}</span>
              <span className="projects-list__zh">{project.titleZh}</span>
              <span className="projects-list__year">{project.year}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

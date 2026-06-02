import type { Experience, Project } from '../../types/site';
import './ResumeGrid.css';

interface ResumeGridProps {
  experience: Experience[];
  skills: string[];
  projects: Project[];
  education: string;
}

export function ResumeGrid({ experience, skills, projects, education }: ResumeGridProps) {
  return (
    <div className="resume-grid">
      <section className="resume-grid__col">
        <h2 className="section-label">Experience</h2>
        <ul className="resume-list">
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`}>
              <strong>{item.role}</strong> @ {item.company}
              <span className="resume-list__period"> ({item.period})</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="resume-grid__col">
        <h2 className="section-label">Skills</h2>
        <ul className="resume-list resume-list--bullets">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
      <section className="resume-grid__col">
        <h2 className="section-label">Projects &amp; Education</h2>
        <ul className="resume-list">
          {projects.map((p) => (
            <li key={p.id}>
              {p.title} ({p.year})
            </li>
          ))}
        </ul>
        <h2 className="section-label resume-grid__edu-label">Education</h2>
        <p>{education}</p>
      </section>
    </div>
  );
}

import { ResumeGrid } from '../components/ResumeGrid/ResumeGrid';
import { useSiteContent } from '../hooks/useSiteContent';
import './Resume.css';

export function Resume() {
  const { profile, experience, skills, projects, education } = useSiteContent();

  return (
    <div className="page resume-page">
      <header className="resume-header">
        <img
          src={profile.avatar}
          alt={`${profile.nameEn} portrait`}
          className="resume-header__avatar"
          width={100}
          height={100}
        />
        <div className="resume-header__info">
          <h1 className="resume-header__name">
            {profile.nameEn}
            <span className="resume-header__zh"> {profile.nameZh}</span>
          </h1>
          <p className="resume-header__title">{profile.title}</p>
          <ul className="resume-header__contact">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn / {profile.linkedin}
              </a>
            </li>
            <li>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                GitHub / {profile.github}
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section className="resume-about">
        <h2 className="section-label">About Me</h2>
        <p>{profile.about}</p>
      </section>

      <ResumeGrid
        experience={experience}
        skills={skills}
        projects={projects}
        education={education}
      />

      <img
        src={profile.lifestyleImage}
        alt="Lifestyle"
        className="resume-lifestyle"
        width={280}
        height={200}
      />
    </div>
  );
}

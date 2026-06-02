import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import './Home.css';

export function Home() {
  const { profile, projects } = useSiteContent();
  const featured = projects.find((p) => p.featured) ?? projects[0];

  return (
    <div className="page home">
      <div className="home-hero">
        <img
          src={profile.avatar}
          alt={`${profile.nameEn} portrait`}
          className="home-hero__avatar"
          width={120}
          height={120}
        />
        <div>
          <h1 className="home-hero__name">
            {profile.nameEn}
            <span className="home-hero__name-zh"> {profile.nameZh}</span>
          </h1>
          <p className="home-hero__title">{profile.title}</p>
          <p className="home-hero__about">{profile.about}</p>
          <div className="home-hero__actions">
            <Link to="/resume" className="home-btn">
              View Resume
            </Link>
            {featured && (
              <Link to={`/projects/${featured.id}`} className="home-btn home-btn--outline">
                Featured Project
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useSiteContent } from '../hooks/useSiteContent';
import './Contact.css';

export function Contact() {
  const { profile, social, contact } = useSiteContent();

  return (
    <div className="page contact-page">
      <h1 className="page-title">Contact</h1>
      <p className="contact-intro">{contact.intro}</p>
      <ul className="contact-list">
        <li>
          <span className="section-label">Email</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        <li>
          <span className="section-label">LinkedIn</span>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            {profile.linkedin}
          </a>
        </li>
        <li>
          <span className="section-label">GitHub</span>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            {profile.github}
          </a>
        </li>
        <li>
          <span className="section-label">Location</span>
          <span>{contact.location}</span>
        </li>
      </ul>
      <div className="contact-social">
        {Object.entries(social).map(([name, url]) => (
          <a key={name} href={url} target="_blank" rel="noreferrer">
            {name}
          </a>
        ))}
      </div>
    </div>
  );
}

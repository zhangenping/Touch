import { useSiteContent } from '../hooks/useSiteContent';

export function About() {
  const { profile, contact } = useSiteContent();

  return (
    <div className="page">
      <h1 className="page-title">About</h1>
      <p className="muted" style={{ maxWidth: '65ch', marginBottom: '1.5rem' }}>
        {profile.about}
      </p>
      <p style={{ maxWidth: '65ch' }}>{contact.intro}</p>
      <p style={{ marginTop: '1rem', fontWeight: 700 }}>{contact.location}</p>
    </div>
  );
}

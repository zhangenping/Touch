import { useSiteContent } from '../../hooks/useSiteContent';
import './Footer.css';

const leftSocial = [
  { key: 'twitter' as const, label: 'Twitter' },
  { key: 'instagram' as const, label: 'Instagram' },
  { key: 'linkedin' as const, label: 'LinkedIn' },
];

const rightSocial = [
  { key: 'wechat' as const, label: 'WeChat' },
  { key: 'telegram' as const, label: 'Telegram' },
  { key: 'github' as const, label: 'GitHub' },
];

export function Footer() {
  const { social } = useSiteContent();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-social">
          {leftSocial.map(({ key, label }) => (
            <a
              key={key}
              href={social[key]}
              className="footer-social__link"
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon name={key} />
            </a>
          ))}
        </div>
        <div className="footer-social footer-social--right">
          {rightSocial.map(({ key, label }) => (
            <a
              key={key}
              href={social[key]}
              className="footer-social__link"
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon name={key} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  return (
    <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">
        {name.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  );
}

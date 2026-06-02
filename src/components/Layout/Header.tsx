import { NavLink } from 'react-router-dom';
import './Header.css';

const navItems = [
  { to: '/', label: 'HOME', end: true },
  { to: '/resume', label: 'RESUME' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/about', label: 'ABOUT' },
  { to: '/contact', label: 'CONTACT' },
] as const;

export function Header() {
  return (
    <header className="header">
      <nav className="header-nav" aria-label="Main navigation">
        {navItems.map(({ to, label, ...rest }) => (
          <NavLink
            key={to}
            to={to}
            end={'end' in rest ? rest.end : false}
            className={({ isActive }) =>
              `header-nav__link${isActive ? ' header-nav__link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

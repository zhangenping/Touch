import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const navItems = [
  { to: '/', label: 'HOME', end: true },
  { to: '/resume', label: 'RESUME' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/about', label: 'ABOUT' },
  { to: '/contact', label: 'CONTACT' },
] as const;

export function Header() {
  const { user, token, logout } = useAuth();

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
        {token ? (
          <>
            <span className="header-nav__user" title={user?.email ?? ''}>
              {user?.name ?? user?.email?.split('@')[0]}
            </span>
            <button type="button" className="header-nav__link header-nav__btn" onClick={logout}>
              LOGOUT
            </button>
          </>
        ) : (
          <Link to="/login" className="header-nav__link">
            LOGIN
          </Link>
        )}
      </nav>
    </header>
  );
}

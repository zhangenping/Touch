import { NavLink } from 'react-router-dom';
import './AuthForm.css';

export function AuthTabs() {
  return (
    <div className="auth-tabs">
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `auth-tabs__link${isActive ? ' auth-tabs__link--active' : ''}`
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          `auth-tabs__link${isActive ? ' auth-tabs__link--active' : ''}`
        }
      >
        Register
      </NavLink>
    </div>
  );
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as api from '../lib/api';
import type { AuthUser } from '../lib/api';

const TOKEN_KEY = 'touch_auth_token';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  const persist = useCallback((nextToken: string | null, nextUser: AuthUser | null) => {
    setToken(nextToken);
    setUser(nextUser);
    if (nextToken) localStorage.setItem(TOKEN_KEY, nextToken);
    else localStorage.removeItem(TOKEN_KEY);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .fetchMe(token)
      .then(({ user: me }) => setUser(me))
      .catch(() => persist(null, null))
      .finally(() => setLoading(false));
  }, [token, persist]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { token: t, user: u } = await api.login(email, password);
      persist(t, u);
    },
    [persist],
  );

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      const { token: t, user: u } = await api.register(email, password, name);
      persist(t, u);
    },
    [persist],
  );

  const logout = useCallback(() => persist(null, null), [persist]);

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

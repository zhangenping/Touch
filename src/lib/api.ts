const API_BASE = import.meta.env.VITE_API_URL ?? '';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new Error(data.error ?? '请求失败');
  }
  return data;
}

export async function register(
  email: string,
  password: string,
  name?: string,
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  return parseJson<AuthResponse>(res);
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return parseJson<AuthResponse>(res);
}

export async function fetchMe(token: string): Promise<{ user: AuthUser }> {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return parseJson<{ user: AuthUser }>(res);
}

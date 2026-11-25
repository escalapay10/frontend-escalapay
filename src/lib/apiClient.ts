import axios from 'axios';
import { env } from './env';

/** Clave del token en localStorage. FE-2 (AuthContext) reutiliza estas helpers. */
export const TOKEN_STORAGE_KEY = 'escalapay.token';

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Instancia axios compartida (FE-1).
 * - baseURL: VITE_API_URL del backend (Railway); vacío = mismo origen.
 * - Request: adjunta `Authorization: Bearer <token>` si hay sesión.
 * - Response 401: limpia el token y manda a /login (sesión expirada).
 */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearToken();
      // Evita el loop si ya estamos en /login
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  },
);

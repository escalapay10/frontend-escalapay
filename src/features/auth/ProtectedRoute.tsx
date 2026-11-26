import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../../lib/apiClient';

/**
 * Guard de rutas privadas (versión mínima para FE-1).
 * FE-2 (Caro) lo conecta a AuthContext/useAuth: expiración del token,
 * usuario en memoria y redirección de /login → /dashboard si ya hay sesión.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();

  if (!getToken()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

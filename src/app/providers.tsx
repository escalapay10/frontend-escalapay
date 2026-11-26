import type { ReactNode } from 'react';

/**
 * Proveedores globales de la aplicación.
 * FE-2 (Caro): acá se agregará <AuthProvider> cuando exista AuthContext.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

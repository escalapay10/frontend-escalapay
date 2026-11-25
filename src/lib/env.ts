/**
 * Variables de entorno (solo las VITE_* llegan al build de Vercel).
 * Nunca poner API keys acá: los proveedores de tasas y de IA viven en el backend.
 */
export const env = {
  /** URL base del backend en Railway (ej. https://escalapay-backend.up.railway.app) */
  apiUrl: import.meta.env.VITE_API_URL ?? '',

  /**
   * Flag de mocks: mientras esté en "true", la capa api de cada feature
   * responde con datos simulados (mocks por feature). FE-8 lo apaga.
   */
  useMocks: import.meta.env.VITE_USE_MOCKS === 'true',

  isDev: import.meta.env.DEV,
} as const;

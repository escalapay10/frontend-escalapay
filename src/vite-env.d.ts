/// <reference types="vite/client" />

/**
 * Variables de entorno visibles en el build.
 * Regla de seguridad: en Vercel solo existen variables VITE_*; nunca API keys
 * (Frankfurter, ExchangeRate-API, Gemini y OpenRouter viven en el backend).
 */
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_USE_MOCKS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

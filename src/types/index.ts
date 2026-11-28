/**
 * Tipos compartidos — única fuente de verdad del contrato con el backend.
 *
 * ⚠️ BORRADOR inicial (FE-1): antes de codificar cada feature hay que
 * confirmar endpoints, payloads, errores y paginación con Matias y Yeiny
 * (contrato de API). Si algo cambia, se cambia acá primero.
 */

export type Currency = 'USD' | 'EUR' | 'ARS';

/** BUY = compra, SELL = venta, EXCHANGE = intercambio entre balances */
export type OperationType = 'BUY' | 'SELL' | 'EXCHANGE';

/** DEPOSIT = saldo inicial ficticio que registra el backend al registrarse */
export type TransactionType = OperationType | 'DEPOSIT';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Balance {
  walletId: string;
  currency: Currency;
  amount: string;
}

/**
 * Cotización con vigencia de 60 segundos (FE-4).
 * `expiresAt` es la base del countdown visible en la UI.
 */
export interface Quote {
  from: Currency;
  to: Currency;
  rate: number;
  /** Frankfurter / ExchangeRate-API */
  provider: string;
  respondedAt: string;
  expiresAt: string;
}

/** Punto del historial de tasas (job horario, ya en el Sprint 1 según la planilla) */
export interface Rate {
  from: Currency;
  to: Currency;
  rate: number;
  provider: string;
  respondedAt: string;
}
// También renombré fetchedAt → respondedAt en Quote y Rate (types/index.ts), para que coincida con el contrato de tasas que confirmó Back.

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  fromCurrency: Currency;
  fromAmount: number;
  toCurrency: Currency;
  toAmount: number;
  rate: number | null;
  provider: string | null;
  createdAt: string;
}

/**
 * Paginación: PENDIENTE de definir con el backend (page/limit vs cursor).
 * Cambiar este tipo impacta en FE-5 (Pagination.tsx).
 */
export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** Formato de error esperado del backend (confirmar en el contrato de API) */
export interface ApiError {
  message: string;
  code?: string;
}

/* --- Chatbot (FE-7) --- */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

import type { Currency } from '../types';

/**
 * Formateo compartido de monedas y fechas (regla de convivencia #4:
 * no duplicar estas funciones en features; si falta algo, agregarlo acá).
 * Todo con Intl (es-AR por defecto) para que USD/EUR/ARS se vean igual en toda la app.
 */

// amount puede venir como string (ej: Balance, desde el back) o number (otros campos).
// La conversión es solo para mostrar en pantalla, nunca para operar con el valor.
export function formatMoney(amount: number | string, currency: Currency): string {
  const value = typeof amount === 'string' ? Number(amount) : amount;
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(
  value: string | number | Date,
  options?: { withTime?: boolean },
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'medium',
    ...(options?.withTime ? { timeStyle: 'short' as const } : {}),
  }).format(date);
}

/** Tasa de cambio sin símbolo de moneda (ej. 1.234,5678) */
export function formatRate(rate: number, decimals = 4): string {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rate);
}

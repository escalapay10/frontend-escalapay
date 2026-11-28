import { describe, expect, it } from 'vitest';
import { formatDate, formatMoney, formatRate } from './format';

describe('formatMoney', () => {
  it('formatea USD con dos decimales y separadores es-AR', () => {
    expect(formatMoney(1500.5, 'USD')).toContain('1.500,50');
  });

  it('formatea ARS y EUR', () => {
    expect(formatMoney(1000, 'ARS')).toContain('1.000,00');
    expect(formatMoney(0.5, 'EUR')).toContain('0,50');
  });

  it('maneja montos negativos (operaciones reversas)', () => {
    const formatted = formatMoney(-20, 'USD');
    expect(formatted).toContain('20,00');
    expect(formatted.startsWith('-')).toBe(true);
  });

  // Montos como string, como los manda el back (NUMERIC de PostgreSQL)
  it('acepta montos como string con muchos decimales', () => {
    expect(formatMoney('1200.50000000', 'USD')).toContain('1.200,50');
    expect(formatMoney('800000.00000000', 'ARS')).toContain('800.000,00');
  });

  it('devuelve un guion si el string no es un número válido', () => {
    expect(formatMoney('abc', 'USD')).toBe('—');
  });
});

describe('formatDate', () => {
  it('formatea una fecha ISO en formato largo', () => {
    expect(formatDate('2026-11-25T12:00:00Z')).toContain('2026');
    expect(formatDate('2026-11-25T12:00:00Z')).toContain('nov');
  });

  it('incluye la hora cuando se pide', () => {
    expect(formatDate('2026-11-25T12:00:00Z', { withTime: true })).toMatch(/\d{1,2}:\d{2}/);
  });

  it('devuelve un guion ante fechas inválidas', () => {
    expect(formatDate('no-es-una-fecha')).toBe('—');
  });
});

describe('formatRate', () => {
  it('muestra la tasa con 4 decimales por defecto', () => {
    expect(formatRate(1.23456)).toBe('1,2346');
    expect(formatRate(1.5, 2)).toBe('1,50');
  });
});

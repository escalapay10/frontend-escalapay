import type { Rate } from '../../../types';

// Tasa de mentira para el dashboard (FE-3), con el formato confirmado
// con Back: GET /api/rates?from=USD&to=ARS (rate number, respondedAt).
// Tipado como Rate para que coincida con el contrato compartido.
// Reemplazar por la llamada real cuando el endpoint esté listo.
export const mockRate: Rate = {
  from: 'USD',
  to: 'ARS',
  rate: 1050.32,
  provider: 'frankfurter',
  respondedAt: '2026-11-26T18:00:00Z',
};

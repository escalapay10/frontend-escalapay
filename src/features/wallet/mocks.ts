// Saldos de mentira para el dashboard (FE-3), con el formato real
// confirmado con Back 1: amount como string, mismo walletId para los 3.
// Reemplazar por la llamada a GET /api/wallet cuando el endpoint esté listo.
import type { Balance } from '../../types';
export const mockBalances: Balance[] = [
    { walletId: "w-001", currency: "USD", amount: "1200.50000000" },
    { walletId: "w-001", currency: "EUR", amount: "300.00000000" },
    { walletId: "w-001", currency: "ARS", amount: "800000.00000000" },
];
import type { Currency } from '../../../types';
import { formatMoney } from '../../../lib/format';

// Tarjeta que muestra un saldo por moneda (USD/EUR/ARS). Sin lógica propia,
// solo recibe currency + amount y los formatea con formatMoney.
// Colores: usa los tokens del equipo (styles/index.css), no grises genéricos.

interface BalanceCardProps {
  currency: Currency;
  amount: string | number;
}

export function BalanceCard({ currency, amount }: BalanceCardProps) {
  return (
    <div className="rounded-xl border border-line bg-card p-4 shadow-sm">
      <p className="text-sm text-muted">{currency}</p>
      <p className="text-2xl font-semibold text-ink">{formatMoney(amount, currency)}</p>
    </div>
  );
}

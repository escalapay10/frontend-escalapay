import type { Currency } from '../../../types';
import { formatMoney } from '../../../lib/format';

// Tarjeta que muestra un saldo por moneda (USD/EUR/ARS). Sin lógica propia,
// solo recibe currency + amount y los formatea con formatMoney.

interface BalanceCardProps {
    currency: Currency;
    amount: string | number;
}

export function BalanceCard({ currency, amount }: BalanceCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">{currency}</p>
            <p className="text-2xl font-semibold text-gray-900">
                {formatMoney(amount, currency)}
            </p>
        </div>
    );
}
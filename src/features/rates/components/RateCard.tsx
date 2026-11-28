import { formatRate } from '../../../lib/format';

// Tarjeta que muestra la tasa de cambio del dashboard: par de monedas,
// proveedor y "hace X min" calculado a partir de respondedAt (momento
// en que el back consultó al proveedor, no la fecha del proveedor).

interface RateCardProps {
  from: string;
  to: string;
  rate: number;
  provider: string;
  respondedAt: string;
}

function minutesAgo(respondedAt: string): number {
  const diffMs = Date.now() - new Date(respondedAt).getTime();
  return Math.floor(diffMs / 1000 / 60);
}

export function RateCard({ from, to, rate, provider, respondedAt }: RateCardProps) {
  const minutes = minutesAgo(respondedAt);
  const agoText = minutes < 1 ? 'hace instantes' : `hace ${minutes} min`;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">
        1 {from} = {formatRate(rate)} {to}
      </p>
      <p className="text-xs text-gray-400">
        {provider} · actualizado {agoText}
      </p>
    </div>
  );
}
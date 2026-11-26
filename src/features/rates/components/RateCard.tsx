import { formatRate } from '../../../lib/format';

interface RateCardProps {
  from: string;
  to: string;
  rate: number;
  provider: string;
  fetchedAt: string;
}

function minutesAgo(fetchedAt: string): number {
  const diffMs = Date.now() - new Date(fetchedAt).getTime();
  return Math.floor(diffMs / 1000 / 60);
}

export function RateCard({ from, to, rate, provider, fetchedAt }: RateCardProps) {
  const minutes = minutesAgo(fetchedAt);
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
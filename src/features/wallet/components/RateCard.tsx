import type { Rate } from '../../../types';
import { formatRate } from '../../../lib/format';

// Tarjeta que muestra la tasa de cambio del dashboard: par de monedas,
// proveedor y "hace X min" calculado a partir de respondedAt (momento
// en que respondió el back, no la fecha del proveedor).
// Las props usan el tipo compartido `Rate` (types/index.ts): si el contrato
// cambia, TypeScript avisa acá también en vez de pasar en silencio.
// Colores: usa los tokens del equipo (styles/index.css), no grises genéricos.

function minutesAgo(respondedAt: string): number {
  const diffMs = Date.now() - new Date(respondedAt).getTime();
  return Math.floor(diffMs / 1000 / 60);
}

// Arma el texto "hace X min". Si la fecha es inválida (NaN) no muestra
// "hace NaN min", sino un texto neutro.
function agoText(respondedAt: string): string {
  const minutes = minutesAgo(respondedAt);
  if (Number.isNaN(minutes)) return 'sin fecha de actualización';
  if (minutes < 1) return 'actualizado hace instantes';
  return `actualizado hace ${minutes} min`;
}

export function RateCard({ from, to, rate, provider, respondedAt }: Rate) {
  return (
    <div className="rounded-xl border border-line bg-card p-4 shadow-sm">
      <p className="text-sm text-muted">
        1 {from} = {formatRate(rate)} {to}
      </p>
      <p className="text-xs text-muted">
        {provider} · {agoText(respondedAt)}
      </p>
    </div>
  );
}

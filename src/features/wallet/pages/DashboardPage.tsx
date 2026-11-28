import { Link } from 'react-router-dom';
import { mockBalances } from '../mocks/balances.mock';
import { mockRate } from '../mocks/rate.mock';
import { BalanceCard } from '../components/BalanceCard';
import { RateCard } from '../components/RateCard';

// Dashboard (FE-3): junta los BalanceCard y el RateCard usando mocks.
// Cuando GET /api/wallet y GET /api/rates estén listos, estos mocks
// se reemplazan por llamadas reales con axios (apiClient), y ahí se suman
// los estados de carga y de error con reintento.
// Sin padding propio: AppLayout ya le pone márgenes al contenido de cada página.
// Colores: usa los tokens del equipo (styles/index.css).

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
        {/* Acceso rápido a operaciones (FE-4, placeholder en el Sprint 1) */}
        <Link
          to="/operations"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Nueva operación
        </Link>
      </div>

      {/* Estado vacío: si no hay saldos, mostramos un mensaje en vez de una grilla vacía */}
      {mockBalances.length === 0 ? (
        <p className="text-sm text-muted">Todavía no tenés saldos para mostrar.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mockBalances.map((balance) => (
            <BalanceCard
              key={balance.currency}
              currency={balance.currency}
              amount={balance.amount}
            />
          ))}
        </section>
      )}

      <section>
        <RateCard {...mockRate} />
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-md py-16 text-center">
      <p className="text-5xl font-semibold text-brand-600">404</p>
      <h1 className="mt-4 text-xl font-semibold text-ink">Página no encontrada</h1>
      <p className="mt-2 text-sm text-muted">La dirección que buscás no existe.</p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex h-10 items-center rounded-lg bg-brand-600 px-4 text-sm font-medium text-white transition-colors hover:bg-brand-700"
      >
        Volver al dashboard
      </Link>
    </section>
  );
}

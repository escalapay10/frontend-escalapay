interface PlaceholderPageProps {
  title: string;
  sprint: string;
  owner: string;
  task: string;
  description?: string;
}

/**
 * Pantalla provisoria para rutas cuya feature todavía no existe (FE-1).
 * Se reemplaza por la página real cuando el responsable implementa su tarea.
 */
export function PlaceholderPage({ title, sprint, owner, task, description }: PlaceholderPageProps) {
  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-dashed border-brand-300 bg-card p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {sprint} · {task}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-ink">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Esta pantalla todavía no está construida. La implementa{' '}
          <strong className="font-medium text-ink">{owner}</strong> en la tarea {task}.
        </p>
        {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      </div>
    </section>
  );
}

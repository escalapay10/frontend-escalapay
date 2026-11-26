import type { ReactNode } from 'react';
import { Button } from './Button';

export interface ErrorMessageProps {
  /** Título genérico; los mensajes textuales de la planilla van en cada feature */
  title?: string;
  children?: ReactNode;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'No pudimos cargar los datos',
  children,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger"
    >
      <p className="font-medium">{title}</p>
      {children && <p className="mt-1 text-danger/90">{children}</p>}
      {onRetry && (
        <Button variant="danger" size="sm" className="mt-3" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}

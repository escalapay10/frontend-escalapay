import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Select({
  label,
  error,
  hint,
  className = '',
  id,
  children,
  ...props
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const describedBy = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`h-10 w-full rounded-lg border bg-card px-3 text-sm text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-60 ${
          error ? 'border-danger' : 'border-line'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${selectId}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

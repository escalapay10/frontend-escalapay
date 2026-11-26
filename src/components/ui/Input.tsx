import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Mensaje de error (borde rojo + aria-invalid, verificado por tests) */
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className = '', id, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`h-10 w-full rounded-lg border bg-card px-3 text-sm text-ink transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-60 ${
          error ? 'border-danger' : 'border-line'
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

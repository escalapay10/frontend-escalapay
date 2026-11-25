interface SpinnerProps {
  className?: string;
  /** Si se informa, el spinner es accesible (role="status"); si no, es decorativo */
  label?: string;
}

export function Spinner({ className = 'h-5 w-5', label }: SpinnerProps) {
  const accessibility = label
    ? ({ role: 'status', 'aria-label': label } as const)
    : ({ 'aria-hidden': true } as const);

  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" {...accessibility}>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
    </svg>
  );
}

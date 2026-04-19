import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, className = "", id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </span>
      <input
        ref={ref}
        id={inputId}
        className={`rounded-lg border bg-[var(--color-bg-panel)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-dim)]/60 focus:border-[var(--color-ice)] focus:shadow-[0_0_0_3px_rgba(107,216,255,0.15)] ${
          error
            ? "border-[var(--color-ice)]"
            : "border-[var(--color-border-hairline)]"
        } ${className}`}
        aria-invalid={!!error}
        {...rest}
      />
      {error ? (
        <span className="text-xs text-[var(--color-ice)]">{error}</span>
      ) : null}
    </label>
  );
});

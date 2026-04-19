import { forwardRef, type SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: readonly string[];
  error?: string;
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { label, options, error, placeholder, className = "", id, ...rest },
  ref,
) {
  const selectId = id ?? rest.name;
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </span>
      <select
        ref={ref}
        id={selectId}
        className={`rounded-lg border bg-[var(--color-bg-panel)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-ice)] focus:shadow-[0_0_0_3px_rgba(107,216,255,0.15)] ${
          error
            ? "border-[var(--color-ice)]"
            : "border-[var(--color-border-hairline)]"
        } ${className}`}
        aria-invalid={!!error}
        defaultValue=""
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-xs text-[var(--color-ice)]">{error}</span>
      ) : null}
    </label>
  );
});

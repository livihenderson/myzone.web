import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AsButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type AsLinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href"> & {
    href: string;
  };

export type ButtonProps = AsButtonProps | AsLinkProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-black)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-ice)] text-[var(--color-bg-black)] shadow-[0_0_32px_rgba(107,216,255,0.45)] hover:shadow-[0_0_56px_rgba(107,216,255,0.7)] hover:-translate-y-[1px]",
  ghost:
    "border border-[var(--color-border-hairline)] text-[var(--color-text-primary)] hover:border-[var(--color-ice)] hover:text-[var(--color-ice)]",
};

export function Button(props: ButtonProps) {
  const variant: Variant = props.variant ?? "primary";
  const className = props.className ?? "";
  const cls = `${base} ${variants[variant]} ${className}`;

  if (typeof props.href === "string") {
    const {
      href,
      variant: _v,
      className: _c,
      children,
      ...rest
    } = props as AsLinkProps;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    className: _c,
    children,
    href: _h,
    ...rest
  } = props as AsButtonProps;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

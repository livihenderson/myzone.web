// Type declarations for the Reservine booking web component.
// Loaded at runtime via the <script> in app/layout.tsx
// (https://unpkg.com/reservine-button@latest). See
// https://github.com/Reservine/Integrations for the full attribute reference.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

interface ReservineButtonAttributes {
  /** Reservine booking URL, e.g. https://myzonegym.reservine.me (required). */
  reservationUrl: string;
  /** Button label when not used as a wrapper. */
  text?: string;
  size?: "small" | "medium" | "large";
  width?: "auto" | "full";
  /** Hex color, e.g. #6BD8FF. */
  color?: string;
  borderRadius?: string;
  appearance?: "primary" | "text" | "outline";
  /** Branch ID for multi-location businesses. Accepts the numeric id as string or number. */
  branch?: number | string;
  /** Pre-select a service by id. */
  service?: number | string;
  /** Pre-select an employee by id. */
  employee?: number | string;
  /** Render as a wrapper around custom content instead of a standalone button. */
  asWrapper?: boolean;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "reservine-button": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & ReservineButtonAttributes,
        HTMLElement
      >;
    }
  }
}

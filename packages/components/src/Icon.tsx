import type { ReactNode, SVGAttributes } from "react";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "children"> {
  size?: IconSize;
  label?: string;
  children: ReactNode;
}

const sizeClass: Record<IconSize, string> = {
  sm: "ds-icon--sm",
  md: "ds-icon--md",
  lg: "ds-icon--lg",
};

export function Icon({
  size = "md",
  label,
  className,
  viewBox = "0 0 24 24",
  children,
  ...rest
}: IconProps) {
  const classes = ["ds-icon", sizeClass[size], className].filter(Boolean).join(" ");
  const a11yProps = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true };

  return (
    <svg
      className={classes}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      {...a11yProps}
      {...rest}
    >
      {children}
    </svg>
  );
}

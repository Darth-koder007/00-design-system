import type { HTMLAttributes } from "react";

export type BadgeTone = "neutral" | "accent" | "danger" | "success" | "warning";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClass: Record<BadgeTone, string> = {
  neutral: "ds-badge--neutral",
  accent: "ds-badge--accent",
  danger: "ds-badge--danger",
  success: "ds-badge--success",
  warning: "ds-badge--warning",
};

export function Badge({ tone = "neutral", className, children, ...rest }: BadgeProps) {
  const classes = ["ds-badge", toneClass[tone], className].filter(Boolean).join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

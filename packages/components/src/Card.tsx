import type { HTMLAttributes } from "react";

export type CardPadding = "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

const paddingClass: Record<CardPadding, string> = {
  sm: "ds-card--padding-sm",
  md: "ds-card--padding-md",
  lg: "ds-card--padding-lg",
};

export function Card({ padding = "md", className, children, ...rest }: CardProps) {
  const classes = ["ds-card", paddingClass[padding], className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

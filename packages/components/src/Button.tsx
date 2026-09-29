import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonTone = "neutral" | "accent" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  tone?: ButtonTone;
  /** @deprecated Use `tone` instead. Kept for pre-0.1 consumers; will be removed in 1.0. */
  color?: ButtonTone;
}

const sizeClass: Record<ButtonSize, string> = {
  sm: "ds-button--sm",
  md: "ds-button--md",
  lg: "ds-button--lg",
};

const toneClass: Record<ButtonTone, string> = {
  neutral: "ds-button--neutral",
  accent: "ds-button--accent",
  danger: "ds-button--danger",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { size = "md", tone, color, className, children, ...rest },
  ref
) {
  const resolvedTone = tone ?? color ?? "neutral";
  const classes = ["ds-button", sizeClass[size], toneClass[resolvedTone], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
});

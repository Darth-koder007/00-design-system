import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonTone = "neutral" | "accent" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  tone?: ButtonTone;
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
  { size = "md", tone = "neutral", className, children, ...rest },
  ref
) {
  const classes = ["ds-button", sizeClass[size], toneClass[tone], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
});

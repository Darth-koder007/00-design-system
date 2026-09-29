import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  invalid?: boolean;
  label?: ReactNode;
  helpText?: ReactNode;
}

const sizeClass: Record<InputSize, string> = {
  sm: "ds-input--sm",
  md: "ds-input--md",
  lg: "ds-input--lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = "md",
    invalid = false,
    label,
    helpText,
    className,
    id,
    "aria-describedby": ariaDescribedBy,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helpTextId = helpText ? `${inputId}-help` : undefined;
  const describedBy = [ariaDescribedBy, helpTextId].filter(Boolean).join(" ") || undefined;

  const classes = ["ds-input", sizeClass[size], invalid && "ds-input--invalid", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="ds-input-field">
      {label && (
        <label className="ds-input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={classes}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {helpText && (
        <span id={helpTextId} className="ds-input-help">
          {helpText}
        </span>
      )}
    </div>
  );
});

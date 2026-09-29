import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, id, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const classes = ["ds-radio", className].filter(Boolean).join(" ");

  return (
    <span className="ds-radio-field">
      <input ref={ref} id={inputId} type="radio" className={classes} {...rest} />
      <label className="ds-radio-label" htmlFor={inputId}>
        {label}
      </label>
    </span>
  );
});

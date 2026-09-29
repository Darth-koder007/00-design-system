import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: SelectSize;
  invalid?: boolean;
  label?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
}

const sizeClass: Record<SelectSize, string> = {
  sm: "ds-select--sm",
  md: "ds-select--md",
  lg: "ds-select--lg",
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = "md", invalid = false, label, options, placeholder, className, id, ...rest },
  ref
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const classes = ["ds-select", sizeClass[size], invalid && "ds-select--invalid", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="ds-select-field">
      {label && (
        <label className="ds-select-label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={classes}
        aria-invalid={invalid || undefined}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

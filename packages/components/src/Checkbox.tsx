import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from "react";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label: ReactNode;
  indeterminate?: boolean;
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate = false, className, id, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const internalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const classes = ["ds-checkbox", className].filter(Boolean).join(" ");

  return (
    <span className="ds-checkbox-field">
      <input
        ref={mergeRefs(internalRef, ref)}
        id={inputId}
        type="checkbox"
        className={classes}
        {...rest}
      />
      <label className="ds-checkbox-label" htmlFor={inputId}>
        {label}
      </label>
    </span>
  );
});

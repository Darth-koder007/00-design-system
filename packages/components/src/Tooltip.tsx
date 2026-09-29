import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactElement;
}

export function Tooltip({ content, placement = "top", children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  if (!isValidElement(children)) {
    throw new Error("Tooltip's child must be a single element that can accept a ref and props.");
  }

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const trigger = cloneElement(children, {
    "aria-describedby": visible ? tooltipId : undefined,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  } as Record<string, unknown>);

  return (
    <span className="ds-tooltip-wrapper">
      {trigger}
      {visible && (
        <span role="tooltip" id={tooltipId} className={`ds-tooltip ds-tooltip--${placement}`}>
          {content}
        </span>
      )}
    </span>
  );
}

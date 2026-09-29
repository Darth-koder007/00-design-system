import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
} from "react";

export interface DropdownItem {
  value: string;
  label: string;
  disabled?: boolean;
  onSelect: () => void;
}

export interface DropdownProps {
  trigger: ReactElement;
  items: DropdownItem[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open) itemRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  const enabledIndices = items.reduce<number[]>((acc, item, index) => {
    if (!item.disabled) acc.push(index);
    return acc;
  }, []);

  const moveActive = (direction: 1 | -1) => {
    if (enabledIndices.length === 0) return;
    const currentPosition = enabledIndices.indexOf(activeIndex);
    const nextPosition =
      (currentPosition + direction + enabledIndices.length) % enabledIndices.length;
    const nextIndex = enabledIndices[nextPosition];
    if (nextIndex !== undefined) setActiveIndex(nextIndex);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveIndex(enabledIndices[0] ?? 0);
      setOpen(true);
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
        ref: (node: HTMLElement | null) => {
          triggerRef.current = node;
        },
        "aria-haspopup": "menu",
        "aria-expanded": open,
        onClick: () => {
          setActiveIndex(enabledIndices[0] ?? 0);
          setOpen((current) => !current);
        },
        onKeyDown: handleTriggerKeyDown,
      })
    : trigger;

  return (
    <div className="ds-dropdown" ref={containerRef}>
      {triggerElement}
      {open && (
        <div role="menu" className="ds-dropdown-menu" onKeyDown={handleMenuKeyDown}>
          {items.map((item, index) => (
            <button
              key={item.value}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              tabIndex={-1}
              className="ds-dropdown-item"
              onClick={() => {
                item.onSelect();
                close();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

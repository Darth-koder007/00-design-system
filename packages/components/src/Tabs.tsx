import {
  createContext,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  registerTab: (value: string) => void;
  getTabOrder: () => string[];
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`<${componentName}> must be rendered inside <Tabs>.`);
  }
  return context;
}

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ value, defaultValue, onValueChange, children }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;
  const baseId = useId();
  const orderRef = useRef<string[]>([]);

  const setValue = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const registerTab = (tabValue: string) => {
    if (!orderRef.current.includes(tabValue)) orderRef.current.push(tabValue);
  };

  const contextValue = useMemo(
    () => ({
      value: activeValue,
      setValue,
      baseId,
      registerTab,
      getTabOrder: () => orderRef.current,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeValue, baseId]
  );

  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
}

export function TabList({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const { value, setValue, getTabOrder } = useTabsContext("TabList");

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const order = getTabOrder();
    if (order.length === 0) return;
    const currentIndex = order.indexOf(value);

    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % order.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (currentIndex - 1 + order.length) % order.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = order.length - 1;

    if (nextIndex === undefined) return;
    const nextValue = order[nextIndex];
    if (nextValue === undefined) return;
    event.preventDefault();
    setValue(nextValue);

    const nextTab = event.currentTarget.querySelector<HTMLButtonElement>(
      `[data-tab-value="${nextValue}"]`
    );
    nextTab?.focus();
  };

  return (
    <div
      role="tablist"
      className={["ds-tab-list", className].filter(Boolean).join(" ")}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  value: string;
}

export function Tab({ value, className, children, ...rest }: TabProps) {
  const { value: activeValue, setValue, baseId, registerTab } = useTabsContext("Tab");
  registerTab(value);
  const selected = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      data-tab-value={value}
      className={["ds-tab", selected && "ds-tab--selected", className].filter(Boolean).join(" ")}
      onClick={() => setValue(value)}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  value: string;
}

export function TabPanel({ value, className, children, ...rest }: TabPanelProps) {
  const { value: activeValue, baseId } = useTabsContext("TabPanel");
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      className={["ds-tab-panel", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

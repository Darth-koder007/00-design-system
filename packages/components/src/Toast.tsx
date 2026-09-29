import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

export type ToastTone = "neutral" | "success" | "danger";

export interface ToastOptions {
  tone?: ToastTone;
  duration?: number;
}

interface ToastRecord {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 4000;

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be called within a <ToastProvider>.");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = nextId.current++;
      const tone = options?.tone ?? "neutral";
      setToasts((current) => [...current, { id, message, tone }]);
      window.setTimeout(() => dismiss(id), options?.duration ?? DEFAULT_DURATION_MS);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="ds-toast-viewport" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastRecord; onDismiss: () => void }) {
  return (
    <div
      role={toast.tone === "danger" ? "alert" : "status"}
      className={`ds-toast ds-toast--${toast.tone}`}
    >
      <span>{toast.message}</span>
      <button
        type="button"
        className="ds-toast-dismiss"
        aria-label="Dismiss notification"
        onClick={onDismiss}
      >
        ×
      </button>
    </div>
  );
}

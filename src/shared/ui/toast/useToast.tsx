"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Toast, type ToastType, type ToastAction } from "./Toast";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: ToastAction;
  dismissible?: boolean;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (options: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  position: ToastPosition;
  setPosition: (position: ToastPosition) => void;
  defaultDuration: number;
  setDefaultDuration: (duration: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const positionStyles: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

const MAX_TOASTS = 5;

export function ToastContainer({
  children,
  initialPosition = "bottom-right",
  initialDuration = 5000,
}: {
  children: React.ReactNode;
  initialPosition?: ToastPosition;
  initialDuration?: number;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [position, setPosition] = useState<ToastPosition>(initialPosition);
  const [defaultDuration, setDefaultDuration] = useState(initialDuration);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback(
    (options: Omit<ToastItem, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const duration = options.duration ?? defaultDuration;

      setToasts((prev) => {
        const newToasts = [...prev, { ...options, id, duration }];
        if (newToasts.length > MAX_TOASTS) {
          return newToasts.slice(-MAX_TOASTS);
        }
        return newToasts;
      });

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [defaultDuration, dismiss]
  );

  const contextValue: ToastContextValue = {
    toasts,
    toast,
    dismiss,
    dismissAll,
    position,
    setPosition,
    defaultDuration,
    setDefaultDuration,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className={`fixed z-[100] flex flex-col gap-3 pointer-events-none ${positionStyles[position]}`}
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast
              id={t.id}
              type={t.type}
              title={t.title}
              description={t.description}
              action={t.action}
              dismissible={t.dismissible ?? true}
              onDismiss={dismiss}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastContainer");
  }

  const {
    toast,
    dismiss,
    dismissAll,
    position,
    setPosition,
    defaultDuration,
    setDefaultDuration,
  } = context;

  const error = useCallback(
    (
      title: string,
      description?: string,
      options?: Partial<
        Omit<ToastItem, "id" | "type" | "title" | "description">
      >
    ) => toast({ type: "error", title, description, ...options }),
    [toast]
  );

  const warning = useCallback(
    (
      title: string,
      description?: string,
      options?: Partial<
        Omit<ToastItem, "id" | "type" | "title" | "description">
      >
    ) => toast({ type: "warning", title, description, ...options }),
    [toast]
  );

  const info = useCallback(
    (
      title: string,
      description?: string,
      options?: Partial<
        Omit<ToastItem, "id" | "type" | "title" | "description">
      >
    ) => toast({ type: "info", title, description, ...options }),
    [toast]
  );

  const success = useCallback(
    (
      title: string,
      description?: string,
      options?: Partial<
        Omit<ToastItem, "id" | "type" | "title" | "description">
      >
    ) => toast({ type: "success", title, description, ...options }),
    [toast]
  );

  return {
    toast,
    dismiss,
    dismissAll,
    error,
    warning,
    info,
    success,
    position,
    setPosition,
    defaultDuration,
    setDefaultDuration,
  };
}

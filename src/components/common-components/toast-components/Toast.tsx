"use client";

import { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: ToastAction;
  dismissible?: boolean;
  onDismiss?: (id: string) => void;
}

const toastStyles: Record<
  ToastType,
  { bg: string; border: string; icon: string }
> = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-600",
  },
  error: { bg: "bg-red-50", border: "border-red-200", icon: "text-red-600" },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "text-yellow-600",
  },
  info: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600" },
};

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

export default function Toast({
  id,
  type,
  title,
  description,
  action,
  dismissible = true,
  onDismiss,
}: ToastProps) {
  const [visible, setVisible] = useState(false);
  const styles = toastStyles[type];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      className={`flex items-start gap-3 w-[360px] max-w-[calc(100vw-2rem)] p-4 rounded-xl border-2 shadow-lg transition-all duration-300 ${styles.bg} ${styles.border} ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
    >
      <span className={`text-base font-bold ${styles.icon}`}>
        {icons[type]}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {description && (
          <p className="mt-1 text-xs text-gray-600">{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className={`mt-2 text-xs font-semibold underline underline-offset-2 hover:no-underline ${styles.icon}`}
          >
            {action.label}
          </button>
        )}
      </div>

      {dismissible && onDismiss && (
        <button
          onClick={() => onDismiss(id)}
          className="p-1 rounded-lg hover:bg-black/5 text-gray-500 text-sm"
        >
          ✕
        </button>
      )}
    </div>
  );
}

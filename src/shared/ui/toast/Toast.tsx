"use client";

import { useState, useEffect } from "react";
import { X, AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

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
  { bg: string; border: string; icon: string; iconBg: string }
> = {
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
    iconBg: "bg-red-100",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-600",
    iconBg: "bg-green-100",
  },
};

function ToastIcon({
  type,
  className,
}: {
  type: ToastType;
  className?: string;
}) {
  const iconProps = { size: 18, className };

  switch (type) {
    case "error":
      return <XCircle {...iconProps} />;
    case "warning":
      return <AlertTriangle {...iconProps} />;
    case "info":
      return <Info {...iconProps} />;
    case "success":
      return <CheckCircle2 {...iconProps} />;
  }
}

export function Toast({
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
      className={`relative flex items-start gap-3 w-[360px] max-w-[calc(100vw-2rem)] p-4 rounded-xl border-2 shadow-lg transition-all duration-300 ${styles.bg} ${styles.border} ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 p-1.5 rounded-lg ${styles.iconBg}`}>
        <ToastIcon type={type} className={styles.icon} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {description && (
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            {description}
          </p>
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

      {/* Close Button */}
      {dismissible && onDismiss && (
        <button
          onClick={() => onDismiss(id)}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Dismiss notification"
        >
          <X size={16} className="text-gray-500" />
        </button>
      )}
    </div>
  );
}

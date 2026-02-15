"use client";

import { useState, useCallback } from "react";
import Toast from "./Toast";

type ToastType = "success" | "error" | "warning" | "info";
interface ActiveToast { id: number; message: string; type: ToastType; }
let toastId = 0;

export default function ToastShowcase() {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {(["success", "error", "warning", "info"] as ToastType[]).map((type) => (
          <button
            key={type}
            onClick={() => showToast(`This is a ${type} toast`, type)}
            className="px-4 py-2 text-sm font-medium rounded-lg capitalize bg-gray-200 hover:bg-gray-300"
          >
            {type}
          </button>
        ))}
      </div>

      {toasts.map((t, i) => (
        <div key={t.id} style={{ bottom: `${(i + 1) * 60}px` }} className="fixed right-6">
          <Toast message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
        </div>
      ))}
    </>
  );
}

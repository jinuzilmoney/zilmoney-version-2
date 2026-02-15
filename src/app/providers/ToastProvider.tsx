"use client";

import { ToastContainer } from "@/src/shared/ui/toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <ToastContainer>{children}</ToastContainer>;
}

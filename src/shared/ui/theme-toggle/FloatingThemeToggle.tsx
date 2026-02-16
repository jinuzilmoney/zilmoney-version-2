"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ThemeToggle } from "./ThemeToggle";

const emptySubscribe = () => () => {};

export function FloatingThemeToggle() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[9999]">
      <ThemeToggle className="h-10 w-10 shadow-lg" />
    </div>,
    document.body,
  );
}

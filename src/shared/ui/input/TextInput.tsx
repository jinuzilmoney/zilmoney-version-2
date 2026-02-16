import React from "react";
import { cn } from "@/src/shared/lib";

export interface TextInputProps extends React.ComponentProps<"input"> {
  error?: string;
}

export function TextInput({ className, error, ...props }: TextInputProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        className={cn(
          "flex h-11 min-h-[44px] w-full rounded-xl border bg-card px-4 py-3 text-base text-foreground shadow-sm transition-all duration-200",
          "placeholder:text-placeholder hover:border-muted-foreground/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:py-2",
          error ? "border-destructive" : "border-input",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

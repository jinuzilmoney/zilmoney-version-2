import React from "react";
import { cn } from "@/src/shared/lib";

export interface TextAreaProps extends React.ComponentProps<"textarea"> {
  error?: string;
}

export function TextArea({ className, error, ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          "flex min-h-[88px] w-full resize-y rounded-xl border bg-card px-4 py-3 text-base text-foreground shadow-sm transition-all duration-200",
          "placeholder:text-placeholder hover:border-muted-foreground/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:py-2",
          error ? "border-destructive" : "border-input",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

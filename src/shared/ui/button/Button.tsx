"use client";

import { forwardRef } from "react";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "glass"
  | "outline"
  | "destructive"
  | "neon";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

import { cn } from "@/src/shared/lib";

export interface ButtonBaseProps {
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tooltip?: string;
}

interface InternalButtonProps extends ButtonBaseProps {
  variant: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-neon shadow-md hover:shadow-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed border border-primary/10",
  secondary:
    "bg-card text-card-foreground shadow-sm hover:shadow-md border border-border hover:bg-hover disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent hover:bg-hover text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
  glass:
    "glass text-foreground hover:bg-hover/60 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  outline:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed",
  destructive:
    "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed",
  neon: "bg-primary-neon text-foreground shadow-md hover:shadow-lg hover:bg-primary-neon-light disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 min-h-[44px] px-4 text-sm rounded-lg",
  md: "h-11 min-h-[44px] px-5 py-2.5 text-sm rounded-xl",
  lg: "h-12 min-h-[48px] px-8 text-base rounded-xl",
  icon: "h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl",
};

export const ButtonBase = forwardRef<HTMLButtonElement, InternalButtonProps>(
  (
    { className, variant, size = "md", children, disabled, tooltip, ...props },
    ref,
  ) => {
    const button = (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-medium cursor-pointer transition-all duration-200 overflow-hidden whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-main-background",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );

    if (tooltip) {
      return (
        <div className="relative group/tooltip inline-flex">
          {button}
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs text-main-background opacity-0 transition-opacity group-hover/tooltip:opacity-100 z-50">
            {tooltip}
          </span>
        </div>
      );
    }

    return button;
  },
);

ButtonBase.displayName = "ButtonBase";

"use client";

import { forwardRef } from "react";
import { Input, InputProps } from "./Input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  autoComplete?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ autoComplete = "current-password", ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="password"
        autoComplete={autoComplete}
        placeholder="••••••••"
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

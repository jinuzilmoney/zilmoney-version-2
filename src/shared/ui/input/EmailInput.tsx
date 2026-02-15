"use client";

import { forwardRef } from "react";
import { Input, InputProps } from "./Input";

export interface EmailInputProps extends Omit<InputProps, "type"> {
  autoComplete?: string;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ autoComplete = "email", ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="email"
        autoComplete={autoComplete}
        placeholder="you@example.com"
        {...props}
      />
    );
  }
);

EmailInput.displayName = "EmailInput";

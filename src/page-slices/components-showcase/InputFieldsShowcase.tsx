"use client";

import { Input, EmailInput, PasswordInput } from "@/src/shared/ui/input";

export function InputFieldsShowcase() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input label="Text Input" placeholder="Enter text..." />
      <EmailInput label="Email Input" />
      <PasswordInput label="Password Input" />
      <Input label="With Helper Text" helperText="This is a helper text" />
      <Input label="With Error" error="This field is required" />
      <Input label="Disabled Input" placeholder="Disabled" disabled />
    </div>
  );
}

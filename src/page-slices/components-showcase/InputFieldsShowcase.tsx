"use client";

import { TextInput, TextArea, NumberInput, EmailInput, PasswordInput, Dropdown } from "@/src/shared/ui/input";

export function InputFieldsShowcase() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <TextInput placeholder="Text input..." />
      <TextArea placeholder="Text area input..." />
      <NumberInput placeholder="Number input..." />
      <EmailInput placeholder="Email input..." />
      <PasswordInput placeholder="Password input..." />
      <Dropdown
        placeholder="Select category type..."
        options={[
          { label: "Income", value: "income" },
          { label: "Expense", value: "expense" },
        ]}
        
      />
    </div>
  );
}

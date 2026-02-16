"use client";

import { useState } from "react";
import {
  TextInput,
  TextArea,
  NumberInput,
  EmailInput,
  PasswordInput,
  Dropdown,
} from "@/src/shared/ui/input";

export function InputFieldsShowcase() {
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <TextInput placeholder="Text input..." />
      <TextArea placeholder="Text area input..." />
      <NumberInput placeholder="Number input..." />
      <EmailInput placeholder="Email input..." />
      <PasswordInput
        placeholder="Password input..."
        value={password}
        onChange={setPassword}
      />
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

"use client";

import { TextInput, TextArea, NumberInput } from "@/src/shared/ui/input";

export function InputFieldsShowcase() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <TextInput placeholder="Text input..." />
      <TextArea placeholder="Text area input..." />
      <NumberInput placeholder="Number input..." />
    </div>
  );
}

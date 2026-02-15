"use client";

import { useToast } from "@/src/shared/ui/toast";
import { PrimaryButton,SecondaryButton } from "@/src/shared/ui/button";

export function ToastShowcase() {
  const { success, error, warning, info } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <PrimaryButton
        onClick={() => success("Success", "Action completed successfully!")}
      >
        Success
      </PrimaryButton>
      <SecondaryButton
        onClick={() => error("Error", "Something went wrong!")}
      >
        Error
      </SecondaryButton>
      <SecondaryButton
        onClick={() => warning("Warning", "Please check your input.")}
      >
        Warning
      </SecondaryButton>
      <SecondaryButton
        onClick={() => info("Info", "Here is some info for you.")}
      >
        Info
      </SecondaryButton>
    </div>
  );
}

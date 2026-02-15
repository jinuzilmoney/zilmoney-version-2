"use client";

import { useToast } from "@/src/shared/ui/toast";
import { Button } from "@/src/shared/ui/button";

export function ToastShowcase() {
  const { success, error, warning, info } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => success("Success", "Action completed successfully!")}
        variant="secondary"
      >
        Success
      </Button>
      <Button
        onClick={() => error("Error", "Something went wrong!")}
        variant="secondary"
      >
        Error
      </Button>
      <Button
        onClick={() => warning("Warning", "Please check your input.")}
        variant="secondary"
      >
        Warning
      </Button>
      <Button
        onClick={() => info("Info", "Here is some info for you.")}
        variant="secondary"
      >
        Info
      </Button>
    </div>
  );
}

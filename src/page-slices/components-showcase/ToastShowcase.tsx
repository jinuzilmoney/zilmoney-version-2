"use client";

import { useToast } from "@/src/shared/ui/toast";

export function ToastShowcase() {
  const { success, error, warning, info } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => error("Error", "Something went wrong!")}
        className="px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
      >
        Error Toast
      </button>
      <button
        onClick={() => warning("Warning", "Please check your input.")}
        className="px-6 py-2 text-sm font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Warning Toast
      </button>
      <button
        onClick={() => info("Info", "Here is some info for you.")}
        className="px-6 py-2 text-sm font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Info Toast
      </button>
      <button
        onClick={() => success("Success", "Action completed successfully!")}
        className="px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
      >
        Success Toast
      </button>
    </div>
  );
}

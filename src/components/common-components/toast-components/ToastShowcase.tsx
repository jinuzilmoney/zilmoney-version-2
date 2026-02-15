"use client";

import { useToast } from "./toast-provider";

export default function ToastShowcase() {
  const { success, error, warning, info } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => success("Success", "Action completed successfully!")}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Success
      </button>
      <button
        onClick={() => error("Error", "Something went wrong!")}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Error
      </button>
      <button
        onClick={() => warning("Warning", "Please check your input.")}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Warning
      </button>
      <button
        onClick={() => info("Info", "Here is some info for you.")}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Info
      </button>
    </div>
  );
}

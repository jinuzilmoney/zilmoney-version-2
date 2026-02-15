import React from "react";

export interface EmailInputProps extends React.ComponentProps<"input"> {
  error?: string;
}

export function EmailInput({ className = "", error, ...props }: EmailInputProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        inputMode="email"
        className={`flex h-11 min-h-[44px] w-full rounded-xl border ${error ? "border-red-500" : "border-gray-200"} bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20319D] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:py-2 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

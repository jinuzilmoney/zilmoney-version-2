import React from "react";

export interface TextInputProps extends React.ComponentProps<"input"> {}

export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      type="text"
      className={`flex h-11 min-h-[44px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20319D] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:py-2 ${className}`}
      {...props}
    />
  );
}

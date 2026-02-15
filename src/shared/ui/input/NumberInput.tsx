"use client";

import React from "react";

export interface NumberInputProps extends React.ComponentProps<"input"> {
  error?: string;
}

export function NumberInput({ className = "", error, onWheel, ...props }: NumberInputProps) {
  return (
    <div className="w-full">
      <input
        type="number"
        onWheel={(e) => {
          e.currentTarget.blur();
          onWheel?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
          }
          props.onKeyDown?.(e);
        }}
        className={`flex h-11 min-h-[44px] w-full rounded-xl border ${error ? "border-red-500" : "border-gray-200"} bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20319D] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:py-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

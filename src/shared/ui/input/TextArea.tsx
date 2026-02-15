import React from "react";

export interface TextAreaProps extends React.ComponentProps<"textarea"> {
  error?: string;
}

export function TextArea({ className = "", error, ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      <textarea
        className={`flex min-h-[88px] w-full resize-y rounded-xl border ${error ? "border-red-500" : "border-gray-200"} bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20319D] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:py-2 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

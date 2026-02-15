import React from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps extends Omit<React.ComponentProps<"select">, "children"> {
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
}

export function Dropdown({ className = "", error, options, placeholder, defaultValue, value, ...props }: DropdownProps) {
  const hasSelection = value !== undefined ? value !== "" : defaultValue !== undefined && defaultValue !== "";
  return (
    <div className="w-full">
      <div className="relative">
        <select
          className={`flex h-11 min-h-[44px] w-full appearance-none rounded-xl border ${error ? "border-red-500" : "border-gray-200"} bg-white px-4 py-3 pr-10 text-base shadow-sm transition-all duration-200 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20319D] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:py-2 ${hasSelection ? "text-gray-900" : "text-gray-400"} ${className}`}
          defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
          value={value}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-gray-400">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

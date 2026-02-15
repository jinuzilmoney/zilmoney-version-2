"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  className = "",
  error,
  options,
  placeholder,
  defaultValue,
  value: controlledValue,
  onChange,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedOption = options.find((o) => o.value === selectedValue);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          disabled={disabled}
          className={`flex h-11 min-h-[44px] w-full items-center justify-between rounded-xl border ${
            error ? "border-red-500" : isOpen ? "border-[#20319D] ring-2 ring-[#20319D] ring-offset-1" : "border-gray-200"
          } bg-white px-4 py-3 text-base shadow-sm transition-all duration-200 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:py-2 ${className}`}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder ?? "Select..."}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Options List */}
        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="max-h-60 overflow-y-auto py-1">
              {placeholder && (
                <div className="px-4 py-2.5 text-sm text-gray-400 border-b border-gray-100 cursor-default">
                  {placeholder}
                </div>
              )}
              {options.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-[#20319D]/10 text-[#20319D] font-medium"
                        : "text-gray-900 hover:bg-[#20319D]/5"
                    }`}
                  >
                    {option.label}
                    {isSelected && <Check size={16} className="text-[#20319D]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/src/shared/lib/utils";

export interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChange: (value: string) => void;
  onCountryCodeChange: (code: string) => void;
  error?: string;
  label?: string;
  id?: string;
  className?: string;
  compact?: boolean;
}

const COUNTRY_CODES = [
  {
    code: "+1",
    country: "US",
    flag: "\u{1F1FA}\u{1F1F8}",
    name: "United States",
  },
  { code: "+1", country: "CA", flag: "\u{1F1E8}\u{1F1E6}", name: "Canada" },
  {
    code: "+44",
    country: "UK",
    flag: "\u{1F1EC}\u{1F1E7}",
    name: "United Kingdom",
  },
  { code: "+61", country: "AU", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia" },
  { code: "+91", country: "IN", flag: "\u{1F1EE}\u{1F1F3}", name: "India" },
  { code: "+49", country: "DE", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { code: "+33", country: "FR", flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
  { code: "+81", country: "JP", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan" },
  { code: "+86", country: "CN", flag: "\u{1F1E8}\u{1F1F3}", name: "China" },
  { code: "+55", country: "BR", flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil" },
  { code: "+52", country: "MX", flag: "\u{1F1F2}\u{1F1FD}", name: "Mexico" },
  { code: "+34", country: "ES", flag: "\u{1F1EA}\u{1F1F8}", name: "Spain" },
  { code: "+39", country: "IT", flag: "\u{1F1EE}\u{1F1F9}", name: "Italy" },
  {
    code: "+31",
    country: "NL",
    flag: "\u{1F1F3}\u{1F1F1}",
    name: "Netherlands",
  },
  { code: "+65", country: "SG", flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore" },
  {
    code: "+971",
    country: "AE",
    flag: "\u{1F1E6}\u{1F1EA}",
    name: "United Arab Emirates",
  },
  {
    code: "+966",
    country: "SA",
    flag: "\u{1F1F8}\u{1F1E6}",
    name: "Saudi Arabia",
  },
  {
    code: "+82",
    country: "KR",
    flag: "\u{1F1F0}\u{1F1F7}",
    name: "South Korea",
  },
  {
    code: "+27",
    country: "ZA",
    flag: "\u{1F1FF}\u{1F1E6}",
    name: "South Africa",
  },
  { code: "+7", country: "RU", flag: "\u{1F1F7}\u{1F1FA}", name: "Russia" },
  { code: "+48", country: "PL", flag: "\u{1F1F5}\u{1F1F1}", name: "Poland" },
  { code: "+46", country: "SE", flag: "\u{1F1F8}\u{1F1EA}", name: "Sweden" },
  { code: "+47", country: "NO", flag: "\u{1F1F3}\u{1F1F4}", name: "Norway" },
  { code: "+45", country: "DK", flag: "\u{1F1E9}\u{1F1F0}", name: "Denmark" },
  { code: "+358", country: "FI", flag: "\u{1F1EB}\u{1F1EE}", name: "Finland" },
  {
    code: "+41",
    country: "CH",
    flag: "\u{1F1E8}\u{1F1ED}",
    name: "Switzerland",
  },
  { code: "+43", country: "AT", flag: "\u{1F1E6}\u{1F1F9}", name: "Austria" },
  { code: "+32", country: "BE", flag: "\u{1F1E7}\u{1F1EA}", name: "Belgium" },
  { code: "+353", country: "IE", flag: "\u{1F1EE}\u{1F1EA}", name: "Ireland" },
  {
    code: "+64",
    country: "NZ",
    flag: "\u{1F1F3}\u{1F1FF}",
    name: "New Zealand",
  },
  {
    code: "+63",
    country: "PH",
    flag: "\u{1F1F5}\u{1F1ED}",
    name: "Philippines",
  },
  { code: "+60", country: "MY", flag: "\u{1F1F2}\u{1F1FE}", name: "Malaysia" },
  { code: "+62", country: "ID", flag: "\u{1F1EE}\u{1F1E9}", name: "Indonesia" },
  { code: "+66", country: "TH", flag: "\u{1F1F9}\u{1F1ED}", name: "Thailand" },
  { code: "+84", country: "VN", flag: "\u{1F1FB}\u{1F1F3}", name: "Vietnam" },
];

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

export function PhoneInput({
  value,
  countryCode,
  onChange,
  onCountryCodeChange,
  error,
  label,
  id,
  className,
  compact = false,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode && c.country === "US") ||
    COUNTRY_CODES.find((c) => c.code === countryCode) ||
    COUNTRY_CODES[0];

  const filteredCountries = COUNTRY_CODES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery) ||
      country.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  const handleCountrySelect = (country: (typeof COUNTRY_CODES)[0]) => {
    onCountryCodeChange(country.code);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block font-medium text-gray-700",
            compact ? "text-xs" : "text-sm",
          )}
        >
          {label}
        </label>
      )}
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center gap-2 border transition-colors bg-white touch-manipulation",
              compact
                ? "h-11 min-h-[44px] px-3 rounded-lg"
                : "h-12 min-h-[48px] px-4 rounded-xl",
              error
                ? "border-red-500"
                : "border-gray-200 hover:border-gray-300 active:border-[#20319D]",
              "focus:outline-none focus:ring-2 focus:ring-[#20319D]",
            )}
          >
            <span className={compact ? "text-lg" : "text-xl"}>
              {selectedCountry.flag}
            </span>
            <span
              className={cn(
                "font-medium text-gray-700",
                compact ? "text-sm" : "text-base md:text-sm",
              )}
            >
              {selectedCountry.code}
            </span>
            <ChevronDown
              size={compact ? 16 : 18}
              className={cn(
                "text-gray-400 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-72 sm:w-80 overflow-hidden">
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="search"
                    inputMode="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country..."
                    className="w-full pl-10 pr-4 py-3 text-base md:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20319D] focus:border-transparent touch-manipulation"
                  />
                </div>
              </div>

              <div className="max-h-72 overflow-auto overscroll-contain">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <button
                      key={`${country.code}-${country.country}-${index}`}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={cn(
                        "w-full px-4 py-3.5 min-h-[44px] flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left touch-manipulation",
                        country.code === countryCode &&
                          country.country === selectedCountry.country &&
                          "bg-[#20319D]/5",
                      )}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-base md:text-sm font-medium text-gray-900 flex-1">
                        {country.name}
                      </span>
                      <span className="text-base md:text-sm text-gray-500">
                        {country.code}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-base text-gray-500 text-center">
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative">
          <input
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={value}
            onChange={handlePhoneChange}
            placeholder="(555) 123-4567"
            className={cn(
              "w-full border px-4 py-3 transition-all touch-manipulation",
              compact
                ? "h-11 min-h-[44px] rounded-lg text-base md:text-sm"
                : "h-12 min-h-[48px] rounded-xl text-base md:text-sm",
              "md:py-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20319D] focus-visible:ring-offset-1",
              "placeholder:text-gray-400",
              error ? "border-red-500" : "border-gray-200",
            )}
          />
        </div>
      </div>

      {error && (
        <p className={cn(compact ? "text-[10px]" : "text-xs", "text-red-500")}>
          {error}
        </p>
      )}
    </div>
  );
}

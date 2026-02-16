'use client';

import { useState } from 'react';
import { Eye, EyeOff, CircleCheck, CircleX } from 'lucide-react';
import { cn } from '@/src/shared/lib/utils';

export interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  id?: string;
  showRequirements?: boolean;
  className?: string;
  compact?: boolean;
}

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'At least one lowercase letter', test: (v: string) => /[a-z]/.test(v) },
  { label: 'At least one uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'At least one number', test: (v: string) => /[0-9]/.test(v) },
  { label: 'At least one special character', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export function PasswordInput({
  value,
  onChange,
  placeholder = 'Enter password',
  label,
  error,
  id,
  showRequirements = false,
  className,
  compact = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={compact ? 'space-y-1' : 'space-y-2'}>
      {label && (
        <label htmlFor={id} className={cn('block font-medium text-gray-700', compact ? 'text-xs' : 'text-sm')}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="current-password"
          className={cn(
            'w-full border px-4 pr-14 py-3 transition-all touch-manipulation',
            compact ? 'h-11 min-h-[44px] rounded-lg text-base md:text-sm' : 'h-12 min-h-[48px] rounded-xl text-base md:text-sm',
            'md:py-2',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20319D] focus-visible:ring-offset-1',
            'placeholder:text-gray-400',
            error ? 'border-red-500' : 'border-gray-200',
            className
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 active:text-gray-700 transition-colors touch-manipulation"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={compact ? 18 : 22} /> : <Eye size={compact ? 18 : 22} />}
        </button>
      </div>

      {showRequirements && value && !compact && !PASSWORD_RULES.every((r) => r.test(value)) && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 space-y-1.5">
          <p className="text-xs font-semibold text-red-500">Password must contain:</p>
          {PASSWORD_RULES.map((rule) => {
            const passed = rule.test(value);
            return (
              <div key={rule.label} className="flex items-center gap-2">
                {passed ? (
                  <CircleCheck size={16} className="text-green-500 flex-shrink-0" />
                ) : (
                  <CircleX size={16} className="text-red-400 flex-shrink-0" />
                )}
                <span className={cn('text-xs', passed ? 'text-green-600' : 'text-red-500')}>
                  {rule.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {error && !showRequirements && (
        <p className={cn(compact ? 'text-[10px]' : 'text-xs', 'text-red-500')}>{error}</p>
      )}
    </div>
  );
}

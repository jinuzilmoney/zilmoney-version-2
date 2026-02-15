'use client';

import { forwardRef } from 'react';
import { motion, type MotionProps } from 'framer-motion';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'outline' | 'destructive' | 'neon';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';


import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

 function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface ButtonBaseProps extends Omit<MotionProps, 'ref'> {
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  tooltip?: string;
}

interface InternalButtonProps extends ButtonBaseProps {
  variant: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#20319D] text-[#3BF493] shadow-md hover:shadow-lg hover:bg-[#1a2780] disabled:opacity-50 disabled:cursor-not-allowed border border-[#20319D]/10',
  secondary:
    'bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 shadow-sm hover:shadow-md border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'bg-transparent hover:bg-gray-100/80 dark:hover:bg-slate-700/80 text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed',
  glass:
    'glass text-gray-900 dark:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-700/60 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
  outline:
    'bg-transparent border-2 border-[#20319D] text-[#20319D] dark:text-[#6B8AFF] dark:border-[#6B8AFF] hover:bg-[#20319D]/10 dark:hover:bg-[#6B8AFF]/10 disabled:opacity-50 disabled:cursor-not-allowed',
  destructive:
    'bg-red-500 text-white shadow-md hover:shadow-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed',
  neon:
    'bg-[#3BF493] text-gray-900 shadow-md hover:shadow-lg hover:bg-[#2de07d] disabled:opacity-50 disabled:cursor-not-allowed',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 min-h-[44px] px-4 text-sm rounded-lg',
  md: 'h-11 min-h-[44px] px-5 py-2.5 text-sm rounded-xl',
  lg: 'h-12 min-h-[48px] px-8 text-base rounded-xl',
  icon: 'h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl',
};

export const ButtonBase = forwardRef<HTMLButtonElement, InternalButtonProps>(
  ({ className, variant, size = 'md', children, disabled, tooltip, ...props }, ref) => {
    const button = (
      <motion.button
        ref={ref}
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-medium cursor-pointer transition-all duration-200 overflow-hidden whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20319D] dark:focus-visible:ring-[#6B8AFF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );

    if (tooltip) {
      return (
        <div className="relative group/tooltip inline-flex">
          {button}
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 dark:bg-slate-700 px-2.5 py-1 text-xs text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100 z-50">
            {tooltip}
          </span>
        </div>
      );
    }

    return button;
  }
);

ButtonBase.displayName = 'ButtonBase';

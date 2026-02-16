'use client';

import { motion } from 'framer-motion';
import type { SocialProvider } from '@/src/shared/types/auth';

interface SocialLoginGridProps {
  onProviderClick: (provider: SocialProvider) => void;
  disabled?: boolean;
  mode?: 'signin' | 'signup';
  variant?: 'light' | 'dark';
}

const SOCIAL_PROVIDERS: {
  id: SocialProvider;
  name: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'google',
    name: 'Google',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#F25022" d="M1 1h10v10H1z" />
        <path fill="#00A4EF" d="M13 1h10v10H13z" />
        <path fill="#7FBA00" d="M1 13h10v10H1z" />
        <path fill="#FFB900" d="M13 13h10v10H13z" />
      </svg>
    ),
  },
  {
    id: 'xero',
    name: 'Xero',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#13B5EA">
        <text x="2" y="18" fontFamily="Arial" fontSize="16" fontWeight="bold">xero</text>
      </svg>
    ),
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.493.125.104.172.06.354-.125.546l-.04.04c-.06.06-.115.113-.165.155-.48.395-1.063.84-1.752 1.336-.718.52-1.59 1.01-2.617 1.475-1.03.464-2.193.85-3.49 1.16-1.298.307-2.593.46-3.886.46-1.725 0-3.39-.2-4.994-.598-1.604-.4-3.055-.933-4.352-1.6-1.297-.668-2.345-1.372-3.144-2.11l-.065-.066c-.103-.104-.155-.175-.155-.215zm6.132-4.064c0-.88.243-1.682.73-2.403.487-.72 1.158-1.314 2.014-1.78.875-.48 1.846-.82 2.92-1.025 1.075-.204 2.312-.304 3.715-.304l1.22.025v-.62c0-.96-.15-1.682-.452-2.163-.3-.48-.91-.723-1.823-.723h-.13c-.573.012-1.054.167-1.442.468-.387.3-.617.682-.69 1.143l-.04.26c-.035.168-.12.277-.255.328-.136.05-.234.056-.294.01l-2.82-.34c-.203-.03-.33-.095-.384-.197-.054-.1-.054-.207 0-.318.35-1.225 1.05-2.15 2.1-2.775 1.05-.624 2.322-.936 3.818-.936 1.14 0 2.14.14 2.997.418.857.28 1.537.678 2.037 1.196.5.52.86 1.136 1.08 1.848.218.712.328 1.487.328 2.322v6.77c0 .28.113.42.34.42h1.18c.2 0 .3.092.3.277v2.144c0 .2-.1.3-.3.3H20.4c-.694 0-1.235-.2-1.62-.595-.386-.395-.58-.933-.58-1.613v-.122l-.012.052c-.163.267-.383.538-.66.81-.28.273-.61.52-.996.737-.385.22-.81.393-1.278.52-.466.128-.96.192-1.48.192-.842 0-1.58-.14-2.216-.422-.634-.283-1.16-.658-1.576-1.125-.416-.467-.728-1-.935-1.6-.207-.6-.31-1.22-.31-1.857zm3.882-.17c0 .685.2 1.26.597 1.73.396.467.946.7 1.648.7.4 0 .78-.07 1.14-.21.36-.14.682-.333.97-.58.286-.246.522-.54.703-.88.183-.34.28-.7.28-1.08v-1.16l-.94-.02c-1.33 0-2.354.19-3.072.575-.717.384-1.075.96-1.075 1.73l.75-.805z" />
      </svg>
    ),
  },
  {
    id: 'office365',
    name: 'Office 365',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#D83B01">
        <path d="M21.17 2.06L8.28 5.38v13.24l12.89 3.32V2.06zM2.83 5.38v13.24l5.45 1.76V3.62L2.83 5.38z" />
      </svg>
    ),
  },
  {
    id: 'freshbooks',
    name: 'FreshBooks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0075DD">
        <text x="0" y="16" fontFamily="Arial" fontSize="10" fontWeight="bold">FB</text>
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'X',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'intuit',
    name: 'Intuit',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#365EBF">
        <text x="0" y="16" fontFamily="Arial" fontSize="9" fontWeight="bold">intuit</text>
      </svg>
    ),
  },
];

export function SocialLoginGrid({ onProviderClick, disabled = false, mode = 'signin', variant = 'light' }: SocialLoginGridProps) {
  const isDark = variant === 'dark';

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${isDark ? 'border-white/20' : 'border-gray-200'}`} />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`px-4 ${isDark ? 'bg-[#20319D] text-white/70' : 'bg-white text-gray-500'}`}>
            {mode === 'signin' ? 'Sign In With' : 'Sign Up With'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {SOCIAL_PROVIDERS.map((provider, index) => (
          <motion.button
            key={provider.id}
            type="button"
            onClick={() => onProviderClick(provider.id)}
            disabled={disabled}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-center p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? 'bg-white border border-white/20 hover:bg-gray-100'
                : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
            title={provider.name}
          >
            {provider.icon}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

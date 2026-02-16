'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserType } from '@/src/shared/types/user';

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  userDisplayName: string;
  userBadge: string;
  userBadgeColor: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function getUserDisplayName(type: UserType): string {
  switch (type) {
    case 'new':
      return 'New User';
    case 'l1-verified':
      return 'L1 Verified User';
    case 'l2-verified':
      return 'L2 Verified User';
  }
}

function getUserBadge(type: UserType): string {
  switch (type) {
    case 'new':
      return 'Unverified';
    case 'l1-verified':
      return 'Level 1';
    case 'l2-verified':
      return 'Level 2';
  }
}

function getUserBadgeColor(type: UserType): string {
  switch (type) {
    case 'new':
      return 'bg-gray-100 text-gray-700';
    case 'l1-verified':
      return 'bg-blue-100 text-blue-700';
    case 'l2-verified':
      return 'bg-green-100 text-green-700';
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [userType, setUserTypeState] = useState<UserType>('new');

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const saved = localStorage.getItem('zilmoney-user-type');
    if (saved && ['new', 'l1-verified', 'l2-verified'].includes(saved)) {
      setUserTypeState(saved as UserType);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setUserType = (type: UserType) => {
    setUserTypeState(type);
    localStorage.setItem('zilmoney-user-type', type);
  };

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        userDisplayName: getUserDisplayName(userType),
        userBadge: getUserBadge(userType),
        userBadgeColor: getUserBadgeColor(userType),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

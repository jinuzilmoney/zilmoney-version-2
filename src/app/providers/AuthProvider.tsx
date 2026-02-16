"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type {
  AuthUser,
  SignUpData,
  SocialProvider,
} from "@/src/shared/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isAuthenticated: boolean;
  signIn: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  socialSignIn: (
    provider: SocialProvider,
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_STORAGE_KEY = "zilmoney-auth-user";
const AUTH_SESSION_KEY = "zilmoney-auth-session";
const REGISTERED_USERS_KEY = "zilmoney-registered-users";

const MOCK_USERS = [
  {
    id: "demo-user-1",
    email: "demo@zilmoney.com",
    password: "Demo123!",
    firstName: "Demo",
    lastName: "User",
    phone: "4087757720",
    countryCode: "+1",
    companyName: "Demo Company LLC",
    selectedFeatures: [],
    createdAt: new Date().toISOString(),
    provider: "email" as const,
  },
  {
    id: "test-user-1",
    email: "test@example.com",
    password: "Test123!",
    firstName: "Test",
    lastName: "Account",
    phone: "5551234567",
    countryCode: "+1",
    companyName: "Test Corporation",
    selectedFeatures: [],
    createdAt: new Date().toISOString(),
    provider: "email" as const,
  },
];

interface StoredUser extends AuthUser {
  password?: string;
}

function getRegisteredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users: StoredUser[]) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

function stripPassword({ password, ...rest }: StoredUser): AuthUser {
  void password;
  return rest;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  // Restore session on mount — must use useEffect (not lazy initializer)
  // to avoid hydration mismatch between server (no localStorage) and client
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(AUTH_STORAGE_KEY) ||
        sessionStorage.getItem(AUTH_SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    } catch {
      setStatus("unauthenticated");
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const signIn = useCallback(
    async (
      email: string,
      password: string,
      rememberMe = false,
    ): Promise<{ success: boolean; error?: string }> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check mock users
      const mockUser = MOCK_USERS.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      if (mockUser) {
        const authUser = stripPassword(mockUser);
        setUser(authUser);
        setStatus("authenticated");

        if (rememberMe) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
        } else {
          sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authUser));
        }
        return { success: true };
      }

      // Check registered users
      const registeredUsers = getRegisteredUsers();
      const registeredUser = registeredUsers.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      if (registeredUser) {
        const authUser = stripPassword(registeredUser);
        setUser(authUser);
        setStatus("authenticated");

        if (rememberMe) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
        } else {
          sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authUser));
        }
        return { success: true };
      }

      return { success: false, error: "Invalid email or password" };
    },
    [],
  );

  const signUp = useCallback(
    async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check for duplicate email
      const allUsers = [...MOCK_USERS, ...getRegisteredUsers()];
      if (
        allUsers.some((u) => u.email.toLowerCase() === data.email.toLowerCase())
      ) {
        return {
          success: false,
          error: "An account with this email already exists",
        };
      }

      const newUser: StoredUser = {
        id: `user-${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        countryCode: data.countryCode,
        companyName: data.companyName,
        selectedFeatures: [],
        createdAt: new Date().toISOString(),
        provider: "email",
        password: data.password,
      };

      // Save to registered users
      const users = getRegisteredUsers();
      users.push(newUser);
      saveRegisteredUsers(users);

      // Auto-login
      const authUser = stripPassword(newUser);
      setUser(authUser);
      setStatus("authenticated");
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));

      return { success: true };
    },
    [],
  );

  const socialSignIn = useCallback(
    async (
      provider: SocialProvider,
    ): Promise<{ success: boolean; error?: string }> => {
      // Simulate OAuth delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const authUser: AuthUser = {
        id: `social-${Date.now()}`,
        email: `user@${provider}.example.com`,
        firstName: provider.charAt(0).toUpperCase() + provider.slice(1),
        lastName: "User",
        phone: "",
        countryCode: "+1",
        companyName: "",
        selectedFeatures: [],
        createdAt: new Date().toISOString(),
        provider,
      };

      setUser(authUser);
      setStatus("authenticated");
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));

      return { success: true };
    },
    [],
  );

  const signOut = useCallback(() => {
    setUser(null);
    setStatus("unauthenticated");
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated: status === "authenticated",
        signIn,
        signUp,
        signOut,
        socialSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

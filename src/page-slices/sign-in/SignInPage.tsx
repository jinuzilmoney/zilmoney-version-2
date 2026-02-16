"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useAuth } from "@/src/app/providers/AuthProvider";
import { PasswordInput, EmailInput } from "@/src/shared/ui/input";
import { ButtonBase } from "@/src/shared/ui/button/Button";
import { SocialLoginGrid, AuthBrandPanel } from "@/src/features/auth";
import { cn } from "@/src/shared/lib/utils";
import type { SocialProvider } from "@/src/shared/types/auth";

export function SignInPage() {
  const router = useRouter();
  const { signIn, socialSignIn, status } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn(email, password, rememberMe);
      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "Sign in failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: SocialProvider) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await socialSignIn(provider);
      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "Social sign in failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen flex relative">
      {/* Left Column - Brand Panel */}
      <div className="hidden lg:block lg:w-[40%]">
        <AuthBrandPanel variant="signin" />
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-[60%] p-6 lg:p-12 flex flex-col relative">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Zil Money"
                width={150}
                height={40}
                priority
              />
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <EmailInput
                id="email"
                placeholder="email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#20319D] focus:ring-[#20319D]"
                />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#20319D] hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <ButtonBase
              variant="primary"
              type="submit"
              size="lg"
              disabled={isLoading || !email || !password}
              className={cn(
                "w-full font-bold",
                isLoading && "opacity-70 cursor-not-allowed",
              )}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </ButtonBase>
          </motion.form>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <SocialLoginGrid
              onProviderClick={handleSocialSignIn}
              disabled={isLoading}
              mode="signin"
            />
          </motion.div>

          {/* Sign Up Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-center text-gray-600"
          >
            Don&apos;t have an account yet?{" "}
            <Link
              href="/sign-up"
              className="text-[#20319D] hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </motion.p>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-auto pt-8 text-center text-sm text-gray-500"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span>POWERED BY</span>
              <span className="font-semibold text-[#20319D]">Zil Money</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Phone size={14} />
              <span>(408) 775-7720</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

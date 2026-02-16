"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Check } from "lucide-react";
import { useAuth } from "@/src/app/providers/AuthProvider";
import { PasswordInput, TextInput, EmailInput } from "@/src/shared/ui/input";
import { PhoneInput } from "@/src/shared/ui/phone-input";
import { ButtonBase } from "@/src/shared/ui/button/Button";
import { SocialLoginGrid, ESignatureModal } from "@/src/features/auth";
import { cn } from "@/src/shared/lib/utils";
import type { SocialProvider, SignUpData } from "@/src/shared/types/auth";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  terms?: string;
}

export function SignUpPage() {
  const router = useRouter();
  const { signUp, socialSignIn, status } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+1",
    couponCode: "",
  });

  const [agreements, setAgreements] = useState({
    eSignature: false,
    terms: false,
    ccpa: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showESignatureModal, setShowESignatureModal] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreements.eSignature || !agreements.terms || !agreements.ccpa) {
      newErrors.terms = "Please accept all required agreements";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const signUpData: SignUpData = {
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ""),
        countryCode: formData.countryCode,
        password: formData.password,
        companyName: "",
        couponCode: formData.couponCode || undefined,
      };

      const result = await signUp(signUpData);
      if (result.success) {
        router.push("/");
      } else {
        setSubmitError(result.error || "Sign up failed");
      }
    } catch {
      setSubmitError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: SocialProvider) => {
    setSubmitError(null);
    setIsLoading(true);

    try {
      const result = await socialSignIn(provider);
      if (result.success) {
        router.push("/");
      } else {
        setSubmitError(result.error || "Social sign up failed");
      }
    } catch {
      setSubmitError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "authenticated") {
    return null;
  }

  const TRIAL_BENEFITS = [
    "Trial Period Valid for 15 Days",
    "No credit card required",
    "Full features included",
  ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Column - Brand Panel */}
      <div className="hidden lg:block lg:w-[45%] bg-[#20319D]">
        <div className="h-full flex flex-col p-8 overflow-y-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Zil Money"
                width={140}
                height={38}
                className="brightness-0 invert"
                priority
              />
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5"
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Register now for
            </h1>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#3BF493]">
              Free
            </h2>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2 mb-6"
          >
            {TRIAL_BENEFITS.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#3BF493]/20 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-[#3BF493]" />
                </div>
                <p className="text-sm text-white/90">{benefit}</p>
              </div>
            ))}
          </motion.div>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-5"
          >
            <SocialLoginGrid
              onProviderClick={handleSocialSignUp}
              disabled={isLoading}
              mode="signup"
              variant="dark"
            />
          </motion.div>

          {/* Sign In Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-white/90 mb-6"
          >
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#3BF493] hover:underline font-semibold"
            >
              Login
            </Link>
          </motion.p>

          {/* Awards Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-auto pt-6 border-t border-white/20"
          >
            <p className="text-center text-sm text-white/60 mb-4">
              Awards or Affiliation
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-sm font-semibold text-white">
                  Rising Star
                </div>
                <div className="text-xs text-white/60">2017 Award</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-white">Great UX</div>
                <div className="text-xs text-white/60">2017 Award</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-white">
                  Inc. 5000
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-[55%] bg-white p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Zil Money"
                width={130}
                height={35}
                priority
              />
            </Link>
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Sign Up
          </motion.h2>

          {/* Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              {submitError}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <TextInput
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={errors.name}
              />
            </div>

            {/* Work Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Work Email
              </label>
              <EmailInput
                id="email"
                placeholder="email@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
              />
            </div>

            {/* Password */}
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Create password"
              value={formData.password}
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
              error={errors.password}
              showRequirements
            />

            {/* Confirm Password */}
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(value) =>
                setFormData({ ...formData, confirmPassword: value })
              }
              error={errors.confirmPassword}
            />

            {/* Phone */}
            <PhoneInput
              id="phone"
              label="Phone"
              value={formData.phone}
              countryCode={formData.countryCode}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              onCountryCodeChange={(code) =>
                setFormData({ ...formData, countryCode: code })
              }
              error={errors.phone}
            />

            {/* Coupon Code */}
            <div className="space-y-1.5">
              <label
                htmlFor="coupon"
                className="block text-sm font-medium text-gray-700"
              >
                Coupon Code
              </label>
              <TextInput
                id="coupon"
                placeholder="Optional"
                value={formData.couponCode}
                onChange={(e) =>
                  setFormData({ ...formData, couponCode: e.target.value })
                }
              />
            </div>

            {/* Agreements */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.eSignature}
                  onChange={(e) =>
                    setAgreements({
                      ...agreements,
                      eSignature: e.target.checked,
                    })
                  }
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#20319D] focus:ring-[#20319D]"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I agree to{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowESignatureModal(true);
                    }}
                    className="text-[#20319D] hover:underline font-medium"
                  >
                    Zil Money&apos;s E-Signature Agreement
                  </button>{" "}
                  and consent to receive disclosures electronically.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.terms}
                  onChange={(e) =>
                    setAgreements({ ...agreements, terms: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#20319D] focus:ring-[#20319D]"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I accept{" "}
                  <Link
                    href="#"
                    className="text-[#20319D] hover:underline font-medium"
                  >
                    Terms
                  </Link>
                  ,{" "}
                  <Link
                    href="#"
                    className="text-[#20319D] hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link
                    href="#"
                    className="text-[#20319D] hover:underline font-medium"
                  >
                    USA PATRIOT Act
                  </Link>{" "}
                  compliance, and{" "}
                  <Link
                    href="#"
                    className="text-[#20319D] hover:underline font-medium"
                  >
                    Communication Policy
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.ccpa}
                  onChange={(e) =>
                    setAgreements({ ...agreements, ccpa: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#20319D] focus:ring-[#20319D]"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I acknowledge my{" "}
                  <Link
                    href="#"
                    className="text-[#20319D] hover:underline font-medium"
                  >
                    CCPA
                  </Link>{" "}
                  rights to access, delete, and opt-out of data sales.
                </span>
              </label>

              {errors.terms && (
                <p className="text-xs text-red-500">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <ButtonBase
              variant="neon"
              type="submit"
              size="lg"
              disabled={isLoading}
              className={cn(
                "w-full font-bold text-[#20319D]",
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
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </ButtonBase>

            {/* Sign In Link (mobile) */}
            <p className="text-center text-gray-600 mt-4 lg:hidden">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-[#20319D] hover:underline font-semibold"
              >
                Login
              </Link>
            </p>
          </motion.form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2"
          >
            <span>POWERED BY</span>
            <span className="font-semibold text-[#20319D]">Zil Money</span>
            <span>|</span>
            <Phone size={14} />
            <span>(408) 775-7720</span>
          </motion.div>
        </div>
      </div>

      {/* E-Signature Agreement Modal */}
      <ESignatureModal
        isOpen={showESignatureModal}
        onClose={() => setShowESignatureModal(false)}
        onAgree={() => setAgreements({ ...agreements, eSignature: true })}
      />
    </div>
  );
}

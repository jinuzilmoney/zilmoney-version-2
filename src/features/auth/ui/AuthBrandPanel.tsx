"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Shield, CreditCard, Globe, FileText } from "lucide-react";

interface AuthBrandPanelProps {
  variant?: "signin" | "signup";
}

const FEATURES = {
  signin: [
    { icon: CreditCard, text: "Send & receive payments instantly" },
    { icon: Globe, text: "International wire transfers" },
    { icon: FileText, text: "Invoice management & tracking" },
    { icon: Shield, text: "Bank-level security" },
  ],
  signup: [
    { icon: Check, text: "Trial Period Valid for 15 Days" },
    { icon: Check, text: "No credit card required" },
    { icon: Check, text: "Full features included" },
    { icon: Check, text: "Cancel anytime" },
  ],
};

const HEADLINES = {
  signin: {
    title: "Welcome Back",
    subtitle: "All-in-One Payments, Tailored for Your Business",
  },
  signup: {
    title: "Start Your Free Trial",
    subtitle: "Join over 1 million businesses using Zilmoney",
  },
};

export function AuthBrandPanel({ variant = "signin" }: AuthBrandPanelProps) {
  const features = FEATURES[variant];
  const headline = HEADLINES[variant];

  return (
    <div className="h-full bg-[#20319D]">
      <div className="h-full flex flex-col justify-center p-8 lg:p-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="Zil Money"
            width={150}
            height={40}
            className="brightness-0 invert"
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            {headline.title}
          </h2>
          <p className="text-lg text-white/80">{headline.subtitle}</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#3BF493]/20 flex items-center justify-center flex-shrink-0">
                <feature.icon size={16} className="text-[#3BF493]" />
              </div>
              <span className="text-white/90">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-auto pt-8"
        >
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Shield size={16} />
            <span>SOC 2 Compliant</span>
            <span className="mx-2">|</span>
            <span>PCI DSS</span>
            <span className="mx-2">|</span>
            <span>256-bit Encryption</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

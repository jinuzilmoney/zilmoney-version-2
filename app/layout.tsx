import type { Metadata } from "next";
import { Funnel_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider, ToastProvider } from "@/src/app/providers";
import { FloatingThemeToggle } from "@/src/shared/ui/theme-toggle";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-peridot",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zilmoney",
    template: "%s | Zilmoney",
  },
  description: "All-In-One B2B Payment Platform That Handles All Your Business Transactions with Ease and in Less Time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${funnelDisplay.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
          <FloatingThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}

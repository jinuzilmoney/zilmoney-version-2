"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  Check,
  User,
  Shield,
  ShieldCheck,
  Settings,
  LogOut,
  HelpCircle,
  MessageSquare,
  Monitor,
  BookOpen,
  Video,
  Lightbulb,
  AlertCircle,
  Heart,
  Calendar,
  MessageCircle,
  Phone,
  Building2,
  Plus,
  Mail,
  DollarSign,
  Sun,
  Moon,
  Zap,
  X,
} from "lucide-react";
import { cn } from "@/src/shared/lib/utils";
import { useUser } from "@/src/app/providers/UserProvider";
import { useCompany } from "@/src/app/providers/CompanyProvider";
import { useAuth } from "@/src/app/providers/AuthProvider";
import { useTheme } from "@/src/app/providers/ThemeProvider";
import { useRouter } from "next/navigation";
import type { UserType } from "@/src/shared/types/user";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { userType, setUserType, userBadge, userBadgeColor } = useUser();
  const { currentCompany, companies, switchCompany } = useCompany();
  const { user, signOut } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const helpMenuRef = useRef<HTMLDivElement>(null);
  const companyMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (
        helpMenuRef.current &&
        !helpMenuRef.current.contains(event.target as Node)
      ) {
        setShowHelpMenu(false);
      }
      if (
        companyMenuRef.current &&
        !companyMenuRef.current.contains(event.target as Node)
      ) {
        setShowCompanyMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userTypeOptions: Array<{
    type: UserType;
    label: string;
    badge: string;
    icon: React.ElementType;
    description: string;
  }> = [
    {
      type: "new",
      label: "New User",
      badge: "Unverified",
      icon: User,
      description: "Basic access",
    },
    {
      type: "l1-verified",
      label: "L1 Verified User",
      badge: "Level 1",
      icon: Shield,
      description: "Standard verification",
    },
    {
      type: "l2-verified",
      label: "L2 Verified User",
      badge: "Level 2",
      icon: ShieldCheck,
      description: "Full access",
    },
  ];

  const userInitial = user?.firstName?.charAt(0)?.toUpperCase() || "U";
  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userEmail = user?.email || "";

  return (
    <header className="sticky top-0 z-30 bg-[#2E0056]/5 dark:bg-slate-800/50">
      <div className="px-4 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            {/* Mobile menu button */}
            <motion.button
              onClick={onMenuClick}
              className="p-2.5 hover:bg-white/20 dark:hover:bg-slate-700/50 rounded-xl transition-all lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={22} className="text-gray-700 dark:text-slate-300" />
            </motion.button>

            {/* Mobile Search Button */}
            <motion.button
              onClick={() => setShowMobileSearch(true)}
              className="p-2.5 hover:bg-white/20 dark:hover:bg-slate-700/50 rounded-xl transition-all md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} className="text-gray-600 dark:text-slate-400" />
            </motion.button>

            {/* Desktop Search */}
            <div className="relative hidden md:block max-w-md w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none z-10"
                size={18}
              />
              <input
                type="text"
                placeholder="Search transactions, invoices..."
                className="pl-10 pr-4 w-full h-11 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#20319D] focus:bg-white dark:focus:bg-slate-700 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Trial Banner - Desktop */}
            <motion.button
              onClick={() => router.push("/pricing")}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-500/20 dark:border-amber-500/30 rounded-full hover:from-amber-500/15 hover:to-orange-500/15 dark:hover:from-amber-500/25 dark:hover:to-orange-500/25 transition-all group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-amber-500 dark:text-amber-400" />
                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                  Trial Ends in 30 Days
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                Upgrade Now
              </span>
            </motion.button>

            {/* Trial Banner - Mobile Compact */}
            <motion.button
              onClick={() => router.push("/pricing")}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-500/20 dark:border-amber-500/30 rounded-full"
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={14} className="text-amber-500 dark:text-amber-400" />
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                30d
              </span>
            </motion.button>

            {/* Notifications */}
            <motion.button
              onClick={() => router.push("/notifications")}
              className="relative p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3BF493] rounded-full" />
            </motion.button>

            {/* Theme Toggle - Hidden on mobile */}
            <motion.button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="hidden md:flex relative p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            >
              {resolvedTheme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </motion.button>

            {/* Help Menu */}
            <div className="relative hidden md:block" ref={helpMenuRef}>
              <motion.button
                onClick={() => setShowHelpMenu(!showHelpMenu)}
                className={cn(
                  "relative p-2 rounded-lg transition-all",
                  showHelpMenu
                    ? "bg-[#2E0056]/10 dark:bg-[#7924FF]/20 text-[#2E0056] dark:text-[#a855f7]"
                    : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HelpCircle size={20} />
              </motion.button>

              <AnimatePresence>
                {showHelpMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-x-4 top-16 md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 md:w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
                      <div className="flex items-center gap-2">
                        <HelpCircle
                          size={18}
                          className="text-[#20319D] dark:text-[#6B8AFF]"
                        />
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                          Help & Support
                        </h3>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <MessageSquare
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Live Chat
                        </span>
                      </button>
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <Monitor
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Live Screen Sharing
                        </span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-slate-700 my-1" />
                      <button
                        onClick={() => {
                          router.push("/help");
                          setShowHelpMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <BookOpen
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Help / Tutorial
                        </span>
                      </button>
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <Video
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Video Tutorial
                        </span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-slate-700 my-1" />
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <Lightbulb
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Submit an Idea
                        </span>
                      </button>
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <AlertCircle
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Report an Issue
                        </span>
                      </button>
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <Heart
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Our Compliance
                        </span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-slate-700 my-1" />
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <Calendar
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Book a Demo
                        </span>
                      </button>
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <MessageCircle
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Text Us
                        </span>
                      </button>
                      <button
                        onClick={() => setShowHelpMenu(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <Phone
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300 font-medium">
                          (408) 775-7720
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* My Credits - Mobile Compact */}
            <motion.button
              onClick={() => router.push("/my-credits")}
              className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 bg-[#20319D] rounded-lg cursor-pointer active:bg-[#1a2780] transition-all min-h-[44px] touch-manipulation"
              whileTap={{ scale: 0.98 }}
            >
              <DollarSign size={14} className="text-[#3BF493]" />
              <div className="text-xs font-bold text-white">
                {userType === "new" ? "$0" : "$97K"}
              </div>
            </motion.button>

            {/* My Credits - Desktop */}
            <motion.button
              onClick={() => router.push("/my-credits")}
              className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#20319D] rounded-lg cursor-pointer hover:bg-[#1a2780] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                <DollarSign size={14} className="text-[#3BF493]" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-white/80">My Credits</div>
                <div className="text-sm font-bold text-white">
                  {userType === "new" ? "$0.00" : "$97,309.80"}
                </div>
              </div>
            </motion.button>

            {/* Company Selector */}
            <div className="relative" ref={companyMenuRef}>
              {/* Mobile version */}
              <motion.button
                onClick={() => setShowCompanyMenu(!showCompanyMenu)}
                className="md:hidden flex items-center gap-1.5 p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-100 dark:active:bg-slate-700 transition-all border border-gray-200 dark:border-slate-700 min-h-[44px] min-w-[44px] touch-manipulation"
                whileTap={{ scale: 0.95 }}
                aria-label="Switch company"
              >
                <Building2
                  size={18}
                  className="text-gray-600 dark:text-slate-400"
                />
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-gray-400 dark:text-slate-500 transition-transform",
                    showCompanyMenu && "rotate-180",
                  )}
                />
              </motion.button>

              {/* Desktop version */}
              <motion.div
                onClick={() => setShowCompanyMenu(!showCompanyMenu)}
                className="hidden md:flex items-center gap-2.5 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-all border border-gray-200 dark:border-slate-700"
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                    {currentCompany?.name || "Select Company"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">
                    {currentCompany?.description || "Company Account"}
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    "text-gray-400 dark:text-slate-500 transition-transform",
                    showCompanyMenu && "rotate-180",
                  )}
                />
              </motion.div>

              <AnimatePresence>
                {showCompanyMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-x-4 top-16 md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 md:w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
                      <div className="flex items-center gap-2">
                        <Building2
                          size={18}
                          className="text-[#20319D] dark:text-[#6B8AFF]"
                        />
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                          Switch Company
                        </h3>
                      </div>
                      <p className="md:hidden text-xs text-gray-500 dark:text-slate-400 mt-1">
                        Current: {currentCompany?.name || "None selected"}
                      </p>
                    </div>

                    <div className="p-2 max-h-64 overflow-y-auto">
                      {companies.map((company) => {
                        const isActive = company.id === currentCompany?.id;
                        return (
                          <motion.button
                            key={company.id}
                            onClick={() => {
                              switchCompany(company.id);
                              setShowCompanyMenu(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg transition-all text-left min-h-[48px] md:min-h-0 touch-manipulation",
                              isActive
                                ? "bg-[#20319D]/10 dark:bg-[#6B8AFF]/10 border border-[#20319D]/20 dark:border-[#6B8AFF]/20"
                                : "hover:bg-gray-50 dark:hover:bg-slate-700 active:bg-gray-100 dark:active:bg-slate-600 border border-transparent",
                            )}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div
                              className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                isActive
                                  ? "bg-[#20319D]"
                                  : "bg-gray-100 dark:bg-slate-700",
                              )}
                            >
                              <Building2
                                size={16}
                                className={
                                  isActive
                                    ? "text-[#3BF493]"
                                    : "text-gray-600 dark:text-slate-400"
                                }
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">
                                {company.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-slate-400">
                                {company.description || "Company Account"}
                              </div>
                            </div>
                            {isActive && (
                              <Check
                                size={16}
                                className="text-[#20319D] flex-shrink-0"
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="border-t border-gray-200 dark:border-slate-700" />
                    <div className="p-2">
                      <button
                        onClick={() => {
                          router.push("/add-company");
                          setShowCompanyMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 active:bg-gray-100 dark:active:bg-slate-600 transition-all text-left min-h-[48px] md:min-h-0 touch-manipulation"
                      >
                        <Plus
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300 font-medium">
                          Add Company
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          router.push("/request-access");
                          setShowCompanyMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 active:bg-gray-100 dark:active:bg-slate-600 transition-all text-left min-h-[48px] md:min-h-0 touch-manipulation"
                      >
                        <Mail
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300 font-medium">
                          Request Company Access
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          router.push("/company-management");
                          setShowCompanyMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg hover:bg-[#20319D]/5 dark:hover:bg-[#6B8AFF]/10 active:bg-[#20319D]/10 dark:active:bg-[#6B8AFF]/20 transition-all text-left min-h-[48px] md:min-h-0 touch-manipulation"
                      >
                        <Settings
                          size={16}
                          className="text-[#20319D] dark:text-[#6B8AFF]"
                        />
                        <span className="text-sm text-[#20319D] dark:text-[#6B8AFF] font-medium">
                          Company Management
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:block h-8 w-px bg-gray-200 dark:bg-slate-700" />

            {/* User Profile */}
            <div className="flex items-center gap-3 relative" ref={menuRef}>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                  Hi, {user?.firstName || "User"}
                </div>
                <span className="text-xs mt-0.5 px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                  Admin
                </span>
              </div>
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full cursor-pointer border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-colors flex items-center justify-center"
                  style={{ backgroundColor: "#3BF493" }}
                >
                  <span className="text-white font-semibold text-sm">
                    {userInitial}
                  </span>
                </div>
              </motion.div>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-x-4 top-16 md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 md:w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
                  >
                    {/* Current User Info */}
                    <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-12 w-12 rounded-full border-2 border-white dark:border-slate-700 flex items-center justify-center"
                          style={{ backgroundColor: "#3BF493" }}
                        >
                          <span className="text-white font-semibold text-lg">
                            {userInitial}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                            {userName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">
                            {userEmail}
                          </div>
                          <span
                            className={cn(
                              "text-xs mt-1 px-2 py-0.5 rounded-full inline-block",
                              userBadgeColor,
                            )}
                          >
                            {userBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* User Type Selector */}
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                        Switch User Type (Prototype)
                      </div>
                      {userTypeOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = userType === option.type;
                        return (
                          <motion.button
                            key={option.type}
                            onClick={() => {
                              setUserType(option.type);
                              setShowUserMenu(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left",
                              isActive
                                ? "bg-[#20319D]/10 dark:bg-[#6B8AFF]/10 border border-[#20319D]/20 dark:border-[#6B8AFF]/20"
                                : "hover:bg-gray-50 dark:hover:bg-slate-700 border border-transparent",
                            )}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div
                              className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                isActive
                                  ? "bg-[#20319D] text-white"
                                  : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400",
                              )}
                            >
                              <Icon size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                                {option.label}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-slate-400">
                                {option.description}
                              </div>
                            </div>
                            {isActive && (
                              <Check size={16} className="text-[#20319D]" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="border-t border-gray-200 dark:border-slate-700" />

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={() => {
                          router.push("/profile");
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <User
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          My Profile
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          router.push("/company-management");
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <Building2
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Company Management
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          router.push("/settings");
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <Settings
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Settings
                        </span>
                      </button>

                      {/* Mobile-only: Help & Support */}
                      <button
                        onClick={() => {
                          router.push("/help");
                          setShowUserMenu(false);
                        }}
                        className="md:hidden w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <HelpCircle
                          size={16}
                          className="text-gray-600 dark:text-slate-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-slate-300">
                          Help & Support
                        </span>
                      </button>

                      {/* Mobile-only: Dark Mode Toggle */}
                      <button
                        onClick={() => {
                          setTheme(resolvedTheme === "dark" ? "light" : "dark");
                          setShowUserMenu(false);
                        }}
                        className="md:hidden w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-left"
                      >
                        <div className="flex items-center gap-3">
                          {resolvedTheme === "dark" ? (
                            <Sun
                              size={16}
                              className="text-gray-600 dark:text-slate-400"
                            />
                          ) : (
                            <Moon
                              size={16}
                              className="text-gray-600 dark:text-slate-400"
                            />
                          )}
                          <span className="text-sm text-gray-700 dark:text-slate-300">
                            {resolvedTheme === "dark"
                              ? "Light Mode"
                              : "Dark Mode"}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "w-9 h-5 rounded-full relative transition-colors",
                            resolvedTheme === "dark"
                              ? "bg-[#20319D]"
                              : "bg-gray-300 dark:bg-slate-600",
                          )}
                        >
                          <div
                            className={cn(
                              "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
                              resolvedTheme === "dark"
                                ? "translate-x-4"
                                : "translate-x-0.5",
                            )}
                          />
                        </div>
                      </button>

                      <div className="md:hidden border-t border-gray-200 dark:border-slate-700 my-1" />

                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                          router.push("/sign-in");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left"
                      >
                        <LogOut
                          size={16}
                          className="text-red-600 dark:text-red-400"
                        />
                        <span className="text-sm text-red-600 dark:text-red-400">
                          Logout
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white dark:bg-slate-900 md:hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none z-10"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search transactions, invoices..."
                  className="pl-10 pr-4 w-full h-11 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#20319D] focus:bg-white dark:focus:bg-slate-700"
                  autoFocus
                />
              </div>
              <motion.button
                onClick={() => setShowMobileSearch(false)}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} className="text-gray-600 dark:text-slate-400" />
              </motion.button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Recent searches
              </p>
              <div className="mt-3 space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-left">
                  <Search
                    size={16}
                    className="text-gray-400 dark:text-slate-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-slate-300">
                    Invoice #1234
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-left">
                  <Search
                    size={16}
                    className="text-gray-400 dark:text-slate-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-slate-300">
                    ABC Suppliers
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

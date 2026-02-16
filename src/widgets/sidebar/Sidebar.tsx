"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/shared/lib/utils";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/src/app/providers/UserProvider";
import {
  LayoutDashboard,
  ShieldCheck,
  Send,
  Users,
  FileText,
  UserCheck,
  DollarSign,
  Receipt,
  Link2,
  CreditCard,
  Wallet,
  Building2,
  Cloud,
  Package,
  Globe,
  Settings,
  MoreHorizontal,
  ChevronRight,
  X,
  Banknote,
  FileBox,
  Mail,
  Layers3,
  ChevronLeft,
  ChevronDown,
  Database,
  Star,
  Home,
  Bell,
} from "lucide-react";

interface MenuItem {
  name: string;
  icon?: React.ElementType;
  href?: string;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
  href?: string;
}

const menuItems: MenuSection[] = [
  {
    category: "MAIN",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { name: "Activities", icon: Bell, href: "/activities" },
      { name: "Verification Centre", icon: ShieldCheck, href: "/verification" },
    ],
  },
  {
    category: "PAYABLES",
    href: "/payables",
    items: [
      { name: "Send Payment", icon: Send, href: "/send-payment" },
      { name: "Bulk Payment Center", icon: CreditCard, href: "/bulk-payment" },
      { name: "Vendors", icon: Users, href: "/vendors" },
      { name: "Bills", icon: FileText, href: "/bills" },
      { name: "Bill Inbox", icon: Mail, href: "/bill-inbox" },
      { name: "Employees", icon: UserCheck, href: "/employees" },
      { name: "Payroll by Credit Card", icon: DollarSign, href: "/payroll" },
      { name: "Payments Out", icon: Send, href: "/payments-out" },
    ],
  },
  {
    category: "RECEIVABLES",
    href: "/receivables",
    items: [
      { name: "Receive Payment", icon: Receipt, href: "/receive-payment" },
      { name: "Customers", icon: Users, href: "/customers" },
      { name: "Invoice", icon: FileText, href: "/invoices" },
      { name: "Check Draft", icon: Banknote, href: "/check-draft" },
      { name: "Payment Link", icon: Link2, href: "/payment-link" },
      { name: "Payments In", icon: Receipt, href: "/payments-in" },
    ],
  },
  {
    category: "BUSINESS TOOLS",
    href: "/business-tools",
    items: [
      { name: "Cash Expense", icon: Wallet, href: "/cash-expense" },
      { name: "Deposit Slip", icon: FileBox, href: "/deposit-slip" },
      { name: "Mail Document", icon: Mail, href: "/mail-document" },
      { name: "More", icon: MoreHorizontal, href: "/more-tools" },
    ],
  },
  {
    category: "ACCOUNTS",
    href: "/accounts",
    items: [
      { name: "My Credits", icon: DollarSign, href: "/my-credits" },
      { name: "Bank Data", icon: Database, href: "/bank-data" },
      { name: "Bank Accounts", icon: Building2, href: "/bank-accounts" },
      { name: "My Cards", icon: CreditCard, href: "/my-cards" },
      { name: "Wallets", icon: Wallet, href: "/wallets" },
      { name: "Cloud Bank", icon: Cloud, href: "/cloud-bank" },
    ],
  },
  {
    category: "SERVICES",
    href: "/services",
    items: [
      { name: "App Integrations", icon: Layers3, href: "/integrations" },
      { name: "Issue Visa Card", icon: CreditCard, href: "/cards" },
      {
        name: "International Payment",
        icon: Globe,
        href: "/international-payment",
      },
      { name: "Marketplace", icon: Package, href: "/marketplace" },
      { name: "User Management", icon: Users, href: "/user-management" },
    ],
  },
  {
    category: "SETTINGS",
    href: "/settings",
    items: [
      { name: "App Settings", icon: Settings, href: "/settings/application" },
      { name: "Support", icon: Mail, href: "/support" },
      { name: "More", icon: MoreHorizontal, href: "/more" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed?: boolean;
  onCollapse?: () => void;
}

export const Sidebar = ({
  isOpen,
  onToggle,
  isCollapsed = false,
  onCollapse,
}: SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(["MAIN"]);
  const [favorites, setFavorites] = useState<string[]>(["Dashboard"]);
  const [homePage, setHomePage] = useState<string>("/dashboard");
  const router = useRouter();
  const pathname = usePathname();
  const { userType } = useUser();

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const savedHomePage = localStorage.getItem("homePage");
    if (savedHomePage) {
      setHomePage(savedHomePage);
    }
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("sidebarFavorites");
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (!parsed.includes("Dashboard")) {
          parsed.unshift("Dashboard");
        }
        if (
          userType !== "l2-verified" &&
          !parsed.includes("Verification Centre")
        ) {
          parsed.splice(1, 0, "Verification Centre");
        }
        setFavorites(parsed);
      } catch {
        // ignore
      }
    } else {
      const defaultFavorites = ["Dashboard"];
      if (userType !== "l2-verified") {
        defaultFavorites.push("Verification Centre");
      }
      setFavorites(defaultFavorites);
    }
  }, [userType]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sync favorites to localStorage and clean up based on userType
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (
      userType === "l2-verified" &&
      favorites.includes("Verification Centre")
    ) {
      const cleanedFavorites = favorites.filter(
        (name) => name !== "Verification Centre",
      );
      setFavorites(cleanedFavorites);
      localStorage.setItem(
        "sidebarFavorites",
        JSON.stringify(cleanedFavorites),
      );
    } else {
      localStorage.setItem("sidebarFavorites", JSON.stringify(favorites));
    }
  }, [favorites, userType]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSetHomePage = (href: string) => {
    setHomePage(href);
    localStorage.setItem("homePage", href);
  };

  const getAllMenuItems = () => {
    const allItems: MenuItem[] = [];
    menuItems.forEach((section) => {
      section.items.forEach((item) => {
        allItems.push(item);
      });
    });
    return allItems;
  };

  const toggleFavorite = (itemName: string) => {
    if (itemName === "Dashboard") return;
    setFavorites((prev) => {
      if (prev.includes(itemName)) {
        return prev.filter((name) => name !== itemName);
      }
      return [...prev, itemName];
    });
  };

  const isFavorited = (itemName: string) => favorites.includes(itemName);

  const filteredMenuItems = menuItems.map((section) => {
    if (section.category === "MAIN") {
      const allItems = getAllMenuItems();
      const homePageItem = allItems.find((item) => item.href === homePage);

      let mainItems = favorites
        .map((favName) => allItems.find((item) => item.name === favName))
        .filter((item): item is MenuItem => item !== undefined);

      if (
        homePageItem &&
        !mainItems.some((item) => item.name === homePageItem.name)
      ) {
        mainItems.push(homePageItem);
      }

      mainItems = mainItems
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.name === item.name),
        )
        .filter((item) => {
          if (item.name === "Verification Centre" && userType === "l2-verified")
            return false;
          return true;
        });

      return { ...section, items: mainItems };
    }
    return section;
  });

  const findSectionForPath = (path: string) => {
    for (const section of menuItems) {
      if (section.href === path) return section.category;
      if (section.items.some((item) => item.href === path))
        return section.category;
    }
    return null;
  };

  // Auto-expand the section matching the current pathname
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const sectionForPath = findSectionForPath(pathname);
    if (sectionForPath) {
      setExpandedSections((prev) => {
        const newSections = ["MAIN"];
        if (sectionForPath !== "MAIN" && !prev.includes(sectionForPath)) {
          newSections.push(sectionForPath);
        } else if (prev.includes(sectionForPath)) {
          newSections.push(sectionForPath);
        }
        return newSections;
      });
    }
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const toggleSection = (category: string) => {
    if (category === "MAIN") return;
    setExpandedSections((prev) => {
      if (prev.includes(category)) return ["MAIN"];
      return ["MAIN", category];
    });
  };

  const handleCategoryClick = (section: MenuSection) => {
    if (section.href) {
      router.push(section.href);
      if (isOpen) onToggle();
    }
  };

  const isSectionExpanded = (category: string) =>
    expandedSections.includes(category);

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.href) {
      router.push(item.href);
      if (isOpen) onToggle();
    }
  };

  const isActive = (item: MenuItem) => {
    if (!item.href) return false;
    return pathname === item.href;
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed lg:hidden inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col h-full shadow-xl pl-[env(safe-area-inset-left)]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.2, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100 || info.velocity.x < -500) {
                onToggle();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation menu"
          >
            <div className="p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <button onClick={() => router.push("/")}>
                  <div className="flex items-center justify-start relative w-[100px] h-[32px] sm:w-[120px] sm:h-[40px]">
                    <Image
                      src="/logo.png"
                      alt="Zil Money Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
                <button
                  onClick={onToggle}
                  className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                  aria-label="Close navigation menu"
                >
                  <X size={22} className="text-gray-600 dark:text-slate-400" />
                </button>
              </div>
            </div>

            {/* Quick Actions - Mobile Only */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    router.push("/send-payment");
                    onToggle();
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-3 bg-[#20319D] text-white rounded-xl font-semibold text-sm min-h-[48px] touch-manipulation active:scale-95 transition-transform"
                >
                  <Send size={18} />
                  <span>Send</span>
                </button>
                <button
                  onClick={() => {
                    router.push("/receive-payment");
                    onToggle();
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-3 bg-[#3BF493] text-black rounded-xl font-semibold text-sm min-h-[48px] touch-manipulation active:scale-95 transition-transform"
                >
                  <Receipt size={18} />
                  <span>Receive</span>
                </button>
              </div>
            </div>

            <nav
              className="flex-1 overflow-y-auto py-4 px-3"
              aria-label="Main navigation"
            >
              {filteredMenuItems.map((section, sectionIdx) => {
                const expanded = isSectionExpanded(section.category);

                return (
                  <div
                    key={sectionIdx}
                    className="mb-4"
                    role="group"
                    aria-labelledby={`section-${section.category}`}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors mb-2 ${
                        section.category !== "MAIN"
                          ? "cursor-pointer hover:bg-white/10"
                          : ""
                      }`}
                      onClick={() => toggleSection(section.category)}
                      role={section.category !== "MAIN" ? "button" : undefined}
                      aria-expanded={
                        section.category !== "MAIN" ? expanded : undefined
                      }
                    >
                      <h3
                        id={`section-${section.category}`}
                        className="text-xs font-semibold text-gray-400 dark:text-slate-500 tracking-wider flex-1 text-left"
                      >
                        {section.href ? (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryClick(section);
                            }}
                            className="hover:text-gray-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                          >
                            {section.category}
                          </span>
                        ) : (
                          section.category
                        )}
                      </h3>
                      {section.category !== "MAIN" && (
                        <motion.div
                          animate={{ rotate: expanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown
                            size={14}
                            className="text-gray-400 dark:text-slate-500"
                          />
                        </motion.div>
                      )}
                    </div>

                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5">
                            {section.items.map((item, itemIdx) => {
                              const Icon = item.icon;
                              const active = isActive(item);

                              return (
                                <motion.button
                                  key={itemIdx}
                                  onClick={() => handleMenuItemClick(item)}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all relative group min-h-[48px] touch-manipulation",
                                    active
                                      ? "text-[#3BF493]"
                                      : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 active:bg-gray-100 dark:active:bg-slate-800",
                                  )}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {active && (
                                    <motion.div
                                      className="absolute inset-0 rounded-xl"
                                      style={{ backgroundColor: "#20319D" }}
                                      layoutId="activeTabMobile"
                                      transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                      }}
                                    />
                                  )}
                                  <div className="relative z-10 flex items-center gap-3 w-full">
                                    {Icon && (
                                      <Icon
                                        size={20}
                                        className="flex-shrink-0"
                                      />
                                    )}
                                    <span className="font-medium flex-1 text-left">
                                      {item.name}
                                    </span>
                                    {isFavorited(item.name) &&
                                      item.name !== "Dashboard" && (
                                        <Star
                                          size={16}
                                          className="fill-yellow-400 text-yellow-400 flex-shrink-0"
                                        />
                                      )}
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "#2E0056" }}
              >
                <div className="text-sm font-medium text-white mb-1">
                  Need Help?
                </div>
                <div className="text-xs text-white/80 mb-3">
                  Get support from our team
                </div>
                <button className="w-full py-2 bg-white/20 rounded-lg text-xs font-medium text-white hover:bg-white/30 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar - always visible */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 288 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:flex lg:relative bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex-col h-full"
      >
        <div
          className={cn(
            "p-6 border-b border-gray-200 dark:border-slate-700 flex items-center relative",
            isCollapsed ? "justify-center" : "justify-start",
          )}
        >
          <button onClick={() => router.push("/")}>
            {!isCollapsed && (
              <div className="flex items-center justify-start relative w-[120px] h-[40px]">
                <Image
                  src="/logo.png"
                  alt="Zil Money Logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {isCollapsed && (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                style={{ backgroundColor: "#20319D" }}
              >
                Z
              </div>
            )}
          </button>
          <button
            onClick={onCollapse}
            className="absolute top-6 right-0 translate-x-1/2 bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 p-1 z-20 flex items-center justify-center w-8 h-8 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight
                size={16}
                className="text-gray-600 dark:text-slate-400"
              />
            ) : (
              <ChevronLeft
                size={16}
                className="text-gray-600 dark:text-slate-400"
              />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {filteredMenuItems.map((section, sectionIdx) => {
            const expanded = isSectionExpanded(section.category);

            return (
              <div key={sectionIdx} className="mb-4">
                {!isCollapsed && (
                  <div
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors mb-2 ${
                      section.category !== "MAIN"
                        ? "cursor-pointer hover:bg-gray-100/50 dark:hover:bg-slate-800/50"
                        : ""
                    }`}
                    onClick={() => toggleSection(section.category)}
                  >
                    <h3 className="text-xs font-semibold text-gray-400 dark:text-slate-500 tracking-wider flex-1 text-left">
                      {section.href ? (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(section);
                          }}
                          className="hover:text-gray-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                        >
                          {section.category}
                        </span>
                      ) : (
                        section.category
                      )}
                    </h3>
                    {section.category !== "MAIN" && (
                      <motion.div
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown
                          size={14}
                          className="text-gray-400 dark:text-slate-500"
                        />
                      </motion.div>
                    )}
                  </div>
                )}
                {isCollapsed && sectionIdx > 0 && (
                  <div className="h-px bg-gray-200 dark:bg-slate-700 mb-2" />
                )}

                <AnimatePresence>
                  {(isCollapsed || expanded) && (
                    <motion.div
                      initial={!isCollapsed ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        !isCollapsed ? { height: 0, opacity: 0 } : undefined
                      }
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-0.5">
                        {section.items.map((item, itemIdx) => {
                          const Icon = item.icon;
                          const isHovered =
                            hoveredItem === `desktop-${sectionIdx}-${itemIdx}`;
                          const active = isActive(item);

                          return (
                            <motion.button
                              key={itemIdx}
                              onClick={() => handleMenuItemClick(item)}
                              className={cn(
                                "w-full flex items-center rounded-xl text-sm transition-all relative group",
                                isCollapsed
                                  ? "justify-center px-3 py-3"
                                  : "gap-3 px-3 py-2.5",
                                active
                                  ? "text-[#3BF493]"
                                  : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100/50 dark:hover:bg-slate-800/50",
                              )}
                              onHoverStart={() =>
                                setHoveredItem(
                                  `desktop-${sectionIdx}-${itemIdx}`,
                                )
                              }
                              onHoverEnd={() => setHoveredItem(null)}
                              whileHover={{
                                x: isCollapsed ? 0 : 4,
                                scale: isCollapsed ? 1.05 : 1,
                              }}
                              whileTap={{ scale: 0.98 }}
                              title={isCollapsed ? item.name : undefined}
                            >
                              {active && (
                                <motion.div
                                  className="absolute inset-0 rounded-xl"
                                  style={{ backgroundColor: "#20319D" }}
                                  layoutId="activeTab"
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                  }}
                                />
                              )}

                              <div
                                className={cn(
                                  "relative z-10 flex items-center w-full",
                                  isCollapsed ? "justify-center" : "gap-3",
                                )}
                              >
                                {Icon && (
                                  <Icon
                                    size={18}
                                    className={cn(
                                      "transition-transform",
                                      isHovered && "scale-110",
                                    )}
                                  />
                                )}
                                {!isCollapsed && (
                                  <span className="font-medium">
                                    {item.name}
                                  </span>
                                )}

                                {!isCollapsed && isHovered && (
                                  <div className="ml-auto flex items-center gap-2">
                                    {item.href && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSetHomePage(item.href!);
                                        }}
                                      >
                                        <Home
                                          size={16}
                                          className={cn(
                                            "cursor-pointer transition-colors",
                                            homePage === item.href
                                              ? "fill-green-500 text-green-500"
                                              : "text-gray-400 dark:text-slate-500 hover:text-green-500",
                                          )}
                                        />
                                      </motion.div>
                                    )}
                                    {item.name !== "Dashboard" && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleFavorite(item.name);
                                        }}
                                      >
                                        <Star
                                          size={16}
                                          className={cn(
                                            "cursor-pointer transition-colors",
                                            isFavorited(item.name)
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-400 dark:text-slate-500 hover:text-yellow-400",
                                          )}
                                        />
                                      </motion.div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="p-4 border-t border-white/10">
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "#2E0056" }}
            >
              <div className="text-sm font-medium text-white mb-1">
                Need Help?
              </div>
              <div className="text-xs text-white/80 mb-3">
                Get support from our team
              </div>
              <button className="w-full py-2 bg-white/20 rounded-lg text-xs font-medium text-white hover:bg-white/30 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
};

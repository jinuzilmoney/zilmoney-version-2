"use client";

import { useState } from "react";
import { Sidebar } from "@/src/widgets/sidebar";
import { Header } from "@/src/widgets/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="flex h-screen relative">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isCollapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          <main className="flex-1 overflow-y-auto bg-[#2E0056]/5 dark:bg-slate-800/50 pb-20 lg:pb-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

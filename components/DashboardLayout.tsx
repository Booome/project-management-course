"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { initTheme } from "@/lib/initTheme";
import { cn } from "@/lib/utils";
import { AppStateType } from "@/redux/AppState";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useSelector(
    (state: AppStateType) => state.ui.sidebarCollapsed,
  );

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar className="w-60" />
      <div
        className={cn(
          `flex min-h-screen flex-1 flex-col bg-background transition-[margin] duration-300 ease-in-out`,
          sidebarCollapsed ? "ml-0" : "lg:ml-60",
        )}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

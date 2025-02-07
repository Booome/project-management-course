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
          `flex min-h-screen w-screen flex-col bg-background transition-[padding] duration-300 ease-in-out`,
          sidebarCollapsed ? "pl-0" : "lg:pl-60",
          "2xl:pl-60",
        )}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

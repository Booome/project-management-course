import teamLogo from "@/assets/team-logo.svg";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AppStateDispatch, AppStateType } from "@/redux/AppState";
import { collapseSidebar } from "@/redux/ui";
import { LockIcon, X } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { NavLinks } from "./NavLinks";
import { Priority } from "./Priority";
import { Projects } from "./Projects";

export function Sidebar({ className }: { className?: string }) {
  const sidebarCollapsed = useSelector(
    (state: AppStateType) => state.ui.sidebarCollapsed,
  );
  const dispatch = useDispatch<AppStateDispatch>();

  return (
    <>
      <div
        className={cn(
          `fixed left-0 top-0 z-50 h-screen w-40 border-r border-border bg-background py-4 shadow-lg transition-transform duration-300 ease-in-out`,
          sidebarCollapsed ? "-translate-x-full" : "translate-x-0",
          "2xl:translate-x-0",
          className,
        )}
      >
        <ScrollArea className="h-full w-full">
          <div className="flex items-center justify-between px-6 pb-4">
            <span className="text-xl font-bold">EDLIST</span>
            <Button
              onClick={() => dispatch(collapseSidebar(true))}
              variant="ghost"
              size="icon"
              className="2xl:hidden [&_svg]:size-7"
            >
              <X />
            </Button>
          </div>

          <div className="flex items-center gap-4 border-b border-t px-6 py-4">
            <Image src={teamLogo} alt="Logo" width={40} height={40} />
            <div>
              <p className="text-md font-bold tracking-wide">EDROH TEAM</p>
              <div className="mt-[2px] flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <LockIcon size={10} />
                <p>Private</p>
              </div>
            </div>
          </div>

          <NavLinks />
          <Projects />
          <Priority />
        </ScrollArea>
      </div>

      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => dispatch(collapseSidebar(true))}
        />
      )}
    </>
  );
}

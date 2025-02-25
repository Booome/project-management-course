import { ToggleThemeButton } from "@/components/ToggleThemeButton";
import { Button } from "@/components/ui/button";
import { AppStateDispatch, AppStateType } from "@/redux/AppState";
import { collapseSidebar } from "@/redux/ui";
import { Settings, Sidebar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AuthButton } from "../AuthButton";

export function Navbar() {
  const dispatch = useDispatch<AppStateDispatch>();
  const sidebarCollapsed = useSelector(
    (state: AppStateType) => state.ui.sidebarCollapsed,
  );

  return (
    <nav
      className={`flex items-center justify-between gap-2 border-b border-border px-4 py-4 shadow-lg`}
    >
      <Button
        onClick={() => dispatch(collapseSidebar(!sidebarCollapsed))}
        variant="ghost"
        size="icon"
        className="2xl:hidden [&_svg]:size-7"
      >
        <Sidebar />
      </Button>

      {/* <div className="relative ml-0 mr-auto flex flex-1 items-center gap-2 lg:w-60 lg:flex-none">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          type="search"
          placeholder="Search"
          className="rounded-md py-1 pl-10 pr-2 shadow-[0_0_2px_rgba(0,0,0,0.7)]"
        />
      </div> */}

      <div className="ml-auto mr-0 flex items-center gap-2">
        <ToggleThemeButton />
        <AuthButton />
        <Button variant="ghost" size="icon" className="[&_svg]:size-7">
          <Settings />
        </Button>
      </div>
    </nav>
  );
}

import { AppStateDispatch, AppStateType } from "@/redux/AppState";
import { collapseSidebarPriority } from "@/redux/ui";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Layers3,
  ShieldAlert,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SidebarAccordion } from "./SidebarAccordion";

const priorityLinks = [
  {
    icon: AlertCircle,
    label: "Urgent",
    href: "/prioritys/urgent",
  },
  {
    icon: ShieldAlert,
    label: "High",
    href: "/prioritys/high",
  },
  {
    icon: AlertTriangle,
    label: "Medium",
    href: "/prioritys/medium",
  },
  {
    icon: AlertOctagon,
    label: "Low",
    href: "/prioritys/low",
  },
  {
    icon: Layers3,
    label: "Backlog",
    href: "/prioritys/backlog",
  },
];

export function Priority() {
  const dispatch = useDispatch<AppStateDispatch>();
  const sidebarPriorityCollapsed = useSelector(
    (state: AppStateType) => state.ui.sidebarPriorityCollapsed,
  );

  return (
    <SidebarAccordion
      label="Priority"
      links={priorityLinks}
      collapsed={sidebarPriorityCollapsed}
      onCollapsedChange={(collapsed) =>
        dispatch(collapseSidebarPriority(collapsed))
      }
    />
  );
}

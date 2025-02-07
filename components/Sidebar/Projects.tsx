import { useGetProjectsQuery } from "@/redux/api";
import { AppStateDispatch, AppStateType } from "@/redux/AppState";
import { collapseSidebarProjects } from "@/redux/ui";
import { Circle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SidebarAccordion } from "./SidebarAccordion";
import { SidebarLinkProps } from "./SidebarLink";

export function Projects() {
  const dispatch = useDispatch<AppStateDispatch>();
  const sidebarProjectsCollapsed = useSelector(
    (state: AppStateType) => state.ui.sidebarProjectsCollapsed,
  );

  const { data: projects } = useGetProjectsQuery();

  const projectLinks: SidebarLinkProps[] =
    projects?.map((project) => ({
      href: `/projects/${project.id}`,
      label: project.name,
      icon: Circle,
    })) ?? [];

  return (
    <SidebarAccordion
      label="Projects"
      links={projectLinks}
      collapsed={sidebarProjectsCollapsed}
      onCollapsedChange={(collapsed) =>
        dispatch(collapseSidebarProjects(collapsed))
      }
    />
  );
}

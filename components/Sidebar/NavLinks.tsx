import {
  Briefcase,
  HomeIcon,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { SidebarLink } from "./SidebarLink";

const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Timeline",
    href: "/timeline",
    icon: Briefcase,
  },
  {
    label: "Search",
    href: "/search",
    icon: Search,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Users",
    href: "/users",
    icon: User,
  },
  {
    label: "Teams",
    href: "/teams",
    icon: Users,
  },
];

export function NavLinks() {
  return (
    <>
      {navLinks.map((link) => (
        <SidebarLink key={link.href} {...link} />
      ))}
    </>
  );
}

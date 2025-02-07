import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarLinkProps = {
  icon?: React.ElementType;
  label: string;
  href: string;
  className?: string;
};

export function SidebarLink({
  icon: Icon,
  label,
  href,
  className,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-6 py-2 text-sm",
        {
          "border-l-4 border-l-primary/70 bg-foreground/5 px-5": isActive,
        },
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </Link>
  );
}

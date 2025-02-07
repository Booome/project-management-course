import { cn } from "@/lib/utils";
import { TabsList as TabsListBase } from "../ui/tabs";

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TabsListBase
      className={cn(
        "h-fit w-full flex-col items-start justify-start gap-1 rounded-none border-y border-border bg-transparent px-0 py-0 lg:flex-row-reverse lg:items-center lg:justify-between",
        className,
      )}
    >
      {children}
    </TabsListBase>
  );
}

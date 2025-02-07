import { LucideIcon } from "lucide-react";
import { TabsTrigger as TabsTriggerBase } from "../ui/tabs";

export function TabsTrigger({
  label,
  icon: Icon,
  value,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <TabsTriggerBase
      value={value}
      className="-my-[1px] gap-2 rounded-none border-b px-2 py-2 text-xs font-normal data-[state=active]:border-b-primary data-[state=active]:bg-foreground/10 data-[state=active]:shadow-none"
    >
      <Icon size={16} />
      {label}
    </TabsTriggerBase>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger as TabsTriggerBase,
} from "@/components/ui/tabs";
import {
  Clock,
  Filter,
  Grid3x3,
  List,
  LucideIcon,
  Plus,
  Share2,
  Table,
} from "lucide-react";
import { Board } from "./Board";

export default function Page() {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xl font-semibold">Product Design Devlopment</p>
        <Button className="size-fit text-xs uppercase">
          <Plus />
          New Project
        </Button>
      </div>

      <Tabs defaultValue="board" className="mt-4">
        <TabsList className="h-fit w-full flex-col items-start justify-start gap-1 rounded-none border-y border-border bg-transparent px-0 py-0 lg:flex-row-reverse lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 px-2">
            <IconButton icon={Filter} />
            <IconButton icon={Share2} />
            <Input className="h-6 rounded-none px-2 text-xs" />
          </div>
          <div className="flex flex-row">
            <TabsTrigger value="board" label="Board" icon={Grid3x3} />
            <TabsTrigger value="list" label="List" icon={List} />
            <TabsTrigger value="timeline" label="Timeline" icon={Clock} />
            <TabsTrigger value="table" label="Table" icon={Table} />
          </div>
        </TabsList>

        <TabsContent value="board">
          <Board />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TabsTrigger({
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

function IconButton({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <Button variant="ghost" className="size-fit p-0">
      <Icon size={16} />
    </Button>
  );
}

import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

export function IconButton({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <Button variant="ghost" className="size-fit p-0">
      <Icon size={16} />
    </Button>
  );
}

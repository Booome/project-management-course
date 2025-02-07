"use client";

import { NewProjectModal } from "@/components/NewProject";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function NewProjectButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className={cn("size-fit text-xs uppercase", className)}
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="h-4 w-4" />
        New Project
      </Button>

      <NewProjectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { NewTaskModal } from "./Modal";

export function NewTaskButton({ projectId }: { projectId?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="text-xs uppercase"
        size="sm"
        onClick={() => setOpen(true)}
      >
        New Task
      </Button>
      <NewTaskModal
        open={open}
        onClose={() => setOpen(false)}
        projectId={projectId}
      />
    </>
  );
}

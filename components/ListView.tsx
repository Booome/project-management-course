"use client";

import { NewTaskButton } from "@/components/NewTask";
import { SimpleTaskCard } from "@/components/simpleCards";
import { Task } from "@/lib/types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function TaskListView({
  projectId,
  tasks,
}: {
  projectId?: number;
  tasks: Task[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">List:</h2>
        <NewTaskButton projectId={projectId} />
      </div>
      <ResponsiveMasonry
        className="mt-4 gap-4"
        columnsCountBreakPoints={Object.fromEntries(
          Array.from({ length: 10 }, (_, i) => [400 * (i + 1), i + 1]),
        )}
      >
        <Masonry>
          {tasks?.map((task) => <SimpleTaskCard key={task.id} task={task} />)}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

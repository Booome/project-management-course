"use client";

import { NewTaskButton } from "@/components/NewTask";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskStatus } from "@/lib/types";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useMemo, useState } from "react";

export function TaskTimelineView({
  projectId,
  tasks,
}: {
  projectId?: number;
  tasks: Task[];
}) {
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Day,
    locale: "en-US",
  });

  const ganttTasks = useMemo(
    () =>
      tasks
        ?.filter((task) => task.startDate && task.dueDate) // TODO: Remove this filter
        .map((task) => ({
          start: new Date(task.startDate!),
          end: new Date(task.dueDate!),
          name: task.title,
          id: String(task.id),
          type: "task" as const,
          progress: task.status === TaskStatus.Completed ? 100 : 0,
          isDisabled: task.status === TaskStatus.Completed,
        })) ?? [],
    [tasks],
  );

  const handleViewModeChange = (value: ViewMode) => {
    setDisplayOptions({ ...displayOptions, viewMode: value });
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-2 lg:flex-row">
        <h2 className="text-2xl font-bold">Project Tasks Timeline</h2>

        <Select defaultValue="Day" onValueChange={handleViewModeChange}>
          <SelectTrigger className="h-8 w-40 rounded-none px-2 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-none text-xs">
            <SelectItem value="Day">Day</SelectItem>
            <SelectItem value="Week">Week</SelectItem>
            <SelectItem value="Month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="gantt mt-4 w-full overflow-x-auto whitespace-nowrap lg:overflow-hidden">
        <div className="h-max w-max lg:h-full lg:w-full">
          <Gantt {...displayOptions} tasks={ganttTasks} listCellWidth="100px" />
        </div>
      </div>

      <NewTaskButton projectId={projectId} />
    </>
  );
}

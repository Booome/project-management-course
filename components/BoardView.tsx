"use client";

import { TaskPriorityBadge, TaskTagBadge } from "@/components/taskBadges";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Task, TaskPriority, TaskStatus } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import Image from "next/image";

export function TaskBoardView({ tasks }: { tasks: Task[] }) {
  const taskStatuses = Object.values(TaskStatus);

  const tasksByStatus =
    tasks?.reduce(
      (acc, task) => {
        if (task.status) {
          acc[task.status] = [...(acc[task.status] || []), task];
        }
        return acc;
      },
      {} as Record<string, Task[]>,
    ) ?? {};

  return (
    <div className="flex flex-row flex-wrap items-start gap-4">
      {taskStatuses.map((status) => (
        <TaskGroup
          key={status}
          status={status}
          tasks={tasksByStatus[status] ?? []}
        />
      ))}
    </div>
  );
}

function TaskGroup({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
  return (
    <div className="flex flex-1 basis-96 flex-col gap-3">
      <TaskGroupHeader status={status} tasksCount={tasks.length} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

function TaskGroupHeader({
  status,
  tasksCount,
}: {
  status: TaskStatus;
  tasksCount: number;
}) {
  const statusBorderClasses: any = {
    [TaskStatus.ToDo]: "border-blue-600",
    [TaskStatus.WorkInProgress]: "border-emerald-600",
    [TaskStatus.UnderReview]: "border-amber-600",
    [TaskStatus.Completed]: "border-black",
  };

  return (
    <div
      className={cn(
        "flex flex-row items-center rounded-lg border-l-8 bg-foreground/5 px-4 py-3 font-medium",
        statusBorderClasses[status],
      )}
    >
      {status}
      <div className="m-auto ml-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground/50 text-center text-xs text-background">
        {tasksCount}
      </div>
      <EllipsisVertical className="ml-auto" />
      <Button variant="ghost" className="size-fit bg-foreground/10 p-1">
        <Plus />
      </Button>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const startDate = formatDate(task.startDate);
  const dueDate = formatDate(task.dueDate);

  return (
    <div className="overflow-hidden rounded-lg bg-foreground/5">
      {task.attachments.length > 0 && (
        <Image
          src={"/" + task.attachments[0].fileURL}
          alt={task.attachments[0].fileName ?? ""}
          className="h-52 w-full object-cover"
          width={1920}
          height={1080}
        />
      )}

      <div className="font-xs flex flex-col gap-2 p-4">
        <div className="flex flex-row items-start gap-2">
          {task.priority && (
            <TaskPriorityBadge priority={task.priority as TaskPriority} />
          )}
          {task.tags
            ?.split(",")
            .map((tag) => <TaskTagBadge key={tag} tag={tag} />)}
          <EllipsisVertical className="ml-auto" size={16} />
        </div>

        <p className="font-semibold">{task.title}</p>

        <div className="flex flex-row gap-2 text-xs text-foreground/80">
          {<p>{startDate}</p>}
          {(startDate || dueDate) && <p> - </p>}
          {<p>{dueDate}</p>}
        </div>

        <p className="text-sm">{task.description}</p>

        <Separator />

        <div className="flex flex-row items-center">
          {task.assignee.profilePictureUrl && (
            <Image
              src={"/" + task.assignee.profilePictureUrl}
              alt={task.assignee.username}
              className="h-8 w-8 rounded-full border-2 border-background object-cover"
              width={32}
              height={32}
            />
          )}
          {task.author && (
            <Image
              src={"/" + task.author.profilePictureUrl}
              alt={task.author.username}
              className="-ml-2 h-8 w-8 rounded-full border-2 border-background object-cover"
              width={32}
              height={32}
            />
          )}
          <div className="ml-auto flex flex-row gap-1">
            <MessageSquareMore />
            {task.comments.length}
          </div>
        </div>
      </div>
    </div>
  );
}

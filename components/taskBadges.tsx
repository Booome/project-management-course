import { Badge } from "@/components/ui/badge";
import { TaskPriority, TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TaskStatusBadge({
  status,
  className,
}: {
  status: TaskStatus;
  className?: string;
}) {
  const statusClasses: Record<TaskStatus, string> = {
    [TaskStatus.ToDo]: "bg-red-200 text-red-700",
    [TaskStatus.WorkInProgress]: "bg-yellow-200 text-yellow-700",
    [TaskStatus.UnderReview]: "bg-blue-200 text-blue-700",
    [TaskStatus.Completed]: "bg-green-200 text-green-700",
  };

  return (
    <Badge variant="outline" className={cn(statusClasses[status], className)}>
      {status}
    </Badge>
  );
}

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const priorityClasses: Record<TaskPriority, string> = {
    [TaskPriority.Urgent]: "bg-red-200 text-red-700",
    [TaskPriority.High]: "bg-yellow-200 text-yellow-700",
    [TaskPriority.Medium]: "bg-green-200 text-green-700",
    [TaskPriority.Low]: "bg-blue-200 text-blue-700",
    [TaskPriority.Backlog]: "bg-gray-200 text-gray-700",
  };

  return (
    <Badge
      className={cn("rounded-full font-medium", priorityClasses[priority])}
    >
      {priority}
    </Badge>
  );
}

export function TaskTagBadge({ tag }: { tag: string }) {
  return (
    <Badge className="rounded-full bg-primary/20 font-medium text-foreground">
      {tag}
    </Badge>
  );
}

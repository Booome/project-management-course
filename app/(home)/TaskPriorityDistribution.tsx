import { Bar, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import { TaskPriority } from "@/lib/types";
import { useGetTasksQuery } from "@/redux/api";
import { BarChart } from "recharts";

export function TaskPriorityDistribution() {
  const {
    data: tasks,
    isError,
    error,
    isLoading,
  } = useGetTasksQuery({
    where: {
      authorUserId: 1,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const priorityCounts = tasks?.reduce(
    (acc, task) => {
      if (task.priority) {
        const priority = task.priority as TaskPriority;
        acc[priority] = (acc[priority] || 0) + 1;
      }
      return acc;
    },
    {} as Record<TaskPriority, number>,
  );

  const chartData = Object.entries(priorityCounts || {}).map(
    ([priority, count]) => ({
      priority,
      count,
    }),
  );

  return (
    <div className="flex h-80 w-full flex-col gap-2 rounded-lg border border-border bg-foreground/5 p-4 shadow-md">
      <p className="text-lg font-bold">Task Priority Distribution</p>

      <ChartContainer config={{}} className="min-h-10 w-full flex-1">
        <BarChart data={chartData}>
          <CartesianGrid />
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" radius={4} fill="hsl(var(--chart-1))" />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

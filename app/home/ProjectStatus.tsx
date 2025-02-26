import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetProjectsQuery } from "@/redux/api";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

export function ProjectStatus({ className }: { className?: string }) {
  const { data: projects, isError, error, isLoading } = useGetProjectsQuery();
  const containerClassName = cn(
    "flex h-80 w-full flex-col gap-2 rounded-lg border border-border bg-foreground/5 p-4 shadow-md",
    className,
  );

  if (isLoading) {
    return <Skeleton className={containerClassName}>Loading...</Skeleton>;
  }
  if (isError) {
    return (
      <Skeleton className={containerClassName}>
        Error: {JSON.stringify(error)}
      </Skeleton>
    );
  }

  const statusCounts = projects?.reduce(
    (acc, project) => {
      if (project.endDate) {
        const status = project.endDate < new Date() ? "Completed" : "Ongoing";
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(statusCounts || {}).map(
    ([status, count]) => ({
      status,
      count,
    }),
  );

  return (
    <div className="flex h-80 w-full flex-col gap-2 rounded-lg border border-border bg-foreground/5 p-4 shadow-md">
      <p className="text-lg font-bold">Project Status</p>

      <ChartContainer config={{}} className="min-h-10 w-full flex-1">
        <PieChart>
          <Tooltip />
          <Pie
            dataKey="count"
            nameKey="status"
            data={chartData}
            radius={4}
            fill="hsl(var(--chart-1))"
          />
          <Legend key="status" />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

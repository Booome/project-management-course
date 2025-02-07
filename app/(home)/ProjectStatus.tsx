import { ChartContainer } from "@/components/ui/chart";
import { useGetProjectsQuery } from "@/redux/api";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

export function ProjectStatus() {
  const { data: projects, isError, isLoading } = useGetProjectsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
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

"use client";

import { NewProjectButton } from "@/components/NewProject";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetProjectsQuery } from "@/redux/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useMemo, useState } from "react";

export default function TimelinePage({ className }: { className?: string }) {
  const { data: projects, error, isLoading } = useGetProjectsQuery();
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Day,
    locale: "en-US",
  });
  const containerClassName = cn("flex flex-col gap-4 px-4 py-6", className);

  const ganttProjects = useMemo(
    () =>
      projects?.map((project) => ({
        start: new Date(project.startDate!),
        end: new Date(project.endDate!),
        name: project.name,
        id: String(project.id),
        type: "project" as const,
        progress: 0,
        isDisabled: false,
      })) ?? [],
    [projects],
  );

  const handleViewModeChange = (value: ViewMode) => {
    setDisplayOptions({ ...displayOptions, viewMode: value });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
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

      {isLoading && (
        <Skeleton className={containerClassName}>Loading...</Skeleton>
      )}

      {error && (
        <Skeleton className={containerClassName}>
          Error occurred while fetching tasks: {JSON.stringify(error)}
        </Skeleton>
      )}

      {!isLoading && !error && (
        <div className="gantt mt-4 w-full overflow-x-auto whitespace-nowrap lg:overflow-hidden">
          <div className="h-max w-max lg:h-full lg:w-full">
            {/* TODO: Remove this slice */}
            <Gantt
              {...displayOptions}
              tasks={ganttProjects.slice(0, 10)}
              listCellWidth="100px"
            />
          </div>
        </div>
      )}

      <NewProjectButton />
    </div>
  );
}

"use client";

import { NewProjectButton } from "@/components/NewProject/Button";
import { IconButton, TabsList, TabsTrigger } from "@/components/Tab";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetTasksQuery } from "@/redux/api";
import { Clock, Filter, Grid3x3, List, Share2, Table } from "lucide-react";
import { useParams } from "next/navigation";
import { TaskBoardView } from "../../../components/BoardView";
import { TaskListView } from "../../../components/ListView";
import { TaskTableView } from "../../../components/TableView";
import { TaskTimelineView } from "../../../components/TimelineView";

export default function Page() {
  const params = useParams<{ projectId: string }>();
  const projectId = params?.projectId ? Number(params.projectId) : undefined;
  const containerClassName = "gap-4 px-4 py-6";

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError,
    error,
  } = useGetTasksQuery(
    {
      where: {
        projectId,
      },
      include: {
        attachments: true,
        assignee: true,
        comments: true,
        author: true,
      },
    },
    {
      skip: projectId === undefined,
    },
  );

  if (!projectId) {
    return (
      <Skeleton className={containerClassName}>Project ID is required</Skeleton>
    );
  }

  return (
    <div className={containerClassName}>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-2xl font-semibold">Product Design Devlopment</p>
        <NewProjectButton />
      </div>

      <Tabs defaultValue="board" className="mt-6">
        <TabsList>
          <div className="mt-1 flex items-center gap-2 lg:mt-0">
            <IconButton icon={Filter} />
            <IconButton icon={Share2} />
            <Input className="h-6 rounded-none px-2 text-xs" />
          </div>
          <div className="flex flex-row">
            <TabsTrigger value="board" label="Board" icon={Grid3x3} />
            <TabsTrigger value="list" label="List" icon={List} />
            <TabsTrigger value="timeline" label="Timeline" icon={Clock} />
            <TabsTrigger value="table" label="Table" icon={Table} />
          </div>
        </TabsList>

        {isTasksLoading && <Skeleton className="py-2">Loading...</Skeleton>}

        {isError && (
          <Skeleton className="py-2">Error: {JSON.stringify(error)}</Skeleton>
        )}

        {!isTasksLoading && !isError && (
          <>
            <TabsContent value="board" className="py-2">
              <TaskBoardView tasks={tasks ?? []} />
            </TabsContent>
            <TabsContent value="list" className="py-2">
              <TaskListView projectId={projectId} tasks={tasks ?? []} />
            </TabsContent>
            <TabsContent value="timeline" className="py-2">
              <TaskTimelineView projectId={projectId} tasks={tasks ?? []} />
            </TabsContent>
            <TabsContent value="table" className="py-2">
              <TaskTableView projectId={projectId} tasks={tasks ?? []} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

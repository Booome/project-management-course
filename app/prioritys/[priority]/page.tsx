"use client";

import { TaskListView } from "@/components/ListView";
import { NewTaskButton } from "@/components/NewTask/Button";
import { TabsList, TabsTrigger } from "@/components/Tab";
import { TaskTableView } from "@/components/TableView";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TaskPriority } from "@/lib/types";
import { useGetTasksQuery } from "@/redux/api";
import { capitalCase } from "change-case";
import { List, Table } from "lucide-react";
import { useParams } from "next/navigation";

export default function Page() {
  const { priority: priorityParam } = useParams() as { priority: string };
  const priority = capitalCase(priorityParam) as TaskPriority;
  const containerClassName = "flex flex-col gap-4 px-4 py-8";

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useGetTasksQuery({
    where: {
      AND: [
        { priority: priority },
        // {
        //   OR: [
        //     {
        //       authorUserId: userId,
        //     },
        //     {
        //       assignedUserId: userId,
        //     },
        //   ],
        // },
      ],
    },
    include: {
      attachments: true,
      assignee: true,
      comments: true,
      author: true,
    },
  });

  if (!priority) {
    return (
      <Skeleton className={containerClassName}>Priority is required</Skeleton>
    );
  }

  return (
    <div className={containerClassName}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{priority} Tasks</h1>
        <NewTaskButton />
      </div>

      <Tabs defaultValue="list">
        <TabsList className="lg:flex-row">
          <div>
            <TabsTrigger value="list" label="List" icon={List}></TabsTrigger>
            <TabsTrigger value="table" label="Table" icon={Table}></TabsTrigger>
          </div>
        </TabsList>

        {isLoading && <Skeleton className="py-2">Loading...</Skeleton>}

        {isError && (
          <Skeleton className="py-2">Error: {JSON.stringify(error)}</Skeleton>
        )}

        {!isLoading && !isError && (
          <>
            <TabsContent value="list" className="py-2">
              <TaskListView tasks={tasks ?? []} />
            </TabsContent>
            <TabsContent value="table" className="py-2">
              <TaskTableView tasks={tasks ?? []} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

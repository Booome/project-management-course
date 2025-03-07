import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useGetTasksQuery } from "@/redux/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export function YourTasks({ className }: { className?: string }) {
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
  const containerClassName = cn(
    "flex h-64 w-full flex-col gap-2 rounded-lg border border-border bg-foreground/5 p-4 shadow-md",
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

  const columns: GridColDef<Task>[] = [
    { field: "title", headerName: "Title", width: 250 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
  ];

  return (
    <div className="flex h-64 w-full flex-col gap-2 rounded-lg border border-border bg-foreground/5 p-4 shadow-md">
      <p className="text-lg font-bold">Your Tasks</p>
      <DataGrid
        checkboxSelection
        rows={tasks || []}
        columns={columns}
        className="data-grid"
        columnHeaderHeight={36}
        rowHeight={36}
        sx={{
          fontSize: "12px",
          width: "full",
          maxWidth: "100%",
          marginTop: "16px",
        }}
      />
    </div>
  );
}

"use client";

import { NewTaskButton } from "@/components/NewTask";
import { TaskStatusBadge, TaskTagBadge } from "@/components/taskBadges";
import { Task, TaskStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export function TaskTableView({
  projectId,
  tasks,
}: {
  projectId?: number;
  tasks: Task[];
}) {
  const columns: GridColDef<Task>[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) =>
        params.row.status ? (
          <TaskStatusBadge status={params.row.status as TaskStatus} />
        ) : null,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      renderCell: (params) =>
        params.row.tags ? (
          <div>
            {params.row.tags.split(",").map((tag) => (
              <TaskTagBadge key={tag} tag={tag} />
            ))}
          </div>
        ) : null,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      renderCell: (params) => <div>{formatDate(params.row.startDate)}</div>,
    },
    {
      field: "dueDate",
      headerName: "End Date",
      renderCell: (params) => <div>{formatDate(params.row.dueDate)}</div>,
    },
    {
      field: "author",
      headerName: "Author",
      renderCell: (params) => <div>{params.row.author.username}</div>,
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Table</h2>
        <NewTaskButton projectId={projectId} />
      </div>
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

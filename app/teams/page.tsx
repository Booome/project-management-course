"use client";

import { Team } from "@/lib/types";
import { useGetTeamsQuery } from "@/redux/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function Page() {
  const { data: teams, error, isLoading: isTeamsLoading } = useGetTeamsQuery();

  if (isTeamsLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>Error occurred while fetching teams: {JSON.stringify(error)}</div>
    );
  }

  const columns: GridColDef<Team>[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "teamName", headerName: "Name", width: 250 },
    {
      field: "productOwnerUser",
      headerName: "Product Owner",
      width: 250,
      renderCell: (params) => params.row.productOwnerUser?.username,
    },
    {
      field: "projectManagerUser",
      headerName: "Project Manager",
      width: 250,
      renderCell: (params) => params.row.projectManagerUser?.username,
    },
  ];

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold">Teams</h1>

      <DataGrid
        checkboxSelection
        rows={teams || []}
        columns={columns}
        getRowId={(row) => row.id}
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

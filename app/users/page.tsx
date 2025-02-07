"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/lib/types";
import { useGetUsersQuery } from "@/redux/api";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Page() {
  const { data: users, error, isLoading: isUsersLoading } = useGetUsersQuery();

  const columns: GridColDef<User>[] = [
    { field: "userId", headerName: "ID", width: 50 },
    { field: "username", headerName: "Username", width: 250 },
    {
      field: "profilePictureUrl",
      headerName: "Profile Picture",
      width: 120,
      renderCell: (params) => (
        <div className="flex h-full w-full items-center justify-center">
          {params.row.profilePictureUrl ? (
            <Image
              src={"/" + params.row.profilePictureUrl}
              alt={params.row.username}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
        </div>
      ),
    },
    {
      field: "team",
      headerName: "Team",
      width: 250,
      renderCell: (params) => <div>{params.row.team.teamName}</div>,
    },
  ];

  if (isUsersLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>Error occurred while fetching users: {JSON.stringify(error)}</div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <DataGrid
        checkboxSelection
        rows={users || []}
        columns={columns}
        getRowId={(row) => row.userId}
        className="data-grid"
        columnHeaderHeight={36}
        rowHeight={36}
        sx={{
          fontSize: "12px",
          width: "full",
          maxWidth: "100%",
          marginTop: "16px",
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

import { Project } from "@prisma/client";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  reducerPath: "api",
  tagTypes: ["Projects"],

  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
  }),
});

export const { useGetProjectsQuery } = api;

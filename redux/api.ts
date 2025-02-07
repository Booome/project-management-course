import { Project, Task, Team, User } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SearchResult = {
  projects: Project[];
  tasks: Task[];
  users: User[];
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],

  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),

    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    getTasks: builder.query<Task[], { where?: any; include?: any }>({
      query: (param) => {
        const searchParams = new URLSearchParams();
        if (param !== undefined) {
          searchParams.set("param", JSON.stringify(param));
        }
        return `/tasks?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    search: builder.query<SearchResult, string>({
      query: (query) => `/search?query=${query}`,
    }),

    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    getTeams: builder.query<Team[], void>({
      query: () => "/teams",
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,

  useGetTasksQuery,
  useCreateTaskMutation,

  useSearchQuery,

  useGetUsersQuery,
  useGetTeamsQuery,
} = api;

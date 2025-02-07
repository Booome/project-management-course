import {
  Attachment,
  Comment,
  Project as ProjectBase,
  ProjectTeam,
  TaskAssignment,
  Task as TaskBase,
  Team as TeamBase,
  User as UserBase,
} from "@prisma/client";

export enum TaskStatus {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum TaskPriority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export type Project = ProjectBase & {
  tasks: Task[];
  projectTeams: ProjectTeam[];
};

export type Task = TaskBase & {
  project: Project;
  author: User;
  assignee: User;
  taskAssignments: TaskAssignment[];
  attachments: Attachment[];
  comments: Comment[];
};

export type User = UserBase & {
  team: Team;
  authoredTasks: Task[];
  assignedTasks: Task[];
  taskAssignments: TaskAssignment[];
  attachments: Attachment[];
  comments: Comment[];
};

export type Team = TeamBase & {
  productOwnerUser?: User;
  projectManagerUser?: User;
  projectTeams: ProjectTeam[];
  users: User[];
};

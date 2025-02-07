import { z } from "zod";
import { TaskPriority, TaskStatus } from "./types";

export const newProjectFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." })
      .max(50, { message: "Name cannot exceed 50 characters." }),
    description: z
      .string()
      .min(1, { message: "Description is required." })
      .max(200, { message: "Description cannot exceed 200 characters." }),
    startDate: z.date().refine((date) => date >= new Date(), {
      message: "Start date must be today or in the future.",
    }),
    endDate: z.date().refine((date) => date >= new Date(), {
      message: "End date must be today or in the future.",
    }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  });

export const newTaskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.nativeEnum(TaskStatus, { message: "Status is required" }),
  priority: z.nativeEnum(TaskPriority, { message: "Priority is required" }),
  startDate: z.date().min(new Date(), { message: "Start date is required" }),
  dueDate: z.date().min(new Date(), { message: "Due date is required" }),
  tags: z.string().min(1, { message: "Tags are required" }),
  projectId: z.number().optional(),
  authorUserId: z.number().min(1, { message: "Author is required" }),
  assignedUserId: z.number().min(1, { message: "Assignee is required" }),
});

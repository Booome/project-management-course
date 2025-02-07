"use client";

import { toast } from "@/hooks/use-toast";
import { newTaskFormSchema } from "@/lib/formSchemas";
import { TaskPriority, TaskStatus } from "@/lib/types";
import { useCreateTaskMutation } from "@/redux/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormDateField,
  FormInputField,
  FormSelectField,
  FormTextareaField,
} from "../formFields";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Form } from "../ui/form";

export function NewTaskModal({
  open,
  onClose,
  projectId,
}: {
  open: boolean;
  onClose: () => void;
  projectId?: number;
}) {
  const form = useForm<z.infer<typeof newTaskFormSchema>>({
    resolver: zodResolver(newTaskFormSchema),
  });
  const [createTask, { isLoading }] = useCreateTaskMutation();

  async function onSubmit(values: z.infer<typeof newTaskFormSchema>) {
    try {
      await createTask({
        ...values,
        projectId: projectId ?? undefined,
      }).unwrap();
      onClose();
      toast({
        variant: "primary",
        title: "Task created successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to create task: " + error,
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
      modal
    >
      <DialogContent>
        <DialogTitle>New Task</DialogTitle>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormInputField control={form.control} name="title" />
            <FormTextareaField control={form.control} name="description" />

            <div className="flex justify-between gap-2">
              <FormSelectField
                control={form.control}
                name="status"
                options={Object.values(TaskStatus)}
              />
              <FormSelectField
                control={form.control}
                name="priority"
                options={Object.values(TaskPriority)}
              />
            </div>

            <div className="flex justify-between gap-2">
              <FormDateField control={form.control} name="startDate" />
              <FormDateField control={form.control} name="dueDate" />
            </div>

            {!projectId && (
              <FormInputField
                control={form.control}
                name="projectId"
                type="number"
              />
            )}

            <FormInputField
              control={form.control}
              name="tags"
              label="Tags (comma separated)"
              type="text"
            />

            <FormInputField
              control={form.control}
              name="authorUserId"
              type="number"
            />
            <FormInputField
              control={form.control}
              name="assignedUserId"
              type="number"
            />

            <Button
              type="submit"
              className="mt-4 uppercase"
              disabled={isLoading}
            >
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

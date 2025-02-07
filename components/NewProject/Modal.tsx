"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { newProjectFormSchema } from "@/lib/formSchemas";
import { useCreateProjectMutation } from "@/redux/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormDateField,
  FormInputField,
  FormTextareaField,
} from "../formFields";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export function NewProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [createProject, { isLoading, error }] = useCreateProjectMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
  });

  async function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    try {
      await createProject(values);
      onClose();
      toast({
        variant: "primary",
        title: "Project created successfully",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to create project: " + error,
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
      <DialogContent className="max-w-md">
        <DialogTitle>New Project</DialogTitle>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-stretch gap-2"
          >
            <FormInputField control={form.control} name="name" />
            <FormTextareaField control={form.control} name="description" />

            <div className="flex justify-between gap-2">
              <FormDateField control={form.control} name="startDate" />
              <FormDateField control={form.control} name="endDate" />
            </div>

            {error && (
              <p className="text-red-500">
                Failed to create project: {JSON.stringify(error)}
              </p>
            )}
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

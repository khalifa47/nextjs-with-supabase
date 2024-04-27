"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import TodoFormContent from "./TodoFormContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./CreateTodoForm";
import { useForm } from "react-hook-form";

type EditTodoProps = {
  title?: string;
  priority?: number;
};

type EditTodoDialogProps = {
  initialValues: EditTodoProps;
  handleEdit: (
    data?: { title: string; priority: number },
    undo?: boolean
  ) => Promise<void>;
};

const EditTodoDialog = ({ initialValues, handleEdit }: EditTodoDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Here you can edit the title and the priority of the task
        </DialogDescription>
      </DialogHeader>
      <TodoFormContent
        form={form}
        onSubmit={() =>
          handleEdit({
            title: form.getValues("title"),
            priority: form.getValues("priority"),
          })
        }
      >
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </TodoFormContent>
    </DialogContent>
  );
};

export default EditTodoDialog;

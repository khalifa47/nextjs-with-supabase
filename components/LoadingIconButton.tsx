"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  CheckCircleIcon,
  EditIcon,
  Trash2Icon,
  Loader2Icon,
  Undo2Icon,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useTodos } from "@/lib/hooks";
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditTodoDialog from "./todos/EditTodoDialog";

type Purpose = "check" | "edit" | "delete" | "undo";

type Props = {
  id: string;
  purpose: Purpose;
  title?: string;
  priority?: number;
};

const LoadingIconButton = ({ id, purpose, title, priority }: Props) => {
  const { setTodos } = useTodos();

  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleEdit = async (
    data?: { title: string; priority: number },
    undo?: boolean
  ) => {
    const toUpdate = data
      ? { title: data.title, priority: data.priority }
      : { done_at: undo ? null : new Date() };

    setLoading(true);

    const { data: newTodo, error } = await supabase
      .from("todos")
      .update(toUpdate)
      .eq("id", id)
      .select();

    if (error) {
      setLoading(false);
      throw new Error(error.message);
    } else {
      setTodos((prev) => {
        const index = prev.findIndex((todo) => todo.id === id);
        const newTodos = [...prev];
        newTodos[index] = newTodo[0];
        return newTodos;
      });
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      setLoading(false);
      throw new Error(error.message);
    } else {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    setLoading(false);
  };

  const getMap = (purpose: Purpose) => {
    switch (purpose) {
      case "check":
        return {
          icon: <CheckCircleIcon className="h-4 w-4" />,
          handler: () => handleEdit(),
        };
      case "edit":
        return {
          icon: <EditIcon className="h-4 w-4" />,
          handler: null,
        };
      case "delete":
        return {
          icon: <Trash2Icon className="h-4 w-4" />,
          handler: () => handleDelete(),
        };
      case "undo":
        return {
          icon: <Undo2Icon className="h-4 w-4" />,
          handler: () => handleEdit(undefined, true),
        };

      default:
        break;
    }
  };

  const mapper = getMap(purpose);

  const ActionButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full h-6 w-6"
      disabled={loading}
      onClick={mapper?.handler!}
    >
      {loading ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        mapper?.icon
      )}
    </Button>
  );

  return purpose === "edit" ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-6 w-6">
          {mapper?.icon}
        </Button>
      </DialogTrigger>
      <EditTodoDialog
        initialValues={{ title, priority }}
        handleEdit={handleEdit}
      />
    </Dialog>
  ) : (
    <ActionButton />
  );
};

export default LoadingIconButton;

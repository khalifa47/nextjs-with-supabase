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

type Purpose = "check" | "edit" | "delete" | "undo";

type Props = {
  id: string;
  purpose: Purpose;
};

const LoadingIconButton = ({ id, purpose }: Props) => {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleDoUndo = async (undo?: boolean) => {
    setLoading(true);

    const { data: newTodo, error } = await supabase
      .from("todos")
      .update({ done_at: undo ? null : new Date() })
      .eq("id", id)
      .select();

    if (error) {
      setLoading(false);
      throw new Error(error.message);
    }

    console.log(newTodo[0]);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await supabase.from("countries").delete().eq("id", 1);

    if (error) {
      setLoading(false);
      throw new Error(error.message);
    }

    setLoading(false);
  };

  const temp = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    console.log("load");
  };

  const getMap = (purpose: Purpose) => {
    switch (purpose) {
      case "check":
        return {
          icon: <CheckCircleIcon className="h-4 w-4" />,
          handler: () => handleDoUndo(),
        };
      case "edit":
        return {
          icon: <EditIcon className="h-4 w-4" />,
          handler: () => temp(), //TODO: do a modal
        };
      case "delete":
        return {
          icon: <Trash2Icon className="h-4 w-4" />,
          handler: () => handleDelete(),
        };
      case "undo":
        return {
          icon: <Undo2Icon className="h-4 w-4" />,
          handler: () => handleDoUndo(true),
        };

      default:
        break;
    }
  };

  const mapper = getMap(purpose);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full h-6 w-6"
      disabled={loading}
      onClick={mapper?.handler}
    >
      {loading ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        mapper?.icon
      )}
    </Button>
  );
};

export default LoadingIconButton;

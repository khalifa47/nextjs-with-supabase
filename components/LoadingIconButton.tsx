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

type Props = {
  purpose: "check" | "edit" | "delete" | "undo";
};
const LoadingIconButton = ({ purpose }: Props) => {
  const [loading, setLoading] = useState(false);
  const mapper = {
    check: <CheckCircleIcon className="h-4 w-4" />,
    edit: <EditIcon className="h-4 w-4" />,
    delete: <Trash2Icon className="h-4 w-4" />,
    undo: <Undo2Icon className="h-4 w-4" />,
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full h-6 w-6"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
      }}
    >
      {loading ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        mapper[purpose]
      )}
    </Button>
  );
};

export default LoadingIconButton;

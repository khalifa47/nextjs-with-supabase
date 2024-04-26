import { TodosContext } from "@/components/providers/TodoProvider";
import { useContext } from "react";

export const useTodos = (): TodoContextType => {
  const context = useContext(TodosContext);
  if (context === null) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};

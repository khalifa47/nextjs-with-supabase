"use client";
import { createContext, useState } from "react";

export const TodosContext = createContext<TodoContextType | null>(null);

const TodoProvider = ({
  children,
  initialTodos,
}: {
  children: React.ReactNode;
  initialTodos: Todo[];
}) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodoProvider;

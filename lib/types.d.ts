type Todo = {
  id: string;
  user_id: string;
  title: string;
  priority: number;
  created_at: string;
  done_at: string | null;
};

type TodoContextType = {
  todos: Todo[];
  setTodos: (todos: React.SetStateAction<Todo[]>) => void;
};

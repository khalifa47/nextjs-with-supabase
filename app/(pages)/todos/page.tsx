import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CreateTodoForm from "@/components/todos/CreateTodoForm";
import TodoList from "@/components/todos/TodoList";
import { Separator } from "@/components/ui/separator";
import TodoProvider from "@/components/providers/TodoProvider";

export default async function TodosPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("priority", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  todos.sort((a, b) => {
    const aIsNull = a.done_at === null;
    const bIsNull = b.done_at === null;

    if (aIsNull && !bIsNull) {
      return -1;
    } else if (!aIsNull && bIsNull) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="w-full max-w-4xl flex items-center flex-col-reverse md:flex-row">
      <TodoProvider initialTodos={todos}>
        <div className="flex flex-col md:flex-row items-center">
          <Separator
            orientation="horizontal"
            className="mx-2 block md:hidden"
          />
          <CreateTodoForm />
          <Separator
            orientation="vertical"
            className="min-h-[calc(100vh-4rem)] ml-5 hidden md:block"
          />
        </div>
        <TodoList />
      </TodoProvider>
    </div>
  );
}

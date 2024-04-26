import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TodoForm from "@/components/todos/TodoForm";
import TodoList from "@/components/todos/TodoList";
import { Separator } from "@/components/ui/separator";

// TODO: introduce context to update state immediately

export default async function TodosPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: todos, error } = await supabase.from("todos").select("*");

  if (error) {
    throw new Error(error.message);
  }

  console.log(todos);

  return (
    <div className="w-full max-w-4xl flex items-center flex-col-reverse md:flex-row">
      <div className="flex flex-col md:flex-row items-center">
        <Separator orientation="horizontal" className="mx-2 block md:hidden" />
        <TodoForm />
        <Separator
          orientation="vertical"
          className="min-h-[calc(100vh-4rem)] ml-5 hidden md:block"
        />
      </div>
      <TodoList todos={todos} />
    </div>
  );
}

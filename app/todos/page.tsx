import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TodoForm from "@/components/todos/TodoForm";

export default async function TodosPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  //   const { data: todos } = await supabase.from("todos").select("*");

  //   console.log(todos);

  return (
    <div className="w-full flex flex-1 items-center justify-center">
      <TodoForm />
    </div>
  );
}

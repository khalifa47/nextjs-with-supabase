"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useTodos } from "@/lib/hooks";
import TodoFormContent from "./TodoFormContent";

export const formSchema = z.object({
  title: z.string().min(2),
  priority: z
    .number()
    .min(1, { message: "Lowest priority is 1" })
    .max(5, { message: "Highest priority is 5" }),
});

const CreateTodoForm = () => {
  const [loading, setLoading] = useState(false);
  const { setTodos } = useTodos();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      priority: 1,
    },
  });

  const onCreate = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const supabase = createClient();

    const { data: newTodo, error } = await supabase
      .from("todos")
      .insert(values)
      .select();

    if (error) {
      form.setError("root", error);
      setLoading(false);
      return;
    } else {
      setTodos((prev) => [...prev, newTodo[0]]);
    }
    setLoading(false);
  };

  return (
    <TodoFormContent form={form} onSubmit={onCreate}>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </TodoFormContent>
  );
};

export default CreateTodoForm;

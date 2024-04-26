"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useTodos } from "@/lib/hooks";

const formSchema = z.object({
  title: z.string().min(2),
  priority: z
    .number()
    .min(1, { message: "Lowest priority is 1" })
    .max(5, { message: "Highest priority is 5" }),
});

const TodoForm = () => {
  const [loading, setLoading] = useState(false);
  const { setTodos } = useTodos();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      priority: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-80 mx-auto space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>This is the title of the task</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={5}
                  onValueChange={(value: any[]) =>
                    form.setValue("priority", value[0])
                  }
                  disabled={field.disabled}
                />
              </FormControl>
              <FormDescription>
                Task priority from 1 (lowest) to 5 (highest)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;

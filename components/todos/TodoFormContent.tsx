import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2),
  priority: z
    .number()
    .min(1, { message: "Lowest priority is 1" })
    .max(5, { message: "Highest priority is 5" }),
});

type TodoFormContentProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  children: React.ReactNode;
};

const TodoFormContent = ({
  form,
  onSubmit,
  children,
}: TodoFormContentProps) => {
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
        {children}
      </form>
    </Form>
  );
};

export default TodoFormContent;

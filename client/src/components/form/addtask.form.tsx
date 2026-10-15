import { add_task } from "@/apis/tasks/tasks.api";
import type { tasksAPI_type } from "@/types/tasks/tasks.type";
import { Button } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
const formSchema = z.object({
  task_name: z.string().nonempty("Please Enter Task Name"),
  status: z.string().nonempty("Please Enter Password"),
  description: z.string(),
  priority: z.string(),
  // created_by: z.string(),
  assignee_to: z.string().optional(),
  task_type: z.string().optional(),
});
const AddtaskForm = () => {
  const initaial_from = useForm<tasksAPI_type>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task_name: "",
      description: "",
      priority: "",
      // created_by: "",
      assignee_to: "",
      task_type: "",
      status: "",
    },
  });

  const Submit_task = async (values: tasksAPI_type) => {
    // const created_by = JSON.stringify(localStorage.getItem("user_id"));
    // values.created_by = created_by;
    const response_add_task = await add_task(values);

    if (response_add_task.sucess === true) {
      console.log("sucessfully added task");
    } else {
      console.log("error");
    }
  };
  return (
    <Form {...initaial_from}>
      <form onSubmit={initaial_from.handleSubmit(Submit_task)}>
        <FormField
          control={initaial_from.control}
          name="task_name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-left text-sm">Email</FormLabel>
              <FormControl>
                <Input placeholder="Task Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={initaial_from.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-left text-sm">description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={initaial_from.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-left text-sm">priority</FormLabel>
              <FormControl>
                <Input placeholder="priority" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={initaial_from.control}
          name="task_type"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-left text-sm">task_type</FormLabel>
              <FormControl>
                <Input placeholder="task_type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={initaial_from.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-left text-sm">status</FormLabel>
              <FormControl>
                <Input placeholder="status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit"> Create </Button>
      </form>
    </Form>
  );
};

export default AddtaskForm;

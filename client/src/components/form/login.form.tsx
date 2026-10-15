import type { login_types } from "@/types/auth/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login_api } from "@/apis/auth/auth.api";

const formSchema = z.object({
  email: z.string().email().nonempty("Please Enter Email"),
  password: z.string().nonempty("Please Enter Password"),
});

const Login_Form = () => {
  const initaial_from = useForm<login_types>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: login_types) => {
    try {
      const response_login = await login_api(value);
      if (response_login.success === true) {
        console.log("sucess");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form {...initaial_from}>
        <form
          onSubmit={initaial_from.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={initaial_from.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-left text-sm">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={initaial_from.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-left text-sm">Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default Login_Form;

import { login_api } from "@/apis/auth/auth.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import type { login_types } from "@/types/auth/login";
import { Form, Formik } from "formik";
//,email,password,phoneno

export default function Login() {
  const initialValues: login_types = { email: "", password: "" };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm rounded-xl">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              const login_response = await login_api(values);

              if (login_response.success) {
                toast.add({ type: "success", title: "Login in succesfull" });
              } else {
                toast.add({ type: "error", title: "Login Unscessfull" });
              }
            }}
          >
            <Form>
              {/* <label htmlFor="email"> Name</label> */}
              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <FieldLabel htmlFor="password">password</FieldLabel>
                <Input
                  id="password"
                  type="text"
                  placeholder="Enter your password"
                />
              </div>

              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

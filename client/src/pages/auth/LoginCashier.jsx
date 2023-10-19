import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormItem, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const LoginCashier = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loginCashier } = useContext(AuthContext);
  const initForm = {
    fullname: "",
    password: "",
  };
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: initForm,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await loginCashier(data);
    },
  });

  const onSubmit = (values) => {
    mutation.mutate({
      ...values,
    });
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(initForm);
    } if (mutation.isSuccess) {
      toast({
        title: "Login Success",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else if (mutation.isError) {
      toast({
        title: "Login Failed",
      });
    }
  }, [form, mutation.isSuccess, mutation.isError]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2">
        <span className="flex items-center gap-2 mb-6">
          <ArrowLeft className="w-6 h-6" onClick={() => navigate("/login")} />
          <Label className="font-bold text-sm">Back</Label>
        </span>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
            <div className="flex gap-4 w-full">
              <div className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="fullname">Username</FormLabel>
                      <FormControl>
                        <Input type="text" id="fullname" placeholder="Mombran_Cricket" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input type="password" id="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Link className="text-sm text-blue-700" to="/send-email">
                    forgot password
                  </Link>
                </div>

                <div className="flex justify-center items-center">
                  <Button
                    className="w-32 text-xl bg-red-500 rounded-lg hover:bg-red-400 ease-in-out duration-300"
                    type="submit"
                  >
                    {mutation.isLoading && <Loader2 className={`animate-spin w-4 h-4`} />}
                    {mutation.isLoading ? "login..." : "Login"}
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <FormLabel>{`Don't have an account yet`}</FormLabel>
                  <Link className="ms-2 font-light text-blue-700 text-sm" to="/register-cashier">
                    here
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default LoginCashier;

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

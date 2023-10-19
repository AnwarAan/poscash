import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormItem, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FormMessage } from "@/components/ui/form";
import { Loader2, ArrowLeft, EyeIcon, EyeOff, Check , X} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editSchema, registerSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAPI, putAPI } from "@/repositories/api";
import { useContext } from "react";
import { AuthContext } from "@/components/auth/AuthContext";

const EditCashier = ({ cashierId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState("false");
  const dataProps = location.state;
  console.log(dataProps);
  const [checked, setChecked] = useState(
    dataProps.cashier.is_status ? dataProps.cashier.is_status : "enabled"
  );

  cashierId = dataProps.cashier.id;
  // console.log(cashierId);

  const { data: user, isFetched, refetch } = useQuery(
    ["user"],
    async () => {
      const res = await getAPI(`user/${cashierId}`);
      // console.log(res.data);
      return res.data;
    },
  );

  // console.log(user);
  const editForm = {
    fullname: dataProps.cashier.fullname ? dataProps.cashier.fullname : "",
    email: dataProps.cashier.email ? dataProps.cashier.email : "",
    phone_number: dataProps.cashier.phone_number ? dataProps.cashier.phone_number : "",
    birthdate: dataProps.cashier.birthdate ? dataProps.cashier.birthdate : "",
    // roleId: 2,
  };

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: editForm,
  });

  const mutation = useMutation({
    mutationFn: async (edit) => {
      return putAPI(`user/update/${cashierId}`, edit);
    }
  });

  const onSubmit = (values) => {
    mutation.mutate({
      ...values,
      is_status: checked
    });
  };

  useEffect(() => {
    refetch()
  }, [mutation, refetch]);

  if (mutation.isSuccess) return navigate("/dashboard/cashier");
  
  return (
    isFetched && (
      <div className="w-full h-screen flex items-start">
      <div className="w-1/2">
      <span className="flex items-center gap-2 mb-6">
          <ArrowLeft className="w-6 h-6" onClick={() => navigate("/dashboard/cashier")} />
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
                      <FormLabel htmlFor="fullname">Full Name</FormLabel>
                      <FormControl>
                        <Input type="text" id="fullname" placeholder="full name"{...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input type="email" id="email" placeholder="example@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="is_status">Disable Cashier</FormLabel>
                      <FormControl>
                        <FormItem className="flex relative">
                          <Input
                            type={checked ? "" : "checked"}
                            id="is_active"
                            {...field}
                          />
                          <FormLabel className="absolute right-0 mr-2" 
                            onClick={() => setChecked(checked === "enabled" ? "disabled" : "enabled")}               
                            >
                            {checked === "disabled" ? <X/> : <Check />}
                          </FormLabel>
                        </FormItem>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="text" id="phone_number" placeholder="08xxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 flex">
                      <FormLabel htmlFor="birthdate">Birth Date</FormLabel>
                      <FormControl>
                        <Input type="date" id="birthdate" placeholder="2023/01/01" {...field} />
                        
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />      

                <div className="flex">
                  <Button
                    className="w-45 text-xl bg-blue-400 rounded-lg hover:bg-blue-700 ease-in-out duration-300"
                    type="submit"
                  >
                    {mutation.isLoading && <Loader2 className={`animate-spin w-4 h-4`} />}
                    {mutation.isLoading ? "submit..." : "Submit Cashier"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
    )
  )
};

export default EditCashier;

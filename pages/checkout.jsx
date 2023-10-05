import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/lib/supabaseClient";
import Cart from "./cart";
import useLocalStorageState from "use-local-storage-state";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Validation needed to be changed",
  }),
  phone: z.string().min(2, {
    message: "Validation needed to be changed",
  }),
});

const Checkout = (props) => {
  const [cartItems, setCartItems] = useLocalStorageState("cartItems");

  console.log("Local Storage Cart Items : ", cartItems);
  //console.log("Local Storage Cart Items : ", localStorage.getItem("cartItems"));

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const { handleSubmit, control } = methods;

  async function onSubmit(data) {
    const { name, email, phone } = data;
    console.log("Name : ", name);
    console.log("Phone : ", phone);
    console.log("Email : ", email);
    try {
      const { error } = await supabase
        .from("customers")
        .insert([{ name, email, phone }]);

      if (error) throw error;
      console.log("Data has been inserted successfully!");
    } catch (error) {
      console.error("Error inserting data: ", error.message);
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-semibold tracking-tight ml-4 my-4">
          Checkout Form
        </h3>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end m-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Checkout;

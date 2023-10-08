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
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

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
  shipping_address: z.string().min(2, {
    message: "Validation needed to be changed",
  }),
});

const Checkout = () => {
  const [cartItems, setCartItems] = useLocalStorageState("cartItems");

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      shipping_address: "",
    },
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const { handleSubmit, control, formState } = methods;

  const onSubmit = async (data) => {
    try {
      const { name, email, phone, shipping_address } = data;
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .insert([{ name, email, phone }])
        .select("*");

      if (customerError) {
        throw customerError;
      }

      console.log(
        "Customer Data has been inserted successfully:",
        customerData
      );
      setCustomerName(customerData[0].name);

      const productIds = cartItems.map((item) => item.product_id);
      console.log("cartItems : ", cartItems);
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            shipping_address,
            customer_id: customerData[0].customer_id,
            product_ids: productIds,
          },
        ])
        .select("*");

      if (orderError) {
        throw orderError;
      }

      console.log("Order Data has been inserted successfully:", orderData);

      setOrderId(orderData[0].order_id);
      setShippingAddress(orderData[0].shipping_address);

      setCartItems([]);
      setOrderPlaced(true);
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return !orderPlaced ? (
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
              {formState.errors.name && (
                <p className="text-red-500">{formState.errors.name.message}</p>
              )}
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
              {formState.errors.phone && (
                <p className="text-red-500">{formState.errors.phone.message}</p>
              )}
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
              {formState.errors.email && (
                <p className="text-red-500">{formState.errors.email.message}</p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="shipping_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {formState.errors.shipping_address && (
                <p className="text-red-500">
                  {formState.errors.shipping_address.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <div className="flex justify-end m-4">
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  ) : (
    <div className="mt-16 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h3 className="text-3xl font-semibold text-green-600 mb-4">
        Order Placed Successfully! 🎉
      </h3>
      <p className="text-lg">
        Dear {customerName}, your order{" "}
        <p className="font-semibold">{orderId}</p>
        <p> has been successfully placed. </p>
      </p>
      <p className="text-lg mt-2">
        It will be shipped to the following address:
      </p>
      <p className="text-lg font-semibold">{shippingAddress}</p>
    </div>
  );
};

export default Checkout;

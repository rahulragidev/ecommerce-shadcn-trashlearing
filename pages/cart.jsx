import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useLocalStorageState from "use-local-storage-state";

const Cart = () => {
  const router = useRouter();
  const { items } = router.query;
  const [cartItems, setCartItems] = useLocalStorageState("cartItems", {
    defaultValue: [],
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchData = async (itemIds) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("id", itemIds);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    /***
     * When you get handleIncrement / decrement we'll update the quantity of that particulr products quantity inside cartItems state
     * Total value = we have to loop through cart items and for each item we have to multiply price * quantity and add all the prices
     */
    if (data) {
      let tempCartItems = [];
      data.forEach((item) => tempCartItems.push({ ...item, quantity: 1 }));
      setCartItems(tempCartItems);
    }
  };

  const handleIncrement = useCallback((productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const handleDecrement = useCallback((productId) => {
    debugger;
    setCartItems((prev) =>
      prev.map((item) =>
        // item.id === productId && item.quantity > 1
        //   ? { ...item, quantity: item.quantity - 1 }
        //   : item
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].product_price * cartItems[i].quantity;
      }
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    if (items) {
      // split items
      const itemIds = items.split(",");
      // fetchData
      fetchData(itemIds);
      return;
    }
    // if items don't exist, setcartItems to empty array
    setCartItems([]);
  }, [items]);

  // const handleDelete = useCallback((productId) => {
  //   console.log("Handle delete executed: ");
  // });

  const handleDelete = useCallback(
    (productId) => {
      console.log("ProductId : ", productId);
      console.log("items : ", items);
      const itemIds = items.split(",");

      console.log("itemIds : ", itemIds);
      const updatedItemIds = itemIds.filter(
        (item) => item !== productId.toString()
      );

      console.log("Updated Items : ", updatedItemIds);
      router.replace(`/cart?items=${updatedItemIds.join(",")}`);
    },
    [items]
  );

  /**
   * on load user has to see the total price of all the products in the cart
   */
  /***
   * When user clicks proceed to checkout, handleCheckout() function does takes all the product Ids
   * and insert data in orders table creating a unique orderid containing all the product Ids in that order and quantity.
   */

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold tracking-tight ml-4">Cart</h3>
      {cartItems.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          handleDelete={() => handleDelete(product.id)}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      ))}
      <h2>Total : ${totalPrice}</h2>
      <Link href={`/checkout?items=${items}`} className="flex justify-end mr-4">
        <Button> Proceed to checkout</Button>
      </Link>
    </div>
  );
};

export default Cart;

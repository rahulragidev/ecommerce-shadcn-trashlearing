import CartItem from "@/components/CartItem";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Cart = (props) => {
  const router = useRouter();
  const { items } = router.query;

  /**
   * TODO:
   * send a fetchData call to DB using the Ids in the URL
   * Iterate cartItem component
   * pass data as props to CartItem component
   */

  useEffect(() => {
    if (typeof items === "string") {
      const itemIds = items.split(",");
      console.log("Item Ids: ", itemIds);
    }
  }, [items]);

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      {/* <Navbar/> */}
      <h3 className="text-2xl font-semibold tracking-tight ml-4">Cart</h3>
      <CartItem />
    </div>
  );
};

export default Cart;

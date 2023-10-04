import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import CartItem from "@/components/CartItem"; // Adjust the import path to your project structure
import Link from "next/link";

const Cart = () => {
  const router = useRouter();
  const { items } = router.query;
  const [productData, setProductData] = useState([]);

  const fetchData = async (itemIds) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("id", itemIds);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setProductData(data || []);
  };

  useEffect(() => {
    if (items) {
      // if items exists, split the strin ginto an array
      const itemIds = items.split(",");
      // fetchData
      fetchData(itemIds);
      return;
    }
    // if items don't exist, setProductData to empty array
    setProductData([]);
  }, [items]);

  const handleDelete = useCallback(
    (productId) => {
      console.log("ProductId : ", productId);
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

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold tracking-tight ml-4">Cart</h3>
      {productData.map((product) => (
        <CartItem
          key={product.id}
          productTitle={product.product_title}
          productDescription={product.product_description}
          productPrice={product.product_price}
          productImage={product.product_image}
          handleDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default Cart;

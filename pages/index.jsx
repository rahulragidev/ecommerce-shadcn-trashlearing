import Image from "next/image";
import { Inter } from "next/font/google";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  //initial load product data
  const [productData, setProductData] = useState([]);
  //filter products based on search query using filter on product data.
  const [filteredProductData, setFilteredProductData] = useState([]);
  //
  const [cartItems, setCartItems] = useState([]);
  //initially searchQuery is empty then all products will be loaded , once the value changes filtered products should be changed
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      console.log("searchQuery : ", !searchQuery);
      fetchData();
    }

    console.log("searchQuery : ", !searchQuery);
    const filteredProducts = productData.filter((product) =>
      product.product_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProductData(filteredProducts);
    console.log("filteredProductData : ", filteredProductData);
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    if (data && data.length > 0) {
      setProductData(data);
      setFilteredProductData(data);
    } else {
      console.log("No data found");
    }
  };

  console.log("Product Data: ", productData);

  const handleOnClick = (product) => {
    if (cartItems.find((item) => item.id === product.id)) {
      // // 1. create a temp array
      // let tempCartItems = [];
      // // 2. Populate the array with existing cartItems, except for the product that's being passed
      // for (let i = 0; i < cartItems.length; i++) {
      //   if (cartItems[i].id !== product.id) {
      //     tempCartItems.push(cartItems[i]);
      //   }
      // }
      // // 3. set the tempArray as the cartItems state
      // setCartItems(tempCartItems);
      // return;

      //debugger;

      let tempItems = [...cartItems];

      // tempItems.filter((item) => item.id !== product.id);

      setCartItems(tempItems.filter((item) => item.id !== product.id));
      return;
    }
    setCartItems((prev) => [...prev, product]);
  };

  console.log("cartItems", cartItems);

  return (
    <>
      <Navbar cartItems={cartItems} />
      <main className="mt-16">
        <h3 className="text-2xl font-semibold tracking-tight ml-4">
          Recommended Products
        </h3>
        <div className="m-4">
          <div className="flex w-full items-center space-x-2 mx-auto">
            <Input
              type="text"
              placeholder="Search for Products"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button type="submit">Search</Button>
          </div>
        </div>

        <div className="flex flex-wrap">
          {filteredProductData.map((product) => (
            <div key={product.id} className="w-full md:w-1/2 lg:w-1/3">
              <ProductCard
                isAdded={cartItems.find((item) => item.id === product.id)}
                productTitle={product.product_title}
                productDescription={product.product_description}
                productPrice={product.product_price}
                productImage={product.product_image}
                onClick={() => handleOnClick(product)}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

import Image from "next/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";

const ProductCard = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleCartToggle = () => {
    setIsAddedToCart((prev) => !prev);
  };
  return (
    <Card className="m-4">
      <CardHeader>
        <img src="https://placehold.co/600x400/png" alt="Product Image" />
        <CardTitle>Black Overfit Tee</CardTitle>
        <CardDescription>Product Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>$49.99</p>
      </CardContent>
      <CardFooter>
        {isAddedToCart ? (
          <Button
            className="w-full text-black bg-green-400 hover:bg-green-500"
            onClick={handleCartToggle}
          >
            Added
          </Button>
        ) : (
          <Button className="w-full" onClick={handleCartToggle}>
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default ProductCard;

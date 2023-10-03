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

const ProductCard = (props) => {
  return (
    <Card className="m-4">
      <CardHeader>
        <img src={props.productImage} alt="Product Image" />
        <CardTitle>{props.productTitle}</CardTitle>
        <CardDescription>{props.productDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>$ {props.productPrice}</p>
      </CardContent>
      <CardFooter>
        {props.isAdded ? (
          <Button
            className="w-full text-black bg-green-400 hover:bg-green-500"
            onClick={props.onClick}
          >
            Remove
          </Button>
        ) : (
          <Button className="w-full" onClick={props.onClick}>
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default ProductCard;

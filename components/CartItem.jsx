import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const { Card, CardHeader, CardTitle, CardContent } = require("./ui/card");

const CartItem = () => {
  const [counter, setCounter] = useState(0);
  const handleCounterIncrement = () => {
    setCounter((counter) => counter + 1);
  };
  const handleCounterDecrement = () => {
    setCounter((counter) => counter - 1);
  };
  return (
    <Card className="flex m-4 items-center">
      <img
        className="w-32 h-32 rounded-lg"
        src="https://placehold.co/600x400/png"
        alt="Product Image"
      />
      <CardContent className="py-2">
        <CardTitle>Black Overfit Tee</CardTitle>
        <p>$49.99</p>
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCounterDecrement}
          >
            <MinusIcon />
          </Button>
          <h1 className="m-2">{counter}</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCounterIncrement}
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default CartItem;

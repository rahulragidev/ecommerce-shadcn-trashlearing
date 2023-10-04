import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const CartItem = (props) => {
  const [counter, setCounter] = useState(1);

  const handleCounterIncrement = () => {
    setCounter((counter) => counter + 1);
  };

  const handleCounterDecrement = () => {
    if (counter > 1) {
      setCounter((counter) => counter - 1);
    } else {
      props.handleDelete();
      console.log("Handle Delete");
    }
  };

  return (
    <Card className="flex m-4 items-center">
      <img
        className="w-32 h-32 rounded-lg"
        src={props.productImage}
        alt="Product Image"
      />
      <CardContent className="py-2">
        <CardTitle>{props.productTitle}</CardTitle>
        <p>${props.productPrice * counter}</p>
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleCounterDecrement()}
          >
            <MinusIcon />
          </Button>
          <h1 className="m-2">{counter}</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleCounterIncrement()}
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;

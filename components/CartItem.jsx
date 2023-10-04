import { CrossIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const CartItem = (props) => {
  const { product, handleIncrement, handleDecrement, handleDelete } = props;

  /**
   * When the user clicks on increment/decrement button, we need to
   * update the price and send the updated price to cart.jsx
   *
   */
  /**
   * Cart item is a dumb component
   * It'll just render image, title price and qantity
   * onClick of decrement/ increment we'll pass handleIncrement / handleDecrement props to the parent
   */
  return (
    <Card className="flex m-4 items-center">
      <img
        className="w-32 h-32 rounded-lg"
        src={product.product_image}
        alt="Product Image"
      />
      <CardContent className="py-2">
        <CardTitle>{product.product_title}</CardTitle>
        <p>${product.product_price}</p>
        <div className="flex">
          {console.log("product Qty: ", product.quantity)}
          {product.quantity > 1 ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDecrement(product.id)}
            >
              <MinusIcon />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDelete(product.id)}
            >
              <MinusIcon />
            </Button>
          )}
          <h1 className="m-2">{product.quantity}</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleIncrement(product.id)}
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;

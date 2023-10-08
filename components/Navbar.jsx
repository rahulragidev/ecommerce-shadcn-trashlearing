import Link from "next/link";
import { Button } from "./ui/button";
import { CircleIcon, ShoppingBagIcon } from "lucide-react";

const Navbar = (props) => {
  const { cartItems } = props;
  const itemIds = cartItems.map((item) => item.id).join(",");
  const url = `/cart?items=${itemIds}`;

  return (
    <div className="flex w-full h-16 p-4 justify-between fixed top-0 bg-white items-center">
      <h1>LOGO</h1>
      <Link href={url}>
        <Button variant="outline" size="icon">
          <ShoppingBagIcon />
          {/* <CircleIcon
            className="bg-red-900 rounded-lg text-black"
            value={cartItems.length}
          /> */}
          <p className="absolute top-0 right-4 text-white rounded-full text-lg font-bold bg-red-600 mt-1">
            {cartItems.length}
          </p>
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;

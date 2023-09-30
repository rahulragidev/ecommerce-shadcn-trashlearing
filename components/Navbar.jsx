import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex w-full h-16 p-4 justify-between fixed top-0 bg-white items-center">
      <h1>LOGO</h1>
      <Link href="/cart">
        <Button variant="outline" size="icon">
          <ShoppingBagIcon />
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;

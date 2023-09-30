import CartItem from "@/components/CartItem";

const Cart = () => {
  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold tracking-tight ml-4">Cart</h3>
      <CartItem />
    </div>
  );
};
export default Cart;

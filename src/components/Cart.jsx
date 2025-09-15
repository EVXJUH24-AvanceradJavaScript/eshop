import { useCart } from "../states/cart";
import "../styles/Cart.css";

export function Cart() {
  const addCartItemAmount = useCart((state) => state.addCartItemAmount);
  const reduceCartItemAmount = useCart((state) => state.reduceCartItemAmount);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const cart = useCart((state) => state.cart);
  const open = useCart((state) => state.cartOpen);

  return (
    <section className={"cart" + (open ? " cart-open" : "")}>
      <h2>Cart</h2>

      {cart.map((item) => (
        <article>
          <h3>{item.title}</h3>
          <div>Count: {item.count}</div>
          <button onClick={() => addCartItemAmount(item)}>+</button>
          <button onClick={() => reduceCartItemAmount(item)}>-</button>
          <button onClick={() => removeFromCart(item)}>X</button>
        </article>
      ))}
    </section>
  );
}

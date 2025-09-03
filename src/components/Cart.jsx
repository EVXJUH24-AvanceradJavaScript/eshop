import "../styles/Cart.css";

export function Cart({
  cart,
  setCart,
  open,
  removeFromCart,
  addCartItemAmount,
  reduceCartItemAmount,
}) {
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

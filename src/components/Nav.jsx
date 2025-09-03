import { HOME_PAGE, SHOP_PAGE } from "../App";

export function Nav({ changePage, setCartOpen }) {
  return (
    <nav>
      <ul>
        <li>
          {/* Anropa funktion, som kommer från App.jsx, för att byta sida */}
          <button onClick={() => changePage(HOME_PAGE)}>Home</button>
        </li>
        <li>
          <button onClick={() => changePage(SHOP_PAGE)}>Shop</button>
        </li>
        <li>
          <button onClick={() => setCartOpen((current) => !current)}>
            Cart
          </button>
        </li>
      </ul>
    </nav>
  );
}

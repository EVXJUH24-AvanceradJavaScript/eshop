import { Link } from "react-router";
import { HOME_PAGE, SHOP_PAGE } from "../App";

export function Nav({ setCartOpen }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to={HOME_PAGE}>Home</Link>
        </li>
        <li>
          <Link to={SHOP_PAGE}>Shop</Link>
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

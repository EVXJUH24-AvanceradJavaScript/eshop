import { Link } from "react-router";
import { HOME_PAGE, SHOP_PAGE } from "../App";
import { useCart } from "../states/cart";
import { Anchor, Button, Nav } from "grommet";

export function Navbar() {
  const setCartOpen = useCart((state) => state.setCartOpen);

  return (
    <Nav direction="row" background="brand" pad={"small"} align="center">
      <Link to={HOME_PAGE}>
        <Anchor label="Home" />
      </Link>
      <Link to={SHOP_PAGE}>
        <Anchor label="Shop" />
      </Link>
      <Button
        onClick={() => setCartOpen((current) => !current)}
        label="Cart"
        primary
      />
    </Nav>
  );
}

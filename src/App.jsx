import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./components/Cart";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

// Konstanter för att skilja på sidor och enkelt hantera dem
export const HOME_PAGE = "/";
export const SHOP_PAGE = "/shop";
export const PRODUCT_PAGE = "/product/";

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartStorage);
  }, []);

  const addToCart = (product) => {
    setCart((current) => {
      let newCart = [...current, { ...product, count: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (product) => {
    setCart((current) => {
      let newCart = current.filter((all) => all.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const isInCart = (product) => {
    return cart.find((item) => item.id === product.id) !== undefined;
  };

  const addCartItemAmount = (product) => {
    setCart((current) => {
      let newCart = current.map((item) => {
        if (item.id !== product.id) {
          return item;
        }

        return { ...item, count: item.count + 1 };
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const reduceCartItemAmount = (product) => {
    if (product.count <= 1) {
      removeFromCart(product);
      return;
    }

    setCart((current) => {
      let newCart = current.map((item) => {
        if (item.id !== product.id) {
          return item;
        }

        return { ...item, count: item.count - 1 };
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              addCartItemAmount={addCartItemAmount}
              reduceCartItemAmount={reduceCartItemAmount}
              removeFromCart={removeFromCart}
              cart={cart}
              setCart={setCart}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route
            path="product/:id"
            element={
              <ProductPage
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                isInCart={isInCart}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout({
  cart,
  setCart,
  cartOpen,
  removeFromCart,
  addCartItemAmount,
  reduceCartItemAmount,
  setCartOpen,
}) {
  return (
    <div id="app">
      <Cart
        cart={cart}
        setCart={setCart}
        open={cartOpen}
        removeFromCart={removeFromCart}
        addCartItemAmount={addCartItemAmount}
        reduceCartItemAmount={reduceCartItemAmount}
      />
      <Nav setCartOpen={setCartOpen} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

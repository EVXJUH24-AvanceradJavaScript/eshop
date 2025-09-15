import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./components/Cart";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { useCart } from "./states/cart";
import { Grommet } from "grommet";

// Konstanter för att skilja på sidor och enkelt hantera dem
export const HOME_PAGE = "/";
export const SHOP_PAGE = "/shop";
export const PRODUCT_PAGE = "/product/";

function App() {
  const setCart = useCart((state) => state.setCart);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartStorage);
  }, []);

  return (
    <Grommet full>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Grommet>
  );
}

function Layout() {
  return (
    <div id="app">
      <Cart />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

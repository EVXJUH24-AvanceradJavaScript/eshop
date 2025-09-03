import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./components/Cart";

// Konstanter för att skilja på sidor och enkelt hantera dem
export const HOME_PAGE = "home";
export const SHOP_PAGE = "shop";
export const PRODUCT_PAGE = "product";

function App() {
  // En state för att hålla koll på vilken sida som är "aktiv" (manuell routing)
  const [page, setPage] = useState(SHOP_PAGE);
  // En state för att hålla koll på sido-specifik relevant data (som e.g. vilken produkt vi har tryckt på (id))
  const [pageData, setPageData] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartStorage);
  }, []);

  // En funktion för att ändra aktiv sida
  const changePage = (page) => {
    // Anropa state funktion för att ändra sida
    setPage(page);
  };

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

  // Variabel som bestämmer vilken page-komponent som skall visas, eller 404 om inget hittades
  let content = <div>404 Not Found</div>;
  if (page === HOME_PAGE) {
    // Skicka med funktioner och data för att ändra sida och sidodata
    content = (
      <HomePage
        changePage={changePage}
        pageData={pageData}
        setPageData={setPageData}
      />
    );
  } else if (page === SHOP_PAGE) {
    content = (
      <ShopPage
        changePage={changePage}
        pageData={pageData}
        setPageData={setPageData}
      />
    );
  } else if (page === PRODUCT_PAGE) {
    content = (
      <ProductPage
        changePage={changePage}
        pageData={pageData}
        setPageData={setPageData}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isInCart={isInCart}
      />
    );
  }

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
      <Nav changePage={changePage} setCartOpen={setCartOpen} />
      <main>{content}</main>
      <Footer />
    </div>
  );
}

export default App;

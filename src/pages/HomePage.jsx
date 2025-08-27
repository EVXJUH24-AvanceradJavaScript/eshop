import { useEffect, useState } from "react";
import { PRODUCT_PAGE } from "../App";
import { Hero } from "../components/Hero";
import { ProductDisplayGrid } from "../components/ProductDisplayGrid";
import { apiGetProducts } from "../api/products";

export function HomePage({ setPageData, changePage }) {
  // En state för att spara produkter som vi hämtar från DummyJSON
  const [products, setProducts] = useState([]);

  // Vi vill hämta produkterna EN gång när vi besöker Home sidan
  useEffect(() => {
    // Anropa funktionen för att hämta produkter från API:et och lagra i state
    apiGetProducts().then(setProducts);
  }, []);

  return (
    <div>
      <Hero />

      {/* Skicka med produkter från state till grid komponenten för rendering */}
      {/* Skicka också med sidofunktioner för att kunna byta sida (när man trycker på en produkt) */}
      <ProductDisplayGrid
        title="Featured Products"
        maxProducts={6}
        allProducts={products}
        setPageData={setPageData}
        changePage={changePage}
      />
    </div>
  );
}

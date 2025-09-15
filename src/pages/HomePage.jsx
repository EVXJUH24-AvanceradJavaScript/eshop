import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { ProductDisplayGrid } from "../components/ProductDisplayGrid";
import { apiGetProducts } from "../api/products";
import { Page, PageContent } from "grommet";

export function HomePage() {
  // En state för att spara produkter som vi hämtar från DummyJSON
  const [products, setProducts] = useState([]);

  // Vi vill hämta produkterna EN gång när vi besöker Home sidan
  useEffect(() => {
    // Anropa funktionen för att hämta produkter från API:et och lagra i state
    apiGetProducts().then(setProducts);
  }, []);

  return (
    <Page kind="wide">
      <PageContent>
        <Hero />

        {/* Skicka med produkter från state till grid komponenten för rendering */}
        {/* Skicka också med sidofunktioner för att kunna byta sida (när man trycker på en produkt) */}
        <ProductDisplayGrid
          title="Featured Products"
          maxProducts={6}
          allProducts={products}
        />
      </PageContent>
    </Page>
  );
}

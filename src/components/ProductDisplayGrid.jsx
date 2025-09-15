import { Box, Card, Grid } from "grommet";
import { PRODUCT_PAGE } from "../App";
import { ProductCard } from "./ProductCard";

export function ProductDisplayGrid({ title, allProducts, maxProducts }) {
  // Använd endast en del av hela arrayen genom att slica bort ett visst antal produkter
  const products = allProducts.slice(0, maxProducts);

  return (
    <section>
      <div>
        <h2>{title}</h2>
        <button>See All</button>
      </div>
      <Box direction="row" wrap gap="medium" justify="around" cssGap>
        {products.map((product) => (
          // Mappa ut varje produkt till en ProductCard komponent och skicka med nödvändig information
          <ProductCard product={product} key={product.id} />
        ))}
      </Box>
    </section>
  );
}

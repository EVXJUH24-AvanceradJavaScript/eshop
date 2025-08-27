import { PRODUCT_PAGE } from "../App";
import { ProductCard } from "./ProductCard";

export function ProductDisplayGrid({
  title,
  allProducts,
  maxProducts,
  changePage,
  setPageData,
}) {
  // Använd endast en del av hela arrayen genom att slica bort ett visst antal produkter
  const products = allProducts.slice(0, maxProducts);

  return (
    <section>
      <div>
        <h2>{title}</h2>
        <button>See All</button>
      </div>
      <div>
        {products.map((product) => (
          // Mappa ut varje produkt till en ProductCard komponent och skicka med nödvändig information
          <ProductCard
            product={product}
            key={product.id}
            onClick={() => {
              setPageData({ productId: product.id });
              changePage(PRODUCT_PAGE);
            }}
          />
        ))}
      </div>
    </section>
  );
}

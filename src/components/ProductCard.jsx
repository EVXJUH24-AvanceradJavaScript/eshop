import { Link } from "react-router";
import { PRODUCT_PAGE } from "../App";

export function ProductCard({ product }) {
  return (
    <article>
      <img src={product.thumbnail} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <Link to={PRODUCT_PAGE + product.id}>Learn More</Link>
    </article>
  );
}

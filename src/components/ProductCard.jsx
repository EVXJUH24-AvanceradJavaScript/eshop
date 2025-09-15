import { Link } from "react-router";
import { PRODUCT_PAGE } from "../App";
import { Card, CardBody, CardFooter, CardHeader } from "grommet";

export function ProductCard({ product }) {
  return (
    <Card width="medium">
      <CardHeader pad="medium">
        <img src={product.thumbnail} />
      </CardHeader>
      <CardBody pad="medium">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </CardBody>
      <CardFooter pad="medium">
        <Link to={PRODUCT_PAGE + product.id}>Learn More</Link>
      </CardFooter>
    </Card>
  );
}

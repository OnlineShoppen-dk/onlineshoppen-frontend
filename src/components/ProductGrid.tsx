import { Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

const ProductGrid = () => {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) return <p>Loading products...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={5}>
      {products?.map((product) => (
        <ProductCard product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;

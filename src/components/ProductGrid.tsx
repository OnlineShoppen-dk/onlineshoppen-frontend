import { Button, Grid, HStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import useProductQueryStore from "../store/productStore";
import ProductCardContainer from "./ProductCardContainer";

const ProductGrid = () => {
  const { productQuery, setPage } = useProductQueryStore();

  const { data: products, error, isLoading, isPlaceholderData } = useProducts();

  const hasNextPage = products?.length == productQuery.pageSize;

  if (isLoading) return <p>Loading products...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={5}>
        {products?.map((product) => (
          <ProductCardContainer key={product.id}>
            <ProductCard product={product} />
          </ProductCardContainer>
        ))}
      </Grid>
      <HStack marginY={2}>
        <Button
          onClick={() => {
            setPage(productQuery.page - 1);
            window.scrollTo(0, 0);
          }}
          isDisabled={productQuery.page === 1}
          className="btn btn-primary mt-3"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            if (!isPlaceholderData && hasNextPage) {
              setPage(productQuery.page + 1);
              window.scrollTo(0, 0);
            }
          }}
          isDisabled={isPlaceholderData || !hasNextPage}
          className="btn btn-primary mt-3 ms-2"
        >
          Next
        </Button>
      </HStack>
    </>
  );
};

export default ProductGrid;

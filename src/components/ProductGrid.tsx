import { Button, Grid, HStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import { useState } from "react";

const ProductGrid = () => {
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const {
    data: products,
    error,
    isLoading,
    isPlaceholderData,
  } = useProducts({ page, pageSize });

  const hasNextPage = products?.length == pageSize;

  if (isLoading) return <p>Loading products...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={5}>
        {products?.map((product) => (
          <ProductCard product={product} />
        ))}
      </Grid>
      <HStack marginY={2}>
        <Button
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
          }}
          isDisabled={page === 1}
          className="btn btn-primary mt-3"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (!isPlaceholderData && hasNextPage) {
              setPage(page + 1);
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

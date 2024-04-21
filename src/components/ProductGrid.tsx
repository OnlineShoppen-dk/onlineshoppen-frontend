import { Grid } from "@chakra-ui/react";
import ProductCard, { Product } from "./ProductCard";
import image from "../assets/toaster-image.jpg";

const ProductGrid = () => {
  const product: Product = {
    ProductName: "Test",
    ImageUrl: image,
    Price: 199,
  };

  function GetProducts(): Product[] {
    const products: Product[] = [];
    for (let index = 0; index < 20; index++) {
      products.push(product);
    }

    return products;
  }

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={5}>
      {GetProducts().map((product) => (
        <ProductCard product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;

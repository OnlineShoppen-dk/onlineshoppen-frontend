import { Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import image from "../assets/toaster-image.jpg";
import { Product } from "../interfaces/product";

const ProductGrid = () => {
  const product: Product = {
    Name: "Test",
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

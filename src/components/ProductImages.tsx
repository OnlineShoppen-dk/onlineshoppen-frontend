import { SimpleGrid } from "@chakra-ui/react";
import { Product } from "../interfaces/product";
import ProductImage from "./ProductImage";

interface Props {
  product: Product;
}

const ProductImages = ({ product }: Props) => {
  return (
    <SimpleGrid
      spacing={2}
      columns={{
        base: 1,
        md: 2,
        lg: 3,
      }}
    >
      {/* {images.map((image) => (
        <Image key={image.id} src={image.fileName} />
      ))} */}
      <ProductImage product={product} />
    </SimpleGrid>
  );
};

export default ProductImages;

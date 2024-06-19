import { Image, SimpleGrid } from "@chakra-ui/react";
import { Product, Image as ProductImage } from "../interfaces/product";
import toasterImage from "../assets/toaster-image.jpg";

interface Props {
  product: Product;
}

const ProductImages = ({ product }: Props) => {
  const placeholderImage: ProductImage = {
    id: -1,
    fileName: toasterImage,
    alt: "toaster-picture",
    name: "placeholder",
  };
  const images =
    product.images.length > 0 ? product.images : [placeholderImage];

  return (
    <SimpleGrid
      spacing={2}
      columns={{
        base: 1,
        md: 2,
        lg: 3,
      }}
    >
      {images.map((image) => (
        <Image key={image.id} src={image.fileName} />
      ))}
    </SimpleGrid>
  );
};

export default ProductImages;

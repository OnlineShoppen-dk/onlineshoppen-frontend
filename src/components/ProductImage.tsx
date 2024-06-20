import { Image } from "@chakra-ui/react";
import { Product } from "../interfaces/product";
import toasterImage from "../assets/toaster-image.jpg";
import getImageUrl from "../services/get-image-url";

interface Props {
  product: Product;
}

const ProductImage = ({ product }: Props) => {
  const imageUrl = product.images[0]?.fileName
    ? getImageUrl(product.images[0]?.fileName)
    : toasterImage;

  return <Image src={imageUrl}></Image>;
};

export default ProductImage;

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from "@chakra-ui/react";
import { Product } from "../interfaces/product";
import image from "../assets/toaster-image.jpg";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <CardHeader fontSize={24}>{product.name}</CardHeader>
      <CardBody>
        <Image src={image} />
      </CardBody>
      <CardFooter>
        <Text>{product.price},-</Text>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

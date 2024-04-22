import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from "@chakra-ui/react";
import { Product } from "../interfaces/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <CardHeader fontSize={24}>{product.Name}</CardHeader>
      <CardBody>
        <Image src={product.ImageUrl} />
      </CardBody>
      <CardFooter>
        <Text>{product.Price},-</Text>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

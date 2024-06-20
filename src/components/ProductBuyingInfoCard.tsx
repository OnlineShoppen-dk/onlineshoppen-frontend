import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Product } from "../interfaces/product";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
}

const ProductAddToCartElement = ({ product }: Props) => {
  let stockTextColor = "green.400";
  let stockText = "In stock!";

  const isProductOutOfStock = product.stock < 1;

  if (isProductOutOfStock) {
    stockTextColor = "red";
    stockText = "Out of stock";
  }

  return (
    <Card variant={"filled"} boxShadow="lg" width={300}>
      <CardHeader>
        <Heading size={"lg"}>Buy now!</Heading>
        <Text color="blue.600" fontSize="2xl">
          {product.price} kr
        </Text>
      </CardHeader>
      <CardBody>
        <Text color={stockTextColor}>{stockText}</Text>
        <Text fontSize="xs">Shipping time: 1 day to 99 weeks</Text>
      </CardBody>
      <CardFooter>
        <VStack align={"left"}>
          <AddToCartButton
            isDisabled={isProductOutOfStock}
            product={product}
          ></AddToCartButton>
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default ProductAddToCartElement;

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsCart4 } from "react-icons/bs";
import { Product } from "../interfaces/product";

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
          <Button isDisabled={isProductOutOfStock} colorScheme="blue">
            <HStack spacing={2}>
              <BsCart4 />
              <Text>Add to cart</Text>
            </HStack>
          </Button>
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default ProductAddToCartElement;

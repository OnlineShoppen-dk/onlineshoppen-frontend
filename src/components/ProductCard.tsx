import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Product } from "../interfaces/product";
import { Link, useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import ProductImage from "./ProductImage";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const productDetailsPage = `/products/${product.id}`;
  function handleClick() {
    navigate(productDetailsPage);
  }

  return (
    <Card>
      <CardHeader fontSize={24}>
        <Link to={productDetailsPage}>{product.name}</Link>
      </CardHeader>
      <CardBody onClick={handleClick}>
        <ProductImage product={product} />
      </CardBody>
      <CardFooter>
        <HStack justifyContent="space-between" w="full">
          <Text color="blue.600" fontSize="2xl">
            {product.price} kr
          </Text>
          <AddToCartButton
            isDisabled={product.stock == 0}
            logoOnly={true}
            size="lg"
            product={product}
          />
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

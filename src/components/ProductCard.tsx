import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

export interface Product {
  ProductName: string;
  ImageUrl: string;
  Price: number;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <CardHeader fontSize={24}>{product.ProductName}</CardHeader>
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

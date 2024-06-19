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
import { Link, useNavigate } from "react-router-dom";

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
        <Image src={image} />
      </CardBody>
      <CardFooter>
        <Text>{product.price},-</Text>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

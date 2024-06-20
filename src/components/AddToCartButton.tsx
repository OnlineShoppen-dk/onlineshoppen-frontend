import { Button, HStack, Text } from "@chakra-ui/react";
import { BsCart4 } from "react-icons/bs";
import { Product } from "../interfaces/product";

interface Props {
  isDisabled: boolean;
  logoOnly?: boolean;
  size?: string;
  product: Product;
}

const AddToCartButton = ({ isDisabled, logoOnly, size }: Props) => {
  return (
    <>
      <Button isDisabled={isDisabled} colorScheme="blue" size={size ?? "md"}>
        <HStack spacing={2}>
          <BsCart4 />
          {!logoOnly ? <Text>Add to cart</Text> : ""}
        </HStack>
      </Button>
    </>
  );
};

export default AddToCartButton;

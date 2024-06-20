import {
  SimpleGrid,
  GridItem,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import ExpandableText from "../components/ExpandableText";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import ProductImages from "../components/ProductImages";
import ProductAddToCartElement from "../components/ProductBuyingInfoCard";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const { data: product, isLoading, error } = useProduct(productId!);

  if (isLoading) return <Spinner />;
  if (error || !product) throw error;

  return (
    <>
      <SimpleGrid
        paddingTop={2}
        columns={{
          lg: 3,
          sm: 1,
        }}
        spacing={0}
        marginX={5}
      >
        <GridItem colSpan={2}>
          <Heading paddingBottom={5}>{product.name}</Heading>
          <ProductImages product={product} />
          <Stack paddingY={4}>
            <Heading size={"md"}>Product description</Heading>
            <ExpandableText>{product.description}</ExpandableText>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <ProductAddToCartElement product={product} />
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default ProductDetailsPage;

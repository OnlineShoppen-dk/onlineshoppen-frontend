import { VStack } from "@chakra-ui/react";
import ProductGrid from "../components/ProductGrid";
import FiltersCard from "../components/FiltersCard";

const HomePage = () => {
  return (
    <VStack alignItems={"flex-start"} marginX={3}>
      <FiltersCard />
      <ProductGrid />
    </VStack>
  );
};

export default HomePage;

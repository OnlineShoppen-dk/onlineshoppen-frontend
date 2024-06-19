import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import ProductGrid from "../components/ProductGrid";
import SortSelector from "../components/SortSelector";
import PriceRangeSelector from "../components/PriceRangeSelector";
import ResetFiltersButton from "../components/ResetFiltersButton";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: "main",
        lg: `"main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr",
      }}
    >
      <Show above="lg">
        <GridItem gridArea={"aside"} paddingX={5}>
          {/* <GenreList /> */}
        </GridItem>
      </Show>
      <GridItem gridArea={"main"}>
        <Box paddingLeft={2}>
          {/* <GameHeading /> */}
          <HStack spacing={5} marginBottom={5}>
            <SortSelector />
            <PriceRangeSelector />
            <ResetFiltersButton />
          </HStack>
        </Box>
        <ProductGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;

import { Grid, GridItem } from "@chakra-ui/react";
import ProductGrid from "./components/ProductGrid";
import SearchInput from "./components/SearchInput";
import { ProductQuery } from "./hooks/useProducts";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [productQuery, setProductQuery] = useState<ProductQuery>(
    {} as ProductQuery
  );

  return (
    <>
      <Link to={"test"}>Test</Link>
      <Grid
        templateAreas={`"header header"
        "header header"
                  "nav main"
                  "nav main"
                  "nav main"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="" area={"header"}>
          <SearchInput
            onSearch={(searchText) =>
              setProductQuery({ ...productQuery, searchText })
            }
          />
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={"nav"}>
          Nav
        </GridItem>
        <GridItem pl="2" area={"main"}>
          <ProductGrid productQuery={productQuery} />
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </>
  );
}

export default App;

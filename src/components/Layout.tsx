import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SearchInput from "./SearchInput";

// Move to pages folder

const Layout = () => {
  return (
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
        <SearchInput />
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        Nav
      </GridItem>
      <GridItem pl="2" area={"main"}>
        <Outlet />
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default Layout;

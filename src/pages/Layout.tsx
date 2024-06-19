import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <Grid
      templateAreas={`"header"
            "main"
            "footer"`}
      gridTemplateRows={"50px 1fr 60px"}
      gridTemplateColumns={"1fr"}
      h="200px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="" area={"header"}>
        <NavBar />
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}></GridItem>
      <GridItem pl="2" area={"main"}>
        <Outlet />
      </GridItem>
      <GridItem pl="2" bg="gray.100" area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Layout;

import { Button, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import useAuth from "../hooks/useAuth";
import useAuthStore from "../store/authStore";


const Layout = () => {

  const {logout: logoutApi} = useAuth();
  const {logout: logoutStore} = useAuthStore();
  const {user} = useAuthStore();

  const navigate = useNavigate()

  const handleLogout = () => {
    logoutApi.mutateAsync();
    logoutStore();
    navigate("/login")
  };

  const handleLogin = () => {
    navigate("/login");
  };

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
      {user ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
            <h1>You are logged in as:</h1>
            <h1>{user.firstName}</h1>
            <h1>{user.email}</h1>
          </>
        ) : (
          <Button onClick={handleLogin}>Login</Button>
        )}

        <Button>Cart</Button>
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

import { Button, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { BsHouse } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import useAuthStore from "../store/authStore";

const NavBar = () => {
  const { logout: logoutApi } = useAuth();
  const { logout: logoutStore } = useAuthStore();
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutApi.mutateAsync();
    logoutStore();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <HStack justifyContent="space-between" paddingX={3}>
      <Link to="/">
        <BsHouse size={28} />
      </Link>
      <SearchInput />
      {user ? (
        <>
          <Button onClick={handleLogout}>Logout</Button>
          <h1>Welcome</h1>
          <h1>{user.firstName}</h1>
          <h1>{user.email}</h1>
        </>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;

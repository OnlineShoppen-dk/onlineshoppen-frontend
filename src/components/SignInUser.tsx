import { FormEvent, ChangeEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import useAuthStore from "../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorResponse } from "../interfaces/auth";


const SignInUser = () => {
  const { login: loginApi } = useAuth();
  const { login: loginStore } = useAuthStore();
  const {getUserDetails} = useAuth();
  const [profile, setProfile] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = profile;

    try {
      await loginApi.mutateAsync({ email, password });

      const response = await getUserDetails.mutateAsync();
      loginStore(response.data.firstName,email);
      navigate("/");
    } catch (errorRes: unknown) {
      const error = errorRes as ErrorResponse
      console.log("errorr here", error)
      toast.error(error.response.data.msg);
      console.error("Login failed:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
<ToastContainer
        autoClose={3000}
        closeOnClick={true}
        position="top-center"
        limit={3}
      />
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <Text>
              Har du ikke oprettet en konto? <Link href="/register">Opret her</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </FormControl>
              <HStack justify="space-between">
                <Button variant="text" size="sm">
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button
                  backgroundColor={"#3283ff"}
                  color={"white"}
                  _hover={{ backgroundColor: "#1e72e8" }}
                  type="submit"
                >
                  Log in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignInUser;

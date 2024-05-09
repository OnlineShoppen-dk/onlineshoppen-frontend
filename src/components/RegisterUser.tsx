import { FormEvent, ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Link,
  Text,
  Container,
  Heading,
} from "@chakra-ui/react";
import { v4 } from "uuid";
import useAuth from "../hooks/useAuth";

const RegisterUser = () => {
  const { registerUser, registerUserDetails } = useAuth()
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });


  const guid = v4();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
    } = profile;

    if (confirmPassword && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    registerUser.mutateAsync({ email, password, guid });
    registerUserDetails.mutateAsync({
      guid,
      firstName,
      lastName,
      email,
      phoneNumber,
    });
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
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>Create an account</Heading>
            <Text color="fg.muted">
              Har du oprettet en konto? <Link href="/login">Log in her</Link>
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
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                />
              </FormControl>
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
              <FormControl>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                <Input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing="6">
                <Button
                  backgroundColor={"#3283ff"}
                  color={"white"}
                  _hover={{ backgroundColor: "#1e72e8" }}
                  type="submit"
                >
                  Opret konto
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterUser;

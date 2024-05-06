import useRegister from "../hooks/useRegister";
import { FormEvent, ChangeEvent, useState } from "react";
import { Button, FormControl, FormLabel, Input, Stack,Box,Flex } from "@chakra-ui/react";
import { v4 } from "uuid";

const Register = () => {
  const { registerUser, registerUserDetails } = useRegister();
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
    const { firstName, lastName, email,password,confirmPassword, phoneNumber } = profile;

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
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Box bg="powderblue" p={6} borderRadius="md" width="fit-content">
      <Stack spacing={4} align="center">
        <h2>Opret konto</h2>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Fornavn:</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Efternavn:</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Adgangskode:</FormLabel>
            <Input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
              <FormLabel>Gentag adgangskode:</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleChange}
              />
            </FormControl>
          <FormControl isRequired>
            <FormLabel>Mobilnummer:</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" mt={5} alignSelf="flex-end">Opret</Button>
        </form>
      </Stack>
    </Box>
  </Flex>
  );
};

export default Register;

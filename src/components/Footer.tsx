import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <HStack
      alignItems={"flex-start"}
      justifyContent={"start"}
      spacing={"5"}
      marginY={5}
      marginX={4}
    >
      <Link to="about">About us</Link>
      <Link to="contact">Contact</Link>
    </HStack>
  );
};

export default Footer;

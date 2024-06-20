import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useProductQueryStore from "../store/productStore";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { setSearchText } = useProductQueryStore();
  const navigate = useNavigate();

  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      style={{ width: "100%" }}
      onSubmit={(event) => {
        event.preventDefault();
        setSearchText(ref.current?.value || "");
        navigate("/");
      }}
    >
      <InputGroup w="full">
        <InputLeftElement pointerEvents="none">
          <BsSearch />
        </InputLeftElement>
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search products..."
          variant="filled"
          flex="1"
          width="100%"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;

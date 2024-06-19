import { Button } from "@chakra-ui/react";
import useProductQueryStore from "../store/productStore";

const ResetFiltersButton = () => {
  const { setDefaultProductQuery } = useProductQueryStore();
  return (
    <>
      <Button colorScheme={"orange"} onClick={setDefaultProductQuery}>
        Reset filters
      </Button>
    </>
  );
};

export default ResetFiltersButton;

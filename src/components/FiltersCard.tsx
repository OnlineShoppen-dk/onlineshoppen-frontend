import { Card, CardBody, HStack } from "@chakra-ui/react";
import PriceRangeSelector from "./PriceRangeSelector";
import ResetFiltersButton from "./ResetFiltersButton";
import SortSelector from "./SortSelector";

const FiltersCard = () => {
  return (
    <>
      <Card>
        <CardBody>
          <HStack margin={-2} marginY={-5}>
            <SortSelector />
            <PriceRangeSelector />
            <ResetFiltersButton />
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default FiltersCard;

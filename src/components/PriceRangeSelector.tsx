import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";
import useProductQueryStore from "../store/productStore";

const PriceRangeSelector = () => {
  const { setPriceRange, productQuery } = useProductQueryStore();

  const defaultMinPrice = 0;
  const defaultMaxPrice = 10000;

  return (
    <Box p={5}>
      <Stack spacing={4}>
        <Text fontSize="lg">Price Range</Text>
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={[defaultMinPrice, defaultMaxPrice]}
          min={defaultMinPrice}
          max={defaultMaxPrice}
          step={50}
          onChangeEnd={(val) => setPriceRange(val[0], val[1])}
          width={300}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Text>
          Selected range: {productQuery.minPrice ?? defaultMinPrice} -{" "}
          {productQuery.maxPrice ?? defaultMaxPrice}
        </Text>
      </Stack>
    </Box>
  );
};

export default PriceRangeSelector;

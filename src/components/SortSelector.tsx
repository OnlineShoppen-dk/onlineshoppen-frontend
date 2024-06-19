import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useProductQueryStore from "../store/productStore";

const SortSelector = () => {
  const sortOrder = useProductQueryStore(
    (state) => state.productQuery.sortOrder
  );
  const setSortOrder = useProductQueryStore((state) => state.setSortOrder);

  const sortOrders = [
    { value: "", name: "Default" }, //default
    { value: "name_asc", name: "Alphabetically (a-z)" },
    { value: "name_desc", name: "Alphabetically (z-a)" },
    { value: "price_asc", name: "Price (low to high)" },
    { value: "price_desc", name: "Price (high to low)" },
  ];

  const selectedSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {selectedSortOrder?.name ?? "Default"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem key={order.value} onClick={() => setSortOrder(order.value)}>
            {order.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;

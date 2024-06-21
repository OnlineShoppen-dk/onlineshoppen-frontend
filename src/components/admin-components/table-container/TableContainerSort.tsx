import { Box, Button, Flex, Switch, Text } from "@chakra-ui/react";
import useAdminProductQueryStore from "../../../store/admin-store/adminProductStore";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TableContainerSortProps {
    sortFields: string[];
}

function TableContainerSort({ ...props }: TableContainerSortProps) {
    const { adminProductQuery, setSort, setIncludeRemoved } = useAdminProductQueryStore();
    const { sortFields } = props;

    const handleSort = (sort: string) => {
        const [value, dir] = adminProductQuery.sort?.split("_") || [null, null];
        if (value === sort) {
            switch (dir) {
                case "asc":
                    setSort(sort + "_desc");
                    break;
                case "desc":
                    setSort(sort + "_asc");
                    break;
                default:
                    setSort(sort + "_asc");
            }
        } else {
            setSort(sort + "_asc");
        }
    };

    return (
        <Box display="flex" gap={1}>
            {sortFields.map((sort) => (
                <Box key={sort} gap={4}>
                    <Button size={"xs"} onClick={() => handleSort(sort)}>
                        <Flex gap={1} alignItems="center">
                            {sort}
                            {adminProductQuery.sort?.includes(sort) ? (
                                <>{adminProductQuery.sort?.includes("asc") ? <IoIosArrowUp /> : <IoIosArrowDown />}</>
                            ) : (
                                <></>
                            )}
                        </Flex>
                    </Button>
                </Box>
            ))}
            <Flex gap={2} ml={4} alignItems="center" justifyContent="center">
                <Text fontSize={"xs"}>Removed</Text>
                <Switch
                    size="sm"
                    colorScheme="blue"
                    isChecked={adminProductQuery.includeRemoved}
                    onChange={() => setIncludeRemoved(!adminProductQuery.includeRemoved)}
                />
            </Flex>
        </Box>
    );
}

export default TableContainerSort;

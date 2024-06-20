import { Box, Button } from "@chakra-ui/react";

interface TableContainerSortProps {
    sortFields: string[];
}

function TableContainerSort({...props}: TableContainerSortProps){
    const { sortFields } = props;
    return (
        <Box display="flex" gap={2}>
            {sortFields.map((sort) => (
                <SortButton 
                    key={sort}
                    sort={sort} 
                />
            ))}
        </Box>
    )
}

export default TableContainerSort;

// Sort Button
interface SortButtonProps {
    sort: string;
}
function SortButton({...props}: SortButtonProps){
    const { sort } = props;
    return (
        <Box>
            <Button
                size={"xs"}
                onClick={() => console.log(sort)}
            >{sort}</Button>
        </Box>
    )
}

/* OLD SORT BUTTON
// Sort
interface ProductSortProps {
    setSort: (sort: AdminProductResponse["sort"]) => void;
    sort: AdminProductResponse["sort"];
}
function ProductSort({ setSort, sort }: ProductSortProps) {
    return (
        <Box display="flex" gap={2}>
            <ProductSortButton currentSort={sort} setSort={setSort} value="popularity" />
            <ProductSortButton currentSort={sort} setSort={setSort} value="name" />
            <ProductSortButton currentSort={sort} setSort={setSort} value="price" />
            <ProductSortButton currentSort={sort} setSort={setSort} value="stock" />
        </Box>
    );
}
    
// Sort Button
interface ProductSortButtonProps {
    currentSort: AdminProductResponse["sort"];
    setSort: (sort: AdminProductResponse["sort"]) => void;
    value: string;
}
function ProductSortButton({ currentSort, setSort, value }: ProductSortButtonProps) {
    const sortSplit = currentSort.split("_");
    const sortValue = sortSplit[0];
    const sortDirection = sortSplit[1];

    const handleSort = (value: string) => {
        if (sortValue === value) {
            const newSort = (value + (sortDirection === "asc" ? "_desc" : "_asc")) as AdminProductResponse["sort"];

            setSort(newSort);
        } else {
            const newSort: AdminProductResponse["sort"] = (value + "_asc") as AdminProductResponse["sort"];
            setSort(newSort);
        }
    };
    return (
        <Button size={"sm"} colorScheme={sortValue === value ? "blue" : "gray"} onClick={() => handleSort(value)}>
            <>
                {value}
                {sortValue === value ? (sortDirection === "asc" ? "▲" : "▼") : ""}
            </>
        </Button>
    );
}


*/
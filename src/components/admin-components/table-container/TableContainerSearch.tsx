import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';

interface TableContainerSearchProps {
    handleSearch: (search: string) => void;
    search: string;
}

function TableContainerSearch({ ...props }: TableContainerSearchProps) {
    const { handleSearch, search } = props;
    const [searchInput, setSearchInput] = useState(search);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }
    return (
        <Flex gap={2} justifyContent={"space-between"} w={"100%"}>
            <Input size={"sm"} type="text" value={searchInput} onChange={handleInputChange} />
            <Button size={"sm"} type="submit" onClick={() => handleSearch(searchInput)}>
                Search
            </Button>
        </Flex>
    );
}

export default TableContainerSearch;

/* OLD SEARCH CODE
// Search
interface ProductSearchProps {
    setSearch: (search: string) => void;
    search: string;
}
function ProductSearch({ setSearch, search }: ProductSearchProps) {
    const [searchInput, setSearchInput] = useState(search);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submit", searchInput);
        e.preventDefault();
        setSearch(searchInput);
    };
    return (
        <form onSubmit={handleSearchSubmit}>
            <Box display="flex" gap={2}>
                <Input size={"sm"} type="text" value={searchInput} onChange={handleSearch} />
                <Button size={"sm"} type="submit">
                    Search
                </Button>
            </Box>
        </form>
    );
}
*/
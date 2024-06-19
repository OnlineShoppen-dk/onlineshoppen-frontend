import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import useAdminProductQueryStore from '../../../store/admin-store/adminProductStore';

function TableContainerSearch() {
    // TODO: if universally used, make seperate store for search
    const { adminProductQuery, setSearch } = useAdminProductQueryStore();
    const [searchInput, setSearchInput] = useState(adminProductQuery.search);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const handleSearch = (search?: string) => {
        if(!search) return;
        setSearch(search);
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
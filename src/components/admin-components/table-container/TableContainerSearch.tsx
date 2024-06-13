interface TableContainerSearchProps {
    search: string;
}

function TableContainerSearch({ search }: TableContainerSearchProps) {
    return (
        <div>
            <input type="text" placeholder="Search" value={search} />
        </div>
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
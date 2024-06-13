import { Box, Button } from "@chakra-ui/react";

export interface TableContainerPaginationProps {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}
function TableContainerPagination({...props}: TableContainerPaginationProps){
    const { page, pageSize, totalPages, totalItems } = props;
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" margin={"4"} gap={2} w={"fit-content"}>
            <Button size={"sm"}>Previous</Button>
            <Box>
                Page {page} of {totalPages}
            </Box>
            <Button size={"sm"}>Next</Button>
            <Box>
                Showing {pageSize} of {totalItems} products
            </Box>
        </Box>
    )
}

export default TableContainerPagination;

/* OLD PAGINATION
// Pagination
export interface ProductTablePaginationProps {
    page: number;
    pageSize: number;
    totalPages: number;
    totalProducts: number;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}
function ProductTablePagination({
    page,
    pageSize,
    totalPages,
    totalProducts,
    setPage,
    setPageSize,
}: ProductTablePaginationProps) {
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
    };
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" margin={"4"}>
            <Flex alignItems="center">
                <Button size={"sm"} onClick={() => handlePageChange(page - 1)} isDisabled={page <= 1} marginRight="2">
                    Previous
                </Button>
                <Text marginRight="2">
                    Page {page} of {totalPages}
                </Text>
                <Button size={"sm"} onClick={() => handlePageChange(page + 1)} isDisabled={page === totalPages}>
                    Next
                </Button>
            </Flex>
            <Box>
                <Button size={"sm"} onClick={() => handlePageSizeChange(5)} isDisabled={pageSize === 5} marginRight="2">
                    5
                </Button>
                <Button
                    size={"sm"}
                    onClick={() => handlePageSizeChange(10)}
                    isDisabled={pageSize === 10}
                    marginRight="2">
                    10
                </Button>
                <Button
                    size={"sm"}
                    onClick={() => handlePageSizeChange(25)}
                    isDisabled={pageSize === 25}
                    marginRight="2">
                    25
                </Button>
                <Button
                    size={"sm"}
                    onClick={() => handlePageSizeChange(50)}
                    isDisabled={pageSize === 50}
                    marginRight="2">
                    50
                </Button>
                <Text>
                    Showing {pageSize} of {totalProducts} products
                </Text>
            </Box>
        </Box>
    );
}
*/
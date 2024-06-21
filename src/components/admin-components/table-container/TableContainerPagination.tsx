import { Box, Button, Flex } from "@chakra-ui/react";
import { GetDataResponse } from "../../../interfaces/main-service";
import useAdminProductQueryStore from "../../../store/admin-store/adminProductStore";

export interface TableContainerPaginationProps {
    data: GetDataResponse;
}
function TableContainerPagination({ ...props }: TableContainerPaginationProps) {
    const { setPage } = useAdminProductQueryStore();
    const { data } = props;
    const { page, totalPages } = data;

    const handleNextPage = () => {
        if (page >= totalPages) return;
        setPage(page + 1);
    }
    const handlePreviousPage = () => {
        if (page <= 1) return;
        setPage(page - 1);
    }
    
    return (
        <Flex justifyContent="space-between" pl={4} pr={4}>
            <Box display="flex" gap={2}>
                <Button size={"xs"} isDisabled={page <= 1 } onClick={handlePreviousPage}>
                    Previous
                </Button>
                {page}/{totalPages}
                <Button size={"xs"}
                    isDisabled={page >= totalPages}
                    onClick={handleNextPage}>
                        Next</Button>
            </Box>
        </Flex>
    );
}

export default TableContainerPagination;
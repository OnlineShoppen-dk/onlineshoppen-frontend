import { Box, Grid, GridItem } from "@chakra-ui/react";
import { GetDataResponse } from "../../../interfaces/main-service";
import TableContainerPagination from "./TableContainerPagination";
import TableContainerSearch from "./TableContainerSearch";
import TableContainerSort from "./TableContainerSort";

interface TableContainerProps {
    data: GetDataResponse;
    handleSearch: (search: string) => void;
    children: React.ReactNode;
    modal: React.ReactNode;
}

function TableContainer({ ...props }: TableContainerProps) {
    const { children, modal, data, handleSearch } = props;
    console.log('at the table');
    console.log(data);
    
    return (
        <Grid templateRows="0.3fr 9fr 1fr" maxHeight={"90vh"} gap={4} margin={4}>
            <GridItem border="1px solid black" alignContent={"center"} gap={2} padding={2} borderRadius={4}>
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between">
                    {/* Sort */}
                    <TableContainerSort sortFields={data.sortFields} />
                    <Box>
                        {modal}
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <TableContainerSearch search={data.search} handleSearch={handleSearch} />
                </Box>
            </GridItem>
            {/* Table */}
            <GridItem border="1px solid black" gridColumn="1 / -1" overflowY={"auto"}>
                {children}
            </GridItem>
            {/* Pagination */}
            <GridItem>
                <TableContainerPagination {...props} />
            </GridItem>
        </Grid>
    );
}

export default TableContainer;

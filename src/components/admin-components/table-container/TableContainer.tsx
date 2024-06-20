import { Box, Grid, GridItem } from "@chakra-ui/react";
import { GetDataResponse } from "../../../interfaces/main-service";
import TableContainerPagination from "./TableContainerPagination";
import TableContainerSearch from "./TableContainerSearch";
import TableContainerSort from "./TableContainerSort";

interface TableContainerProps {
    data: GetDataResponse;
    children: React.ReactNode;
    modal: React.ReactNode;
}

function TableContainer({ ...props }: TableContainerProps) {
    const { children, modal, data } = props;
    
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
                    <TableContainerSearch />
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

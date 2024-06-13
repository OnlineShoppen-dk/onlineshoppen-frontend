import { Box, Grid } from "@chakra-ui/react";
import TableContainerSort from "./TableContainerSort";
import TableContainerPagination from "./TableContainerPagination";

interface TableContainerProps {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    sortFields: string[];
    children: React.ReactNode;
}

function TableContainer({...props}: TableContainerProps){
    const { sortFields, children } = props;
    return(
        <Grid>
            {/* Admin Product Header */}
            <Box>
                <TableContainerSort sortFields={sortFields} />
            </Box>
            {/* Admin Product Body */}
            <Box>
                {children} 
            </Box>
            {/* Admin Product Footer */}
            <Box>
                {/* Pagination */}
                <TableContainerPagination {...props} />
            </Box>
        </Grid>
    )
}

export default TableContainer;
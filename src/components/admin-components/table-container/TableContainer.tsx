import { Grid, GridItem } from "@chakra-ui/react";
import TableContainerPagination from "./TableContainerPagination";
import TableContainerSort from "./TableContainerSort";

interface TableContainerProps {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    sortFields: string[];
    children: React.ReactNode;
}

function TableContainer({ ...props }: TableContainerProps) {
    const { sortFields, children } = props;
    return (
        <Grid templateRows="0.5fr 9fr 1fr" maxHeight={"90vh"} gap={4} margin={4}>
            <GridItem border="1px solid black">
                <TableContainerSort sortFields={sortFields} />
            </GridItem>
            <GridItem border="1px solid black">
                {children}
            </GridItem>
            <GridItem>
                {/* Pagination */}
                <TableContainerPagination {...props} />
            </GridItem>
        </Grid>
    );
}

export default TableContainer;

import { Grid, GridItem } from "@chakra-ui/react";
import TestData from "../../components/admin-components/TestData";
import ProductTable from "../../components/admin-components/product-table/ProductTable";
import TableContainer from "../../components/admin-components/table-container/TableContainer";
import DetailsContainer from "../../components/admin-components/details-container/DetailsContainer";

function AdminProducts() {
    // Get Products
    const products = TestData.GetTestProducts({ count: 25 });

    // Product Sort Fields
    const sortFields = ["popularity", "name", "price", "stock"];

    return (
        <Grid templateColumns="repeat(12, 1fr)" maxH="90vh">
            <GridItem colSpan={4} maxHeight={"90vh"}>
                <TableContainer
                    page={1}
                    pageSize={10}
                    totalPages={3}
                    totalItems={products.length}
                    sortFields={sortFields}>
                    {/* Admin Product Body */}
                    <ProductTable products={products} />
                </TableContainer>
            </GridItem>
            <GridItem colSpan={8}>
                {/* Product Details */}
                <DetailsContainer />
            </GridItem>
        </Grid>
    );
}

export default AdminProducts;

import { Grid, GridItem } from "@chakra-ui/react";
import DetailsContainer from "../../components/admin-components/details-container/DetailsContainer";
import ProductTable from "../../components/admin-components/product-table/ProductTable";
import AddProductModal from "../../components/admin-components/product-table/modals/AddProductModal";
import TableContainer from "../../components/admin-components/table-container/TableContainer";
import useAdminProducts from "../../hooks/admin-hooks/useAdminProducts";
import { GetDataResponse, GetProductsResponse, GetProductResponse } from '../../interfaces/main-service';

function AdminProducts() {
    const { data, error, isLoading } = useAdminProducts();
    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>{error.message}</p>;
    if (!data) return <p>No data</p>;

    return <AdminProductsPage productsResponse={data.products} productResponse={data.product} />;
}

interface AdminProductsPageProps {
    productsResponse: GetProductsResponse;
    productResponse: GetProductResponse | undefined;
}
function AdminProductsPage({ ...props }: AdminProductsPageProps) {
    const { productsResponse, productResponse } = props;

    // TODO: Change this with the api client
    // If not done prior deadline, this was the intended solution
    if (!productsResponse.sortFields) {
        const sortFields = ["popularity", "name", "price", "stock"];
        productsResponse.sortFields = sortFields;
    }

    return (
        <Grid templateColumns="repeat(12, 1fr)" maxH="90vh">
            {/* TableContainer */}
            <GridItem colSpan={4} maxHeight={"90vh"} p={4}>
                <TableContainer data={convertToGetDataResponse(productsResponse)} modal={<AddProductModal />}>
                    <ProductTable products={productsResponse.products} />
                </TableContainer>
            </GridItem>
            {/* DetailsContainer */}
            <GridItem colSpan={8} p={8}>
                {productResponse ? (
                    <DetailsContainer
                        product={productResponse.product}
                        productHistory={productResponse.productHistory}
                    />
                ) : (
                    <p>No product selected</p>
                )}
            </GridItem>
        </Grid>
    );
}

export default AdminProducts;

function convertToGetDataResponse(data: GetProductsResponse): GetDataResponse {
    const dataResponse: GetDataResponse = {
        page: data.page,
        pageSize: data.pageSize,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
        search: data.search,
        sortFields: data.sortFields,
        sort: data.sort,
    };
    return dataResponse;
}

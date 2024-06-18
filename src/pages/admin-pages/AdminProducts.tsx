import { Grid, GridItem } from "@chakra-ui/react";
import DetailsContainer from "../../components/admin-components/details-container/DetailsContainer";
import ProductTable from "../../components/admin-components/product-table/ProductTable";
import AddProductModal from "../../components/admin-components/product-table/modals/AddProductModal";
import TableContainer from "../../components/admin-components/table-container/TableContainer";
import { Product } from "../../interfaces/product";

import useAdminProducts from "../../hooks/admin-hooks/useAdminProducts";
import { GetDataResponse, GetProductsResponse } from "../../interfaces/main-service";
import useAdminProductQueryStore from "../../store/admin-store/adminProductStore";

function AdminProducts() {
    const { setSearch, setProductId} = useAdminProductQueryStore();

    const { data, error, isLoading } = useAdminProducts();

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>{error.message}</p>;
    if(!data) return <p>No data</p>;

    // Split it up
    // TODO: Fix this 
    const getAllData = data[0];
    const product = data[1];

    const handleProductClick = (product: Product) => {
        setProductId(product.id);
    }

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    const refetch = () => {
    }

    if(!getAllData.sortFields){
        const sortFields = [
            'popularity',
            'name',
            'price',
            'stock',
        ];
        getAllData.sortFields = sortFields;
    }


    return (
        <Grid templateColumns="repeat(12, 1fr)" maxH="90vh">
            <GridItem colSpan={4} maxHeight={"90vh"}>
                <TableContainer
                    data={convertToGetDataResponse(getAllData)}
                    handleSearch={handleSearch}
                    refetch={refetch}
                    modal={<AddProductModal />}>
                    <ProductTable products={getAllData.products}  
                        handleProductClick={handleProductClick}
                    />
                </TableContainer>
            </GridItem>
            <GridItem colSpan={8}>
                {product ? <DetailsContainer data={product} /> : <p>No product selected</p>}
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
        sort: data.sort
    }

    console.log('object created');
    return dataResponse;
}
/*
function AdminProducts() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null | undefined>(null);
    const [result, setResult] = useState(TestData.GetTestProducts({count: 25}));

    // Get Products
    const { data, products } = result;

    const handleProductClick = (product: Product) => {
        const selectedProduct = TestData.GetTestProductById(product.id, products);
        setSelectedProduct(selectedProduct);
    }

    const handleSearch = (search: string) => {
        const result = TestData.GetTestProductsByName(search, products);
        setResult(result);
    }
        

    const refetch = () => {
        setResult(TestData.GetTestProducts({count: 25}));
        setSelectedProduct(null);
    }

    return (
        <Grid templateColumns="repeat(12, 1fr)" maxH="90vh">
            <GridItem colSpan={4} maxHeight={"90vh"}>
                <TableContainer
                    data={data}
                    handleSearch={handleSearch}
                    refetch={refetch}
                    modal={<AddProductModal />}>
                    <ProductTable products={products}  
                        handleProductClick={handleProductClick}
                    />
                </TableContainer>
            </GridItem>
            <GridItem colSpan={8}>
                <DetailsContainer product={selectedProduct} />
            </GridItem>
        </Grid>
    );
}

export default AdminProducts;
*/
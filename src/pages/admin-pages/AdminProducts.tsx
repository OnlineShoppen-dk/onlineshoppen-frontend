import { Grid, GridItem, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DetailsContainer from "../../components/admin-components/details-container/DetailsContainer";
import ProductTable from "../../components/admin-components/product-table/ProductTable";
import AddProductModal from "../../components/admin-components/product-table/modals/AddProductModal";
import TableContainer from "../../components/admin-components/table-container/TableContainer";
import useAdminProducts from "../../hooks/admin-hooks/useAdminProducts";
import { GetDataResponse, GetProductResponse, GetProductsResponse } from "../../interfaces/main-service";
import { Product } from "../../interfaces/product";
import useAdminProductQueryStore from "../../store/admin-store/adminProductStore";

function AdminProducts(){
    const { data, error, isLoading } = useAdminProducts();
    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>{error.message}</p>;
    if (!data) return <p>No data</p>;

    return (
        <AdminProductsPage data={data} />
    )
}
interface AdminProductsPageProps {
    data: {
        products: GetProductsResponse;
        product: GetProductResponse | undefined;
    };
}
function AdminProductsPage({ data }: AdminProductsPageProps) {
    const { adminProductQuery, setSearch, setProductId } = useAdminProductQueryStore();
    const queryClient = useQueryClient();
    const toast = useToast();

    const getAllData = data.products;
    const product = data.product;

    const handleProductClick = (product: Product) => {
        setProductId(product.id);
    };

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const updateProduct = (updatedProduct: Product) => {
        mutationUpdateProduct.mutateAsync(updatedProduct);
    };


    if (!getAllData.sortFields) {
        const sortFields = ["popularity", "name", "price", "stock"];
        getAllData.sortFields = sortFields;
    }

    // MUTATIONS
    // TODO: Change this with the api client
    const mutationUpdateProduct = useMutation({
        mutationFn: async (product: Product) => {
            const response = await fetch(`http://localhost:8081/api/admin/product/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", adminProductQuery],
            });
            toast({
                title: 'Product updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

        },

    });
    

    return (
        <Grid templateColumns="repeat(12, 1fr)" maxH="90vh">
            <GridItem colSpan={4} maxHeight={"90vh"}>
                <TableContainer
                    data={convertToGetDataResponse(getAllData)}
                    handleSearch={handleSearch}
                    modal={<AddProductModal />}>
                    <ProductTable data={getAllData} handleProductClick={handleProductClick} />
                </TableContainer>
            </GridItem>
            <GridItem colSpan={8}>
                {product ? 
                <DetailsContainer 
                    data={product} 
                    updateProduct={updateProduct}
                /> : <p>No product selected</p>}
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

    console.log("object created");
    return dataResponse;
}
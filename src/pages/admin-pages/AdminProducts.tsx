import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import TestData from "../../components/admin-components/TestData";
import DetailsContainer from "../../components/admin-components/details-container/DetailsContainer";
import ProductTable from "../../components/admin-components/product-table/ProductTable";
import AddProductModal from "../../components/admin-components/product-table/modals/AddProductModal";
import TableContainer from "../../components/admin-components/table-container/TableContainer";
import { Product } from "../../interfaces/product";

function AdminProducts() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null | undefined>(null);
    const [result, setResult] = useState(TestData.GetTestProducts({count: 25}));

    // Get Products
    const { data, products } = result;

    const handleProductClick = (product: Product) => {
        const selectedProduct = TestData.GetTestProductById(product.id, products);
        setSelectedProduct(selectedProduct);
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
                    refetch={refetch}
                    modal={<AddProductModal />}>
                    {/* Admin Product Body */}
                    <ProductTable products={products}  
                        handleProductClick={handleProductClick}
                    />
                </TableContainer>
            </GridItem>
            <GridItem colSpan={8}>
                {/* Product Details */}
                <DetailsContainer product={selectedProduct} />
            </GridItem>
        </Grid>
    );
}

export default AdminProducts;

import TestData from "../../components/admin-components/TestData";
import ProductTable from "../../components/admin-components/product-table/ProductTable";
import TableContainer from "../../components/admin-components/table-container/TableContainer";

function AdminProducts() {
    // Get Products
    const products = TestData.GetTestProducts({count: 25});

    // Product Sort Fields
    const sortFields = [
        "popularity",
        "name",
        "price",
        "stock",
    ];

    return (
        <TableContainer 
            page={1}
            pageSize={10}
            totalPages={3}
            totalItems={products.length}
            sortFields={sortFields}
        >
            {/* Admin Product Body */}
            <ProductTable products={products} />
        </TableContainer>
    );   
}

export default AdminProducts;

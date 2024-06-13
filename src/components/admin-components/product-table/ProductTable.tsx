import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Product } from "../../../interfaces/product";
import AddProductModal from "./modals/AddProductModal";
import EditProductModal from "./modals/EditProductModal";

interface ProductTableProps {
    products: Product[];
}

function ProductTable({ ...props }: ProductTableProps) {
    const { products } = props;
    return (
        <div>
            <h1>Product Table</h1>
            <AddProductModal />
            <EditProductModal />
            <Table size="sm" variant="simple">
                <TableCaption>Products</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Price</Th>
                        <Th>Stock</Th>
                        <Th>Sold</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {products.map((product) => (
                        <Tr key={product.id} backgroundColor={product.isRemoved ? "red.100" : "white"}>
                            <Td>{product.id}</Td>
                            <Td>{product.name}</Td>
                            <Td>{product.price}.-</Td>
                            <Td>{product.stock}</Td>
                            <Td>{product.sold}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
}

export default ProductTable;

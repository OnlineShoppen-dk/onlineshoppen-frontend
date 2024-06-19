import { Box, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Product } from "../../../interfaces/product";
import useAdminProductQueryStore from "../../../store/admin-store/adminProductStore";

interface ProductTableProps {
    products: Product[];
}

function ProductTable({ ...props }: ProductTableProps) {
    const { products } = props;
    const { setProductId } = useAdminProductQueryStore();

    const handleProductClick = (product: Product) => {
        setProductId(product.id);
    };

    return (
        <Box height="100%">
            <Table size="sm" variant="simple" borderWidth="1px" borderColor="gray.200" padding={2}>
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
                        <Tr
                            key={product.id + "_product"}
                            backgroundColor={product.isRemoved ? "red.100" : "white"}
                            _hover={{ backgroundColor: "gray.100" }}
                            cursor="pointer"
                            onClick={() => handleProductClick(product)}>
                            <Td>{product.id}</Td>
                            <Td>{product.name}</Td>
                            <Td>{product.price}.-</Td>
                            <Td>{product.stock}</Td>
                            <Td>{product.sold}</Td>
                            <Td>{product.isRemoved ? "Removed" : ""}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default ProductTable;

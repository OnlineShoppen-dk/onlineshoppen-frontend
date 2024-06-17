import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Product } from "../../../interfaces/product";

interface DetailsContainerCategoriesProps {
    product: Product;
}

function DetailsContainerCategories({ ...props }: DetailsContainerCategoriesProps) {
    const { product } = props;
    const { categories } = product;

    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {categories.length > 0 ? (
                        categories.map((c, i) => (
                            <Tr key={i}>
                                <Th>{c.id}</Th>
                                <Th>{c.name}</Th>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Th>No categories</Th>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </>
    );
}

export default DetailsContainerCategories;

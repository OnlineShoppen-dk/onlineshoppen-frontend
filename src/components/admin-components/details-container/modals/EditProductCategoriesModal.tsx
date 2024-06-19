import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import useAdminCategories from "../../../../hooks/admin-hooks/useAdminCategories";
import { Category, Product } from "../../../../interfaces/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAdminCategoryQueryStore from "../../../../store/admin-store/adminCategoryStore";

interface EditProductCategoriesProps {
    product: Product;
}
function EditProductCategories({ ...props }: EditProductCategoriesProps) {
    const { adminCategoryQuery } = useAdminCategoryQueryStore();
    const { product } = props;
    const queryClient = useQueryClient();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data } = useAdminCategories();

    const productCategories = product.categories;

    const handleAddCategory = (category: Category) => {
        mutationAddCategory.mutate(category);
    };

    // TODO: Change this with the api client
    const mutationAddCategory = useMutation({
        mutationFn: async (category: Category) => {
            const response = await fetch(
                `http://localhost:8081/api/admin/category/${category.id}/add-product/${product.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories", adminCategoryQuery],
            });
            toast({
                title: "Category updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    if (!data) {
        return <div>...</div>;
    }
    const { categories } = data.categories;

    console.log("PRODUCt");
    console.log(product);

    return (
        <>
            <Button size={"xs"} onClick={onOpen}>
                Edit Categories
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Categories</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Product Categories</p>
                        <Table size="sm" variant="simple" borderWidth="1px" borderColor="gray.200" padding={2}>
                            <TableCaption>Categories</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {productCategories.map((category) => (
                                    <Tr key={category.id + "_product_category"}>
                                        <Td>{category.id}</Td>
                                        <Td>{category.name}</Td>
                                        <Td>
                                            <Button size={"xs"} colorScheme="red">
                                                Remove
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <p>All Categories</p>
                        <Table size="sm" variant="simple" borderWidth="1px" borderColor="gray.200" padding={2}>
                            <TableCaption>Products</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {categories
                                    .filter((category) => !productCategories.includes(category))
                                    .map((category) => (
                                        <Tr key={category.id + "_category"}>
                                            <Td>{category.id}</Td>
                                            <Td>{category.name}</Td>
                                            <Td>
                                                <Button
                                                    size={"xs"}
                                                    colorScheme="green"
                                                    onClick={() => handleAddCategory(category)}>
                                                    Add
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditProductCategories;

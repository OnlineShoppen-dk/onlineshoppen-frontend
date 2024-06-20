import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Product } from "../../../../interfaces/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAdminProductQueryStore from "../../../../store/admin-store/adminProductStore";
import { useApiClient } from "../../../../hooks/useApiClient";

interface EditProductProps {
    selectedProduct: Product;
}

function EditProduct({ ...props }: EditProductProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const { mainServiceApiClient: client } = useApiClient<Product>();
    const { adminProductQuery } = useAdminProductQueryStore();
    const queryClient = useQueryClient();

    const { selectedProduct } = props;
    const [product, setProduct] = useState<Product>(selectedProduct);
    const toast = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutationUpdateProduct.mutate(product);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const mutationUpdateProduct = useMutation({
        mutationFn: async (product: Product) => {
            const response = await client.put(`api/admin/product/${product.id}`, product);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", adminProductQuery],
            });
            toast({
                title: "Product updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    useEffect(() => {
        setProduct(selectedProduct);
    }, [selectedProduct]);
    return (
        <>
            <Button onClick={onOpen}>Edit Product</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid
                            templateAreas={`
                                "productName productName"
                                "productDescription productDescription"
                                "productStats productStats"
                                `}
                            gridTemplateColumns={"100%"}
                            gridAutoRows={"auto"}>
                            <form onSubmit={handleSubmit} id="edit-product-form">
                                {/* Product Name */}
                                <GridItem area={"productName"} p={4}>
                                    <FormControl id="product-name" isRequired>
                                        <FormLabel>Product Name</FormLabel>
                                        <Input type="text" name="name" value={product.name} onChange={handleChange} />
                                        <FormErrorMessage>Product name is required</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                {/* Product Description */}
                                <GridItem area={"productDescription"} p={4}>
                                    <FormControl id="product-description" isRequired>
                                        <FormLabel>Product Description</FormLabel>
                                        <Textarea
                                            maxH={"200px"}
                                            h={"200px"}
                                            resize={"none"}
                                            name="description"
                                            value={product.description}
                                            onChange={handleChange}
                                        />
                                        <FormErrorMessage>Product description is required</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                {/* Product Price */}
                                <GridItem area={"productStats"}>
                                    <Flex justifyContent="space-between" alignItems="center" p={4} gap={8}>
                                        <FormControl id="product-price" isRequired>
                                            <FormLabel>Product Price</FormLabel>
                                            <Input
                                                type="number"
                                                name="price"
                                                value={product.price}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormControl id="product-stock" isRequired>
                                            <FormLabel>Product Stock</FormLabel>
                                            <Input
                                                type="number"
                                                name="stock"
                                                value={product.stock}
                                                onChange={handleChange}
                                            />
                                            <FormErrorMessage>Product stock is required</FormErrorMessage>
                                        </FormControl>
                                    </Flex>
                                </GridItem>
                            </form>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="yellow" mr={3} onClick={() => setProduct(selectedProduct)}>
                            Reset
                        </Button>
                        <Button colorScheme="green" type="submit" form="edit-product-form">
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditProduct;

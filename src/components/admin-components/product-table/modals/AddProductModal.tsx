import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useApiClient } from "../../../../hooks/useApiClient";
import { PostProductRequest } from "../../../../interfaces/product";
import useAdminProductQueryStore from "../../../../store/admin-store/adminProductStore";

function AddProductModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { mainServiceApiClient: client } = useApiClient<PostProductRequest>();
    const { adminProductQuery } = useAdminProductQueryStore();
    const queryClient = useQueryClient();
    const toast = useToast();

    const [product, setProduct] = useState<PostProductRequest>({
        guid: uuidv4(),
        name: "",
        description: "",
        price: 0,
        stock: 0,
        sold: 0,
    });
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutationAddProduct.mutate(product);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const mutationAddProduct = useMutation({
        mutationFn: async (product: PostProductRequest) => {
            const response = await client.post(`api/admin/product`, product);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories", adminProductQuery],
            });
            queryClient.invalidateQueries({
                queryKey: ["products", adminProductQuery],
            });
            toast({
                title: "Product added successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: "Product add failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });
    return (
        <>
            <Button size={"xs"} onClick={onOpen}>
                Add Product
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit} id="add-product-form">
                            {/* Product Name */}
                            <FormControl id="product-name" isRequired>
                                <FormLabel>Product Name</FormLabel>
                                <Input type="text" name="name" value={product.name} onChange={handleChange} />
                                <FormHelperText>Enter the product name</FormHelperText>
                                <FormErrorMessage>Product name is required</FormErrorMessage>
                            </FormControl>
                            {/* Product Description */}
                            <FormControl id="product-description" isRequired>
                                <FormLabel>Product Description</FormLabel>
                                <Textarea name="description" value={product.description} onChange={handleChange} />
                                <FormHelperText>Enter the product description</FormHelperText>
                                <FormErrorMessage>Product description is required</FormErrorMessage>
                            </FormControl>
                            {/* Product Price */}
                            <FormControl id="product-price" isRequired>
                                <FormLabel>Product Price</FormLabel>
                                <Input type="number" name="price" value={product.price} onChange={handleChange} />
                                <FormHelperText>Enter the product price</FormHelperText>
                                <FormErrorMessage>Product price is required</FormErrorMessage>
                            </FormControl>
                            {/* Product Stock */}
                            <FormControl id="product-stock" isRequired>
                                <FormLabel>Product Stock</FormLabel>
                                <Input type="number" name="stock" value={product.stock} onChange={handleChange} />
                                <FormHelperText>Enter the product stock</FormHelperText>
                                <FormErrorMessage>Product stock is required</FormErrorMessage>
                            </FormControl>
                            {/* Product Sold */}
                            <FormControl id="product-sold" isRequired>
                                <FormLabel>Product Sold</FormLabel>
                                <Input type="number" name="sold" value={product.sold} onChange={handleChange} />
                                <FormHelperText>Enter the product sold</FormHelperText>
                                <FormErrorMessage>Product sold is required</FormErrorMessage>
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="yellow" mr={3} onClick={onClose}>
                            Reset
                        </Button>
                        <Button colorScheme="green" type="submit" form="add-product-form" onClick={onClose}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddProductModal;

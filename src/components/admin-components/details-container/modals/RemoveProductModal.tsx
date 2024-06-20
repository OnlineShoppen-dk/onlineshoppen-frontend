import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Product } from "../../../../interfaces/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../../../hooks/useApiClient";
import useAdminProductQueryStore from "../../../../store/admin-store/adminProductStore";

interface RemoveProductModalProps {
    product: Product;
}
function RemoveProductModal({ ...props }: RemoveProductModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { adminProductQuery } = useAdminProductQueryStore();
    const { mainServiceApiClient: client } = useApiClient<Product>();
    const queryClient = useQueryClient();
    const { product } = props;
    const toast = useToast();

    const handleRemoveProduct = () => {
        mutationRemoveProduct.mutate(product.id);
    };

    const mutationRemoveProduct = useMutation({
        mutationFn: async (productId: number) => {
            const response = await client.delete(`api/admin/product/${productId}`);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", adminProductQuery],
            });
            toast({
                title: "Product removed successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        },
        onError: () => {
            toast({
                title: "Product removal failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });
    return (
        <>
            <Button colorScheme="red" onClick={onOpen}>
                Remove Product
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Remove Product</ModalHeader>
                    <ModalBody>Are you sure you want to remove this product?</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleRemoveProduct}>
                            Remove
                        </Button>
                        <Button colorScheme="yellow" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default RemoveProductModal;

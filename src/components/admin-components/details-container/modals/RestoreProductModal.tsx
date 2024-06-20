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

interface RestoreProductModalProps {
    product: Product;
}
function RestoreProductModal({ ...props }: RestoreProductModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { adminProductQuery } = useAdminProductQueryStore();
    const { mainServiceApiClient: client } = useApiClient();
    const queryClient = useQueryClient();
    const { product } = props;
    const toast = useToast();

    const handleRestoreProduct = () => {
        mutationRestoreProduct.mutate(product.id);
    };

    const mutationRestoreProduct = useMutation({
        mutationFn: async (productId: number) => {
            const response = await client.put(`api/admin/product/${productId}/restore`, null);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", adminProductQuery],
            });
            toast({
                title: "Product restored successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        },
        onError: () => {
            toast({
                title: "Product restoration failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });
    return (
        <>
            <Button colorScheme="green" onClick={onOpen}>
                Restore Product
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Restore Product</ModalHeader>
                    <ModalBody>Are you sure you want to restore this product?</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleRestoreProduct}>
                            Restore
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

export default RestoreProductModal;

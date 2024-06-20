import {
    Box,
    Button,
    Grid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Image,
    useToast,
    Input,
    Text,
    Flex,
} from "@chakra-ui/react";
import { Product } from "../../../../interfaces/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAdminProductQueryStore from "../../../../store/admin-store/adminProductStore";
import { useApiClient } from "../../../../hooks/useApiClient";
import getImageUrl from "../../../../services/get-image-url";

interface EditProductImagesProps {
    product: Product;
}
function EditProductImages({ ...props }: EditProductImagesProps) {
    const { adminProductQuery } = useAdminProductQueryStore();
    const { mainServiceApiClient: client } = useApiClient<Product>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const queryClient = useQueryClient();
    const { product } = props;

    const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        if (e.target.files && e.target.files.length > 0) {
            formData.append("file", e.target.files[0]);
        }
        console.log("object", formData);

        mutationAddImage.mutate(formData);
    };

    const handleRemoveImage = (imageId: number) => {
        mutationRemoveImage.mutate(imageId);
    };

    const mutationRemoveImage = useMutation({
        mutationFn: async (imageId: number) => {
          const response = await client.delete(`api/admin/product/${product.id}/delete-image/${imageId}`);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", adminProductQuery],
            });
            toast({
                title: "Image removed",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: "Error removing image",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const mutationAddImage = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(`http://localhost:8081/api/admin/product/${product.id}/add-image`, {
                method: "POST",
                body: formData,
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", adminProductQuery],
            });
            toast({
                title: "Image added",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: "Error adding image",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    return (
        <>
            <Button size={"xs"} onClick={onOpen}>
                Edit Images
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="50vw">
                    <ModalHeader>Edit Images</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* EditProductImages */}
                        {product.images.length === 0 && (
                            <Box>
                                <p>No images found</p>
                            </Box>
                        )}
                        <Grid gap={4} templateColumns="repeat(4, 1fr)">
                            {/* Product Images */}
                            {product.images.map((img, i) => (
                                <Flex flexDir="column"
                                 key={i} border="1px solid black" borderRadius={8} p={8} justifyContent={"space-between"}>
                                    <Image
                                        src={getImageUrl(img.fileName)}
                                        alt={img.alt}
                                        borderRadius={16}
                                    />
                                    <Button onClick={() => handleRemoveImage(img.id)} colorScheme="red">
                                        Remove
                                    </Button>
                                </Flex>
                            ))}
                        </Grid>

                        <div className="flex flex-col">
                            <Text>Add Image</Text>
                            <Input type="file" className="w-fit" onChange={handleAddImage} />
                        </div>
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

export default EditProductImages;

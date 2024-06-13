import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import EditProduct from "../../forms/EditProduct";

function EditProductModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Add Product</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EditProduct test={"e"} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="yellow" mr={3} onClick={onClose}>
                            Reset
                        </Button>
                        <Button colorScheme="green">Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditProductModal;
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
import AddProduct from "../../forms/AddProduct";

function AddProductModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button size={"xs"} onClick={onOpen}>Add Product</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddProduct />
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

export default AddProductModal;
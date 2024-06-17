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

function EditProductImages() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size={"xs"} onClick={onOpen}>Edit Images</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* EditProductImages */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Close
            </Button>
            <Button colorScheme="yellow" mr={3}>
              Reset
            </Button>
            <Button colorScheme="green">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default EditProductImages
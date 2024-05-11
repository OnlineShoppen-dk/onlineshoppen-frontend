import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Grid,
    Box,
    Button,
    Image,
    useDisclosure,
    Text,
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import { Product } from "../interfaces/product";
import { useState } from "react";

function AdminDashboard() {
    console.log("Getting products");
    const products = GetProducts();
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h1>Products</h1>
            {GetProductsTable(products)}
        </div>
    );
}

export default AdminDashboard;

// Components
function GetProductsTable(products: Product[]) {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={6} width="80%" height="100%">
            <Box border="1px" borderColor="gray.200" maxHeight="500px" overflowX="hidden" overflowY="scroll">
                <Table size="sm" variant="simple">
                    <TableCaption>Products</TableCaption>
                    <Thead>
                        <Tr>
                            <Th style={{ width: "25px" }}>ID</Th>
                            <Th style={{ width: "100px" }}>Logo</Th>
                            <Th>Name</Th>
                            <Th style={{ width: "25px" }}>Price</Th>
                            <Th style={{ width: "25px" }}>Stock</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map((product) => (
                            <Tr key={product.id}>
                                <Td style={{ backgroundColor: "red" }}>{product.id}</Td>
                                <Td style={{ backgroundColor: "orange" }}>
                                    <ProductLogo {...product} />
                                </Td>
                                <Td style={{ backgroundColor: "yellow" }}>{product.name}</Td>
                                <Td style={{ backgroundColor: "green" }}>{product.price}.-</Td>
                                <Td style={{ backgroundColor: "blue" }}>{product.stock}</Td>
                                <Td style={{ backgroundColor: "purple" }}>{ProductActions(product)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Grid>
    );
}

// Product Logo
function ProductLogo(product: Product) {
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Image borderRadius="full" boxSize="50px" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Box>
    );
}

// Product Row
function ProductActions(product: Product) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Button onClick={onOpen} colorScheme="blue" size="xs">
                View
            </Button>
            <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
        </Box>
    );
}
function ProductModal({ isOpen, onClose, product }) {
    const [edit, setEdit] = useState(false);
    const [productEdit, setProductEdit] = useState(product);

    const SaveProduct = () => {
        console.log("Save product", productEdit);
    };

    const handleInputChange = (e, key) => {
        const value = e.target ? e.target.value : e;
        console.log(value);
        console.log(key);
        console.log("changing");
        setProductEdit({ ...productEdit, [key]: value });
        console.log(productEdit);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                setEdit(false);
            }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Box display="flex" alignItems="center">
                        <ProductLogo {...product} />
                        <Text ml={2}>
                            #{product.id} : {product.name}
                        </Text>
                    </Box>
                </ModalHeader>
                <ModalCloseButton />
                {/* Modal Body */}
                <ModalBody>
                    {edit ? (
                        <>
                            <Box display="flex" justifyContent={"space-between"}>
                                <Box>
                                    <Text>Description:</Text>
                                    <Textarea
                                        onChange={(e) => handleInputChange(e, "description")}
                                        width={"fill"}
                                        placeholder="Description"
                                        value={productEdit.description}
                                    />
                                </Box>
                                {product.isRemoved ? (
                                    <Text color="red">Removed</Text>
                                ) : (
                                    <Text color="green">Active</Text>
                                )}
                            </Box>
                            <Box display="flex-col" alignItems="center" justifyContent="space-between">
                                <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                                    <Box>
                                        <Text>Price:</Text>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <NumberInput
                                                onChange={(valueString) => handleInputChange(valueString, "price")}
                                                value={productEdit.price}
                                                defaultValue={productEdit.price}
                                                min={0}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <Button
                                                colorScheme="red"
                                                onClick={() => handleInputChange(product.price, "price")}>
                                                Reset
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Box>
                                        <Text>Stock:</Text>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <NumberInput
                                                onChange={(valueString) => handleInputChange(valueString, "stock")}
                                                value={productEdit.stock}
                                                defaultValue={productEdit.stock}
                                                min={0}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <Button
                                                colorScheme="red"
                                                onClick={() => handleInputChange(product.stock, "stock")}>
                                                Reset
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Box>
                                        <Text>Sold:</Text>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <NumberInput
                                                onChange={(valueString) => handleInputChange(valueString, "sold")}
                                                value={productEdit.sold}
                                                defaultValue={productEdit.sold}
                                                min={0}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <Button
                                                colorScheme="red"
                                                onClick={() => handleInputChange(product.sold, "sold")}>
                                                Reset
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <ModalFooter>
                                <Button colorScheme="blue" onClick={SaveProduct}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    ) : (
                        <>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Text>{product.description}</Text>
                                {product.isRemoved ? (
                                    <Text color="red">Removed</Text>
                                ) : (
                                    <Text color="green">Active</Text>
                                )}
                            </Box>
                            <Box>
                                <Text>Price: {product.price}.-</Text>
                                <Text>Stock: {product.stock}</Text>
                                <Text>Sold: {product.sold}</Text>
                                <Text>
                                    Created: {product.createdAtDate} - {product.createdAtTime}
                                </Text>
                                <Text>
                                    Updated: {product.updatedAtDate} - {product.updatedAtTime}
                                </Text>
                            </Box>
                            <ModalFooter>
                                <Box gap={3} display="flex" alignItems="center" justifyContent="space-between">
                                    <Button colorScheme="red">Delete</Button>
                                    <Button colorScheme="yellow" onClick={() => setEdit(!edit)}>
                                        {edit ? "View" : "Edit"}
                                    </Button>
                                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                </Box>
                            </ModalFooter>
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

// Test Products
function GetProducts() {
    const products: Product[] = [];
    for (let i = 0; i < 10; i++) {
        const product: Product = {
            id: Math.floor(Math.random() * 1000),
            guid: uuidv4(),
            name: `Product ${i}`,
            description: `Description for product ${i}`,
            price: Math.floor(Math.random() * 100),
            stock: Math.floor(Math.random() * 100),
            sold: Math.floor(Math.random() * 100),
            createdAt: "createdAt",
            createdAtDate: new Date().toLocaleDateString("da-DK"),
            createdAtTime: new Date().toLocaleTimeString("en-GB"),
            updatedAt: "updatedAt",
            updatedAtDate: new Date().toLocaleDateString("da-DK"),
            updatedAtTime: new Date().toLocaleTimeString("en-GB"),
            isRemoved: false,
            imageId: "imageId",
            categories: ["category"],
            images: ["image"],
        };
        products.push(product);
    }
    return products;
}

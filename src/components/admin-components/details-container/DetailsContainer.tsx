import { Box, Button, Flex, Grid, GridItem, Input, Text, Textarea } from "@chakra-ui/react";
import { Product } from "../../../interfaces/product";
import DetailsContainerCategories from "./DetailsContainerCategories";
import DetailsContainerImages from "./DetailsContainerImages";
import { useEffect, useState } from "react";
import EditProductCategories from "./modals/EditProductCategories";
import EditProductImages from "./modals/EditProductImages";
import { GetProductResponse } from "../../../interfaces/main-service";
import DetailsContainerHistory from "./DetailsContainerHistory";

interface DetailsContainerProps {
    data: GetProductResponse;
    updateProduct: (product: Product) => void;
}

interface EditProps {
    product: Product;
    edit: boolean;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

function DetailsContainer({ ...props }: DetailsContainerProps) {
    const { data, updateProduct } = props;
    const [product, setProduct] = useState<Product>(data.product);
    const [edit, setEdit] = useState<boolean>(false);
    const productHistory = data?.productHistory || [];

    const editProps: EditProps = {
        product: product,
        setProduct: setProduct,
        edit: edit,
    };

    const resetEdit = () => {
        setProduct(data?.product);
    };

    const cancelEdit = () => {
        resetEdit();
        setEdit(false);
    };

    const saveEdit = () => {
        // Save product
        updateProduct(product);
        setEdit(false);
    };

    // Product Values
    useEffect(() => {
        setProduct(data.product);
    }, [data]);

    return (
        <Grid
            templateAreas={`
                "header header header"
                "description stats categories"
                "description stats categories"
                "images images images"
                "history history history"
                `}
            gridTemplateRows={"5vh 1fr 5vh"}
            gridAutoColumns={"30vw 1fr 1fr"}
            border="1px solid black"
            borderRadius={4}>
            <GridItem p="4" area={"header"}>
                <Flex justifyContent="space-between">
                    <Flex gap={"4"} alignItems="center">
                        <Text fontSize={"lg"} fontWeight="bold">
                            #{product.id}
                        </Text>
                        <ProductName {...editProps} />
                    </Flex>
                    <Flex gap={"4"}>
                        {edit ? (
                            <>
                                <Button onClick={() => cancelEdit()}>Cancel</Button>
                                <Button onClick={() => resetEdit()}>Reset</Button>
                                <Button onClick={() => saveEdit()}>Save</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => setEdit(true)}>Edit</Button>
                                <Button>Delete</Button>
                            </>
                        )}
                    </Flex>
                </Flex>
            </GridItem>
            <GridItem p={4} area={"description"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Description
                    </Text>
                </Flex>
                <ProductDescription {...editProps} />
            </GridItem>
            <GridItem p={4} area={"stats"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Stats
                    </Text>
                </Flex>
                <ProductStats {...editProps} />
            </GridItem>
            <GridItem p={4} area={"categories"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Categories
                    </Text>
                    <EditProductCategories />
                </Flex>
                <Box maxH={"25vh"} overflowY={"auto"} p={4}>
                    <DetailsContainerCategories product={product} />
                </Box>
            </GridItem>
            <GridItem p={4} area={"images"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Images
                    </Text>
                    <EditProductImages />
                </Flex>
                <Box maxH={"45vh"} overflowY={"auto"} p={4}>
                    <DetailsContainerImages product={product} />
                </Box>
            </GridItem>
            <GridItem p={4} area={"history"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        History
                    </Text>
                </Flex>
                <Box maxH={"25vh"} overflowY={"auto"} p={4}>
                    <DetailsContainerHistory history={productHistory} />
                </Box>
            </GridItem>
        </Grid>
    );
}
function ProductName({ ...props }: EditProps) {
    const { product, setProduct, edit } = props;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, name: e.target.value });
    };

    return (
        <>
            {edit ? (
                <Box alignContent={"center"}>
                    <Input type="text" value={product.name} onChange={handleInput} />
                </Box>
            ) : (
                <Text fontSize="lg">{product.name}</Text>
            )}
        </>
    );
}
function ProductDescription({ ...props }: EditProps) {
    const { product, setProduct, edit } = props;

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProduct({ ...product, description: e.target.value });
    };

    return (
        <>
            {edit ? (
                <Box alignContent={"center"} p={4}>
                    <Textarea
                        resize={"none"}
                        value={product.description}
                        h={"25vh"}
                        maxH={"25vh"}
                        onChange={handleInput}
                    />
                </Box>
            ) : (
                <Text fontSize="lg">{product.description}</Text>
            )}
        </>
    );
}

function ProductStats({ ...props }: EditProps) {
    const { product, setProduct, edit } = props;
    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, stock: +e.target.value });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, price: +e.target.value });
    };

    return (
        <>
            {edit ? (
                <Grid
                    templateAreas={`
                    "priceLabel priceValue priceValue priceValue"
                    "stockLabel stockValue stockValue stockValue"
                    "createdAtLabel createdAtValue createdAtValue createdAtValue"
                    "updatedAtLabel updatedAtValue updatedAtValue updatedAtValue"
                `}
                    gridTemplateRows={"5vh 5vh 5vh 5vh"}
                    gridAutoColumns={"4vw auto"}
                    alignItems={"center"}
                    pt={4}>
                    <GridItem area={"priceLabel"} p={2}>
                        <Text fontSize={"lg"}>Price</Text>
                    </GridItem>
                    <GridItem area={"priceValue"} p={2}>
                        <Input type="number" value={product.price} onChange={handlePriceChange} />
                    </GridItem>
                    <GridItem area={"stockLabel"} p={2}>
                        <Text fontSize={"lg"}>Stock</Text>
                    </GridItem>
                    <GridItem area={"stockValue"} p={2}>
                        <Input type="number" value={product.stock} onChange={handleStockChange} />
                    </GridItem>
                </Grid>
            ) : (
                <Grid
                    templateAreas={`
                        "priceLabel priceValue priceValue priceValue"
                        "stockLabel stockValue stockValue stockValue"
                        "createdAtLabel createdAtValue createdAtValue createdAtValue"
                        "updatedAtLabel updatedAtValue updatedAtValue updatedAtValue"
                    `}
                    gridTemplateRows={"5vh 5vh 5vh 5vh"}
                    gridAutoColumns={"7.5vw auto"}
                    pt={4}>
                    <GridItem area={"priceLabel"} p={2}>
                        <Text fontSize={"lg"}>Price</Text>
                    </GridItem>
                    <GridItem area={"priceValue"} p={2}>
                        <Text fontSize={"lg"}>{product.price} DKK</Text>
                    </GridItem>
                    <GridItem area={"stockLabel"} p={2}>
                        <Text fontSize={"lg"}>Stock</Text>
                    </GridItem>
                    <GridItem area={"stockValue"} p={2}>
                        <Text fontSize={"lg"}>{product.stock} pcs.</Text>
                    </GridItem>
                    <GridItem area={"createdAtLabel"} p={2}>
                        <Text fontSize={"lg"}>Created At</Text>
                    </GridItem>
                    <GridItem area={"createdAtValue"} p={2}>
                        <Text fontSize={"lg"}>{formatDateAndTime(product.createdAt)}</Text>
                    </GridItem>
                    <GridItem area={"updatedAtLabel"} p={2}>
                        <Text fontSize={"lg"}>Updated At</Text>
                    </GridItem>
                    <GridItem area={"updatedAtValue"} p={2}>
                        <Text fontSize={"lg"}>{formatDateAndTime(product.updatedAt)}</Text>
                    </GridItem>
                </Grid>
            )}
        </>
    );
}

const formatDateAndTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("da-DK") + " " + d.toLocaleTimeString("da-DK");
};
export default DetailsContainer;

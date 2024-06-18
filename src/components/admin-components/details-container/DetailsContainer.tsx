import { Box, Button, Flex, Grid, GridItem, Input, Text, Textarea } from "@chakra-ui/react";
import { Product } from "../../../interfaces/product";
import DetailsContainerCategories from "./DetailsContainerCategories";
import DetailsContainerImages from "./DetailsContainerImages";
import { useState } from "react";
import EditProductCategories from "./modals/EditProductCategories";
import EditProductImages from "./modals/EditProductImages";
import { GetProductResponse } from "../../../interfaces/main-service";
import DetailsContainerHistory from "./DetailsContainerHistory";

interface DetailsContainerProps {
    data?: GetProductResponse;
}

function DetailsContainer({ data }: DetailsContainerProps) {
    const [edit, setEdit] = useState<boolean>(false);
    if (!data) return <Box>No data</Box>;
    const { product, productHistory } = data;
    if (!product) return <Box>No product selected</Box>;

    // Product Values
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
                        <ProductName product={product} edit={edit} />
                    </Flex>
                    <Flex gap={"4"}>
                        {edit ? (
                            <>
                                <Button onClick={() => setEdit(false)}>Cancel</Button>
                                <Button onClick={() => setEdit(false)}>Save</Button>
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
                <ProductDescription product={product} edit={edit} />
            </GridItem>
            <GridItem p={4} area={"stats"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Stats
                    </Text>
                </Flex>
                <ProductStats product={product} edit={edit} />
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
interface ProductNameProps {
    product: Product;
    edit: boolean;
}
function ProductName({ ...props }: ProductNameProps) {
    const { product, edit } = props;
    return (
        <>
            {edit ? (
                <Box alignContent={"center"}>
                    <Input type="text" value={product.name} onChange={(e) => (product.name = e.target.value)} />
                </Box>
            ) : (
                <Text fontSize="lg">{product.name}</Text>
            )}
        </>
    );
}
interface ProductDescriptionProps {
    product: Product;
    edit: boolean;
}
function ProductDescription({ ...props }: ProductDescriptionProps) {
    const { product, edit } = props;
    return (
        <>
            {edit ? (
                <Box alignContent={"center"}>
                    <Textarea resize={"none"} value={product.description} h={"25vh"} maxH={"25vh"} />
                </Box>
            ) : (
                <Text fontSize="lg">{product.description}</Text>
            )}
        </>
    );
}
interface ProductStatsProps {
    product: Product;
    edit: boolean;
}
function ProductStats({ ...props }: ProductStatsProps) {
    const { product, edit } = props;
    return (
        <>
            {edit ? (
                <Flex direction={"column"} gap={2} p={4}>
                    <Flex justifyContent="space-between" alignItems="center" gap={4}>
                        <Text fontSize={"lg"}>Stock</Text>
                        <Input
                            type="number"
                            value={product.stock}
                            onChange={(e) => (product.stock = +e.target.value)}
                        />
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center" gap={2}>
                        <Text fontSize={"lg"}>Price</Text>
                        <Input
                            type="number"
                            value={product.price}
                            onChange={(e) => (product.price = +e.target.value)}
                        />
                    </Flex>
                </Flex>
            ) : (
                <>
                    <Text fontSize={"lg"}>Stock: {product.stock}</Text>
                    <Text fontSize={"lg"}>Price: {product.price}</Text>
                    <Text fontSize={"lg"}>
                        Created At: {product.createdAtDate} - {product.createdAtTime}
                    </Text>
                    <Text fontSize={"lg"}>
                        Updated At: {product.updatedAtDate} - {product.updatedAtTime}
                    </Text>
                </>
            )}
        </>
    );
}
export default DetailsContainer;

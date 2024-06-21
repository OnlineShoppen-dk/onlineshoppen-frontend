import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Product, ProductHistory } from "../../../interfaces/product";
import DetailsContainerCategories from "./DetailsContainerCategories";
import DetailsContainerHistory from "./DetailsContainerHistory";
import DetailsContainerImages from "./DetailsContainerImages";
import EditProductCategories from "./modals/EditProductCategoriesModal";
import EditProductImages from "./modals/EditProductImagesModal";
import EditProduct from "./modals/EditProductModal";
import RemoveProductModal from "./modals/RemoveProductModal";
import RestoreProductModal from "./modals/RestoreProductModal";

interface DetailsContainerProps {
    product: Product;
    productHistory: ProductHistory[];
}

function DetailsContainer({ ...props }: DetailsContainerProps) {
    const { product, productHistory } = props;
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
            {/* Product Header */}
            <GridItem p="4" area={"header"}>
                <Flex justifyContent="space-between">
                    <Flex gap={"4"} alignItems="center">
                        <Text fontSize={"lg"} fontWeight="bold">
                            #{product.id}
                        </Text>
                        <Text fontSize="lg" fontWeight="bold">
                            {product.name}
                        </Text>
                    </Flex>
                    {/* Edit product modal */}
                    <Flex gap={4}>
                        {product.isRemoved ?
                        (
                            <RestoreProductModal product={product} />
                        )
                        :
                        (
                            <RemoveProductModal product={product} />
                        )
                        }
                        
                        <EditProduct selectedProduct={product} />
                    </Flex>
                </Flex>
            </GridItem>
            {/* Description */}
            <GridItem p={4} area={"description"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Description
                    </Text>
                </Flex>
                <Text>{product.description}</Text>
            </GridItem>
            {/* Product Stats */}
            <GridItem p={4} area={"stats"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Stats
                    </Text>
                </Flex>
                <Grid
                    templateAreas={`
                        "priceLabel priceValue priceValue priceValue"
                        "stockLabel stockValue stockValue stockValue"
                        "createdAtLabel createdAtValue createdAtValue createdAtValue"
                        "updatedAtLabel updatedAtValue updatedAtValue updatedAtValue"
                    `}
                    gridTemplateRows={"5vh 5vh 5vh 5vh"}
                    gridAutoColumns={"5vw auto"}
                    pt={4}>
                    <GridItem area={"priceLabel"} p={2}>
                        <Text fontSize={"sm"}>Price</Text>
                    </GridItem>
                    <GridItem area={"priceValue"} p={2}>
                        <Text fontSize={"sm"}>{product.price} DKK</Text>
                    </GridItem>
                    <GridItem area={"stockLabel"} p={2}>
                        <Text fontSize={"sm"}>Stock</Text>
                    </GridItem>
                    <GridItem area={"stockValue"} p={2}>
                        <Text fontSize={"sm"}>{product.stock} pcs.</Text>
                    </GridItem>
                    <GridItem area={"createdAtLabel"} p={2}>
                        <Text fontSize={"sm"}>Created</Text>
                    </GridItem>
                    <GridItem area={"createdAtValue"} p={2}>
                        <Text fontSize={"sm"}>{formatDateAndTime(product.createdAt)}</Text>
                    </GridItem>
                    <GridItem area={"updatedAtLabel"} p={2}>
                        <Text fontSize={"sm"}>Updated</Text>
                    </GridItem>
                    <GridItem area={"updatedAtValue"} p={2}>
                        <Text fontSize={"sm"}>{formatDateAndTime(product.updatedAt)}</Text>
                    </GridItem>
                </Grid>
            </GridItem>
            {/* Product Categories */}
            <GridItem p={4} area={"categories"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Categories
                    </Text>
                    <EditProductCategories product={product} />
                </Flex>
                <Box maxH={"25vh"} overflowY={"auto"} p={4}>
                    <DetailsContainerCategories product={product} />
                </Box>
            </GridItem>
            {/* Product Images */}
            <GridItem p={4} area={"images"}>
                <Flex justifyContent="space-between" alignItems="center" borderBottom={"1px solid black"} p={1}>
                    <Text fontSize={"lg"} fontWeight="bold">
                        Images
                    </Text>
                    <EditProductImages product={product} />
                </Flex>
                <Box maxH={"45vh"} overflowY={"auto"} p={4}>
                    <DetailsContainerImages product={product} />
                </Box>
            </GridItem>
            {/* Product History */}
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

const formatDateAndTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("da-DK") + " " + d.toLocaleTimeString("da-DK");
};
export default DetailsContainer;

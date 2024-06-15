import { Box, Button, Flex, Grid, GridItem, Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Product } from "../../../interfaces/product";

interface DetailsContainerProps {
    product: Product | null | undefined;
}

function DetailsContainer({ product }: DetailsContainerProps) {
    if (!product) return <Box>No product selected</Box>;
    const {
        id,
        name,
        description,
        stock,
        price,
        createdAtDate,
        createdAtTime,
        updatedAtDate,
        updatedAtTime,
        images,
        categories,
    } = product;

    return (
        <Grid margin={4} gap={4} border="1px solid black" borderRadius={4} padding={4}>
            <Flex w="100%" justifyContent="space-between">
                <DetailsContainerGridItem>
                    <Text fontSize="2xl">
                        #{id} - {name}
                    </Text>
                </DetailsContainerGridItem>
                <DetailsContainerGridItem>
                    <Box display="flex" justifyContent="space-between" gap={4}>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </Box>
                </DetailsContainerGridItem>
            </Flex>

            <DetailsContainerGridItem label="Description">
                <Text>{description}</Text>
            </DetailsContainerGridItem>
            <Grid gap={4} templateColumns="repeat(6, 1fr)">
                <GridItem colSpan={2}>
                    <DetailsContainerGridItem label="Details">
                        <Box>
                            <Text>Stock: {stock}</Text>
                            <Text>Price: {price}</Text>
                            <Text>
                                Created At: {createdAtDate} - {createdAtTime}
                            </Text>
                            <Text>
                                Updated At: {updatedAtDate} - {updatedAtTime}
                            </Text>
                        </Box>
                    </DetailsContainerGridItem>
                    <DetailsContainerGridItem label={"Categories"}>
                        <Box maxH={"20vh"} overflowY={"auto"} w={"100%"} pl={8} pr={8}>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Id</Th>
                                        <Th>Name</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {categories.length > 0 ? (
                                        categories.map((c, i) => (
                                            <Tr key={i}>
                                                <Th>{c.id}</Th>
                                                <Th>{c.name}</Th>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Th>No categories</Th>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </Box>
                    </DetailsContainerGridItem>
                </GridItem>
                <GridItem colSpan={4}>
                    <DetailsContainerGridItem label="Images">
                        No images {images.length > 0 && "found"}
                    </DetailsContainerGridItem>
                </GridItem>
            </Grid>
        </Grid>
    );
}

export default DetailsContainer;

interface DetailsContainerBoxProps {
    label?: string;
    children: React.ReactNode;
}
function DetailsContainerGridItem({ ...props }: DetailsContainerBoxProps) {
    const { label, children } = props;
    return (
        <GridItem>
            {label && (
                <Text fontSize="lg" fontWeight="bold">
                    {label}
                </Text>
            )}
            <Box {...props} gap={4} margin={4} padding={4} borderRadius={4} border="1px solid black" w={"fit-content"}>
                {children}
            </Box>
        </GridItem>
    );
}

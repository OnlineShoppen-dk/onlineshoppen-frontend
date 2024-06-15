import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
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
    } = product;

    

    return (
        <Grid margin={4} gap={4} border="1px solid black" borderRadius={4} padding={4}>
            <DetailsContainerGridItem>
                <Text fontSize="2xl">#{id} - {name}</Text>
            </DetailsContainerGridItem>
            <DetailsContainerGridItem label="Description">
                <Text>{description}</Text>
            </DetailsContainerGridItem>
            <DetailsContainerGridItem label="Details">
                <Text>Stock: {stock}</Text>
                <Text>Price: {price}</Text>
                <Text>Created At: {createdAtDate} - {createdAtTime}</Text>
                <Text>Updated At: {updatedAtDate} - {updatedAtTime}</Text>
            </DetailsContainerGridItem>
            <DetailsContainerGridItem label={"Categories"}>
                <Text>No categories</Text>
            </DetailsContainerGridItem>
            <DetailsContainerGridItem label={"Images"}>
                <Text>No images</Text>
            </DetailsContainerGridItem>
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
            {label && <Text fontSize="lg" fontWeight="bold">{label}</Text>}
            <Box {...props} gap={4} margin={4} padding={4} borderRadius={4} border="1px solid black" w={"fit-content"}>
                {children}
            </Box>
        </GridItem>
    );
}
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";


function DetailsContainer() {
    return (
        <Grid>
            <GridItem maxHeight={"90vh"} gap={4} margin={4}>
                <Flex gap={4}>
                    <Box>Name</Box>
                    <Box>Id</Box>
                    <Box>Something</Box>
                </Flex>
            </GridItem>
            <GridItem>
                <Box>Description</Box>
                <Box>Images</Box>
            </GridItem>
            <GridItem>
                <Box>Stock</Box>
                <Box>Price</Box>
            </GridItem>
            <GridItem>
                <Box>Category</Box>
            </GridItem>
        </Grid>
    );
}

export default DetailsContainer;

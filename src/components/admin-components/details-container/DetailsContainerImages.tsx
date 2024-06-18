import { Box, Image } from '@chakra-ui/react'
import { Grid } from "@chakra-ui/react";
import { Product } from "../../../interfaces/product";

interface DetailsContainerImagesProps {
    product: Product;
}

function DetailsContainerImages({ ...props }: DetailsContainerImagesProps) {
    const { product } = props;
    const { images } = product;
    if (!images) return <p>No images</p>;
    return (
        <Grid gap={4} templateColumns="repeat(6, 1fr)">
            {images.length > 0 ? (
                images.map((img, i) => (
                    <Box key={i}>
                        <Image 
                            src={img.fileName} alt={img.alt} 
                            borderRadius={16}
                        />
                    </Box>
                ))
            ) : (
                <p>No images</p>
            )}
        </Grid>
    );
}

export default DetailsContainerImages;
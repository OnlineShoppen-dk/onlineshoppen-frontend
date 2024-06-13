import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
  } from '@chakra-ui/react'

interface EditProductProps {
    test: string;
}
function EditProduct({ ...props }: EditProductProps) {
    const { test } = props;
    const product = {
        name: "Test Product",
        description: "Test Description",
        price: 25,
        stock: 522,
        sold: 183
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Edit Product');
        console.log('Props:', test);
    };
    return (
        <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <FormControl id="product-name" isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input type="text" name="name" value={product.name} onChange={handleChange} />
                <FormHelperText>Enter the product name</FormHelperText>
                <FormErrorMessage>Product name is required</FormErrorMessage>
            </FormControl>
            {/* Product Description */}
            <FormControl id="product-description" isRequired>
                <FormLabel>Product Description</FormLabel>
                <Input type="text" name="description" value={product.description} onChange={handleChange} />
                <FormHelperText>Enter the product description</FormHelperText>
                <FormErrorMessage>Product description is required</FormErrorMessage>
            </FormControl>
            {/* Product Price */}
            <FormControl id="product-price" isRequired>
                <FormLabel>Product Price</FormLabel>
                <Input type="number" name="price" value={product.price} onChange={handleChange} />
                <FormHelperText>Enter the product price</FormHelperText>
                <FormErrorMessage>Product price is required</FormErrorMessage>
            </FormControl>
            {/* Product Stock */}
            <FormControl id="product-stock" isRequired>
                <FormLabel>Product Stock</FormLabel>
                <Input type="number" name="stock" value={product.stock} onChange={handleChange} />
                <FormHelperText>Enter the product stock</FormHelperText>
                <FormErrorMessage>Product stock is required</FormErrorMessage>
            </FormControl>
            {/* Product Sold */}
            <FormControl id="product-sold" isRequired>
                <FormLabel>Product Sold</FormLabel>
                <Input type="number" name="sold" value={product.sold} onChange={handleChange} />
                <FormHelperText>Enter the product sold</FormHelperText>
                <FormErrorMessage>Product sold is required</FormErrorMessage>
            </FormControl>
        </form>
    );
}

export default EditProduct;
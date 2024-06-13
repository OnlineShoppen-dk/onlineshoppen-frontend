interface ProductModalProps {
    test: string;
}
function ProductModal({ ...props }: ProductModalProps) {
    return (
        <div>
            <h1>Product Modal</h1>
        </div>
    );
}

export default ProductModal;

/* OLD CODE
interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    refetch: () => void;
    updateProduct: (product: Product) => void;
    activateProduct: (product: Product) => void;
    deleteProduct: (product: Product) => void;
    categories: Category[];
    addProductToCategory: (categoryId: number, productId: number) => void;
    categoryRefetch: () => void;
}
function ProductModal({ ...props }: ProductModalProps) {
    const { isOpen, onClose, product, refetch, updateProduct, deleteProduct, activateProduct } = props;
    const [edit, setEdit] = useState(false);
    const [productEdit, setProductEdit] = useState(product);
    const { categories } = props;
    if (!categories) return "No categories found.";

    // Mutation, put request
    const updateProductAction = async () => {
        try {
            await updateProduct(productEdit);
            refetch();
            setEdit(false);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const activateProductAction = async () => {
        try {
            await activateProduct(product);
            refetch();
            onClose();
        } catch (error) {
            console.error("Error activating product:", error);
        }
    };

    const deleteProductAction = async () => {
        try {
            await deleteProduct(product);
            refetch();
            onClose();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, key: string) => {
        const value = e.target ? e.target.value : e;
        setProductEdit({ ...productEdit, [key]: value });
    };

    const handleSaveProduct = () => {
        updateProductAction();
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
                        {edit ? (
                            <Box>
                                <Text>Name:</Text>
                                <Input
                                    value={productEdit.name}
                                    onChange={(e) => handleInputChange(e, "name")}
                                    placeholder="Name"
                                />
                            </Box>
                        ) : (
                            <>
                                <ProductLogo {...product} />
                                <Text ml={2}>
                                    #{product.id} : {product.name}
                                </Text>
                            </>
                        )}
                    </Box>
                </ModalHeader>
                <ModalCloseButton />
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
                                <Button colorScheme="blue" onClick={handleSaveProduct}>
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
                                    {product.isRemoved ? (
                                        <Button colorScheme="green" onClick={activateProductAction}>
                                            Activate
                                        </Button>
                                    ) : (
                                        <Button colorScheme="red" onClick={deleteProductAction}>
                                            Delete
                                        </Button>
                                    )}
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
                <ModalBody>
                    <ProductModalCategories product={product} />
                    <Text marginTop={"8"}>Add Category</Text>
                    <Divider size={"lg"} />
                    <Box display="flex-col" alignItems="center" justifyContent="space-between">
                        {props.categories.categories.map((category) => (
                            <CategoryRow
                                Product={product}
                                Category={category}
                                addProductToCategory={props.addProductToCategory}
                                categoryRefetch={props.categoryRefetch}
                                key={category.id}
                            />
                        ))}
                    </Box>
                    <Divider />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
*/

/* OLD CODE : ProductModalCategories
interface ProductModalCategoriesProps {
    product: Product;
}
function ProductModalCategories({ product }: ProductModalCategoriesProps) {
    return (
        <Box>
            <Text>Categories:</Text>
            <Box display="flex-col" alignItems="center">
                {product.categories.map((category) => (
                    <ProductModalCategoryRow Category={category} key={category.id} />
                ))}
            </Box>
        </Box>
    );
}

interface ProductModalCategoryRowProps {
    Category: Category;
}
function ProductModalCategoryRow({ Category }: ProductModalCategoryRowProps) {
    return (
        <>
            <Box display="flex" marginTop={"4"} alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Text>
                        #{Category.id} - {Category.name}
                    </Text>
                </Box>
                <Box display="flex" alignItems="center" gap={"4"}>
                    <Button colorScheme="red" size={"sm"}>
                        Remove
                    </Button>
                </Box>
            </Box>
            <Divider />
        </>
    );
}


interface CategoryRowProps {
    Category: Category;
    Product: Product;
    addProductToCategory: (categoryId: number, productId: number) => void;
    categoryRefetch: () => void;
}

function CategoryRow({ ...props }: CategoryRowProps) {
    const { Category, Product, addProductToCategory, categoryRefetch } = props;

    const handleAddCategory = async () => {
        await addProductToCategory(Category.id, Product.id);
        categoryRefetch();
        console.log("added");
    };

    return (
        <>
            <Box display="flex" marginTop={"4"} alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Text>
                        #{Category.id} - {Category.name}
                    </Text>
                </Box>
                <Box display="flex" alignItems="center" gap={"4"}>
                    <Button colorScheme="green" size={"sm"} onClick={handleAddCategory}>
                        Add
                    </Button>
                </Box>
            </Box>
            <Divider />
        </>
    );
}

*/
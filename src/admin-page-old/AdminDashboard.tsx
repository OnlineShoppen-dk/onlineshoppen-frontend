
/*
Purely for showcasing data and how they work together.
TODO:
- Refetching categories after adding a product to a category
*/
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableCaption,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AdminProductResponse, useAdminProductQueryDashboard, useAdminProducts } from "../hooks/useAdminProducts";
import { PostProductRequest, Product, Category } from "../interfaces/product";
import { useAdminCategories } from "../hooks/useAdminCategories";

function GetCategoryData() {
    console.log("getting categories");
    const { data, error, isLoading, refetch, AddProductToCategory } = useAdminCategories();
    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>{error.message}</p>;
    const categoryData = {
        categories: data,
        addProductToCategory: AddProductToCategory,
        categoryRefetch: refetch,
    };
    console.log("Category Data:");
    console.log(categoryData);
    return categoryData;
}
function AdminDashboardOld() {
    const {
        setSearch: setSearch,
        setSort: setSort,
        setIncludeRemoved,
        setPage,
        setPageSize,
    } = useAdminProductQueryDashboard();
    // Admin query values are taken from the response, so we don't need to set them here
    const {
        data,
        error,
        isLoading,
        refetch,
        PostAdminProduct,
        UpdateAdminProduct,
        ActivateAdminProduct,
        DeleteAdminProduct,
    } = useAdminProducts();

    const categoryData = GetCategoryData();
    const categories = categoryData.categories;
    const addProductToCategory = categoryData.addProductToCategory;
    const categoryRefetch = categoryData.categoryRefetch;

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>{error.message}</p>;
    if (!data) return <p>No data</p>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <GetProductsTable
                data={data}
                setSearch={setSearch}
                setSort={setSort}
                setIncludeRemoved={setIncludeRemoved}
                setPage={setPage}
                setPageSize={setPageSize}
                refetch={refetch}
                postProduct={PostAdminProduct}
                updateProduct={UpdateAdminProduct}
                activateProduct={ActivateAdminProduct}
                deleteProduct={DeleteAdminProduct}
                categories={categories}
                addProductToCategory={addProductToCategory}
                categoryRefetch={categoryRefetch}
            />
        </div>
    );
}

export default AdminDashboardOld;

// Components
interface GetProductsTableProps {
    data: AdminProductResponse;
    setSearch: (search: string) => void;
    setSort: (sort: AdminProductResponse["sort"]) => void;
    setIncludeRemoved: (includeRemoved: boolean) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    refetch: () => void;
    postProduct: (product: PostProductRequest) => void;
    updateProduct: (product: Product) => void;
    activateProduct: (product: Product) => void;
    deleteProduct: (product: Product) => void;
    categories: Category[];
    addProductToCategory: (categoryId: number, productId: number) => void;
    categoryRefetch: () => void;
}

function GetProductsTable({ ...props }: GetProductsTableProps) {
    const {
        data,
        setSearch,
        setSort,
        setIncludeRemoved,
        setPage,
        setPageSize,
        refetch,
        postProduct,
        updateProduct,
        activateProduct,
        deleteProduct,
        categories,
        addProductToCategory,
        categoryRefetch,
    } = props;
    const { page, pageSize, products, search, sort, totalPages, totalProducts } = data;

    const handleIncludeRemoved = () => {
        if (data.includeRemoved) {
            setIncludeRemoved(false);
        } else {
            setIncludeRemoved(true);
        }
    };
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={6} width="80%" height="100%">
            <Box display="flex-col" flexDirection="column" gap={2}>
                <PostProductModal postProduct={postProduct} refetch={refetch} />
                <Box display="flex" justifyContent="space-between" margin={"4"}>
                    {/* Search */}
                    <ProductSearch setSearch={setSearch} search={search} />
                    {/* Sort */}
                    <ProductSort setSort={setSort} sort={sort} />
                    {/* Include Sold Out */}
                    <Box>
                        <Checkbox isChecked={data.includeRemoved} onChange={handleIncludeRemoved}>
                            Include Sold Out
                        </Checkbox>
                    </Box>
                </Box>
                {/* Table*/}
                <Box
                    border="1px"
                    borderColor="gray.200"
                    maxHeight="500px"
                    overflowX="hidden"
                    overflowY="scroll"
                    margin={"4"}>
                    <Table size="sm" variant="simple">
                        <TableCaption>Products</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Logo</Th>
                                <Th>Name</Th>
                                <Th>Price</Th>
                                <Th>Stock</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {products.map((product) => (
                                <Tr key={product.id} backgroundColor={product.isRemoved ? "red.100" : "white"}>
                                    <Td>{product.id}</Td>
                                    <Td>
                                        <ProductLogo {...product} />
                                    </Td>
                                    <Td>{product.name}</Td>
                                    <Td>{product.price}.-</Td>
                                    <Td>{product.stock}</Td>
                                    <Td>
                                        <ProductActions
                                            product={product}
                                            updateProduct={updateProduct}
                                            activateProduct={activateProduct}
                                            deleteProduct={deleteProduct}
                                            refetch={refetch}
                                            categories={categories}
                                            addProductToCategory={addProductToCategory}
                                            categoryRefetch={categoryRefetch}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
                {/* Pagination */}
                <ProductTablePagination
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    totalProducts={totalProducts}
                    setPage={setPage}
                    setPageSize={setPageSize}
                />
            </Box>
        </Grid>
    );
}
// Sort
interface ProductSortProps {
    setSort: (sort: AdminProductResponse["sort"]) => void;
    sort: AdminProductResponse["sort"];
}
function ProductSort({ setSort, sort }: ProductSortProps) {
    return (
        <Box display="flex" gap={2}>
            <ProductSortButton currentSort={sort} setSort={setSort} value="popularity" />
            <ProductSortButton currentSort={sort} setSort={setSort} value="name" />
            <ProductSortButton currentSort={sort} setSort={setSort} value="price" />
            <ProductSortButton currentSort={sort} setSort={setSort} value="stock" />
        </Box>
    );
}
// Sort Button
interface ProductSortButtonProps {
    currentSort: AdminProductResponse["sort"];
    setSort: (sort: AdminProductResponse["sort"]) => void;
    value: string;
}
function ProductSortButton({ currentSort, setSort, value }: ProductSortButtonProps) {
    const sortSplit = currentSort.split("_");
    const sortValue = sortSplit[0];
    const sortDirection = sortSplit[1];

    const handleSort = (value: string) => {
        if (sortValue === value) {
            const newSort = (value + (sortDirection === "asc" ? "_desc" : "_asc")) as AdminProductResponse["sort"];

            setSort(newSort);
        } else {
            const newSort: AdminProductResponse["sort"] = (value + "_asc") as AdminProductResponse["sort"];
            setSort(newSort);
        }
    };
    return (
        <Button size={"sm"} colorScheme={sortValue === value ? "blue" : "gray"} onClick={() => handleSort(value)}>
            <>
                {value}
                {sortValue === value ? (sortDirection === "asc" ? "▲" : "▼") : ""}
            </>
        </Button>
    );
}

// Search
interface ProductSearchProps {
    setSearch: (search: string) => void;
    search: string;
}
function ProductSearch({ setSearch, search }: ProductSearchProps) {
    const [searchInput, setSearchInput] = useState(search);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submit", searchInput);
        e.preventDefault();
        setSearch(searchInput);
    };
    return (
        <form onSubmit={handleSearchSubmit}>
            <Box display="flex" gap={2}>
                <Input size={"sm"} type="text" value={searchInput} onChange={handleSearch} />
                <Button size={"sm"} type="submit">
                    Search
                </Button>
            </Box>
        </form>
    );
}

// Pagination
export interface ProductTablePaginationProps {
    page: number;
    pageSize: number;
    totalPages: number;
    totalProducts: number;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}
function ProductTablePagination({
    page,
    pageSize,
    totalPages,
    totalProducts,
    setPage,
    setPageSize,
}: ProductTablePaginationProps) {
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
    };
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" margin={"4"}>
            <Flex alignItems="center">
                <Button size={"sm"} onClick={() => handlePageChange(page - 1)} isDisabled={page <= 1} marginRight="2">
                    Previous
                </Button>
                <Text marginRight="2">
                    Page {page} of {totalPages}
                </Text>
                <Button size={"sm"} onClick={() => handlePageChange(page + 1)} isDisabled={page === totalPages}>
                    Next
                </Button>
            </Flex>
            <Box>
                <Button size={"sm"} onClick={() => handlePageSizeChange(5)} isDisabled={pageSize === 5} marginRight="2">
                    5
                </Button>
                <Button
                    size={"sm"}
                    onClick={() => handlePageSizeChange(10)}
                    isDisabled={pageSize === 10}
                    marginRight="2">
                    10
                </Button>
                <Button
                    size={"sm"}
                    onClick={() => handlePageSizeChange(25)}
                    isDisabled={pageSize === 25}
                    marginRight="2">
                    25
                </Button>
                <Button
                    size={"sm"}
                    onClick={() => handlePageSizeChange(50)}
                    isDisabled={pageSize === 50}
                    marginRight="2">
                    50
                </Button>
                <Text>
                    Showing {pageSize} of {totalProducts} products
                </Text>
            </Box>
        </Box>
    );
}

// Product Logo
function ProductLogo(product: Product) {
    const src = product.images[0]?.fileName ?? "https://via.placeholder.com/50";
    const alt = product.images[0]?.alt ?? product.name;
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Image borderRadius="full" boxSize="50px" src={src} alt={alt} />
        </Box>
    );
}

// Product Row
interface ProductActionsProps {
    product: Product;
    updateProduct: (product: Product) => void;
    activateProduct: (product: Product) => void;
    deleteProduct: (product: Product) => void;
    refetch: () => void;
    categories: Category[];
    addProductToCategory: (categoryId: number, productId: number) => void;
    categoryRefetch: () => void;
}
function ProductActions({ ...props }: ProductActionsProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Button onClick={onOpen} colorScheme="blue" size="xs">
                View
            </Button>
            <ProductModal
                isOpen={isOpen}
                onClose={onClose}
                product={props.product}
                refetch={props.refetch}
                updateProduct={props.updateProduct}
                activateProduct={props.activateProduct}
                deleteProduct={props.deleteProduct}
                categories={props.categories}
                addProductToCategory={props.addProductToCategory}
                categoryRefetch={props.categoryRefetch}
            />
        </Box>
    );
}
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
                    {/* Add Category */}
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

// Post Product Modal
interface PostProductModalProps {
    postProduct: (product: PostProductRequest) => void;
    refetch: () => void;
}
function PostProductModal({ ...props }: PostProductModalProps) {
    const { postProduct, refetch } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [product, setProduct] = useState<PostProductRequest>({
        guid: uuidv4(),
        name: "",
        description: "",
        price: 0,
        stock: 0,
        sold: 0,
    });
    const handlePostProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await postProduct(product);
        console.log(response);
        // Close the modal after posting the product
        onClose();

        // Reset the product state
        setProduct({
            guid: uuidv4(),
            name: "",
            description: "",
            price: 0,
            stock: 0,
            sold: 0,
        });
        refetch();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleNumberChange = (valueAsString: string, _valueAsNumber: number, name: string) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: parseInt(valueAsString),
        }));
    };

    return (
        <>
            <Button size={"sm"} colorScheme="blue" onClick={onOpen}>
                Add Product
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Box display="flex" alignItems="center">
                            <Text>Add Product</Text>
                        </Box>
                    </ModalHeader>
                    <ModalCloseButton />
                    {/* Modal Body */}
                    <ModalBody>
                        <form onSubmit={handlePostProduct}>
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" name="name" value={product.name} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea name="description" value={product.description} onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <NumberInput
                                    max={100000000}
                                    min={0}
                                    value={product.price}
                                    onChange={(valueAsString, _valueAsNumber) =>
                                        handleNumberChange(valueAsString, _valueAsNumber, "price")
                                    }>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Stock</FormLabel>
                                <NumberInput
                                    max={100000000}
                                    min={0}
                                    value={product.stock}
                                    onChange={(valueAsString, _valueAsNumber) =>
                                        handleNumberChange(valueAsString, _valueAsNumber, "stock")
                                    }>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Sold</FormLabel>
                                <NumberInput
                                    max={100000000}
                                    min={0}
                                    value={product.sold}
                                    onChange={(valueAsString, _valueAsNumber) =>
                                        handleNumberChange(valueAsString, _valueAsNumber, "sold")
                                    }>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <Button type="submit" colorScheme="blue">
                                Add Product
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

// Get Category Data

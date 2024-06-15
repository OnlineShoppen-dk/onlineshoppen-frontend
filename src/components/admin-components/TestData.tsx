import { v4 as uuidv4 } from "uuid";
import { Category, Product } from "../../interfaces/product";
import { GetProductResponse } from "../../interfaces/main-service";



// PRODUCTS
function GetTestProductById(id: number, products: Product[]){
    return products.find(p => p.id === id);
}

function GetTestProductByIds(ids: number[], products: Product[]){
    return products.filter(p => ids.includes(p.id));
}

function GetTestProductsByName(searchInput: string, products: Product[]){
    const search = searchInput.toLowerCase();
    const found = products.filter(p => p.name.toLowerCase().includes(search));
    const result = {
        data: {
            page: 1,
            pageSize: 10,
            totalPages: 3,
            totalItems: products.length,
            sortFields: ["popularity", "name", "price", "stock"],
            sort: "popularity_asc"
        },
        products: found
    } as GetProductResponse;
    return result;

}

function GetTestProducts({count}:{count:number}){
    const products: Product[] = [];
    const categories = GetTestCategories({count: 15});

    for(let i = 0; i < count; i++){
        const createdAt = new Date().toISOString();
        const date = new Date(createdAt).toLocaleTimeString('da-DK');
        const time = new Date(createdAt).toLocaleTimeString('da-DK').replace(/\D/g, ':');
        console.log(categories.length);
        products.push({
            id: i,
            guid: uuidv4(),
            name: `Product ${i}`,
            description: `This is a test product with id ${i}`,
            price: Math.floor(Math.random() * 1000),
            stock: Math.floor(Math.random() * 100),
            sold: Math.floor(Math.random() * 100),
            createdAt: createdAt,
            createdAtDate: date,
            createdAtTime: time,
            updatedAt: createdAt,
            updatedAtDate: date,
            updatedAtTime: time,
            isRemoved: Math.random() < 0.1,
            imageId: null,
            categories: categories,
            images: []
        });

    }


    const result = {
        data: {
            page: 1,
            pageSize: 10,
            totalPages: 3,
            totalItems: products.length,
            sortFields: ["popularity", "name", "price", "stock"],
            sort: "popularity_asc"
        },
        products: products
    } as GetProductResponse;
    return result;
}

// CATEGORIES
function GetTestCategories({count}:{count:number}){
    const categories = [];
    for(let i = 0; i < count; i++){
        categories.push({
            id: i,
            name: `Category ${i}`,
            description: `This is a test category with id ${i}`,
            totalProducts: 0
        });
    }
    return categories;
}

function GetTestCategoryById(id: number, categories: Category[]){
    return categories.find(c => c.id === id);
}

const TestData = {
    GetTestProducts,
    GetTestProductById,
    GetTestProductByIds,
    GetTestProductsByName,
    GetTestCategories,
    GetTestCategoryById
}

export default TestData;